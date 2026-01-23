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
import { cn } from "@/lib/utils";

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
      { variant: string; icon: any; label: string }
    > = {
      processing: { variant: "secondary", icon: Clock, label: "Processing" },
      shipped: { variant: "outline", icon: Truck, label: "Shipped" },
      delivered: { variant: "default", icon: CheckCircle, label: "Delivered" },
      cancelled: { variant: "destructive", icon: XCircle, label: "Cancelled" },
    };

    const style = styles[status] ?? styles.processing;
    const Icon = style.icon;

    return (
      <Badge
        variant={style.variant as any}
        className={cn(
          "gap-1 text-xs px-2 py-0.5",
          status === "processing" &&
            "bg-blue-100 text-blue-800 border-blue-200",
          status === "shipped" &&
            "bg-yellow-100 text-yellow-800 border-yellow-200",
          status === "delivered" &&
            "bg-green-100 text-green-800 border-green-200",
          status === "cancelled" && "bg-red-100 text-red-800 border-red-200",
        )}
      >
        <Icon className="h-3 w-3" />
        <span className="hidden sm:inline">{style.label}</span>
        <span className="sm:hidden">{style.label}</span>
      </Badge>
    );
  };

  const getPaymentBadge = (payment: string) => {
    const styles: Record<string, { variant: string; label: string }> = {
      paid: { variant: "default", label: "Paid" },
      pending: { variant: "outline", label: "Pending" },
      refunded: { variant: "destructive", label: "Refunded" },
    };

    const style = styles[payment] ?? styles.pending;

    return (
      <Badge
        variant={style.variant as any}
        className={cn(
          "text-xs px-2 py-0.5",
          payment === "paid" && "bg-green-100 text-green-800 border-green-200",
          payment === "pending" &&
            "bg-yellow-100 text-yellow-800 border-yellow-200",
          payment === "refunded" && "bg-red-100 text-red-800 border-red-200",
        )}
      >
        <span className="hidden sm:inline">{style.label}</span>
        <span className="sm:hidden">{style.label}</span>
      </Badge>
    );
  };

  return (
    <Card className="border-gray-200 overflow-hidden">
      {/* Header */}
      <CardHeader className="border-b border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-lg sm:text-xl text-gray-900">
              Recent orders
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Manage and track customer orders
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <Select value={currentStatus} onValueChange={setStatus}>
              <SelectTrigger className="w-full sm:w-[140px] border-gray-300 h-9 text-sm">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Button
              className="bg-[#0d97d9] hover:bg-[#1e79bd] text-white text-sm h-9 px-3"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              <span>Export</span>
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
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-500">
                  Order ID
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-500">
                  Customer
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-500">
                  Date
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-500">
                  Amount
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-500">
                  Status
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-500">
                  Payment
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.rawId}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    // TODO: Implement order detail navigation
                    console.log("Navigate to order detail:", order.id);
                  }}
                >
                  <TableCell className="px-4 py-3">
                    <div className="font-medium text-[#0d97d9]">{order.id}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {order.items} items
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3 font-medium text-sm">
                    {order.customer}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-sm">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>

                  <TableCell className="px-4 py-3 font-bold text-sm">
                    ${order.amount.toFixed(2)}
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    {getStatusBadge(order.status)}
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    {getPaymentBadge(order.payment)}
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-600 hover:bg-gray-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Implement view order
                            console.log("View order:", order.id);
                          }}
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View order
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Implement edit order
                            console.log("Edit order:", order.id);
                          }}
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Edit order
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Implement cancel order
                            console.log("Cancel order:", order.id);
                          }}
                          className="cursor-pointer text-red-600"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
        <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-3 text-sm items-center">
          <span className="text-gray-600 text-sm">
            Page {meta.page} of {meta.totalPages} ({meta.total} orders)
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page === 1}
              onClick={() => goToPage(meta.page - 1)}
              className="disabled:opacity-50 h-8 text-xs"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page === meta.totalPages}
              onClick={() => goToPage(meta.page + 1)}
              className="disabled:opacity-50 h-8 text-xs"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
