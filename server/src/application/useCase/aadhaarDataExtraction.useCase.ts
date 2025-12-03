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
import { IAadhaarNumberExtractionService } from "../interface/service/domainService/IAadhaarNumberExtraction.service";
import { INameExtractionService } from "../interface/service/domainService/INameExtraction.service";
import { IGenderExtractionService } from "../interface/service/domainService/IGenderExtraction.service";
import { IDOBExtractionService } from "../interface/service/domainService/IDOBExtraction.service";
import { IAddressExtractionService } from "../interface/service/domainService/IAddressExtraction.service";
import { IPincodeExtractionService } from "../interface/service/domainService/IPincodeExtraction.service";

@injectable()
class AadhaarDataExtractionUseCase implements IAadhaarDataExtractionUseCase {
  constructor(
    @inject(TYPES.AadhaarNumberExtractionService)
    private _AadhaarNumberExtractionService: IAadhaarNumberExtractionService,
    @inject(TYPES.NameExtractionService)
    private _NameExtractionService: INameExtractionService,
    @inject(TYPES.GenderExtractionService)
    private _GenderExtractionService: IGenderExtractionService,
    @inject(TYPES.DOBExtractionService)
    private _DOBExtractionService: IDOBExtractionService,
    @inject(TYPES.AddressExtractionService)
    private _AddressExtractionService: IAddressExtractionService,
    @inject(TYPES.PincodeExtractionService)
    private _PincodeExtractionService: IPincodeExtractionService
  ) {}

  /**
   * Gets raw text from front and back page and returns parsed aadhaar data
   * @param frontText
   * @param backText
   * @returns
   */
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

  /**
   * Takes raw text from front page and returns uid, name, gender and dob
   * @param text
   * @returns
   */
  private extractFrontPage(text: string) {
    const uid = this._AadhaarNumberExtractionService.extract(text);
    const name = this._NameExtractionService.extract(text);
    const gender = this._GenderExtractionService.extract(text);
    const dob = this._DOBExtractionService.extract(text);

    return { uid, name, gender, dob };
  }

  /**
   * Takes raw text from back page and returns uid, address and pincode
   * @param text
   * @returns
   */
  private extractBackPage(text: string) {
    const uid = this._AadhaarNumberExtractionService.extract(text);
    const address = this._AddressExtractionService.extract(text);
    const pincode = this._PincodeExtractionService.extract(text);

    return { uid, address, pincode };
  }
}

export default AadhaarDataExtractionUseCase;
