export const TYPES = {
  //Infrastructure Services
  OCRService: Symbol.for("OCRService"),
  FileStorageService: Symbol.for("FileStorageService"),

  //Domain Services
  AadhaarNumberExtractionService: Symbol.for("AadhaarNumberExtractionService"),
  GenderExtractionService: Symbol.for("GenderExtractionService"),
  DOBExtractionService: Symbol.for("DOBExtractionService"),
  NameExtractionService: Symbol.for("NameExtractionService"),
  AddressExtractionService: Symbol.for("AddressExtractionService"),
  PincodeExtractionService: Symbol.for("PincodeExtractionService"),
  AadhaarValidationService: Symbol.for("AadhaarValidationService"),

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
