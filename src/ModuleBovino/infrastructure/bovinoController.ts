import { Request, Response } from "express";
import { CreateBovinoUseCase } from "../application/createBovinoUseCase";

export class BovinoController {
    constructor(private createBovinoUseCase: CreateBovinoUseCase){}

    async bovinoControllerRun (req: Request, res: Response){
        const name = req.body.name;
        const siniga = req.body.siniga;
        const age = req.body.age;

        await this.createBovinoUseCase.create(name, siniga, age)

        res.status(200).send()
    }
}