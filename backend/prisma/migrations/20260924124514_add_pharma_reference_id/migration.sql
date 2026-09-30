-- Add the column first so existing inquiries can be backfilled safely.
ALTER TABLE "PharmaInquiry" ADD COLUMN "referenceId" TEXT;

-- Derive unique AFL-formatted IDs for inquiries that existed before this field.
UPDATE "PharmaInquiry"
SET "referenceId" = 'AFL-' || UPPER(SUBSTRING(MD5("id") FROM 1 FOR 8))
WHERE "referenceId" IS NULL;

ALTER TABLE "PharmaInquiry" ALTER COLUMN "referenceId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PharmaInquiry_referenceId_key" ON "PharmaInquiry"("referenceId");
