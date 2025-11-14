import { injectable } from "inversify";
import { IOCRService } from "../../application/interface/service/IOCR.service";
import { createWorker } from "tesseract.js";

@injectable()
class TesseractOcrService implements IOCRService {
  public async extractText(image: string): Promise<string> {
    const worker = await createWorker("eng");
    const ret = await worker.recognize(image);
    await worker.terminate();
    return ret.data.text;
  }
}

export default TesseractOcrService;
