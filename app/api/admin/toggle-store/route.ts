import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types/api";
import authAdmin from "@/middlewares/authAdmin";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Toggle store isActive status
export async function POST(request: NextRequest) {
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

    const { storeId } = await request.json();

    if (!storeId) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: {
            code: "BAD_REQUEST",
            message: "Store is required",
          },
        },
        { status: 400 }
      );
    }

    const store = await prisma.store.findUnique({
      where: { id: storeId },
      select: { isActive: true },
    });

    if (!store) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: {
            code: "NOT_FOUND",
            message: "Store  not found",
          },
        },
        { status: 404 }
      );
    }

    const updatedStore = await prisma.store.update({
      where: { id: storeId },
      data: {
        isActive: !store.isActive,
      },
      select: {
        isActive: true,
      },
    });

    return NextResponse.json<ApiResponse<{ isActive: boolean }>>(
      {
        success: true,
        data: {
          isActive: updatedStore.isActive,
        },
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("TOGGLE_STORE_STATUS_ERROR:", error);

    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        data: null,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to update store status",
        },
      },
      { status: 500 }
    );
  }
}
