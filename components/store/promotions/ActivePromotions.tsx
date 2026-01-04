// components/store/promotions/ActivePromotions.tsx
import { Tag, Calendar, Users, TrendingUp, ArrowRight } from "lucide-react";

const activePromotions = [
  {
    id: "PROMO-001",
    name: "Summer Sale 2024",
    type: "percentage",
    value: "20% OFF",
    code: "SUMMER20",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    usage: { used: 1248, limit: 5000 },
    status: "active",
  },
  {
    id: "PROMO-002",
    name: "Free Shipping",
    type: "shipping",
    value: "Free Shipping",
    code: "FREESHIP",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usage: { used: 892, limit: null },
    status: "active",
  },
  {
    id: "PROMO-003",
    name: "New Customer Discount",
    type: "fixed",
    value: "$10 OFF",
    code: "WELCOME10",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usage: { used: 567, limit: 1000 },
    status: "active",
  },
];

export default function ActivePromotions() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Tag className="h-6 w-6 text-blue-600 mr-3" />
          <div>
            <h3 className="font-semibold text-gray-900">Active Promotions</h3>
            <p className="text-sm text-gray-600">
              Currently running promotional campaigns
            </p>
          </div>
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {activePromotions.map((promo) => (
          <div
            key={promo.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-4">
                  <Tag className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {promo.name}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(promo.startDate).toLocaleDateString()} -{" "}
                    {new Date(promo.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-lg text-gray-900">
                  {promo.value}
                </div>
                <div className="text-sm text-gray-500">Code: {promo.code}</div>
              </div>

              <div className="text-center">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  {promo.usage.used} used
                  {promo.usage.limit && ` / ${promo.usage.limit}`}
                </div>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${
                        promo.usage.limit
                          ? (promo.usage.used / promo.usage.limit) * 100
                          : 50
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
                <TrendingUp className="h-4 w-4 text-green-600 ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
