import authSeller from "@/middlewares/authSeller";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ store: null }, { status: 401 });
  }

  try {
    const store = await authSeller(userId);

    if (!store) {
      return NextResponse.json({ store: null }, { status: 200 });
    }

    return NextResponse.json({
      store: {
        id: store.id,
        name: store.name,
        logo: store.logo,
        username: store.username,
      },
    });
  } catch {
    return NextResponse.json({ store: null }, { status: 200 });
  }
}
