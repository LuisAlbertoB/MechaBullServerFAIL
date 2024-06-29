import { CreateBovinoUseCase } from "../application/createBovinoUseCase";
import { DeletsBovinoUseCase } from "../application/deletsBovinoUseCase";
import { GetsBovinoUseCase } from "../application/getsBovinoUseCase";
import { PutsBovinoUseCase } from "../application/putsBovinoUseCase";
import { BovinoController } from "./controllers/bovinoController";
import { DbBovinoRepository } from "./repositories/dbBovinoRepository";

const dbBovinoRepository = new DbBovinoRepository()

export const getBovinoUseCase = new GetsBovinoUseCase(dbBovinoRepository);
export const createBovinoUseCase = new CreateBovinoUseCase(dbBovinoRepository);
export const putsBovinoUseCase = new PutsBovinoUseCase(dbBovinoRepository)
export const deletsBovinoUseCase = new DeletsBovinoUseCase(dbBovinoRepository)

export const bovinoController = new BovinoController(
    getBovinoUseCase,
    createBovinoUseCase,
    putsBovinoUseCase,
    deletsBovinoUseCase
)

