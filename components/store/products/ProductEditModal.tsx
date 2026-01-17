// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Loader2, Save, X, CheckCircle, Clock } from "lucide-react";
// import { useState } from "react";
// import CategorySelect from "./CategorySelect";
// import ImageUploader from "./ImageUploader";
// import InventoryInput from "./InventoryInput";
// import TagInput from "./TagInput";
// import { toast } from "sonner";

// interface ProductEditModalProps {
//   product: any;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSave?: (updatedProduct: any) => Promise<void>;
// }

// export default function ProductEditModal({
//   product,
//   open,
//   onOpenChange,
//   onSave,
// }: ProductEditModalProps) {
//   const [saving, setSaving] = useState(false);
//   const [activeTab, setActiveTab] = useState("basic");

//   const [formData, setFormData] = useState({
//     name: product.name || "",
//     description: product.description || "",
//     mrp: product.mrp?.toString() || "",
//     price: product.price?.toString() || "",
//     categoryId: product.category?.id || "",
//     images: product.images?.map((url: string) => ({ url, fileId: url })) || [],
//     inStock: product.inStock !== false,
//     stockQuantity: product.stockQuantity || 0,
//     lowStockThreshold: product.lowStockThreshold || 10,
//     tags: product.tags?.map((t: any) => t.tag.name) || [],
//     status: product.status || "DRAFT",
//   });

//   const handleInputChange = (field: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSave = async () => {
//     if (!formData.name.trim() || !formData.price || !formData.categoryId) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     setSaving(true);
//     try {
//       const updatedProduct = {
//         ...product,
//         ...formData,
//         price: parseFloat(formData.price),
//         mrp: formData.mrp
//           ? parseFloat(formData.mrp)
//           : parseFloat(formData.price),
//         stockQuantity: parseInt(formData.stockQuantity.toString()),
//         lowStockThreshold: parseInt(formData.lowStockThreshold.toString()),
//       };

//       if (onSave) {
//         await onSave(updatedProduct);
//       }

//       toast.success("Product updated successfully");
//       onOpenChange(false);
//     } catch (error) {
//       toast.error(
//         error instanceof Error ? error.message : "Failed to update product"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getPublicationStatusBadge = (status: string) => {
//     const isPublished = status === "PUBLISHED";

//     return (
//       <Badge
//         variant="outline"
//         className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
//           isPublished
//             ? "bg-blue-100 text-blue-800 border-blue-200"
//             : "bg-amber-100 text-amber-800 border-amber-200"
//         }`}
//       >
//         {isPublished ? (
//           <>
//             <CheckCircle className="h-3 w-3" />
//             Published
//           </>
//         ) : (
//           <>
//             <Clock className="h-3 w-3" />
//             Draft
//           </>
//         )}
//       </Badge>
//     );
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent
//         showCloseButton={false}
//         className="sm:max-w-4xl h-[90vh] flex flex-col p-0 bg-white shadow-xl border rounded-xl"
//       >
//         <DialogHeader className="px-6 py-4 border-b">
//           <div className="flex items-center justify-between">
//             <DialogTitle className="flex items-center gap-2">
//               Edit Product
//             </DialogTitle>
//             <div className="flex items-center gap-2">
//               {getPublicationStatusBadge(formData.status)}
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => onOpenChange(false)}
//                 disabled={saving}
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </DialogHeader>

//         <div className="flex-1 overflow-hidden">
//           <Tabs
//             value={activeTab}
//             onValueChange={setActiveTab}
//             className="h-full"
//           >
//             <div className="border-b px-6">
//               <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
//                 <TabsTrigger
//                   value="basic"
//                   className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
//                 >
//                   Basic Info
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="images"
//                   className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
//                 >
//                   Images
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="inventory"
//                   className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
//                 >
//                   Inventory
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="tags"
//                   className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
//                 >
//                   Tags & Organization
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             <ScrollArea className="h-[calc(90vh-180px)] bg-white">
//               <div className="p-6">
//                 <TabsContent value="basic" className="space-y-6 mt-0">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="text-lg">
//                         Product Information
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <div className="space-y-2">
//                         <Label
//                           htmlFor="edit-name"
//                           className="text-sm font-medium"
//                         >
//                           Product Name *
//                         </Label>
//                         <Input
//                           id="edit-name"
//                           value={formData.name}
//                           onChange={(e) =>
//                             handleInputChange("name", e.target.value)
//                           }
//                           placeholder="Enter product name"
//                           className="text-sm"
//                           required
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <Label
//                           htmlFor="edit-category"
//                           className="text-sm font-medium"
//                         >
//                           Category *
//                         </Label>
//                         <CategorySelect
//                           value={formData.categoryId}
//                           onChange={(value) =>
//                             handleInputChange("categoryId", value)
//                           }
//                         />
//                       </div>

