// // components/store/inventory/LowStockAlert.tsx
// import { AlertTriangle, ArrowRight, Package } from "lucide-react";
// import Link from "next/link";

// const lowStockProducts = [
//   {
//     id: "PROD-002",
//     name: "Organic Cotton T-Shirt",
//     currentStock: 8,
//     threshold: 15,
//     daysToStockout: 7,
//   },
//   {
//     id: "PROD-006",
//     name: "Yoga Mat Premium",
//     currentStock: 4,
//     threshold: 8,
//     daysToStockout: 3,
//   },
//   {
//     id: "PROD-007",
//     name: "Wireless Mouse",
//     currentStock: 12,
//     threshold: 20,
//     daysToStockout: 14,
//   },
// ];

// const outOfStockProducts = [
//   {
//     id: "PROD-003",
//     name: "Stainless Steel Water Bottle",
//     outSince: "2024-01-15",
//   },
// ];

// export default function LowStockAlert() {
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="p-2 bg-yellow-100 rounded-lg mr-3">
//               <AlertTriangle className="h-5 w-5 text-yellow-600" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900">Inventory Alerts</h3>
//               <p className="text-sm text-gray-600">
//                 Products needing attention
//               </p>
//             </div>
//           </div>
//           <Link
//             href="/store/manage-product"
//             className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
//           >
//             View All
//             <ArrowRight className="h-4 w-4 ml-1" />
//           </Link>
//         </div>
//       </div>

//       <div className="divide-y divide-gray-200">
//         {/* Low Stock Section */}
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h4 className="font-medium text-gray-900">Low Stock</h4>
//             <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
//               {lowStockProducts.length} items
//             </span>
//           </div>
//           <div className="space-y-4">
//             {lowStockProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"
//               >
//                 <div className="flex items-center">
//                   <div className="p-2 bg-white rounded mr-3">
//                     <Package className="h-4 w-4 text-yellow-600" />
//                   </div>-
//                   <div>
//                     <div className="font-medium text-gray-900">
//                       {product.name}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       Stock: {product.currentStock} / {product.threshold}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-sm font-medium text-yellow-700">
//                     {product.daysToStockout} days left
//                   </div>
//                   <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
//                     Reorder
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Out of Stock Section */}
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h4 className="font-medium text-gray-900">Out of Stock</h4>
//             <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
//               {outOfStockProducts.length} items
//             </span>
//           </div>
//           <div className="space-y-4">
//             {outOfStockProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
//               >
//                 <div className="flex items-center">
//                   <div className="p-2 bg-white rounded mr-3">
//                     <AlertTriangle className="h-4 w-4 text-red-600" />
//                   </div>
//                   <div>
//                     <div className="font-medium text-gray-900">
//                       {product.name}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       Out since{" "}
//                       {new Date(product.outSince).toLocaleDateString()}
//                     </div>
//                   </div>
//                 </div>
//                 <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
//                   Restock
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="p-6 bg-gray-50 border-t border-gray-200">
//         <div className="flex items-center justify-between">
//           <div className="text-sm text-gray-600">
//             <span className="font-medium">Total products:</span> 156 •{" "}
//             <span className="text-green-600">138 in stock</span> •{" "}
//             <span className="text-yellow-600">3 low stock</span> •{" "}
//             <span className="text-red-600">1 out of stock</span>
//           </div>
//           <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//             Set up auto-reorder
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// components/store/inventory/LowStockAlert.tsx
import { AlertTriangle, ArrowRight, Package } from "lucide-react";
import Link from "next/link";

const lowStockProducts = [
  {
    id: "PROD-002",
    name: "Organic Cotton T-Shirt",
    currentStock: 8,
    threshold: 15,
    daysToStockout: 7,
  },
  {
    id: "PROD-006",
    name: "Yoga Mat Premium",
    currentStock: 4,
    threshold: 8,
    daysToStockout: 3,
  },
  {
    id: "PROD-007",
    name: "Wireless Mouse",
    currentStock: 12,
    threshold: 20,
    daysToStockout: 14,
  },
];

const outOfStockProducts = [
  {
    id: "PROD-003",
    name: "Stainless Steel Water Bottle",
    outSince: "2024-01-15",
  },
];

export default function LowStockAlert() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* RESPONSIVE CHANGE: Adjust padding for mobile */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg mr-2 sm:mr-3">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                Inventory Alerts
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Products needing attention
              </p>
            </div>
          </div>
          <Link
            href="/store/manage-product"
            className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium flex items-center"
          >
            View All
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
          </Link>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {/* Low Stock Section */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h4 className="font-medium text-gray-900 text-sm sm:text-base">
              Low Stock
            </h4>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              {lowStockProducts.length} items
            </span>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"
              >
                <div className="flex items-center min-w-0">
                  <div className="p-2 bg-white rounded mr-2 sm:mr-3 flex-shrink-0">
                    <Package className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 text-sm sm:text-base truncate">
                      {product.name}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Stock: {product.currentStock} / {product.threshold}
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <div className="text-xs sm:text-sm font-medium text-yellow-700">
                    {product.daysToStockout} days
                  </div>
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                    Reorder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Out of Stock Section */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h4 className="font-medium text-gray-900 text-sm sm:text-base">
              Out of Stock
            </h4>
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
              {outOfStockProducts.length} items
            </span>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {outOfStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
              >
                <div className="flex items-center min-w-0">
                  <div className="p-2 bg-white rounded mr-2 sm:mr-3 flex-shrink-0">
                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 text-sm sm:text-base truncate">
                      {product.name}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Out since{" "}
                      {new Date(product.outSince).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <button className="px-2 sm:px-3 py-1 bg-red-600 text-white text-xs sm:text-sm rounded-lg hover:bg-red-700 flex-shrink-0">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RESPONSIVE CHANGE: Stack footer on mobile */}
      <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div className="text-xs sm:text-sm text-gray-600">
            <span className="font-medium">Total products:</span> 156 •{" "}
            <span className="text-green-600">138 in stock</span> •{" "}
            <span className="text-yellow-600">3 low stock</span> •{" "}
            <span className="text-red-600">1 out of stock</span>
          </div>
          <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium">
            Set up auto-reorder
          </button>
        </div>
      </div>
    </div>
  );
}
