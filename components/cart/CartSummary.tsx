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
import { Shield, Truck, CreditCard } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "@/hooks/redux-hook";

export default function CartSummary() {
  const { cartItems } = useAppSelector((state) => state.cart);
  const products = useAppSelector((state) => state.product.list);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsProcessing(false);
    // Add your checkout logic here
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
          className="w-full"
          size="lg"
          onClick={handleCheckout}
          disabled={isProcessing || itemCount === 0}
        >
          {isProcessing ? "Processing..." : `Checkout $${total.toFixed(2)}`}
        </Button>
        <p className="text-center text-xs text-gray-500">
          By completing your purchase you agree to our Terms of Service
        </p>
      </CardFooter>
    </Card>
  );
}
