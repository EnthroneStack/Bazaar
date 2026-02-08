import prisma from "@/lib/prisma";
import { EscrowStatus, DealStatus } from "@/app/generated/prisma/client";
import { StateGuards } from "./state-guards";
import { ledgerService } from "./ledger.service";

export class EscrowService {
  async releaseEscrow(escrowId: string) {
    await prisma.$transaction(async (tx) => {
      const escrow = await tx.escrowAccount.findUnique({
        where: { id: escrowId },
        include: { paymentIntent: true, deal: true },
        lock: { mode: "for update" },
      });

      if (!escrow) throw new Error("Escrow not found");

      StateGuards.assertEscrowTransition(escrow.status, EscrowStatus.RELEASED);

      await tx.escrowAccount.update({
        where: { id: escrow.id },
        data: {
          status: EscrowStatus.RELEASED,
          releasedAt: new Date(),
        },
      });

      // Ledger: release
      await ledgerService.post({
        escrowId: escrow.id,
        paymentIntentId: escrow.paymentIntentId!,
        amount: escrow.amountLocked,
        currency: escrow.currency,
        type: "ESCROW_RELEASE",
        reference: escrow.id,
      });

      // Deal completion
      if (escrow.deal) {
        StateGuards.assertDealTransition(
          escrow.deal.status,
          DealStatus.COMPLETED,
        );

        await tx.deal.update({
          where: { id: escrow.deal.id },
          data: {
            status: DealStatus.COMPLETED,
            completedAt: new Date(),
          },
        });
      }
    });
  }
}

export const escrowService = new EscrowService();
