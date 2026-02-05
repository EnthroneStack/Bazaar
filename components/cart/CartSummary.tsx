// "use client";

// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import { Shield, Truck, CreditCard } from "lucide-react";
// import { useState } from "react";
// import { useAppSelector } from "@/hooks/redux-hook";

// export default function CartSummary() {
//   const { cartItems } = useAppSelector((state) => state.cart);
//   const products = useAppSelector((state) => state.product.list);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const calculateTotals = () => {
//     let subtotal = 0;
//     let itemCount = 0;

//     Object.entries(cartItems).forEach(([productId, quantity]) => {
//       const product = products.find((p) => p.id === productId);
//       if (product) {
//         subtotal += product.price * quantity;
//         itemCount += quantity;
//       }
//     });

//     const shipping = subtotal > 100 ? 0 : 9.99;
//     const tax = subtotal * 0.08; // 8% tax
//     const total = subtotal + shipping + tax;

//     return { subtotal, shipping, tax, total, itemCount };
//   };

//   const { subtotal, shipping, tax, total, itemCount } = calculateTotals();

//   const handleCheckout = async () => {
//     setIsProcessing(true);
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     setIsProcessing(false);
//     // Add your checkout logic here
//   };

//   return (
//     <Card className="sticky top-24">
//       <CardHeader>
//         <CardTitle className="text-lg">Order Summary</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {/* Order Details */}
//         <div className="space-y-3">
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Subtotal ({itemCount} items)</span>
//             <span className="font-medium">${subtotal.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Shipping</span>
//             <span className="font-medium">
//               {shipping === 0 ? (
//                 <Badge variant="secondary" className="text-green-600">
//                   FREE
//                 </Badge>
//               ) : (
//                 `$${shipping.toFixed(2)}`
//               )}
//             </span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Tax</span>
//             <span className="font-medium">${tax.toFixed(2)}</span>
//           </div>
//           <Separator />
//           <div className="flex justify-between text-lg font-bold">
//             <span>Total</span>
//             <span className="text-primary">${total.toFixed(2)}</span>
//           </div>
//         </div>

//         {/* Shipping Info */}
//         <div className="bg-primary-50 p-3 rounded-lg">
//           <div className="flex items-center gap-2 mb-2">
//             <Truck className="h-4 w-4 text-primary" />
//             <span className="text-sm font-medium">
//               Free shipping on orders over $100
//             </span>
//           </div>
//           <p className="text-xs text-gray-600">
//             ${(100 - subtotal).toFixed(2)} more to free shipping
//           </p>
//         </div>

//         {/* Security Badges */}
//         <div className="flex items-center justify-center gap-6 py-4">
//           <div className="flex flex-col items-center gap-1">
//             <Shield className="h-5 w-5 text-gray-400" />
//             <span className="text-xs text-gray-500">Secure</span>
//           </div>
//           <div className="flex flex-col items-center gap-1">
//             <CreditCard className="h-5 w-5 text-gray-400" />
//             <span className="text-xs text-gray-500">Encrypted</span>
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="flex-col space-y-3">
//         <Button
//           className="w-full"
//           size="lg"
//           onClick={handleCheckout}
//           disabled={isProcessing || itemCount === 0}
//         >
//           {isProcessing ? "Processing..." : `Checkout $${total.toFixed(2)}`}
//         </Button>
//         <p className="text-center text-xs text-gray-500">
//           By completing your purchase you agree to our Terms of Service
//         </p>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Shield, Truck, CreditCard, Lock, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "@/hooks/redux-hook";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Payment gateway data with icons and colors
const PAYMENT_GATEWAYS = [
  {
    id: "paystack",
    name: "Paystack",
    icon: "💳",
    color:
      "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600",
    description: "Secure Nigerian payments",
    isPopular: true,
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    icon: "🌍",
    color:
      "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600",
    description: "Pan-African payments",
  },
  {
    id: "stripe",
    name: "Stripe",
    icon: "💎",
    color:
      "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600",
    description: "Global payments",
  },
  {
    id: "seerbit",
    name: "SeerBit",
    icon: "🛡️",
    color:
      "bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600",
    description: "Secure African payments",
  },
  {
    id: "opay",
    name: "OPay",
    icon: "⚡",
    color:
      "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
    description: "Fast mobile payments",
  },
];

