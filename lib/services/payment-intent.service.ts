import {
  GatewayProvider,
  PaymentIntentStatus,
  EscrowStatus,
  Prisma,
} from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { getPaymentGateway } from "../payments/gateway-factory";
import { calculateBazaarFees } from "../payments/fees";
import { NormalizedWebhookEvent } from "../payments";

type CreatePaymentIntentInput = {
  orderId: string;
  buyerId: string;
  sellerId: string;
  gateway: GatewayProvider;
  amount: number;
  currency: string;
  email: string;
  idempotencyKey: string;
};

export class PaymentIntentService {
  async createPaymentIntent(input: CreatePaymentIntentInput) {
    const amountInSubunit = input.amount * 100;

    const fees = calculateBazaarFees(amountInSubunit);

    try {
      const gatewayEntity = await prisma.paymentGateway.findUniqueOrThrow({
        where: { provider: input.gateway },
      });

      const intent = await prisma.paymentIntent.create({
        data: {
          reference: crypto.randomUUID(),
          idempotencyKey: input.idempotencyKey,

          orderId: input.orderId,
          buyerId: input.buyerId,
          sellerId: input.sellerId,

          gatewayId: gatewayEntity.id,
          gatewayProvider: input.gateway,

          amountTotal: amountInSubunit,
          currency: input.currency,

          platformFee: fees.platformFee,
          gatewayFee: 0,
          sellerAmount: fees.sellerAmount,
          escrowAmount: fees.escrowAmount,

          status: PaymentIntentStatus.CREATED,
          escrowStatus: EscrowStatus.HOLDING,

          metadata: {},
        },
      });

      const gateway = getPaymentGateway(input.gateway);

      const result = await gateway.initializePayment({
        reference: intent.reference,
        amount: intent.amountTotal,
        currency: intent.currency,
        email: input.email,
        orderId: intent.orderId,
      });

      await prisma.paymentIntent.update({
        where: { id: intent.id },
        data: {
          gatewayReference: result.reference,
          gatewayStatus: "initialized",
          status: PaymentIntentStatus.PROCESSING,
          metadata: {
            authorizationUrl: result.authorizationUrl,
          },
        },
      });

      return {
        reference: intent.reference,
        authorizationUrl: result.authorizationUrl,
      };
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        const existing = await prisma.paymentIntent.findUnique({
          where: { idempotencyKey: input.idempotencyKey },
        });

        if (!existing) throw err;

        return {
          reference: existing.reference,
          authorizationUrl: (existing.metadata as any)?.authorizationUrl,
        };
      }

      throw err;
    }
  }

  async processWebhook(event: NormalizedWebhookEvent) {
    if (event.type === "UNHANDLED_EVENT") {
      return;
    }
    const alreadyProcessed = await prisma.webhookEvent.findUnique({
      where: {
        provider_reference_eventType: {
          provider: event.provider,
          reference: event.gatewayReference,
          eventType: event.type,
        },
      },
    });

    if (alreadyProcessed) return;

    const webhook = await prisma.webhookEvent.create({
      data: {
        provider: event.provider,
        reference: event.gatewayReference,
        eventType: event.type,
        payload: event.payload ?? {},
      },
    });

    const intent = await prisma.paymentIntent.findUnique({
      where: { gatewayReference: event.gatewayReference },
    });

    if (!intent) return;

    if (
      intent.status === PaymentIntentStatus.SUCCEEDED ||
      intent.status === PaymentIntentStatus.FAILED ||
      intent.status === PaymentIntentStatus.CANCELLED
    ) {
      return;
    }

    if (event.type === "PAYMENT_SUCCESS") {
      await this.handlePaymentSuccess(intent.id, event, webhook.id);
      return;
    }

    if (event.type === "PAYMENT_FAILED") {
      await this.handlePaymentFailure(intent.id, event, webhook.id);
      return;
    }
  }

  private async handlePaymentSuccess(
    paymentIntentId: string,
    event: { amount: number; currency: string },
    webhookId: string,
  ) {
    await prisma.$transaction(async (tx) => {
      const intent = await tx.paymentIntent.update({
        where: { id: paymentIntentId },
        data: {},
      });

      if (!intent) return;
      if (intent.status === PaymentIntentStatus.SUCCEEDED) return;

      await tx.paymentIntent.update({
        where: { id: intent.id },
        data: {
          status: PaymentIntentStatus.SUCCEEDED,
          paidAt: new Date(),
          escrowLockedAt: new Date(),
        },
      });

      await tx.escrowAccount.create({
        data: {
          paymentIntentId: intent.id,
          amountLocked: event.amount,
          currency: event.currency,
          status: EscrowStatus.HOLDING,
          lockedAt: new Date(),
          releaseAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      await tx.webhookEvent.update({
        where: { id: webhookId },
        data: { paymentIntentId: intent.id },
      });
    });
  }

  private async handlePaymentFailure(
    paymentIntentId: string,
    event: any,
    webhookId: string,
  ) {
    await prisma.$transaction(async (tx) => {
      const intent = await tx.paymentIntent.update({
        where: { id: paymentIntentId },
        data: {},
      });

      if (!intent) return;
      if (intent.status === PaymentIntentStatus.FAILED) return;
      if (intent.status === PaymentIntentStatus.SUCCEEDED) return;

      await tx.paymentIntent.update({
        where: { id: intent.id },
        data: {
          status: PaymentIntentStatus.FAILED,
          failureReason: event?.reason ?? "gateway_failure",
        },
      });

      await tx.webhookEvent.update({
        where: { id: webhookId },
        data: { paymentIntentId: intent.id },
      });
    });
  }
}

export const paymentIntentService = new PaymentIntentService();
