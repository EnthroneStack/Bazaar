import { NextRequest, NextResponse } from "next/server";
// import {
//   verifyOpayWebhookSignature,
//   mapOpayWebhookEvent,
// } from "@/lib/payments/gateways/opay/webhook";
import { paymentIntentService } from "@/lib/services/payment-intent.service";

export async function POST(req: NextRequest) {
  const rawBody = Buffer.from(await req.arrayBuffer()).toString("utf8");

  const signature = req.headers.get("opay-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  if (!verifyOpayWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const event = mapOpayWebhookEvent(payload);

  await paymentIntentService.processWebhook(event);

  return NextResponse.json({ received: true });
}
