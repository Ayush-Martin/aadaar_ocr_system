import { NextFunction, Request, Response } from "express";

export interface IFileStorageService {
  getUploadMiddleware(
    fieldName: string,
    maxCount: number
  ): (req: Request, res: Response, next: NextFunction) => void;
  getImagePaths(req: Request): string[];
  deleteImages(paths: string[]): Promise<void>;
}
