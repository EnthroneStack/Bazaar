import { generateUniqueStoreSlug } from "@/lib/slugs/storeSlug";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams
      .get("username")
      ?.toLowerCase();

    if (!username) {
      return NextResponse.json({ slug: "" });
    }

    const slug = await generateUniqueStoreSlug(username);

    return NextResponse.json({ slug });
  } catch (error) {
    console.error("Error generating slug:", error);

    return NextResponse.json({ slug: "" });
  }
}
