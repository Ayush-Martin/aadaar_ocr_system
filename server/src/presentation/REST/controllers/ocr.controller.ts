/* eslint-disable no-undef */
import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/container/types";
import { IParseAadhaarUseCase } from "../../../application/interfaces/useCases/IParseAadhaar.useCase";
import { binder } from "../../../shared/utils/binder";
import { Request, Response, NextFunction } from "express";
import errorCreator from "../../../shared/utils/errorCreator";
import { OCRResponseMessages } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";
import { successResponse } from "../../../shared/utils/responseCreator";

@injectable()
class OCRController {
  constructor(
    @inject(TYPES.IParseAadhaarUseCase) private readonly _parseAadhaarUseCase: IParseAadhaarUseCase,
  ) {
    binder(this);
  }

  public async parseAadhaar(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[] | undefined;

      if (!files || files.length !== 2) {
        throw errorCreator(OCRResponseMessages.IMAGE_NOT_ADDED, StatusCodes.BAD_REQUEST);
      }

      const [{ path: frontImage }, { path: backImage }] = files;

      const dto = await this._parseAadhaarUseCase.parseAadhaar(frontImage, backImage);

      res.status(StatusCodes.OK).json(successResponse("not implemented currently", dto));
    } catch (err) {
      next(err);
    }
  }
}

export default OCRController;
