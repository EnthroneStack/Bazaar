"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut, Store as StoreIcon, X } from "lucide-react";
import { navigation } from "./navigation";
import { Store } from "./types";

interface Props {
  store: Store | null;
  sidebarOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function AdminSidebar({
  store,
  sidebarOpen,
  onClose,
  onLogout,
}: Props) {
  const pathname = usePathname();

  const SidebarContent = (
    <>
      <div className="px-4 pb-4 border-b border-gray-200 shadow-sm">
        {/* Logo */}
        <div className="flex justify-center pt-3">
          <div className="flex h-20 w-20 items-center justify-center">
            {!store?.logo ? (
              <Image
                src="/bazaar_logo.png"
                alt="Bazaar logo"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
                <span className="text-[10px] font-medium text-gray-400">
                  Logo
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Store Identity */}
        <div className="mt-2 text-center space-y-1">
          <p className="truncate text-base font-semibold text-gray-900">
            {store?.name ?? "Your Store"}
          </p>

          <p className="truncate text-xs text-gray-500">
            @{store?.slug ?? "storekingsleyenthrone"}
          </p>

          <div className="flex justify-center pt-1">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                store?.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {store?.status === "active" ? "Active" : "Pending Approval"}
            </span>
          </div>
        </div>
      </div>

      <nav className="mt-5 flex-1 space-y-1 px-2">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon
                className={`mr-3 h-6 w-6 ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-gray-500"
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <button
          onClick={onLogout}
          className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer"
        >
          <LogOut className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative flex h-full flex-col pt-5 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-md p-2 text-gray-400 hover:text-gray-500 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>

          {SidebarContent}
        </div>
      </div>
    </>
  );
}
