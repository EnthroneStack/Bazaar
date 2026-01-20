"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ProductFilters from "@/components/store/products/ProductFilters";
import ProductTable from "@/components/store/products/ProductTable";
import { Button } from "@/components/ui/button";
import { ProductFilterState } from "@/components/store/products/types";

type ProductRow = {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
  status: "DRAFT" | "PUBLISHED";
  images: string[];
  category?: { id: string; name: string };
};

export default function ManageProductsPage() {
  const [filters, setFilters] = useState<ProductFilterState>({
    search: "",
    categoryId: null,
    status: "all",
  });

  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(false);
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

  const deleteProducts = async (ids: string[]) => {
    const snapshot = products;

    setProducts((prev) => prev.filter((p) => !ids.includes(p.id)));
    setTotalCount((c) => Math.max(0, c - ids.length));

    try {
      await Promise.all(
        ids.map((id) =>
          fetch(`/api/store/product/${id}`, { method: "DELETE" }).then(
            (res) => {
              if (!res.ok) throw new Error("Delete failed");
            },
          ),
        ),
      );
    } catch (error) {
      console.error(error);

      setProducts(snapshot);
      setTotalCount(snapshot.length);
      throw error;
    }
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.categoryId) params.set("categoryId", filters.categoryId);
    if (filters.status !== "all") params.set("status", filters.status);

    params.set("page", String(page));
    params.set("limit", String(LIMIT));

    setLoading(true);

    fetch(`/api/store/product?${params.toString()}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.data.items);
        setTotalCount(json.data.totalCount);
      })
      .finally(() => setLoading(false));
  }, [filters, page]);

  useEffect(() => {
    setPage(1);
  }, [filters.search, filters.categoryId, filters.status]);

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
          <Link href="/store/add-product">Add Product</Link>
        </Button>
      </div>

      <ProductFilters value={filters} onChange={setFilters} />

      <ProductTable
        products={products}
        loading={loading}
        page={page}
        limit={LIMIT}
        totalCount={totalCount}
        onNextPage={() => setPage((p) => p + 1)}
        onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
        onProductUpdate={handleProductUpdate}
        onDeleteOne={(id) => deleteProducts([id])}
        onDeleteMany={(ids) => deleteProducts(ids)}
      />
    </div>
  );
}
