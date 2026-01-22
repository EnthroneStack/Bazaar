import { NextRequest, NextResponse } from "next/server";
import authSeller from "@/middlewares/authSeller";
import { getOrders } from "@/lib/services/orders.service";
import { auth } from "@clerk/nextjs/server";

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

    const store = await authSeller(userId);
    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 6;
    const status = searchParams.get("status");

    const result = await getOrders({
      storeId: store.id,
      page,
      limit,
      status,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[ORDERS_API]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
