import slugify from "slugify";
import prisma from "../prisma";

export async function generateUniqueProductSlug(name: string, storeId: string) {
  const base = slugify(name, { lower: true, strict: true });
  if (!base) {
    throw new Error("Invalid product name for slug generation");
  }
  let slug = base;
  let counter = 1;

  while (
    await prisma.product.findUnique({
      where: { storeId_slug: { storeId, slug } },
    })
  ) {
    slug = `${base}-${counter++}`;
  }

  return slug;
}
