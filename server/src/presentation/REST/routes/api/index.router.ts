import { Router } from "express";
import { successResponse } from "../../../../shared/utils/responseCreator";

const appRouter = Router();

appRouter.get("/", (_req, res) => {
  res.json(successResponse("api is working"));
});

export default appRouter;
