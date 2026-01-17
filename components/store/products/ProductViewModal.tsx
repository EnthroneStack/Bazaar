// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   Package,
//   DollarSign,
//   Tag,
//   Layers,
//   BarChart3,
//   AlertCircle,
//   Star,
//   ShoppingBag,
//   Eye,
//   Edit,
//   ExternalLink,
//   Copy,
//   Share2,
//   ChevronRight,
//   Grid3x3,
//   Calendar,
//   TrendingUp,
//   Users,
//   Image as ImageIcon,
//   AlignLeft,
//   X,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface ProductViewModalProps {
//   product: any;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onEdit: (product: any) => void;
//   children?: React.ReactNode;
// }

// export default function ProductViewModal({
//   product,
//   open,
//   onOpenChange,
//   onEdit,
//   children,
// }: ProductViewModalProps) {
//   const getStatusBadge = (status: string, stockQuantity: number) => {
//     const normalized = status.toLowerCase() as "draft" | "published";
//     const finalStatus = stockQuantity <= 0 ? "out-of-stock" : normalized;

//     const variants = {
//       published: "bg-green-100 text-green-800 border-green-200",
//       draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
//       "out-of-stock": "bg-red-100 text-red-800 border-red-200",
//     };

//     const labels = {
//       published: "Published",
//       draft: "Draft",
//       "out-of-stock": "Out of Stock",
//     };

//     return (
//       <Badge
//         variant="outline"
//         className={cn("font-medium", variants[finalStatus])}
//       >
//         {labels[finalStatus]}
//       </Badge>
//     );
//   };

//   const getStockStatus = (quantity: number, threshold: number) => {
//     if (quantity === 0)
//       return { text: "Out of Stock", color: "text-red-600", bg: "bg-red-50" };
//     if (quantity <= threshold)
//       return {
//         text: "Low Stock",
//         color: "text-yellow-600",
//         bg: "bg-yellow-50",
//       };
//     return { text: "In Stock", color: "text-green-600", bg: "bg-green-50" };
//   };

//   const stockStatus = getStockStatus(
//     product.stockQuantity,
//     product.lowStockThreshold || 10
//   );

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogTrigger asChild>
//         {children || (
//           <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
//             <Eye className="h-4 w-4" />
//           </Button>
//         )}
//       </DialogTrigger>
//       <DialogContent
//         showCloseButton={false}
//         className="sm:max-w-5xl h-[90vh] flex flex-col overflow-hidden p-0 bg-white shadow-xl border rounded-xl"
//       >
//         <DialogHeader className="px-6 py-4 border-b">
//           <div className="flex items-center justify-between gap-4">
//             <DialogTitle className="flex items-center gap-2">
//               <Package className="h-5 w-5" />
//               Product Details
//             </DialogTitle>
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="gap-2"
//                 onClick={() => {
//                   onEdit(product);
//                   onOpenChange(false);
//                 }}
//               >
//                 <Edit className="h-4 w-4" />
//                 Edit
//               </Button>

//               <Button asChild size="sm" className="gap-2 text-white">
//                 <a
//                   href={`/store/${product.store?.slug}/${product.slug}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <ExternalLink className="h-4 w-4" />
//                   View Live
//                 </a>
//               </Button>

//               <DialogClose asChild>
//                 <Button variant="ghost" size="icon">
//                   <X className="h-4 w-4" />
//                 </Button>
//               </DialogClose>
//             </div>
//           </div>
//         </DialogHeader>

//         <ScrollArea className="flex-1 min-h-0 px-6 py-4 bg-white">
//           <div className="space-y-6">
//             <div className="flex flex-col lg:flex-row gap-6">
//               <div className="lg:w-2/5 space-y-4">
//                 <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
//                   {product.images?.[0] ? (
//                     <img
//                       src={product.images[0]}
//                       alt={product.name}
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-full items-center justify-center">
//                       <ImageIcon className="h-16 w-16 text-muted-foreground" />
//                     </div>
//                   )}
//                 </div>

