/*
  Warnings:

  - Added the required column `color` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "color" TEXT NOT NULL;
