"use client";

import { ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/hooks/redux-hook";
import EmptyCartState from "./EmptyCartState";
import CartItemsList from "./CartItemsList";
import CartSummary from "./CartSummary";

export default function CartPageContent() {
  const { total } = useAppSelector((state) => state.cart);

  if (total === 0) {
    return <EmptyCartState />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">
            Your Shopping Cart
          </h1>
        </div>
        <p className="text-gray-600">
          Review your items and proceed to checkout
        </p>
      </div>

      <Separator className="mb-8" />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItemsList />
        </div>
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
