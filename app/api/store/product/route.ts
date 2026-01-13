// import prisma from "@/lib/prisma";
// import { generateUniqueProductSlug } from "@/lib/slugs/productSlug";
// import { ProductSchema } from "@/lib/validators/products";
// import authSeller from "@/middlewares/authSeller";
// import { auth } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: "UNAUTHORIZED",
//             message: "Authentication required",
//           },
//         },
//         { status: 401 }
//       );
//     }

//     const store = await authSeller(userId);

//     if (!store) {
//       return NextResponse.json({ error: "Store not found" }, { status: 404 });
//     }

//     const body = await request.json();

//     const parsed = ProductSchema.safeParse(body);

//     if (!parsed.success) {
//       return NextResponse.json(
//         { success: false, errors: parsed.error.issues },
//         { status: 422 }
//       );
//     }

//     const {
//       name,
//       description,
//       mrp,
//       price,
//       categoryId,
//       images,
//       tags = [],
//       status,
//     } = parsed.data;

//     if (price > mrp) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: {
//             code: "INVALID_PRICE",
//             message: "Price cannot exceed MRP",
//           },
//         },
//         { status: 400 }
//       );
//     }

//     const slug = await generateUniqueProductSlug(name, store.id);

//     const product = await prisma.$transaction(async (tx) => {
//       const createdProduct = await tx.product.create({
//         data: {
//           name,
//           slug,
//           description,
//           mrp,
//           price,
//           images,
//           categoryId,
//           storeId: store.id,
//         },
//       });

//       if (tags.length === 0) return createdProduct;

//       const normalizeTags = (tags: string[]) => [
//         ...new Set(tags.map((t) => t.trim().toLowerCase())),
//       ];

//       const normalizedTags = normalizeTags(tags);

//       const existingTags = await tx.tag.findMany({
//         where: { slug: { in: normalizedTags } },
//       });

//       const existingSlugs = new Set(existingTags.map((t) => t.slug));

//       const missingTags = normalizedTags.filter(
//         (slug) => !existingSlugs.has(slug)
//       );

//       if (missingTags.length > 0) {
//         await tx.tag.createMany({
//           data: missingTags.map((slug) => ({
//             name: slug,
//             slug,
//           })),
//           skipDuplicates: true,
//         });
//       }

//       const allTags = await tx.tag.findMany({
//         where: { slug: { in: normalizedTags } },
//       });

//       await tx.productTag.createMany({
//         data: allTags.map((tag) => ({
//           productId: createdProduct.id,
//           tagId: tag.id,
//           assignedBy: userId,
//         })),
//         skipDuplicates: true,
//       });

//       return createdProduct;
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message:
//           status === "draft"
//             ? "Product saved as draft"
//             : "Product published successfully",
//         data: { product },
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     console.error("CREATE_PRODUCT_ERROR", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request: NextRequest) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: { code: "UNAUTHORIZED", message: "Authentication required" },
//         },
//         { status: 401 }
//       );
//     }

//     const store = await authSeller(userId);
//     if (!store) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: { code: "STORE_NOT_FOUND", message: "Store not found" },
//         },
//         { status: 404 }
//       );
//     }

//     const { searchParams } = new URL(request.url);

//     const cursor = searchParams.get("cursor");
//     const limit = Math.min(Number(searchParams.get("limit")) || 20, 50);

//     const status = searchParams.get("status");
//     const categoryId = searchParams.get("categoryId");
//     const search = searchParams.get("search");

//     const products = await prisma.product.findMany({
//       where: {
//         storeId: store.id,
//         ...(status && { status }),
//         ...(categoryId && { categoryId }),
//         ...(search && {
//           name: { contains: search, mode: "insensitive" },
//         }),
//       },
//       take: limit + 1,
//       ...(cursor && {
//         skip: 1,
//         cursor: { id: cursor },
//       }),
//       orderBy: { createdAt: "desc" },
//       select: {
//         id: true,
//         name: true,
//         slug: true,
//         price: true,
//         mrp: true,
//         images: true,
//         createdAt: true,
//         category: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },
//       },
//     });

//     let nextCursor: string | null = null;

//     if (products.length > limit) {
//       const nextItem = products.pop();
//       nextCursor = nextItem!.id;
//     }

