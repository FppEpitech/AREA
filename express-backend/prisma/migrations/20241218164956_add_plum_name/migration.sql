/*
  Warnings:

  - Added the required column `name` to the `Plum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plum" ADD COLUMN     "name" TEXT NOT NULL;
