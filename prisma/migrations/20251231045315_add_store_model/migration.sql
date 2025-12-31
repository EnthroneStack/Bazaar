/*
  Warnings:

  - Added the required column `businessType` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `address` on the `Store` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('INDIVIDUAL', 'COMPANY', 'PARTNERSHIP');

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "businessType" "BusinessType" NOT NULL,
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "registrationNo" TEXT,
ADD COLUMN     "taxId" TEXT,
DROP COLUMN "address",
ADD COLUMN     "address" JSONB NOT NULL;
