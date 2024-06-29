import express from 'express';
import cors from 'cors'
import { connectDB } from './config/db/connect';


import { bovinoRouter } from './ModuleBovino/infrastructure/routes/bovinoRouter';

const app = express();


app.use(cors())
app.use(express.json());

app.use('/api/bovinos', bovinoRouter);

// Middleware de manejo de errores

connectDB();
export { app };
