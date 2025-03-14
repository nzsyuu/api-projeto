import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import publicRoutes from './routes/publicRoutes.js';
import userRoutes from './routes/userRoutes.js';
import denunciaRoutes from './routes/denunciaRoutes.js';
import ocorrenciaRoutes from  './routes/ocorrenciaRoutes.js'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', publicRoutes);
app.use('/api', userRoutes);
app.use('/api', denunciaRoutes);
app.use('/api', ocorrenciaRoutes);

export default app; 
