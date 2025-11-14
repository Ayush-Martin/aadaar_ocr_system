import ParseAadhaarDTO from "../../DTO/aadhaar.dto";

export interface IAadhaarDataExtractionUseCase {
  execute(frontText: string, backText: string): Promise<ParseAadhaarDTO>;
}
