import type { Prisma } from "@/app/generated/prisma/client";

export async function generateOrderNumberTx(
  tx: Prisma.TransactionClient,
  storeId: string,
  storeCode: string,
) {
  const year = new Date().getFullYear();

  const sequence = await tx.storeOrderSequence.upsert({
    where: { storeId },
    create: {
      storeId,
      lastValue: 1,
    },
    update: {
      lastValue: { increment: 1 },
    },
    select: {
      lastValue: true,
    },
  });

  const padded = String(sequence.lastValue).padStart(6, "0");

  return {
    orderNumber: `ORD-${storeCode}-${year}-${padded}`,
    orderSequence: sequence.lastValue,
  };
}
