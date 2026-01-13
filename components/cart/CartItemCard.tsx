"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { addToCart, removeFromCart } from "@/lib/redux/features/cart/cartSlice";

interface CartItemCardProps {
  productId: string;
  quantity: number;
}

export default function CartItemCard({
  productId,
  quantity,
}: CartItemCardProps) {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) =>
    state.product.list.find((p) => p.id === productId)
  );

  if (!product) return null;

  const totalPrice = product.price * quantity;

  const handleIncrease = () => {
    dispatch(addToCart({ productId }));
  };

  const handleDecrease = () => {
    dispatch(removeFromCart({ productId }));
  };

  const handleRemove = () => {
    // Remove all items at once
    for (let i = 0; i < quantity; i++) {
      dispatch(removeFromCart({ productId }));
    }
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Product Image */}
          <div className="relative w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 128px"
            />
            {product.stock <= 10 && (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Low Stock
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        Save{" "}
                        {(
                          (1 - product.price / product.originalPrice) *
                          100
                        ).toFixed(0)}
                        %
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleIncrease}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleRemove}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                In stock: <span className="font-medium">{product.stock}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Item total</div>
                <div className="text-xl font-bold text-primary">
                  ${totalPrice.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
