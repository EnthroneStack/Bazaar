"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Eye, MoreVertical } from "lucide-react";

export default function OrderTable({
  orders,
  meta,
  currentStatus,
}: {
  orders: any[];
  meta: {
    page: number;
    totalPages: number;
    total: number;
  };
  currentStatus: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setStatus = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", status);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4 border-b flex justify-between">
        <select
          value={currentStatus}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <table className="w-full">
        <tbody className="divide-y">
          {orders.map((order) => (
            <tr key={order.rawId}>
              <td className="px-6 py-4 font-medium text-blue-600">
                {order.id}
              </td>
              <td className="px-6 py-4">{order.customer}</td>
              <td className="px-6 py-4">${order.amount.toFixed(2)}</td>
              <td className="px-6 py-4 capitalize">{order.status}</td>
              <td className="px-6 py-4">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 border-t flex justify-between text-sm">
        <span>
          Page {meta.page} of {meta.totalPages} ({meta.total} orders)
        </span>
        <div className="space-x-2">
          <button
            disabled={meta.page === 1}
            onClick={() => goToPage(meta.page - 1)}
          >
            Previous
          </button>
          <button
            disabled={meta.page === meta.totalPages}
            onClick={() => goToPage(meta.page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
