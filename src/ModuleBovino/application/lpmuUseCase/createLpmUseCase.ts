import { ILpmRepository } from '../../domain/lpmRepository';
import { Lpm } from '../../domain/models/lpm';

export class CreateLpmUseCase {
    constructor(private lpmRepository: ILpmRepository) {}

    async execute(lpm: Lpm) {
        return await this.lpmRepository.create(lpm);
    }
}
