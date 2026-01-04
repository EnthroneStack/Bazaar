// // components/store/products/ProductFilters.tsx
// "use client";

// import { Filter, Search, X } from "lucide-react";
// import { useState } from "react";

// export default function ProductFilters() {
//   const [search, setSearch] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [priceRange, setPriceRange] = useState({ min: "", max: "" });
//   const [status, setStatus] = useState("all");

//   const categories = [
//     "All",
//     "Electronics",
//     "Fashion",
//     "Home",
//     "Beauty",
//     "Sports",
//     "Books",
//   ];

//   const handleCategoryToggle = (category: string) => {
//     if (selectedCategories.includes(category)) {
//       setSelectedCategories(selectedCategories.filter((c) => c !== category));
//     } else {
//       setSelectedCategories([...selectedCategories, category]);
//     }
//   };

//   const clearFilters = () => {
//     setSearch("");
//     setSelectedCategories([]);
//     setPriceRange({ min: "", max: "" });
//     setStatus("all");
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center">
//           <Filter className="h-5 w-5 text-gray-500 mr-2" />
//           <h3 className="font-semibold text-gray-900">Filters</h3>
//         </div>
//         <button
//           onClick={clearFilters}
//           className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
//         >
//           <X className="h-4 w-4 mr-1" />
//           Clear all
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {/* Search */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Search Products
//           </label>
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Product name, SKU..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Categories */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Categories
//           </label>
//           <div className="flex flex-wrap gap-2">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => handleCategoryToggle(category)}
//                 className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
//                   selectedCategories.includes(category) ||
//                   (category === "All" && selectedCategories.length === 0)
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Price Range */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Price Range
//           </label>
//           <div className="flex items-center space-x-3">
//             <input
//               type="number"
//               placeholder="Min"
//               value={priceRange.min}
//               onChange={(e) =>
//                 setPriceRange({ ...priceRange, min: e.target.value })
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             <span className="text-gray-500">to</span>
//             <input
//               type="number"
//               placeholder="Max"
//               value={priceRange.max}
//               onChange={(e) =>
//                 setPriceRange({ ...priceRange, max: e.target.value })
//               }
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Status */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Status
//           </label>
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="all">All Status</option>
//             <option value="published">Published</option>
//             <option value="draft">Draft</option>
//             <option value="archived">Archived</option>
//             <option value="out-of-stock">Out of Stock</option>
//           </select>
//         </div>
//       </div>

//       <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
//         <div className="text-sm text-gray-600">Showing 24 of 156 products</div>
//         <div className="flex items-center space-x-3">
//           <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
//             Export Results
//           </button>
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//             Apply Filters
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// components/store/products/ProductFilters.tsx
"use client";

import { Filter, Search, X } from "lucide-react";
import { useState } from "react";

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
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setPriceRange({ min: "", max: "" });
    setStatus("all");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2" />
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
            Filters
          </h3>
        </div>
        <button
          onClick={clearFilters}
          className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 flex items-center"
        >
          <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          Clear all
        </button>
      </div>

      {/* RESPONSIVE CHANGE: Stack filters on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Search */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Product name, SKU..."
              className="w-full pl-8 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categories
          </label>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm rounded-lg transition-colors ${
                  selectedCategories.includes(category) ||
                  (category === "All" && selectedCategories.length === 0)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
              className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <span className="text-gray-500 text-sm">to</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
              className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* RESPONSIVE CHANGE: Stack actions on mobile */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 gap-3 sm:gap-0">
        <div className="text-xs sm:text-sm text-gray-600">
          Showing 24 of 156 products
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-3">
          {/* RESPONSIVE CHANGE: Full width buttons on mobile */}
          <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
            Export Results
          </button>
          <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
