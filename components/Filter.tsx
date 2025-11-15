"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { categories } from "@/assets/assets";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { FilterState } from "@/app/(root)/shop/page";

interface FilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  handleCategoryChange: (category: string) => void;
  handlePriceChange: (type: "min" | "max", value: number) => void;
  handleRatingChange: (rating: number) => void;
  handleStockChange: (value: boolean | null) => void;
  clearAllFilters: () => void;
  getActiveFiltersCount: () => number;
}

const Filter = ({
  filters,
  setFilters,
  handleCategoryChange,
  handlePriceChange,
  handleRatingChange,
  handleStockChange,
  clearAllFilters,
  getActiveFiltersCount,
}: FilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [openSection, setOpenSections] = useState({
    categories: true,
    price: true,
    ratings: true,
    availability: true,
  });

  const toggleSection = (section: keyof typeof openSection) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-full">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4 top-16 z-30 bg-white">
        <Button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          variant="outline"
          className="flex justify-center items-center w-full p-4 sm:p-5 border border-gray-300 bg-white cursor-pointer shadow-sm rounded-md"
        >
          <span className="font-medium text-slate-600">Filters</span>
          <div className="flex items-center gap-2">
            {getActiveFiltersCount() > 0 && (
              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
            {isFilterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </Button>
      </div>

      {/* Filter Content */}
      <div
        className={`${
          isFilterOpen ? "block" : "hidden"
        } p-4 sm:p-6 border border-gray-200 rounded-lg bg-white lg:block w-full lg:w-70 shadow-md`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 flex gap-2">
            Filters
          </h2>
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              className="text-sm text-primary-100 hover:text-primary flex items-center gap-1"
            >
              <X size={16} />
              Clear all
            </Button>
          )}
        </div>

        {/* Categories */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <Button
            onClick={() => toggleSection("categories")}
            variant="ghost"
            className="w-full flex justify-between items-center text-left cursor-pointer"
          >
            <h3 className="font-medium text-gray-900">Categories</h3>
            {openSection.categories ? <ChevronUp size={20} /> : <ChevronDown />}
          </Button>

          {openSection.categories && (
            <div className="flex flex-col space-y-2 mt-4">
              {categories.map((category) => (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                    className="border border-gray-300 data-[state=checked]:text-white"
                  />
                  <Label htmlFor={category} className="text-sm text-gray-700">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <Button
            variant="ghost"
            onClick={() => toggleSection("price")}
            className="w-full flex items-center justify-between cursor-pointer text-left"
          >
            <h3 className="font-medium text-gray-900 ">Price Range</h3>
            {openSection.price ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </Button>

          {openSection.price && (
            <div className="flex flex-col w-full mt-4">
              {Array(1)
                .fill(filters.priceRange)
                .map((price, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm text-gray-600 mb-2"
                  >
                    <span>${price.min}</span>
                    <span>${price.max}</span>
                  </div>
                ))}

              <div className="flex gap-2">
                <Input
                  type="number"
                  value={filters.priceRange.min}
                  onChange={(e) =>
                    handlePriceChange("min", Number(e.target.value))
                  }
                  className="w-20 p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Min"
                />
                <span className="flex items-center text-gray-400">-</span>
                <Input
                  type="number"
                  value={filters.priceRange.max}
                  onChange={(e) =>
                    handlePriceChange("max", Number(e.target.value))
                  }
                  className="w-20 p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Max"
                />
              </div>
            </div>
          )}
        </div>

        {/* Ratings */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center text-left cursor-pointer"
            onClick={() => toggleSection("ratings")}
          >
            <h3 className="font-medium text-gray-900">Ratings</h3>
            {openSection.ratings ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </Button>

          {openSection.ratings && (
            <div className="mt-4 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <Label key={rating} className="flex items-center">
                  <Checkbox
                    className="border border-gray-300 data-[state=checked]:text-white"
                    checked={filters.ratings.includes(rating)}
                    onCheckedChange={() => handleRatingChange(rating)}
                  />
                  <span className="ml-2 text-sm text-gray-700 flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className={`text-lg ${
                          index < rating ? "text-primary" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="ml-1 text-gray-500">& up</span>
                  </span>
                </Label>
              ))}
            </div>
          )}
        </div>

        {/* Avalability */}
        <div className="pb-6">
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center text-left cursor-pointer"
            onClick={() => toggleSection("availability")}
          >
            <h3 className="font-medium text-gray-900">Availability</h3>
            {openSection.availability ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </Button>

          {openSection.availability && (
            <div className="mt-4 space-y-2">
              <RadioGroup
                value={
                  filters.inStock === true
                    ? "instock"
                    : filters.inStock === false
                    ? "outofstock"
                    : "all"
                }
                onValueChange={(value) => {
                  if (value === "instock") handleStockChange(true);
                  else if (value === "outofstock") handleStockChange(false);
                  else handleStockChange(null);
                }}
              >
                <Label className="flex items-center">
                  <RadioGroupItem
                    value="instock"
                    className="border border-gray-300 text-primary cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-700">In Stock</span>
                </Label>

                <Label className="flex items-center">
                  <RadioGroupItem
                    value="outofstock"
                    className="border border-gray-300 text-primary cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Out of Stock
                  </span>
                </Label>

                <Label className="flex items-center">
                  <RadioGroupItem
                    value="all"
                    className="border border-gray-300 text-primary cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-700">All</span>
                </Label>
              </RadioGroup>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {getActiveFiltersCount() > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Active Filters ({getActiveFiltersCount()})
            </h4>
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {category}
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className="ml-1 hover:text-blue-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {(filters.priceRange.min > 0 || filters.priceRange.max < 200) && (
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  ${filters.priceRange.min} - ${filters.priceRange.max}
                  <button
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: { min: 0, max: 200 },
                      }))
                    }
                    className="ml-1 hover:text-blue-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {filters.ratings.map((rating) => (
                <span
                  key={rating}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {rating}★ & up
                  <button
                    onClick={() => handleRatingChange(rating)}
                    className="ml-1 hover:text-blue-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {filters.inStock !== null && (
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {filters.inStock ? "In Stock" : "Out of Stock"}
                  <button
                    onClick={() => handleStockChange(null)}
                    className="ml-1 hover:text-blue-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
