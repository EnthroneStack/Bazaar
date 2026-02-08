import {
  PaymentIntentStatus,
  EscrowStatus,
  DealStatus,
} from "@/app/generated/prisma/client";

export class StateGuards {
  static assertPaymentIntentTransition(
    from: PaymentIntentStatus,
    to: PaymentIntentStatus,
  ) {
    const allowed: Record<PaymentIntentStatus, PaymentIntentStatus[]> = {
      CREATED: ["PROCESSING", "FAILED"],
      PROCESSING: ["SUCCEEDED", "FAILED", "CANCELLED"],
      SUCCEEDED: [],
      FAILED: [],
      CANCELLED: [],
      EXPIRED: [],
    };

    if (!allowed[from]?.includes(to)) {
      throw new Error(`Invalid PaymentIntent transition: ${from} → ${to}`);
    }
  }

  static assertEscrowTransition(from: EscrowStatus, to: EscrowStatus) {
    const allowed: Record<EscrowStatus, EscrowStatus[]> = {
      HOLDING: ["RELEASED", "DISPUTED"],
      DISPUTED: ["RELEASED"],
      RELEASED: [],
    };

    if (!allowed[from]?.includes(to)) {
      throw new Error(`Invalid Escrow transition: ${from} → ${to}`);
    }
  }

  static assertDealTransition(from: DealStatus, to: DealStatus) {
    const allowed: Record<DealStatus, DealStatus[]> = {
      DRAFT: ["PUBLISHED"],
      PUBLISHED: ["ACCEPTED"],
      ACCEPTED: ["IN_ESCROW"],
      IN_ESCROW: ["COMPLETED", "DISPUTED"],
      DISPUTED: ["COMPLETED"],
      COMPLETED: [],
    };

    if (!allowed[from]?.includes(to)) {
      throw new Error(`Invalid Deal transition: ${from} → ${to}`);
    }
  }
}
