import express from 'express';
import { createDenuncia, getDenunciaByCodigo, getDenuncias } from '../controllers/denunciaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/denuncias', createDenuncia);
router.get('/denuncias', authMiddleware, getDenuncias);
router.get('/denuncias/:codigo', getDenunciaByCodigo);

export default router;
