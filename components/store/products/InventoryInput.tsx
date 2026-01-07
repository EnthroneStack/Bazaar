"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";

interface InventoryInputProps {
  inStock: boolean;
  stockQuantity: number;
  lowStockThreshold: number;
  onInStockChange: (value: boolean) => void;
  onStockQuantityChange: (value: number) => void;
  onLowStockThresholdChange: (value: number) => void;
}

export default function InventoryInput({
  inStock,
  stockQuantity,
  lowStockThreshold,
  onInStockChange,
  onStockQuantityChange,
  onLowStockThresholdChange,
}: InventoryInputProps) {
  const [localStockQuantity, setLocalStockQuantity] = useState(
    stockQuantity.toString()
  );
  const [localLowStockThreshold, setLocalLowStockThreshold] = useState(
    lowStockThreshold.toString()
  );

  useEffect(() => {
    setLocalStockQuantity(stockQuantity.toString());
  }, [stockQuantity]);

  useEffect(() => {
    setLocalLowStockThreshold(lowStockThreshold.toString());
  }, [lowStockThreshold]);

  const handleStockQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setLocalStockQuantity(value);

    if (value === "") {
      onStockQuantityChange(0);
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        onStockQuantityChange(numValue);
      }
    }
  };

  const handleLowStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalLowStockThreshold(value);

    if (value === "") {
      onLowStockThresholdChange(0);
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        onLowStockThresholdChange(numValue);
      }
    }
  };

  const handleBlur = () => {
    if (localStockQuantity === "") {
      onStockQuantityChange(0);
    }
    if (localLowStockThreshold === "") {
      onLowStockThresholdChange(0);
    }
  };

  const isLowStock = stockQuantity > 0 && stockQuantity <= lowStockThreshold;
  const isOutOfStock = stockQuantity === 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <Label htmlFor="track-inventory" className="text-sm font-medium">
            Track Inventory
          </Label>
          <p className="text-xs text-gray-500 mt-1">
            Turn off to mark as &quot;in stock&quot; without tracking quantity
          </p>
        </div>
        <Switch
          id="track-inventory"
          checked={inStock}
          onCheckedChange={onInStockChange}
        />
      </div>

      {inStock && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock-quantity" className="text-sm font-medium">
                Stock Quantity *
              </Label>
              <Input
                id="stock-quantity"
                type="number"
                min="0"
                value={localStockQuantity}
                onChange={handleStockQuantityChange}
                onBlur={handleBlur}
                placeholder="0"
                className="text-sm sm:text-base"
                required
              />
              <p className="text-xs text-gray-500">
                Current: {stockQuantity} units
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="low-stock" className="text-sm font-medium">
                Low Stock Threshold
              </Label>
              <Input
                id="low-stock"
                type="number"
                min="0"
                value={localLowStockThreshold}
                onChange={handleLowStockChange}
                onBlur={handleBlur}
                placeholder="10"
                className="text-sm sm:text-base"
              />
              <p className="text-xs text-gray-500">
                Alert when stock falls below this number
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {isOutOfStock && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Product is out of stock. Customers won&apos;t be able to
                  purchase.
                </AlertDescription>
              </Alert>
            )}

            {isLowStock && !isOutOfStock && (
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-700">
                  Low stock alert: Only {stockQuantity} units remaining
                </AlertDescription>
              </Alert>
            )}

            {!isOutOfStock && !isLowStock && stockQuantity > 0 && (
              <Alert className="bg-green-50 border-green-200">
                <AlertCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  In stock: {stockQuantity} units available
                </AlertDescription>
              </Alert>
            )}
          </div>
        </>
      )}

      {!inStock && stockQuantity === 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Product is out of stock. Enable tracking to manage inventory.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
