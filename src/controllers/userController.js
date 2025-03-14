import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

// Cadastro de usuário
export const registerUser = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const hashedPassword = await bcrypt.hash(senha, 10);

        const newUser = await prisma.usuario.create({
            data: { nome, email, senha: hashedPassword }
        });

        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
};

// Login de usuário
export const loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await prisma.usuario.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(senha, user.senha))) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '10h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro no login' });
    }
};

// Rota protegida: Listar usuários
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.usuario.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};
