"use client";

import { Bell, ChevronDown, Menu } from "lucide-react";
import { DrawerTrigger } from "@/components/ui/drawer";

export default function StoreHeader() {
  const storeName = "My Awesome Store";

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile menu */}
          <DrawerTrigger asChild>
            <button className="sm:hidden p-2 text-gray-600 hover:text-gray-900 cursor-pointer">
              <Menu className="h-5 w-5" />
            </button>
          </DrawerTrigger>

          <div className="hidden sm:block">
            <h2 className="text-lg font-semibold text-gray-900">{storeName}</h2>
            <p className="text-sm text-gray-500">Store ID: #ST-7842</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Bell className="h-5 w-5" />
          </button>

          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            JS
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
