import { injectable } from "inversify";
import { IPincodeExtractionService } from "../../application/interface/service/domainService/IPincodeExtraction.service";

@injectable()
class PincodeExtractionService implements IPincodeExtractionService {
  private readonly PINCODE_PATTERN = /\b\d{6}\b/;

  /**
   * Takes raw text from front page and returns pincode
   * @param text
   * @returns
   */
  public extract(text: string): string {
    const match = text.match(this.PINCODE_PATTERN);
    return match ? match[0] : "";
  }
}

export default PincodeExtractionService;
