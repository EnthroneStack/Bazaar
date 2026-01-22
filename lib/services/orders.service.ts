import prisma from "@/lib/prisma";
import { generateOrderNumberTx } from "@/lib/orders/orderNumber";
import { mapDBStatusToUI, mapUIStatusToDB } from "../orders/orderStatus";
import type { Prisma } from "@/app/generated/prisma/client";

export async function createOrder({
  store,
  userId,
  addressId,
  paymentMethod,
  items,
  total,
}: {
  store: { id: string; slug: string };
  userId: string;
  addressId: string;
  paymentMethod: "COD" | "STRIPE";
  items: { productId: string; quantity: number; price: number }[];
  total: number;
}) {
  return prisma.$transaction(async (tx) => {
    const { orderNumber, orderSequence } = await generateOrderNumberTx(
      tx,
      store.id,
      store.slug.toUpperCase(),
    );

    return tx.order.create({
      data: {
        orderNumber,
        orderSequence,
        total,
        userId,
        storeId: store.id,
        addressId,
        paymentMethod,
        orderItems: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
  });
}

export async function getOrderStats(storeId: string) {
  const [
    totalOrders,
    totalRevenue,
    pendingOrders,
    completedOrders,
    avgOrderValue,
  ] = await Promise.all([
    prisma.order.count({ where: { storeId } }),
    prisma.order.aggregate({
      where: { storeId, isPaid: true },
      _sum: { total: true },
    }),
    prisma.order.count({
      where: {
        storeId,
        status: { in: ["ORDER_PLACED", "PROCESSING"] },
      },
    }),
    prisma.order.count({
      where: { storeId, status: "DELIVERED" },
    }),
    prisma.order.aggregate({
      where: { storeId },
      _avg: { total: true },
    }),
  ]);

  return {
    totalRevenue: totalRevenue._sum.total ?? 0,
    totalOrders,
    avgOrderValue: avgOrderValue._avg.total ?? 0,
    pendingOrders,
    completedOrders,
  };
}

export async function getOrders({
  storeId,
  page = 1,
  limit = 6,
  status,
}: {
  storeId: string;
  page?: number;
  limit?: number;
  status?: string | null;
}) {
  const safePage = Math.max(page, 1);
  const safeLimit = Math.min(limit, 50);
  const skip = (safePage - 1) * safeLimit;

  const where: Prisma.OrderWhereInput = {
    storeId,
  };

  const dbStatus = mapUIStatusToDB(status ?? undefined);
  if (dbStatus) {
    where.status = dbStatus;
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: safeLimit,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true } },
        orderItems: { select: { quantity: true } },
      },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    data: orders.map((order) => ({
      id: order.orderNumber,
      rawId: order.id,
      customer: order.user.name,
      date: order.createdAt,
      amount: order.total,
      items: order.orderItems.reduce((sum, item) => sum + item.quantity, 0),
      status: mapDBStatusToUI(order.status),
      payment: order.isPaid ? "paid" : "pending",
    })),
    meta: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
}
