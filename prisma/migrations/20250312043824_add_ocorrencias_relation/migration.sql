/*
  Warnings:

  - Added the required column `atualizadoEm` to the `Denuncia` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusDenuncia" AS ENUM ('RECEBIDO', 'ENCERRADO', 'ANALISADO', 'EM_ANDAMENTO', 'ARQUIVADO');

-- CreateEnum
CREATE TYPE "StatusOcorrencia" AS ENUM ('ABERTA', 'CONCLUIDA', 'PENDENTE');

-- AlterTable
ALTER TABLE "Denuncia" ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "StatusDenuncia" NOT NULL DEFAULT 'RECEBIDO';

-- CreateTable
CREATE TABLE "Ocorrencia" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "StatusOcorrencia" NOT NULL DEFAULT 'ABERTA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "denunciaId" INTEGER NOT NULL,

    CONSTRAINT "Ocorrencia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ocorrencia" ADD CONSTRAINT "Ocorrencia_denunciaId_fkey" FOREIGN KEY ("denunciaId") REFERENCES "Denuncia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
