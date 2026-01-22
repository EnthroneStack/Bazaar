import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import authSeller from "@/middlewares/authSeller";
import { getOrderStats } from "@/lib/services/orders.service";

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

    const stats = await getOrderStats(store.id);

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("[ORDER_STATS_API]", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
