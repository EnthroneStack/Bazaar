// // components/store/products/ProductForm.tsx
// "use client";

// import { useState } from "react";
// import { Upload, X } from "lucide-react";

// export default function ProductForm() {
//   const [images, setImages] = useState<string[]>([]);

//   const categories = [
//     "Electronics",
//     "Fashion",
//     "Home & Garden",
//     "Beauty",
//     "Sports",
//     "Books",
//   ];
//   const tags = ["Featured", "New Arrival", "Best Seller", "Clearance"];

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-6">
//       <form className="space-y-8">
//         {/* Basic Information */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Basic Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Product Name *
//               </label>
//               <input
//                 type="text"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter product name"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 SKU *
//               </label>
//               <input
//                 type="text"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter SKU"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Category *
//               </label>
//               <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//                 <option value="">Select category</option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Price *
//               </label>
//               <input
//                 type="number"
//                 step="0.01"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="0.00"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Description */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Description
//           </h3>
//           <textarea
//             rows={4}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="Describe your product in detail..."
//           />
//         </div>

//         {/* Images */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Product Images
//           </h3>
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//             <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-600 mb-2">
//               Drag & drop images here or click to browse
//             </p>
//             <p className="text-sm text-gray-500 mb-4">
//               Recommended: 1200x1200px, max 10MB each
//             </p>
//             <button
//               type="button"
//               className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
//             >
//               Browse Files
//             </button>
//           </div>
//           {images.length > 0 && (
//             <div className="grid grid-cols-4 gap-4 mt-4">
//               {images.map((img, idx) => (
//                 <div key={idx} className="relative group">
//                   <div className="aspect-square bg-gray-100 rounded-lg"></div>
//                   <button
//                     type="button"
//                     className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Inventory */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Inventory
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Stock Quantity *
//               </label>
//               <input
//                 type="number"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="0"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Low Stock Threshold
//               </label>
//               <input
//                 type="number"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="10"
//               />
//             </div>
//             <div>
//               <label className="flex items-center space-x-2">
//                 <input type="checkbox" className="rounded text-blue-600" />
//                 <span className="text-sm text-gray-700">Track inventory</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Tags */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
//           <div className="flex flex-wrap gap-2">
//             {tags.map((tag) => (
//               <label
//                 key={tag}
//                 className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg"
//               >
//                 <input type="checkbox" className="rounded text-blue-600" />
//                 <span className="text-sm text-gray-700">{tag}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
//           <button
//             type="button"
//             className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//           >
//             Save as Draft
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Publish Product
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// components/store/products/ProductForm.tsx
"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

export default function ProductForm() {
  const [images, setImages] = useState<string[]>([]);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Beauty",
    "Sports",
    "Books",
  ];
  const tags = ["Featured", "New Arrival", "Best Seller", "Clearance"];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <form className="space-y-6 sm:space-y-8">
        {/* Basic Information */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Basic Information
          </h3>
          {/* RESPONSIVE CHANGE: 1 column mobile, 2 columns desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter SKU"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base">
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Description
          </h3>
          <textarea
            rows={3}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            placeholder="Describe your product in detail..."
          />
        </div>

        {/* Images */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Product Images
          </h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center">
            <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-gray-600 mb-2">
              Drag & drop images here or click to browse
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              Recommended: 1200x1200px, max 10MB each
            </p>
            <button
              type="button"
              className="bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-200 text-sm sm:text-base"
            >
              Browse Files
            </button>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg"></div>
                  <button
                    type="button"
                    className="absolute top-1 sm:top-2 right-1 sm:right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Inventory */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Inventory
          </h3>
          {/* RESPONSIVE CHANGE: 1 column mobile, 3 columns desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Low Stock Threshold
              </label>
              <input
                type="number"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="10"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 h-4 w-4"
                />
                <span className="text-sm text-gray-700">Track inventory</span>
              </label>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <label
                key={tag}
                className="flex items-center space-x-2 bg-gray-100 px-2 sm:px-3 py-1 sm:py-2 rounded-lg"
              >
                <input
                  type="checkbox"
                  className="rounded text-blue-600 h-3 w-3 sm:h-4 sm:w-4"
                />
                <span className="text-xs sm:text-sm text-gray-700">{tag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions - RESPONSIVE CHANGE: Stack buttons on mobile */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-200">
          <button
            type="button"
            className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Publish Product
          </button>
        </div>
      </form>
    </div>
  );
}
