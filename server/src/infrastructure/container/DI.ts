import { TYPES } from "./types";
import container from "./bindings";

import ErrorHandlerMiddleware from "../../presentation/REST/middlewares/errorHandler.middleware";

// Controllers

// Middlewares
export const errorHandlerMiddleware = container.get<ErrorHandlerMiddleware>(
  TYPES.IErrorHandlerMiddleware,
);
