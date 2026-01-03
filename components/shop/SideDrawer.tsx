"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideDrawer() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Menu className="cursor-pointer text-slate-700" />
      </DrawerTrigger>

      <DrawerContent className="fixed top-0 right-0 h-full w-64 sm:w-80 bg-white shadow-lg flex flex-col justify-between z-[9999]">
        <DrawerHeader className="flex flex-row items-center justify-between border-b p-4">
          <DrawerTitle className="text-lg font-semibold">Menu</DrawerTitle>
          <DrawerClose asChild>
            <X className="cursor-pointer text-slate-700" />
          </DrawerClose>
        </DrawerHeader>

        <div className="flex flex-col p-6 gap-6 text-gray-700 font-medium">
          {links.map((link) => {
            const isActive = link.href === pathname;

            return (
              <DrawerClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={`${
                    isActive
                      ? "text-primary font-semibold"
                      : "hover:text-slate-400"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange-500 rounded-full"></span>
                  )}
                </Link>
              </DrawerClose>
            );
          })}
        </div>

        <DrawerFooter className="border-t p-4 text-sm text-gray-500 text-center">
          © 2025 Bazaar. All rights reserved.
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
