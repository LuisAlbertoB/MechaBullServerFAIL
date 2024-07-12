
import { Bovino } from '../../domain/models/bovino';
import { BovinoRepository } from '../../domain/bovinoRepository'
export class CreateBovinoUseCase {
    constructor(private bovinoRepository: BovinoRepository){}

    async create(name:string, siniga:string, age:number): Promise<Bovino>{
        const existingBovino = await this.bovinoRepository.checkRepit(name);
        if(!existingBovino){
            throw new Error("exist")
        } else {
            await this.bovinoRepository.getBovino(get.name)
        }
        
        const bovinoCreate = await this.bovinoRepository.createBovino(name, siniga, age);
        return bovinoCreate;
    }

}