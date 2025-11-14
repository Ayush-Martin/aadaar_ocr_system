import { NextFunction, Request, Response } from "express";
import { binder } from "../../../shared/utils/binder";
import { inject } from "inversify";
import { IFileStorageService } from "../../../application/interface/service/IFileStorage.service";
import { TYPES } from "../../../infrastructure/container/types";
import errorCreator from "../../../shared/utils/errorCreator";
import { OCRResponseMessages } from "../../../shared/constants/responseMessages";
import { StatusCodes } from "../../../shared/constants/statusCodes";

class ImageStorageMiddleware {
  constructor(
    @inject(TYPES.FileStorageService)
    private _fileStorageService: IFileStorageService
  ) {
    binder(this);
  }

  public execute(req: Request, res: Response, next: NextFunction) {
    const upload = this._fileStorageService.getUploadMiddleware("images", 2);

    upload(req, res, (err) => {
      if (err) {
        next(err);
        return;
      }

      const paths = this._fileStorageService.getImagePaths(req);

      if (!paths || paths.length !== 2) {
        return next(
          errorCreator(
            OCRResponseMessages.IMAGE_NOT_ADDED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      req.imageFilePaths = paths;
      next();
    });
  }
}

export default ImageStorageMiddleware;
