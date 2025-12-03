import { injectable } from "inversify";
import { IGenderExtractionService } from "../../application/interface/service/domainService/IGenderExtraction.service";

@injectable()
class GenderExtractionService implements IGenderExtractionService {
  private readonly GENDER_REGEX = /\b(Male|Female|Transgender)\b/i;

  /**
   * Takes raw text from front page and returns gender
   * @param text 
   * @returns 
   */
  extract(text: string): string {
    const match = text.match(this.GENDER_REGEX);
    return match ? match[0].trim() : "";
  }
}

export default GenderExtractionService;
