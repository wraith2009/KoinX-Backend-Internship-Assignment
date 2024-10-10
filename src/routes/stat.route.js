import { Router } from "express";
import getStats from "../controllers/stat.controller.js";

const statsRouter = Router();

statsRouter.route("/stats").get(getStats);

export default statsRouter;
