import ProductDetailPage from "@/components/ProductDetail";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  console.log(params);
  return <ProductDetailPage />;
}