//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <Label
//                             htmlFor="edit-mrp"
//                             className="text-sm font-medium"
//                           >
//                             MRP (Maximum Retail Price)
//                           </Label>
//                           <div className="relative">
//                             <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                               $
//                             </span>
//                             <Input
//                               id="edit-mrp"
//                               type="number"
//                               step="0.01"
//                               value={formData.mrp}
//                               onChange={(e) =>
//                                 handleInputChange("mrp", e.target.value)
//                               }
//                               placeholder="0.00"
//                               className="pl-8 text-sm"
//                             />
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <Label
//                             htmlFor="edit-price"
//                             className="text-sm font-medium"
//                           >
//                             Selling Price *
//                           </Label>
//                           <div className="relative">
//                             <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                               $
//                             </span>
//                             <Input
//                               id="edit-price"
//                               type="number"
//                               step="0.01"
//                               value={formData.price}
//                               onChange={(e) =>
//                                 handleInputChange("price", e.target.value)
//                               }
//                               placeholder="0.00"
//                               className="pl-8 text-sm"
//                               required
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <Label
//                           htmlFor="edit-description"
//                           className="text-sm font-medium"
//                         >
//                           Description *
//                         </Label>
//                         <Textarea
//                           id="edit-description"
//                           value={formData.description}
//                           onChange={(e) =>
//                             handleInputChange("description", e.target.value)
//                           }
//                           placeholder="Describe your product in detail..."
//                           rows={4}
//                           className="text-sm resize-none"
//                           required
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <Label
//                           htmlFor="edit-status"
//                           className="text-sm font-medium"
//                         >
//                           Publication Status
//                         </Label>
//                         <Select
//                           value={formData.status}
//                           onValueChange={(value) =>
//                             handleInputChange("status", value)
//                           }
//                         >
//                           <SelectTrigger id="edit-status" className="text-sm">
//                             <SelectValue placeholder="Select status" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="PUBLISHED">Published</SelectItem>
//                             <SelectItem value="DRAFT">Draft</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>

//                 {/* Images Tab */}
//                 <TabsContent value="images" className="mt-0">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="text-lg">Product Images</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <ImageUploader
//                         images={formData.images}
//                         onImagesChange={(images) =>
//                           handleInputChange("images", images)
//                         }
//                       />
//                     </CardContent>
//                   </Card>
//                 </TabsContent>

//                 {/* Inventory Tab */}
//                 <TabsContent value="inventory" className="mt-0">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="text-lg">
//                         Inventory Management
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <InventoryInput
//                         inStock={formData.inStock}
//                         stockQuantity={formData.stockQuantity}
//                         lowStockThreshold={formData.lowStockThreshold}
//                         onInStockChange={(value) =>
//                           handleInputChange("inStock", value)
//                         }
//                         onStockQuantityChange={(value) =>
//                           handleInputChange("stockQuantity", value)
//                         }
//                         onLowStockThresholdChange={(value) =>
//                           handleInputChange("lowStockThreshold", value)
//                         }
//                       />
//                     </CardContent>
//                   </Card>
//                 </TabsContent>

//                 {/* Tags Tab */}
//                 <TabsContent value="tags" className="mt-0">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="text-lg">
//                         Tags & Organization
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <TagInput
//                         tags={formData.tags}
//                         onTagsChange={(tags) => handleInputChange("tags", tags)}
//                       />
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//               </div>
//             </ScrollArea>
//           </Tabs>
//         </div>

