import { config } from "dotenv";

config();
export const envConfig = {
  PORT: process.env.PORT || 5000,
  CORS_DOMAINS: process.env.CORS_DOMAINS?.split(",") || ["http://localhost:3000"],
} as const;
