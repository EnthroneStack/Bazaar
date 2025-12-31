import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Get Single Product
export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { userId } = await auth();
    const storeId = await authSeller(userId as string);

    if (!storeId) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    const product = await prisma.product.findFirst({
      where: { id, storeId },
      include: {
        category: true,
        rating: true,
        _count: { select: { orderItems: true } },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const avgRating =
      product.rating.length > 0
        ? product.rating.reduce((sum, r) => sum + r.rating, 0) /
          product.rating.length
        : 0;

    return NextResponse.json({
      success: true,
      data: {
        ...product,
        avgRating: Number(avgRating.toFixed(1)),
        totalSales: product._count.orderItems,
      },
    });
  } catch (error) {
    console.error("Get Product Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// Update Product
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { userId } = await auth();
    const storeId = await authSeller(userId as string);

    if (!storeId) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    const body = await request.json();

    const productData = {
      name: body.name,
      description: body.description,
      price: body.price,
      mrp: body.mrp,
      categoryId: body.categoryId,
    };

    if (
      productData.price !== undefined &&
      productData.mrp !== undefined &&
      productData.price > productData.mrp
    ) {
      return NextResponse.json(
        { error: "Price cannot be greater than MRP" },
        { status: 400 }
      );
    }

    const product = await prisma.product.updateMany({
      where: { id, storeId },
      data: productData,
    });

    if (product.count === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product updated" });
  } catch (error) {
    console.error("Update Product Error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// Delete Product
export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { userId } = await auth();
    const storeId = await authSeller(userId as string);

    if (!storeId) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    const product = await prisma.product.findFirst({
      where: { id, storeId },
      include: {
        _count: { select: { orderItems: true } },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product._count.orderItems > 0) {
      return NextResponse.json(
        { error: "Product has orders and cannot be deleted" },
        { status: 400 }
      );
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
