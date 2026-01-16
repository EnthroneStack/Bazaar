// "use client";

// import {
//   Edit,
//   Eye,
//   MoreVertical,
//   Star,
//   Package,
//   DollarSign,
// } from "lucide-react";

// export default function ProductTable({
//   products,
//   loading,
// }: {
//   products: any[];
//   loading: boolean;
// }) {
//   const getStatusBadge = (status: string) => {
//     const styles = {
//       published: "bg-green-100 text-green-800",
//       draft: "bg-yellow-100 text-yellow-800",
//       archived: "bg-gray-100 text-gray-800",
//       "out-of-stock": "bg-red-100 text-red-800",
//     };

//     return (
//       <span
//         className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
//           styles[status as keyof typeof styles]
//         }`}
//       >
//         {status.replace("-", " ").toUpperCase()}
//       </span>
//     );
//   };

//   if (loading) {
//     return <div className="p-6 text-sm">Loading...</div>;
//   }

//   if (!loading && products.length === 0) {
//     return (
//       <div className="p-6 text-sm text-muted-foreground">No products found</div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full text-xs sm:text-sm">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-3 py-2 text-left">
//                 <input type="checkbox" className="h-4 w-4" />
//               </th>
//               <th className="px-3 py-2 text-left">Product</th>
//               <th className="px-3 py-2 text-left">Category</th>
//               <th className="px-3 py-2 text-left">Price</th>
//               <th className="px-3 py-2 text-left">Stock</th>
//               <th className="px-3 py-2 text-left">Status</th>
//               <th className="px-3 py-2 text-left">Sales</th>
//               <th className="px-3 py-2 text-left">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y">
//             {products.map((product) => (
//               <tr key={product.id} className="hover:bg-gray-50">
//                 <td className="px-3 py-3 align-top">
//                   <input type="checkbox" className="h-4 w-4" />
//                 </td>

//                 {/* PRODUCT */}
//                 <td className="px-3 py-3 min-w-[220px]">
//                   <div className="flex gap-2">
//                     <div className="h-9 w-9 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
//                       <Package className="h-4 w-4 text-gray-400" />
//                     </div>
//                     <div className="space-y-0.5">
//                       <div className="font-medium text-gray-900 break-words">
//                         {product.name}
//                       </div>
//                       <div className="text-gray-500">{product.sku ?? "—"}</div>
//                       <div className="flex items-center gap-1">
//                         <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
//                         <span>{product.rating ?? "—"}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </td>

//                 {/* CATEGORY */}
//                 <td className="px-3 py-3 whitespace-nowrap">
//                   <span className="px-2 py-0.5 rounded bg-gray-100">
//                     {product.category?.name ?? "—"}
//                   </span>
//                 </td>

//                 {/* PRICE */}
//                 <td className="px-3 py-3 whitespace-nowrap">
//                   <div className="flex items-center gap-1">
//                     <DollarSign className="h-3 w-3 text-gray-400" />
//                     {Number(product.price).toFixed(2)}
//                   </div>
//                 </td>

//                 {/* STOCK */}
//                 <td className="px-3 py-3 whitespace-nowrap">
//                   <span
//                     className={`font-medium ${
//                       product.stockQuantity < 10
//                         ? "text-yellow-600"
//                         : "text-green-600"
//                     }`}
//                   >
//                     {product.stockQuantity} units
//                   </span>
//                 </td>

//                 {/* STATUS */}
//                 <td className="px-3 py-3 whitespace-nowrap">
//                   {product.stockQuantity <= 0
//                     ? getStatusBadge("out-of-stock")
//                     : getStatusBadge(product.status)}
//                 </td>

//                 {/* SALES */}
//                 <td className="px-3 py-3 whitespace-nowrap">
//                   <div className="font-medium">{product.sales ?? "—"}</div>
//                   <div className="text-[10px] text-gray-500">total sales</div>
//                 </td>

