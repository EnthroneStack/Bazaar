// components/store/inventory/QuickStockUpdate.tsx
"use client";

import { Package, Plus, Minus } from "lucide-react";
import { useState } from "react";

const quickProducts = [
  {
    id: "PROD-001",
    name: "Bluetooth Headphones",
    sku: "WH-2024-BLK",
    currentStock: 45,
  },
  {
    id: "PROD-004",
    name: "Fitness Watch",
    sku: "FW-2024-BLK",
    currentStock: 152,
  },
  {
    id: "PROD-005",
    name: "Coffee Mug Set",
    sku: "CM-2024-SET",
    currentStock: 23,
  },
];

export default function QuickStockUpdate() {
  const [updates, setUpdates] = useState<Record<string, number>>({});

  const handleUpdate = (productId: string, delta: number) => {
    setUpdates((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + delta,
    }));
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log("Saving stock updates:", updates);
    setUpdates({});
    alert("Stock updated successfully!");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900">Quick Stock Update</h3>
          <p className="text-sm text-gray-600">Update stock levels instantly</p>
        </div>
        {Object.keys(updates).length > 0 && (
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
          >
            Save Changes
          </button>
        )}
      </div>

      <div className="space-y-4">
        {quickProducts.map((product) => {
          const updateDelta = updates[product.id] || 0;
          const newStock = product.currentStock + updateDelta;

          return (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center">
                <div className="p-2 bg-gray-100 rounded-lg mr-3">
                  <Package className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-500">{product.sku}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Current Stock</div>
                  <div className="font-semibold">{product.currentStock}</div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleUpdate(product.id, -1)}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <Minus className="h-4 w-4 text-gray-600" />
                  </button>

                  <div className="text-center min-w-[60px]">
                    <div className="text-sm text-gray-600">Adjustment</div>
                    <div
                      className={`font-semibold ${
                        updateDelta !== 0 ? "text-blue-600" : "text-gray-900"
                      }`}
                    >
                      {updateDelta > 0 ? "+" : ""}
                      {updateDelta}
                    </div>
                  </div>

                  <button
                    onClick={() => handleUpdate(product.id, 1)}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <Plus className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-600">New Total</div>
                  <div
                    className={`font-semibold ${
                      newStock < 10 ? "text-yellow-600" : "text-green-600"
                    }`}
                  >
                    {newStock}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
