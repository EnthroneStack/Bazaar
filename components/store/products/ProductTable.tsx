// "use client";

// import {
//   Edit,
//   Eye,
//   MoreVertical,
//   Star,
//   Package,
//   DollarSign,
//   CheckCircle,
//   Clock,
// } from "lucide-react";
// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import ProductViewModal from "./ProductViewModal";
// import ProductEditModal from "./ProductEditModal";

// type DbProductStatus = "DRAFT" | "PUBLISHED";

// export default function ProductTable({
//   products,
//   loading,
//   onProductUpdate,
// }: {
//   products: any[];
//   loading: boolean;
//   onProductUpdate?: (productId: string, updates: any) => Promise<void>;
// }) {
//   const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewingProduct, setViewingProduct] = useState<any>(null);
//   const [editingProduct, setEditingProduct] = useState<any>(null);
//   const itemsPerPage = 6;

//   function normalizeStatus(status: DbProductStatus) {
//     return status.toLowerCase() as "draft" | "published";
//   }

//   const getStatusBadge = (
//     status: "DRAFT" | "PUBLISHED",
//     stockQuantity: number
//   ) => {
//     const normalized = normalizeStatus(status);

//     const finalStatus = stockQuantity <= 0 ? "out-of-stock" : normalized;

//     const variants = {
//       published: "bg-green-100 text-green-800",
//       draft: "bg-yellow-100 text-yellow-800",
//       "out-of-stock": "bg-red-100 text-red-800",
//     };

//     const labels = {
//       published: "Published",
//       draft: "Draft",
//       "out-of-stock": "Out of Stock",
//     };

//     return (
//       <Badge
//         variant="outline"
//         className={`text-xs font-medium px-2 py-0.5 rounded-full ${variants[finalStatus]}`}
//       >
//         {labels[finalStatus]}
//       </Badge>
//     );
//   };

//   const getPublicationStatusBadge = (status: "DRAFT" | "PUBLISHED") => {
//     const isPublished = status === "PUBLISHED";

//     return (
//       <Badge
//         variant="outline"
//         className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
//           isPublished
//             ? "bg-blue-100 text-blue-800"
//             : "bg-amber-100 text-amber-800"
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

//   const handleSelectAll = (checked: boolean) => {
//     if (checked) {
//       setSelectedProducts(products.map((p) => p.id));
//     } else {
//       setSelectedProducts([]);
//     }
//   };

//   const handleSelectProduct = (productId: string, checked: boolean) => {
//     if (checked) {
//       setSelectedProducts([...selectedProducts, productId]);
//     } else {
//       setSelectedProducts(selectedProducts.filter((id) => id !== productId));
//     }
//   };

//   const handleViewProduct = (product: any) => {
//     setViewingProduct(product);
//   };

//   const handleEditProduct = (product: any) => {
//     setEditingProduct(product);
//   };

//   const handleSaveProduct = async (updatedProduct: any) => {
//     if (onProductUpdate) {
//       await onProductUpdate(updatedProduct.id, updatedProduct);
//     }
//     setEditingProduct(null);
//   };

//   const LoadingIndicator = () => (
//     <Card>
//       <CardContent className="p-6">
//         <div className="space-y-4">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="flex items-center space-x-4">
//               <Skeleton className="h-5 w-5" />
//               <div className="flex items-center space-x-3 flex-1">
//                 <Skeleton className="h-10 w-10 rounded-lg" />
//                 <div className="space-y-2 flex-1">
//                   <Skeleton className="h-4 w-[200px]" />
//                   <Skeleton className="h-3 w-[150px]" />
//                 </div>
//               </div>
//               <Skeleton className="h-4 w-[60px]" />
//             </div>
//           ))}
//         </div>
//       </CardContent>
//       <CardFooter className="flex justify-between border-t p-4">
//         <Skeleton className="h-4 w-[150px]" />
//         <div className="flex items-center space-x-2">
//           <Skeleton className="h-8 w-8" />
//           <Skeleton className="h-8 w-8" />
//           <Skeleton className="h-8 w-8" />
//           <Skeleton className="h-8 w-8" />
//         </div>
//       </CardFooter>
//     </Card>
//   );

//   const EmptyState = () => (
//     <Card>
//       <CardContent className="flex flex-col items-center justify-center p-12 text-center">
//         <div className="mb-4 rounded-full bg-muted p-4">
//           <Package className="h-8 w-8 text-muted-foreground" />
//         </div>
//         <h3 className="mb-2 text-lg font-semibold">No products found</h3>
//         <p className="mb-6 text-sm text-muted-foreground max-w-sm">
//           Get started by adding your first product. It will appear here once
//           created.
//         </p>
//         <Button>Add Product</Button>
//       </CardContent>
//     </Card>
//   );

