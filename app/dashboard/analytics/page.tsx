"use client";

import { useState, useEffect } from "react";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");
  const [metrics, setMetrics] = useState({
    revenue: { current: 12540, change: 12.5, trend: "up" },
    orders: { current: 342, change: 8.2, trend: "up" },
    customers: { current: 1245, change: 15.3, trend: "up" },
    conversion: { current: 3.2, change: -1.2, trend: "down" },
    aov: { current: 89.42, change: 5.6, trend: "up" },
  });

  const timeRanges = [
    { id: "1d", label: "Today" },
    { id: "7d", label: "Last 7 days" },
    { id: "30d", label: "Last 30 days" },
    { id: "90d", label: "Last 90 days" },
    { id: "1y", label: "Last year" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">
            Track your store performance and insights
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="flex rounded-md shadow-sm">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-4 py-2 text-sm font-medium first:rounded-l-md last:rounded-r-md ${
                  timeRange === range.id
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <ArrowDownTrayIcon className="mr-2 h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {[
          {
            title: "Revenue",
            value: `$${metrics.revenue.current.toLocaleString()}`,
            change: metrics.revenue.change,
            trend: metrics.revenue.trend,
            icon: CurrencyDollarIcon,
            color: "text-green-600",
            bgColor: "bg-green-100",
          },
          {
            title: "Orders",
            value: metrics.orders.current,
            change: metrics.orders.change,
            trend: metrics.orders.trend,
            icon: ShoppingBagIcon,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
          },
          {
            title: "Customers",
            value: metrics.customers.current,
            change: metrics.customers.change,
            trend: metrics.customers.trend,
            icon: UsersIcon,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
          },
          {
            title: "Conversion Rate",
            value: `${metrics.conversion.current}%`,
            change: metrics.conversion.change,
            trend: metrics.conversion.trend,
            icon: ChartBarIcon,
            color: "text-yellow-600",
            bgColor: "bg-yellow-100",
          },
          {
            title: "Avg. Order Value",
            value: `$${metrics.aov.current}`,
            change: metrics.aov.change,
            trend: metrics.aov.trend,
            icon: CurrencyDollarIcon,
            color: "text-indigo-600",
            bgColor: "bg-indigo-100",
          },
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div
                    className={`flex-shrink-0 rounded-md p-3 ${metric.bgColor}`}
                  >
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {metric.title}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {metric.value}
                        </div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            metric.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {metric.trend === "up" ? (
                            <ArrowTrendingUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowTrendingDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                          )}
                          <span className="ml-1">
                            {Math.abs(metric.change)}%
                          </span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Revenue Over Time
              </h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-primary text-white rounded-md">
                  Revenue
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md">
                  Orders
                </button>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Revenue chart will appear here
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Top Performing Products
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "Premium Headphones",
                  revenue: 4520,
                  orders: 56,
                  change: 12,
                },
                {
                  name: "Smart Watch Pro",
                  revenue: 3890,
                  orders: 42,
                  change: 8,
                },
                {
                  name: "Wireless Earbuds",
                  revenue: 3210,
                  orders: 38,
                  change: -3,
                },
                { name: "Laptop Stand", revenue: 2780, orders: 34, change: 15 },
                { name: "Phone Case", revenue: 2150, orders: 29, change: 5 },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.orders} orders
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ${product.revenue.toLocaleString()}
                    </p>
                    <p
                      className={`text-xs ${
                        product.change > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.change > 0 ? "+" : ""}
                      {product.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Sources */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Traffic Sources
            </h3>
            <div className="space-y-4">
              {[
                { source: "Direct", percentage: 45, visits: 1245 },
                { source: "Search", percentage: 32, visits: 884 },
                { source: "Social", percentage: 15, visits: 415 },
                { source: "Email", percentage: 8, visits: 221 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-900">
                      {item.source}
                    </span>
                    <span className="text-gray-500">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.visits} visits
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Demographics */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Customer Demographics
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Age Groups
                </h4>
                {[
                  { group: "18-24", percentage: 25 },
                  { group: "25-34", percentage: 42 },
                  { group: "35-44", percentage: 20 },
                  { group: "45+", percentage: 13 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm mb-1"
                  >
                    <span className="text-gray-600">{item.group}</span>
                    <span className="font-medium text-gray-900">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Top Locations
                </h4>
                {[
                  { location: "New York", orders: 156 },
                  { location: "Los Angeles", orders: 142 },
                  { location: "Chicago", orders: 98 },
                  { location: "Miami", orders: 76 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm mb-1"
                  >
                    <span className="text-gray-600">{item.location}</span>
                    <span className="font-medium text-gray-900">
                      {item.orders} orders
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
