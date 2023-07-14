import express from "express";
import jobController from "../controllers/job-controller";
import { isAuth } from "../middleware/authjwt-middleware";

const apiRouter = express.Router();

apiRouter.use(isAuth);
apiRouter.use("/api/v1", apiRouter);
apiRouter.post("/recruitment/positions", jobController.create);
apiRouter.put("/recruitment/positions/:id", jobController.update);
apiRouter.get("/recruitment/positions/:id", jobController.findById);
apiRouter.get("/recruitment/positions", jobController.findAll);

export { apiRouter };
