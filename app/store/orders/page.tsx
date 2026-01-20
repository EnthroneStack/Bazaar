// app/store/orders/page.tsx

import OrderStats from "@/components/store/orders/OrderStats";
import OrderTable from "./OrderTable";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600">Manage customer orders and fulfillment</p>
      </div>

      <OrderStats
        stats={{
          totalRevenue: 0,
          totalOrders: 0,
          avgOrderValue: 0,
          pendingOrders: 0,
          completedOrders: 0,
        }}
      />
      <OrderTable
        orders={[]}
        meta={{
          page: 0,
          totalPages: 0,
          total: 0,
        }}
        currentStatus={""}
      />
    </div>
  );
}
