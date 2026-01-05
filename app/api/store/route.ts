import authSeller from "@/middlewares/authSeller";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const store = await authSeller(userId);

    if (!store) {
      return NextResponse.json(
        { success: false, error: "Store not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ store });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Store not found" },
      { status: 404 }
    );
  }
}
