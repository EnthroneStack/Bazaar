import authSeller from "@/middlewares/authSeller";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ hasStore: false }, { status: 401 });
  }
  const store = await authSeller(userId);

  return NextResponse.json({
    hasStore: Boolean(store),
  });
}
