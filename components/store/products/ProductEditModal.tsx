"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save, X, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import CategorySelect from "./CategorySelect";
import ImageUploader from "./ImageUploader";
import InventoryInput from "./InventoryInput";
import TagInput from "./TagInput";
import { toast } from "sonner";

interface ProductEditModalProps {
  product: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (updatedProduct: any) => Promise<void>;
}

export default function ProductEditModal({
  product,
  open,
  onOpenChange,
  onSave,
}: ProductEditModalProps) {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const [formData, setFormData] = useState({
    name: product.name || "",
    description: product.description || "",
    mrp: product.mrp?.toString() || "",
    price: product.price?.toString() || "",
    categoryId: product.category?.id || "",
    images: product.images?.map((url: string) => ({ url, fileId: url })) || [],
    inStock: product.inStock !== false,
    stockQuantity: product.stockQuantity || 0,
    lowStockThreshold: product.lowStockThreshold || 10,
    tags: product.tags?.map((t: any) => t.tag.name) || [],
    status: product.status || "DRAFT",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.price || !formData.categoryId) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSaving(true);

    try {
      const fd = new FormData();

      fd.append("name", formData.name);
      fd.append("description", formData.description);
      fd.append("price", formData.price);
      fd.append("mrp", formData.mrp || formData.price);
      fd.append("categoryId", formData.categoryId);
      fd.append("status", formData.status);
      fd.append("stockQuantity", String(formData.stockQuantity));
      fd.append("lowStockThreshold", String(formData.lowStockThreshold));
      fd.append("trackInventory", String(formData.inStock));

      const existingImages = formData.images
        .filter((img: any) => !img.file)
        .map((img: any) => img.url);

      fd.append("existingImages", JSON.stringify(existingImages));

      formData.images
        .filter((img: any) => img.file)
        .forEach((img: any) => {
          fd.append("images", img.file);
        });

      fd.append("tags", JSON.stringify(formData.tags));

      if (onSave) {
        await onSave({ id: product.id, formData: fd });
      }

      toast.success("Product updated successfully");
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  const getPublicationStatusBadge = (status: string) => {
    const isPublished = status === "PUBLISHED";

    return (
      <Badge
        variant="outline"
        className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
          isPublished
            ? "bg-blue-100 text-blue-800 border-blue-200"
            : "bg-amber-100 text-amber-800 border-amber-200"
        }`}
      >
        {isPublished ? (
          <>
            <CheckCircle className="h-3 w-3" />
            Published
          </>
        ) : (
          <>
            <Clock className="h-3 w-3" />
            Draft
          </>
        )}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[95vw] sm:max-w-4xl h-[95dvh] sm:h-[90vh] flex flex-col p-0 bg-white shadow-xl border rounded-xl mx-auto"
      >
        <DialogHeader className="px-4 sm:px-6 py-4 border-b flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <DialogTitle className="text-base sm:text-lg">
              Edit Product
            </DialogTitle>
            {getPublicationStatusBadge(formData.status)}
          </div>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              disabled={saving}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="flex-1 min-h-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full flex flex-col"
          >
            <div className="border-b px-4 sm:px-6">
              <TabsList className="w-full justify-start h-auto p-0 bg-transparent overflow-x-auto">
                <TabsTrigger
                  value="basic"
                  className="flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Basic Info
                </TabsTrigger>
                <TabsTrigger
                  value="images"
                  className="flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Images
                </TabsTrigger>
                <TabsTrigger
                  value="inventory"
                  className="flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Inventory
                </TabsTrigger>
                <TabsTrigger
                  value="tags"
                  className="flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Tags
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="p-4 sm:p-6">
                  <TabsContent
                    value="basic"
                    className="space-y-4 sm:space-y-6 mt-0"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm sm:text-base">
                          Product Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="edit-name"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Product Name *
                          </Label>
                          <Input
                            id="edit-name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="Enter product name"
                            className="text-sm"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="edit-category"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Category *
                          </Label>
                          <CategorySelect
                            value={formData.categoryId}
                            onChange={(value) =>
                              handleInputChange("categoryId", value)
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="edit-mrp"
                              className="text-xs sm:text-sm font-medium"
                            >
                              MRP (Maximum Retail Price)
                            </Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                $
                              </span>
                              <Input
                                id="edit-mrp"
                                type="number"
                                step="0.01"
                                value={formData.mrp}
                                onChange={(e) =>
                                  handleInputChange("mrp", e.target.value)
                                }
                                placeholder="0.00"
                                className="pl-8 text-sm"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="edit-price"
                              className="text-xs sm:text-sm font-medium"
                            >
                              Selling Price *
                            </Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                $
                              </span>
                              <Input
                                id="edit-price"
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) =>
                                  handleInputChange("price", e.target.value)
                                }
                                placeholder="0.00"
                                className="pl-8 text-sm"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="edit-description"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Description *
                          </Label>
                          <Textarea
                            id="edit-description"
                            value={formData.description}
                            onChange={(e) =>
                              handleInputChange("description", e.target.value)
                            }
                            placeholder="Describe your product in detail..."
                            rows={3}
                            className="text-sm resize-none"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="edit-status"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Publication Status
                          </Label>
                          <Select
                            value={formData.status}
                            onValueChange={(value) =>
                              handleInputChange("status", value)
                            }
                          >
                            <SelectTrigger id="edit-status" className="text-sm">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PUBLISHED">
                                Published
                              </SelectItem>
                              <SelectItem value="DRAFT">Draft</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="images" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm sm:text-base">
                          Product Images
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ImageUploader
                          images={formData.images}
                          onImagesChange={(images) =>
                            handleInputChange("images", images)
                          }
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="inventory" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm sm:text-base">
                          Inventory Management
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <InventoryInput
                          inStock={formData.inStock}
                          stockQuantity={formData.stockQuantity}
                          lowStockThreshold={formData.lowStockThreshold}
                          onInStockChange={(value) =>
                            handleInputChange("inStock", value)
                          }
                          onStockQuantityChange={(value) =>
                            handleInputChange("stockQuantity", value)
                          }
                          onLowStockThresholdChange={(value) =>
                            handleInputChange("lowStockThreshold", value)
                          }
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="tags" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm sm:text-base">
                          Tags & Organization
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <TagInput
                          tags={formData.tags}
                          onTagsChange={(tags) =>
                            handleInputChange("tags", tags)
                          }
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </ScrollArea>
            </div>
          </Tabs>
        </div>

        <div className="border-t p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-muted-foreground">
              {formData.status === "PUBLISHED" ? (
                <div className="flex items-center gap-1 sm:gap-2">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                  <span>Visible to customers</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
                  <span>Draft mode</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={saving}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 sm:flex-none gap-2 text-white"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
