import { NextResponse } from "next/server";
import { verifyPaystackPayment } from "@/lib/payments/gateways/paystack";
import { GatewayProvider } from "@/app/generated/prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { provider, reference } = body;

    if (!reference) {
      return NextResponse.json(
        { error: "Missing transaction reference" },
        { status: 400 },
      );
    }

    switch (provider) {
      case GatewayProvider.PAYSTACK:
        return NextResponse.json(await verifyPaystackPayment(reference));

      case GatewayProvider.OPAY:
        return NextResponse.json(await verifyOpayPayment(reference));
      default:
        return NextResponse.json(
          { error: "Unsupported payment provider" },
          { status: 400 },
        );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Verification failed" },
      { status: 500 },
    );
  }
}
