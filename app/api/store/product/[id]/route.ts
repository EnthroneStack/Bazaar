import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import imagekit from "@/configs/imageKit";
import { ProductSchema } from "@/lib/validators/products";
import { ProductStatus } from "@/app/generated/prisma/client";
import { deleteImagesFromImageKit } from "@/lib/imagekit/deleteImages";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const store = await authSeller(userId);
    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    const { id } = await params;

    const existingProduct = await prisma.product.findFirst({
      where: { id, storeId: store.id },
      include: { tags: true },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const formData = await request.formData();

    const tagsRaw = formData.get("tags");
    const existingImagesRaw = formData.get("existingImages");

    const rawData = {
      name: formData.get("name"),
      description: formData.get("description"),
      mrp: Number(formData.get("mrp")),
      price: Number(formData.get("price")),
      categoryId: formData.get("categoryId"),
      trackInventory: formData.get("trackInventory") === "true",
      status: formData.get("status") as ProductStatus,
      tags: tagsRaw ? JSON.parse(tagsRaw as string) : [],
      stockQuantity:
        formData.get("stockQuantity") !== null
          ? Number(formData.get("stockQuantity"))
          : existingProduct.stockQuantity,

      lowStockThreshold:
        formData.get("lowStockThreshold") !== null
          ? Number(formData.get("lowStockThreshold"))
          : existingProduct.lowStockThreshold,
    };

    if (!rawData.trackInventory) {
      rawData.stockQuantity = 0;
      rawData.lowStockThreshold = 0;
    }

    const parsed = ProductSchema.safeParse(rawData);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.issues },
        { status: 422 },
      );
    }

    const existingImages: string[] = existingImagesRaw
      ? JSON.parse(existingImagesRaw as string)
      : [];

    const newImages = formData.getAll("images") as File[];
    const uploadedImages: string[] = [];

    for (const image of newImages) {
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

    const finalImages = [...existingImages, ...uploadedImages];

    if (parsed.data.status === "PUBLISHED" && finalImages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one image is required to publish a product",
        },
        { status: 400 },
      );
    }

    const normalizeTags = (tags: string[]) => [
      ...new Set(tags.map((t) => t.trim().toLowerCase())),
    ];

    const normalizedTags = normalizeTags(parsed.data.tags);

    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id },
        data: {
          name: parsed.data.name,
          description: parsed.data.description,
          price: parsed.data.price,
          mrp: parsed.data.mrp,
          images: finalImages,
          status: parsed.data.status,
          trackInventory: parsed.data.trackInventory,
          stockQuantity: parsed.data.stockQuantity,
          lowStockThreshold: parsed.data.lowStockThreshold,
          categoryId: parsed.data.categoryId,
        },
      });

      await tx.productTag.deleteMany({
        where: { productId: id },
      });

      if (normalizedTags.length === 0) return;

      const existingTags = await tx.tag.findMany({
        where: { slug: { in: normalizedTags } },
      });

      const existingSlugs = new Set(existingTags.map((t) => t.slug));

      const missingTags = normalizedTags.filter(
        (slug) => !existingSlugs.has(slug),
      );

      if (missingTags.length > 0) {
        await tx.tag.createMany({
          data: missingTags.map((slug) => ({ name: slug, slug })),
          skipDuplicates: true,
        });
      }

      const allTags = await tx.tag.findMany({
        where: { slug: { in: normalizedTags } },
      });

      await tx.productTag.createMany({
        data: allTags.map((tag) => ({
          productId: id,
          tagId: tag.id,
          assignedBy: userId,
        })),
        skipDuplicates: true,
      });
    });

    return NextResponse.json({
      success: true,
      data: {
        id,
        name: parsed.data.name,
        price: parsed.data.price,
        stockQuantity: parsed.data.stockQuantity,
        status: parsed.data.status,
        images: finalImages,
        categoryId: parsed.data.categoryId,
      },
    });
  } catch (error) {
    console.error("UPDATE_PRODUCT_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Failed to update product" },
      { status: 500 },
    );
  }
}

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
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

//     const { id } = await params;

//     const product = await prisma.product.findFirst({
//       where: { id, storeId: store.id },
//     });

//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     if (product.images.length > 0) {
//       await Promise.all(
//         product.images.map(async (url) => {
//           try {
//             const fileId = url.split("/").pop()?.split(".")[0];
//             if (fileId) {
//               await imagekit.files.delete(fileId);
//             }
//           } catch (err) {
//             console.warn("IMAGE_DELETE_FAILED", url);
//           }
//         }),
//       );
//     }

//     await prisma.$transaction(async (tx) => {
//       await tx.productTag.deleteMany({
//         where: { productId: id },
//       });

//       await tx.product.delete({
//         where: { id },
//       });
//     });

//     return NextResponse.json({
//       success: true,
//       data: { id },
//     });
//   } catch (error) {
//     console.error("DELETE_PRODUCT_ERROR", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to delete product" },
//       { status: 500 },
//     );
//   }
// }

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const store = await authSeller(userId);
    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    const { id } = await params;

    const product = await prisma.product.findFirst({
      where: { id, storeId: store.id },
      select: { id: true, images: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.productTag.deleteMany({
        where: { productId: id },
      });

      await tx.product.delete({
        where: { id },
      });
    });

    await deleteImagesFromImageKit(product.images);

    return NextResponse.json({
      success: true,
      data: { id },
    });
  } catch (error) {
    console.error("DELETE_PRODUCT_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete product" },
      { status: 500 },
    );
  }
}
