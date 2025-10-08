import { IAadhaarBackPage, IAadhaarFrontPage } from "../../../shared/types/aadhaar.type";

export interface IAadhaarDataExtractionService {
  extractFrontPageData(text: string): IAadhaarFrontPage;
  extractBackPageData(text: string): IAadhaarBackPage;
}
