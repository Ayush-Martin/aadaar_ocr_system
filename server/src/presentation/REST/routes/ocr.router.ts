import { Router } from "express";
import {
  imageStorageMiddleware,
  ocrController,
} from "../../../infrastructure/container/DI";

const ocrRouter = Router();

ocrRouter.post(
  "/",
  imageStorageMiddleware.execute,
  ocrController.extractAadhaarDetails
);

export default ocrRouter;
