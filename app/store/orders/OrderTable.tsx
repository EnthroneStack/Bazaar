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
// import { useRouter, useSearchParams } from "next/navigation";

// type Order = {
//   id: string;
//   rawId: string;
//   customer: string;
//   date: Date;
//   amount: number;
//   status: string;
//   items: number;
//   payment: "paid" | "pending" | "refunded";
// };

// export default function OrderTable({
//   orders,
//   meta,
//   currentStatus,
// }: {
//   orders: Order[];
//   meta: {
//     page: number;
//     totalPages: number;
//     total: number;
//   };
//   currentStatus: string;
// }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const setStatus = (status: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("status", status);
//     params.set("page", "1");
//     router.push(`?${params.toString()}`);
//   };

//   const goToPage = (page: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", String(page));
//     router.push(`?${params.toString()}`);
//   };

//   const getStatusBadge = (status: string) => {
//     const styles: Record<string, { bg: string; icon: any }> = {
//       processing: { bg: "bg-blue-100 text-blue-800", icon: Clock },
//       shipped: { bg: "bg-yellow-100 text-yellow-800", icon: Truck },
//       delivered: { bg: "bg-green-100 text-green-800", icon: CheckCircle },
//       cancelled: { bg: "bg-red-100 text-red-800", icon: XCircle },
//     };

//     const style = styles[status] ?? styles.processing;
//     const Icon = style.icon;

//     return (
//       <span
//         className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${style.bg}`}
//       >
//         <Icon className="h-3 w-3 mr-1" />
//         <span className="hidden sm:inline capitalize">{status}</span>
//         <span className="sm:hidden">{status[0].toUpperCase()}</span>
//       </span>
//     );
//   };

//   const getPaymentBadge = (payment: string) => {
//     const styles: Record<string, string> = {
//       paid: "bg-green-100 text-green-800",
//       pending: "bg-yellow-100 text-yellow-800",
//       refunded: "bg-red-100 text-red-800",
//     };

//     return (
//       <span
//         className={`px-2 py-0.5 rounded text-xs font-medium ${
//           styles[payment] ?? styles.pending
//         }`}
//       >
//         <span className="hidden sm:inline uppercase">{payment}</span>
//         <span className="sm:hidden">{payment[0].toUpperCase()}</span>
//       </span>
//     );
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//       {/* Header */}
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

//           <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
//             <select
//               value={currentStatus}
//               onChange={(e) => setStatus(e.target.value)}
//               className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
//             >
//               <option value="all">All Status</option>
//               <option value="processing">Processing</option>
//               <option value="shipped">Shipped</option>
//               <option value="delivered">Delivered</option>
//               <option value="cancelled">Cancelled</option>
//             </select>

//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center">
//               <Download className="h-4 w-4 mr-2" />
//               Export
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Order ID
//               </th>
//               <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Customer
//               </th>
//               <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Status
//               </th>
//               <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Payment
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-200">
//             {orders.map((order) => (
//               <tr key={order.rawId} className="hover:bg-gray-50">
//                 <td className="px-4 sm:px-6 py-4">
//                   <div className="font-medium text-blue-600">{order.id}</div>
//                   <div className="text-xs text-gray-500">
//                     {order.items} items
//                   </div>
//                   <div className="sm:hidden text-xs text-gray-500 mt-1">
//                     {order.customer}
//                   </div>
//                 </td>

//                 <td className="hidden sm:table-cell px-6 py-4 font-medium">
//                   {order.customer}
//                 </td>

//                 <td className="hidden md:table-cell px-6 py-4">
//                   {new Date(order.date).toLocaleDateString()}
//                 </td>

//                 <td className="px-6 py-4 font-bold">
//                   ${order.amount.toFixed(2)}
//                 </td>

//                 <td className="px-6 py-4">{getStatusBadge(order.status)}</td>

//                 <td className="hidden lg:table-cell px-6 py-4">
//                   {getPaymentBadge(order.payment)}
//                 </td>

//                 <td className="px-6 py-4">
//                   <div className="flex space-x-2">
//                     <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
//                       <Eye className="h-4 w-4" />
//                     </button>
//                     <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded">
//                       <MoreVertical className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}

