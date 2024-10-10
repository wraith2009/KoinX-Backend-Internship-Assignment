import getDeviations from "../controllers/deviation.controller.js";
import { Router } from "express";

const deviationROuter = Router();

deviationROuter.route("/deviation").get(getDeviations);

export default deviationROuter;
