// components/store/dashboard/PerformanceMetrics.tsx
"use client";

import { TrendingUp, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function PerformanceMetrics() {
  const [timeRange, setTimeRange] = useState("30d");

  const metrics = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    revenue: [6500, 8900, 7200, 9800, 12000, 10500, 14000],
    orders: [120, 150, 130, 180, 220, 190, 240],
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Performance Metrics
          </h3>
          <p className="text-sm text-gray-600">Track your store's growth</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Revenue Chart */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$14,250</p>
            </div>
            <div className="flex items-center text-green-600 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12.5% from last period
            </div>
          </div>
          <div className="h-48 flex items-end space-x-2">
            {metrics.revenue.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t-lg transition-all hover:opacity-80"
                  style={{
                    height: `${(value / Math.max(...metrics.revenue)) * 100}%`,
                  }}
                />
                <span className="text-xs text-gray-500 mt-2">
                  {metrics.labels[index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
