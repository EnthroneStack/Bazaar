"use client";

import Image from "next/image";
import Link from "next/link";
import { PackageIcon, Search, ShoppingCart } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import SearchBar from "../SearchBar";
import { Button } from "../ui/button";
import { SideDrawer } from "../shop/SideDrawer";
import SearchOverlay from "../SearchOverlay";
import { useAppSelector } from "@/hooks/redux-hook";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { openSearch, isSearchOpen } = useSearch();
  const router = useRouter();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const { total } = useAppSelector((state) => state.cart);
  const [hasStore, setHasStore] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) return;

    const checkStore = async () => {
      try {
        const res = await fetch("/api/store/me");
        if (!res.ok) {
          setHasStore(false);
          return;
        }
        const data = await res.json();
        setHasStore(data.hasStore);
      } catch {
        setHasStore(false);
      }
    };

    checkStore();
  }, [user]);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="mx-4 sm:mx-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto py-3 sm:py-4 transition-all">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={"/bazaar_logo.png"}
                alt="bazaar"
                height={100}
                width={100}
                className="w-16 sm:w-20 h-auto"
              />
            </Link>

            <div className="hidden sm:flex items-center gap-6 lg:gap-10 text-slate-700 font-medium">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link
                href="/shop"
                className="hover:text-primary transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <SearchBar />
            </div>

            <div className="flex items-center gap-3 sm:gap-5 lg:gap-6">
              <Search
                onClick={openSearch}
                className="xl:hidden text-slate-700 cursor-pointer size-4 sm:size-5"
                size={18}
              />

              <Link href="/cart" className="relative">
                <ShoppingCart
                  size={18}
                  className="text-slate-700 size-4 sm:size-5"
                />
                <span className="absolute -top-2 -right-2 text-[8px] sm:text-[10px] bg-primary text-white px-1 rounded-full min-w-[16px] text-center">
                  {total}
                </span>
              </Link>

              {!user ? (
                <Button
                  className="px-4 sm:px-6 py-1 sm:py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm h-7 sm:h-auto"
                  onClick={() => openSignIn()}
                >
                  Login
                </Button>
              ) : (
                <UserButton>
                  <UserButton.MenuItems>
                    {hasStore === true && (
                      <UserButton.Action
                        labelIcon={<PackageIcon size={16} />}
                        label="My Store"
                        onClick={() => router.push("/store")}
                      />
                    )}

                    {hasStore === false && (
                      <UserButton.Action
                        labelIcon={<PackageIcon size={16} />}
                        label="Create Store"
                        onClick={() => router.push("/create-store")}
                      />
                    )}
                  </UserButton.MenuItems>
                </UserButton>
              )}

              <div className="sm:hidden">
                <SideDrawer />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isSearchOpen && <SearchOverlay />}
    </>
  );
};

export default Navbar;
