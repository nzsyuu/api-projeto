import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/cadastro', registerUser);
router.post('/login', loginUser);

export default router;
