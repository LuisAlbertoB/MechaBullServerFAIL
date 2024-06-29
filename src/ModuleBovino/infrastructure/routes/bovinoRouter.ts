import express from "express";
import { bovinoController } from "../dependencies";

export const bovinoRouter = express.Router();

bovinoRouter.get("/get-all", bovinoController.getAllBovinos.bind(bovinoController));
bovinoRouter.post("/get-for-name", bovinoController.getBovino.bind(bovinoController));
bovinoRouter.post("/create", bovinoController.createBovino.bind(bovinoController));
bovinoRouter.put("/update-data/:name", bovinoController.updateBovino.bind(bovinoController));
bovinoRouter.delete("/delete-bovino/:name", bovinoController.deleteBovino.bind(bovinoController));
bovinoRouter.delete("/delete-all", bovinoController.deleteAllBovinos.bind(bovinoController));