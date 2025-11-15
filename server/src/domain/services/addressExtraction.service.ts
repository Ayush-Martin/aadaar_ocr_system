import { IAddressExtractionService } from "../../application/interface/service/domainService/IAddressExtraction.service";

class AddressExtractionService implements IAddressExtractionService {
  private readonly FOOTER_PATTERN = /1800\s?300\s?1947[\s\S]*/i;
  private readonly LINES_BEFORE_PINCODE = 6;

  /**
   * Takes raw text from back page and returns address
   * @param text
   * @returns
   */
  public extract(text: string): string {
    const cleanedText = this.removeFooter(text);
    const lines = this.getCleanedLines(cleanedText);
    const pincodeIndex = this.findPincodeIndex(lines);

    if (pincodeIndex === -1) {
      return "";
    }

    return this.buildAddress(lines, pincodeIndex);
  }

  /**
   * It removes the footer from the text
   * @param text
   * @returns
   */
  private removeFooter(text: string): string {
    return text.replace(this.FOOTER_PATTERN, "");
  }

  /**
   * Cleans the lines
   * @param text
   * @returns
   */
  private getCleanedLines(text: string): string[] {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => !/^\d{4}\s?\d{4}\s?\d{4}/.test(line)) // Remove Aadhaar
      .filter((line) => !/VID/i.test(line));
  }

  /**
   * It finds the index of the pincode
   * @param lines
   * @returns
   */
  private findPincodeIndex(lines: string[]): number {
    for (let i = 0; i < lines.length; i++) {
      if (/\b\d{6}\b/.test(lines[i])) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Build the address from the lines and pincode
   * @param lines
   * @param pincodeIndex
   * @returns
   */
  private buildAddress(lines: string[], pincodeIndex: number): string {
    const startIndex = Math.max(0, pincodeIndex - this.LINES_BEFORE_PINCODE);
    const addressLines = lines.slice(startIndex, pincodeIndex + 1);

    return addressLines
      .join(", ")
      .replace(/\s{2,}/g, " ")
      .replace(/,{2,}/g, ",")
      .trim();
  }
}

export default AddressExtractionService;
