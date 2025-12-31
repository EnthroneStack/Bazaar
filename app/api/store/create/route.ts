import { BusinessType } from "@/app/generated/prisma/client";
import imagekit from "@/configs/imageKit";
import { generateUniqueSlug } from "@/lib/generateUniqueSlug";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

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

    const formData = await request.formData();

    const name = formData.get("storeName") as string;
    const username = formData.get("username") as string;
    const description = formData.get("description") as string;
    const email = formData.get("businessEmail") as string;
    const contact = formData.get("phoneNumber") as string;
    const businessTypeRaw = formData.get("businessType") as string;
    const businessRegistrationNumber = formData.get(
      "businessRegistrationNumber"
    ) as string | null;
    const taxId = formData.get("taxId") as string | null;
    const address = JSON.parse(formData.get("address") as string);
    const logo = formData.get("logo") as File;
    const coverImage = formData.get("coverImage") as File | null;
    const acceptTerms = formData.get("acceptTerms");

    if (!businessTypeRaw || !(businessTypeRaw in BusinessType)) {
      return NextResponse.json(
        { error: "Invalid business type" },
        { status: 400 }
      );
    }

    if (
      !name ||
      !username ||
      !description ||
      !email ||
      !contact ||
      !address ||
      !logo
    ) {
      return NextResponse.json(
        {
          error: {
            message: "Missing store info",
          },
        },
        { status: 400 }
      );
    }

    const slug = await generateUniqueSlug(username);
    const businessType = businessTypeRaw as BusinessType;

    // Check if user have already registered a store
    const store = await prisma.store.findFirst({
      where: { userId: userId },
    });

    // If store is already registered then send status of store
    if (store) {
      return NextResponse.json({ status: store.status });
    }

    // Check if usernmame is already taken
    const isUsernameTaken = await prisma.store.findFirst({
      where: { username: username.toLowerCase() },
    });

    if (isUsernameTaken) {
      return NextResponse.json(
        {
          error: "Username is already taken",
        },
        { status: 400 }
      );
    }

    // Check if terms is accepted
    if (acceptTerms !== "true") {
      return NextResponse.json(
        {
          error: {
            code: "TERMS_NOT_ACCEPTED",
            message: "You must accept the terms to proceed",
          },
        },
        { status: 400 }
      );
    }

    // Image upload to imagekit
    const logoUpload = await imagekit.files.upload({
      file: logo,
      fileName: logo.name,
      folder: "logos",
    });

    // URL with basic transformations
    const logoUrl = imagekit.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
      src: logoUpload.filePath as string,
      transformation: [
        {
          width: 512,
          quality: 100,
          format: "webp",
        },
      ],
    });

    let coverUrl: string | null = null;
    if (coverImage) {
      const coverUpload = await imagekit.files.upload({
        file: coverImage,
        fileName: coverImage.name,
        folder: "covers",
      });
      coverUrl = coverUpload.url!;
    }

    const createStore = await prisma.store.create({
      data: {
        userId,
        name,
        description,
        username: username.toLowerCase(),
        slug,
        email,
        contact,
        address,
        logo: logoUrl,
        businessType: businessType,
        registrationNo: businessRegistrationNumber,
        taxId,
        coverImage: coverUrl,
      },
    });

    await prisma.consent.createMany({
      data: [
        {
          subjectType: "STORE",
          subjectId: createStore.id,
          type: "TERMS",
          version: "v1.0",
          accepted: true,
        },
        {
          subjectType: "STORE",
          subjectId: createStore.id,
          type: "MARKETING",
          version: "v1.0",
          accepted: formData.get("marketingOptIn") === "true",
        },
      ],
    });

    return NextResponse.json({ message: "Applied, waiting for approval" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: (error as any).code || (error as any).message,
      },
      { status: 400 }
    );
  }
}

// Check if user have already registered a store if yes then send status of store
export async function GET() {
  try {
    const { userId } = await auth();

    // Check if user have already registerd a store
    const store = await prisma.store.findFirst({
      where: { userId: userId as string },
    });

    // If store is already registered then send status of store
    if (store) {
      return NextResponse.json({ status: store.status });
    }

    return NextResponse.json({ status: "Not registered" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: (error as any).code || (error as any).message,
      },
      { status: 400 }
    );
  }
}