//     return NextResponse.json({
//       success: true,
//       data: {
//         items: products,
//         nextCursor,
//       },
//     });
//   } catch (error) {
//     console.error("LIST_PRODUCTS_ERROR", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: {
//           code: "INTERNAL_SERVER_ERROR",
//           message: "Failed to fetch products",
//         },
//       },
//       { status: 500 }
//     );
//   }
// }

import imagekit from "@/configs/imageKit";
import prisma from "@/lib/prisma";
import { generateUniqueProductSlug } from "@/lib/slugs/productSlug";
import { ProductSchema } from "@/lib/validators/products";
import authSeller from "@/middlewares/authSeller";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * CREATE PRODUCT
 * - Accepts multipart/form-data
 * - Uploads images to ImageKit
 * - Saves ImageKit URLs to DB
 */
export async function POST(request: NextRequest) {
  try {
    /* ----------------------------------------------------
       AUTH
    ---------------------------------------------------- */
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
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "STORE_NOT_FOUND",
            message: "Store not found",
          },
        },
        { status: 404 }
      );
    }

    /* ----------------------------------------------------
       FORM DATA (CRITICAL CHANGE)
    ---------------------------------------------------- */
    const formData = await request.formData();

    /* ----------------------------------------------------
       EXTRACT PRIMITIVE FIELDS
    ---------------------------------------------------- */
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const mrp = Number(formData.get("mrp"));
    const price = Number(formData.get("price"));
    const categoryId = formData.get("categoryId") as string;
    const status = (formData.get("status") as "draft" | "published") ?? "draft";

    /* ----------------------------------------------------
       TAGS (MULTI-VALUE FIELD)
    ---------------------------------------------------- */
    const tags = formData.getAll("tags").map(String);

    /* ----------------------------------------------------
       IMAGES (FILES)
    ---------------------------------------------------- */
    const imageFiles = formData.getAll("images") as File[];

    /* ----------------------------------------------------
       BUSINESS RULE: PRICE
    ---------------------------------------------------- */
    if (price > mrp) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_PRICE",
            message: "Price cannot exceed MRP",
          },
        },
        { status: 400 }
      );
    }

    /* ----------------------------------------------------
       IMAGE UPLOAD (SERVER OWNS THIS)
    ---------------------------------------------------- */
    const uploadedImageUrls: string[] = [];

    for (const file of imageFiles) {
      if (!file.type.startsWith("image/")) continue;

      const buffer = Buffer.from(await file.arrayBuffer());

      const upload = await (imagekit as any).upload({
        file: buffer,
        fileName: file.name,
        folder: `/stores/${store.id}/products`,
      });

      uploadedImageUrls.push(upload.url);
    }

    /* ----------------------------------------------------
       ZOD VALIDATION (UNCHANGED CONTRACT)
    ---------------------------------------------------- */
    const parsed = ProductSchema.safeParse({
      name,
      description,
      mrp,
      price,
      categoryId,
      images: uploadedImageUrls,
      tags,
      status,
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsed.error.issues,
        },
        { status: 422 }
      );
    }

    /* ----------------------------------------------------
       SLUG
    ---------------------------------------------------- */
    const slug = await generateUniqueProductSlug(name, store.id);

    /* ----------------------------------------------------
       DB TRANSACTION
    ---------------------------------------------------- */
    const product = await prisma.$transaction(async (tx) => {
      const createdProduct = await tx.product.create({
        data: {
          name,
          slug,
          description,
          mrp,
          price,
          images: uploadedImageUrls,
          categoryId,
          storeId: store.id,
        },
      });

      if (tags.length === 0) return createdProduct;

      /* ---------- TAG NORMALIZATION ---------- */
      const normalizeTags = (tags: string[]) => [
        ...new Set(tags.map((t) => t.trim().toLowerCase())),
      ];

      const normalizedTags = normalizeTags(tags);

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

    /* ----------------------------------------------------
       RESPONSE
    ---------------------------------------------------- */
    return NextResponse.json(
      {
        success: true,
        message:
          status === "draft"
            ? "Product saved as draft"
            : "Product published successfully",
        data: { product },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE_PRODUCT_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * LIST PRODUCTS (UNCHANGED)
 */
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

    const { searchParams } = new URL(request.url);

    const cursor = searchParams.get("cursor");
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 50);
    const status = searchParams.get("status");
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");

    const products = await prisma.product.findMany({
      where: {
        storeId: store.id,
        ...(status && { status }),
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
