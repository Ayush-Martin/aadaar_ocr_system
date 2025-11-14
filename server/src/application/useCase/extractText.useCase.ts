import { inject, injectable } from "inversify";
import { IExtractTextUseCase } from "../interface/useCase/IExtractText.useCase";
import { TYPES } from "../../infrastructure/container/types";
import { IOCRService } from "../interface/service/IOCR.service";

injectable();
class ExtractTextUseCase implements IExtractTextUseCase {
  constructor(@inject(TYPES.OCRService) private _ocrService: IOCRService) {}

  public async execute(image: string): Promise<string> {
    return await this._ocrService.extractText(image);
  }
}

export default ExtractTextUseCase;
