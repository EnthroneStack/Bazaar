import { PAYSTACK_BASE_URL, PAYSTACK_SECRET_KEY } from "@/configs/paystack";
import { InitializePaymentInput, InitializePaymentResponse } from "../../types";

export async function initializePaystackPayment(
  input: InitializePaymentInput,
): Promise<InitializePaymentResponse> {
  const amountInSubunit = input.amount;

  const body = {
    email: input.email,
    amount: amountInSubunit,
    currency: input.currency,
    reference: input.reference,
    metadata: input.metadata ?? {},
  };

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (!result.status) {
    throw new Error(result.message);
  }

  return {
    authorizationUrl: result.data.authorization_url,
    reference: result.data.reference,
    accessCode: result.data.access_code,
  };
}
