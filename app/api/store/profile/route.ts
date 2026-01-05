import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const store = await prisma.store.findFirst({
      where: { userId },
      select: {
        id: true,
        name: true,
        description: true,
        email: true,
        contact: true,
        address: true,
        businessType: true,
        registrationNo: true,
        taxId: true,
        status: true,
        logo: true,
        coverImage: true,
        username: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!store) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: "NO_STORE",
            message: "Store not found",
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ store });
  } catch (error) {
    console.error("Store profile fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, contact } = body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (contact) updateData.contact = contact;

    const store = await prisma.store.update({
      where: { userId },
      data: updateData,
    });

    return NextResponse.json({ store });
  } catch (error) {
    console.error("Store update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