//                 {product.images && product.images.length > 1 && (
//                   <div className="grid grid-cols-4 gap-2">
//                     {product.images
//                       .slice(0, 4)
//                       .map((img: string, idx: number) => (
//                         <div
//                           key={idx}
//                           className="aspect-square overflow-hidden rounded-lg bg-muted"
//                         >
//                           <img
//                             src={img}
//                             alt={`${product.name} ${idx + 1}`}
//                             className="h-full w-full object-cover"
//                           />
//                         </div>
//                       ))}
//                     {product.images.length > 4 && (
//                       <div className="flex aspect-square items-center justify-center rounded-lg bg-muted">
//                         <span className="text-sm font-medium">
//                           +{product.images.length - 4}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               <div className="lg:w-3/5 space-y-4">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h1 className="text-2xl font-bold">{product.name}</h1>
//                     <p className="text-muted-foreground mt-1">
//                       {product.sku || "No SKU"}
//                     </p>
//                   </div>
//                   {getStatusBadge(product.status, product.stockQuantity)}
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={cn(
//                           "h-4 w-4",
//                           i < (product.rating || 0)
//                             ? "fill-yellow-500 text-yellow-500"
//                             : "fill-gray-200 text-gray-200"
//                         )}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-sm text-muted-foreground">
//                     {product.rating || "No"} rating
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2">
//                       <DollarSign className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm font-medium">Price</span>
//                     </div>
//                     <div className="flex items-baseline gap-2">
//                       <span className="text-2xl font-bold">
//                         ${Number(product.price).toFixed(2)}
//                       </span>
//                       {product.mrp && product.mrp > product.price && (
//                         <span className="text-sm text-muted-foreground line-through">
//                           ${Number(product.mrp).toFixed(2)}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2">
//                       <Layers className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm font-medium">Stock Status</span>
//                     </div>
//                     <div className={cn("p-2 rounded-lg", stockStatus.bg)}>
//                       <p className={cn("font-medium", stockStatus.color)}>
//                         {stockStatus.text}
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         {product.stockQuantity} units available
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                   <div className="p-3 bg-muted rounded-lg">
//                     <div className="flex items-center gap-2">
//                       <ShoppingBag className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-xs font-medium">Sales</span>
//                     </div>
//                     <p className="text-xl font-bold mt-1">
//                       {product.sales || 0}
//                     </p>
//                   </div>
//                   <div className="p-3 bg-muted rounded-lg">
//                     <div className="flex items-center gap-2">
//                       <TrendingUp className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-xs font-medium">Views</span>
//                     </div>
//                     <p className="text-xl font-bold mt-1">
//                       {product.views || "—"}
//                     </p>
//                   </div>
//                   <div className="p-3 bg-muted rounded-lg">
//                     <div className="flex items-center gap-2">
//                       <Users className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-xs font-medium">In Cart</span>
//                     </div>
//                     <p className="text-xl font-bold mt-1">
//                       {product.inCart || "—"}
//                     </p>
//                   </div>
//                   <div className="p-3 bg-muted rounded-lg">
//                     <div className="flex items-center gap-2">
//                       <BarChart3 className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-xs font-medium">Conversion</span>
//                     </div>
//                     <p className="text-xl font-bold mt-1">
//                       {product.conversion || "—"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-2">
//                   <Button variant="outline" size="sm" className="gap-2">
//                     <Copy className="h-4 w-4" />
//                     Copy Link
//                   </Button>
//                   <Button variant="outline" size="sm" className="gap-2">
//                     <Share2 className="h-4 w-4" />
//                     Share
//                   </Button>
//                   <Button variant="outline" size="sm" className="gap-2">
//                     <Grid3x3 className="h-4 w-4" />
//                     Analytics
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             <Separator />

//             <div className="space-y-6">
//               <div className="space-y-3">
//                 <h3 className="text-lg font-semibold flex items-center gap-2">
//                   <AlignLeft className="h-5 w-5" />
//                   Description
//                 </h3>

//                 <div className="prose prose-sm max-w-none">
//                   <p className="text-muted-foreground whitespace-pre-line">
//                     {product.description || "No description provided."}
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-3">
//                   <h3 className="text-lg font-semibold flex items-center gap-2">
//                     <Layers className="h-5 w-5" />
//                     Category
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     <Badge variant="secondary" className="gap-2">
//                       {product.category?.name || "_"}
//                       {product.subcategory && (
//                         <>
//                           <ChevronRight className="h-3 w-3" />
//                           {product.subcategory}
//                         </>
//                       )}
//                     </Badge>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <h3 className="text-lg font-semibold flex items-center gap-2">
//                     <Tag className="h-5 w-5" />
//                     Tags
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {product.tags?.length > 0 ? (
//                       product.tags.map((t: any, idx: number) => (
//                         <Badge key={idx} variant="outline">
//                           {t.tag.name}
//                         </Badge>
//                       ))
//                     ) : (
//                       <span className="text-sm text-muted-foreground">
//                         No tags
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <h3 className="text-lg font-semibold flex items-center gap-2">
//                   <Package className="h-5 w-5" />
//                   Inventory Details
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                   <div className="p-4 bg-muted rounded-lg">
//                     <p className="text-sm text-muted-foreground">
//                       Track Inventory
//                     </p>
//                     <p className="font-medium mt-1">
//                       {product.trackInventory !== false ? "Yes" : "No"}
//                     </p>
//                   </div>
//                   <div className="p-4 bg-muted rounded-lg">
//                     <p className="text-sm text-muted-foreground">
//                       Stock Quantity
//                     </p>
//                     <p className="font-medium mt-1">
//                       {product.stockQuantity || 0} units
//                     </p>
//                   </div>
//                   <div className="p-4 bg-muted rounded-lg">
//                     <p className="text-sm text-muted-foreground">
//                       Low Stock Threshold
//                     </p>
//                     <p className="font-medium mt-1">
//                       {product.lowStockThreshold || 10} units
//                     </p>
//                   </div>
//                   <div className="p-4 bg-muted rounded-lg">
//                     <p className="text-sm text-muted-foreground">
//                       Restock Date
//                     </p>
//                     <p className="font-medium mt-1">
//                       {product.restockDate || "Not scheduled"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <h3 className="text-lg font-semibold flex items-center gap-2">
//                   <Calendar className="h-5 w-5" />
//                   Product Metadata
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="p-4 bg-muted rounded-lg">
//                     <p className="text-sm text-muted-foreground">Created</p>
//                     <p className="font-medium mt-1">
//                       {new Date(product.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="p-4 bg-muted rounded-lg">
//                     <p className="text-sm text-muted-foreground">
//                       Last Updated
//                     </p>
//                     <p className="font-medium mt-1">
//                       {product.updatedAt
//                         ? new Date(product.updatedAt).toLocaleDateString()
//                         : "—"}
//                     </p>
//                   </div>
//                   <div className="p-4 bg-muted rounded-lg">
//                     <p className="text-sm text-muted-foreground">Product ID</p>
//                     <div className="flex items-center gap-2 mt-1">
//                       <code className="text-xs font-mono bg-background px-2 py-1 rounded">
//                         {product.id.slice(0, 8)}...
//                       </code>
//                       <Button variant="ghost" size="sm" className="h-6 px-2">
//                         <Copy className="h-3 w-3" />
//                       </Button>
//                     </div>
//                   </div>
//                   <div className="p-4 bg-muted rounded-lg">
//                     <p className="text-sm text-muted-foreground">Store</p>
//                     <p className="font-medium mt-1">
//                       {product.store?.name || "—"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {(product.stockQuantity === 0 ||
//                 product.stockQuantity <= (product.lowStockThreshold || 10)) && (
//                 <div className={cn("p-4 rounded-lg", stockStatus.bg)}>
//                   <div className="flex items-start gap-3">
//                     <AlertCircle
//                       className={cn("h-5 w-5 mt-0.5", stockStatus.color)}
//                     />
//                     <div>
//                       <h4 className="font-medium mb-1">
//                         {product.stockQuantity === 0
//                           ? "Out of Stock"
//                           : "Low Stock Alert"}
//                       </h4>
//                       <p className="text-sm">
//                         {product.stockQuantity === 0
//                           ? "This product is currently out of stock. Consider restocking to continue sales."
//                           : `Only ${product.stockQuantity} units remaining. Consider restocking soon.`}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </ScrollArea>

//         <div className="border-t p-4">
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div className="text-sm text-muted-foreground">
//               Last updated:{" "}
//               {product.updatedAt
//                 ? new Date(product.updatedAt).toLocaleDateString()
//                 : "—"}
//             </div>
//             <div className="flex items-center gap-2">
//               <Button variant="outline" onClick={() => onOpenChange(false)}>
//                 Close
//               </Button>

//               <Button
//                 variant="default"
//                 className="text-white"
//                 onClick={() => {
//                   onEdit(product);
//                   onOpenChange(false);
//                 }}
//               >
//                 <Edit className="mr-2 h-4 w-4" />
//                 Edit Product
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
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  DollarSign,
  Tag,
  Layers,
  BarChart3,
  AlertCircle,
  Star,
  ShoppingBag,
  Eye,
  Edit,
  ExternalLink,
  Copy,
  Share2,
  ChevronRight,
  Grid3x3,
  Calendar,
  TrendingUp,
  Users,
  Image as ImageIcon,
  AlignLeft,
  X,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductViewModalProps {
  product: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (product: any) => void;
  children?: React.ReactNode;
}

export default function ProductViewModal({
  product,
  open,
  onOpenChange,
  onEdit,
  children,
}: ProductViewModalProps) {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    description: true,
    categoryTags: false,
    inventory: false,
    metadata: false,
    alerts: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getStatusBadge = (status: string, stockQuantity: number) => {
    const normalized = status.toLowerCase() as "draft" | "published";
    const finalStatus = stockQuantity <= 0 ? "out-of-stock" : normalized;

    const variants = {
      published: "bg-green-100 text-green-800 border-green-200",
      draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
      "out-of-stock": "bg-red-100 text-red-800 border-red-200",
    };

    const labels = {
      published: "Published",
      draft: "Draft",
      "out-of-stock": "Out of Stock",
    };

    return (
      <Badge
        variant="outline"
        className={cn(
          "font-medium px-2 py-0.5 text-xs sm:text-sm",
          variants[finalStatus]
        )}
      >
        {labels[finalStatus]}
      </Badge>
    );
  };

  const getStockStatus = (quantity: number, threshold: number) => {
    if (quantity === 0)
      return { text: "Out of Stock", color: "text-red-600", bg: "bg-red-50" };
    if (quantity <= threshold)
      return {
        text: "Low Stock",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
      };
    return { text: "In Stock", color: "text-green-600", bg: "bg-green-50" };
  };

  const stockStatus = getStockStatus(
    product.stockQuantity,
    product.lowStockThreshold || 10
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[95vw] sm:max-w-5xl h-[95dvh] sm:h-[90vh] flex flex-col overflow-hidden p-0 bg-white shadow-xl border rounded-xl mx-auto my-4"
      >
        {/* Mobile Header with Back Button */}
        <div className="lg:hidden sticky top-0 z-50 bg-white border-b px-4 py-3 flex items-center gap-3">
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
              {product.name}
            </DialogTitle>
            <p className="text-xs text-muted-foreground truncate">
              {product.sku || "No SKU"}
            </p>
          </div>
          {getStatusBadge(product.status, product.stockQuantity)}
        </div>

        {/* Desktop Header */}
        <DialogHeader className="hidden lg:flex px-6 py-4 border-b">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Product Details
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  onEdit(product);
                  onOpenChange(false);
                }}
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>

              <Button asChild size="sm" className="gap-2 text-white">
                <a
                  href={`/store/${product.store?.slug}/${product.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Live
                </a>
              </Button>

              <DialogClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 min-h-0">
          <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            {/* Product Images - Mobile Full Width */}
            <div className="lg:hidden space-y-3">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              {product.images && product.images.length > 1 && (
                <ScrollArea className="w-full pb-2">
                  <div className="flex gap-2 min-w-max">
                    {product.images.map((img: string, idx: number) => (
                      <div
                        key={idx}
                        className="aspect-square w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted"
                      >
                        <img
                          src={img}
                          alt={`${product.name} ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              {/* Images Sidebar - Desktop */}
              <div className="hidden lg:block lg:w-2/5 space-y-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImageIcon className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images
                      .slice(0, 4)
                      .map((img: string, idx: number) => (
                        <div
                          key={idx}
                          className="aspect-square overflow-hidden rounded-lg bg-muted"
                        >
                          <img
                            src={img}
                            alt={`${product.name} ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    {product.images.length > 4 && (
                      <div className="flex aspect-square items-center justify-center rounded-lg bg-muted">
                        <span className="text-sm font-medium">
                          +{product.images.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="lg:w-3/5 space-y-4 sm:space-y-6">
                {/* Title & Status - Desktop */}
                <div className="hidden lg:flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-muted-foreground mt-1">
                      {product.sku || "No SKU"}
                    </p>
                  </div>
                  {getStatusBadge(product.status, product.stockQuantity)}
                </div>

                {/* Mobile Action Buttons */}
                <div className="lg:hidden flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => {
                      onEdit(product);
                      onOpenChange(false);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button asChild size="sm" className="flex-1 gap-2 text-white">
                    <a
                      href={`/store/${product.store?.slug}/${product.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Live
                    </a>
                  </Button>
                </div>

                {/* Rating - Mobile */}
                <div className="lg:hidden flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3 w-3",
                          i < (product.rating || 0)
                            ? "fill-yellow-500 text-yellow-500"
                            : "fill-gray-200 text-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.rating || "No"} rating
                  </span>
                </div>

                {/* Price & Stock Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Price</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-bold">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      {product.mrp && product.mrp > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${Number(product.mrp).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Stock</span>
                    </div>
                    <div className={cn("p-2 rounded", stockStatus.bg)}>
                      <p
                        className={cn("font-medium text-sm", stockStatus.color)}
                      >
                        {stockStatus.text}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.stockQuantity} units
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <ShoppingBag className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs font-medium">Sales</span>
                    </div>
                    <p className="text-lg sm:text-xl font-bold">
                      {product.sales || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs font-medium">Views</span>
                    </div>
                    <p className="text-lg sm:text-xl font-bold">
                      {product.views || "—"}
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs font-medium">In Cart</span>
                    </div>
                    <p className="text-lg sm:text-xl font-bold">
                      {product.inCart || "—"}
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <BarChart3 className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs font-medium">Conversion</span>
                    </div>
                    <p className="text-lg sm:text-xl font-bold">
                      {product.conversion || "—"}
                    </p>
                  </div>
                </div>

                {/* Quick Actions - Mobile Scrollable */}
                <ScrollArea className="lg:hidden w-full pb-2">
                  <div className="flex gap-2 min-w-max">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 flex-shrink-0"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Link
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 flex-shrink-0"
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 flex-shrink-0"
                    >
                      <Grid3x3 className="h-4 w-4" />
                      Analytics
                    </Button>
                  </div>
                </ScrollArea>

                {/* Quick Actions - Desktop */}
                <div className="hidden lg:flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Copy className="h-4 w-4" />
                    Copy Link
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Grid3x3 className="h-4 w-4" />
                    Analytics
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="my-4 sm:my-6" />

            {/* Collapsible Sections for Mobile */}
            <div className="space-y-4 sm:space-y-6">
              {/* Description - Mobile Collapsible */}
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection("description")}
                  className="lg:hidden w-full flex items-center justify-between"
                >
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    <AlignLeft className="h-4 w-4" />
                    Description
                  </h3>
                  {expandedSections.description ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                <h3 className="hidden lg:flex text-lg font-semibold items-center gap-2">
                  <AlignLeft className="h-5 w-5" />
                  Description
                </h3>

                <div
                  className={cn(
                    "lg:block",
                    expandedSections.description ? "block" : "hidden"
                  )}
                >
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line text-sm sm:text-base">
                      {product.description || "No description provided."}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Category & Tags - Mobile Collapsible */}
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection("categoryTags")}
                  className="lg:hidden w-full flex items-center justify-between"
                >
                  <h3 className="text-base font-semibold">Category & Tags</h3>
                  {expandedSections.categoryTags ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                <div
                  className={cn(
                    "lg:block",
                    expandedSections.categoryTags ? "block" : "hidden"
                  )}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-3">
                      <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                        <Layers className="h-4 w-4" />
                        Category
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="secondary"
                          className="gap-2 text-xs sm:text-sm"
                        >
                          {product.category?.name || "_"}
                          {product.subcategory && (
                            <>
                              <ChevronRight className="h-3 w-3" />
                              {product.subcategory}
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.tags?.length > 0 ? (
                          product.tags.map((t: any, idx: number) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs sm:text-sm"
                            >
                              {t.tag.name}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            No tags
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Inventory Details - Mobile Collapsible */}
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection("inventory")}
                  className="lg:hidden w-full flex items-center justify-between"
                >
                  <h3 className="text-base font-semibold">Inventory Details</h3>
                  {expandedSections.inventory ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                <h3 className="hidden lg:flex text-lg font-semibold items-center gap-2">
                  <Package className="h-5 w-5" />
                  Inventory Details
                </h3>

                <div
                  className={cn(
                    "lg:block",
                    expandedSections.inventory ? "block" : "hidden"
                  )}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Track Inventory
                      </p>
                      <p className="font-medium mt-1 text-sm">
                        {product.trackInventory !== false ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Stock Quantity
                      </p>
                      <p className="font-medium mt-1 text-sm">
                        {product.stockQuantity || 0} units
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Low Stock Threshold
                      </p>
                      <p className="font-medium mt-1 text-sm">
                        {product.lowStockThreshold || 10} units
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Restock Date
                      </p>
                      <p className="font-medium mt-1 text-sm">
                        {product.restockDate || "Not scheduled"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Metadata - Mobile Collapsible */}
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection("metadata")}
                  className="lg:hidden w-full flex items-center justify-between"
                >
                  <h3 className="text-base font-semibold">Product Metadata</h3>
                  {expandedSections.metadata ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                <h3 className="hidden lg:flex text-lg font-semibold items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Product Metadata
                </h3>

                <div
                  className={cn(
                    "lg:block",
                    expandedSections.metadata ? "block" : "hidden"
                  )}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Created</p>
                      <p className="font-medium mt-1 text-sm">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Last Updated
                      </p>
                      <p className="font-medium mt-1 text-sm">
                        {product.updatedAt
                          ? new Date(product.updatedAt).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Product ID
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-xs font-mono bg-background px-2 py-1 rounded truncate max-w-[120px]">
                          {product.id.slice(0, 8)}...
                        </code>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Store</p>
                      <p className="font-medium mt-1 text-sm truncate">
                        {product.store?.name || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts - Mobile Collapsible */}
              {(product.stockQuantity === 0 ||
                product.stockQuantity <= (product.lowStockThreshold || 10)) && (
                <div className="space-y-3">
                  <button
                    onClick={() => toggleSection("alerts")}
                    className="lg:hidden w-full flex items-center justify-between"
                  >
                    <h3 className="text-base font-semibold">Stock Alert</h3>
                    {expandedSections.alerts ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>

                  <div
                    className={cn(
                      "lg:block",
                      expandedSections.alerts ? "block" : "hidden"
                    )}
                  >
                    <div
                      className={cn("p-3 sm:p-4 rounded-lg", stockStatus.bg)}
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle
                          className={cn(
                            "h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0",
                            stockStatus.color
                          )}
                        />
                        <div>
                          <h4 className="font-medium text-sm sm:text-base mb-1">
                            {product.stockQuantity === 0
                              ? "Out of Stock"
                              : "Low Stock Alert"}
                          </h4>
                          <p className="text-xs sm:text-sm">
                            {product.stockQuantity === 0
                              ? "This product is currently out of stock. Consider restocking to continue sales."
                              : `Only ${product.stockQuantity} units remaining. Consider restocking soon.`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        {/* Mobile Bottom Actions */}
        <div className="lg:hidden sticky bottom-0 bg-white border-t p-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              variant="default"
              className="flex-1 gap-2 text-white"
              onClick={() => {
                onEdit(product);
                onOpenChange(false);
              }}
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>

        {/* Desktop Footer */}
        <div className="hidden lg:block border-t p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Last updated:{" "}
              {product.updatedAt
                ? new Date(product.updatedAt).toLocaleDateString()
                : "—"}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button
                variant="default"
                className="text-white"
                onClick={() => {
                  onEdit(product);
                  onOpenChange(false);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Product
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
