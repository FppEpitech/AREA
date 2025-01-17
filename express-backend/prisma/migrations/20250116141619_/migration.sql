-- CreateTable
CREATE TABLE "SamplePlums" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "triggerValue" JSONB NOT NULL,
    "triggerTemplateId" INTEGER NOT NULL,
    "actionValue" JSONB NOT NULL,
    "actionTemplateId" INTEGER NOT NULL,

    CONSTRAINT "SamplePlums_pkey" PRIMARY KEY ("id")
);
