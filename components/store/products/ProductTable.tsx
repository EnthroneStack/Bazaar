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
  Trash2, // Added for delete icon
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
import ProductViewModal from "./ProductViewModal";
import ProductEditModal from "./ProductEditModal";

type DbProductStatus = "DRAFT" | "PUBLISHED";

export default function ProductTable({
  products,
  loading,
  onProductUpdate,
}: {
  products: any[];
  loading: boolean;
  onProductUpdate?: (productId: string, updates: any) => Promise<void>;
}) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingProduct, setViewingProduct] = useState<any>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const itemsPerPage = 6;

  // ========== START: DELETE FUNCTIONALITY ADDITIONS ==========
  const handleDeleteSelected = () => {
    // Implement your delete logic here
    console.log("Deleting products:", selectedProducts);

    // After deletion, clear selection
    setSelectedProducts([]);

    // Optional: Show confirmation modal before deletion
    // if (window.confirm(`Delete ${selectedProducts.length} product(s)?`)) {
    //   // Delete logic here
    // }
  };
  // ========== END: DELETE FUNCTIONALITY ADDITIONS ==========

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

  return (
    <>
      <Card>
        {/* ========== START: DELETE BUTTON IMPLEMENTATION ========== */}
        {selectedProducts.length > 0 && (
          <div className="border-b p-3 sm:p-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="font-medium text-gray-700">
                  {selectedProducts.length} product(s) selected
                </span>
              </div>
              <Button
                onClick={handleDeleteSelected}
                variant="destructive"
                size="sm"
                className="h-8 px-3 sm:px-4 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                Delete {selectedProducts.length}{" "}
                {selectedProducts.length === 1 ? "record" : "records"}
              </Button>
            </div>
          </div>
        )}
        {/* ========== END: DELETE BUTTON IMPLEMENTATION ========== */}

        <ScrollArea className="w-full">
          <div className="min-w-[900px] md:min-w-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedProducts.length === products.length}
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
                          {/* ========== START: DELETE IN DROPDOWN ========== */}
                          <DropdownMenuItem
                            className="cursor-pointer bg-white text-red-600 focus:text-red-600 focus:bg-red-50"
                            onClick={() => {
                              // For single product deletion from dropdown
                              if (window.confirm(`Delete "${product.name}"?`)) {
                                console.log("Deleting product:", product.id);
                                // Implement single delete logic here
                              }
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                          {/* ========== END: DELETE IN DROPDOWN ========== */}
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
