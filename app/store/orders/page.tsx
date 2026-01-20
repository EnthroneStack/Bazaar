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

// app/(store)/orders/page.tsx
import OrderStats from "@/components/store/orders/OrderStats";
import OrderTable from "./OrderTable";

async function getOrderStats() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/store/orders/stats`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed to fetch order stats");

  const json = await res.json();
  return json.data;
}

async function getOrders(searchParams?: { page?: string; status?: string }) {
  const params = new URLSearchParams({
    page: searchParams?.page ?? "1",
    limit: "6",
    status: searchParams?.status ?? "all",
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/store/orders?${params.toString()}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed to fetch orders");

  return res.json();
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string };
}) {
  const [stats, ordersResponse] = await Promise.all([
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

      <OrderStats stats={stats} />

      <OrderTable
        orders={ordersResponse.data}
        meta={ordersResponse.meta}
        currentStatus={searchParams.status ?? "all"}
      />
    </div>
  );
}
