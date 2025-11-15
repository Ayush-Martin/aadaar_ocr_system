export interface IAadhaarValidationService {
  validateFrontPage(frontText: string): boolean;
  validateBackPage(backText: string): boolean;
}
