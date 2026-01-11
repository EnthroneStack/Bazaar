import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 20;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const query = searchParams.get("q")?.trim() || "";
    const limitParam = Number(searchParams.get("limit"));

    const limit = Number.isNaN(limitParam)
      ? DEFAULT_LIMIT
      : Math.min(limitParam, MAX_LIMIT);

    const whereClause: any = {
      isActive: true,
    };

    if (query.length > 0) {
      whereClause.OR = [
        {
          name: {
            startsWith: query,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      ];
    }

    const orderBy = query ? [{ name: Prisma.SortOrder.asc }] : undefined;

    const tags = await prisma.tag.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        slug: true,
      },
      orderBy,
      take: limit,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          tags,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching tags:", error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: "STORE_TAG_FETCH_FAILED",
          message: "Unable to fetch tags",
        },
      },
      { status: 500 }
    );
  }
}
