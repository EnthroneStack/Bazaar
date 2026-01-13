"use client";

import ProductDetailPage from "@/components/shop/ProductDetail";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { productId } = useParams();

  return (
    <div>
      <ProductDetailPage productId={productId as string} />
    </div>
  );
}
