import prisma from "@/lib/prisma";

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
  page,
  limit,
  status,
}: {
  storeId: string;
  page: number;
  limit: number;
  status?: string;
}) {
  const skip = (page - 1) * limit;

  const where: any = { storeId };

  if (status && status !== "all") {
    if (status === "processing") {
      where.status = { in: ["ORDER_PLACED", "PROCESSING"] };
    } else if (status === "shipped") {
      where.status = "SHIPPED";
    } else if (status === "delivered") {
      where.status = "DELIVERED";
    }
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
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
      id: `ORD-${order.id.slice(-6).toUpperCase()}`,
      rawId: order.id,
      customer: order.user.name,
      amount: order.total,
      status: order.status,
    })),
    meta: {
      page,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
