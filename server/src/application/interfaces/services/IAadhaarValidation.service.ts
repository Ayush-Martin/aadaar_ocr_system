export interface IAadhaarValidationService {
  checkValidFrontPage(text: string): boolean;
  checkValidBackPage(text: string): boolean;
}
