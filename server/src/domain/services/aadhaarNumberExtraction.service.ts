import { injectable } from "inversify";
import { IAadhaarNumberExtractionService } from "../../application/interface/service/domainService/IAadhaarNumberExtraction.service";

@injectable()
class AadhaarNumberExtractionService
  implements IAadhaarNumberExtractionService
{
  private readonly UID_REGEX = /\b\d{4}\s\d{4}\s\d{4}\b/;

  /**
   * Takes raw text from front page and returns uid(Aadhaar number)
   * @param text
   * @returns
   */
  extract(text: string): string {
    const match = text.match(this.UID_REGEX);
    return match ? match[0].trim() : "";
  }
}

export default AadhaarNumberExtractionService;
