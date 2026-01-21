// import OrderStats from "@/components/store/orders/OrderStats";
// import OrderTable from "./OrderTable";

// export default function OrdersPage() {
//   return (
//     <div className="space-y-4 sm:space-y-6">
//       <div>
//         <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Orders</h1>
//         <p className="text-sm sm:text-base text-gray-600">
//           Manage customer orders and fulfillment
//         </p>
//       </div>

//       <OrderStats />
//       <OrderTable />
//     </div>
//   );
// }

// import OrderStats from "@/components/store/orders/OrderStats";
// import OrderTable from "./OrderTable";

// export default function OrdersPage() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
//         <p className="text-gray-600">Manage customer orders and fulfillment</p>
//       </div>

//       <OrderStats
//         stats={{
//           totalRevenue: 0,
//           totalOrders: 0,
//           avgOrderValue: 0,
//           pendingOrders: 0,
//           completedOrders: 0,
//         }}
//       />
//       <OrderTable
//         orders={[]}
//         meta={{
//           page: 0,
//           totalPages: 0,
//           total: 0,
//         }}
//         currentStatus={""}
//       />
//     </div>
//   );
// }

"use client";

import OrderStats from "@/components/store/orders/OrderStats";
import OrderTable from "./OrderTable";

async function getOrderStats() {
  const res = await fetch(`/api/store/orders/stats`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch order stats");
  return res.json();
}

async function getOrders(searchParams: { page?: string; status?: string }) {
  const params = new URLSearchParams({
    page: searchParams.page ?? "1",
    limit: "6",
    status: searchParams.status ?? "all",
  });

  const res = await fetch(`/api/store/orders?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string };
}) {
  const [statsRes, ordersRes] = await Promise.all([
    getOrderStats(),
    getOrders(searchParams),
  ]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage customer orders and fulfillment
        </p>
      </div>

      <OrderStats stats={statsRes.data} />

      <OrderTable
        orders={ordersRes.data}
        meta={ordersRes.meta}
        currentStatus={searchParams.status ?? "all"}
      />
    </div>
  );
}
