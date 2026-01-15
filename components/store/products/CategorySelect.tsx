"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
}

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CategorySelect({
  value,
  onChange,
}: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);

  const [categoryId, setCategoryId] = useState<string>("");
  const [subcategoryId, setSubcategoryId] = useState<string>("");

  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingSubcategory, setLoadingSubcategory] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!value) return;

    const parent = categories.find((c) => c.id === value);
    if (parent) {
      setCategoryId(parent.id);
      setSubcategoryId("");
      return;
    }

    const child = subcategories.find((s) => s.id === value);
    if (child && child.parentId) {
      setCategoryId(child.parentId);
      setSubcategoryId(child.id);
    }
  }, [value, categories, subcategories]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/store/category", { cache: "no-store" });
      const json = await res.json();
      setCategories(json.data ?? []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoadingCategory(false);
    }
  };

  const fetchSubcategories = async (parentId: string) => {
    setLoadingSubcategory(true);
    setSubcategories([]);
    setSubcategoryId("");

    try {
      const res = await fetch(`/api/store/category?parentId=${parentId}`, {
        cache: "no-store",
      });
      const json = await res.json();
      setSubcategories(json.data ?? []);
    } catch (err) {
      console.error("Failed to fetch subcategories", err);
    } finally {
      setLoadingSubcategory(false);
    }
  };

  const handleCategoryChange = async (id: string) => {
    setCategoryId(id);
    setSubcategoryId("");

    if (!id) {
      setSubcategories([]);
      onChange("");
      return;
    }

    await fetchSubcategories(id);

    onChange(id);
  };

  const handleSubcategoryChange = (id: string) => {
    setSubcategoryId(id);
    onChange(id);
  };

  if (loadingCategory) {
    return (
      <div className="flex items-center justify-center h-10 border rounded-lg">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
        <div className="w-full lg:flex-1">
          <Select value={categoryId} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full h-12 text-base">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black border shadow-lg max-h-[60vh] overflow-y-auto">
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {categoryId && subcategories.length > 0 && (
          <div className="w-full lg:flex-1">
            {loadingSubcategory ? (
              <div className="flex items-center justify-center h-10 border rounded-lg">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              <Select
                value={subcategoryId}
                onValueChange={handleSubcategoryChange}
              >
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Subcategory (optional)" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black border shadow-lg max-h-[60vh] overflow-y-auto">
                  <SelectItem value={categoryId}>Use main category</SelectItem>
                  {subcategories.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      </div>

      {(categoryId || subcategoryId) && (
        <div className="text-sm sm:text-base text-gray-600 p-3 bg-gray-50 rounded">
          Selected:{" "}
          <span className="font-medium">
            {categories.find((c) => c.id === categoryId)?.name}
            {subcategoryId && " > "}
            {subcategoryId &&
              subcategories.find((s) => s.id === subcategoryId)?.name}
          </span>
        </div>
      )}
    </div>
  );
}
