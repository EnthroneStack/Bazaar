/*
  Warnings:

  - The `status` column on the `Store` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StoreStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "reason" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "StoreStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "Store_isActive_status_idx" ON "Store"("isActive", "status");
