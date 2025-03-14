import prisma from '../config/prisma.js';

export const createDenuncia = async (req, res) => {
    try {
        const { titulo, descricao, localizacao } = req.body;

        if (!titulo || !descricao || !localizacao) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const newDenuncia = await prisma.denuncia.create({
            data: {
                titulo,
                descricao,
                localizacao,
            },
        });

        res.status(201).json({ message: 'Denúncia criada com sucesso!', denuncia: newDenuncia });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar denúncia' });
    }
};

export const getDenuncias = async (req, res) => {
    try {
        // Buscar todas as denúncias
        const denuncias = await prisma.denuncia.findMany();

        res.json(denuncias);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar denúncias' });
    }
};

export const getDenunciaByCodigo = async (req, res) => {
    const { codigo } = req.params;

    try {
        const denuncia = await prisma.denuncia.findUnique({
            where: { codigo },
        });

        if (!denuncia) {
            return res.status(404).json({ error: 'Denúncia não encontrada' });
        }

        res.json(denuncia);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao acessar denúncia' });
    }
};

export const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const statusTratado = status.trim().toUpperCase();

    const statusValidos = ["RECEBIDO", "ENCERRADO", "ANALISADO", "EM ANDAMENTO", "ARQUIVADO"];
    if (!statusValidos.includes(statusTratado)) {
        return res.status(400).json({ error: 'Status inválido' });
    }

    try {
        const denunciaAtualizada = await prisma.denuncia.update({
            where: { id: id },
            data: { status: statusTratado }
        });
        res.json(denunciaAtualizada);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o status' });
    }
};

