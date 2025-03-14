import express from 'express';
import { getUsers } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/usuarios', authMiddleware, getUsers);

export default router;