//   if (loading) {
//     return <LoadingIndicator />;
//   }

//   if (!loading && products.length === 0) {
//     return <EmptyState />;
//   }

//   return (
//     <>
//       <Card>
//         <ScrollArea className="w-full">
//           <div className="min-w-[900px] md:min-w-0">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="w-[50px]">
//                     <Checkbox
//                       checked={selectedProducts.length === products.length}
//                       onCheckedChange={handleSelectAll}
//                       aria-label="Select all"
//                     />
//                   </TableHead>
//                   <TableHead className="min-w-[200px]">Product</TableHead>
//                   <TableHead className="min-w-[120px]">Category</TableHead>
//                   <TableHead className="min-w-[100px]">Price</TableHead>
//                   <TableHead className="min-w-[100px]">Stock</TableHead>
//                   <TableHead className="min-w-[120px]">Status</TableHead>
//                   <TableHead className="min-w-[130px]">
//                     Published/Draft
//                   </TableHead>
//                   <TableHead className="min-w-[100px]">Sales</TableHead>
//                   <TableHead className="min-w-[100px] text-right">
//                     Actions
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {products.map((product) => (
//                   <TableRow
//                     key={product.id}
//                     className="group hover:bg-muted/50"
//                   >
//                     <TableCell>
//                       <Checkbox
//                         checked={selectedProducts.includes(product.id)}
//                         onCheckedChange={(checked) =>
//                           handleSelectProduct(product.id, checked as boolean)
//                         }
//                         aria-label={`Select ${product.name}`}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center space-x-3">
//                         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
//                           {product.images?.[0] ? (
//                             <img
//                               src={product.images[0]}
//                               alt={product.name}
//                               className="h-10 w-10 rounded-lg object-cover"
//                             />
//                           ) : (
//                             <Package className="h-5 w-5 text-muted-foreground" />
//                           )}
//                         </div>
//                         <div className="min-w-0 flex-1">
//                           <div className="truncate font-medium text-sm">
//                             {product.name}
//                           </div>
//                           <div className="truncate text-xs text-muted-foreground">
//                             {product.sku ?? "No SKU"}
//                           </div>
//                           <div className="flex items-center mt-1">
//                             <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
//                             <span className="text-xs text-muted-foreground">
//                               {product.rating ?? "No rating"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant="outline" className="text-xs">
//                         {product.category?.name ?? "—"}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center">
//                         <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
//                         <span className="font-medium">
//                           {Number(product.price).toFixed(2)}
//                         </span>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div
//                         className={`font-medium ${
//                           product.stockQuantity < 10
//                             ? "text-yellow-600"
//                             : "text-green-600"
//                         }`}
//                       >
//                         {product.stockQuantity} units
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       {getStatusBadge(product.status, product.stockQuantity)}
//                     </TableCell>
//                     <TableCell>
//                       {getPublicationStatusBadge(product.status)}
//                     </TableCell>
//                     <TableCell>
//                       <div className="font-medium">{product.sales ?? "0"}</div>
//                       <div className="text-xs text-muted-foreground">
//                         total sales
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             className="h-8 w-8 p-0"
//                           >
//                             <MoreVertical className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem
//                             className="cursor-pointer bg-white"
//                             onClick={() => handleViewProduct(product)}
//                           >
//                             <Eye className="mr-2 h-4 w-4" />
//                             View
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             className="cursor-pointer bg-white"
//                             onClick={() => handleEditProduct(product)}
//                           >
//                             <Edit className="mr-2 h-4 w-4" />
//                             Edit
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//           <ScrollBar orientation="horizontal" />
//         </ScrollArea>

//         <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t p-4 gap-4">
//           <div className="text-sm text-muted-foreground">
//             Showing {products.length} of 156 products
//           </div>
//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setCurrentPage(Math.max(1, currentPage - 1));
//                   }}
//                   className={
//                     currentPage === 1 ? "pointer-events-none opacity-50" : ""
//                   }
//                 />
//               </PaginationItem>
//               <PaginationItem>
//                 <PaginationLink
//                   href="#"
//                   isActive={currentPage === 1}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setCurrentPage(1);
//                   }}
//                 >
//                   1
//                 </PaginationLink>
//               </PaginationItem>
//               <PaginationItem>
//                 <PaginationLink
//                   href="#"
//                   isActive={currentPage === 2}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setCurrentPage(2);
//                   }}
//                 >
//                   2
//                 </PaginationLink>
//               </PaginationItem>
//               <PaginationItem>
//                 <PaginationNext
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setCurrentPage(currentPage + 1);
//                   }}
//                   className={
//                     currentPage >= Math.ceil(156 / itemsPerPage)
//                       ? "pointer-events-none opacity-50"
//                       : ""
//                   }
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         </CardFooter>
//       </Card>

//       {viewingProduct && (
//         <ProductViewModal
//           product={viewingProduct}
//           open={!!viewingProduct}
//           onOpenChange={(open) => !open && setViewingProduct(null)}
//           onEdit={(product) => setEditingProduct(product)}
//         />
//       )}

//       {editingProduct && (
//         <ProductEditModal
//           product={editingProduct}
//           open={!!editingProduct}
//           onOpenChange={(open) => !open && setEditingProduct(null)}
//           onSave={handleSaveProduct}
//         />
//       )}
//     </>
//   );
// }

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
  Trash2, // 👈 ADDED: Import Trash icon
  AlertTriangle, // 👈 ADDED: Import Alert icon
  X, // 👈 ADDED: Import X icon for clearing selection
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
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// 👇 ADDED: Import Alert Dialog for delete confirmation
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import ProductViewModal from "./ProductViewModal";
import ProductEditModal from "./ProductEditModal";

type DbProductStatus = "DRAFT" | "PUBLISHED";

export default function ProductTable({
  products,
  loading,
  onProductUpdate,
  onProductDelete, // 👈 ADDED: Delete callback prop
  onProductsDelete, // 👈 ADDED: Multiple delete callback prop
}: {
  products: any[];
  loading: boolean;
  onProductUpdate?: (productId: string, updates: any) => Promise<void>;
  onProductDelete?: (productId: string) => Promise<void>; // 👈 ADDED
  onProductsDelete?: (productIds: string[]) => Promise<void>; // 👈 ADDED
}) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingProduct, setViewingProduct] = useState<any>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [deleting, setDeleting] = useState(false); // 👈 ADDED: Delete loading state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // 👈 ADDED: Delete dialog state
  const itemsPerPage = 6;

  function normalizeStatus(status: DbProductStatus) {
    return status.toLowerCase() as "draft" | "published";
  }

  const getStatusBadge = (
    status: "DRAFT" | "PUBLISHED",
    stockQuantity: number,
  ) => {
    const normalized = normalizeStatus(status);

    const finalStatus = stockQuantity <= 0 ? "out-of-stock" : normalized;

    const variants = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      "out-of-stock": "bg-red-100 text-red-800",
    };

    const labels = {
      published: "Published",
      draft: "Draft",
      "out-of-stock": "Out of Stock",
    };

    return (
      <Badge
        variant="outline"
        className={`text-xs font-medium px-2 py-0.5 rounded-full ${variants[finalStatus]}`}
      >
        {labels[finalStatus]}
      </Badge>
    );
  };

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

  // 👇 ADDED: Clear all selected products
  const handleClearSelection = () => {
    setSelectedProducts([]);
  };

  // 👇 ADDED: Handle multiple product deletion
  const handleDeleteMultiple = async () => {
    if (!onProductsDelete) {
      console.error("onProductsDelete callback not implemented");
      return;
    }

    if (selectedProducts.length === 0) return;

    setDeleting(true);
    try {
      await onProductsDelete(selectedProducts);
      toast.success(`${selectedProducts.length} products deleted successfully`);
      setSelectedProducts([]);
      setShowDeleteDialog(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete products");
    } finally {
      setDeleting(false);
    }
  };

  // 👇 ADDED: Handle single product deletion from dropdown
  const handleDeleteSingle = async (productId: string) => {
    if (!onProductDelete) {
      console.error("onProductDelete callback not implemented");
      return;
    }

    setDeleting(true);
    try {
      await onProductDelete(productId);
      toast.success("Product deleted successfully");
      // Remove from selected if it was selected
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    } catch (err: any) {
      toast.error(err.message || "Failed to delete product");
    } finally {
      setDeleting(false);
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

  // 👇 ADDED: Toast import and initialization
  const toast = {
    success: (message: string) => console.log(`Success: ${message}`),
    error: (message: string) => console.error(`Error: ${message}`),
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
        <Button>Add Product</Button>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!loading && products.length === 0) {
    return <EmptyState />;
  }

  // 👇 ADDED: Get selected products data
  const selectedProductsData = products.filter((p) =>
    selectedProducts.includes(p.id),
  );
  const publishedCount = selectedProductsData.filter(
    (p) => p.status === "PUBLISHED",
  ).length;
  const draftCount = selectedProductsData.filter(
    (p) => p.status === "DRAFT",
  ).length;

  return (
    <>
      {/* 👇 ADDED: Multiple Delete Selection Bar */}
      {selectedProducts.length > 0 && (
        <div className="sticky top-0 z-40 mb-4 animate-in slide-in-from-top duration-200">
          <Card className="border-primary/20 bg-gradient-to-r from-white to-primary/5 shadow-md">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm px-2 py-1"
                    >
                      {selectedProducts.length} selected
                    </Badge>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="truncate">
                        {publishedCount > 0 && draftCount > 0
                          ? `${publishedCount} published, ${draftCount} draft`
                          : publishedCount > 0
                            ? `${publishedCount} published products`
                            : `${draftCount} draft products`}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {selectedProducts.length === 1
                        ? "1 product selected for deletion"
                        : `${selectedProducts.length} products selected for deletion`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {/* 👇 ADDED: Clear Selection Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearSelection}
                    className="flex-1 sm:flex-none text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Clear</span>
                  </Button>

                  {/* 👇 ADDED: Delete Selected Products Button */}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={deleting}
                    className="flex-1 sm:flex-none gap-1 sm:gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="text-xs sm:text-sm">
                      Delete {selectedProducts.length}
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <ScrollArea className="w-full">
          <div className="min-w-[900px] md:min-w-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={
                        selectedProducts.length === products.length &&
                        products.length > 0
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
                {products.map((product) => (
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
                      {getStatusBadge(product.status, product.stockQuantity)}
                    </TableCell>
                    <TableCell>
                      {getPublicationStatusBadge(product.status)}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{product.sales ?? "0"}</div>
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
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>

                          {/* 👇 ADDED: Delete option in dropdown */}
                          {onProductDelete && (
                            <DropdownMenuItem
                              className="cursor-pointer bg-white text-red-600 focus:text-red-700 focus:bg-red-50"
                              onClick={() => {
                                if (
                                  confirm(
                                    `Are you sure you want to delete "${product.name}"?`,
                                  )
                                ) {
                                  handleDeleteSingle(product.id);
                                }
                              }}
                              disabled={deleting}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t p-4 gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {products.length} of 156 products
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(Math.max(1, currentPage - 1));
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={currentPage === 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(1);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={currentPage === 2}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(2);
                  }}
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(currentPage + 1);
                  }}
                  className={
                    currentPage >= Math.ceil(156 / itemsPerPage)
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>

      {/* 👇 ADDED: Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-[95vw] sm:max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <AlertDialogTitle>
                Delete {selectedProducts.length} Product
                {selectedProducts.length > 1 ? "s" : ""}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="pt-4">
              <div className="space-y-3">
                <p className="font-medium text-foreground">
                  Are you sure you want to delete {selectedProducts.length}{" "}
                  selected product{selectedProducts.length > 1 ? "s" : ""}?
                </p>

                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700 font-medium">
                    ⚠️ This action cannot be undone
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-red-600">
                    <li>• All product data will be permanently deleted</li>
                    <li>• Product images will be removed</li>
                    <li>
                      • Associated tags and inventory data will be deleted
                    </li>
                    {publishedCount > 0 && (
                      <li className="font-semibold">
                        • {publishedCount} published product
                        {publishedCount > 1 ? "s" : ""} will no longer be
                        accessible to customers
                      </li>
                    )}
                  </ul>
                </div>

                {selectedProducts.length > 1 && (
                  <div className="bg-muted rounded-lg p-3 max-h-40 overflow-y-auto">
                    <p className="text-sm font-medium mb-2">
                      Selected products:
                    </p>
                    <ul className="space-y-1 text-sm">
                      {selectedProductsData.slice(0, 5).map((p) => (
                        <li
                          key={p.id}
                          className="flex items-center justify-between"
                        >
                          <span className="truncate">{p.name}</span>
                          <Badge variant="outline" className="text-xs ml-2">
                            {p.status === "PUBLISHED" ? "Published" : "Draft"}
                          </Badge>
                        </li>
                      ))}
                      {selectedProducts.length > 5 && (
                        <li className="text-xs text-muted-foreground">
                          ...and {selectedProducts.length - 5} more
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {selectedProductsData.some((p) => p.sales > 0) && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-sm text-amber-700 font-medium">
                      📊 Sales Data Warning
                    </p>
                    <p className="text-sm text-amber-600 mt-1">
                      {selectedProductsData.filter((p) => p.sales > 0).length}{" "}
                      selected product
                      {selectedProductsData.filter((p) => p.sales > 0).length >
                      1
                        ? "s have"
                        : " has"}{" "}
                      sales. Deleting will remove all sales history.
                    </p>
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMultiple}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleting ? (
                <>
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Deleting...
                  </span>
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete {selectedProducts.length} Product
                  {selectedProducts.length > 1 ? "s" : ""}
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
        />
      )}
    </>
  );
}
