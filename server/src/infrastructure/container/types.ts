import AadhaarDataExtractionUseCase from "../../application/useCase/aadhaarDataExtraction.useCase";

export const TYPES = {
  //services
  OCRService: Symbol.for("OCRService"),
  FileStorageService: Symbol.for("FileStorageService"),
  AadhaarDataExtractionService: Symbol.for("AadhaarDataExtractionService"),

  //usecases
  ExtractTextUseCase: Symbol.for("ExtractTextUseCase"),
  AadhaarValidationUseCase: Symbol.for("AadhaarValidationUseCase"),
  AadhaarDataExtractionUseCase: Symbol.for("AadhaarDataExtractionUseCase"),

  //controllers
  OCRController: Symbol.for("OCRController"),

  //Middlewares
  ErrorHandlerMiddleware: Symbol.for("ErrorHandlerMiddleware"),
  ImageStorageMiddleware: Symbol.for("ImageStorageMiddleware"),
} as const;
