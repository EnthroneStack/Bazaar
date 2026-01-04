import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types/api";
import authAdmin from "@/middlewares/authAdmin";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Get all approved stores
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

    const stores = await prisma.store.findMany({
      where: { status: "APPROVED" },
      include: { user: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json<ApiResponse<typeof stores>>(
      {
        success: true,
        data: stores,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ADMIN_STORE_FETCH_ERROR:", error);

    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        data: null,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch stores",
        },
      },
      { status: 500 }
    );
  }
}
