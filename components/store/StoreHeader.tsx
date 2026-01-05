"use client";

import { useEffect, useState } from "react";
import { Bell, ChevronDown, Menu } from "lucide-react";
import { DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Store = {
  id: string;
  name: string;
  logo?: string | null;
  username?: string;
};

export default function StoreHeader() {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchStore();
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
        <h2 className="text-lg font-semibold truncate max-w-[200px]">
          {store.name}
        </h2>
        <p className="text-sm text-gray-500">#{store.id.slice(0, 8)}</p>
      </>
    );
  };

  const renderAvatar = () => {
    if (loading) {
      return (
        <div className="h-8 w-8 rounded-full bg-primary/20 animate-pulse" />
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
      <Avatar className="h-8 w-8">
        <AvatarImage src={store?.logo ?? undefined} />
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>
    );
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
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

          <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
        </div>
      </div>

      <div className="sm:hidden mt-3">{renderStoreInfo()}</div>
    </header>
  );
}
