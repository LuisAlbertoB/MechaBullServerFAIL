import express from "express";
import { bovinoController } from "./dependencies";

export const bovinoRouter = express.Router();

bovinoRouter.post("/", bovinoController.bovinoControllerRun.bind(bovinoController));

