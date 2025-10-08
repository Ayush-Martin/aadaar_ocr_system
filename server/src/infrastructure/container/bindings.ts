import { Container } from "inversify";
import { TYPES } from "./types";

//Services Interface
import { ITesseractService } from "../../application/interfaces/services/ITesseract.service";
import { IAadhaarValidationService } from "../../application/interfaces/services/IAadhaarValidation.service";
import { IAadhaarDataExtractionService } from "../../application/interfaces/services/IAadhaarDataExtraction.service";

//Services Implementation
import TesseractService from "../services/tesseract.service";
import AadhaarValidationService from "../services/aadhaarValidation.service";
import AadhaarDataExtractionService from "../services/aadhaarDataExtraction.service";

//UseCases Interface
import { IParseAadhaarUseCase } from "../../application/interfaces/useCases/IParseAadhaar.useCase";

//UseCases Implementation
import ParseAadhaarUseCase from "../../application/useCases/parseAadhaar.useCase";

//Controller Implementation
import OCRController from "../../presentation/REST/controllers/ocr.controller";

//Middleware Implementations
import ErrorHandlerMiddleware from "../../presentation/REST/middlewares/errorHandler.middleware";

const container = new Container();

//-----Services-----
container.bind<ITesseractService>(TYPES.ITesseractService).to(TesseractService);
container
  .bind<IAadhaarValidationService>(TYPES.IAadhaarValidationService)
  .to(AadhaarValidationService);

//-----Services-----
container.bind<IParseAadhaarUseCase>(TYPES.IParseAadhaarUseCase).to(ParseAadhaarUseCase);
container
  .bind<IAadhaarDataExtractionService>(TYPES.IAadhaarDataExtractionService)
  .to(AadhaarDataExtractionService);

//----- Middlewares ------
container.bind<ErrorHandlerMiddleware>(TYPES.IErrorHandlerMiddleware).to(ErrorHandlerMiddleware);

//----- Controllers ------
container.bind<OCRController>(TYPES.IOCRController).to(OCRController);

export default container;
