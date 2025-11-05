"use client";

import Filter from "@/components/Filter";
import Sort from "@/components/Sort";
import ProductCard from "@/components/ProductCard";
import { useAppSelector } from "@/hooks/redux-hook";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { MobileFilter } from "@/components/MobileFilter";

const ShopContent = () => {
  const products = useAppSelector((state) => state.product.list);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <section className="max-w-7xl min-h-[70vh] mx-auto px-6 flex gap-6">
      <div className="my-6 hidden lg:block">
        <Filter />
      </div>

      <div className="flex-1">
        <Link href="">
          <h1 className="text-2xl text-slate-500 my-6 flex items-center gap-2">
            All <span className="text-slate-700 font-medium">Products</span>
          </h1>
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="lg:hidden flex-1">
            <MobileFilter />
          </div>

          <div className="flex items-center justify-end flex-1 gap-3">
            <Sort
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              productCount={products.length}
            />
          </div>
        </div>

        <div
          className={`
          mb-32
          ${
            viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-12"
              : "flex flex-col gap-6"
          }
        `}
        >
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              viewMode={viewMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
};

export default page;
