import { Request, Response } from "express";
import { CreateBovinoUseCase } from "../../application/useCase/createBovinoUseCase";
import { GetsBovinoUseCase } from "../../application/useCase/getsBovinoUseCase";
import { PutsBovinoUseCase } from "../../application/useCase/putsBovinoUseCase";
import { DeletsBovinoUseCase } from "../../application/useCase/deletsBovinoUseCase";

export class BovinoController {
    constructor(
        private getsBovinoUseCase: GetsBovinoUseCase,
        private createBovinoUseCase: CreateBovinoUseCase,
        private putBovinoUseCase: PutsBovinoUseCase,
        private deleteBovinoUseCase: DeletsBovinoUseCase
    ) {}

    async getAllBovinos(req: Request, res: Response): Promise<void> {
        // Implementación actual del método
    }

    async getBovino(req: Request, res: Response): Promise<void> {
        // Implementación actual del método
    }

    async createBovino(req: Request, res: Response): Promise<void> {
        // Implementación actual del método
    }

    async updateBovino(req: Request, res: Response): Promise<void> {
        // Implementación actual del método
    }

    async deleteBovino(req: Request, res: Response): Promise<void> {
        // Implementación actual del método
    }

    async deleteAllBovinos(req: Request, res: Response): Promise<void> {
        // Implementación actual del método
    }

    async assignLpm(req: Request, res: Response): Promise<void> {
        const { bovinoId, lpmId } = req.params;

        if (!bovinoId || !lpmId) {
            res.status(406).json({ message: "IDs de bovino o Lpm faltantes." });
            return;
        }

        try {
            const updatedBovino = await this.putBovinoUseCase.assignLpm(bovinoId, lpmId);
            res.status(200).json({
                bovino: updatedBovino,
                message: "Lpm asignado correctamente al bovino."
            });
        } catch (error: any) {
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }
}
