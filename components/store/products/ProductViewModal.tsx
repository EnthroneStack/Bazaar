"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  Clock,
  CheckCircle,
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
  Hash,
  Calendar,
  TrendingUp,
  Users,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductViewModalProps {
  product: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

export default function ProductViewModal({
  product,
  open,
  onOpenChange,
  children,
}: ProductViewModalProps) {
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
        className={cn("font-medium", variants[finalStatus])}
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
      <DialogContent className="sm:max-w-5xl h-[90vh] flex flex-col p-0 bg-white shadow-xl border rounded-xl">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Product Details
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View Live
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4 bg-white">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Images Gallery */}
              <div className="lg:w-2/5 space-y-4">
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
              <div className="lg:w-3/5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-muted-foreground mt-1">
                      {product.sku || "No SKU"}
                    </p>
                  </div>
                  {getStatusBadge(product.status, product.stockQuantity)}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < (product.rating || 0)
                            ? "fill-yellow-500 text-yellow-500"
                            : "fill-gray-200 text-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating || "No"} rating
                  </span>
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Price</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      {product.mrp && product.mrp > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${Number(product.mrp).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Stock Status</span>
                    </div>
                    <div className={cn("p-2 rounded-lg", stockStatus.bg)}>
                      <p className={cn("font-medium", stockStatus.color)}>
                        {stockStatus.text}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {product.stockQuantity} units available
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium">Sales</span>
                    </div>
                    <p className="text-xl font-bold mt-1">
                      {product.sales || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium">Views</span>
                    </div>
                    <p className="text-xl font-bold mt-1">
                      {product.views || "—"}
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium">In Cart</span>
                    </div>
                    <p className="text-xl font-bold mt-1">
                      {product.inCart || "—"}
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium">Conversion</span>
                    </div>
                    <p className="text-xl font-bold mt-1">
                      {product.conversion || "—"}
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2">
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

            <Separator />

            {/* Tabs Content */}
            <div className="space-y-6">
              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Description
                </h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground whitespace-pre-line">
                    {product.description || "No description provided."}
                  </p>
                </div>
              </div>

              {/* Category & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    Category
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-2">
                      {product.category?.name || "—"}
                      <ChevronRight className="h-3 w-3" />
                      {product.subcategory || "—"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags?.length > 0 ? (
                      product.tags.map((tag: string, idx: number) => (
                        <Badge key={idx} variant="outline">
                          {tag}
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

              {/* Inventory Details */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Inventory Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Track Inventory
                    </p>
                    <p className="font-medium mt-1">
                      {product.trackInventory !== false ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Stock Quantity
                    </p>
                    <p className="font-medium mt-1">
                      {product.stockQuantity || 0} units
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Low Stock Threshold
                    </p>
                    <p className="font-medium mt-1">
                      {product.lowStockThreshold || 10} units
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Restock Date
                    </p>
                    <p className="font-medium mt-1">
                      {product.restockDate || "Not scheduled"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Product Metadata
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium mt-1">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Last Updated
                    </p>
                    <p className="font-medium mt-1">
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Product ID</p>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs font-mono bg-background px-2 py-1 rounded">
                        {product.id.slice(0, 8)}...
                      </code>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Store</p>
                    <p className="font-medium mt-1">
                      {product.store?.name || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Alerts & Notifications */}
              {(product.stockQuantity === 0 ||
                product.stockQuantity <= (product.lowStockThreshold || 10)) && (
                <div className={cn("p-4 rounded-lg", stockStatus.bg)}>
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      className={cn("h-5 w-5 mt-0.5", stockStatus.color)}
                    />
                    <div>
                      <h4 className="font-medium mb-1">
                        {product.stockQuantity === 0
                          ? "Out of Stock"
                          : "Low Stock Alert"}
                      </h4>
                      <p className="text-sm">
                        {product.stockQuantity === 0
                          ? "This product is currently out of stock. Consider restocking to continue sales."
                          : `Only ${product.stockQuantity} units remaining. Consider restocking soon.`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date(product.updatedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>

              <Button variant="default">
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
