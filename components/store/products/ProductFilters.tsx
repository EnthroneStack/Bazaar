"use client";

import { Filter, Search, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductFilters() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [status, setStatus] = useState("all");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Beauty",
    "Sports",
    "Books",
  ];

  const handleCategoryToggle = (category: string) => {
    if (category === "All") {
      setSelectedCategories([]);
      return;
    }

    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setPriceRange({ min: "", max: "" });
    setStatus("all");
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm sm:text-base">Filters</CardTitle>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-8 px-2 text-muted-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="mb-1.5 block text-sm font-medium">
            Search Products
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Product name, SKU..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <label className="mb-1.5 block text-sm font-medium">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive =
                selectedCategories.includes(category) ||
                (category === "All" && selectedCategories.length === 0);

              return (
                <Button
                  key={category}
                  size="sm"
                  variant={isActive ? "default" : "secondary"}
                  onClick={() => handleCategoryToggle(category)}
                  className="h-8"
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Price Range
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
            />
            <span className="text-sm text-muted-foreground">to</span>
            <Input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">Status</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs sm:text-sm text-muted-foreground">
          Showing 24 of 156 products
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="w-full sm:w-auto">
            Export Results
          </Button>
          <Button className="w-full sm:w-auto text-white">Apply Filters</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
