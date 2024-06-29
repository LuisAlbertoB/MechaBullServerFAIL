import express from "express";
import { bovinoController } from "../dependencies";

export const bovinoRouter = express.Router();

bovinoRouter.get("/all", bovinoController.getAllBovinos.bind(bovinoController));
bovinoRouter.post("/name", bovinoController.getBovino.bind(bovinoController));
bovinoRouter.post("/create", bovinoController.createBovino.bind(bovinoController));
bovinoRouter.put("/update-data/:name", bovinoController.updateBovino.bind(bovinoController));
bovinoRouter.delete("/delete-bovino/:name", bovinoController.deleteBovino.bind(bovinoController));
bovinoRouter.delete("/all", bovinoController.deleteAllBovinos.bind(bovinoController));