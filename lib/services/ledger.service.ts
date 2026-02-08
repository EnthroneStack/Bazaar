import prisma from "@/lib/prisma";

type LedgerEntryInput = {
  userId?: string;
  escrowId?: string;
  paymentIntentId?: string;
  amount: number;
  currency: string;
  type: "ESCROW_LOCK" | "ESCROW_RELEASE" | "PLATFORM_FEE" | "SELLER_PAYOUT";
  reference: string;
};

export class LedgerService {
  async post(entry: LedgerEntryInput) {
    await prisma.ledgerEntry.create({
      data: {
        userId: entry.userId,
        escrowId: entry.escrowId,
        paymentIntentId: entry.paymentIntentId,
        amount: entry.amount,
        currency: entry.currency,
        type: entry.type,
        reference: entry.reference,
      },
    });
  }
}

export const ledgerService = new LedgerService();
