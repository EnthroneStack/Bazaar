import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  mrp: z.number().positive(),
  price: z.number().positive(),
  categoryId: z.string().cuid(),
  images: z.array(z.string().url()).min(1),
  inStock: z.boolean(),
  tags: z.array(z.string().min(2)).default([]),
  status: z.enum(["draft", "published"]).default("published"),
});
