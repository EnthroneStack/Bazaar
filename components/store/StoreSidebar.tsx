"use client";

import {
  DrawerContent,
  DrawerClose,
  DrawerTitle,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
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
  X,
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
    <>
      {/* Desktop sidebar (unchanged) */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200">
        <SidebarLinks pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
      <DrawerContent className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-[9999]">
        <VisuallyHidden>
          <DrawerTitle>Store Navigation</DrawerTitle>
        </VisuallyHidden>

        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-gray-900">Store Management</h2>
          <DrawerClose asChild>
            <button className="p-2 text-gray-600 hover:text-gray-900 cursor-pointer">
              <X className="h-5 w-5" />
            </button>
          </DrawerClose>
        </div>

        <SidebarLinks pathname={pathname} mobile />
      </DrawerContent>
    </>
  );
}

function SidebarLinks({
  pathname,
  mobile = false,
}: {
  pathname: string;
  mobile?: boolean;
}) {
  return (
    <nav className="p-4">
      <ul className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          const link = (
            <Link
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          );

          return (
            <li key={item.name}>
              {mobile ? <DrawerClose asChild>{link}</DrawerClose> : link}
            </li>
          );
        })}
      </ul>

      <div className="border-t mt-6 pt-4">
        <button className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg w-full">
          <HelpCircle className="h-4 w-4" />
          <span>Help & Support</span>
        </button>

        <button className="flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
