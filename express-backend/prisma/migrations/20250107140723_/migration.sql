/*
  Warnings:

  - A unique constraint covering the columns `[name,provider]` on the table `ActionTemplate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,provider]` on the table `TriggerTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ActionTemplate_name_provider_key" ON "ActionTemplate"("name", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "TriggerTemplate_name_provider_key" ON "TriggerTemplate"("name", "provider");
