"use client";

import { useSearch } from "@/context/SearchContext";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import {
  History,
  Search,
  X,
  ArrowLeft,
  Cloud,
  CloudOff,
  RefreshCw,
} from "lucide-react";
import { Input } from "./ui/input";
import { categories } from "@/assets/assets";
import { useRouter } from "next/navigation";

const SearchOverlay = () => {
  const {
    closeSearch,
    searchQuery,
    setSearchQuery,
    recentSearches,
    addToRecentSearches,
    clearRecentSearches,
    syncSearchHistory,
    isSyncing,
    isCloudEnabled,
  } = useSearch();
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (searchQuery.trim()) {
      addToRecentSearches(searchQuery.trim());
      closeSearch();
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleManualSync = async () => {
    await syncSearchHistory();
  };

  const handleBackToShop = () => {
    closeSearch();
    router.push("/shop");
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    handleSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      closeSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setTimeout(() => handleSearch(), 100);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSearchQuery(categoryName);
    setTimeout(() => handleSearch(), 100);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 animate-in fade-in duration-300">
      {/* Header with Back Button */}
      <div className="border-b border-gray-200 sticky top-0 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={handleBackToShop}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                size="sm"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Shop</span>
              </Button>

              <div className="flex items-center gap-2">
                <Image
                  src={"/bazaar_logo.png"}
                  alt="Bazaar"
                  height={100}
                  width={100}
                  className="w-12 h-auto"
                />
                <span className="text-lg font-semibold text-gray-800">
                  Search
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  onClick={handleManualSync}
                  disabled={isSyncing || !isCloudEnabled}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 relative"
                  size="sm"
                  title={
                    isCloudEnabled
                      ? "Sync search history"
                      : "Cloud sync disabled"
                  }
                >
                  {isSyncing ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : isCloudEnabled ? (
                    <Cloud size={16} className="text-green-500" />
                  ) : (
                    <CloudOff size={16} className="text-gray-400" />
                  )}
                  <span className="hidden sm:inline text-xs">
                    {isSyncing
                      ? "Syncing..."
                      : isCloudEnabled
                      ? "Cloud"
                      : "Offline"}
                  </span>
                </Button>

                <div
                  className={`w-2 h-2 rounded-full ${
                    isCloudEnabled ? "bg-green-500" : "bg-gray-400"
                  }`}
                  title={
                    isCloudEnabled
                      ? "Cloud sync enabled"
                      : "Cloud sync disabled"
                  }
                />
              </div>

              <Button
                variant="ghost"
                onClick={closeSearch}
                className="hover:bg-gray-100 transition-colors rounded-full p-2"
                size="icon"
              >
                <X size={24} className="text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-4rem)] overflow-y-auto">
        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for products, brands and categories..."
            className="w-full pl-12 pr-12 text-base sm:text-lg border border-gray-300 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent py-6"
            autoFocus
          />

          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 rounded-full p-2"
              size="icon"
            >
              <X size={18} />
            </Button>
          )}
        </form>

        {/* Search Results/Suggestions */}
        {searchQuery ? (
          <div className="space-y-6">
            {/* Quick Search Button */}
            <div className="space-y-3">
              <Button
                onClick={() => handleSearch()}
                className="w-full bg-primary hover:bg-primary-600 text-white py-3 text-lg font-medium"
              >
                Search for "{searchQuery}"
              </Button>

              <Button
                variant="outline"
                onClick={handleBackToShop}
                className="w-full flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back to All Products
              </Button>
            </div>

            {/* Quick Suggestions */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Quick Suggestions
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 6).map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-white hover:bg-gray-50 text-gray-700 rounded-full text-sm transition-colors border-gray-300"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    Recent Searches
                  </h3>
                  <Button
                    variant="ghost"
                    onClick={clearRecentSearches}
                    className="text-sm text-primary hover:text-primary-600 transition-colors"
                  >
                    Clear all
                  </Button>
                </div>

                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={() => handleRecentSearchClick(search)}
                      className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors group justify-start h-auto"
                    >
                      <History
                        size={18}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900 text-left flex-1">
                        {search}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Categories */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Browse Categories
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: "Headphones", emoji: "🎧" },
                  { name: "Speakers", emoji: "🔊" },
                  { name: "Watches", emoji: "⌚" },
                  { name: "Earbuds", emoji: "🎵" },
                  { name: "Mouse", emoji: "🖱️" },
                  { name: "Decoration", emoji: "🏡" },
                  { name: "Cameras", emoji: "📷" },
                  { name: "Pens", emoji: "🖊️" },
                  { name: "Theater", emoji: "🎭" },
                ].map((category) => (
                  <Button
                    key={category.name}
                    variant="ghost"
                    onClick={() => handleCategoryClick(category.name)}
                    className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left h-auto flex-col sm:flex-row"
                  >
                    <span className="text-2xl sm:text-lg">
                      {category.emoji}
                    </span>
                    <span className="text-sm text-gray-700 font-medium">
                      {category.name}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
