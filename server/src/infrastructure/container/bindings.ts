import { Container } from "inversify";
import { TYPES } from "./types";

//Middleware Implementations
import ErrorHandlerMiddleware from "../../presentation/REST/middlewares/errorHandler.middleware";

const container = new Container();

//----- Middlewares ------
container.bind<ErrorHandlerMiddleware>(TYPES.IErrorHandlerMiddleware).to(ErrorHandlerMiddleware);

export default container;
