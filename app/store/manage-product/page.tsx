import Link from "next/link";

import ProductFilters from "@/components/store/products/ProductFilters";
import ProductTable from "@/components/store/products/ProductTable";
import { Button } from "@/components/ui/button";

export default function ManageProductsPage() {
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

      <ProductFilters />

      <ProductTable />
    </div>
  );
}
