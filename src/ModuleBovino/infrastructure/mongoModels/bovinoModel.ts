import mongoose, { Schema, Document } from 'mongoose';

// Define la interfaz que describe la estructura del documento de Bovino en Mongoose
export interface BovinoDocument extends Document {
    name: string;
    siniga: string;
    age: number;
    lpm: mongoose.Types.ObjectId | null; // Relación con el ID de Lpm
    averageSteps: number;
    location: number;
}

// Define el esquema (Schema) de Mongoose para Bovino utilizando la interfaz BovinoDocument
const BovinoSchema: Schema<BovinoDocument> = new Schema({
    name: { type: String, required: true },
    siniga: { type: String, required: true },
    age: { type: Number, required: true },
    lpm: { type: Schema.Types.ObjectId, ref: 'Lpm', default: null }, // Referencia al modelo Lpm
    averageSteps: { type: Number, default: 0 },
    location: { type: Number, default: 0 },
});

// Crea y exporta el modelo de Mongoose basado en el esquema y la interfaz definidos
export const Bovino = mongoose.model<BovinoDocument>('Bovino', BovinoSchema);
