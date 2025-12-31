import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Auth Seller
export async function Get() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "User is not authorized" });
    }
    const isSeller = await authSeller(userId as string);

    if (!isSeller) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    const storeInfo = await prisma.store.findUnique({
      where: { userId },
    });

    return NextResponse.json({ isSeller, storeInfo });
  } catch (error) {
    return NextResponse.json(
      { error: (error as any).code || (error as any).message },
      { status: 400 }
    );
  }
}
