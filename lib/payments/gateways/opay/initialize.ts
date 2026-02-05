import { opayConfig } from "@/configs/opay";
import crypto from "crypto";

export async function initializeOpayPayment(input: {
  reference: string;
  amount: number;
  currency: string;
  email: string;
  orderId: string;
}) {
  const signature = crypto
    .createHash("sha512")
    .update(
      `${input.amount}${input.currency}${input.reference}${opayConfig.secretKey}`,
    )
    .digest("hex");

  const payload = {
    merchantId: opayConfig.merchantId,
    reference: input.reference,
    amount: input.amount,
    currency: input.currency,
    country: "NG",
    returnUrl: opayConfig.callbackUrl,
    callbackUrl: opayConfig.webhookUrl,
    userInfo: {
      userEmail: input.email,
    },
    product: {
      name: "Order Payment",
      description: `Order ${input.orderId}`,
    },
    signature,
  };

  const res = await fetch(
    `${opayConfig.baseUrl}/api/v1/international/cashier/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${opayConfig.publicKey}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await res.json();

  if (!res.ok || data.code !== "00000") {
    throw new Error(data.message || "OPay initialization failed");
  }

  return {
    reference: input.reference,
    authorizationUrl: data.data.cashierUrl,
  };
}
