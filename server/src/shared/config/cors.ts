import cors, { CorsOptions } from "cors";
import { envConfig } from "./env";

console.log(envConfig.FRONTEND_DOMAIN);

export const corsOptions: CorsOptions = {
  origin: envConfig.FRONTEND_DOMAIN,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
