import { Grid, List } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface SortProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  productCount?: number;
}

const Sort = ({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  productCount,
}: SortProps) => {
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
    <div className="flex flex-col w-full sm:flex-row sm:items-center sm:justify-between p-4 bg-white border border-gray-200 rounded-lg gap-4 mb-6">
      {productCount !== undefined && (
        <div className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">{productCount}</span>{" "}
          products found
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            onClick={() => onViewModeChange("grid")}
            title="Grid view"
            className={`transition-all duration-200 rounded-l-lg rounded-r-none ${
              viewMode === "grid"
                ? "bg-primary text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
            size="sm"
          >
            <Grid size={18} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => onViewModeChange("list")}
            title="List view"
            className={`transition-all duration-200 rounded-l-none ${
              viewMode === "list"
                ? "bg-primary text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
            size="sm"
          >
            <List size={18} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Sort by:{" "}
          </Label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="min-w-40 border border-gray-300 focus:ring-2 focus:ring-primary bg-white">
              <SelectValue placeholder={sortOptions[0].label} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-white z-50">
                {sortOptions.map((sortOption) => (
                  <SelectItem
                    value={sortOption.value}
                    key={sortOption.value}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    {sortOption.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Sort;
