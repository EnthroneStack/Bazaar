/*
  Warnings:

  - You are about to drop the column `escrowId` on the `Deal` table. All the data in the column will be lost.
  - Added the required column `buyerEmail` to the `Deal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deal" DROP COLUMN "escrowId",
ADD COLUMN     "acceptedBy" TEXT,
ADD COLUMN     "acceptedIp" TEXT,
ADD COLUMN     "acceptedUserAgent" TEXT,
ADD COLUMN     "buyerEmail" TEXT NOT NULL,
ADD COLUMN     "isLocked" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "DealAcceptanceToken" (
    "id" TEXT NOT NULL,
    "dealId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DealAcceptanceToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminActionLog" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminActionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DealAcceptanceToken_dealId_idx" ON "DealAcceptanceToken"("dealId");

-- CreateIndex
CREATE INDEX "DealAcceptanceToken_email_idx" ON "DealAcceptanceToken"("email");

-- CreateIndex
CREATE INDEX "AdminActionLog_entity_entityId_idx" ON "AdminActionLog"("entity", "entityId");

-- CreateIndex
CREATE INDEX "AdminActionLog_adminId_idx" ON "AdminActionLog"("adminId");

-- AddForeignKey
ALTER TABLE "DealAcceptanceToken" ADD CONSTRAINT "DealAcceptanceToken_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
