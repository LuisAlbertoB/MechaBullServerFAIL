import express from 'express';
import cors from 'cors'
import { connectDB } from './infrastructure/adapters/db/connect';


import { bovinoRouter } from './ModuleBovino/infrastructure/bovinoRouter';

const app = express();


app.use(cors())
app.use(express.json());

app.use('/api/bovino', bovinoRouter);

// Middleware de manejo de errores

connectDB();
export { app };
