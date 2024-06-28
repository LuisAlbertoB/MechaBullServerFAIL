import { CreateBovinoUseCase } from "../application/createBovinoUseCase";
import { BovinoController } from "./bovinoController";
import { DbBovinoRepository } from "./dbBovinoRepository";

const dbBovinoRepository = new DbBovinoRepository()

export const createBovinoUseCase = new CreateBovinoUseCase(dbBovinoRepository);

export const bovinoController = new BovinoController(createBovinoUseCase)

