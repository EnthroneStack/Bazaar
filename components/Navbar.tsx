"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Search, ShoppingCart } from "lucide-react";
import SearchBar from "./SearchBar";
import { Button } from "./ui/button";
import { SideDrawer } from "./SideDrawer";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={"/bazaar_logo.png"}
              alt="bazaar"
              height={100}
              width={100}
              className="w-20 h-auto"
            />
          </Link>

          <div className="hidden sm:flex items-center gap-6 lg:gap-10 text-slate-700 font-medium">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <SearchBar />
          </div>

          <div className="flex items-center gap-5 lg:gap-6">
            <Search
              className="xl:hidden text-slate-700 cursor-pointer"
              size={18}
            />

            <Link href="" className="relative">
              <ShoppingCart size={18} className="text-slate-700" />
              <span className="absolute -top-2 -right-2 text-[10px] bg-slate-700 text-white px-1 rounded-full">
                0
              </span>
            </Link>

            <Button className="px-6 py-0.5 sm:py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm">
              Login
            </Button>

            <div className="sm:hidden">
              <SideDrawer />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
