// Get Dashboard Data for Admin (total order, total stores, total products, total revenue)

import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types/api";
import authAdmin from "@/middlewares/authAdmin";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication required",
          },
        },
        { status: 401 }
      );
    }

    const admin = await authAdmin(userId);

    if (!admin) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: {
            code: "FORBIDDEN",
            message: "Admin access required",
          },
        },
        { status: 403 }
      );
    }

    // Get total orders
    const orders = await prisma.order.count();

    // Get total stores on app
    const stores = await prisma.store.count();

    // Get all orders include only createdAt and total & calculate total revenue
    const allOrders = await prisma.order.findMany({
      select: {
        createdAt: true,
        total: true,
      },
    });

    let totalRevenue = 0;
    allOrders.forEach((order) => {
      totalRevenue += order.total;
    });

    const revenue = totalRevenue.toFixed(2);

    // Get total products on app
    const products = await prisma.product.count();

    const dashboardData = {
      orders,
      stores,
      products,
      revenue,
      allOrders,
    };

    return NextResponse.json({ dashboardData });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: (error as any).code || (error as any).message,
      },
      { status: 400 }
    );
  }
}
