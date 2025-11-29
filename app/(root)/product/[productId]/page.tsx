"use client";

import ProductDetailPage from "@/components/ProductDetail";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { productId } = useParams();
  return (
    <div>
      <p>{productId}</p>
    </div>
  );
}
