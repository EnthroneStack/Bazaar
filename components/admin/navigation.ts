import {
  BarChart3,
  ShoppingBag,
  Box,
  Settings,
  Home,
  ShieldCheck,
  TicketPercent,
  Package,
} from "lucide-react";

export const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Products", href: "/dashboard/products", icon: Box, count: 0 },
  { name: "Orders", href: "/dashboard/orders", icon: Package, count: 0 },
  { name: "Stores", href: "/dashboard/orders", icon: ShoppingBag, count: 0 },
  {
    name: "Approve Store",
    href: "/dashboard/orders",
    icon: ShieldCheck,
    count: 0,
  },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Coupons", href: "/dashboard/orders", icon: TicketPercent, count: 0 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];
