import { injectable } from "inversify";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { IAppError } from "../../../shared/types/appError.type";
import { binder } from "../../../shared/utils/binder";
import { errorResponse } from "../../../shared/utils/responseCreator";

@injectable()
class ErrorHandlerMiddleware {
  constructor() {
    binder(this);
  }

  /**
   * method to handle errors
   * - if error is not zod error, return appropriate status code and message
   * - if error is zod error, return bad request status code and message
   * @param err
   * @param req
   * @param res
   * @param _next
   * @returns
   */
  public handle(err: IAppError, req: Request, res: Response, _next: NextFunction) {
    console.log(err);

    res
      .status(Number(err.status) || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(err.message));
    return;
  }
}

export default ErrorHandlerMiddleware;
