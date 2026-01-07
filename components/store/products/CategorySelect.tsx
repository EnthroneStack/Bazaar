"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function CategorySelect({
  value,
  onChange,
}: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-10 border border-gray-300 rounded-lg">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full text-sm sm:text-base">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent className="bg-white text-black border shadow-lg">
        {categories.length > 0 ? (
          categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))
        ) : (
          <div className="py-2 text-center text-sm text-gray-500">
            No categories found
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
