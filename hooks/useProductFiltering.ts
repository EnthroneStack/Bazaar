import { FilterState } from "@/app/(root)/shop/page";
import { productDummyData } from "@/assets/assets";
import { productAverageRatings } from "@/lib/product-review-map";
import { useMemo } from "react";

export const useProductFiltering = (
  products: (typeof productDummyData)[0][],
  filters: FilterState,
  sortBy: string
) => {
  return useMemo(() => {
    if (!products.length) return [];

    let filteredProducts = [...products];

    // Category filter
    if (filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Price filter
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );

    // Rating filter
    if (filters.ratings.length > 0) {
      filteredProducts = filteredProducts.filter((p) => {
        const productRatingObj = productAverageRatings.find(
          (r) => r.id === p.id
        );
        const rating = productRatingObj?.averageRating ?? 0;
        return filters.ratings.some((r) => rating >= r);
      });
    }

    // Availability filter
    if (filters.inStock !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => product.inStock === filters.inStock
      );
    }

    // Sorting
    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filteredProducts;
  }, [products, filters, sortBy]);
};
