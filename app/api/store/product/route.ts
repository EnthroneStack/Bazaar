import imagekit from "@/configs/imageKit";
import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

// Add a new product
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

    // Get the data from the form
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const mrp = Number(formData.get("mrp"));
    const price = Number(formData.get("price"));
    const categoryId = formData.get("category") as string;
    const images = formData.getAll("images");

    if (
      !name ||
      !description ||
      !mrp ||
      !price ||
      !categoryId ||
      images.length < 1
    ) {
      return NextResponse.json(
        { error: "Missing product details " },
        { status: 400 }
      );
    }

    if (price > mrp) {
      return NextResponse.json(
        { error: "Price cannot be greater than MRP" },
        { status: 400 }
      );
    }

    const slug = slugify(name, { lower: true, strict: true });

    // Uploading Images to Imagekit
    const imageUrl = await Promise.all(
      images.map(async (image) => {
        const response = await imagekit.files.upload({
          file: image,
          fileName: (image as any).name,
          folder: "products",
        });
        const url = imagekit.helper.buildSrc({
          urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
          src: response.filePath as string,
          transformation: [
            {
              width: 1024,
              quality: 100,
              format: "webp",
            },
          ],
        });
        return url;
      })
    );

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        mrp,
        price,
        categoryId,
        images: imageUrl,
        storeId: store.id,
      },
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: (error as any).code || (error as any).message,
        message: "Failed to create product",
      },
      { status: 500 }
    );
  }
}

// Get all products for a seller
export async function GET() {
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
      return NextResponse.json(
        { success: false, error: "Store not found" },
        { status: 404 }
      );
    }

    const products = await prisma.product.findMany({
      where: { storeId: store.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("List Products Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
