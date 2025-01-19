/*
  Warnings:

  - Added the required column `updatedAt` to the `Plum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plum" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
