/*
  Warnings:

  - A unique constraint covering the columns `[orderNumber]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[storeId,orderSequence]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderSequence` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderNumber" TEXT NOT NULL,
ADD COLUMN     "orderSequence" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "StoreOrderSequence" (
    "storeId" TEXT NOT NULL,
    "lastValue" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoreOrderSequence_pkey" PRIMARY KEY ("storeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- CreateIndex
CREATE INDEX "Order_orderNumber_idx" ON "Order"("orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Order_storeId_orderSequence_key" ON "Order"("storeId", "orderSequence");

-- AddForeignKey
ALTER TABLE "StoreOrderSequence" ADD CONSTRAINT "StoreOrderSequence_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
