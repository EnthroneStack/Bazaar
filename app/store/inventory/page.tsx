// app/store/inventory/page.tsx

import InventoryTable from "@/components/store/inventory/InventortTable";
import LowStockAlert from "@/components/store/inventory/LowStockAlert";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-gray-600">Track and manage your product stock</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Bulk Update
        </button>
      </div>

      <LowStockAlert />
      <InventoryTable />
    </div>
  );
}
