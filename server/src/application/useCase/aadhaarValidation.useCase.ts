import { injectable } from "inversify";
import { IAadhaarValidationUseCase } from "../interface/useCase/IAadhaarValidation.useCase";
import {
  AADHAAR_BACK_PAGE_KEY_WORDS,
  AADHAAR_FRONT_PAGE_KEY_WORDS,
} from "../../shared/constants/aadhaarKeywords";
import errorCreator from "../../shared/utils/errorCreator";
import { OCRResponseMessages } from "../../shared/constants/responseMessages";
import { StatusCodes } from "../../shared/constants/statusCodes";

@injectable()
class AadhaarValidationUseCase implements IAadhaarValidationUseCase {
  public async execute(frontText: string, backText: string): Promise<void> {
    const isValidFrontPage = AADHAAR_FRONT_PAGE_KEY_WORDS.some((word) =>
      frontText.includes(word)
    );

    if (!isValidFrontPage)
      throw errorCreator(
        OCRResponseMessages.INVALID_AADHAAR_FRONT_IMAGE,
        StatusCodes.BAD_REQUEST
      );

    const isValidBackPage = AADHAAR_BACK_PAGE_KEY_WORDS.some((word) =>
      backText.includes(word)
    );

    if (!isValidBackPage)
      throw errorCreator(
        OCRResponseMessages.INVALID_AADHAAR_BACK_IMAGE,
        StatusCodes.BAD_REQUEST
      );
  }
}

export default AadhaarValidationUseCase;
