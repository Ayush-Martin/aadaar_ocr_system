export const TYPES = {
  //Services
  ITesseractService: Symbol.for("ITesseractService"),
  IAadhaarValidationService: Symbol.for("IAadhaarValidationService"),
  IAadhaarDataExtractionService: Symbol.for("IAadhaarDataExtractionService"),

  //UseCases
  IParseAadhaarUseCase: Symbol.for("IParseAadhaarUseCase"),

  //Controllers
  IOCRController: Symbol.for("IOCRController"),

  //Middlewares
  IErrorHandlerMiddleware: Symbol.for("IErrorHandlerMiddleware"),
};
