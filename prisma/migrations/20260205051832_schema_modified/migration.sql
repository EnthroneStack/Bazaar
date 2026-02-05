/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Dispute` table. All the data in the column will be lost.
  - You are about to drop the column `holdUntil` on the `EscrowAccount` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `PaymentIntent` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Payout` table. All the data in the column will be lost.
  - Added the required column `lockedAt` to the `EscrowAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseAt` to the `EscrowAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direction` to the `LedgerEntry` table without a default value. This is not possible if the table is not empty.
  - Made the column `checkoutPrice` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `amountTotal` to the `PaymentIntent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerId` to the `PaymentIntent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `escrowAmount` to the `PaymentIntent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `escrowStatus` to the `PaymentIntent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gatewayFee` to the `PaymentIntent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gatewayProvider` to the `PaymentIntent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platformFee` to the `PaymentIntent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerAmount` to the `PaymentIntent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerId` to the `PaymentIntent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PaymentIntent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentIntentId` to the `Payout` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SearchContext" AS ENUM ('GLOBAL', 'STORE', 'TAG', 'CATEGORY', 'PRODUCT');

-- CreateEnum
CREATE TYPE "SearchSource" AS ENUM ('WEB', 'MOBILE');

-- CreateEnum
CREATE TYPE "AggregateWindow" AS ENUM ('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "ProductEventType" AS ENUM ('VIEW', 'ADD_TO_CART', 'PURCHASE');

-- CreateEnum
CREATE TYPE "EventSource" AS ENUM ('WEB', 'MOBILE');

-- CreateEnum
CREATE TYPE "LedgerDirection" AS ENUM ('IN', 'OUT');

-- CreateEnum
CREATE TYPE "DisputeResolution" AS ENUM ('BUYER', 'SELLER', 'SPLIT', 'REFUND', 'CANCELLED');

-- DropIndex
DROP INDEX "PaymentIntent_orderId_idx";

-- AlterTable
ALTER TABLE "Dispute" DROP COLUMN "createdAt",
ADD COLUMN     "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "resolution" "DisputeResolution";

-- AlterTable
ALTER TABLE "EscrowAccount" DROP COLUMN "holdUntil",
ADD COLUMN     "lockedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "releaseAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "LedgerEntry" ADD COLUMN     "direction" "LedgerDirection" NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "checkoutPrice" SET NOT NULL;

-- AlterTable
ALTER TABLE "PaymentIntent" DROP COLUMN "amount",
ADD COLUMN     "amountTotal" INTEGER NOT NULL,
ADD COLUMN     "buyerConfirmedAt" TIMESTAMP(3),
ADD COLUMN     "buyerId" TEXT NOT NULL,
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "disputeOpenedAt" TIMESTAMP(3),
ADD COLUMN     "escrowAmount" INTEGER NOT NULL,
ADD COLUMN     "escrowLockedAt" TIMESTAMP(3),
ADD COLUMN     "escrowReleaseAt" TIMESTAMP(3),
ADD COLUMN     "escrowStatus" "EscrowStatus" NOT NULL,
ADD COLUMN     "expiredAt" TIMESTAMP(3),
ADD COLUMN     "failureReason" TEXT,
ADD COLUMN     "gatewayFee" INTEGER NOT NULL,
ADD COLUMN     "gatewayPayload" JSONB,
ADD COLUMN     "gatewayProvider" "GatewayProvider" NOT NULL,
ADD COLUMN     "gatewayStatus" TEXT,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "platformFee" INTEGER NOT NULL,
ADD COLUMN     "sellerAmount" INTEGER NOT NULL,
ADD COLUMN     "sellerId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "metadata" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payout" DROP COLUMN "createdAt",
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "initiatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentIntentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WebhookEvent" ADD COLUMN     "payload" JSONB,
ADD COLUMN     "paymentIntentId" TEXT;

-- CreateTable
CREATE TABLE "SearchPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cloudSync" BOOLEAN NOT NULL DEFAULT true,
    "maxHistory" INTEGER NOT NULL DEFAULT 50,
    "retentionDays" INTEGER NOT NULL DEFAULT 90,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "query" TEXT NOT NULL,
    "normalized" TEXT NOT NULL,
    "context" "SearchContext" NOT NULL,
    "entityId" TEXT,
    "source" "SearchSource" NOT NULL,
    "dedupeHash" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "normalized" TEXT NOT NULL,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "useCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchAggregate" (
    "id" TEXT NOT NULL,
    "normalized" TEXT NOT NULL,
    "context" "SearchContext" NOT NULL,
    "entityId" TEXT,
    "totalCount" INTEGER NOT NULL DEFAULT 0,
    "uniqueUsers" INTEGER NOT NULL DEFAULT 0,
    "lastSearched" TIMESTAMP(3) NOT NULL,
    "window" "AggregateWindow" NOT NULL,

    CONSTRAINT "SearchAggregate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "productId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "categoryId" TEXT,
    "eventType" "ProductEventType" NOT NULL,
    "source" "EventSource" NOT NULL,
    "dedupeHash" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductAggregate" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "categoryId" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "purchases" INTEGER NOT NULL DEFAULT 0,
    "addToCarts" INTEGER NOT NULL DEFAULT 0,
    "lastViewedAt" TIMESTAMP(3),
    "window" "AggregateWindow" NOT NULL,

    CONSTRAINT "ProductAggregate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductAssociation" (
    "id" TEXT NOT NULL,
    "productAId" TEXT NOT NULL,
    "productBId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductAssociation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchPreference_userId_key" ON "SearchPreference"("userId");

-- CreateIndex
CREATE INDEX "SearchEvent_normalized_idx" ON "SearchEvent"("normalized");

-- CreateIndex
CREATE INDEX "SearchEvent_userId_occurredAt_idx" ON "SearchEvent"("userId", "occurredAt");

-- CreateIndex
CREATE INDEX "SearchEvent_sessionId_occurredAt_idx" ON "SearchEvent"("sessionId", "occurredAt");

-- CreateIndex
CREATE UNIQUE INDEX "SearchEvent_dedupeHash_key" ON "SearchEvent"("dedupeHash");

-- CreateIndex
CREATE INDEX "SearchHistory_userId_lastUsedAt_idx" ON "SearchHistory"("userId", "lastUsedAt");

-- CreateIndex
CREATE UNIQUE INDEX "SearchHistory_userId_normalized_key" ON "SearchHistory"("userId", "normalized");

-- CreateIndex
CREATE INDEX "SearchAggregate_totalCount_idx" ON "SearchAggregate"("totalCount");

-- CreateIndex
CREATE UNIQUE INDEX "SearchAggregate_normalized_context_entityId_window_key" ON "SearchAggregate"("normalized", "context", "entityId", "window");

-- CreateIndex
CREATE INDEX "ProductEvent_productId_occurredAt_idx" ON "ProductEvent"("productId", "occurredAt");

-- CreateIndex
CREATE INDEX "ProductEvent_userId_occurredAt_idx" ON "ProductEvent"("userId", "occurredAt");

-- CreateIndex
CREATE UNIQUE INDEX "ProductEvent_dedupeHash_key" ON "ProductEvent"("dedupeHash");

-- CreateIndex
CREATE INDEX "ProductAggregate_views_idx" ON "ProductAggregate"("views");

-- CreateIndex
CREATE INDEX "ProductAggregate_purchases_idx" ON "ProductAggregate"("purchases");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAggregate_productId_window_key" ON "ProductAggregate"("productId", "window");

-- CreateIndex
CREATE INDEX "ProductAssociation_score_idx" ON "ProductAssociation"("score");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAssociation_productAId_productBId_key" ON "ProductAssociation"("productAId", "productBId");

-- CreateIndex
CREATE INDEX "PaymentIntent_buyerId_idx" ON "PaymentIntent"("buyerId");

-- CreateIndex
CREATE INDEX "PaymentIntent_sellerId_idx" ON "PaymentIntent"("sellerId");

-- CreateIndex
CREATE INDEX "PaymentIntent_gatewayReference_idx" ON "PaymentIntent"("gatewayReference");

-- CreateIndex
CREATE INDEX "WebhookEvent_paymentIntentId_idx" ON "WebhookEvent"("paymentIntentId");

-- AddForeignKey
ALTER TABLE "SearchPreference" ADD CONSTRAINT "SearchPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchEvent" ADD CONSTRAINT "SearchEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchHistory" ADD CONSTRAINT "SearchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductEvent" ADD CONSTRAINT "ProductEvent_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
