"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
                value={stockQuantity}
                onChange={(e) =>
                  onStockQuantityChange(parseInt(e.target.value) || 0)
                }
                placeholder="0"
                className="text-sm sm:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="low-stock" className="text-sm font-medium">
                Low Stock Threshold
              </Label>
              <Input
                id="low-stock"
                type="number"
                min="0"
                value={lowStockThreshold}
                onChange={(e) =>
                  onLowStockThresholdChange(parseInt(e.target.value) || 0)
                }
                placeholder="10"
                className="text-sm sm:text-base"
              />
            </div>
          </div>

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
        </>
      )}
    </div>
  );
}
