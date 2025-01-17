/*
  Warnings:

  - You are about to drop the column `actionTemplateId` on the `SamplePlums` table. All the data in the column will be lost.
  - You are about to drop the column `triggerTemplateId` on the `SamplePlums` table. All the data in the column will be lost.
  - Added the required column `actionTemplateName` to the `SamplePlums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actionTemplateProvider` to the `SamplePlums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `triggerTemplateName` to the `SamplePlums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `triggerTemplateProvider` to the `SamplePlums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SamplePlums" DROP COLUMN "actionTemplateId",
DROP COLUMN "triggerTemplateId",
ADD COLUMN     "actionTemplateName" TEXT NOT NULL,
ADD COLUMN     "actionTemplateProvider" TEXT NOT NULL,
ADD COLUMN     "triggerTemplateName" TEXT NOT NULL,
ADD COLUMN     "triggerTemplateProvider" TEXT NOT NULL;
