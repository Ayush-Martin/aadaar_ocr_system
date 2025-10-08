import { injectable } from "inversify";
import { IAadhaarValidationService } from "../../application/interfaces/services/IAadhaarValidation.service";
import {
  AADHAAR_BACK_PAGE_KEY_WORDS,
  AADHAAR_FRONT_PAGE_KEY_WORDS,
} from "../../shared/constants/aadhaarKeywords";

@injectable()
class AadhaarValidationService implements IAadhaarValidationService {
  /**
   * Checks whether the provided text contains key identifiers
   * that indicate it's from the **front side** of an Aadhaar card.
   * @param text
   * @returns
   */
  public checkValidFrontPage(text: string): boolean {
    const lowerCaseText = text.toLowerCase();
    return AADHAAR_FRONT_PAGE_KEY_WORDS.some((keyword) =>
      lowerCaseText.includes(keyword.toLowerCase()),
    );
  }

  /**
   * Checks whether the provided text contains key identifiers
   * that indicate it's from the **back side** of an Aadhaar card.
   * @param text
   * @returns
   */
  public checkValidBackPage(text: string): boolean {
    const lowerCaseText = text.toLowerCase();
    return AADHAAR_BACK_PAGE_KEY_WORDS.some((keyword) =>
      lowerCaseText.includes(keyword.toLowerCase()),
    );
  }
}

export default AadhaarValidationService;
