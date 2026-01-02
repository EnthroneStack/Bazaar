"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  HelpCircle,
  Menu,
  Search,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  onOpenSidebar: () => void;
}

export default function AdminNavbar({ onOpenSidebar }: Props) {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-10 flex items-center h-16 border-b border-gray-200 shadow-lg bg-background">
      {/* Mobile menu */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onOpenSidebar}
        className="lg:hidden"
      >
        <Menu className="h-10 w-10" />
      </Button>

      <div className="flex flex-1 items-center justify-between px-6">
        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute text-gray-400 left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="pl-10 h-9 border border-gray-400 text-sm focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-muted-foreground hidden lg:block" />

          <Button variant="ghost" size="icon">
            <Bell className="h-10 w-10" />
          </Button>

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                <User className="h-10 w-10" />
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
