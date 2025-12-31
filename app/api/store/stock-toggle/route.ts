import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// toggle stock of a product
export async function POST(request: NextRequest) {
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
        { status: 401 }
      );
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Missing details: productId" },
        { status: 400 }
      );
    }

    const storeId = await authSeller(userId);

    if (!storeId) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    // Check if product exists
    const product = await prisma.product.findFirst({
      where: { id: productId, storeId: storeId },
    });

    if (!product) {
      return NextResponse.json({ error: "No product found" }, { status: 404 });
    }
    await prisma.product.update({
      where: { id: productId },
      data: {
        inStock: !product.inStock,
      },
    });

    return NextResponse.json({
      message: "Product stock updated successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as any).code || (error as any).message },
      { status: 400 }
    );
  }
}
