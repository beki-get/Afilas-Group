-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'CLOSED');

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalBooking" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "preferredDate" DATE NOT NULL,
    "preferredTime" TEXT NOT NULL,
    "notes" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "idempotencyKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HospitalBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiagnosisBooking" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "testType" TEXT NOT NULL,
    "preferredDate" DATE NOT NULL,
    "preferredTime" TEXT NOT NULL,
    "notes" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "idempotencyKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiagnosisBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmaInquiry" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "businessEmail" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "interestArea" TEXT NOT NULL,
    "estimatedQuantity" TEXT,
    "message" TEXT NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "idempotencyKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PharmaInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HospitalBooking_idempotencyKey_key" ON "HospitalBooking"("idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "DiagnosisBooking_idempotencyKey_key" ON "DiagnosisBooking"("idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "PharmaInquiry_idempotencyKey_key" ON "PharmaInquiry"("idempotencyKey");

-- AddForeignKey
ALTER TABLE "HospitalBooking" ADD CONSTRAINT "HospitalBooking_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
