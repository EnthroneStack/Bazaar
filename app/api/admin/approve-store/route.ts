import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types/api";
import authAdmin from "@/middlewares/authAdmin";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Approve Seller
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        data: null,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required",
        },
      });
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

    const { storeId, status } = await request.json();

    if (!storeId || !["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: {
            code: "INVALID_INPUT",
            message: "Invalid storeId or status",
          },
        },
        { status: 400 }
      );
    }

    if (status === "APPROVED") {
      await prisma.store.update({
        where: { id: storeId },
        data: { status: "APPROVED", isActive: true },
      });
    }
    if (status === "REJECTED") {
      await prisma.store.update({
        where: { id: storeId },
        data: {
          status: "REJECTED",
          isActive: false,
        },
      });
    }
    return NextResponse.json<ApiResponse<{ status: string }>>(
      {
        success: true,
        data: { status },
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        data: null,
        error: {
          code: "INTERNAL_ERROR",
          message: "An error occurred",
        },
      },
      { status: 500 }
    );
  }
}

// Get All pending and rejected stores
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
      where: { status: { in: ["PENDING", "REJECTED"] } },
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
