import { GatewayProvider } from "@/app/generated/prisma/client";
import { paystackGateway } from "./gateways/paystack";
import { PaymentGateway } from "./types";
import { opayGateway } from "./gateways/opay";

export function getPaymentGateway(provider: GatewayProvider): PaymentGateway {
  switch (provider) {
    case GatewayProvider.PAYSTACK:
      return paystackGateway;
    case GatewayProvider.OPAY:
      return opayGateway;

    default:
      throw new Error("Unsupported payment gateway");
  }
}
