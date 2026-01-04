// // components/store/customers/CustomerList.tsx
// "use client";

// import {
//   Mail,
//   Phone,
//   ShoppingBag,
//   Star,
//   MoreVertical,
//   MessageSquare,
// } from "lucide-react";
// import { useState } from "react";

// const customers = [
//   {
//     id: "CUST-001",
//     name: "John Smith",
//     email: "john.smith@email.com",
//     phone: "+1 (555) 123-4567",
//     orders: 12,
//     totalSpent: 1249.99,
//     lastOrder: "2024-01-15",
//     rating: 4.8,
//     status: "active",
//   },
//   {
//     id: "CUST-002",
//     name: "Sarah Johnson",
//     email: "sarah.j@email.com",
//     phone: "+1 (555) 987-6543",
//     orders: 8,
//     totalSpent: 859.5,
//     lastOrder: "2024-01-14",
//     rating: 4.5,
//     status: "active",
//   },
//   {
//     id: "CUST-003",
//     name: "Mike Wilson",
//     email: "mike.wilson@email.com",
//     phone: "+1 (555) 456-7890",
//     orders: 3,
//     totalSpent: 389.97,
//     lastOrder: "2024-01-14",
//     rating: 4.9,
//     status: "active",
//   },
//   {
//     id: "CUST-004",
//     name: "Emma Davis",
//     email: "emma.davis@email.com",
//     phone: "+1 (555) 321-6547",
//     orders: 15,
//     totalSpent: 2349.85,
//     lastOrder: "2024-01-13",
//     rating: 4.6,
//     status: "loyal",
//   },
//   {
//     id: "CUST-005",
//     name: "Robert Brown",
//     email: "robert.b@email.com",
//     phone: "+1 (555) 789-1234",
//     orders: 5,
//     totalSpent: 374.95,
//     lastOrder: "2024-01-12",
//     rating: 4.3,
//     status: "inactive",
//   },
// ];

// export default function CustomerList() {
//   const [search, setSearch] = useState("");

//   const getStatusBadge = (status: string) => {
//     const styles = {
//       active: "bg-green-100 text-green-800",
//       loyal: "bg-blue-100 text-blue-800",
//       inactive: "bg-gray-100 text-gray-800",
//     };
//     return (
//       <span
//         className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
//           styles[status as keyof typeof styles]
//         }`}
//       >
//         {status.toUpperCase()}
//       </span>
//     );
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center justify-between">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900">
//               Customer Database
//             </h3>
//             <p className="text-sm text-gray-600">
//               Manage and analyze your customer base
//             </p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <input
//               type="text"
//               placeholder="Search customers..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
//               Add Customer
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Customer
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Contact
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Orders
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Total Spent
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Rating
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
//             {customers.map((customer) => (
//               <tr key={customer.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4">
//                   <div className="flex items-center">
//                     <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//                       <span className="font-semibold text-blue-600">
//                         {customer.name
//                           .split(" ")
//                           .map((n) => n[0])
//                           .join("")}
//                       </span>
//                     </div>
//                     <div>
//                       <div className="font-medium text-gray-900">
//                         {customer.name}
//                       </div>
//                       <div className="text-sm text-gray-500">{customer.id}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="space-y-1">
//                     <div className="flex items-center text-sm">
//                       <Mail className="h-4 w-4 text-gray-400 mr-2" />
//                       {customer.email}
//                     </div>
//                     <div className="flex items-center text-sm text-gray-500">
//                       <Phone className="h-4 w-4 text-gray-400 mr-2" />
//                       {customer.phone}
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center">
//                     <ShoppingBag className="h-4 w-4 text-gray-400 mr-2" />
//                     <div>
//                       <div className="font-medium">
//                         {customer.orders} orders
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         Last:{" "}
//                         {new Date(customer.lastOrder).toLocaleDateString()}
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="font-bold text-gray-900">
//                     ${customer.totalSpent.toFixed(2)}
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     Avg: ${(customer.totalSpent / customer.orders).toFixed(2)}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center">
//                     <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
//                     <span className="font-medium">{customer.rating}</span>
//                     <span className="text-xs text-gray-500 ml-1">/5.0</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">{getStatusBadge(customer.status)}</td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center space-x-2">
//                     <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
//                       <MessageSquare className="h-4 w-4" />
//                     </button>
//                     <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded">
//                       <MoreVertical className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// components/store/customers/CustomerList.tsx
"use client";

