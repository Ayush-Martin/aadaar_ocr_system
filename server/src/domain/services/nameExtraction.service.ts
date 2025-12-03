import { injectable } from "inversify";
import { INameExtractionService } from "../../application/interface/service/domainService/INameExtraction.service";

@injectable()
class NameExtractionService implements INameExtractionService {
  private readonly NAME_CLEAN_REGEX = /[^a-zA-Z\s]/g;

  /**
   * Takes raw text from front page and returns name
   * @param text
   * @returns
   */
  extract(text: string): string {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const dobIndex = lines.findIndex((line) =>
      /DOB\s*[:\-]?\s*\d{2}\/\d{2}\/\d{4}/i.test(line)
    );

    if (dobIndex > 0) {
      return this.clean(lines[dobIndex - 1]);
    }

    return "";
  }

  /**
   * It cleans the name
   * @param name
   * @returns
   */
  private clean(name: string): string {
    return name
      .replace(this.NAME_CLEAN_REGEX, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }
}

export default NameExtractionService;
