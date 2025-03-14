import prisma from '../config/prisma.js';

export const createOcorrencia = async (req, res) => {
    try {
        const { titulo, descricao, denunciaId} = req.body;

        const ocorrencia = await prisma.ocorrencia.create({
            data: { titulo, descricao, denunciaId }
        });

        res.status(201).json(ocorrencia);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar ocorrência' });
    }
}

export const getOcorrencias = async (req, res) => {
    try {
        const ocorrencias = await prisma.ocorrencia.findMany();
        res.json(ocorrencias);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar ocorrências' });
    }
}

export const getOcorrenciaDetalhada = async (req, res) => {
    try {
        const id  = parseInt(req.params.id, 10);
        
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const ocorrencia = await prisma.ocorrencia.findUnique({
            where: { id }, 
            include: {
                denuncia: true
            }
        });
        res.json(ocorrencia);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar ocorrências ${error.message}` });
    }
}

export const updateOcorrencia = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const ocorrencia = await prisma.ocorrencia.update({
            where: { id: parseInt(id) },
            data: { status }
        });

        res.json(ocorrencia);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar ocorrência' });
    }
};

export const deletOcorrencia = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.ocorrencia.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Ocorrência deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar ocorrência' });
    }
};