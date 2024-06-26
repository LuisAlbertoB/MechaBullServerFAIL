import express from 'express';
import cors from 'cors'
import { connectDB } from './infrastructure/adapters/db/connect';
//import playerRoutes from './infrastructure/adapters/express/routes/playerRoutes';

// Crear una instancia de la aplicación Express
const app = express();

// Middleware para parsear JSON
app.use(cors())
app.use(express.json());

// Registrar las rutas
//app.use('/api/players', playerRoutes);

// Middleware de manejo de errores
/*app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});*/

connectDB();
export { app };
