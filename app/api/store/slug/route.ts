import { generateUniqueSlug } from "@/lib/generateUniqueSlug";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams
      .get("username")
      ?.toLowerCase();

    if (!username) {
      return NextResponse.json({ slug: "" });
    }

    const slug = await generateUniqueSlug(username);

    return NextResponse.json({ slug });
  } catch (error) {
    console.error("Error generating slug:", error);

    return NextResponse.json({ slug: "" });
  }
}