export default function CartSummary() {
  const { cartItems } = useAppSelector((state) => state.cart);
  const products = useAppSelector((state) => state.product.list);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);

  const calculateTotals = () => {
    let subtotal = 0;
    let itemCount = 0;

    Object.entries(cartItems).forEach(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId);
      if (product) {
        subtotal += product.price * quantity;
        itemCount += quantity;
      }
    });

    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total, itemCount };
  };

  const { subtotal, shipping, tax, total, itemCount } = calculateTotals();

  const handleCheckout = async (gatewayId?: string) => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsProcessing(false);
    // Add your checkout logic here with the selected gateway
    console.log(
      "Processing checkout with gateway:",
      gatewayId || selectedGateway,
    );
  };

  const handleGatewaySelect = (gatewayId: string) => {
    setSelectedGateway(gatewayId);
    // Optional: Auto-proceed with this gateway
    // handleCheckout(gatewayId);
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Details */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({itemCount} items)</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? (
                <Badge variant="secondary" className="text-green-600">
                  FREE
                </Badge>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Gateway Buttons */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              Select Payment Method
            </h3>
            <Lock className="h-4 w-4 text-gray-400" />
          </div>

          {/* Mobile Optimized Grid - Stack on small screens, grid on medium+ */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {PAYMENT_GATEWAYS.map((gateway) => (
              <TooltipProvider key={gateway.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className={`h-auto p-2 sm:p-3 md:p-4 rounded-lg transition-all duration-200 ${
                        selectedGateway === gateway.id
                          ? "ring-2 ring-primary ring-offset-1"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => handleGatewaySelect(gateway.id)}
                    >
                      <div className="flex flex-col items-center gap-1 w-full">
                        <div
                          className={`text-lg sm:text-xl md:text-2xl mb-1 ${gateway.isPopular ? "animate-pulse" : ""}`}
                        >
                          {gateway.icon}
                          {gateway.isPopular && (
                            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-500" />
                          )}
                        </div>
                        <span className="text-xs sm:text-sm font-medium line-clamp-1">
                          {gateway.name}
                        </span>
                        {selectedGateway === gateway.id && (
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary absolute top-1 right-1" />
                        )}
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[200px]">
                    <p className="font-medium">{gateway.name}</p>
                    <p className="text-xs text-gray-600">
                      {gateway.description}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          {/* Large Gateway Buttons for Mobile */}
          <div className="space-y-2 sm:hidden">
            {PAYMENT_GATEWAYS.slice(0, 2).map((gateway) => (
              <Button
                key={gateway.id}
                className={`w-full h-14 ${gateway.color} text-white font-medium rounded-lg transition-all duration-200 active:scale-[0.98]`}
                onClick={() => handleGatewaySelect(gateway.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{gateway.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold">{gateway.name}</div>
                      <div className="text-xs opacity-90">
                        {gateway.description}
                      </div>
                    </div>
                  </div>
                  {gateway.isPopular && (
                    <Badge className="bg-white text-black text-xs">
                      Popular
                    </Badge>
                  )}
                </div>
              </Button>
            ))}

            {/* More gateways dropdown for mobile */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {PAYMENT_GATEWAYS.slice(2).map((gateway) => (
                <Button
                  key={gateway.id}
                  variant="outline"
                  className="h-12 rounded-lg"
                  onClick={() => handleGatewaySelect(gateway.id)}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">{gateway.icon}</span>
                    <span className="text-xs font-medium">{gateway.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-primary-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              Free shipping on orders over $100
            </span>
          </div>
          <p className="text-xs text-gray-600">
            ${(100 - subtotal).toFixed(2)} more to free shipping
          </p>
        </div>

        {/* Security Badges */}
        <div className="flex items-center justify-center gap-6 py-4">
          <div className="flex flex-col items-center gap-1">
            <Shield className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-500">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <CreditCard className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-500">Encrypted</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-3">
        <Button
          className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold"
          size="lg"
          onClick={() => handleCheckout()}
          disabled={isProcessing || itemCount === 0}
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            `Pay $${total.toFixed(2)}`
          )}
        </Button>

        {/* Quick Pay Buttons for Mobile */}
        <div className="w-full sm:hidden space-y-2">
          <Button
            variant="secondary"
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            onClick={() => handleCheckout("paystack")}
            disabled={isProcessing}
          >
            Pay with Paystack
          </Button>
          <Button
            variant="secondary"
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
            onClick={() => handleCheckout("flutterwave")}
            disabled={isProcessing}
          >
            Pay with Flutterwave
          </Button>
        </div>

        <p className="text-center text-xs text-gray-500 px-2">
          By completing your purchase you agree to our Terms of Service
        </p>
      </CardFooter>
    </Card>
  );
}
