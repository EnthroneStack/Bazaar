// "use client";

// import { Filter, Search, X } from "lucide-react";
// import { useEffect, useState } from "react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// type CategoryDTO = {
//   id: string;
//   name: string;
//   slug: string;
//   parentId: string | null;
//   children?: CategoryDTO[];
// };

// export default function ProductFilters() {
//   const [search, setSearch] = useState("");
//   const [categories, setCategories] = useState<CategoryDTO[]>([]);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
//   const [priceRange, setPriceRange] = useState({ min: "", max: "" });
//   const [status, setStatus] = useState("all");

//   // =========================
//   // CATEGORY SELECTION LOGIC
//   // =========================

//   const toggleCategory = (id: string) => {
//     setSelectedCategoryIds((prev) =>
//       prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
//     );
//   };

//   const clearCategories = () => {
//     setSelectedCategoryIds([]);
//   };

//   // =========================
//   // FETCH CATEGORY TREE
//   // =========================

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch("/api/store/category?tree=true", {
//           cache: "no-store",
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch categories");
//         }

//         const json = await res.json();
//         setCategories(json.data ?? []);
//       } catch (error) {
//         console.error("CATEGORY_FETCH_ERROR:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // =========================
//   // CLEAR ALL FILTERS
//   // =========================

//   const clearFilters = () => {
//     setSearch("");
//     clearCategories();
//     setPriceRange({ min: "", max: "" });
//     setStatus("all");
//   };

//   // =========================
//   // RENDER HELPERS
//   // =========================

//   const isLeafCategory = (category: CategoryDTO) =>
//     !category.children || category.children.length === 0;

//   // =========================
//   // UI
//   // =========================

//   return (
//     <Card className="mb-6">
//       <CardHeader className="flex flex-row items-center justify-between pb-3">
//         <div className="flex items-center gap-2">
//           <Filter className="h-4 w-4 text-muted-foreground" />
//           <CardTitle className="text-sm sm:text-base">Filters</CardTitle>
//         </div>

//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={clearFilters}
//           className="h-8 px-2 text-muted-foreground"
//         >
//           <X className="h-4 w-4 mr-1" />
//           Clear
//         </Button>
//       </CardHeader>

//       <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         {/* SEARCH */}
//         <div className="sm:col-span-2 lg:col-span-1">
//           <label className="mb-1.5 block text-sm font-medium">
//             Search Products
//           </label>
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//             <Input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Product name, SKU..."
//               className="pl-9"
//             />
//           </div>
//         </div>

//         {/* CATEGORIES */}
//         <div className="sm:col-span-2 lg:col-span-1">
//           <label className="mb-1.5 block text-sm font-medium">Categories</label>

//           <div className="flex flex-wrap gap-2">
//             {/* ALL CATEGORIES */}
//             <Button
//               size="sm"
//               variant={
//                 selectedCategoryIds.length === 0 ? "default" : "secondary"
//               }
//               onClick={clearCategories}
//             >
//               All
//             </Button>

//             {/* CATEGORY TREE */}
//             {categories.map((parent) => (
//               <div key={parent.id} className="flex flex-wrap gap-2">
//                 <Button size="sm" variant="outline" disabled>
//                   {parent.name}
//                 </Button>

//                 {parent.children?.map((child) => (
//                   <Button
//                     key={child.id}
//                     size="sm"
//                     variant={
//                       selectedCategoryIds.includes(child.id)
//                         ? "default"
//                         : "secondary"
//                     }
//                     onClick={() => toggleCategory(child.id)}
//                   >
//                     {child.name}
//                   </Button>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="mb-1.5 block text-sm font-medium">
//             Price Range
//           </label>
//           <div className="flex items-center gap-2">
//             <Input
//               type="number"
//               placeholder="Min"
//               value={priceRange.min}
//               onChange={(e) =>
//                 setPriceRange({ ...priceRange, min: e.target.value })
//               }
//             />
//             <span className="text-sm text-muted-foreground">to</span>
//             <Input
//               type="number"
//               placeholder="Max"
//               value={priceRange.max}
//               onChange={(e) =>
//                 setPriceRange({ ...priceRange, max: e.target.value })
//               }
//             />
//           </div>
//         </div>

//         <div>
//           <label className="mb-1.5 block text-sm font-medium">Status</label>
//           <Select value={status} onValueChange={setStatus}>
//             <SelectTrigger>
//               <SelectValue placeholder="All Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Status</SelectItem>
//               <SelectItem value="published">Published</SelectItem>
//               <SelectItem value="draft">Draft</SelectItem>
//               <SelectItem value="archived">Archived</SelectItem>
//               <SelectItem value="out-of-stock">Out of Stock</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </CardContent>

//       <CardFooter className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
//         <div className="text-xs sm:text-sm text-muted-foreground">
//           Showing products
//         </div>

//         <div className="flex flex-col gap-2 sm:flex-row">
//           <Button variant="outline" className="w-full sm:w-auto">
//             Export Results
//           </Button>
//           <Button className="w-full sm:w-auto text-white">Apply Filters</Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";

import { Filter, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CategoryDTO = {
  id: string;
  name: string;
  parentId: string | null;
  children?: CategoryDTO[];
};

export default function ProductFilters() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [status, setStatus] = useState("all");

  const toggleCategory = (id: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategoryIds([]);
    setStatus("all");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/store/category?tree=true", {
        cache: "no-store",
      });
      const json = await res.json();
      setCategories(json.data ?? []);
    };

    fetchCategories();
  }, []);

  return (
    <Card className="mb-3 px-2 py-2">
      {/* MOBILE TOOLBAR */}
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
        {/* FILTER ICON */}
        <Filter className="h-4 w-4 text-muted-foreground shrink-0" />

        {/* SEARCH */}
        <div className="relative shrink-0">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="h-8 w-[140px] pl-7 text-xs"
          />
        </div>

        {/* ALL */}
        <Button
          size="sm"
          className="h-8 text-xs shrink-0"
          variant={selectedCategoryIds.length === 0 ? "default" : "secondary"}
          onClick={() => setSelectedCategoryIds([])}
        >
          All
        </Button>

        {/* CATEGORY CHIPS */}
        {categories.map((parent) => (
          <div key={parent.id} className="flex items-center gap-1 shrink-0">
            {/* Parent label */}
            <span className="text-[10px] uppercase text-muted-foreground">
              {parent.name}
            </span>

            {/* Children */}
            {parent.children?.map((child) => (
              <Button
                key={child.id}
                size="sm"
                className="h-8 text-xs"
                variant={
                  selectedCategoryIds.includes(child.id)
                    ? "default"
                    : "secondary"
                }
                onClick={() => toggleCategory(child.id)}
              >
                {child.name}
              </Button>
            ))}
          </div>
        ))}

        {/* STATUS */}
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="h-8 w-[120px] text-xs shrink-0">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        {/* CLEAR */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={clearFilters}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
