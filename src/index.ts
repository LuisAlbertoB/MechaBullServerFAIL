import dotenv from 'dotenv';
dotenv.config();
import { startServer } from './infrastructure/adapters/express/server';
startServer();