//                 {/* ACTIONS */}
//                 <td className="px-3 py-3 whitespace-nowrap">
//                   <div className="flex gap-1">
//                     <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
//                       <Eye className="h-4 w-4" />
//                     </button>
//                     <button className="p-1.5 text-green-600 hover:bg-green-50 rounded">
//                       <Edit className="h-4 w-4" />
//                     </button>
//                     <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded">
//                       <MoreVertical className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* FOOTER */}
//       <div className="px-4 py-3 border-t text-xs sm:text-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
//         <span>Showing {products.length} products</span>
//         <div className="flex gap-2">
//           <button className="px-3 py-1 border rounded">Previous</button>
//           <button className="px-3 py-1 bg-blue-600 text-white rounded">
//             1
//           </button>
//           <button className="px-3 py-1 border rounded">Next</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import {
//   Edit,
//   Eye,
//   MoreVertical,
//   Star,
//   Package,
//   DollarSign,
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

// export default function ProductTable({
//   products,
//   loading,
// }: {
//   products: any[];
//   loading: boolean;
// }) {
//   const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   const getStatusBadge = (status: string, stockQuantity: number) => {
//     const statusToUse = stockQuantity <= 0 ? "out-of-stock" : status;

//     const variants = {
//       published: "bg-green-100 text-green-800 hover:bg-green-100",
//       draft: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
//       archived: "bg-gray-100 text-gray-800 hover:bg-gray-100",
//       "out-of-stock": "bg-red-100 text-red-800 hover:bg-red-100",
//     };

//     const displayText = {
//       published: "Published",
//       draft: "Draft",
//       archived: "Archived",
//       "out-of-stock": "Out of Stock",
//     };

