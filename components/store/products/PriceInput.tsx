"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent } from "lucide-react";
import { useState } from "react";

interface PriceInputProps {
  mrp: string;
  price: string;
  onMrpChange: (value: string) => void;
  onPriceChange: (value: string) => void;
}

export default function PriceInput({
  mrp,
  price,
  onMrpChange,
  onPriceChange,
}: PriceInputProps) {
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const calculateDiscount = (mrpVal: number, priceVal: number) => {
    if (mrpVal > 0 && priceVal > 0) {
      const discount = ((mrpVal - priceVal) / mrpVal) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const handleMrpChange = (value: string) => {
    onMrpChange(value);
    const mrpNum = parseFloat(value) || 0;
    const priceNum = parseFloat(price) || 0;
    setDiscountPercentage(calculateDiscount(mrpNum, priceNum));
  };

  const handlePriceChange = (value: string) => {
    onPriceChange(value);
    const mrpNum = parseFloat(mrp) || 0;
    const priceNum = parseFloat(value) || 0;
    setDiscountPercentage(calculateDiscount(mrpNum, priceNum));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mrp" className="text-sm font-medium">
            MRP (Maximum Retail Price)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <Input
              id="mrp"
              type="number"
              step="0.01"
              value={mrp}
              onChange={(e) => handleMrpChange(e.target.value)}
              placeholder="0.00"
              className="pl-8 text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price" className="text-sm font-medium">
            Selling Price *
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => handlePriceChange(e.target.value)}
              placeholder="0.00"
              className="pl-8 text-sm sm:text-base"
              required
            />
          </div>
        </div>
      </div>

      {discountPercentage > 0 && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <Percent className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">
            You&apos;re offering a {discountPercentage}% discount
          </span>
        </div>
      )}

      {parseFloat(price) > parseFloat(mrp) && parseFloat(mrp) > 0 && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-sm font-medium text-red-700">
            Selling price cannot be higher than MRP
          </span>
        </div>
      )}
    </div>
  );
}
