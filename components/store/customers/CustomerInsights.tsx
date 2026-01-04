// components/store/customers/CustomerInsights.tsx
import { Users, ShoppingBag, Star, TrendingUp } from "lucide-react";

const insights = [
  {
    title: "Total Customers",
    value: "2,842",
    change: "+8.5%",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "New This Month",
    value: "189",
    change: "+12.3%",
    icon: TrendingUp,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Avg. Orders per Customer",
    value: "3.2",
    change: "+0.4",
    icon: ShoppingBag,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Avg. Customer Rating",
    value: "4.7",
    change: "+0.2",
    icon: Star,
    color: "bg-yellow-100 text-yellow-600",
  },
];

export default function CustomerInsights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {insights.map((insight) => {
        const Icon = insight.icon;
        return (
          <div
            key={insight.title}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{insight.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {insight.value}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  {insight.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${insight.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
