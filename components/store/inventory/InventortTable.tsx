// // components/store/inventory/InventoryTable.tsx
// "use client";

// import {
//   Package,
//   MoreVertical,
//   AlertTriangle,
//   CheckCircle,
// } from "lucide-react";
// import { useState } from "react";

// const inventoryData = [
//   {
//     id: "PROD-001",
//     name: "Wireless Bluetooth Headphones",
//     sku: "WH-2024-BLK",
//     category: "Electronics",
//     stock: 45,
//     reserved: 5,
//     available: 40,
//     lowStock: 10,
//     status: "in-stock",
//   },
//   {
//     id: "PROD-002",
//     name: "Organic Cotton T-Shirt",
//     sku: "TS-2024-WHT",
//     category: "Fashion",
//     stock: 8,
//     reserved: 2,
//     available: 6,
//     lowStock: 15,
//     status: "low-stock",
//   },
//   {
//     id: "PROD-003",
//     name: "Stainless Steel Water Bottle",
//     sku: "WB-2024-SS",
//     category: "Home",
//     stock: 0,
//     reserved: 0,
//     available: 0,
//     lowStock: 5,
//     status: "out-of-stock",
//   },
//   {
//     id: "PROD-004",
//     name: "Smart Fitness Watch",
//     sku: "FW-2024-BLK",
//     category: "Electronics",
//     stock: 152,
//     reserved: 12,
//     available: 140,
//     lowStock: 20,
//     status: "in-stock",
//   },
//   {
//     id: "PROD-005",
//     name: "Ceramic Coffee Mug Set",
//     sku: "CM-2024-SET",
//     category: "Home",
//     stock: 23,
//     reserved: 3,
//     available: 20,
//     lowStock: 10,
//     status: "in-stock",
//   },
//   {
//     id: "PROD-006",
//     name: "Yoga Mat Premium",
//     sku: "YM-2024-PRM",
//     category: "Sports",
//     stock: 4,
//     reserved: 1,
//     available: 3,
//     lowStock: 8,
//     status: "low-stock",
//   },
// ];

// export default function InventoryTable() {
//   const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
//   const [sortBy, setSortBy] = useState("name");
//   const [sortOrder, setSortOrder] = useState("asc");

//   const handleSelectAll = () => {
//     if (selectedProducts.length === inventoryData.length) {
//       setSelectedProducts([]);
//     } else {
//       setSelectedProducts(inventoryData.map((product) => product.id));
//     }
//   };

//   const handleSelectProduct = (id: string) => {
//     if (selectedProducts.includes(id)) {
//       setSelectedProducts(
//         selectedProducts.filter((productId) => productId !== id)
//       );
//     } else {
//       setSelectedProducts([...selectedProducts, id]);
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "in-stock":
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//             <CheckCircle className="h-3 w-3 mr-1" />
//             In Stock
//           </span>
//         );
//       case "low-stock":
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//             <AlertTriangle className="h-3 w-3 mr-1" />
//             Low Stock
//           </span>
//         );
//       case "out-of-stock":
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//             <Package className="h-3 w-3 mr-1" />
//             Out of Stock
//           </span>
//         );
//       default:
//         return null;
//     }
//   };

