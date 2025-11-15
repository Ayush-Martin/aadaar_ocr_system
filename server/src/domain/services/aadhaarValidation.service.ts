import { injectable } from "inversify";

@injectable()
class AadhaarValidationService {
  private readonly AADHAAR_FRONT_PAGE_KEY_WORDS = [
    "Government of India",
    "Aadhaar",
    "Male",
    "Female",
    "Gender",
  ];

  private readonly AADHAAR_BACK_PAGE_KEY_WORDS = [
    "Resident of",
    "Address",
    "State",
    "District",
    "Pin Code",
    "City",
    "S/O",
    "D/O",
    "help @uldal.gov.in www.uldal.gov.in",
  ];

  /**
   * Validates front page of Aadhaar card
   * @param frontText
   * @returns
   */
  validateFrontPage(frontText: string): boolean {
    return this.AADHAAR_FRONT_PAGE_KEY_WORDS.some((word) =>
      frontText.includes(word)
    );
  }

  /**
   * Validates back page of Aadhaar card
   * @param backText
   * @returns
   */
  validateBackPage(backText: string): boolean {
    return this.AADHAAR_BACK_PAGE_KEY_WORDS.some((word) =>
      backText.includes(word)
    );
  }
}

export default AadhaarValidationService;