//     return (
//       <Badge
//         variant="outline"
//         className={`text-xs font-medium px-2 py-0.5 rounded-full ${
//           variants[statusToUse as keyof typeof variants]
//         }`}
//       >
//         {displayText[statusToUse as keyof typeof displayText]}
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
//     <Card>
//       <ScrollArea className="w-full">
//         <div className="min-w-[800px] md:min-w-0">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-[50px]">
//                   <Checkbox
//                     checked={selectedProducts.length === products.length}
//                     onCheckedChange={handleSelectAll}
//                     aria-label="Select all"
//                   />
//                 </TableHead>
//                 <TableHead className="min-w-[200px]">Product</TableHead>
//                 <TableHead className="min-w-[120px]">Category</TableHead>
//                 <TableHead className="min-w-[100px]">Price</TableHead>
//                 <TableHead className="min-w-[100px]">Stock</TableHead>
//                 <TableHead className="min-w-[120px]">Status</TableHead>
//                 <TableHead className="min-w-[100px]">Sales</TableHead>
//                 <TableHead className="min-w-[100px] text-right">
//                   Actions
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {products.map((product) => (
//                 <TableRow key={product.id} className="group hover:bg-muted/50">
//                   <TableCell>
//                     <Checkbox
//                       checked={selectedProducts.includes(product.id)}
//                       onCheckedChange={(checked) =>
//                         handleSelectProduct(product.id, checked as boolean)
//                       }
//                       aria-label={`Select ${product.name}`}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center space-x-3">
//                       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
//                         {product.images?.[0] ? (
//                           <img
//                             src={product.images[0]}
//                             alt={product.name}
//                             className="h-10 w-10 rounded-lg object-cover"
//                           />
//                         ) : (
//                           <Package className="h-5 w-5 text-muted-foreground" />
//                         )}
//                       </div>
//                       <div className="min-w-0 flex-1">
//                         <div className="truncate font-medium text-sm">
//                           {product.name}
//                         </div>
//                         <div className="truncate text-xs text-muted-foreground">
//                           {product.sku ?? "No SKU"}
//                         </div>
//                         <div className="flex items-center mt-1">
//                           <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
//                           <span className="text-xs text-muted-foreground">
//                             {product.rating ?? "No rating"}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className="text-xs">
//                       {product.category?.name ?? "—"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center">
//                       <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
//                       <span className="font-medium">
//                         {Number(product.price).toFixed(2)}
//                       </span>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div
//                       className={`font-medium ${
//                         product.stockQuantity < 10
//                           ? "text-yellow-600"
//                           : "text-green-600"
//                       }`}
//                     >
//                       {product.stockQuantity} units
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     {getStatusBadge(product.status, product.stockQuantity)}
//                   </TableCell>
//                   <TableCell>
//                     <div className="font-medium">{product.sales ?? "0"}</div>
//                     <div className="text-xs text-muted-foreground">
//                       total sales
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="h-8 w-8 p-0"
//                         >
//                           <MoreVertical className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem className="cursor-pointer">
//                           <Eye className="mr-2 h-4 w-4" />
//                           View
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className="cursor-pointer">
//                           <Edit className="mr-2 h-4 w-4" />
//                           Edit
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//         <ScrollBar orientation="horizontal" />
//       </ScrollArea>

//       <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t p-4 gap-4">
//         <div className="text-sm text-muted-foreground">
//           Showing {products.length} of 156 products
//         </div>
//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setCurrentPage(Math.max(1, currentPage - 1));
//                 }}
//                 className={
//                   currentPage === 1 ? "pointer-events-none opacity-50" : ""
//                 }
//               />
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationLink
//                 href="#"
//                 isActive={currentPage === 1}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setCurrentPage(1);
//                 }}
//               >
//                 1
//               </PaginationLink>
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationLink
//                 href="#"
//                 isActive={currentPage === 2}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setCurrentPage(2);
//                 }}
//               >
//                 2
//               </PaginationLink>
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationNext
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setCurrentPage(currentPage + 1);
//                 }}
//                 className={
//                   currentPage >= Math.ceil(156 / itemsPerPage)
//                     ? "pointer-events-none opacity-50"
//                     : ""
//                 }
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </CardFooter>
//     </Card>
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
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Clock,
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

type DbProductStatus = "DRAFT" | "PUBLISHED";

export default function ProductTable({
  products,
  loading,
}: {
  products: any[];
  loading: boolean;
}) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  function normalizeStatus(status: DbProductStatus) {
    return status.toLowerCase() as "draft" | "published";
  }

  // const getStatusBadge = (status: string, stockQuantity: number) => {
  //   const statusToUse = stockQuantity <= 0 ? "out-of-stock" : status;

  //   const variants = {
  //     published: "bg-green-100 text-green-800 hover:bg-green-100",
  //     draft: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  //     archived: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  //     "out-of-stock": "bg-red-100 text-red-800 hover:bg-red-100",
  //   };

  //   const displayText = {
  //     published: "Published",
  //     draft: "Draft",
  //     archived: "Archived",
  //     "out-of-stock": "Out of Stock",
  //   };

  //   return (
  //     <Badge
  //       variant="outline"
  //       className={`text-xs font-medium px-2 py-0.5 rounded-full ${
  //         variants[statusToUse as keyof typeof variants]
  //       }`}
  //     >
  //       {displayText[statusToUse as keyof typeof displayText]}
  //     </Badge>
  //   );
  // };

  const getStatusBadge = (
    status: "DRAFT" | "PUBLISHED",
    stockQuantity: number
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

  // const getPublicationStatusBadge = (status: string) => {
  //   const isPublished = status === "published";

  //   return (
  //     <Badge
  //       variant="outline"
  //       className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
  //         isPublished
  //           ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
  //           : "bg-amber-100 text-amber-800 hover:bg-amber-100"
  //       }`}
  //     >
  //       {isPublished ? (
  //         <>
  //           <CheckCircle className="h-3 w-3" />
  //           Published
  //         </>
  //       ) : (
  //         <>
  //           <Clock className="h-3 w-3" />
  //           Draft
  //         </>
  //       )}
  //     </Badge>
  //   );
  // };

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

  // Professional Loading Component
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

  // Professional Empty State Component
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
    <Card>
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
                <TableHead className="min-w-[130px]">Published/Draft</TableHead>
                <TableHead className="min-w-[100px]">Sales</TableHead>
                <TableHead className="min-w-[100px] text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="group hover:bg-muted/50">
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
                        ${Number(product.price).toFixed(2)}
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
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
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
  );
}
