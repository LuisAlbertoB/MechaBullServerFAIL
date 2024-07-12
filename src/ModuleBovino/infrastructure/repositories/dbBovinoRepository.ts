import { Model } from "mongoose";
import { Bovino } from "../../domain/models/bovino";
import { BovinoRepository } from "../../domain/bovinoRepository";
import { Bovino as BovinoModel } from "../mongoModels/bovinoModel";
import { UpdateBovinoData } from "../../domain/types/typesBovino";

export class DbBovinoRepository implements BovinoRepository {
    dbBovinoRepository:DbBovinoRepository

    async getAllBovinos(): Promise<Bovino[] | null> {
        try {
            const bovinosDocuments = await BovinoModel.find().exec();
            const bovinos: Bovino[] = bovinosDocuments.map(doc => new Bovino(
                doc.id,
                doc.name,
                doc.siniga,
                doc.age
            ));
            return bovinos;
        } catch (error) {
            console.error('Error al obtener todos los bovinos:', error);
            return null;
        }
    }

    async getBovino(name: string): Promise<Bovino | null> {
        try {
            const bovinoDocument = await BovinoModel.findOne({ name }).exec();
            if (!bovinoDocument) {
                return null;
            }
            return new Bovino(
                bovinoDocument.id,
                bovinoDocument.name,
                bovinoDocument.siniga,
                bovinoDocument.age
            );
        } catch (error) {
            console.error("Error al obtener el bovino por el id:", error);
            throw error;
        }
    }

    async createBovino(name: string, siniga: string, age: number): Promise<Bovino> {
        try {
            const newBovino = new BovinoModel({name: name, siniga: siniga, age: age});
            const savedBovinoDocument = await newBovino.save();
            return new Bovino(
                savedBovinoDocument.id,
                savedBovinoDocument.name,
                savedBovinoDocument.siniga,
                savedBovinoDocument.age
            );
        } catch (error) {
            console.log("Error al crear el bovino", error);
            throw error;
        }
    }

    async checkRepit(name: string): Promise<Bovino | null> {
        try {
            const bovinoDocument = await BovinoModel.findOne({name}).exec()
            if(!bovinoDocument){
                return null
            }
            return new Bovino(
                bovinoDocument.id,
                bovinoDocument.name,
                bovinoDocument.siniga,
                bovinoDocument.age
            );
        } catch (error) {
            console.log('Error al buscar repetidos')
            throw error;
        }
    }

    async putBovino(name: string, updateData: UpdateBovinoData): Promise<Bovino | null> {
        try {
            const bovinoEncontrado = await BovinoModel.findOne({ name }).exec();
            if (!bovinoEncontrado) {
                return null;
            }
            Object.assign(bovinoEncontrado, updateData);
            await bovinoEncontrado.save();
            return bovinoEncontrado.toObject() as Bovino
        } catch (error) {
            console.log("Error al actualizar bovino", error);
            throw error;
        }
    }

    async deleteBovino(name: string): Promise<Bovino | null> {
        try {
            const bovinoEncontrado = await BovinoModel.findOneAndDelete({ name }).exec();
            if (!bovinoEncontrado) {
                return null;
            }
            return bovinoEncontrado.toObject() as Bovino;
        } catch (error) {
            console.log("Error al eliminar bovino", error);
            throw error;
        }
    }

    async deleteAllBovinos(): Promise<{ deleteCount: number; } | null> {
        try {
            const result = await BovinoModel.deleteMany().exec();
            return {deleteCount: result.deletedCount ?? 0}
        } catch (error) {
            console.log('Error al borrar todos los bovinos', error)
            return null
        }
    }
}
