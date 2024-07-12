import { ILpmRepository } from '../../domain/lpmRepository';
import { Lpm } from '../../domain/models/lpm';

export class PutLpmUseCase {
    constructor(private lpmRepository: ILpmRepository) {}

    async execute(id: string, lpm: Lpm) {
        return await this.lpmRepository.update(id, lpm);
    }
}
