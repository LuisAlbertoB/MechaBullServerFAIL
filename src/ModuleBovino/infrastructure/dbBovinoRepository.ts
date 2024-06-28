import { Bovino } from "../domain/bovino";
import { BovinoRepository } from "../domain/bovinoRepository";
import { Bovino as BovinoSquema } from "./mongoModels/bovinoModel";

export class DbBovinoRepository implements BovinoRepository{
    async createBovino(bovinoName: string, bovinoSiniga: string, bovinoAge: number): Promise<Bovino> {
        const newBovinoDocument = new BovinoSquema({
            name: bovinoName,
            siniga: bovinoSiniga,
            age: bovinoAge
        });
        const savedBovinoDocument = await newBovinoDocument.save();
        const newBovino = new Bovino(savedBovinoDocument.name, savedBovinoDocument.siniga, savedBovinoDocument.age)
        return newBovino;
    }

}