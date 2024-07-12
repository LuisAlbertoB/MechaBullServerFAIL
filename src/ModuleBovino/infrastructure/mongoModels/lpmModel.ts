import mongoose, { Schema, Document } from 'mongoose';

// Define la interfaz que describe la estructura del documento de Lpm en Mongoose
export interface LpmDocument extends Document {
    name: string;
    description: string;
    // Relaciona con el ID del bovino
    bovinoId: mongoose.Types.ObjectId;
}

// Define el esquema (Schema) de Mongoose para Lpm utilizando la interfaz LpmDocument
const LpmSchema: Schema<LpmDocument> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    bovinoId: { type: Schema.Types.ObjectId, ref: 'Bovino' } // Referencia al modelo Bovino
});

// Crea y exporta el modelo de Mongoose basado en el esquema y la interfaz definidos
export const Lpm = mongoose.model<LpmDocument>('Lpm', LpmSchema);
