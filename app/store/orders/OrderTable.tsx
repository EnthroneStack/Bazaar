// "use client";

// import {
//   Truck,
//   CheckCircle,
//   Clock,
//   XCircle,
//   MoreVertical,
//   Eye,
//   Download,
// } from "lucide-react";
// import { useState } from "react";

// const orders = [
//   {
//     id: "ORD-7842",
//     customer: "John Smith",
//     date: "2024-01-15",
//     amount: 249.99,
//     status: "processing",
//     items: 3,
//     payment: "paid",
//   },
//   {
//     id: "ORD-7841",
//     customer: "Sarah Johnson",
//     date: "2024-01-14",
//     amount: 89.5,
//     status: "shipped",
//     items: 2,
//     payment: "paid",
//   },
//   {
//     id: "ORD-7840",
//     customer: "Mike Wilson",
//     date: "2024-01-14",
//     amount: 129.99,
//     status: "delivered",
//     items: 1,
//     payment: "paid",
//   },
//   {
//     id: "ORD-7839",
//     customer: "Emma Davis",
//     date: "2024-01-13",
//     amount: 459.99,
//     status: "processing",
//     items: 5,
//     payment: "pending",
//   },
//   {
//     id: "ORD-7838",
//     customer: "Robert Brown",
//     date: "2024-01-12",
//     amount: 74.99,
//     status: "cancelled",
//     items: 2,
//     payment: "refunded",
//   },
//   {
//     id: "ORD-7837",
//     customer: "Lisa Miller",
//     date: "2024-01-12",
//     amount: 199.99,
//     status: "shipped",
//     items: 3,
//     payment: "paid",
//   },
// ];

// export default function OrderTable() {
//   const [statusFilter, setStatusFilter] = useState("all");

//   const getStatusBadge = (status: string) => {
//     const styles = {
//       processing: { bg: "bg-blue-100 text-blue-800", icon: Clock },
//       shipped: { bg: "bg-yellow-100 text-yellow-800", icon: Truck },
//       delivered: { bg: "bg-green-100 text-green-800", icon: CheckCircle },
//       cancelled: { bg: "bg-red-100 text-red-800", icon: XCircle },
//     };

//     const { bg, icon: Icon } = styles[status as keyof typeof styles];

//     return (
//       <span
//         className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${bg}`}
//       >
//         <Icon className="h-3 w-3 mr-1" />
//         <span className="hidden sm:inline">
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </span>
//         <span className="sm:hidden">{status.charAt(0).toUpperCase()}</span>
//       </span>
//     );
//   };

//   const getPaymentBadge = (status: string) => {
//     const styles = {
//       paid: "bg-green-100 text-green-800",
//       pending: "bg-yellow-100 text-yellow-800",
//       refunded: "bg-red-100 text-red-800",
//     };
//     return (
//       <span
//         className={`px-2 py-0.5 rounded text-xs font-medium ${
//           styles[status as keyof typeof styles]
//         }`}
//       >
//         <span className="hidden sm:inline">{status.toUpperCase()}</span>
//         <span className="sm:hidden">{status.charAt(0).toUpperCase()}</span>
//       </span>
//     );
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//       <div className="p-4 sm:p-6 border-b border-gray-200">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900">
//               Recent Orders
//             </h3>
//             <p className="text-sm text-gray-600">
//               Manage and track customer orders
//             </p>
//           </div>
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-4">
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm"
//             >
//               <option value="all">All Status</option>
//               <option value="processing">Processing</option>
//               <option value="shipped">Shipped</option>
//               <option value="delivered">Delivered</option>
//               <option value="cancelled">Cancelled</option>
//             </select>

//             <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center">
//               <Download className="h-4 w-4 mr-2" />
//               Export
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Order ID
//               </th>

//               <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Customer
//               </th>
//               <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Amount
//               </th>
//               <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Payment
//               </th>
//               <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {orders.map((order) => (
//               <tr key={order.id} className="hover:bg-gray-50">
//                 <td className="px-4 sm:px-6 py-4">
//                   <div className="font-medium text-blue-600 text-sm sm:text-base">
//                     {order.id}
//                   </div>
//                   <div className="text-xs sm:text-sm text-gray-500">
//                     {order.items} items
//                   </div>

//                   <div className="sm:hidden text-xs text-gray-500 mt-1">
//                     {order.customer}
//                   </div>
//                 </td>
//                 <td className="hidden sm:table-cell px-4 sm:px-6 py-4 font-medium text-gray-900">
//                   {order.customer}
//                 </td>
//                 <td className="hidden md:table-cell px-4 sm:px-6 py-4 text-gray-900">
//                   {new Date(order.date).toLocaleDateString()}
//                 </td>
//                 <td className="px-4 sm:px-6 py-4">
//                   <div className="font-bold text-gray-900 text-sm sm:text-base">
//                     ${order.amount.toFixed(2)}
//                   </div>
//                 </td>
//                 <td className="px-4 sm:px-6 py-4">
//                   {getStatusBadge(order.status)}
//                 </td>
//                 <td className="hidden lg:table-cell px-4 sm:px-6 py-4">
//                   {getPaymentBadge(order.payment)}
//                 </td>
//                 <td className="px-4 sm:px-6 py-4">
//                   <div className="flex items-center space-x-1 sm:space-x-2">
//                     <button className="p-1 sm:p-1.5 text-blue-600 hover:bg-blue-50 rounded">
//                       <Eye className="h-4 w-4" />
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
//           <div className="text-sm text-gray-700">Showing 6 of 1,248 orders</div>
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

import { useRouter, useSearchParams } from "next/navigation";
import {
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MoreVertical,
  Eye,
} from "lucide-react";

type Order = {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
  items: number;
  payment: string;
};

export default function OrderTable({
  orders,
  meta,
  currentStatus,
}: {
  orders: Order[];
  meta: {
    page: number;
    totalPages: number;
    total: number;
  };
  currentStatus: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", status);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4 border-b flex justify-between">
        <select
          value={currentStatus}
          onChange={(e) => updateFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <table className="w-full">
        <tbody className="divide-y">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="font-medium text-blue-600">{order.id}</div>
                <div className="text-xs text-gray-500">{order.items} items</div>
              </td>
              <td className="px-6 py-4 font-medium">{order.customer}</td>
              <td className="px-6 py-4">${order.amount.toFixed(2)}</td>
              <td className="px-6 py-4 capitalize">{order.status}</td>
              <td className="px-6 py-4">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 border-t text-sm text-gray-600">
        Showing page {meta.page} of {meta.totalPages} ({meta.total} orders)
      </div>
    </div>
  );
}
