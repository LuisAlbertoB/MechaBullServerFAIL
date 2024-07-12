import { BovinoRepository } from "../../domain/bovinoRepository";
import { LpmRepository } from "../../domain/lpmRepository";

export class AssignLpmUseCase {
    constructor(
        private bovinoRepository: BovinoRepository,
        private lpmRepository: LpmRepository
    ) {}

    async assignLpm(bovinoId: string, lpmId: string): Promise<boolean> {
        try {
            const bovino = await this.bovinoRepository.getBovino(bovinoId);
            const lpm = await this.lpmRepository.getLpmById(lpmId);

            if (!bovino || !lpm) {
                throw new Error("Bovino o Lpm no encontrados.");
            }

            // Asignar Lpm al bovino
            bovino.lpm = lpmId;
            await this.bovinoRepository.updateBovino(bovinoId, bovino);

            return true;
        } catch (error) {
            console.error("Error al asignar Lpm:", error);
            throw error;
        }
    }
}
