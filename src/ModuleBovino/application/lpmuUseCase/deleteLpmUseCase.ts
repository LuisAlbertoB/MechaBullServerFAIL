import { ILpmRepository } from '../../domain/lpmRepository';

export class DeleteLpmUseCase {
    constructor(private lpmRepository: ILpmRepository) {}

    async execute(id: string) {
        return await this.lpmRepository.delete(id);
    }
}
