import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import imagekit from "@/configs/imageKit";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const upload = await (imagekit as any).upload({
      file: buffer,
      fileName: file.name,
      folder: "/products",
      useUniqueFileName: true,
      tags: ["product"],
    });

    return NextResponse.json({
      url: upload.url,
      fileId: upload.fileId,
    });
  } catch (error) {
    console.error("IMAGE_UPLOAD_ERROR", error);
    return NextResponse.json(
      { message: "Image upload failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { fileId } = await req.json();
    if (!fileId) {
      return NextResponse.json({ message: "fileId required" }, { status: 400 });
    }

    await (imagekit as any).deleteFile(fileId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("IMAGE_DELETE_ERROR", error);
    return NextResponse.json(
      { message: "Failed to delete image" },
      { status: 500 }
    );
  }
}
