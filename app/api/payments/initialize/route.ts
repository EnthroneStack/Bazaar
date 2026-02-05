import { paymentIntentService } from "@/lib/services/payment-intent.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await paymentIntentService.createPaymentIntent(body);

  return NextResponse.json(result);
}
