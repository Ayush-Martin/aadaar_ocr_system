export interface ITesseractService {
  extractTextFromImage(image: string): Promise<string>;
}
