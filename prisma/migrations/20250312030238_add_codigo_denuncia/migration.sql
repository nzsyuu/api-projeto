/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Denuncia` will be added. If there are existing duplicate values, this will fail.
  - The required column `codigo` was added to the `Denuncia` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Denuncia" ADD COLUMN     "codigo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Denuncia_codigo_key" ON "Denuncia"("codigo");
