import { PAYSTACK_BASE_URL, PAYSTACK_SECRET_KEY } from "@/configs/paystack";
import { VerifyPaymentResponse } from "../../types";

export async function verifyPaystackPayment(
  reference: string,
): Promise<VerifyPaymentResponse> {
  const response = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "content-type": "application/json",
      },
    },
  );

  const result = await response.json();

  if (!result.status) {
    throw new Error(result.message);
  }

  const data = result.data;

  return {
    provider: "PAYSTACK",
    reference: data.reference,
    amount: data.amount / 100,
    currency: data.currency,
    status: data.status,
    paidAt: data.paid_at,
    channel: data.channel,
    customerEmail: data.customer.email,
    raw: data,
  };
}
