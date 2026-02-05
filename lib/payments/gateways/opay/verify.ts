import { GatewayProvider } from "@/app/generated/prisma/client";
import { opayConfig } from "@/configs/opay";

export async function verifyOpayPayment(reference: string) {
  const res = await fetch(
    `${opayConfig.baseUrl}/api/v1/international/cashier/status?reference=${reference}`,
    {
      headers: {
        Authorization: `Bearer ${opayConfig.secretKey}`,
      },
    },
  );

  const data = await res.json();

  if (!res.ok || data.code !== "00000") {
    throw new Error("OPay verification failed");
  }

  return {
    provider: GatewayProvider.OPAY,
    reference,
    amount: data.data.amount,
    currency: data.data.currency,
    status: data.data.status,
    paidAt: data.data.paidTime,
    channel: data.data.payMethod,
    customerEmail: data.data.userEmail,
    raw: data,
  };
}
