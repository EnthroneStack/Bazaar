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
// import { ProductFilterState } from "./types";

// type CategoryDTO = {
//   id: string;
//   name: string;
//   parentId: string | null;
//   children?: CategoryDTO[];
// };

// export default function ProductFilters({
//   value,
//   onChange,
// }: {
//   value: ProductFilterState;
//   onChange: (v: ProductFilterState) => void;
// }) {
//   const [categories, setCategories] = useState<CategoryDTO[]>([]);

//   useEffect(() => {
//     fetch("/api/store/category?tree=true", { cache: "no-store" })
//       .then((res) => res.json())
//       .then((json) => setCategories(json.data ?? []));
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

//         {/* SEARCH */}
//         <div className="relative shrink-0 md:flex-1 md:min-w-[240px]">
//           <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
//           <input
//             value={value.search}
//             onChange={(e) => onChange({ ...value, search: e.target.value })}
//             placeholder="Search products"
//             className="pl-7 h-8 w-full rounded-md border text-xs"
//           />
//         </div>

//         {/* CATEGORY */}
//         <Select
//           value={value.categoryId ?? "all"}
//           onValueChange={(v) =>
//             onChange({
//               ...value,
//               categoryId: v === "all" ? null : v,
//             })
//           }
//         >
//           <SelectTrigger className="h-8 w-[180px] text-xs shrink-0">
//             <SelectValue placeholder="Category" />
//           </SelectTrigger>

//           <SelectContent className="bg-white">
//             <SelectItem value="all">All Categories</SelectItem>

//             {categories.flatMap((parent) =>
//               parent.children?.map((child) => (
//                 <SelectItem key={child.id} value={child.id}>
//                   {parent.name} → {child.name}
//                 </SelectItem>
//               ))
//             )}
//           </SelectContent>
//         </Select>

//         {/* STATUS */}
//         <Select
//           value={value.status}
//           onValueChange={(v) =>
//             onChange({
//               ...value,
//               status: v as ProductFilterState["status"],
//             })
//           }
//         >
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

//         {/* CLEAR */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="h-8 w-8 shrink-0"
//           onClick={() =>
//             onChange({ search: "", categoryId: null, status: "all" })
//           }
//         >
//           <X className="h-4 w-4" />
//         </Button>
//       </div>
//     </Card>
//   );
// }

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
// import { ProductFilterState } from "./types";

// type CategoryDTO = {
//   id: string;
//   name: string;
//   parentId: string | null;
//   children?: CategoryDTO[];
// };

// export default function ProductFilters({
//   value,
//   onChange,
// }: {
//   value: ProductFilterState;
//   onChange: (v: ProductFilterState) => void;
// }) {
//   const [categories, setCategories] = useState<CategoryDTO[]>([]);

//   useEffect(() => {
//     fetch("/api/store/category?tree=true", { cache: "no-store" })
//       .then((res) => res.json())
//       .then((json) => setCategories(json.data ?? []));
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
//           <input
//             value={value.search}
//             onChange={(e) => onChange({ ...value, search: e.target.value })}
//             placeholder="Search products"
//             className="flex-1 bg-transparent outline-none text-xs min-w-[80px] pl-7 h-8 border rounded-md"
//           />
//         </div>

//         <Select
//           value={value.categoryId ?? "all"}
//           onValueChange={(v) =>
//             onChange({
//               ...value,
//               categoryId: v === "all" ? null : v,
//             })
//           }
//         >
//           <SelectTrigger className="h-8 text-xs shrink-0 w-[140px]">
//             <SelectValue placeholder="Category" />
//           </SelectTrigger>
//           <SelectContent className="bg-white">
//             <SelectItem value="all">All</SelectItem>
//             {categories.flatMap((parent) =>
//               parent.children?.map((child) => (
//                 <SelectItem key={child.id} value={child.id}>
//                   {parent.name} → {child.name}
//                 </SelectItem>
//               ))
//             )}
//           </SelectContent>
//         </Select>

