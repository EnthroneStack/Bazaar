import { FilterState } from "@/app/(root)/shop/page";
import { productDummyData } from "@/assets/assets";
import { productAverageRatings } from "@/lib/product-review-map";
import { useMemo } from "react";

export interface FilteredProduct {
  product: (typeof productDummyData)[0];
  matchesSearch: boolean;
  searchHighlights?: {
    name: string[];
  };
}

export const useProductFiltering = (
  products: (typeof productDummyData)[0][],
  filters: FilterState,
  sortBy: string,
  searchQuery?: string
): FilteredProduct[] => {
  return useMemo(() => {
    if (!products.length) return [];

    let filteredProducts = [...products];

    // SEARCH
    if (searchQuery && searchQuery.trim()) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // CATEGORY FILTER
    if (filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // PRICE FILTER
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );

    // RATING FILTER
    if (filters.ratings.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        const ratingObj = productAverageRatings.find(
          (r) => r.id === product.id
        );
        const average = ratingObj?.averageRating ?? 0;
        return filters.ratings.some((r) => average >= r);
      });
    }

    // STOCK FILTER
    if (filters.inStock !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => product.inStock === filters.inStock
      );
    }

    // SORTING
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
        case "rating": {
          const aRating =
            productAverageRatings.find((r) => r.id === a.id)?.averageRating ??
            0;
          const bRating =
            productAverageRatings.find((r) => r.id === b.id)?.averageRating ??
            0;
          return bRating - aRating;
        }
        case "newest": {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        case "featured":
        default:
          return 0;
      }
    });

    return filteredProducts.map((product) => ({
      product,
      matchesSearch: searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : false,
    }));
  }, [products, filters, sortBy, searchQuery]);
};
