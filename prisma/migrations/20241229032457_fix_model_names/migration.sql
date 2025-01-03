/*
  Warnings:

  - You are about to drop the column `productoId` on the `Imagen` table. All the data in the column will be lost.
  - You are about to drop the column `enStock` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `fechaActualizacion` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `fechaCreacion` on the `Producto` table. All the data in the column will be lost.
  - You are about to alter the column `nombre` on the `Producto` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `descripcionCorta` on the `Producto` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `precio` on the `Producto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `categoria` on the `Producto` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `productoId` on the `Talle` table. All the data in the column will be lost.
  - You are about to alter the column `talla` on the `Talle` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.

*/
-- DropForeignKey
ALTER TABLE "Imagen" DROP CONSTRAINT "Imagen_productoId_fkey";

-- DropForeignKey
ALTER TABLE "Talle" DROP CONSTRAINT "Talle_productoId_fkey";

-- AlterTable
ALTER TABLE "Imagen" DROP COLUMN "productoId",
ADD COLUMN     "producto_id" INTEGER;

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "enStock",
DROP COLUMN "fechaActualizacion",
DROP COLUMN "fechaCreacion",
ADD COLUMN     "en_stock" BOOLEAN DEFAULT true,
ADD COLUMN     "fecha_actualizacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "descripcionCorta" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "precio" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "cantidadStock" DROP NOT NULL,
ALTER COLUMN "categoria" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Talle" DROP COLUMN "productoId",
ADD COLUMN     "producto_id" INTEGER,
ALTER COLUMN "talla" SET DATA TYPE VARCHAR(10);

-- AddForeignKey
ALTER TABLE "Imagen" ADD CONSTRAINT "Imagen_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Talle" ADD CONSTRAINT "Talle_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
