import multer from "multer";
import fs from "fs";
import path from "path";
import { IFileStorageService } from "../../application/interface/service/IFileStorage.service";
import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";

@injectable()
class MulterService implements IFileStorageService {
  private upload: multer.Multer;

  constructor() {
    const storage = this.getStorage();
    this.upload = multer({ storage });
  }

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

  public getUploadMiddleware(
    filedName: string,
    maxCount: number
  ): (req: Request, res: Response, next: NextFunction) => void {
    return this.upload.array(filedName, maxCount);
  }

  public getImagePaths(req: Request): string[] {
    const files = req.files as Express.Multer.File[] | undefined;
    return files?.map((file) => file.path) || [];
  }

  public async deleteImages(paths: string[]): Promise<void> {
    await Promise.all(
      paths.map(
        (p) => new Promise<void>((resolve) => fs.unlink(p, () => resolve()))
      )
    );
  }
}

export default MulterService;