//         <div className="border-t p-4">
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div className="text-sm text-muted-foreground">
//               {formData.status === "PUBLISHED" ? (
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="h-4 w-4 text-green-600" />
//                   This product is visible to customers
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <Clock className="h-4 w-4 text-amber-600" />
//                   This product is in draft mode
//                 </div>
//               )}
//             </div>
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 onClick={() => onOpenChange(false)}
//                 disabled={saving}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleSave}
//                 disabled={saving}
//                 className="gap-2 text-white"
//               >
//                 {saving ? (
//                   <>
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="h-4 w-4" />
//                     Save Changes
//                   </>
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

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
import {
  Loader2,
  Save,
  X,
  CheckCircle,
  Clock,
  ChevronLeft,
} from "lucide-react";
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
      const updatedProduct = {
        ...product,
        ...formData,
        price: parseFloat(formData.price),
        mrp: formData.mrp
          ? parseFloat(formData.mrp)
          : parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity.toString()),
        lowStockThreshold: parseInt(formData.lowStockThreshold.toString()),
      };

      if (onSave) {
        await onSave(updatedProduct);
      }

      toast.success("Product updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update product"
      );
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
        className="max-w-[95vw] sm:max-w-4xl h-[95dvh] sm:h-[90vh] flex flex-col p-0 bg-white shadow-xl border rounded-xl mx-auto my-4"
      >
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-40 bg-white border-b px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <DialogTitle className="text-base font-semibold truncate">
              Edit Product
            </DialogTitle>
            <div className="flex items-center gap-2">
              {getPublicationStatusBadge(formData.status)}
            </div>
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
        </div>

        {/* Desktop Header */}
        <DialogHeader className="hidden lg:flex px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              Edit Product
            </DialogTitle>
            <div className="flex items-center gap-2">
              {getPublicationStatusBadge(formData.status)}
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                  disabled={saving}
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {/* Mobile Tabs - Sticky top tabs */}
          <div className="lg:hidden sticky top-[60px] z-30 bg-white border-b">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full justify-start h-auto p-0 bg-transparent overflow-x-auto">
                <TabsTrigger
                  value="basic"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 flex-shrink-0"
                >
                  Basic
                </TabsTrigger>
                <TabsTrigger
                  value="images"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 flex-shrink-0"
                >
                  Images
                </TabsTrigger>
                <TabsTrigger
                  value="inventory"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 flex-shrink-0"
                >
                  Inventory
                </TabsTrigger>
                <TabsTrigger
                  value="tags"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 flex-shrink-0"
                >
                  Tags
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Desktop Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="hidden lg:block h-full"
          >
            <div className="border-b px-6">
              <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="basic"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                >
                  Basic Info
                </TabsTrigger>
                <TabsTrigger
                  value="images"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                >
                  Images
                </TabsTrigger>
                <TabsTrigger
                  value="inventory"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                >
                  Inventory
                </TabsTrigger>
                <TabsTrigger
                  value="tags"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                >
                  Tags & Organization
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="h-[calc(90vh-180px)] bg-white">
              <div className="p-6">
                <TabsContent value="basic" className="space-y-6 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Product Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="edit-name"
                          className="text-sm font-medium"
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
                          className="text-sm font-medium"
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
                            className="text-sm font-medium"
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
                            className="text-sm font-medium"
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
                          className="text-sm font-medium"
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
                          rows={4}
                          className="text-sm resize-none"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="edit-status"
                          className="text-sm font-medium"
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
                            <SelectItem value="PUBLISHED">Published</SelectItem>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Images Tab */}
                <TabsContent value="images" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Product Images</CardTitle>
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

                {/* Inventory Tab */}
                <TabsContent value="inventory" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
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

                {/* Tags Tab */}
                <TabsContent value="tags" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
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
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>

          {/* Mobile Content - Same Tabs but scrollable */}
          <ScrollArea className="lg:hidden h-[calc(95dvh-150px)] bg-white">
            <div className="p-4">
              {activeTab === "basic" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Product Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="mobile-name"
                          className="text-sm font-medium"
                        >
                          Product Name *
                        </Label>
                        <Input
                          id="mobile-name"
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
                          htmlFor="mobile-category"
                          className="text-sm font-medium"
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

                      <div className="space-y-2">
                        <Label
                          htmlFor="mobile-mrp"
                          className="text-sm font-medium"
                        >
                          MRP (Maximum Retail Price)
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <Input
                            id="mobile-mrp"
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
                          htmlFor="mobile-price"
                          className="text-sm font-medium"
                        >
                          Selling Price *
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <Input
                            id="mobile-price"
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

                      <div className="space-y-2">
                        <Label
                          htmlFor="mobile-description"
                          className="text-sm font-medium"
                        >
                          Description *
                        </Label>
                        <Textarea
                          id="mobile-description"
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          placeholder="Describe your product in detail..."
                          rows={3}
                          className="text-sm resize-none min-h-[100px]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="mobile-status"
                          className="text-sm font-medium"
                        >
                          Publication Status
                        </Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value) =>
                            handleInputChange("status", value)
                          }
                        >
                          <SelectTrigger id="mobile-status" className="text-sm">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PUBLISHED">Published</SelectItem>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "images" && (
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
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
                </div>
              )}

              {activeTab === "inventory" && (
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
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
                </div>
              )}

              {activeTab === "tags" && (
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
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
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden sticky bottom-0 bg-white border-t p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={saving}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 gap-2 text-white"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">
                {formData.status === "PUBLISHED" ? (
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Visible to customers
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-3 w-3 text-amber-600" />
                    Draft mode
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Footer */}
        <div className="hidden lg:block border-t p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              {formData.status === "PUBLISHED" ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  This product is visible to customers
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-600" />
                  This product is in draft mode
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="gap-2 text-white"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
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
