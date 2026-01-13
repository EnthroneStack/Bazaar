// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import CategorySelect from "./CategorySelect";
// import ImageUploader from "./ImageUploader";
// import InventoryInput from "./InventoryInput";
// import TagInput from "./TagInput";

// export interface ImageItem {
//   url: string;
//   fileId: string;
//   file?: File;
//   status?: "idle" | "uploading" | "uploaded" | "failed";
//   progress?: number;
// }

// export default function ProductForm() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [isDraft, setIsDraft] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     mrp: "",
//     price: "",
//     categoryId: "",
//     images: [] as ImageItem[],
//     inStock: true,
//     stockQuantity: 0,
//     lowStockThreshold: 10,
//     tags: [] as string[],
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (!formData.name || !formData.price || !formData.categoryId) {
//         throw new Error("Please fill in all required fields");
//       }

//       const productData = {
//         name: formData.name,
//         description: formData.description,
//         mrp: parseFloat(formData.mrp) || parseFloat(formData.price),
//         price: parseFloat(formData.price),
//         categoryId: formData.categoryId,
//         images: formData.images.map((img) => img.url),
//         inStock: formData.inStock,
//         tags: formData.tags,
//         status: isDraft ? "draft" : "published",
//       };

//       const notUploaded = formData.images.some(
//         (img) => img.status !== "uploaded"
//       );

//       if (notUploaded) {
//         toast.error("Please upload all images before publishing");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch("/api/store/product", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(productData),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Failed to create product");
//       }

//       const result = await response.json();

//       toast.success(
//         isDraft ? "Product saved as draft" : "Product published successfully"
//       );

//       setTimeout(() => {
//         router.push("/store/manage-product");
//       }, 1500);
//     } catch (error) {
//       toast.error(
//         error instanceof Error ? error.message : "Something went wrong"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg sm:text-xl">
//             Basic Information
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="name" className="text-sm font-medium">
//                 Product Name *
//               </Label>
//               <Input
//                 id="name"
//                 value={formData.name}
//                 onChange={(e) => handleInputChange("name", e.target.value)}
//                 placeholder="Enter product name"
//                 className="text-sm sm:text-base"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="category" className="text-sm font-medium">
//                 Category *
//               </Label>
//               <CategorySelect
//                 value={formData.categoryId}
//                 onChange={(value) => handleInputChange("categoryId", value)}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="mrp" className="text-sm font-medium">
//                 MRP (Maximum Retail Price)
//               </Label>
//               <Input
//                 id="mrp"
//                 type="number"
//                 step="0.01"
//                 value={formData.mrp}
//                 onChange={(e) => handleInputChange("mrp", e.target.value)}
//                 placeholder="0.00"
//                 className="text-sm sm:text-base"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="price" className="text-sm font-medium">
//                 Selling Price *
//               </Label>
//               <Input
//                 id="price"
//                 type="number"
//                 step="0.01"
//                 value={formData.price}
//                 onChange={(e) => handleInputChange("price", e.target.value)}
//                 placeholder="0.00"
//                 className="text-sm sm:text-base"
//                 required
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="description" className="text-sm font-medium">
//               Description *
//             </Label>
//             <Textarea
//               id="description"
//               value={formData.description}
//               onChange={(e) => handleInputChange("description", e.target.value)}
//               placeholder="Describe your product in detail..."
//               rows={4}
//               className="text-sm sm:text-base resize-none"
//               required
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Images Card */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg sm:text-xl">Product Images</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ImageUploader
//             images={formData.images}
//             onImagesChange={(images) => handleInputChange("images", images)}
//           />
//         </CardContent>
//       </Card>

//       {/* Inventory Card */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg sm:text-xl">Inventory</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <InventoryInput
//             inStock={formData.inStock}
//             stockQuantity={formData.stockQuantity}
//             lowStockThreshold={formData.lowStockThreshold}
//             onInStockChange={(value) => handleInputChange("inStock", value)}
//             onStockQuantityChange={(value) =>
//               handleInputChange("stockQuantity", value)
//             }
//             onLowStockThresholdChange={(value) =>
//               handleInputChange("lowStockThreshold", value)
//             }
//           />
//         </CardContent>
//       </Card>

//       {/* Tags Card */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg sm:text-xl">
//             Tags & Organization
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <TagInput
//             tags={formData.tags}
//             onTagsChange={(tags) => handleInputChange("tags", tags)}
//           />
//         </CardContent>
//       </Card>

//       {/* Action Buttons */}
//       <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4 border-t">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={() => setIsDraft(true)}
//           disabled={loading}
//           className="w-full sm:w-auto"
//         >
//           Save as Draft
//         </Button>
//         <Button
//           type="submit"
//           onClick={() => setIsDraft(false)}
//           disabled={loading}
//           className="w-full sm:w-auto text-white"
//         >
//           {loading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               {isDraft ? "Saving..." : "Publishing..."}
//             </>
//           ) : (
//             "Publish Product"
//           )}
//         </Button>
//       </div>
//     </form>
//   );
// }

import imagekit from "@/configs/imageKit";
import prisma from "@/lib/prisma";
import { generateUniqueProductSlug } from "@/lib/slugs/productSlug";
import { ProductSchema } from "@/lib/validators/products";
import authSeller from "@/middlewares/authSeller";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    /* ---------------- AUTH ---------------- */
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const store = await authSeller(userId);
    if (!store) {
      return NextResponse.json(
        { success: false, message: "Store not found" },
        { status: 404 }
      );
    }

    /* ---------------- FORM DATA ---------------- */
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const mrp = Number(formData.get("mrp"));
    const price = Number(formData.get("price"));
    const categoryId = formData.get("categoryId") as string;
    const status = (formData.get("status") as "draft" | "published") ?? "draft";

    const tags = formData.getAll("tags").map(String);
    const images = formData.getAll("images") as File[];

    if (price > mrp) {
      return NextResponse.json(
        { success: false, message: "Price cannot exceed MRP" },
        { status: 400 }
      );
    }

    /* ---------------- IMAGE UPLOAD (FIXED) ---------------- */
    const uploadedUrls: string[] = [];

    for (const image of images) {
      if (!image || !image.type.startsWith("image/")) continue;

      const res = await imagekit.files.upload({
        file: image, // ✅ SAME AS LOGO UPLOAD
        fileName: image.name,
        folder: `stores/${store.id}/products`,
      });

      const url = imagekit.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
        src: res.filePath!,
        transformation: [{ width: 1200, quality: 90, format: "webp" }],
      });

      uploadedUrls.push(url);
    }

    /* ---------------- VALIDATION ---------------- */
    const parsed = ProductSchema.safeParse({
      name,
      description,
      mrp,
      price,
      categoryId,
      images: uploadedUrls,
      tags,
      status,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.issues },
        { status: 422 }
      );
    }

    /* ---------------- SLUG ---------------- */
    const slug = await generateUniqueProductSlug(name, store.id);

    /* ---------------- DB ---------------- */
    const product = await prisma.$transaction(async (tx) => {
      const created = await tx.product.create({
        data: {
          name,
          slug,
          description,
          mrp,
          price,
          images: uploadedUrls,
          categoryId,
          storeId: store.id,
        },
      });

      if (tags.length === 0) return created;

      const normalized = [...new Set(tags.map((t) => t.trim().toLowerCase()))];

      await tx.tag.createMany({
        data: normalized.map((slug) => ({ name: slug, slug })),
        skipDuplicates: true,
      });

      const allTags = await tx.tag.findMany({
        where: { slug: { in: normalized } },
      });

      await tx.productTag.createMany({
        data: allTags.map((tag) => ({
          productId: created.id,
          tagId: tag.id,
          assignedBy: userId,
        })),
        skipDuplicates: true,
      });

      return created;
    });

    return NextResponse.json(
      {
        success: true,
        message:
          status === "draft"
            ? "Product saved as draft"
            : "Product published successfully",
        data: product,
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
