import { Router } from "express";
import * as logController from "./log.controller.js";

export const logRouter = Router();

// => POST "/logs"
logRouter.post("/", logController.insertOneLog);
