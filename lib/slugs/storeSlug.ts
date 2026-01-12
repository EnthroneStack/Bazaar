import slugify from "slugify";
import prisma from "@/lib/prisma";

export async function generateUniqueStoreSlug(username: string) {
  try {
    const baseSlug = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug =
      baseSlug || `store-${Math.random().toString(36).substring(2, 9)}`;

    let counter = 1;
    let originalSlug = slug;

    while (await prisma.store.findUnique({ where: { slug } })) {
      slug = `${originalSlug}-${counter++}`;

      if (counter > 100) {
        slug = `${originalSlug}-${Date.now()}`;
        break;
      }
    }

    return slug;
  } catch (error) {
    console.error("Error in generateUniqueSlug:", error);

    return `store-${Date.now()}`;
  }
}
