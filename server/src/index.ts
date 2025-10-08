import App from "./app";
import http from "http";
import "reflect-metadata";

import { envConfig } from "./shared/config/env";

const appInstance = new App();
const server = http.createServer(appInstance.app);

server.listen(envConfig.PORT, () => {
  console.info(`[Server] Running on port ${envConfig.PORT}`);
});
