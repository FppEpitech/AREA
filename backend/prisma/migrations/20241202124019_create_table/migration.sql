/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mail]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mail` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "mail" TEXT NOT NULL,
ADD COLUMN     "userId" SERIAL NOT NULL,
ALTER COLUMN "username" SET NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "tokenHashed" TEXT NOT NULL,
    "scope" INTEGER NOT NULL,
    "creationDate" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plum" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "actionId" INTEGER NOT NULL,
    "triggerId" INTEGER NOT NULL,

    CONSTRAINT "Plum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "actFunc" TEXT NOT NULL,
    "valueTemplate" JSONB NOT NULL,

    CONSTRAINT "ActionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "actionValue" JSONB NOT NULL,
    "actionTemplateId" INTEGER NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TriggerTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "trigFunc" TEXT NOT NULL,
    "valueTemplate" JSONB NOT NULL,

    CONSTRAINT "TriggerTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trigger" (
    "id" SERIAL NOT NULL,
    "triggerValue" JSONB NOT NULL,
    "triggerTemplateId" INTEGER NOT NULL,

    CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_mail_key" ON "User"("mail");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plum" ADD CONSTRAINT "Plum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plum" ADD CONSTRAINT "Plum_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plum" ADD CONSTRAINT "Plum_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "Trigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionTemplateId_fkey" FOREIGN KEY ("actionTemplateId") REFERENCES "ActionTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_triggerTemplateId_fkey" FOREIGN KEY ("triggerTemplateId") REFERENCES "TriggerTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
