import prisma from "@/lib/prisma";
import { generateUniqueProductSlug } from "@/lib/slugs/productSlug";
import { ProductSchema } from "@/lib/validators/products";
import authSeller from "@/middlewares/authSeller";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import imagekit from "@/configs/imageKit";
import { ProductStatus } from "@/app/generated/prisma/client";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication required",
          },
        },
        { status: 401 }
      );
    }

    const store = await authSeller(userId);

    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    const formData = await request.formData();

    const tagsRaw = formData.get("tags");

    const rawData = {
      name: formData.get("name"),
      description: formData.get("description"),
      mrp: Number(formData.get("mrp")),
      price: Number(formData.get("price")),
      categoryId: formData.get("categoryId"),
      trackInventory: formData.get("trackInventory") === "true",
      stockQuantity: Number(formData.get("stockQuantity") || 0),
      lowStockThreshold: Number(formData.get("lowStockThreshold") || 10),
      status: formData.get("status") as ProductStatus,
      tags: tagsRaw ? JSON.parse(tagsRaw as string) : [],
    };

    if (rawData.trackInventory === false) {
      rawData.stockQuantity = 0;
      rawData.lowStockThreshold = 0;
    }

    const parsed = ProductSchema.safeParse(rawData);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.issues },
        { status: 422 }
      );
    }

    if (rawData.trackInventory && rawData.stockQuantity < 0) {
      return NextResponse.json(
        { success: false, message: "Stock quantity cannot be negative" },
        { status: 400 }
      );
    }

    const images = formData.getAll("images") as File[];

    if (parsed.data.status === "PUBLISHED" && images.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one image is required to publish a product",
        },
        { status: 400 }
      );
    }

    const uploadedImages: string[] = [];

    for (const image of images) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const base64 = buffer.toString("base64");

      const upload = await imagekit.files.upload({
        file: `data:${image.type};base64,${base64}`,
        fileName: image.name,
        folder: `products/${store.id}`,
      });

      if (!upload.url) {
        throw new Error("Image upload failed");
      }

      uploadedImages.push(upload.url);
    }

    const data = {
      ...parsed.data,
      images: uploadedImages,
    };

    const normalizeTags = (tags: string[]) => [
      ...new Set(tags.map((t) => t.trim().toLowerCase())),
    ];

    const normalizedTags = normalizeTags(data.tags);

    const slug = await generateUniqueProductSlug(data.name, store.id);

    const product = await prisma.$transaction(async (tx) => {
      const createdProduct = await tx.product.create({
        data: {
          name: data.name,
          slug,
          description: data.description,
          mrp: data.mrp,
          price: data.price,
          images: data.images,
          status: data.status as ProductStatus,
          trackInventory: data.trackInventory,
          stockQuantity: data.stockQuantity,
          lowStockThreshold: data.lowStockThreshold,
          categoryId: data.categoryId,
          storeId: store.id,
        },
      });

      if (normalizedTags.length === 0) return createdProduct;

      const existingTags = await tx.tag.findMany({
        where: { slug: { in: normalizedTags } },
      });

      const existingSlugs = new Set(existingTags.map((t) => t.slug));

      const missingTags = normalizedTags.filter(
        (slug) => !existingSlugs.has(slug)
      );

      if (missingTags.length > 0) {
        await tx.tag.createMany({
          data: missingTags.map((slug) => ({
            name: slug,
            slug,
          })),
          skipDuplicates: true,
        });
      }

      const allTags = await tx.tag.findMany({
        where: { slug: { in: normalizedTags } },
      });

      await tx.productTag.createMany({
        data: allTags.map((tag) => ({
          productId: createdProduct.id,
          tagId: tag.id,
          assignedBy: userId,
        })),
        skipDuplicates: true,
      });

      return createdProduct;
    });

    return NextResponse.json(
      {
        success: true,
        message:
          data.status === "DRAFT"
            ? "Product saved as draft"
            : "Product published successfully",
        data: { product },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    console.error("CREATE_PRODUCT_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "UNAUTHORIZED", message: "Authentication required" },
        },
        { status: 401 }
      );
    }

    const store = await authSeller(userId);
    if (!store) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "STORE_NOT_FOUND", message: "Store not found" },
        },
        { status: 404 }
      );
    }

    const searchParams = request.nextUrl.searchParams;

    const categoryId = searchParams.get("categoryId") || undefined;
    const search = searchParams.get("search") || undefined;
    const cursor = searchParams.get("cursor");
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 50);
    const statusParam = searchParams.get("status")?.toLowerCase();

    let statusFilter:
      | { status: ProductStatus }
      | { status: ProductStatus; stockQuantity: { lte: number } }
      | undefined;

    if (statusParam === "draft") {
      statusFilter = { status: ProductStatus.DRAFT };
    }

    if (statusParam === "published") {
      statusFilter = { status: ProductStatus.PUBLISHED };
    }

    if (statusParam === "out-of-stock") {
      statusFilter = {
        status: ProductStatus.PUBLISHED,
        stockQuantity: { lte: 0 },
      };
    }

    const products = await prisma.product.findMany({
      where: {
        storeId: store.id,
        ...(statusFilter ?? {}),
        ...(categoryId && { categoryId }),
        ...(search && {
          name: { contains: search, mode: "insensitive" },
        }),
      },
      take: limit + 1,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),

      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        mrp: true,
        images: true,
        stockQuantity: true,
        status: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    let nextCursor: string | null = null;

    if (products.length > limit) {
      const nextItem = products.pop();
      nextCursor = nextItem!.id;
    }

    return NextResponse.json({
      success: true,
      data: {
        items: products,
        nextCursor,
      },
    });
  } catch (error) {
    console.error("LIST_PRODUCTS_ERROR", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch products",
        },
      },
      { status: 500 }
    );
  }
}
