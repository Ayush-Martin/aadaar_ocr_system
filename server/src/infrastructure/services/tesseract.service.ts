import { injectable } from "inversify";
import { ITesseractService } from "../../application/interfaces/services/ITesseract.service";
import { createWorker } from "tesseract.js";

@injectable()
class TesseractService implements ITesseractService {
  /**
   * method to extract text from provided image
   * @param image
   * @returns
   */
  public async extractTextFromImage(image: string): Promise<string> {
    const worker = await createWorker("eng");
    const ret = await worker.recognize(image);
    await worker.terminate();
    return ret.data.text;
  }
}

export default TesseractService;
