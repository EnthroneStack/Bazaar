import { PaymentGateway } from "../../types";
import { initializeOpayPayment } from "./initialize";
import { verifyOpayPayment } from "./verify";

export const opayGateway: PaymentGateway = {
  initializePayment: initializeOpayPayment,
};

export { verifyOpayPayment };
