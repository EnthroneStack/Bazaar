// import Link from "next/link";

// import ProductFilters from "@/components/store/products/ProductFilters";
// import ProductTable from "@/components/store/products/ProductTable";
// import { Button } from "@/components/ui/button";

// export default function ManageProductsPage() {
//   return (
//     <div className="space-y-4 sm:space-y-6">
//       <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         <div className="space-y-1">
//           <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
//             Manage Products
//           </h1>
//           <p className="text-sm sm:text-base text-muted-foreground">
//             View and manage all your products
//           </p>
//         </div>

//         <Button asChild className="w-full sm:w-auto text-white">
//           <Link href="/add-product">Add Product</Link>
//         </Button>
//       </div>

//       <ProductFilters />

//       <ProductTable />
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ProductFilters from "@/components/store/products/ProductFilters";
import ProductTable from "@/components/store/products/ProductTable";
import { Button } from "@/components/ui/button";
import { ProductFilterState } from "@/components/store/products/types";

export default function ManageProductsPage() {
  const [filters, setFilters] = useState<ProductFilterState>({
    search: "",
    categoryId: null,
    status: "all",
  });

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  const LIMIT = 6;

  const handleProductUpdate = async (
    productId: string,
    payload: { formData: FormData },
  ) => {
    const response = await fetch(`/api/store/product/${productId}`, {
      method: "PATCH",
      body: payload.formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update product");
    }

    const updated = await response.json();

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updated.data } : p)),
    );
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.categoryId) params.set("categoryId", filters.categoryId);
    if (filters.status !== "all") params.set("status", filters.status);

    params.set("limit", String(LIMIT));

    if (page > 1 && nextCursor) {
      params.set("cursor", nextCursor);
    }

    setLoading(true);

    fetch(`/api/store/product?${params.toString()}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.data.items);
        setNextCursor(json.data.nextCursor);
        setTotalCount(json.data.totalCount);
      })
      .finally(() => setLoading(false));
  }, [filters, page]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Manage Products
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            View and manage all your products
          </p>
        </div>

        <Button asChild className="w-full sm:w-auto text-white">
          <Link href="/add-product">Add Product</Link>
        </Button>
      </div>

      <ProductFilters value={filters} onChange={setFilters} />

      <ProductTable
        products={products}
        loading={loading}
        page={page}
        limit={LIMIT}
        totalCount={totalCount}
        hasNextPage={!!nextCursor}
        onNextPage={() => setPage((p) => p + 1)}
        onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
        onProductUpdate={handleProductUpdate}
      />
    </div>
  );
}
