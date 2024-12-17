/*
  Warnings:

  - Added the required column `provider` to the `ActionTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActionTemplate" ADD COLUMN     "provider" TEXT NOT NULL;
