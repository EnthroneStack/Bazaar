"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CategorySelect from "./CategorySelect";
import ImageUploader from "./ImageUploader";
import InventoryInput from "./InventoryInput";
import TagInput from "./TagInput";

export interface ImageItem {
  url: string;
  fileId: string;
  file?: File;
  status?: "idle" | "uploading" | "uploaded" | "failed";
  progress?: number;
}

export default function ProductForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    mrp: "",
    price: "",
    categoryId: "",
    images: [] as ImageItem[],
    inStock: true,
    stockQuantity: 0,
    lowStockThreshold: 10,
    tags: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.name || !formData.price || !formData.categoryId) {
        throw new Error("Please fill in all required fields");
      }

      const fd = new FormData();

      fd.append("name", formData.name);
      fd.append("description", formData.description);
      fd.append("mrp", formData.mrp || formData.price);
      fd.append("price", formData.price);
      fd.append("categoryId", formData.categoryId);
      fd.append("inStock", String(formData.inStock));
      fd.append("status", isDraft ? "draft" : "published");
      fd.append("tags", JSON.stringify(formData.tags));

      formData.images.forEach((img) => {
        if (img.file) {
          fd.append("images", img.file);
        }
      });

      const response = await fetch("/api/store/product", {
        method: "POST",
        body: fd,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create product");
      }

      const result = await response.json();

      toast.success(
        isDraft ? "Product saved as draft" : "Product published successfully"
      );

      setTimeout(() => {
        router.push("/store/manage-product");
      }, 1500);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Product Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
                className="text-sm sm:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category *
              </Label>
              <CategorySelect
                value={formData.categoryId}
                onChange={(value) => handleInputChange("categoryId", value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mrp" className="text-sm font-medium">
                MRP (Maximum Retail Price)
              </Label>
              <Input
                id="mrp"
                type="number"
                step="0.01"
                value={formData.mrp}
                onChange={(e) => handleInputChange("mrp", e.target.value)}
                placeholder="0.00"
                className="text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">
                Selling Price *
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="0.00"
                className="text-sm sm:text-base"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your product in detail..."
              rows={4}
              className="text-sm sm:text-base resize-none"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Images Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Product Images</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUploader
            images={formData.images}
            onImagesChange={(images) => handleInputChange("images", images)}
          />
        </CardContent>
      </Card>

      {/* Inventory Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <InventoryInput
            inStock={formData.inStock}
            stockQuantity={formData.stockQuantity}
            lowStockThreshold={formData.lowStockThreshold}
            onInStockChange={(value) => handleInputChange("inStock", value)}
            onStockQuantityChange={(value) =>
              handleInputChange("stockQuantity", value)
            }
            onLowStockThresholdChange={(value) =>
              handleInputChange("lowStockThreshold", value)
            }
          />
        </CardContent>
      </Card>

      {/* Tags Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            Tags & Organization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TagInput
            tags={formData.tags}
            onTagsChange={(tags) => handleInputChange("tags", tags)}
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsDraft(true)}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          Save as Draft
        </Button>
        <Button
          type="submit"
          onClick={() => setIsDraft(false)}
          disabled={loading}
          className="w-full sm:w-auto text-white"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isDraft ? "Saving..." : "Publishing..."}
            </>
          ) : (
            "Publish Product"
          )}
        </Button>
      </div>
    </form>
  );
}
