import { inject, injectable } from "inversify";
import { IParseAadhaarUseCase } from "../interfaces/useCases/IParseAadhaar.useCase";
import { TYPES } from "../../infrastructure/container/types";
import { ITesseractService } from "../interfaces/services/ITesseract.service";
import errorCreator from "../../shared/utils/errorCreator";
import { OCRResponseMessages } from "../../shared/constants/responseMessages";
import { IAadhaarValidationService } from "../interfaces/services/IAadhaarValidation.service";
import { StatusCodes } from "../../shared/constants/statusCodes";
import { IAadhaarDataExtractionService } from "../interfaces/services/IAadhaarDataExtraction.service";
import AadhaarEntity from "../../domain/entities/aadhaar.entity";
import AgeBand from "../../domain/valueObjects/AgeBand.vo";
import DOB from "../../domain/valueObjects/DOB.vo";
import ParseAadhaarDTO, { IParseAadhaarDTO } from "../DTO/aadhaar.dto";
import { getAge } from "../../shared/utils/age";
import { removeImage } from "../../shared/utils/removeImage";

@injectable()
class ParseAadhaarUseCase implements IParseAadhaarUseCase {
  constructor(
    @inject(TYPES.ITesseractService) private readonly _tesseractService: ITesseractService,
    @inject(TYPES.IAadhaarValidationService)
    private readonly _aadhaarValidationService: IAadhaarValidationService,
    @inject(TYPES.IAadhaarDataExtractionService)
    private readonly _aadhaarDataExtractionService: IAadhaarDataExtractionService,
  ) {}

  /**
   * Method to extract data from provided aadhaar card images
   * - extract raw text from images
   * - validate the aadhaar raw text
   * - extract data from the raw text
   * - create aadhaar entity and return
   * @param frontImage
   * @param backImage
   */
  public async parseAadhaar(frontImage: string, backImage: string): Promise<IParseAadhaarDTO> {
    const frontText = await this._tesseractService.extractTextFromImage(frontImage);
    const backText = await this._tesseractService.extractTextFromImage(backImage);

    if (!frontImage || !backImage) throw errorCreator(OCRResponseMessages.TEXT_EXTRACTION_FAILED);

    const isValidFrontPage = this._aadhaarValidationService.checkValidFrontPage(frontText);

    if (!isValidFrontPage) {
      throw errorCreator(OCRResponseMessages.INVALID_AADHAAR_FRONT_IMAGE, StatusCodes.BAD_REQUEST);
    }

    const isValidBackPage = this._aadhaarValidationService.checkValidBackPage(backText);

    if (!isValidBackPage) {
      throw errorCreator(OCRResponseMessages.INVALID_AADHAAR_BACK_IMAGE, StatusCodes.BAD_REQUEST);
    }

    const frontPageData = this._aadhaarDataExtractionService.extractFrontPageData(frontText);
    const backPageData = this._aadhaarDataExtractionService.extractBackPageData(backText);

    const isUidSame = frontPageData.uid === backPageData.uid;

    const age = getAge(frontPageData.dob);

    const aadhaarEntity = new AadhaarEntity(
      frontPageData.name,
      new DOB(frontPageData.dob),
      frontPageData.gender,
      frontPageData.uid,
      backPageData.address,
      backPageData.pincode,
      age,
      backPageData.maskedMobileNumber,
      isUidSame,
      new AgeBand(age),
    );

    removeImage(frontImage);
    removeImage(backImage);

    return ParseAadhaarDTO.toDTO(aadhaarEntity);
  }
}

export default ParseAadhaarUseCase;
