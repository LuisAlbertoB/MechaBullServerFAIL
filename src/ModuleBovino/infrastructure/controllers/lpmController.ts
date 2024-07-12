import { Request, Response } from "express";
import { CreateLpmUseCase } from "../../application/lpmuUseCase/createLpmUseCase";
import { GetLpmUseCase } from "../../application/lpmuUseCase/getLpmUseCase";
import { PutLpmUseCase } from "../../application/lpmuUseCase/putLpmUseCase";
import { DeleteLpmUseCase } from "../../application/lpmuUseCase/deleteLpmUseCase";

export class LpmController {
    constructor(
        private createLpmUseCase: CreateLpmUseCase,
        private getLpmUseCase: GetLpmUseCase,
        private putLpmUseCase: PutLpmUseCase,
        private deleteLpmUseCase: DeleteLpmUseCase
    ) {}

    async createLpm(req: Request, res: Response): Promise<void> {
        const { name, description, bovinoId } = req.body;

        if (!name || !description || !bovinoId) {
            res.status(406).json({ message: "Uno o más campos están vacíos." });
            return;
        }

        try {
            const newLpm = await this.createLpmUseCase.createLpm(name, description, bovinoId);
            res.status(201).json(newLpm);
        } catch (error: any) {
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    async getLpm(req: Request, res: Response): Promise<void> {
        const name = req.body.name;

        if (!name) {
            res.status(406).json({ message: "Nombre no válido." });
            return;
        }

        try {
            const lpm = await this.getLpmUseCase.getLpm(name);
            res.json(lpm);
        } catch (error: any) {
            if (error.message === 'Lpm-not-found') {
                res.status(404).json({ message: "Lpm no encontrado." });
            } else {
                res.status(500).json({ message: "Error interno del servidor", error });
            }
        }
    }

    async updateLpm(req: Request, res: Response): Promise<void> {
        const name = req.params.name;
        const updateData = req.body;

        if (!name || !updateData) {
            res.status(406).json({ message: "Nombre o datos de actualización vacíos." });
            return;
        }

        try {
            const updatedLpm = await this.putLpmUseCase.putLpm(name, updateData);
            res.status(200).json({
                lpm: updatedLpm,
                message: "Lpm actualizado correctamente."
            });
        } catch (error: any) {
            if (error.message === 'Lpm-not-found') {
                res.status(404).json({ message: "Lpm no encontrado." });
            } else {
                res.status(500).json({ message: "Error interno del servidor", error });
            }
        }
    }

    async deleteLpm(req: Request, res: Response): Promise<void> {
        const name = req.params.name;

        if (!name) {
            res.status(406).json({ message: "Nombre vacío." });
            return;
        }

        try {
            const deletedLpm = await this.deleteLpmUseCase.deleteLpm(name);
            res.status(200).json({
                lpm: deletedLpm,
                message: "Lpm borrado correctamente."
            });
        } catch (error: any) {
            if (error.message === 'Lpm-not-found') {
                res.status(404).json({ message: "Lpm no encontrado." });
            } else {
                res.status(500).json({ message: "Error interno del servidor", error });
            }
        }
    }
}
