import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required").max(120),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000),
  mrp: z.number().positive("MRP must be positive"),
  price: z.number().positive("Price must be positive"),
  categoryId: z.string().cuid(),
  // images: z
  //   .array(z.string().url())
  //   .min(1, "At least one image is required")
  //   .max(8),
  images: z.array(z.string().url()).max(8).default([]),

  tags: z.array(z.string().min(2)).max(20).optional().default([]),
  status: z.enum(["draft", "published"]).default("draft"),
});
