import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";

/* ============================
   GET PRODUCT
============================ */
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const store = await authSeller(userId);
    if (!store) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    const product = await prisma.product.findFirst({
      where: {
        id,
        storeId: store.id,
      },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    if (!product) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("GET PRODUCT ERROR", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

/* ============================
   UPDATE PRODUCT
============================ */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const store = await authSeller(userId);
    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    const body = await request.json();

    if (
      body.price !== undefined &&
      body.mrp !== undefined &&
      body.price > body.mrp
    ) {
      return NextResponse.json(
        { error: "Price cannot be greater than MRP" },
        { status: 400 }
      );
    }

    const result = await prisma.product.updateMany({
      where: {
        id,
        storeId: store.id,
      },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        mrp: body.mrp,
        categoryId: body.categoryId,
      },
    });

    if (result.count === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

/* ============================
   DELETE PRODUCT
============================ */
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const store = await authSeller(userId);
    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    const product = await prisma.product.findFirst({
      where: {
        id,
        storeId: store.id,
      },
      include: {
        _count: { select: { orderItems: true } },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product._count.orderItems > 0) {
      return NextResponse.json(
        { error: "Product has orders and cannot be deleted" },
        { status: 400 }
      );
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";
// import authSeller from "@/middlewares/authSeller";
// import imagekit from "@/configs/imageKit";
// import { ProductSchema } from "@/lib/validators/products";
// import { ProductStatus } from "@/app/generated/prisma/client";

// /* ============================
//    UPDATE PRODUCT
// ============================ */
// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const store = await authSeller(userId);
//     if (!store) {
//       return NextResponse.json({ error: "Store not found" }, { status: 404 });
//     }

//     const { id } = params;

//     const existingProduct = await prisma.product.findFirst({
//       where: { id, storeId: store.id },
//       include: { tags: true },
//     });

//     if (!existingProduct) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     const formData = await request.formData();

//     /* ----------------------------
//        Parse form data
//     -----------------------------*/
//     const tagsRaw = formData.get("tags");
//     const existingImagesRaw = formData.get("existingImages");

//     const rawData = {
//       name: formData.get("name"),
//       description: formData.get("description"),
//       mrp: Number(formData.get("mrp")),
//       price: Number(formData.get("price")),
//       categoryId: formData.get("categoryId"),
//       trackInventory: formData.get("trackInventory") === "true",
//       stockQuantity: Number(formData.get("stockQuantity") || 0),
//       lowStockThreshold: Number(formData.get("lowStockThreshold") || 10),
//       status: formData.get("status") as ProductStatus,
//       tags: tagsRaw ? JSON.parse(tagsRaw as string) : [],
//     };

//     if (!rawData.trackInventory) {
//       rawData.stockQuantity = 0;
//       rawData.lowStockThreshold = 0;
//     }

//     const parsed = ProductSchema.safeParse(rawData);
//     if (!parsed.success) {
//       return NextResponse.json(
//         { success: false, errors: parsed.error.issues },
//         { status: 422 }
//       );
//     }

//     /* ----------------------------
//        Images handling
//     -----------------------------*/
//     const existingImages: string[] = existingImagesRaw
//       ? JSON.parse(existingImagesRaw as string)
//       : [];

//     const newImages = formData.getAll("images") as File[];
//     const uploadedImages: string[] = [];

//     for (const image of newImages) {
//       const buffer = Buffer.from(await image.arrayBuffer());
//       const base64 = buffer.toString("base64");

//       const upload = await imagekit.files.upload({
//         file: `data:${image.type};base64,${base64}`,
//         fileName: image.name,
//         folder: `products/${store.id}`,
//       });

//       if (!upload.url) {
//         throw new Error("Image upload failed");
//       }

//       uploadedImages.push(upload.url);
//     }

//     const finalImages = [...existingImages, ...uploadedImages];

//     if (parsed.data.status === "PUBLISHED" && finalImages.length === 0) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "At least one image is required to publish a product",
//         },
//         { status: 400 }
//       );
//     }

//     /* ----------------------------
//        Normalize tags
//     -----------------------------*/
//     const normalizeTags = (tags: string[]) => [
//       ...new Set(tags.map((t) => t.trim().toLowerCase())),
//     ];

//     const normalizedTags = normalizeTags(parsed.data.tags);

//     /* ----------------------------
//        Transaction
//     -----------------------------*/
//     await prisma.$transaction(async (tx) => {
//       await tx.product.update({
//         where: { id },
//         data: {
//           name: parsed.data.name,
//           description: parsed.data.description,
//           price: parsed.data.price,
//           mrp: parsed.data.mrp,
//           images: finalImages,
//           status: parsed.data.status,
//           trackInventory: parsed.data.trackInventory,
//           stockQuantity: parsed.data.stockQuantity,
//           lowStockThreshold: parsed.data.lowStockThreshold,
//           categoryId: parsed.data.categoryId,
//         },
//       });

//       // Remove old tags
//       await tx.productTag.deleteMany({
//         where: { productId: id },
//       });

//       if (normalizedTags.length === 0) return;

//       const existingTags = await tx.tag.findMany({
//         where: { slug: { in: normalizedTags } },
//       });

//       const existingSlugs = new Set(existingTags.map((t) => t.slug));

//       const missingTags = normalizedTags.filter(
//         (slug) => !existingSlugs.has(slug)
//       );

//       if (missingTags.length > 0) {
//         await tx.tag.createMany({
//           data: missingTags.map((slug) => ({ name: slug, slug })),
//           skipDuplicates: true,
//         });
//       }

//       const allTags = await tx.tag.findMany({
//         where: { slug: { in: normalizedTags } },
//       });

//       await tx.productTag.createMany({
//         data: allTags.map((tag) => ({
//           productId: id,
//           tagId: tag.id,
//           assignedBy: userId,
//         })),
//         skipDuplicates: true,
//       });
//     });

//     return NextResponse.json({
//       success: true,
//       message:
//         parsed.data.status === "DRAFT"
//           ? "Product updated (draft)"
//           : "Product updated & published",
//     });
//   } catch (error) {
//     console.error("UPDATE_PRODUCT_ERROR", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to update product" },
//       { status: 500 }
//     );
//   }
// }
