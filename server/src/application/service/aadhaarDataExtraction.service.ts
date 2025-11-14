import { injectable } from "inversify";
import { IAadhaarDataExtractionService } from "../interface/service/IAadhaarDataExtraction.service";

@injectable()
class AadhaarDataExtractionService implements IAadhaarDataExtractionService {
  // -------------------------------------------
  // UID / Aadhaar Number (NOT VID)
  // -------------------------------------------
  public extractAadhaarNumber(text: string): string {
    // Remove VID section first
    text = text.replace(/VID\s*[:=]\s*\d[\d\s]+/gi, "");

    // Aadhaar 4-4-4 grouped or without spaces
    const match = text.match(/\b\d{4}\s?\d{4}\s?\d{4}\b/);

    return match ? match[0].replace(/\D/g, "") : "";
  }

  // -------------------------------------------
  // Gender (with OCR tolerance)
  // -------------------------------------------
  public extractGender(text: string): "Male" | "Female" | "Transgender" {
    const t = text
      .toUpperCase()
      .replace(/FEMALC/, "FEMALE") // C → E mistake
      .replace(/MALF/, "MALE"); // F → E mistake

    if (t.includes("TRANSGENDER")) return "Transgender";
    if (t.includes("FEMALE")) return "Female";
    if (t.includes("MALE")) return "Male";

    return "Male"; // default fallback
  }

  // -------------------------------------------
  // DOB Extraction (OCR decoding + 12 formats)
  // -------------------------------------------
  public extractDOB(text: string): Date {
    const cleaned = text
      .replace(/[O]/g, "0") // OCR fix O → 0
      .replace(/\s+/g, " ")
      .trim();

    // 1. dd/mm/yyyy or dd-mm-yyyy
    let match = cleaned.match(/(\d{2}[\/\-]\d{2}[\/\-]\d{4})/);
    if (match) return this.parseDMY(match[1]);

    // 2. dd mm yyyy
    match = cleaned.match(/\b(\d{2})\s(\d{2})\s(\d{4})\b/);
    if (match) return this.parseDMY(`${match[1]}/${match[2]}/${match[3]}`);

    // 3. Continuous: ddmmyyyy
    match = cleaned.match(/\b(\d{2})(\d{2})(\d{4})\b/);
    if (match) return this.parseDMY(`${match[1]}/${match[2]}/${match[3]}`);

    // 4. dd/mm/yy → convert to yyyy
    match = cleaned.match(/(\d{2})[\/\-](\d{2})[\/\-](\d{2})/);
    if (match) {
      const dd = match[1],
        mm = match[2],
        yy = match[3];
      const year = Number(yy) < 30 ? 2000 + Number(yy) : 1900 + Number(yy);
      return this.parseDMY(`${dd}/${mm}/${year}`);
    }

    return new Date("1970-01-01");
  }

  // Convert dd/mm/yyyy → JS date safely
  private parseDMY(d: string): Date {
    const [dd, mm, yyyy] = d.split(/[\/\-]/).map(Number);
    return new Date(yyyy, mm - 1, dd);
  }

  // -------------------------------------------
  // Name Extraction (Hindi safe + English cleanup)
  // -------------------------------------------
  public extractName(text: string): string {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .filter((l) => !/^\d{4}\s?\d{4}\s?\d{4}/.test(l)) // remove Aadhaar num
      .filter((l) => !/GOVERNMENT/i.test(l))
      .filter((l) => !/VID/i.test(l))
      .filter((l) => !/DOB/i.test(l))
      .filter((l) => !/(MALE|FEMALE|TRANSGENDER)/i.test(l))
      .filter((l) => !/^\d+$/.test(l)) // skip pure numbers
      .filter((l) => l.length > 2);

    // First meaningful line is normally the name
    const raw = lines[0] || "";

    // Keep Hindi + English, remove garbage
    const cleaned = raw.replace(/[^\p{L}\s]/gu, "").trim();

    // Normalize English capitalization
    return cleaned
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  }

  // -------------------------------------------
  // Address Extraction (multi-line & OCR tolerant)
  // -------------------------------------------
  public extractAddress(text: string): string {
    text = text.replace(/1800\s?300\s?1947[\s\S]*/i, ""); // remove UIDAI footer

    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .filter((l) => !/^\d{4}\s?\d{4}\s?\d{4}/.test(l)) // remove aadhaar
      .filter((l) => !/VID/i.test(l));

    // Find pincode index & build address around it
    let idx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/\b\d{6}\b/.test(lines[i])) {
        idx = i;
      }
    }

    if (idx === -1) return ""; // no address possible

    const start = Math.max(0, idx - 6); // take 6 lines before pincode
    const addrLines = lines.slice(start, idx + 1);

    return addrLines
      .join(", ")
      .replace(/\s{2,}/g, " ")
      .replace(/,{2,}/g, ",")
      .trim();
  }

  // -------------------------------------------
  // Pincode
  // -------------------------------------------
  public extractPincode(text: string): string {
    const match = text.match(/\b\d{6}\b/);
    return match ? match[0] : "";
  }
}

export default AadhaarDataExtractionService;
