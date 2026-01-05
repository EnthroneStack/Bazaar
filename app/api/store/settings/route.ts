import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// GET: Fetch store data with settings
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "Unauthorized",
            message: "Authentication required",
          },
        },
        { status: 401 }
      );
    }

    const store = await authSeller(userId);

    if (!store) {
      return NextResponse.json(
        {
          success: false,
          message: "Store not found",
        },
        { status: 404 }
      );
    }

    const data = await prisma.store.findUnique({
      where: { id: store.id },
      include: { settings: true },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Error fetching store",
      },
      { status: 500 }
    );
  }
}

// PATCH: Update store settings
export async function PATCH(request: NextRequest) {
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

    const storeId = await authSeller(userId);

    if (!storeId) {
      return NextResponse.json(
        {
          success: false,
          message: "Store not found",
        },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { store, settings } = body;

    if (!store && !settings) {
      return NextResponse.json(
        { success: false, message: "Nothing to update" },
        { status: 400 }
      );
    }

    if (store && Object.keys(store).length > 0) {
      await prisma.store.update({
        where: { id: storeId.id },
        data: {
          name: store.name,
          description: store.description,
          contact: store.contact,
          address: store.address,
          themeColor: store.themeColor,
          metaTitle: store.metaTitle,
          metaDescription: store.metaDescription,
        },
      });
    }

    if (settings && Object.keys(settings).length > 0) {
      await prisma.storeSettings.update({
        where: { storeId: storeId.id },
        data: {
          currency: settings.currency,
          timezone: settings.timezone,
          language: settings.language,
          taxRate: settings.taxRate,
          emailNotifications: settings.emailNotifications,
        },
      });
    }

    const updatedStore = await prisma.store.findUnique({
      where: { id: storeId.id },
      include: { settings: true },
    });

    return NextResponse.json({
      success: true,
      data: updatedStore,
    });
  } catch (error) {
    console.error("Update store error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update store" },
      { status: 500 }
    );
  }
}
