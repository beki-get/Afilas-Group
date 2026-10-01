-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "experienceYears" INTEGER;

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "departmentId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_departmentId_name_key" ON "Service"("departmentId", "name");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
