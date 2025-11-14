import { Router } from "express";
import ocrRouter from "./ocr.router";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
  });
});

router.use("/ocr", ocrRouter);

export default router;
