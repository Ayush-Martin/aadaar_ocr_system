import { Router } from "express";
import upload from "../../../../shared/config/multer";
import { ocrController } from "../../../../infrastructure/container/DI";

const ocrRouter = Router();

ocrRouter.route("/parse").post(upload.array("images", 2), ocrController.parseAadhaar);

export default ocrRouter;
