import { LucideIcon } from "lucide-react";

export interface Store {
  id: string;
  name: string;
  slug: string;
  username: string;
  logo: string | null;
  status: "active" | "pending";
  isActive: boolean;
}

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  count?: number;
}
