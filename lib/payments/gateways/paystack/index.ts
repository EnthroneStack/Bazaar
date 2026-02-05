import { PaymentGateway } from "../../types";
import { initializePaystackPayment } from "./initialize";

export const paystackGateway: PaymentGateway = {
  async initializePayment({ reference, amount, currency, email, orderId }) {
    const result = await initializePaystackPayment({
      reference,
      amount,
      currency,
      email,
      metadata: {
        orderId,
      },
    });

    return {
      reference: result.reference,
      authorizationUrl: result.authorizationUrl,
    };
  },
};

export * from "./initialize";
export * from "./verify";
export * from "./webhook";
