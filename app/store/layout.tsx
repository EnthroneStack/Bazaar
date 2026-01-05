"use client";

import StoreHeader from "@/components/store/StoreHeader";
import StoreSidebar from "@/components/store/StoreSidebar";
import { Drawer } from "@/components/ui/drawer";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Drawer direction="left">
      <div className="min-h-screen bg-gray-50">
        <StoreHeader />

        <div className="flex">
          <StoreSidebar />
          <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </Drawer>
  );
}
