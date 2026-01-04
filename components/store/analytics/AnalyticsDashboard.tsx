// components/store/analytics/AnalyticsDashboard.tsx
"use client";

import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Calendar,
  Download,
} from "lucide-react";
import { useState } from "react";

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d");

  const metrics = [
    { label: "Visitors", value: "12.4K", change: "+18.2%" },
    { label: "Conversion Rate", value: "3.8%", change: "+2.1%" },
    { label: "Avg. Session Duration", value: "4m 32s", change: "+12s" },
    { label: "Bounce Rate", value: "42.1%", change: "-3.2%" },
  ];

  const topProducts = [
    { name: "Wireless Headphones", sales: 1248, revenue: 162.2 },
    { name: "Fitness Watch", sales: 892, revenue: 267.6 },
    { name: "Cotton T-Shirt", sales: 567, revenue: 141.8 },
    { name: "Coffee Mug Set", sales: 312, revenue: 109.2 },
  ];

  const trafficSources = [
    { source: "Direct", percentage: 35, visitors: 4340 },
    { source: "Organic Search", percentage: 28, visitors: 3472 },
    { source: "Social Media", percentage: 22, visitors: 2728 },
    { source: "Email", percentage: 15, visitors: 1860 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BarChart3 className="h-6 w-6 text-gray-500 mr-3" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Store Analytics
            </h2>
            <p className="text-sm text-gray-600">
              Comprehensive insights and metrics
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">{metric.label}</div>
              <div
                className={`text-sm font-medium ${
                  metric.change.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {metric.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {metric.value}
            </div>
            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    index % 2 === 0 ? "bg-blue-500" : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min(parseInt(metric.change) + 70, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
              <p className="text-sm text-gray-600">Total revenue: $24,580.50</p>
            </div>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">+12.5% from last month</span>
            </div>
          </div>
          <div className="h-64 flex items-end space-x-2">
            {[65, 89, 72, 98, 120, 105, 140, 110, 135, 150, 125, 160].map(
              (value, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${value}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {
                      [
                        "J",
                        "F",
                        "M",
                        "A",
                        "M",
                        "J",
                        "J",
                        "A",
                        "S",
                        "O",
                        "N",
                        "D",
                      ][idx]
                    }
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-lg mr-3">
                    <ShoppingBag className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.sales} sales
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">
                    ${product.revenue}k
                  </div>
                  <div className="text-sm text-green-600">+12.5%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-6">Traffic Sources</h3>
        <div className="space-y-4">
          {trafficSources.map((source, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor:
                        idx === 0
                          ? "#3B82F6"
                          : idx === 1
                          ? "#10B981"
                          : idx === 2
                          ? "#8B5CF6"
                          : "#F59E0B",
                    }}
                  />
                  <span className="font-medium text-gray-900">
                    {source.source}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {source.percentage}% • {source.visitors.toLocaleString()}{" "}
                  visitors
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${source.percentage}%`,
                    backgroundColor:
                      idx === 0
                        ? "#3B82F6"
                        : idx === 1
                        ? "#10B981"
                        : idx === 2
                        ? "#8B5CF6"
                        : "#F59E0B",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
