"use client";

import {
  X,
  Calendar,
  User,
  MapPin,
  Package,
  CreditCard,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Printer,
  Mail,
  Copy,
  Check,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface OrderDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: any; // Will be wired later
}

const timelineSteps = [
  { status: "order_placed", label: "Order Placed", icon: Calendar },
  { status: "processing", label: "Processing", icon: Package },
  { status: "shipped", label: "Shipped", icon: Truck },
  { status: "delivered", label: "Delivered", icon: CheckCircle },
];

export default function OrderDetailsModal({
  open,
  onOpenChange,
  order,
}: OrderDetailsModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const dummyOrder = {
    id: "ORD-7890-1234",
    createdAt: new Date("2024-03-15T10:30:00"),
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "stripe",
    customer: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
    },
    shippingAddress: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94107",
      country: "USA",
    },
    items: [
      {
        id: 1,
        name: "Premium Headphones",
        quantity: 1,
        price: 299.99,
        sku: "PH-2024",
      },
      { id: 2, name: "USB-C Cable", quantity: 2, price: 19.99, sku: "UC-100" },
      { id: 3, name: "Phone Case", quantity: 1, price: 34.99, sku: "PC-456" },
    ],
    subtotal: 374.96,
    shipping: 9.99,
    tax: 32.25,
    discount: 20.0,
    total: 397.2,
    notes: "Please leave package at the front door if no one is home.",
  };

  const orderData = adaptOrderToDetails(order) ?? dummyOrder;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return Clock;
      case "shipped":
        return Truck;
      case "delivered":
        return CheckCircle;
      case "cancelled":
        return XCircle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "refunded":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Order ID copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  function adaptOrderToDetails(order: any) {
    if (!order) return null;

    return {
      id: order.id,
      createdAt: order.date ?? new Date(),
      status: order.status,
      paymentStatus: order.payment ?? "pending",
      paymentMethod: "stripe",

      customer: {
        name: order.customer,
        email: "unknown@email.com",
        phone: "—",
      },

      shippingAddress: {
        street: "—",
        city: "—",
        state: "—",
        zipCode: "—",
        country: "—",
      },

      items: [
        {
          id: 1,
          name: "Order items summary",
          quantity: order.items,
          price: order.amount / Math.max(order.items, 1),
          sku: "N/A",
        },
      ],

      subtotal: order.amount,
      shipping: 0,
      tax: 0,
      discount: 0,
      total: order.amount,
      notes: null,
    };
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white">
        {/* Header - Sticky */}
        <div className="sticky top-0 z-10 bg-white border-b p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                Order #{orderData.id}
              </DialogTitle>
              <div className="flex gap-2">
                <Badge
                  className={cn(
                    "text-xs px-2 py-1",
                    getStatusColor(orderData.status),
                  )}
                >
                  <span className="hidden sm:inline capitalize">
                    {orderData.status}
                  </span>
                  <span className="sm:hidden">
                    {orderData.status.charAt(0).toUpperCase()}
                  </span>
                </Badge>
                <Badge
                  className={cn(
                    "text-xs px-2 py-1",
                    getPaymentColor(orderData.paymentStatus),
                  )}
                >
                  <span className="hidden sm:inline capitalize">
                    {orderData.paymentStatus}
                  </span>
                  <span className="sm:hidden">
                    {orderData.paymentStatus.charAt(0).toUpperCase()}
                  </span>
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => copyToClipboard(orderData.id)}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Placed on{" "}
            {new Date(orderData.createdAt).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <ScrollArea className="max-h-[calc(100vh-200px)] sm:max-h-[70vh]">
          <div className="p-4 sm:p-6">
            <Tabs
              defaultValue="details"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="details" className="text-xs sm:text-sm">
                  <Package className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Details</span>
                  <span className="sm:hidden">Details</span>
                </TabsTrigger>
                <TabsTrigger value="timeline" className="text-xs sm:text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Timeline</span>
                  <span className="sm:hidden">Time</span>
                </TabsTrigger>
                <TabsTrigger value="customer" className="text-xs sm:text-sm">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Customer</span>
                  <span className="sm:hidden">Customer</span>
                </TabsTrigger>
              </TabsList>

              {/* Order Details Tab */}
              <TabsContent value="details" className="space-y-6">
                {/* Order Items */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold">
                      Order Items
                    </CardTitle>
                    <CardDescription>
                      {orderData.items?.length ?? 0} items in this order
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {orderData.items.map((item: any, index: number) => (
                        <div
                          key={item.id}
                          className="px-4 sm:px-6 py-4 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Package className="h-5 w-5 text-gray-400" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{item.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500">
                                  SKU: {item.sku}
                                </span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500">
                                  Qty: {item.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              ${item.price.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">
                              ${(item.price * item.quantity).toFixed(2)} total
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Order Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold">
                          Order Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Subtotal
                            </span>
                            <span className="font-medium">
                              ${orderData.subtotal.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Shipping
                            </span>
                            <span className="font-medium">
                              ${orderData.shipping.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Tax</span>
                            <span className="font-medium">
                              ${orderData.tax.toFixed(2)}
                            </span>
                          </div>
                          {orderData.discount > 0 && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Discount
                              </span>
                              <span className="font-medium text-green-600">
                                -${orderData.discount.toFixed(2)}
                              </span>
                            </div>
                          )}
                          <Separator />
                          <div className="flex justify-between">
                            <span className="text-sm font-semibold">Total</span>
                            <span className="text-lg font-bold">
                              ${orderData.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold">
                          Payment Info
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium">
                              Payment Method
                            </span>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {orderData.paymentMethod === "stripe"
                              ? "Credit Card"
                              : orderData.paymentMethod}
                          </Badge>
                        </div>
                        {orderData.notes && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span className="text-sm font-medium">
                                Order Notes
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                              {orderData.notes}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Timeline Tab */}
              <TabsContent value="timeline" className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold">
                      Order Timeline
                    </CardTitle>
                    <CardDescription>
                      Track the progress of this order
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {timelineSteps.map((step, index) => {
                        const StepIcon = step.icon;
                        const isActive = step.status === orderData.status;
                        const isCompleted =
                          step.status === "order_placed" ||
                          (step.status === "processing" &&
                            ["processing", "shipped", "delivered"].includes(
                              orderData.status,
                            )) ||
                          (step.status === "shipped" &&
                            ["shipped", "delivered"].includes(
                              orderData.status,
                            )) ||
                          (step.status === "delivered" &&
                            orderData.status === "delivered");

                        return (
                          <div
                            key={step.status}
                            className="flex items-start gap-4"
                          >
                            <div className="flex flex-col items-center">
                              <div
                                className={cn(
                                  "h-8 w-8 rounded-full flex items-center justify-center",
                                  isCompleted
                                    ? "bg-green-100 text-green-600"
                                    : isActive
                                      ? "bg-blue-100 text-blue-600"
                                      : "bg-gray-100 text-gray-400",
                                )}
                              >
                                <StepIcon className="h-4 w-4" />
                              </div>
                              {index < timelineSteps.length - 1 && (
                                <div
                                  className={cn(
                                    "w-0.5 h-8 mt-2",
                                    isCompleted
                                      ? "bg-green-200"
                                      : "bg-gray-200",
                                  )}
                                />
                              )}
                            </div>
                            <div className="flex-1 pt-1">
                              <p
                                className={cn(
                                  "font-medium",
                                  isCompleted
                                    ? "text-green-700"
                                    : isActive
                                      ? "text-blue-700"
                                      : "text-gray-500",
                                )}
                              >
                                {step.label}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {isCompleted
                                  ? "Completed"
                                  : isActive
                                    ? "In progress"
                                    : "Pending"}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions Card */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold">
                      Order Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {orderData.status === "processing" && (
                        <Button className="bg-[#0d97d9] hover:bg-[#1e79bd] h-10 text-sm">
                          <Truck className="h-4 w-4 mr-2" />
                          Mark as Shipped
                        </Button>
                      )}
                      {orderData.status === "shipped" && (
                        <Button className="bg-[#0d97d9] hover:bg-[#1e79bd] h-10 text-sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Delivered
                        </Button>
                      )}
                      {orderData.paymentStatus === "pending" &&
                        orderData.paymentMethod === "cod" && (
                          <Button className="bg-green-600 hover:bg-green-700 h-10 text-sm">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Mark COD as Paid
                          </Button>
                        )}
                      {orderData.status !== "cancelled" &&
                        orderData.status !== "delivered" && (
                          <Button
                            variant="destructive"
                            className="h-10 text-sm"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel Order
                          </Button>
                        )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Customer Tab */}
              <TabsContent value="customer" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Info */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold">
                        Customer Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-semibold">
                              {orderData.customer?.name ?? "—"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {orderData.customer.email}
                            </p>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">
                              {orderData.customer.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">
                              {orderData.customer.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Address */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold">
                        Shipping Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-semibold">
                              {orderData.customer?.name ?? "—"}
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {orderData.shippingAddress.street}
                              <br />
                              {orderData.shippingAddress.city},{" "}
                              {orderData.shippingAddress.state}{" "}
                              {orderData.shippingAddress.zipCode}
                              <br />
                              {orderData.shippingAddress.country}
                            </p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Shipping Method
                          </span>
                          <span className="text-sm font-medium">
                            Standard Delivery
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold">
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Button variant="outline" className="h-10 text-sm">
                        <Printer className="h-4 w-4 mr-2" />
                        Print Invoice
                      </Button>
                      <Button variant="outline" className="h-10 text-sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Customer
                      </Button>
                      <Button variant="outline" className="h-10 text-sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>

        {/* Footer - Sticky */}
        <div className="sticky bottom-0 border-t bg-white p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            <div className="text-sm text-gray-600">
              Need help? Contact support
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-10 text-sm"
              >
                Close
              </Button>
              <Button className="bg-[#0d97d9] hover:bg-[#1e79bd] h-10 text-sm">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
