// "use client";

// import { Filter, Search, X } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
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
//   parentId: string | null;
//   children?: CategoryDTO[];
// };

// export type ProductFilterState = {
//   search: string;
//   categoryId: string | null;
//   status: "all" | "published" | "draft" | "out-of-stock";
// };

// export default function ProductFilters() {
//   const [search, setSearch] = useState("");
//   const [categories, setCategories] = useState<CategoryDTO[]>([]);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
//   const [status, setStatus] = useState("all");

//   const toggleCategory = (id: string) => {
//     setSelectedCategoryIds((prev) =>
//       prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
//     );
//   };

//   const clearFilters = () => {
//     setSearch("");
//     setSelectedCategoryIds([]);
//     setStatus("all");
//   };

//   const selectedCategories = categories
//     .flatMap((p) => p.children ?? [])
//     .filter((c) => selectedCategoryIds.includes(c.id));

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const res = await fetch("/api/store/category?tree=true", {
//         cache: "no-store",
//       });
//       const json = await res.json();
//       setCategories(json.data ?? []);
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <Card className="mb-3 px-3 py-3">
//       <div
//         className="
//           flex items-center gap-2
//           overflow-x-auto whitespace-nowrap
//           md:overflow-visible md:flex-wrap md:whitespace-normal
//         "
//       >
//         <Filter className="h-4 w-4 text-muted-foreground shrink-0" />

//         <div className="relative shrink-0 md:flex-1 md:min-w-[240px]">
//           <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />

//           <div className="flex items-center gap-1 pl-7 pr-2 h-8 border rounded-md bg-background overflow-x-auto">
//             {selectedCategories.map((cat) => (
//               <span
//                 key={cat.id}
//                 className="flex items-center gap-1 px-2 py-0.5 text-[10px] bg-muted rounded shrink-0"
//               >
//                 {cat.name}
//                 <X
//                   className="h-3 w-3 cursor-pointer"
//                   onClick={() => toggleCategory(cat.id)}
//                 />
//               </span>
//             ))}

//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search products"
//               className="flex-1 bg-transparent outline-none text-xs min-w-[80px]"
//             />
//           </div>
//         </div>

//         <Button
//           size="sm"
//           className="h-8 text-xs shrink-0"
//           variant={selectedCategoryIds.length === 0 ? "default" : "secondary"}
//           onClick={() => setSelectedCategoryIds([])}
//         >
//           All
//         </Button>

//         {categories.map((parent) => (
//           <Select key={parent.id}>
//             <SelectTrigger className="h-8 text-xs shrink-0 w-[140px]">
//               <SelectValue placeholder={parent.name} />
//             </SelectTrigger>
//             <SelectContent className="bg-white">
//               {parent.children?.map((child) => (
//                 <SelectItem
//                   key={child.id}
//                   value={child.id}
//                   onClick={() => toggleCategory(child.id)}
//                 >
//                   {selectedCategoryIds.includes(child.id) ? "✓ " : ""}
//                   {child.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         ))}

//         <Select value={status} onValueChange={setStatus}>
//           <SelectTrigger className="h-8 w-[120px] text-xs shrink-0">
//             <SelectValue placeholder="Status" />
//           </SelectTrigger>
//           <SelectContent className="bg-white">
//             <SelectItem value="all">All</SelectItem>
//             <SelectItem value="published">Published</SelectItem>
//             <SelectItem value="draft">Draft</SelectItem>
//             <SelectItem value="out-of-stock">Out of stock</SelectItem>
//           </SelectContent>
//         </Select>

//         <Button
//           variant="ghost"
//           size="icon"
//           className="h-8 w-8 shrink-0"
//           onClick={clearFilters}
//         >
//           <X className="h-4 w-4" />
//         </Button>
//       </div>
//     </Card>
//   );
// }

"use client";

import { Filter, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFilterState } from "./types";

type CategoryDTO = {
  id: string;
  name: string;
  parentId: string | null;
  children?: CategoryDTO[];
};

export default function ProductFilters({
  value,
  onChange,
}: {
  value: ProductFilterState;
  onChange: (v: ProductFilterState) => void;
}) {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    fetch("/api/store/category?tree=true", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => setCategories(json.data ?? []));
  }, []);

  return (
    <Card className="mb-3 px-3 py-3">
      <div className="flex items-center gap-2 overflow-x-auto">
        <Filter className="h-4 w-4 text-muted-foreground" />

        {/* SEARCH */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
          <input
            value={value.search}
            onChange={(e) => onChange({ ...value, search: e.target.value })}
            placeholder="Search products"
            className="pl-7 h-8 w-full rounded-md border text-xs"
          />
        </div>

        {/* CATEGORY */}
        {categories.map((parent) => (
          <Select
            key={parent.id}
            value={value.categoryId ?? ""}
            onValueChange={(v) => onChange({ ...value, categoryId: v || null })}
          >
            <SelectTrigger className="h-8 w-[140px] text-xs">
              <SelectValue placeholder={parent.name} />
            </SelectTrigger>
            <SelectContent>
              {parent.children?.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  {child.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        {/* STATUS */}
        <Select
          value={value.status}
          onValueChange={(v) =>
            onChange({ ...value, status: v as ProductFilterState["status"] })
          }
        >
          <SelectTrigger className="h-8 w-[120px] text-xs">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="out-of-stock">Out of stock</SelectItem>
          </SelectContent>
        </Select>

        {/* CLEAR */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            onChange({ search: "", categoryId: null, status: "all" })
          }
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
