import {
  GatewayProvider,
  PaymentIntentStatus,
  Prisma,
} from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { getPaymentGateway } from "../payments/gateway-factory";

export class PaymentIntentService {
  async createPaymentIntent(input: {
    orderId: string;
    gateway: GatewayProvider;
    amount: number;
    currency: string;
    email: string;
    idempotencyKey: string;
  }) {
    try {
      const gatewayEntity = await prisma.paymentGateway.findUniqueOrThrow({
        where: { provider: input.gateway },
      });

      const amountInSubunit = input.amount * 100;

      const intent = await prisma.paymentIntent.create({
        data: {
          reference: crypto.randomUUID(),
          idempotencyKey: input.idempotencyKey,
          amount: amountInSubunit,
          currency: input.currency,
          status: PaymentIntentStatus.CREATED,
          orderId: input.orderId,
          gatewayId: gatewayEntity.id,
          metadata: {},
        },
      });

      const gateway = getPaymentGateway(input.gateway);

      const result = await gateway.initializePayment({
        reference: intent.reference,
        amount: amountInSubunit,
        currency: input.currency,
        email: input.email,
        orderId: input.orderId,
      });

      await prisma.paymentIntent.update({
        where: { id: intent.id },
        data: {
          gatewayReference: result.reference,
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

  async processWebhook(event: any) {
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

    await prisma.webhookEvent.create({
      data: {
        provider: event.provider,
        reference: event.gatewayReference,
        eventType: event.type,
      },
    });

    const intent = await prisma.paymentIntent.findUnique({
      where: { gatewayReference: event.gatewayReference },
    });

    if (!intent) return;

    if (
      intent.status === PaymentIntentStatus.SUCCEEDED ||
      intent.status === PaymentIntentStatus.FAILED
    ) {
      return;
    }

    if (event.type === "PAYMENT_SUCCESS") {
      await prisma.$transaction([
        prisma.paymentIntent.update({
          where: { id: intent.id },
          data: { status: PaymentIntentStatus.SUCCEEDED },
        }),
        prisma.escrowAccount.create({
          data: {
            paymentIntentId: intent.id,
            amountLocked: event.amount,
            currency: event.currency,
            holdUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        }),
      ]);
    }

    if (event.type === "PAYMENT_FAILED") {
      await prisma.paymentIntent.update({
        where: { id: intent.id },
        data: { status: PaymentIntentStatus.FAILED },
      });
    }
  }
}

export const paymentIntentService = new PaymentIntentService();
