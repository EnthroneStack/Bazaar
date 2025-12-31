import slugify from "slugify";
import prisma from "@/lib/prisma";

export async function generateUniqueSlug(username: string) {
  const baseSlug = slugify(username, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.store.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
}
