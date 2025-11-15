import { injectable } from "inversify";
import { IOCRService } from "../../application/interface/service/infraStructureService/IOCR.service";
import { createWorker } from "tesseract.js";

@injectable()
class TesseractOcrService implements IOCRService {
  /**
   * Takes stored image path and returns raw text extracted from it
   * @param image
   * @returns
   */
  public async extractText(image: string): Promise<string> {
    const worker = await createWorker("eng");
    const ret = await worker.recognize(image);
    await worker.terminate();
    return ret.data.text;
  }
}

export default TesseractOcrService;
