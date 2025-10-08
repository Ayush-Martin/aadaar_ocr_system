import { Application } from "express";
import express from "express";
import dotenv from "dotenv";
import cors from "./shared/config/cors";
import morgan from "morgan";
import apiRouter from "./presentation/REST/routes/api/index.router";
import { errorHandlerMiddleware } from "./infrastructure/container/DI";
import nocache from "nocache";

class App {
  public app: Application;

  constructor() {
    dotenv.config();
    this.app = express();
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors);
    this.app.use(nocache());
    this.app.use("/api", apiRouter);
    this.app.use(errorHandlerMiddleware.handle);
  }
}

export default App;
