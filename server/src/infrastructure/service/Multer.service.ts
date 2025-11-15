import multer from "multer";
import fs from "fs";
import path from "path";
import { IFileStorageService } from "../../application/interface/service/infraStructureService/IFileStorage.service";
import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";

@injectable()
class MulterService implements IFileStorageService {
  private upload: multer.Multer;

  constructor() {
    const storage = this.getStorage();
    this.upload = multer({ storage });
  }

  /**
   * Create a disk storage for multer
   * @returns
   */
  private getStorage() {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        const dir = path.join(__dirname, "../../../uploads");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${name}-${Date.now()}${ext}`);
      },
    });
  }

  /**
   * This function returns the middleware for multer
   * @param filedName
   * @param maxCount
   * @returns
   */
  public getUploadMiddleware(
    filedName: string,
    maxCount: number
  ): (req: Request, res: Response, next: NextFunction) => void {
    return this.upload.array(filedName, maxCount);
  }

  /**
   * This function returns the paths of the uploaded images
   * @param req
   * @returns
   */
  public getImagePaths(req: Request): string[] {
    const files = req.files as Express.Multer.File[] | undefined;
    return files?.map((file) => file.path) || [];
  }

  /**
   * It deletes the images based on the given paths
   * @param paths
   */
  public async deleteImages(paths: string[]): Promise<void> {
    await Promise.all(
      paths.map(
        (p) => new Promise<void>((resolve) => fs.unlink(p, () => resolve()))
      )
    );
  }
}

export default MulterService;