import {
  Mail,
  Phone,
  ShoppingBag,
  Star,
  MoreVertical,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

const customers = [
  {
    id: "CUST-001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    orders: 12,
    totalSpent: 1249.99,
    lastOrder: "2024-01-15",
    rating: 4.8,
    status: "active",
  },
  {
    id: "CUST-002",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 987-6543",
    orders: 8,
    totalSpent: 859.5,
    lastOrder: "2024-01-14",
    rating: 4.5,
    status: "active",
  },
  {
    id: "CUST-003",
    name: "Mike Wilson",
    email: "mike.wilson@email.com",
    phone: "+1 (555) 456-7890",
    orders: 3,
    totalSpent: 389.97,
    lastOrder: "2024-01-14",
    rating: 4.9,
    status: "active",
  },
  {
    id: "CUST-004",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "+1 (555) 321-6547",
    orders: 15,
    totalSpent: 2349.85,
    lastOrder: "2024-01-13",
    rating: 4.6,
    status: "loyal",
  },
  {
    id: "CUST-005",
    name: "Robert Brown",
    email: "robert.b@email.com",
    phone: "+1 (555) 789-1234",
    orders: 5,
    totalSpent: 374.95,
    lastOrder: "2024-01-12",
    rating: 4.3,
    status: "inactive",
  },
];

export default function CustomerList() {
  const [search, setSearch] = useState("");

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      loyal: "bg-blue-100 text-blue-800",
      inactive: "bg-gray-100 text-gray-800",
    };
    return (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          styles[status as keyof typeof styles]
        }`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* RESPONSIVE CHANGE: Stack header on mobile */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Customer Database
            </h3>
            <p className="text-sm text-gray-600">
              Manage and analyze your customer base
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-4">
            {/* RESPONSIVE CHANGE: Full width search on mobile */}
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            {/* RESPONSIVE CHANGE: Full width button on mobile */}
            <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
              Add Customer
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {/* RESPONSIVE CHANGE: Hide some columns on mobile */}
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 bg-blue-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <span className="font-semibold text-blue-600 text-xs sm:text-sm">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 truncate text-sm sm:text-base">
                        {customer.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {customer.id}
                      </div>
                      {/* RESPONSIVE CHANGE: Show email on mobile (hidden on desktop) */}
                      <div className="md:hidden text-xs text-gray-500 truncate">
                        {customer.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell px-4 sm:px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="truncate">{customer.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-6 py-4">
                  <div className="flex items-center">
                    <ShoppingBag className="h-4 w-4 text-gray-400 mr-2" />
                    <div>
                      <div className="font-medium">
                        {customer.orders} orders
                      </div>
                      <div className="text-xs text-gray-500">
                        Last:{" "}
                        {new Date(customer.lastOrder).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="font-bold text-gray-900 text-sm sm:text-base">
                    ${customer.totalSpent.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Avg: ${(customer.totalSpent / customer.orders).toFixed(2)}
                  </div>
                </td>
                <td className="hidden lg:table-cell px-4 sm:px-6 py-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-medium">{customer.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">/5.0</span>
                  </div>
                </td>
                <td className="hidden md:table-cell px-4 sm:px-6 py-4">
                  {getStatusBadge(customer.status)}
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button className="p-1 sm:p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button className="p-1 sm:p-1.5 text-gray-600 hover:bg-gray-100 rounded">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
