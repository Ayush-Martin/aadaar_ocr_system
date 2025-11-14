import { IAadhaarDataExtractionService } from "./../interface/service/IAadhaarDataExtraction.service";
import { inject, injectable } from "inversify";
import AadhaarEntity from "../../domain/entities/aadhaar.entity";
import AgeBand from "../../domain/valueObjects/AgeBand.vo";
import DOB from "../../domain/valueObjects/DOB.vo";
import { IAadhaarDataExtractionUseCase } from "../interface/useCase/IAadhaarDataExtraction.useCase";
import { TYPES } from "../../infrastructure/container/types";
import { getAge } from "../../shared/utils/age";
import ParseAadhaarDTO from "../DTO/aadhaar.dto";
import errorCreator from "../../shared/utils/errorCreator";
import { OCRResponseMessages } from "../../shared/constants/responseMessages";
import { StatusCodes } from "../../shared/constants/statusCodes";

@injectable()
class AadhaarDataExtractionUseCase implements IAadhaarDataExtractionUseCase {
  constructor(
    @inject(TYPES.AadhaarDataExtractionService)
    private _AadhaarDataExtractionService: IAadhaarDataExtractionService
  ) {}

  private extractFrontPage(text: string) {
    const uid = this._AadhaarDataExtractionService.extractAadhaarNumber(text);
    const name = this._AadhaarDataExtractionService.extractName(text);
    const gender = this._AadhaarDataExtractionService.extractGender(text);
    const dob = this._AadhaarDataExtractionService.extractDOB(text);

    return { uid, name, gender, dob };
  }

  private extractBackPage(text: string) {
    const uid = this._AadhaarDataExtractionService.extractAadhaarNumber(text);
    const address = this._AadhaarDataExtractionService.extractAddress(text);
    const pincode = this._AadhaarDataExtractionService.extractPincode(text);

    return { uid, address, pincode };
  }

  public async execute(
    frontText: string,
    backText: string
  ): Promise<ParseAadhaarDTO> {
    const front = this.extractFrontPage(frontText);
    const back = this.extractBackPage(backText);

    if (front.uid !== back.uid)
      throw errorCreator(
        OCRResponseMessages.UID_DONT_MATCH,
        StatusCodes.BAD_REQUEST
      );

    const age = getAge(front.dob);
    const entity = new AadhaarEntity(
      front.name,
      new DOB(front.dob),
      front.gender,
      front.uid,
      back.address,
      back.pincode,
      age,
      new AgeBand(age)
    );

    return ParseAadhaarDTO.toDTO(entity);
  }
}

export default AadhaarDataExtractionUseCase;