//   const getStockPercentage = (stock: number, lowStock: number) => {
//     if (stock === 0) return 0;
//     const percentage = (stock / (lowStock * 3)) * 100;
//     return Math.min(percentage, 100);
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center justify-between">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900">
//               Product Inventory
//             </h3>
//             <p className="text-sm text-gray-600">
//               {inventoryData.length} products
//             </p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
//               <option>Bulk Actions</option>
//               <option>Update Stock</option>
//               <option>Export CSV</option>
//               <option>Archive Selected</option>
//             </select>
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
//               Apply
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left">
//                 <input
//                   type="checkbox"
//                   checked={selectedProducts.length === inventoryData.length}
//                   onChange={handleSelectAll}
//                   className="rounded text-blue-600"
//                 />
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Product
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Stock Level
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Available
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {inventoryData.map((product) => {
//               const stockPercentage = getStockPercentage(
//                 product.stock,
//                 product.lowStock
//               );
//               return (
//                 <tr key={product.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">
//                     <input
//                       type="checkbox"
//                       checked={selectedProducts.includes(product.id)}
//                       onChange={() => handleSelectProduct(product.id)}
//                       className="rounded text-blue-600"
//                     />
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
//                         <Package className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-900">
//                           {product.name}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {product.sku}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                       {product.category}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="space-y-2">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">
//                           Stock: {product.stock}
//                         </span>
//                         <span className="text-gray-500">
//                           Low: {product.lowStock}
//                         </span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div
//                           className={`h-2 rounded-full ${
//                             stockPercentage > 50
//                               ? "bg-green-500"
//                               : stockPercentage > 20
//                               ? "bg-yellow-500"
//                               : "bg-red-500"
//                           }`}
//                           style={{ width: `${stockPercentage}%` }}
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-center">
//                       <div className="font-semibold text-gray-900">
//                         {product.available}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         Reserved: {product.reserved}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     {getStatusBadge(product.status)}
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center space-x-2">
//                       <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
//                         Update
//                       </button>
//                       <button className="p-1 hover:bg-gray-100 rounded">
//                         <MoreVertical className="h-4 w-4 text-gray-500" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       <div className="px-6 py-4 border-t border-gray-200">
//         <div className="flex items-center justify-between">
//           <div className="text-sm text-gray-700">
//             Showing <span className="font-medium">1</span> to{" "}
//             <span className="font-medium">{inventoryData.length}</span> of{" "}
//             <span className="font-medium">{inventoryData.length}</span> results
//           </div>
//           <div className="flex items-center space-x-2">
//             <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
//               Previous
//             </button>
//             <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
//               1
//             </button>
//             <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
//               2
//             </button>
//             <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// components/store/inventory/InventoryTable.tsx
"use client";

import {
  Package,
  MoreVertical,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

const inventoryData = [
  {
    id: "PROD-001",
    name: "Wireless Bluetooth Headphones",
    sku: "WH-2024-BLK",
    category: "Electronics",
    stock: 45,
    reserved: 5,
    available: 40,
    lowStock: 10,
    status: "in-stock",
  },
  {
    id: "PROD-002",
    name: "Organic Cotton T-Shirt",
    sku: "TS-2024-WHT",
    category: "Fashion",
    stock: 8,
    reserved: 2,
    available: 6,
    lowStock: 15,
    status: "low-stock",
  },
  {
    id: "PROD-003",
    name: "Stainless Steel Water Bottle",
    sku: "WB-2024-SS",
    category: "Home",
    stock: 0,
    reserved: 0,
    available: 0,
    lowStock: 5,
    status: "out-of-stock",
  },
  {
    id: "PROD-004",
    name: "Smart Fitness Watch",
    sku: "FW-2024-BLK",
    category: "Electronics",
    stock: 152,
    reserved: 12,
    available: 140,
    lowStock: 20,
    status: "in-stock",
  },
  {
    id: "PROD-005",
    name: "Ceramic Coffee Mug Set",
    sku: "CM-2024-SET",
    category: "Home",
    stock: 23,
    reserved: 3,
    available: 20,
    lowStock: 10,
    status: "in-stock",
  },
  {
    id: "PROD-006",
    name: "Yoga Mat Premium",
    sku: "YM-2024-PRM",
    category: "Sports",
    stock: 4,
    reserved: 1,
    available: 3,
    lowStock: 8,
    status: "low-stock",
  },
];

export default function InventoryTable() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-stock":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            In Stock
          </span>
        );
      case "low-stock":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Low Stock
          </span>
        );
      case "out-of-stock":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <Package className="h-3 w-3 mr-1" />
            Out of Stock
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* RESPONSIVE CHANGE: Stack header on mobile */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Product Inventory
            </h3>
            <p className="text-sm text-gray-600">
              {inventoryData.length} products
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-4">
            {/* RESPONSIVE CHANGE: Full width select on mobile */}
            <select className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Bulk Actions</option>
              <option>Update Stock</option>
              <option>Export CSV</option>
              <option>Archive Selected</option>
            </select>
            {/* RESPONSIVE CHANGE: Full width button on mobile */}
            <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left">
                <input type="checkbox" className="rounded text-blue-600" />
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              {/* RESPONSIVE CHANGE: Hide some columns on mobile */}
              <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Level
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Available
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {inventoryData.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-4">
                  <input type="checkbox" className="rounded text-blue-600" />
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <Package className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {product.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate">
                        {product.sku}
                      </div>
                      {/* RESPONSIVE CHANGE: Show category on mobile (hidden in table) */}
                      <div className="sm:hidden text-xs text-gray-500 mt-1">
                        {product.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {product.category}
                  </span>
                </td>
                <td className="hidden md:table-cell px-4 sm:px-6 py-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Stock: {product.stock}
                      </span>
                      <span className="text-gray-500">
                        Low: {product.lowStock}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          product.stock > product.lowStock * 1.5
                            ? "bg-green-500"
                            : product.stock > product.lowStock
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${Math.min(
                            (product.stock / (product.lowStock * 3)) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">
                      {product.available}
                    </div>
                    <div className="text-xs text-gray-500">
                      Reserved: {product.reserved}
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  {getStatusBadge(product.status)}
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium">
                      Update
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RESPONSIVE CHANGE: Stack pagination on mobile */}
      <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{inventoryData.length}</span> of{" "}
            <span className="font-medium">{inventoryData.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
