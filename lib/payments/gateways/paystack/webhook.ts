import crypto from "crypto";
import { PAYSTACK_SECRET_KEY } from "@/configs/paystack";
import { GatewayProvider } from "@/app/generated/prisma/enums";
import { NormalizedWebhookEvent } from "../../types";

export function verifyPaystackWebhookSignature(
  rawBody: Buffer,
  signature: string,
): boolean {
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest("hex");

  return hash === signature;
}

export function handlePaystackWebhook(event: any): NormalizedWebhookEvent {
  const { event: type, data } = event;

  switch (type) {
    case "charge.success":
      return {
        type: "PAYMENT_SUCCESS",
        provider: GatewayProvider.PAYSTACK,
        gatewayReference: data.reference,
        amount: data.amount / 100,
        currency: data.currency,
        payload: data,
      };

    case "charge.failed":
      return {
        type: "PAYMENT_FAILED",
        provider: GatewayProvider.PAYSTACK,
        gatewayReference: data.reference,
        payload: data,
      };

    default:
      return {
        type: "UNHANDLED_EVENT",
        provider: GatewayProvider.PAYSTACK,
        payload: data,
      };
  }
}
