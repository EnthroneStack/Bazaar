export const opayConfig = {
  baseUrl: process.env.OPAY_BASE_URL!,
  merchantId: process.env.OPAY_MERCHANT_ID!,
  publicKey: process.env.OPAY_PUBLIC_KEY!,
  secretKey: process.env.OPAY_SECRET_KEY!,
  callbackUrl: process.env.OPAY_CALLBACK_URL!,
  webhookUrl: process.env.OPAY_WEBHOOK_URL!,
};
