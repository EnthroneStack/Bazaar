"use client";

import {
  Edit,
  Eye,
  Archive,
  MoreVertical,
  Star,
  Package,
  DollarSign,
} from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: "PROD-001",
    name: "Wireless Bluetooth Headphones",
    sku: "WH-2024-BLK",
    category: "Electronics",
    price: 129.99,
    stock: 45,
    status: "published",
    rating: 4.8,
    sales: 1248,
    image: "/api/placeholder/40/40",
  },
  {
    id: "PROD-002",
    name: "Organic Cotton T-Shirt",
    sku: "TS-2024-WHT",
    category: "Fashion",
    price: 24.99,
    stock: 8,
    status: "published",
    rating: 4.5,
    sales: 892,
    image: "/api/placeholder/40/40",
  },
  {
    id: "PROD-003",
    name: "Smart Fitness Watch",
    sku: "FW-2024-BLK",
    category: "Electronics",
    price: 299.99,
    stock: 152,
    status: "published",
    rating: 4.9,
    sales: 567,
    image: "/api/placeholder/40/40",
  },
  {
    id: "PROD-004",
    name: "Ceramic Coffee Mug Set",
    sku: "CM-2024-SET",
    category: "Home",
    price: 34.99,
    stock: 23,
    status: "draft",
    rating: 4.3,
    sales: 234,
    image: "/api/placeholder/40/40",
  },
  {
    id: "PROD-005",
    name: "Yoga Mat Premium",
    sku: "YM-2024-PRM",
    category: "Sports",
    price: 49.99,
    stock: 4,
    status: "published",
    rating: 4.6,
    sales: 189,
    image: "/api/placeholder/40/40",
  },
  {
    id: "PROD-006",
    name: "Luxury Leather Wallet",
    sku: "LW-2024-BRN",
    category: "Fashion",
    price: 89.99,
    stock: 0,
    status: "out-of-stock",
    rating: 4.7,
    sales: 312,
    image: "/api/placeholder/40/40",
  },
];

export default function ProductTable() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const getStatusBadge = (status: string) => {
    const styles = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800",
      "out-of-stock": "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          styles[status as keyof typeof styles]
        }`}
      >
        {status.replace("-", " ").toUpperCase()}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 h-4 w-4"
                />
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              {/* RESPONSIVE CHANGE: Hide some columns on mobile */}
              <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sales
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded text-blue-600 h-4 w-4"
                  />
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <Package className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {product.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate">
                        {product.sku}
                      </div>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-xs text-gray-600">
                          {product.rating}
                        </span>
                      </div>
                      {/* RESPONSIVE CHANGE: Show price on mobile (hidden in table) */}
                      <div className="md:hidden text-xs text-gray-500 mt-1">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell px-4 sm:px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {product.category}
                  </span>
                </td>
                <td className="hidden lg:table-cell px-4 sm:px-6 py-4">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="font-medium">
                      {product.price.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div
                    className={`font-medium text-sm sm:text-base ${
                      product.stock < 10 ? "text-yellow-600" : "text-green-600"
                    }`}
                  >
                    {product.stock} units
                  </div>
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-6 py-4">
                  {getStatusBadge(product.status)}
                </td>
                <td className="hidden md:table-cell px-4 sm:px-6 py-4">
                  <div className="font-medium">{product.sales}</div>
                  <div className="text-xs text-gray-500">total sales</div>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button className="p-1 sm:p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-1 sm:p-1.5 text-green-600 hover:bg-green-50 rounded">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 sm:p-1.5 text-gray-600 hover:bg-gray-100 rounded">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RESPONSIVE CHANGE: Stack pagination on mobile */}
      <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700">Showing 6 of 156 products</div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
