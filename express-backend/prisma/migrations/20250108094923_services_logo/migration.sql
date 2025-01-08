/*
  Warnings:

  - The primary key for the `Service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Service` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `logo` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP CONSTRAINT "Service_pkey",
DROP COLUMN "id",
ADD COLUMN     "logo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Service_provider_key" ON "Service"("provider");
