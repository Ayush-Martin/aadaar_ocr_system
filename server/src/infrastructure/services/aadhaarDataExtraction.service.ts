import { injectable } from "inversify";
import { IAadhaarDataExtractionService } from "../../application/interfaces/services/IAadhaarDataExtraction.service";
import { IAadhaarFrontPage, IAadhaarBackPage } from "../../shared/types/aadhaar.type";

@injectable()
class AadhaarDataExtractionService implements IAadhaarDataExtractionService {
  public extractFrontPageData(text: string): IAadhaarFrontPage {
    let dob = new Date();
    let gender = "";
    let name = "";
    let uid = "";

    const aadhaarNumberMatch = text.match(/\b\d{4} \d{4} \d{4}\b/);
    if (aadhaarNumberMatch) uid = aadhaarNumberMatch[0].trim();

    const genderMatch = text.match(/\b(Male|Female|Transgender)\b/i);
    if (genderMatch) gender = genderMatch[0].trim();

    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    for (let i = 0; i < lines.length; i++) {
      const dobMatch = lines[i].match(/DOB\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})/i);
      if (dobMatch) {
        const [day, month, year] = dobMatch[1].split("/").map(Number);
        dob = new Date(year, month - 1, day);

        if (i > 0) {
          name = lines[i - 1]
            .replace(/[^a-zA-Z\s]/g, "")
            .replace(/\s{2,}/g, " ")
            .trim();
        }
        break;
      }
    }

    return { dob, gender, name, uid };
  }

  public extractBackPageData(text: string): IAadhaarBackPage {
    let uid = "";
    let address = "";
    let pincode = "";
    let maskedMobileNumber = "";

    const aadhaarNumberMatch = text.match(/\b\d{4} \d{4} \d{4}\b/);
    if (aadhaarNumberMatch) uid = aadhaarNumberMatch[0].trim();

    const mobileMatch = text.match(/\b\d{10}\b/);
    if (mobileMatch) maskedMobileNumber = mobileMatch[0];

    const lines = text
      .split("\n")
      .map((line) => line.replace(/[^\p{L}\p{N}\s,\/-]/gu, "").trim())
      .filter(Boolean);

    const possibleAddresses: { address: string; pincode: string }[] = [];

    for (let i = 0; i < lines.length; i++) {
      const pinMatch = lines[i].match(/\b\d{6}\b/);
      if (pinMatch) {
        const pin = pinMatch[0];
        const start = Math.max(0, i - 5); // take 5 lines before
        const addrLines = lines.slice(start, i + 1).filter((l) => l.length > 2); // ignore very short lines
        const addr = addrLines.join(", ");
        possibleAddresses.push({ address: addr, pincode: pin });
      }
    }

    if (possibleAddresses.length > 0) {
      const last = possibleAddresses[possibleAddresses.length - 1];
      pincode = last.pincode;

      address = last.address
        .replace(/\s{2,}/g, " ")
        .replace(/,{2,}/g, ",")
        .replace(/ ,/g, ",")
        .trim();

      // Only title-case Latin words; leave other scripts untouched
      address = address
        .split(",")
        .map((part) =>
          part
            .split(" ")
            .map((w) => (/^[A-Za-z]+$/.test(w) ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))
            .join(" ")
            .trim(),
        )
        .join(", ");
    }

    return {
      address,
      pincode,
      uid,
      maskedMobileNumber,
    };
  }
}

export default AadhaarDataExtractionService;
