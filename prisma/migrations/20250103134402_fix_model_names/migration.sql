/*
  Warnings:

  - You are about to drop the column `en_stock` on the `Producto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "en_stock",
ADD COLUMN     "enStock" BOOLEAN DEFAULT true;
