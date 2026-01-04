// app/store/inventory/page.tsx - Updated
import StockSummary from "@/components/store/inventory/StockSummary";
import LowStockAlert from "@/components/store/inventory/LowStockAlert";
import QuickStockUpdate from "@/components/store/inventory/QuickStockUpdate";
import InventoryTable from "@/components/store/inventory/InventortTable";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-gray-600">
            Track and manage your product stock levels
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
            Export Report
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Bulk Update
          </button>
        </div>
      </div>

      <StockSummary />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickStockUpdate />
          <InventoryTable />
        </div>
        <div>
          <LowStockAlert />
        </div>
      </div>
    </div>
  );
}
