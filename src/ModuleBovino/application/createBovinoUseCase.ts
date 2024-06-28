
import { BovinoRepository } from '../domain/bovinoRepository'
export class CreateBovinoUseCase {
    constructor(private bovinoRepository: BovinoRepository){}

    async create(name:string, siniga:string, age:number){
        try {
            const bovino = await this.bovinoRepository.createBovino(name, siniga, age);
            console.log(`Bovino creado y guardado en MongoDB: ${bovino.getName()}`);

        } catch (error) {
            console.error("Error al crear bovino:", error);
            throw error;
        }
    }
}