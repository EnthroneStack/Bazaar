import ProductForm from "@/components/store/products/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/store"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Add New Product
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Create a new product listing for your store
            </p>
          </div>
        </div>
      </div>
      <ProductForm />
    </div>
  );
}