//         <Select
//           value={value.status}
//           onValueChange={(v) =>
//             onChange({
//               ...value,
//               status: v as ProductFilterState["status"],
//             })
//           }
//         >
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
//           onClick={() =>
//             onChange({ search: "", categoryId: null, status: "all" })
//           }
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    value.categoryId ? [value.categoryId] : [],
  );
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    fetch("/api/store/category?tree=true", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => setCategories(json.data ?? []));
  }, []);

  const toggleCategory = (id: string) => {
    const newIds = selectedCategoryIds.includes(id)
      ? selectedCategoryIds.filter((cid) => cid !== id)
      : [...selectedCategoryIds, id];

    setSelectedCategoryIds(newIds);

    // Update parent state - exactly matches your logic structure
    onChange({
      ...value,
      categoryId: newIds.length > 0 ? newIds[0] : null, // Maintain single categoryId in state
    });
  };

  const clearCategoryFilters = () => {
    setSelectedCategoryIds([]);
    onChange({
      ...value,
      categoryId: null,
    });
  };

  // Get selected category names for display
  const selectedCategories = categories
    .flatMap((parent) => parent.children ?? [])
    .filter((child) => selectedCategoryIds.includes(child.id));

  return (
    <Card className="mb-3 px-3 py-3">
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap md:overflow-visible md:flex-wrap md:whitespace-normal">
        <Filter className="h-4 w-4 text-muted-foreground shrink-0" />

        {/* Search Input */}
        <div className="relative shrink-0 md:flex-1 md:min-w-[200px]">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={value.search}
            onChange={(e) => onChange({ ...value, search: e.target.value })}
            placeholder="Search products"
            className="w-full bg-transparent outline-none text-xs pl-7 h-8 border rounded-md"
          />
        </div>

        {/* Category Select with Multi-Selection */}
        <Select open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
          <SelectTrigger className="h-8 text-xs shrink-0 w-[160px]">
            <SelectValue placeholder="Category">
              {selectedCategoryIds.length === 0 ? (
                "All Categories"
              ) : selectedCategoryIds.length === 1 ? (
                selectedCategories[0]?.name || "Selected"
              ) : (
                <span className="flex items-center gap-1">
                  <span>{selectedCategoryIds.length} selected</span>
                  {selectedCategories.length > 0 && (
                    <Badge variant="secondary" className="h-4 px-1 text-[10px]">
                      {selectedCategories[0].name}
                      {selectedCategories.length > 1 &&
                        ` +${selectedCategories.length - 1}`}
                    </Badge>
                  )}
                </span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white w-[280px] p-0">
            <div className="p-2 border-b">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium">Select Categories</span>
                {selectedCategoryIds.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={clearCategoryFilters}
                  >
                    Clear
                  </Button>
                )}
              </div>
              {selectedCategoryIds.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedCategories.map((cat) => (
                    <Badge
                      key={cat.id}
                      variant="secondary"
                      className="text-xs h-6 px-2"
                    >
                      {cat.name}
                      <X
                        className="ml-1 h-3 w-3 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(cat.id);
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <ScrollArea className="h-[200px]">
              <div className="p-2">
                {categories.map((parent) => (
                  <div key={parent.id} className="mb-3 last:mb-0">
                    <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
                      {parent.name}
                    </div>
                    {parent.children?.map((child) => (
                      <div
                        key={child.id}
                        className={`flex items-center px-2 py-1.5 text-xs rounded cursor-pointer hover:bg-muted ${
                          selectedCategoryIds.includes(child.id)
                            ? "bg-muted"
                            : ""
                        }`}
                        onClick={() => toggleCategory(child.id)}
                      >
                        <div
                          className={`w-4 h-4 border rounded mr-2 flex items-center justify-center ${
                            selectedCategoryIds.includes(child.id)
                              ? "bg-primary border-primary"
                              : "border-muted-foreground"
                          }`}
                        >
                          {selectedCategoryIds.includes(child.id) && (
                            <div className="w-2 h-2 bg-white rounded-sm" />
                          )}
                        </div>
                        {child.name}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </SelectContent>
        </Select>

        {/* Status Select */}
        <Select
          value={value.status}
          onValueChange={(v) =>
            onChange({
              ...value,
              status: v as ProductFilterState["status"],
            })
          }
        >
          <SelectTrigger className="h-8 w-[120px] text-xs shrink-0">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="out-of-stock">Out of stock</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear All Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => {
            setSelectedCategoryIds([]);
            onChange({ search: "", categoryId: null, status: "all" });
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
