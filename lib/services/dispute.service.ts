import prisma from "@/lib/prisma";
import { EscrowStatus } from "@/app/generated/prisma/client";
import { StateGuards } from "./state-guards";

export class DisputeService {
  async openDispute(escrowId: string, raisedById: string, reason: string) {
    await prisma.$transaction(async (tx) => {
      const escrow = await tx.escrowAccount.findUnique({
        where: { id: escrowId },
        lock: { mode: "for update" },
      });

      if (!escrow) throw new Error("Escrow not found");

      StateGuards.assertEscrowTransition(escrow.status, EscrowStatus.DISPUTED);

      await tx.escrowAccount.update({
        where: { id: escrow.id },
        data: {
          status: EscrowStatus.DISPUTED,
        },
      });

      await tx.dispute.create({
        data: {
          escrowAccountId: escrow.id,
          raisedById,
          reason,
          status: "OPEN",
        },
      });
    });
  }

  async resolveDispute(
    disputeId: string,
    resolution: "RELEASE_TO_SELLER" | "REFUND_BUYER",
  ) {
    await prisma.$transaction(async (tx) => {
      const dispute = await tx.dispute.findUnique({
        where: { id: disputeId },
        include: { escrowAccount: true },
        lock: { mode: "for update" },
      });

      if (!dispute) throw new Error("Dispute not found");

      const escrow = dispute.escrowAccount;

      if (!escrow) throw new Error("Escrow missing");

      StateGuards.assertEscrowTransition(escrow.status, EscrowStatus.RELEASED);

      await tx.escrowAccount.update({
        where: { id: escrow.id },
        data: {
          status: EscrowStatus.RELEASED,
          releasedAt: new Date(),
        },
      });

      await tx.dispute.update({
        where: { id: dispute.id },
        data: {
          status: "RESOLVED",
          resolvedAt: new Date(),
          resolution,
        },
      });

      await ledgerService.post({
        escrowId: escrow.id,
        paymentIntentId: escrow.paymentIntentId!,
        amount: escrow.amountLocked,
        currency: escrow.currency,
        type:
          resolution === "RELEASE_TO_SELLER"
            ? "SELLER_PAYOUT"
            : "ESCROW_RELEASE",
        reference: dispute.id,
      });
    });
  }
}

export const disputeService = new DisputeService();
