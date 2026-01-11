"use client";

import ProductForm from "@/components/store/products/ProductForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
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
