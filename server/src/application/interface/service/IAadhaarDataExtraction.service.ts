export interface IAadhaarDataExtractionService {
  extractAadhaarNumber(text: string): string;
  extractGender(text: string): "Male" | "Female" | "Transgender";
  extractDOB(text: string): Date;
  extractName(text: string): string;
  extractAddress(text: string): string;
  extractPincode(text: string): string;
}
