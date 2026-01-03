"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const Banner = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClaim = async () => {
    try {
      await navigator.clipboard.writeText("COUPON");
      setIsOpen(false);
      toast.success("Coupon copied to clipboard!");
    } catch {
      toast.error("Failed to copy coupon!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-full px-4 sm:px-6 py-2 sm:py-1 font-medium text-xs sm:text-sm text-white text-center bg-primary">
      <div className="flex items-center justify-between max-w-7xl mx-auto gap-2 sm:gap-0">
        <p className="flex-1 text-left sm:text-center">
          Get 20% OFF on Your First Order!
        </p>
        <div className="flex items-center space-x-3 sm:space-x-6 flex-shrink-0">
          <Button
            type="button"
            className="font-normal text-gray-800 bg-white px-7 py-2 rounded-full max-sm:px-4 max-sm:py-0.5 max-sm:h-7 max-sm:text-[11px] hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
            onClick={handleClaim}
          >
            Claim Offer
          </Button>
          <X
            className="cursor-pointer size-4 sm:size-5 hover:opacity-90 transition flex-shrink-0"
            onClick={() => setIsOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
