import { GatewayProvider } from "@/app/generated/prisma/client";

export interface InitializePaymentInput {
  amount: number;
  currency: string;
  email: string;
  reference: string;
  metadata?: Record<string, any>;
}

export interface InitializePaymentResponse {
  authorizationUrl: string;
  reference: string;
  accessCode: string;
}

export interface VerifyPaymentResponse {
  provider: GatewayProvider;
  reference: string;
  amount: number;
  currency: string;
  status: string;
  paidAt?: string;
  channel?: string;
  customerEmail?: string;
  raw: any;
}

export interface PaymentGateway {
  initializePayment(input: {
    reference: string;
    amount: number;
    currency: string;
    email: string;
    orderId: string;
  }): Promise<{
    reference: string;
    authorizationUrl: string;
  }>;
}
