import { inject, injectable } from "inversify";
import { binder } from "../../../shared/utils/binder";
import { NextFunction, Request, Response } from "express";
import { TYPES } from "../../../infrastructure/container/types";
import { IExtractTextUseCase } from "../../../application/interface/useCase/IExtractText.useCase";
import { IFileStorageService } from "../../../application/interface/service/IFileStorage.service";
import { IAadhaarValidationUseCase } from "../../../application/interface/useCase/IAadhaarValidation.useCase";
import { IAadhaarDataExtractionUseCase } from "../../../application/interface/useCase/IAadhaarDataExtraction.useCase";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { successResponse } from "../../../shared/utils/responseCreator";
import { OCRResponseMessages } from "../../../shared/constants/responseMessages";

@injectable()
class OCRController {
  constructor(
    @inject(TYPES.ExtractTextUseCase)
    private _extractTextUseCase: IExtractTextUseCase,
    @inject(TYPES.FileStorageService)
    private _fileStorageService: IFileStorageService,
    @inject(TYPES.AadhaarValidationUseCase)
    private _aadhaarValidationUseCase: IAadhaarValidationUseCase,
    @inject(TYPES.AadhaarDataExtractionUseCase)
    private _aadhaarDataExtractionUseCase: IAadhaarDataExtractionUseCase
  ) {
    binder(this);
  }

  public async extractAadhaarDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const [front, back] = req.imageFilePaths!;

      const frontData = await this._extractTextUseCase.execute(front);
      const backData = await this._extractTextUseCase.execute(back);

      await this._aadhaarValidationUseCase.execute(frontData, backData);

      const extractedDetails = await this._aadhaarDataExtractionUseCase.execute(
        frontData,
        backData
      );

      res
        .status(StatusCodes.OK)
        .json(
          successResponse(
            OCRResponseMessages.AADHAAR_DETAILS_EXTRACTED,
            extractedDetails
          )
        );
    } catch (err) {
      next(err);
    } finally {
      await this._fileStorageService.deleteImages(req.imageFilePaths || []);
    }
  }
}

export default OCRController;
