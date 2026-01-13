"use client";

import CartItemCard from "./CartItemCard";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux-hook";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CartItemsList() {
  const { cartItems } = useAppSelector((state) => state.cart);
  const productIds = Object.keys(cartItems);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Items ({productIds.length})
        </h2>
        <Button variant="ghost" asChild>
          <Link href="/shop">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {productIds.map((productId) => (
          <CartItemCard
            key={productId}
            productId={productId}
            quantity={cartItems[productId]}
          />
        ))}
      </div>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 sm:hidden">
        <Button className="w-full" size="lg">
          Checkout Now
        </Button>
      </div>
    </div>
  );
}
