import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Get store info & store products

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get("username")?.toLowerCase();

    if (!username) {
      return NextResponse.json({ error: "Missing username" }, { status: 400 });
    }

    const store = await prisma.store.findUnique({
      where: { username, isActive: true },
      include: { products: { include: { rating: true } } },
    });

    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 400 });
    }

    return NextResponse.json({ store });
  } catch (error) {
    return NextResponse.json(
      { error: (error as any).code || (error as any).message },
      { status: 400 }
    );
  }
}
