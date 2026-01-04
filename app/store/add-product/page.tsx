// app/store/add-product/page.tsx

import ProductForm from "@/components/store/products/ProductForm";

export default function AddProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600">
          Create a new product listing for your store
        </p>
      </div>
      <ProductForm />
    </div>
  );
}
