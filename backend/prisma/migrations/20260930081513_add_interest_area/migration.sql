-- CreateTable
CREATE TABLE "InterestArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterestArea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterestArea_name_key" ON "InterestArea"("name");

-- Seed default interest areas
INSERT INTO "InterestArea" ("id", "name", "isActive") VALUES
    ('3994cd3b-1d76-4fb8-a0b4-01f3f7fda9d7', 'Bulk / Wholesale Order', true),
    ('f0f4d04e-99d0-4c58-9498-1d14f9d6761c', 'Distribution Partnership', true),
    ('7f62280d-3043-4d94-88d0-0a55e8ad5f00', 'Formulation Partnership', true),
    ('b40972d1-e062-4cde-a1dc-6c284a1f6d0a', 'Other', true);
