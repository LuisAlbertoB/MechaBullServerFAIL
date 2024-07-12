import { ILpmRepository } from '../../domain/lpmRepository';

export class GetLpmUseCase {
    constructor(private lpmRepository: ILpmRepository) {}

    async execute(id: string) {
        return await this.lpmRepository.get(id);
    }
}
