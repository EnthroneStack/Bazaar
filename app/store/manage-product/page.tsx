// app/store/manage-product/page.tsx

import ProductFilters from "@/components/store/products/ProductFilters";
import ProductTable from "@/components/store/products/ProductTable";

export default function ManageProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-600">View and manage all your products</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Product
        </button>
      </div>

      <ProductFilters />
      <ProductTable />
    </div>
  );
}
