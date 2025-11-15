import { Container } from "inversify";
import OCRController from "../../presentation/REST/controllers/ocr.controller";
import { TYPES } from "./types";
import ErrorHandlerMiddleware from "../../presentation/REST/middlewares/errorHandler.middleware";
import TesseractOcrService from "../service/TesseractOcr.service";
import MulterService from "../service/Multer.service";
import ImageStorageMiddleware from "../../presentation/REST/middlewares/imageStorage.middleware";
import { IExtractTextUseCase } from "../../application/interface/useCase/IExtractText.useCase";
import ExtractTextUseCase from "../../application/useCase/extractText.useCase";
import { IOCRService } from "../../application/interface/service/infraStructureService/IOCR.service";
import { IFileStorageService } from "../../application/interface/service/infraStructureService/IFileStorage.service";
import { IAadhaarValidationUseCase } from "../../application/interface/useCase/IAadhaarValidation.useCase";
import AadhaarValidationUseCase from "../../application/useCase/aadhaarValidation.useCase";
import { IAadhaarDataExtractionUseCase } from "../../application/interface/useCase/IAadhaarDataExtraction.useCase";
import AadhaarDataExtractionUseCase from "../../application/useCase/aadhaarDataExtraction.useCase";
import { IAadhaarNumberExtractionService } from "../../application/interface/service/domainService/IAadhaarNumberExtraction.service";
import AadhaarNumberExtractionService from "../../domain/services/aadhaarNumberExtraction.service";
import { IGenderExtractionService } from "../../application/interface/service/domainService/IGenderExtraction.service";
import GenderExtractionService from "../../domain/services/genderExtraction.service";
import { IDOBExtractionService } from "../../application/interface/service/domainService/IDOBExtraction.service";
import DOBExtractionService from "../../domain/services/DOBExtraction.service";
import { INameExtractionService } from "../../application/interface/service/domainService/INameExtraction.service";
import NameExtractionService from "../../domain/services/nameExtraction.service";
import { IAddressExtractionService } from "../../application/interface/service/domainService/IAddressExtraction.service";
import AddressExtractionService from "../../domain/services/addressExtraction.service";
import { IAadhaarValidationService } from "../../application/interface/service/domainService/IAadhaarValidation.service";
import AadhaarValidationService from "../../domain/services/aadhaarValidation.service";
import { IPincodeExtractionService } from "../../application/interface/service/domainService/IPincodeExtraction.service";
import PincodeExtractionService from "../../domain/services/pincodeExtraction.service";

const container = new Container();

//Services
container.bind<IOCRService>(TYPES.OCRService).to(TesseractOcrService);
container.bind<IFileStorageService>(TYPES.FileStorageService).to(MulterService);

//Domain Services
container
  .bind<IAadhaarNumberExtractionService>(TYPES.AadhaarNumberExtractionService)
  .to(AadhaarNumberExtractionService);
container
  .bind<IGenderExtractionService>(TYPES.GenderExtractionService)
  .to(GenderExtractionService);
container
  .bind<IDOBExtractionService>(TYPES.DOBExtractionService)
  .to(DOBExtractionService);
container
  .bind<INameExtractionService>(TYPES.NameExtractionService)
  .to(NameExtractionService);
container
  .bind<IAddressExtractionService>(TYPES.AddressExtractionService)
  .to(AddressExtractionService);
container
  .bind<IAadhaarValidationService>(TYPES.AadhaarValidationService)
  .to(AadhaarValidationService);
container
  .bind<IPincodeExtractionService>(TYPES.PincodeExtractionService)
  .to(PincodeExtractionService);

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
