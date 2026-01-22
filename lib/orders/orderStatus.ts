import { Prisma, OrderStatus } from "@/app/generated/prisma/client";

export function mapUIStatusToDB(
  status?: string,
): Prisma.OrderWhereInput["status"] | undefined {
  switch (status) {
    case "processing":
      return { in: ["ORDER_PLACED", "PROCESSING"] };
    case "shipped":
      return "SHIPPED";
    case "delivered":
      return "DELIVERED";
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
  }
}
