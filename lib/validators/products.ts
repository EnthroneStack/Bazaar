import { z } from "zod";

export const ProductSchema = z
  .object({
    name: z.string().min(1, "Product name is required").max(120),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(5000),

    mrp: z.number().positive("MRP must be positive"),
    price: z.number().positive("Price must be positive"),

    categoryId: z.string().cuid("Invalid category ID"),

    tags: z.array(z.string().min(2)).max(20).default([]),

    inStock: z.boolean().default(true),

    status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  })
  .refine((data) => data.price <= data.mrp, {
    path: ["price"],
    message: "Price cannot exceed MRP",
  });
