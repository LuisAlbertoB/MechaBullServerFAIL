import { Model } from "mongoose";
import { Lpm } from "../../domain/models/lpm";
import { LpmRepository } from "../../domain/lpmRepository";
import { LpmDocument } from "../mongoModels/lpmModel";

export class DbLpmRepository implements LpmRepository {
    create(lpm: Lpm): Promise<Lpm> {
        throw new Error("Method not implemented.");
    }
    get(id: string): Promise<Lpm | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, lpm: Lpm): Promise<Lpm | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    private LpmModel: Model<LpmDocument>;
    dbLpmRepository: DbLpmRepository

    async createLpm(name: string, description: string, bovinoId: string): Promise<Lpm> {
        try {
            const newLpmDocument = new this.LpmModel({
                name: name,
                description: description,
                bovinoId: bovinoId
            });
            const savedLpmDocument = await newLpmDocument.save();
            return savedLpmDocument.toObject() as Lpm;
        } catch (error) {
            console.log("Error al crear Lpm", error);
            throw error;
        }
    }

    async getLpm(name: string): Promise<Lpm | null> {
        try {
            const lpmDocument = await this.LpmModel.findOne({ name }).exec();
            if (lpmDocument) {
                return lpmDocument.toObject() as Lpm;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error al obtener Lpm por nombre:", error);
            throw error;
        }
    }

    async putLpm(name: string, updateData: any): Promise<Lpm | null> {
        try {
            const lpmFound = await this.LpmModel.findOne({ name }).exec();
            if (!lpmFound) {
                return null;
            }
            Object.assign(lpmFound, updateData);
            await lpmFound.save();
            return lpmFound.toObject() as Lpm;
        } catch (error) {
            console.error("Error al actualizar Lpm:", error);
            throw error;
        }
    }

    async deleteLpm(name: string): Promise<Lpm | null> {
        try {
            const deletedLpm = await this.LpmModel.findOneAndDelete({ name }).exec();
            if (!deletedLpm) {
                return null;
            }
            return deletedLpm.toObject() as Lpm;
        } catch (error) {
            console.error("Error al eliminar Lpm:", error);
            throw error;
        }
    }
}
