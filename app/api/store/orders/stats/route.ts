import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
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

    const store = await authSeller(userId);

    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    const [
      totalOrders,
      totalRevenue,
      pendingOrders,
      completedOrders,
      avgOrderValue,
    ] = await Promise.all([
      prisma.order.count({ where: { storeId: store.id } }),

      prisma.order.aggregate({
        where: { storeId: store.id, isPaid: true },
        _sum: { total: true },
      }),

      prisma.order.count({
        where: {
          storeId: store.id,
          status: { in: ["ORDER_PLACED", "PROCESSING"] },
        },
      }),

      prisma.order.count({
        where: { storeId: store.id, status: "DELIVERED" },
      }),

      prisma.order.aggregate({
        where: { storeId: store.id },
        _avg: { total: true },
      }),
    ]);

    return NextResponse.json({
      data: {
        totalRevenue: totalRevenue._sum.total ?? 0,
        totalOrders,
        avgOrderValue: avgOrderValue._avg.total ?? 0,
        pendingOrders,
        completedOrders,
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
