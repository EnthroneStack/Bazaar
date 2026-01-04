// components/store/StoreSidebar.tsx
"use client";

import {
  Home,
  Package,
  ShoppingCart,
  BarChart3,
  Users,
  Settings,
  PlusCircle,
  FileText,
  Tag,
  Image,
  HelpCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/store", icon: Home },
  { name: "Add Product", href: "/store/add-product", icon: PlusCircle },
  { name: "Manage Products", href: "/store/manage-product", icon: Package },
  { name: "Orders", href: "/store/orders", icon: ShoppingCart },
  { name: "Inventory", href: "/store/inventory", icon: Package },
  { name: "Analytics", href: "/store/analytics", icon: BarChart3 },
  { name: "Customers", href: "/store/customers", icon: Users },
  { name: "Promotions", href: "/store/promotions", icon: Tag },
  { name: "Content", href: "/store/content", icon: Image },
  { name: "Reports", href: "/store/reports", icon: FileText },
  { name: "Settings", href: "/store/settings", icon: Settings },
];

export default function StoreSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
      <nav className="p-4">
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Store Management
          </h3>
          <ul className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <ul className="space-y-1">
            <li>
              <button className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg w-full">
                <HelpCircle className="h-5 w-5" />
                <span>Help & Support</span>
              </button>
            </li>
            <li>
              <button className="flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
