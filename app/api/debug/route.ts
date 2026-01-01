import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test basic functionality
    const testSlug = "test-username"
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    return NextResponse.json({
      success: true,
      slug: testSlug,
      message: "Test route working",
    });
  } catch (error) {
    console.error("Test route error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      slug: "test-fallback",
    });
  }
}
