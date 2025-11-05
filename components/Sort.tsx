import React from "react";
import { Grid, List, ChevronDown } from "lucide-react";

interface SortProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  productCount?: number;
}

const Sort: React.FC<SortProps> = ({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  productCount,
}) => {
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white border border-gray-200 rounded-lg gap-4 mb-6">
      {productCount !== undefined && (
        <div className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">{productCount}</span>{" "}
          products found
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 transition-colors duration-200 ${
              viewMode === "grid"
                ? "bg-primary text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
            title="Grid view"
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 transition-colors duration-200 ${
              viewMode === "list"
                ? "bg-primary text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
            title="List view"
          >
            <List size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Sort by:
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white cursor-pointer min-w-40"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sort;
