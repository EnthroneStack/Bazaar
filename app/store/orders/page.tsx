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

// app/(store)/orders/page.tsx
import { auth } from "@clerk/nextjs/server";
import authSeller from "@/middlewares/authSeller";
import OrderStats from "@/components/store/orders/OrderStats";
import OrderTable from "./OrderTable";
import { getOrders, getOrderStats } from "@/lib/services/orders.service";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string };
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const store = await authSeller(userId);
  if (!store) throw new Error("Store not found");

  const page = Number(searchParams.page) || 1;
  const status = searchParams.status ?? "all";

  const [stats, orders] = await Promise.all([
    getOrderStats(store.id),
    getOrders({
      storeId: store.id,
      page,
      limit: 6,
      status,
    }),
  ]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page header — server-rendered HTML */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage customer orders and fulfillment
        </p>
      </div>

      {/* Non-interactive, immediate data */}
      <OrderStats stats={stats} />

      {/* Interactive table */}
      <OrderTable
        orders={orders.data}
        meta={orders.meta}
        currentStatus={status}
      />
    </div>
  );
}
