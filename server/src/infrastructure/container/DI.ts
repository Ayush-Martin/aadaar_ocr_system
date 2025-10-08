import { TYPES } from "./types";
import container from "./bindings";

import OCRController from "../../presentation/REST/controllers/ocr.controller";
import ErrorHandlerMiddleware from "../../presentation/REST/middlewares/errorHandler.middleware";

// Controllers
export const ocrController = container.get<OCRController>(TYPES.IOCRController);

// Middlewares
export const errorHandlerMiddleware = container.get<ErrorHandlerMiddleware>(
  TYPES.IErrorHandlerMiddleware,
);
