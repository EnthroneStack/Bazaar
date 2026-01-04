// components/store/orders/OrderStats.tsx
import {
  DollarSign,
  Package,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

const orderStats = [
  {
    title: "Total Revenue",
    value: "$24,580",
    change: "+12.5%",
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Total Orders",
    value: "1,248",
    change: "+8.2%",
    icon: Package,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Avg. Order Value",
    value: "$89.50",
    change: "+5.3%",
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Pending Orders",
    value: "42",
    change: "-3.1%",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Completed Orders",
    value: "1,156",
    change: "+10.7%",
    icon: CheckCircle,
    color: "bg-indigo-100 text-indigo-600",
  },
];

export default function OrderStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
      {orderStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    stat.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
