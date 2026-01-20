import { OrderStatus } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

function mapUIStatusToDB(status: string) {
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

function mapOrderStatus(status: OrderStatus) {
  switch (status) {
    case "ORDER_PLACED":
    case "PROCESSING":
      return "processing";
    case "SHIPPED":
      return "shipped";
    case "DELIVERED":
      return "delivered";
    default:
      return "processing";
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication required",
          },
        },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.min(Number(searchParams.get("limit")) || 6, 50);
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;

    const store = await authSeller(userId);
    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    const where: any = { storeId: store.id };

    const dbStatus =
      status && status !== "all" ? mapUIStatusToDB(status) : undefined;

    if (dbStatus) {
      where.status = dbStatus;
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

    const data = orders.map((order) => ({
      id: `ORD-${order.id.slice(-6).toUpperCase()}`,
      rawId: order.id,
      customer: order.user.name,
      date: order.createdAt,
      amount: order.total,
      items: order.orderItems.reduce((sum, item) => sum + item.quantity, 0),
      status: mapOrderStatus(order.status),
      payment: order.isPaid ? "paid" : "pending",
    }));

    return NextResponse.json({
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
