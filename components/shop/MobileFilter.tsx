"use client";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { FilterIcon, X } from "lucide-react";
import { FilterState } from "@/app/(root)/shop/page";
import { Button } from "../ui/button";
import Filter from "./Filter";

interface MobileFilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  handleCategoryChange: (category: string) => void;
  handlePriceChange: (type: "min" | "max", value: number) => void;
  handleRatingChange: (rating: number) => void;
  handleStockChange: (value: boolean | null) => void;
  clearAllFilters: () => void;
  getActiveFiltersCount: () => number;
}

export function MobileFilter({
  filters,
  setFilters,
  handleCategoryChange,
  handlePriceChange,
  handleRatingChange,
  handleStockChange,
  clearAllFilters,
  getActiveFiltersCount,
}: MobileFilterProps) {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 w-full border border-gray-300 shadow-sm"
        >
          <FilterIcon size={18} />
          <span>Filters</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent
        className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-xl 
        rounded-none border-r border-gray-200 overflow-y-auto z-50 animate-slideInLeft"
      >
        <DrawerHeader className="flex flex-row justify-between items-center border-b border-gray-200 px-4 py-3">
          <DrawerTitle className="text-lg font-medium text-gray-800">
            <FilterIcon className="w-4 h-4" />
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="w-5 h-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="p-4 overflow-y-auto h-full">
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
      </DrawerContent>
    </Drawer>
  );
}
