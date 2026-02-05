import { NextRequest, NextResponse } from "next/server";
import {
  verifyPaystackWebhookSignature,
  handlePaystackWebhook,
} from "@/lib/payments/gateways/paystack";
import { paymentIntentService } from "@/lib/services/payment-intent.service";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-paystack-signature");

  const rawBody = Buffer.from(await request.arrayBuffer());

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  if (!verifyPaystackWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody.toString("utf8"));

  const normalized = handlePaystackWebhook(event);

  await paymentIntentService.processWebhook(normalized);

  return NextResponse.json({ received: true });
}
