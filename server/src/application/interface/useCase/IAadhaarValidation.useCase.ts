export interface IAadhaarValidationUseCase {
  execute(frontText: string, backText: string): Promise<void>;
}
