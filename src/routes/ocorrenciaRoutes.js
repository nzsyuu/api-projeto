import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createOcorrencia, getOcorrenciaDetalhada, getOcorrencias, updateOcorrencia } from '../controllers/ocorrenciaController.js';

const router = express.Router();

router.post('/ocorrencias', authMiddleware, createOcorrencia)
router.get('/ocorrencias', getOcorrencias)
router.get('/ocorrencias/:id', authMiddleware, getOcorrenciaDetalhada)
router.put('/ocorrencias/:id', authMiddleware, updateOcorrencia)

export default router;