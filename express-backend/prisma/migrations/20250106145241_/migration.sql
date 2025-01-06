/*
  Warnings:

  - A unique constraint covering the columns `[actFunc]` on the table `ActionTemplate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[trigFunc]` on the table `TriggerTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ActionTemplate_actFunc_key" ON "ActionTemplate"("actFunc");

-- CreateIndex
CREATE UNIQUE INDEX "TriggerTemplate_trigFunc_key" ON "TriggerTemplate"("trigFunc");
