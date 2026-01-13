import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmptyCartState() {
  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
        <ShoppingBag className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Your cart is empty
      </h2>
      <p className="text-gray-600 mb-8">
        Looks like you haven't added any items to your cart yet. Start shopping
        to discover amazing products!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg">
          <Link href="/shop">Start Shopping</Link>
        </Button>
        <Button variant="outline" asChild size="lg">
          <Link href="/">Continue Browsing</Link>
        </Button>
      </div>
    </div>
  );
}
