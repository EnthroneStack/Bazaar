"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Bell, Eye, Menu, Settings, User } from "lucide-react";
import { DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";

type Store = {
  id: string;
  name: string;
  logo?: string | null;
  username?: string;
};

export default function StoreHeader() {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isMainStorePage = pathname === "/store";

  const fetchStore = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/store");

      const data = await res.json();
      setStore(data.store);
    } catch (error) {
      console.error("Failed to load store: ", error);
      setStore(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();

    const refetchStore = () => {
      fetchStore();
    };

    window.addEventListener("store-updated", refetchStore);

    return () => {
      window.removeEventListener("store-updated", refetchStore);
    };
  }, []);

  const renderStoreInfo = () => {
    if (loading) {
      return (
        <div className="space-y-2">
          <div className="h-6 w-40 bg-gray-200 animate-pulse rounded-md" />
          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded-md" />
        </div>
      );
    }

    if (!store) {
      return (
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">No Store Found</h2>
          <p className="text-sm text-gray-500">Create your first store</p>
        </div>
      );
    }

    return (
      <>
        <h2 className="text-2xl font-bold truncate max-w-[300px]">
          {store.name}
        </h2>
        <p className="text-sm text-gray-500">ID: #{store.id.slice(0, 8)}</p>
      </>
    );
  };

  const renderAvatar = () => {
    if (loading) {
      return (
        <div className="h-12 w-12 rounded-full bg-primary/20 animate-pulse" />
      );
    }

    const initials =
      store?.name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "ST";

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={!store}>
          <Button
            variant="ghost"
            className={`focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full transition-all ${
              store ? "hover:scale-105 cursor-pointer" : "cursor-default"
            }`}
          >
            <Avatar
              className={`h-12 w-12 border-2 ${
                store ? "border-primary/20" : "border-gray-200"
              }`}
            >
              <AvatarImage src={store?.logo ?? undefined} />
              <AvatarFallback
                className={`text-lg font-semibold ${
                  store
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        {store && (
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white border border-gray-200 shadow-lg"
          >
            <DropdownMenuItem
              onClick={() => {
                if (store?.logo) {
                  window.open(store.logo, "_blank");
                }
              }}
              className="cursor-pointer"
              disabled={!store?.logo}
            >
              <Eye className="mr-2 h-4 w-4" />
              {store?.logo ? "View Logo" : "No Logo Available"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/store/profile")}
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              Store Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/store/settings")}
              className="cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    );
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!isMainStorePage && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-gray-100"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon-lg" className="sm:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </DrawerTrigger>

          <div className="hidden sm:block">{renderStoreInfo()}</div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon-lg"
            className="p-2 text-gray-600 hover:text-gray-900"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>

          {renderAvatar()}
        </div>
      </div>

      <div className="sm:hidden mt-3">{renderStoreInfo()}</div>
    </header>
  );
}
