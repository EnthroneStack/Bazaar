import {
  Prisma,
  OrderStatus,
  PaymentStatus,
} from "@/app/generated/prisma/client";

export function mapUIStatusToDB(
  status?: string,
): Prisma.EnumOrderStatusFilter | OrderStatus | undefined {
  switch (status) {
    case "processing":
      return { in: ["ORDER_PLACED", "PROCESSING"] };
    case "shipped":
      return "SHIPPED";
    case "delivered":
      return "DELIVERED";
    case "cancelled":
      return "CANCELLED";

    default:
      return undefined;
  }
}

export function mapDBStatusToUI(status: OrderStatus) {
  switch (status) {
    case "ORDER_PLACED":
    case "PROCESSING":
      return "processing";
    case "SHIPPED":
      return "shipped";
    case "DELIVERED":
      return "delivered";
    case "CANCELLED":
      return "cancelled";
  }
}

export function mapPaymentStatusToUI(status: PaymentStatus) {
  switch (status) {
    case "PAID":
      return "paid" as const;
    case "REFUNDED":
      return "refunded" as const;
    default:
      return "pending" as const;
  }
}
