"use client";

import ProductCard from "@/components/shop/ProductCard";
import { useAppSelector } from "@/hooks/redux-hook";
import { Suspense, useEffect, useState } from "react";
import { MobileFilter } from "@/components/shop/MobileFilter";
import { useProductFiltering } from "@/hooks/useProductFiltering";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Filter from "@/components/shop/Filter";
import Sort from "@/components/shop/Sort";

export interface FilterState {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  ratings: number[];
  inStock: boolean | null;
}

const ShopContent = () => {
  const products = useAppSelector((state) => state.product.list);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: { min: 0, max: 200 },
    ratings: [],
    inStock: null,
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  const handleBackToAllProducts = () => {
    router.push("/shop", { scroll: false });
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handlePriceChange = (type: "min" | "max", value: number) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: { ...prev.priceRange, [type]: Math.max(0, value) },
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFilters((prev) => ({
      ...prev,
      ratings: prev.ratings.includes(rating)
        ? prev.ratings.filter((r) => r !== rating)
        : [...prev.ratings, rating],
    }));
  };

  const handleStockChange = (value: boolean | null) => {
    setFilters((prev) => ({
      ...prev,
      inStock: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRange: { min: 0, max: 200 },
      ratings: [],
      inStock: null,
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.priceRange.min > 0 || filters.priceRange.max < 200) count++;
    if (filters.ratings.length > 0) count += filters.ratings.length;
    if (filters.inStock !== null) count++;
    return count;
  };

  const filteredProducts = useProductFiltering(
    products,
    debouncedFilters,
    sortBy,
    searchQuery
  );

  return (
    <section className="max-w-7xl w-full min-h-[70vh] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center sm:items-start justify-between gap-6 lg:gap-8 overflow-x-hidden">
      <div className="my-6 hidden lg:block">
        <Filter
          filters={filters}
          setFilters={setFilters}
          handleCategoryChange={handleCategoryChange}
          handlePriceChange={handlePriceChange}
          handleRatingChange={handleRatingChange}
          handleStockChange={handleStockChange}
          clearAllFilters={clearAllFilters}
          getActiveFiltersCount={getActiveFiltersCount}
        />
      </div>

      <div className="flex-1 w-full">
        {searchQuery ? (
          <div className="my-6">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                onClick={handleBackToAllProducts}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back to All Products</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h1>
                <p className="text-gray-600 mt-2">
                  Found {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""} for "
                  <span className="font-semibold text-gray-800">
                    {searchQuery}
                  </span>
                  "
                </p>
              </div>

              <Button
                variant="outline"
                onClick={handleBackToAllProducts}
                className="hidden sm:flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                View All Products
              </Button>
            </div>
          </div>
        ) : (
          <div className="my-6">
            <h1 className="text-2xl text-slate-500 flex items-center gap-2">
              All <span className="text-slate-700 font-medium">Products</span>
            </h1>
            {filteredProducts.length > 0 && (
              <p className="text-gray-600 mt-2">
                Showing {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="lg:hidden flex-1">
            <MobileFilter
              filters={filters}
              setFilters={setFilters}
              handleCategoryChange={handleCategoryChange}
              handlePriceChange={handlePriceChange}
              handleRatingChange={handleRatingChange}
              handleStockChange={handleStockChange}
              clearAllFilters={clearAllFilters}
              getActiveFiltersCount={getActiveFiltersCount}
            />
          </div>

          <div className="flex items-center justify-end flex-1 gap-3">
            <Sort
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              productCount={filteredProducts.length}
            />
          </div>
        </div>

        <div
          className={`
          mb-32 transition-all duration-300
          ${
            viewMode === "grid"
              ? "grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 xl:gap-8"
              : "flex flex-col items-center gap-6 px-4 sm:px-6 md:px-8"
          }
        `}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map(({ product, matchesSearch }) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                searchQuery={searchQuery}
                shouldHighlight={matchesSearch}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg mb-2">
                {searchQuery
                  ? "No products found for your search"
                  : "No products found"}
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {searchQuery
                  ? `No products matching "${searchQuery}"`
                  : "Try adjusting your filters"}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={
                    searchQuery ? handleBackToAllProducts : clearAllFilters
                  }
                  className="bg-primary text-white hover:bg-primary-600"
                >
                  {searchQuery ? "View All Products" : "Clear All Filters"}
                </Button>
                {searchQuery && (
                  <Button variant="outline" onClick={() => router.push("/")}>
                    Go to Homepage
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ShopPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
};

export default ShopPage;
