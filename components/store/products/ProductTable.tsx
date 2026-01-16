// "use client";

// import {
//   Edit,
//   Eye,
//   MoreVertical,
//   Star,
//   Package,
//   DollarSign,
// } from "lucide-react";

// export default function ProductTable({
//   products,
//   loading,
// }: {
//   products: any[];
//   loading: boolean;
// }) {
//   const getStatusBadge = (status: string) => {
//     const styles = {
//       published: "bg-green-100 text-green-800",
//       draft: "bg-yellow-100 text-yellow-800",
//       archived: "bg-gray-100 text-gray-800",
//       "out-of-stock": "bg-red-100 text-red-800",
//     };
//     return (
//       <span
//         className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//           styles[status as keyof typeof styles]
//         }`}
//       >
//         {status.replace("-", " ").toUpperCase()}
//       </span>
//     );
//   };

//   if (loading) {
//     return <div className="p-6 text-sm">Loading...</div>;
//   }

//   if (!loading && products.length === 0) {
//     return (
//       <div className="p-6 text-sm text-muted-foreground">No products found</div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 sm:px-6 py-3 text-left">
//                 <input
//                   type="checkbox"
//                   className="rounded text-blue-600 h-4 w-4"
//                 />
//               </th>
//               <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Product
//               </th>

//               <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Category
//               </th>
//               <th className="hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Price
//               </th>
//               <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Stock
//               </th>
//               <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Sales
//               </th>
//               <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {products.map((product) => (
//               <tr key={product.id} className="hover:bg-gray-50">
//                 <td className="px-4 sm:px-6 py-4">
//                   <input
//                     type="checkbox"
//                     className="rounded text-blue-600 h-4 w-4"
//                   />
//                 </td>
//                 <td className="px-4 sm:px-6 py-4">
//                   <div className="flex items-center">
//                     <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
//                       <Package className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//                     </div>
//                     <div className="min-w-0">
//                       <div className="font-medium text-gray-900 text-sm sm:text-base truncate">
//                         {product.name}
//                       </div>
//                       <div className="text-xs sm:text-sm text-gray-500 truncate">
//                         {product.sku ?? "—"}
//                       </div>
//                       <div className="flex items-center mt-1">
//                         <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
//                         <span className="text-xs text-gray-600">
//                           {product.rating ?? "—"}
//                         </span>
//                       </div>

//                       <div className="md:hidden text-xs text-gray-500 mt-1">
//                         ${Number(product.price).toFixed(2)}
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="hidden md:table-cell px-4 sm:px-6 py-4">
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                     {product.category?.name ?? "—"}
//                   </span>
//                 </td>
//                 <td className="hidden lg:table-cell px-4 sm:px-6 py-4">
//                   <div className="flex items-center">
//                     <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
//                     <span className="font-medium">
//                       {Number(product.price).toFixed(2)}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-4 sm:px-6 py-4">
//                   <div
//                     className={`font-medium text-sm sm:text-base ${
//                       product.stockQuantity < 10
//                         ? "text-yellow-600"
//                         : "text-green-600"
//                     }`}
//                   >
//                     {product.stockQuantity} units
//                   </div>
//                 </td>
//                 <td className="hidden sm:table-cell px-4 sm:px-6 py-4">
//                   {product.stockQuantity <= 0
//                     ? getStatusBadge("out-of-stock")
//                     : getStatusBadge(product.status)}
//                 </td>

//                 <td className="hidden md:table-cell px-4 sm:px-6 py-4">
//                   <div className="font-medium">{product.sales ?? "—"}</div>
//                   <div className="text-xs text-gray-500">total sales</div>
//                 </td>

//                 <td className="px-4 sm:px-6 py-4">
//                   <div className="flex items-center space-x-1 sm:space-x-2">
//                     <button className="p-1 sm:p-1.5 text-blue-600 hover:bg-blue-50 rounded">
//                       <Eye className="h-4 w-4" />
//                     </button>
//                     <button className="p-1 sm:p-1.5 text-green-600 hover:bg-green-50 rounded">
//                       <Edit className="h-4 w-4" />
//                     </button>
//                     <button className="p-1 sm:p-1.5 text-gray-600 hover:bg-gray-100 rounded">
//                       <MoreVertical className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="text-sm text-gray-700">Showing 6 of 156 products</div>
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

"use client";

import {
  Edit,
  Eye,
  MoreVertical,
  Star,
  Package,
  DollarSign,
} from "lucide-react";

export default function ProductTable({
  products,
  loading,
}: {
  products: any[];
  loading: boolean;
}) {
  const getStatusBadge = (status: string) => {
    const styles = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800",
      "out-of-stock": "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
          styles[status as keyof typeof styles]
        }`}
      >
        {status.replace("-", " ").toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return <div className="p-6 text-sm">Loading...</div>;
  }

  if (!loading && products.length === 0) {
    return (
      <div className="p-6 text-sm text-muted-foreground">No products found</div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">
                <input type="checkbox" className="h-4 w-4" />
              </th>
              <th className="px-3 py-2 text-left">Product</th>
              <th className="px-3 py-2 text-left">Category</th>
              <th className="px-3 py-2 text-left">Price</th>
              <th className="px-3 py-2 text-left">Stock</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Sales</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-3 py-3 align-top">
                  <input type="checkbox" className="h-4 w-4" />
                </td>

                {/* PRODUCT */}
                <td className="px-3 py-3 min-w-[220px]">
                  <div className="flex gap-2">
                    <div className="h-9 w-9 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
                      <Package className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-medium text-gray-900 break-words">
                        {product.name}
                      </div>
                      <div className="text-gray-500">{product.sku ?? "—"}</div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span>{product.rating ?? "—"}</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* CATEGORY */}
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded bg-gray-100">
                    {product.category?.name ?? "—"}
                  </span>
                </td>

                {/* PRICE */}
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-gray-400" />
                    {Number(product.price).toFixed(2)}
                  </div>
                </td>

                {/* STOCK */}
                <td className="px-3 py-3 whitespace-nowrap">
                  <span
                    className={`font-medium ${
                      product.stockQuantity < 10
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {product.stockQuantity} units
                  </span>
                </td>

                {/* STATUS */}
                <td className="px-3 py-3 whitespace-nowrap">
                  {product.stockQuantity <= 0
                    ? getStatusBadge("out-of-stock")
                    : getStatusBadge(product.status)}
                </td>

                {/* SALES */}
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="font-medium">{product.sales ?? "—"}</div>
                  <div className="text-[10px] text-gray-500">total sales</div>
                </td>

                {/* ACTIONS */}
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="flex gap-1">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-green-600 hover:bg-green-50 rounded">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="px-4 py-3 border-t text-xs sm:text-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <span>Showing {products.length} products</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded">Previous</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
