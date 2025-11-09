"use client";

import Title from "./Title";
import { useAppSelector } from "@/hooks/redux-hook";
import ProductCard from "./ProductCard";

const LatestProducts = () => {
  const displayQuantity = 4;
  const products = useAppSelector((state) => state.product.list);

  return (
    <section className="px-6 my-30 max-w-6xl mx-auto">
      <div className="flex flex-col items-center">
        <Title
          title="Latest Products"
          description={`Showing ${
            products.length < displayQuantity
              ? products.length
              : displayQuantity
          } of ${products.length} products`}
          visibleButton={true}
        />
      </div>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products
          .slice()
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .slice(0, displayQuantity)
          .map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
    </section>
  );
};

export default LatestProducts;
