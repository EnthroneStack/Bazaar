import imagekit from "@/configs/imageKit";
import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
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

    const formData = request.formData();
    const image = (await formData).get("logo") as File | null;

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "Logo file is required",
        },
        { status: 400 }
      );
    }

    // Image upload to imagekit
    const response = await imagekit.files.upload({
      file: image,
      fileName: image.name,
      folder: "logos",
    });

    // URL with basic transformations
    const logoUrl = imagekit.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
      src: response.filePath as string,
      transformation: [
        {
          width: 512,
          quality: 100,
          format: "webp",
        },
      ],
    });

    await prisma.store.update({
      where: { id: store.id },
      data: { logo: logoUrl },
    });

    return NextResponse.json({
      success: true,
      logo: logoUrl,
    });
  } catch (error) {
    console.error("Upload logo error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload logo" },
      { status: 500 }
    );
  }
}
