import { injectable } from "inversify";
import { IDOBExtractionService } from "../../application/interface/service/domainService/IDOBExtraction.service";

@injectable()
class DOBExtractionService implements IDOBExtractionService {
  private readonly DOB_REGEX = /DOB\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})/i;

  /**
   * Takes raw text from front page and returns DOB
   * @param text
   * @returns
   */
  extract(text: string): Date {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    for (const line of lines) {
      const match = line.match(this.DOB_REGEX);
      if (match) {
        return this.parseDMY(match[1]);
      }
    }

    return new Date();
  }

  /**
   * It formats the date in DD/MM/YYYY
   * @param dateStr
   * @returns
   */
  private parseDMY(dateStr: string): Date {
    const [dd, mm, yyyy] = dateStr.split("/").map(Number);
    return new Date(yyyy, mm, dd);
  }
}

export default DOBExtractionService;
