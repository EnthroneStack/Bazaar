"use client";

import React from "react";
import Title from "./Title";
import { useAppSelector } from "@/hooks/redux-hook";
import ProductCard from "./ProductCard";
import { productAverageRatings } from "@/lib/product-review-map";

const BestSelling = () => {
  const displayQuantity = 8;
  const products = useAppSelector((state) => state.product.list);
  const productWithRatings = products
    .map((product) => {
      const productId = product.id;

      const productWithRating = productAverageRatings.find(
        (p) => p.id === productId
      );

      return {
        ...product,
        averageRating: productWithRating?.averageRating ?? 0,
      };
    })
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, displayQuantity);

  console.log(productWithRatings);

  return (
    <section className="my-30 px-6 max-w-6xl mx-auto">
      <Title
        title="Best Seling"
        description={`Showing ${
          products.length < displayQuantity ? products.length : displayQuantity
        } of ${products.length} products`}
        visibleButton={true}
      />

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {productWithRatings.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </section>
  );
};

export default BestSelling;
