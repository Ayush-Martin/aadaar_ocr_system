import { inject, injectable } from "inversify";
import { IExtractTextUseCase } from "../interface/useCase/IExtractText.useCase";
import { TYPES } from "../../infrastructure/container/types";
import { IOCRService } from "../interface/service/infraStructureService/IOCR.service";

@injectable()
class ExtractTextUseCase implements IExtractTextUseCase {
  constructor(@inject(TYPES.OCRService) private _ocrService: IOCRService) {}

  /**
   * Takes stored image path and returns raw text extracted from it
   * @param image
   * @returns
   */
  public async execute(image: string): Promise<string> {
    return await this._ocrService.extractText(image);
  }
}

export default ExtractTextUseCase;
