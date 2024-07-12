import { CreateBovinoUseCase } from "../application/useCase/createBovinoUseCase";
import { DeletsBovinoUseCase } from "../application/useCase/deletsBovinoUseCase";
import { GetsBovinoUseCase } from "../application/useCase/getsBovinoUseCase";
import { PutsBovinoUseCase } from "../application/useCase/putsBovinoUseCase";
import { BovinoController } from "./controllers/bovinoController";
import { LpmController } from "./controllers/lpmController";
import { DbBovinoRepository } from "./repositories/dbBovinoRepository";
import { DbLpmRepository } from "./repositories/dbLpmRepository";
import { CreateLpmUseCase } from "../application/lpmuUseCase/createLpmUseCase"; // Importa el caso de uso para lpm

// Repositorios para Bovino y lpm
const dbBovinoRepository = new DbBovinoRepository();
const dbLpmRepository = new DbLpmRepository();

// Casos de uso para Bovino y lpm
export const getBovinoUseCase = new GetsBovinoUseCase(dbBovinoRepository);
export const createBovinoUseCase = new CreateBovinoUseCase(dbBovinoRepository);
export const putsBovinoUseCase = new PutsBovinoUseCase(dbBovinoRepository);
export const deletsBovinoUseCase = new DeletsBovinoUseCase(dbBovinoRepository);

export const createLpmUseCase = new CreateLpmUseCase(dbLpmRepository); // Caso de uso para lpm

// Controladores para Bovino y lpm
export const bovinoController = new BovinoController(
    getBovinoUseCase,
    createBovinoUseCase,
    putsBovinoUseCase,
    deletsBovinoUseCase
);

export const lpmController = new LpmController(createLpmUseCase); // Controlador para lpm