//             {orders.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={7}
//                   className="text-center py-10 text-sm text-gray-500"
//                 >
//                   No orders found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4 text-sm">
//         <span>
//           Page {meta.page} of {meta.totalPages} ({meta.total} orders)
//         </span>
//         <div className="flex space-x-2">
//           <button
//             disabled={meta.page === 1}
//             onClick={() => goToPage(meta.page - 1)}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             disabled={meta.page === meta.totalPages}
//             onClick={() => goToPage(meta.page + 1)}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MoreVertical,
  Eye,
  Download,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Order = {
  id: string;
  rawId: string;
  customer: string;
  date: Date;
  amount: number;
  status: string;
  items: number;
  payment: "paid" | "pending" | "refunded";
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

  const setStatus = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", status);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<
      string,
      {
        variant: "default" | "secondary" | "destructive" | "outline";
        icon: any;
      }
    > = {
      processing: { variant: "secondary", icon: Clock },
      shipped: { variant: "outline", icon: Truck },
      delivered: { variant: "default", icon: CheckCircle },
      cancelled: { variant: "destructive", icon: XCircle },
    };

    const style = styles[status] ?? styles.processing;
    const Icon = style.icon;

    return (
      <Badge variant={style.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        <span className="hidden sm:inline capitalize">{status}</span>
        <span className="sm:hidden">{status[0].toUpperCase()}</span>
      </Badge>
    );
  };

  const getPaymentBadge = (payment: string) => {
    const styles: Record<
      string,
      {
        variant: "default" | "secondary" | "destructive" | "outline";
        color?: string;
      }
    > = {
      paid: { variant: "default" },
      pending: { variant: "outline" },
      refunded: { variant: "destructive" },
    };

    const style = styles[payment] ?? styles.pending;

    return (
      <Badge variant={style.variant} className="uppercase">
        <span className="hidden sm:inline">{payment}</span>
        <span className="sm:hidden">{payment[0].toUpperCase()}</span>
      </Badge>
    );
  };

  return (
    <Card className="border-gray-200 overflow-hidden">
      {/* Header */}
      <CardHeader className="border-b border-gray-200 pb-4 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg sm:text-xl text-gray-900">
              Recent Orders
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Manage and track customer orders
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <Select value={currentStatus} onValueChange={setStatus}>
              <SelectTrigger className="w-full sm:w-[180px] border-gray-300">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-blue-600 hover:bg-blue-700 text-sm">
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden xs:inline">Export</span>
              <span className="xs:hidden">Export</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </TableHead>
                <TableHead className="hidden sm:table-cell px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Customer
                </TableHead>
                <TableHead className="hidden md:table-cell px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Date
                </TableHead>
                <TableHead className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Amount
                </TableHead>
                <TableHead className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Status
                </TableHead>
                <TableHead className="hidden lg:table-cell px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Payment
                </TableHead>
                <TableHead className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.rawId} className="hover:bg-gray-50">
                  <TableCell className="px-4 sm:px-6 py-4">
                    <div className="font-medium text-blue-600">{order.id}</div>
                    <div className="text-xs text-gray-500">
                      {order.items} items
                    </div>
                    <div className="sm:hidden text-xs text-gray-500 mt-1">
                      {order.customer}
                    </div>
                  </TableCell>

                  <TableCell className="hidden sm:table-cell px-6 py-4 font-medium">
                    {order.customer}
                  </TableCell>

                  <TableCell className="hidden md:table-cell px-6 py-4">
                    {new Date(order.date).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="px-6 py-4 font-bold">
                    ${order.amount.toFixed(2)}
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    {getStatusBadge(order.status)}
                  </TableCell>

                  <TableCell className="hidden lg:table-cell px-6 py-4">
                    {getPaymentBadge(order.payment)}
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-600 hover:bg-gray-100"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Order</DropdownMenuItem>
                          <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {orders.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-sm text-gray-500"
                  >
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4 text-sm items-center">
          <span className="text-gray-600">
            Page {meta.page} of {meta.totalPages} ({meta.total} orders)
          </span>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page === 1}
              onClick={() => goToPage(meta.page - 1)}
              className="disabled:opacity-50"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page === meta.totalPages}
              onClick={() => goToPage(meta.page + 1)}
              className="disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
