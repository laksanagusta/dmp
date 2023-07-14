import express from "express";
import bodyParser from "body-parser";
import { publicRouter } from "../routes/public-api";
import { apiRouter } from "../routes/api";
import { errorMiddleware } from "../middleware/error-middleware";
import { __port } from "../config/credentials";

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(bodyParser.json());

  app.use(publicRouter);
  app.use(apiRouter);
  app.use(errorMiddleware);

  return app;
}

export default createServer;
