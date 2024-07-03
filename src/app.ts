import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db/connect';
import { bovinoRouter } from './ModuleBovino/infrastructure/routes/bovinoRouter';
import  userRouter  from './ModuleUser/infraestructure/routes/useRoutes'; // Importa las rutas de usuario

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/bovinos', bovinoRouter);
app.use('/api/users', userRouter); // Usa las rutas de usuario

// Middleware de manejo de errores

connectDB();
export { app };
