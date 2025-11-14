import { config } from "dotenv";

config();
export const envConfig = {
  PORT: process.env.PORT || 5000,
  FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN || ["http://localhost:3000"],
} as const;