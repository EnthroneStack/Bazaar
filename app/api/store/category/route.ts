import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const parentId = searchParams.get("parentId");
    const tree = searchParams.get("tree");

    if (tree === "true") {
      const categories = await prisma.category.findMany({
        where: {
          parentId: null,
        },
        include: {
          children: {
            select: {
              id: true,
              name: true,
              slug: true,
              parentId: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      });

      return NextResponse.json(
        {
          success: true,
          data: categories,
        },
        { status: 200 }
      );
    }

    if (parentId) {
      const categories = await prisma.category.findMany({
        where: { parentId },
        select: {
          id: true,
          name: true,
          slug: true,
          parentId: true,
        },
        orderBy: { name: "asc" },
      });
      return NextResponse.json(
        {
          success: true,
          data: categories,
        },
        { status: 200 }
      );
    }

    const categories = await prisma.category.findMany({
      where: { parentId: null },
      select: {
        id: true,
        name: true,
        slug: true,
        parentId: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(
      {
        success: true,
        data: categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("CATEGORY_FETCH_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories",
      },
      { status: 500 }
    );
  }
}
