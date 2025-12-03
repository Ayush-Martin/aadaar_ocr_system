import { inject, injectable } from "inversify";
import { IAadhaarValidationUseCase } from "../interface/useCase/IAadhaarValidation.useCase";
import errorCreator from "../../shared/utils/errorCreator";
import { OCRResponseMessages } from "../../shared/constants/responseMessages";
import { StatusCodes } from "../../shared/constants/statusCodes";
import { TYPES } from "../../infrastructure/container/types";
import { IAadhaarValidationService } from "../interface/service/domainService/IAadhaarValidation.service";

@injectable()
class AadhaarValidationUseCase implements IAadhaarValidationUseCase {
  constructor(
    @inject(TYPES.AadhaarValidationService)
    private _aadhaarValidationService: IAadhaarValidationService
  ) {}

  /**
   * Takes raw text from front and back page and checks if they are valid
   * @param frontText
   * @param backText
   */
  public async execute(frontText: string, backText: string): Promise<void> {
    const isValidFrontPage =
      this._aadhaarValidationService.validateFrontPage(frontText);

    if (!isValidFrontPage)
      throw errorCreator(
        OCRResponseMessages.INVALID_AADHAAR_FRONT_IMAGE,
        StatusCodes.BAD_REQUEST
      );

    const isValidBackPage =
      this._aadhaarValidationService.validateBackPage(backText);

    if (!isValidBackPage)
      throw errorCreator(
        OCRResponseMessages.INVALID_AADHAAR_BACK_IMAGE,
        StatusCodes.BAD_REQUEST
      );
  }
}

export default AadhaarValidationUseCase;
