"use client";

import {
  Edit,
  Eye,
  MoreVertical,
  Star,
  Package,
  DollarSign,
  CheckCircle,
  Clock,
  Trash2,
  Share2,
} from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ProductViewModal from "./ProductViewModal";
import ProductEditModal from "./ProductEditModal";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import ProductTableSkeleton from "./ProductTableSkeleton";

type DbProductStatus = "DRAFT" | "PUBLISHED";

export default function ProductTable({
  products,
  loading,
  page,
  limit,
  totalCount,
  onNextPage,
  onPrevPage,
  onProductUpdate,
  onDeleteMany,
  onDeleteOne,
}: {
  products: any[];
  loading: boolean;
  page: number;
  limit: number;
  totalCount: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onProductUpdate?: (productId: string, updates: any) => Promise<void>;
  onDeleteMany?: (ids: string[]) => Promise<void>;
  onDeleteOne?: (id: string) => Promise<void>;
}) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [viewingProduct, setViewingProduct] = useState<any>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const start = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalCount);
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = page < totalPages;

  type InventoryStatus =
    | "IN_STOCK"
    | "LOW_STOCK"
    | "OUT_OF_STOCK"
    | "NOT_TRACKED";

  function getInventoryStatus(
    trackInventory: boolean,
    stockQuantity: number,
    lowStockThreshold: number,
  ): InventoryStatus {
    if (!trackInventory) return "NOT_TRACKED";
    if (stockQuantity <= 0) return "OUT_OF_STOCK";
    if (stockQuantity <= lowStockThreshold) return "LOW_STOCK";
    return "IN_STOCK";
  }

  function getInventoryBadge(status: InventoryStatus) {
    const config = {
      IN_STOCK: {
        label: "In Stock",
        className: "bg-green-100 text-green-800",
      },
      LOW_STOCK: {
        label: "Low Stock",
        className: "bg-amber-100 text-amber-800",
      },
      OUT_OF_STOCK: {
        label: "Out of Stock",
        className: "bg-red-100 text-red-800",
      },
      NOT_TRACKED: {
        label: "Not Tracked",
        className: "bg-gray-100 text-gray-700",
      },
    };

    const item = config[status];

    return (
      <Badge
        variant="outline"
        className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.className}`}
      >
        {item.label}
      </Badge>
    );
  }

  const getPublicationStatusBadge = (status: "DRAFT" | "PUBLISHED") => {
    const isPublished = status === "PUBLISHED";

    return (
      <Badge
        variant="outline"
        className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
          isPublished
            ? "bg-blue-100 text-blue-800"
            : "bg-amber-100 text-amber-800"
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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const handleViewProduct = (product: any) => {
    setViewingProduct(product);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
  };

  const handleSaveProduct = async (updatedProduct: any) => {
    if (onProductUpdate) {
      await onProductUpdate(updatedProduct.id, updatedProduct);
    }
    setEditingProduct(null);
  };

  const LoadingIndicator = () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-5 w-5" />
              <div className="flex items-center space-x-3 flex-1">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-3 w-[150px]" />
                </div>
              </div>
              <Skeleton className="h-4 w-[60px]" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <Skeleton className="h-4 w-[150px]" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </CardFooter>
    </Card>
  );

  const EmptyState = () => (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">No products found</h3>
        <p className="mb-6 text-sm text-muted-foreground max-w-sm">
          Get started by adding your first product. It will appear here once
          created.
        </p>
        <Button asChild className="text-white">
          <Link href="/store/add-product">Add Product</Link>
        </Button>
      </CardContent>
    </Card>
  );

  // if (loading) {
  //   return <LoadingIndicator />;
  // }

  if (loading) {
    return <ProductTableSkeleton rows={6} />;
  }

  if (!loading && products.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <Card>
        {selectedProducts.length > 0 && (
          <div className="border-b p-3 sm:p-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="font-medium text-gray-700">
                  {selectedProducts.length} product(s) selected
                </span>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8 px-3 sm:px-4 text-xs sm:text-sm font-medium bg-red-600 shadow-sm text-white hover:shadow-md transition-all duration-200 hover:bg-red-700"
                  >
                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                    Delete {selectedProducts.length}{" "}
                    {selectedProducts.length === 1 ? "record" : "records"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white w-[92vw] max-w-sm sm:max-w-md rounded-xl p-4 sm:p-6 mx-auto shadow-lg">
                  <AlertDialogHeader className="space-y-2 text-center sm:text-left">
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      <AlertDialogTitle className="text-sm sm:text-base font-semibold">
                        Delete Products
                      </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="pt-2 text-xs sm:text-sm leading-relaxed">
                      <div className="space-y-3">
                        <p className="font-medium text-foreground">
                          Are you sure you want to delete{" "}
                          {selectedProducts.length}{" "}
                          {selectedProducts.length === 1
                            ? "product"
                            : "products"}
                          ?
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-2 sm:p-3">
                          <p className="text-xs sm:text-sm text-red-700 font-medium">
                            ⚠️ This action cannot be undone
                          </p>
                          <ul className="mt-1 space-y-0.5 text-xs sm:text-sm text-red-600">
                            <li>
                              • All selected product data will be permanently
                              deleted
                            </li>
                            <li>• Product images will be removed</li>
                            <li>
                              • Associated tags and inventory data will be
                              deleted
                            </li>
                          </ul>
                        </div>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <AlertDialogCancel
                      disabled={bulkDeleting}
                      className="h-9 text-xs sm:text-sm"
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        setBulkDeleting(true);

                        try {
                          await onDeleteMany?.(selectedProducts);
                          setSelectedProducts([]);
                        } finally {
                          setBulkDeleting(false);
                        }
                      }}
                      disabled={bulkDeleting}
                      className="h-9 text-xs sm:text-sm bg-red-600 hover:bg-red-700 text-white"
                    >
                      {bulkDeleting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete {selectedProducts.length}{" "}
                          {selectedProducts.length === 1
                            ? "product"
                            : "products"}
                        </>
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}

        <ScrollArea className="w-full">
          <div className="min-w-[900px] md:min-w-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={
                        products.length > 0 &&
                        products.every((p) => selectedProducts.includes(p.id))
                      }
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="min-w-[200px]">Product</TableHead>
                  <TableHead className="min-w-[120px]">Category</TableHead>
                  <TableHead className="min-w-[100px]">Price</TableHead>
                  <TableHead className="min-w-[100px]">Stock</TableHead>
                  <TableHead className="min-w-[120px]">Status</TableHead>
                  <TableHead className="min-w-[130px]">
                    Published/Draft
                  </TableHead>
                  <TableHead className="min-w-[100px]">Sales</TableHead>
                  <TableHead className="min-w-[100px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  const isDeletingRow = deletingIds.has(product.id);

                  return (
                    <TableRow
                      key={product.id}
                      className="group hover:bg-muted/50"
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={(checked) =>
                            handleSelectProduct(product.id, checked as boolean)
                          }
                          aria-label={`Select ${product.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            {product.images?.[0] ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            ) : (
                              <Package className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium text-sm">
                              {product.name}
                            </div>
                            <div className="truncate text-xs text-muted-foreground">
                              {product.sku ?? "No SKU"}
                            </div>
                            <div className="flex items-center mt-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="text-xs text-muted-foreground">
                                {product.rating ?? "No rating"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {product.category?.name ?? "—"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {Number(product.price).toFixed(2)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`font-medium ${
                            product.stockQuantity < 10
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {product.stockQuantity} units
                        </div>
                      </TableCell>
                      <TableCell>
                        {getInventoryBadge(
                          getInventoryStatus(
                            product.trackInventory,
                            product.stockQuantity,
                            product.lowStockThreshold,
                          ),
                        )}
                      </TableCell>

                      <TableCell>
                        {getPublicationStatusBadge(product.status)}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {product.sales ?? "0"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          total sales
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="cursor-pointer bg-white"
                              onClick={() => handleViewProduct(product)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer bg-white"
                              onClick={() => {}}
                            >
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer bg-white"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  className="cursor-pointer bg-white text-red-600 focus:text-red-600 focus:bg-red-50"
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-white w-[92vw] max-w-sm sm:max-w-md rounded-xl p-4 sm:p-6 mx-auto shadow-lg">
                                <AlertDialogHeader className="space-y-2 text-center sm:text-left">
                                  <div className="flex items-center gap-2 text-red-600">
                                    <AlertTriangle className="h-5 w-5" />
                                    <AlertDialogTitle className="text-sm sm:text-base font-semibold">
                                      Delete Product
                                    </AlertDialogTitle>
                                  </div>
                                  <AlertDialogDescription className="pt-2 text-xs sm:text-sm leading-relaxed">
                                    <div className="space-y-3">
                                      <p className="font-medium text-foreground">
                                        Are you sure you want to delete "
                                        {product.name}"?
                                      </p>
                                      <div className="bg-red-50 border border-red-200 rounded-lg p-2 sm:p-3">
                                        <p className="text-xs sm:text-sm text-red-700 font-medium">
                                          ⚠️ This action cannot be undone
                                        </p>
                                        <ul className="mt-1 space-y-0.5 text-xs sm:text-sm text-red-600">
                                          <li>
                                            • All product data will be
                                            permanently deleted
                                          </li>
                                          <li>
                                            • Product images will be removed
                                          </li>
                                          <li>
                                            • Associated tags and inventory data
                                            will be deleted
                                          </li>
                                          {product.status === "PUBLISHED" && (
                                            <li className="font-semibold">
                                              • Product will no longer be
                                              accessible to customers
                                            </li>
                                          )}
                                        </ul>
                                      </div>
                                      {product.sales > 0 && (
                                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                          <p className="text-sm text-amber-700 font-medium">
                                            📊 Sales Data Warning
                                          </p>
                                          <p className="text-sm text-amber-600 mt-1">
                                            This product has {product.sales}{" "}
                                            sales. Deleting it will remove all
                                            sales history.
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                                  <AlertDialogCancel
                                    disabled={bulkDeleting}
                                    className="h-9 text-xs sm:text-sm"
                                  >
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={async () => {
                                      setDeletingIds((prev) =>
                                        new Set(prev).add(product.id),
                                      );

                                      try {
                                        await onDeleteOne?.(product.id);
                                      } finally {
                                        setDeletingIds((prev) => {
                                          const next = new Set(prev);
                                          next.delete(product.id);
                                          return next;
                                        });
                                      }
                                    }}
                                    disabled={isDeletingRow}
                                    className="h-9 text-xs sm:text-sm bg-red-600 hover:bg-red-700 text-white"
                                  >
                                    {isDeletingRow ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Deleting...
                                      </>
                                    ) : (
                                      <>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete Product
                                      </>
                                    )}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t p-4 gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {start}–{end} of {totalCount} products
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    onPrevPage();
                  }}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {page}
                </PaginationLink>
              </PaginationItem>

              {hasNextPage && (
                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      onNextPage();
                    }}
                    className={
                      page >= totalPages ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>

      {viewingProduct && (
        <ProductViewModal
          product={viewingProduct}
          open={!!viewingProduct}
          onOpenChange={(open) => !open && setViewingProduct(null)}
          onEdit={(product) => setEditingProduct(product)}
        />
      )}

      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          open={!!editingProduct}
          onOpenChange={(open) => !open && setEditingProduct(null)}
          onSave={handleSaveProduct}
          onDelete={async (id) => {
            await onDeleteOne?.(id);
            setEditingProduct(null);
          }}
        />
      )}
    </>
  );
}
