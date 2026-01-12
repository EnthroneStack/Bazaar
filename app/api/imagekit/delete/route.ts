import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import imagekit from "@/configs/imageKit";

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fileId } = await req.json();

  if (!fileId) {
    return NextResponse.json({ error: "fileId required" }, { status: 400 });
  }

  await new Promise<void>((resolve, reject) => {
    (
      imagekit as unknown as {
        deleteFile(fileId: string, cb: (error: any, result: any) => void): void;
      }
    ).deleteFile(fileId, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });

  return NextResponse.json({ success: true });
}
