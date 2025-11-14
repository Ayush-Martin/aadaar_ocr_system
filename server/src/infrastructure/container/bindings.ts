import { Container } from "inversify";
import OCRController from "../../presentation/REST/controllers/ocr.controller";
import { TYPES } from "./types";
import ErrorHandlerMiddleware from "../../presentation/REST/middlewares/errorHandler.middleware";
import TesseractOcrService from "../service/TesseractOcr.service";
import MulterService from "../service/Multer.service";
import ImageStorageMiddleware from "../../presentation/REST/middlewares/imageStorage.middleware";
import { IExtractTextUseCase } from "../../application/interface/useCase/IExtractText.useCase";
import ExtractTextUseCase from "../../application/useCase/extractText.useCase";
import { IOCRService } from "../../application/interface/service/IOCR.service";
import { IFileStorageService } from "../../application/interface/service/IFileStorage.service";
import { IAadhaarValidationUseCase } from "../../application/interface/useCase/IAadhaarValidation.useCase";
import AadhaarValidationUseCase from "../../application/useCase/aadhaarValidation.useCase";
import { IAadhaarDataExtractionUseCase } from "../../application/interface/useCase/IAadhaarDataExtraction.useCase";
import AadhaarDataExtractionUseCase from "../../application/useCase/aadhaarDataExtraction.useCase";
import { IAadhaarDataExtractionService } from "../../application/interface/service/IAadhaarDataExtraction.service";
import AadhaarDataExtractionService from "../../application/service/aadhaarDataExtraction.service";

const container = new Container();

//Services
container.bind<IOCRService>(TYPES.OCRService).to(TesseractOcrService);
container.bind<IFileStorageService>(TYPES.FileStorageService).to(MulterService);
container
  .bind<IAadhaarDataExtractionService>(TYPES.AadhaarDataExtractionService)
  .to(AadhaarDataExtractionService);

//UseCases
container
  .bind<IExtractTextUseCase>(TYPES.ExtractTextUseCase)
  .to(ExtractTextUseCase);

container
  .bind<IAadhaarValidationUseCase>(TYPES.AadhaarValidationUseCase)
  .to(AadhaarValidationUseCase);

container
  .bind<IAadhaarDataExtractionUseCase>(TYPES.AadhaarDataExtractionUseCase)
  .to(AadhaarDataExtractionUseCase);

//Middlewares
container
  .bind<ErrorHandlerMiddleware>(TYPES.ErrorHandlerMiddleware)
  .to(ErrorHandlerMiddleware);

container
  .bind<ImageStorageMiddleware>(TYPES.ImageStorageMiddleware)
  .to(ImageStorageMiddleware);

//Controllers
container.bind<OCRController>(TYPES.OCRController).to(OCRController);

export default container;
