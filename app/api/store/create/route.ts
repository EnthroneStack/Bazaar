import { BusinessType } from "@/app/generated/prisma/client";
import imagekit from "@/configs/imageKit";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/lib/types/api";
import { generateUniqueStoreSlug } from "@/lib/slugs/storeSlug";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication required",
          },
        },
        { status: 401 }
      );
    }

    const existingStore = await prisma.store.findUnique({
      where: { userId: userId },
    });

    if (existingStore) {
      if (
        existingStore.status === "PENDING" ||
        existingStore.status === "APPROVED"
      ) {
        return NextResponse.json<
          ApiResponse<{
            status: string;
            reason: { primary: string; issues?: string[] } | null;
          }>
        >(
          {
            success: true,
            data: {
              status: existingStore.status,
              reason: existingStore.reason as {
                primary: string;
                issues?: string[];
              } | null,
            },
            error: {
              code: "STORE_EXISTS",
              message: "You already have a store request",
            },
          },
          { status: 409 }
        );
      }
    }

    if (existingStore?.status === "REJECTED") {
      await prisma.store.delete({
        where: { id: existingStore.id },
      });
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

    const slug = await generateUniqueStoreSlug(username);
    const businessType = businessTypeRaw as BusinessType;

    if (
      !name ||
      !username ||
      !description ||
      !email ||
      !contact ||
      !address ||
      !logo
    ) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: {
            code: "INVALID_INPUT",
            message: "Missing store info",
          },
        },
        { status: 400 }
      );
    }

    if (!businessTypeRaw || !(businessTypeRaw in BusinessType)) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: {
            code: "INVALID_BUSINESS_TYPE",
            message: "Business type is not valid",
          },
        },

        { status: 400 }
      );
    }

    const isUsernameTaken = await prisma.store.findFirst({
      where: { username: username.toLowerCase() },
    });

    if (isUsernameTaken) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: "USERNAME_TAKEN",
            message: "Username is already taken",
          },
        },
        { status: 409 }
      );
    }

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

    const logoUpload = await imagekit.files.upload({
      file: logo,
      fileName: logo.name,
      folder: "logos",
    });

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
        status: "PENDING",
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

    return NextResponse.json<
      ApiResponse<{ storeId: string; status: string; createdAt: Date }>
    >(
      {
        success: true,
        message: "Store application submitted successfully",
        data: {
          storeId: createStore.id,
          status: createStore.status,
          createdAt: createStore.createdAt,
        },
        error: null,
      },
      { status: 201 }
    );
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

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication required",
          },
        },
        { status: 401 }
      );
    }

    const store = await prisma.store.findUnique({
      where: { userId },
      select: {
        id: true,
        name: true,
        logo: true,
        username: true,
        status: true,
        reason: true,
        createdAt: true,
        hasEnteredStore: true,
      },
    });

    if (store) {
      return NextResponse.json<
        ApiResponse<{
          status: string;
          reason: {
            primary: string;
            issues?: string[];
          } | null;
          storeId: string;
          createdAt: Date;
          hasEnteredStore: boolean;
        }>
      >({
        success: true,
        data: {
          storeId: store.id,
          status: store.status,
          reason: store.reason as {
            primary: string;
            issues?: string[];
          } | null,
          createdAt: store.createdAt,
          hasEnteredStore: store.hasEnteredStore,
        },
        error: null,
      });
    }

    return NextResponse.json<ApiResponse<{ status: string }>>({
      success: true,
      data: { status: "NOT_REGISTERED" },
      error: null,
    });
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
