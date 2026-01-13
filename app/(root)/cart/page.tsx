import CartPageContent from "@/components/cart/CartPageContent";
import { Suspense } from "react";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<CartLoadingSkeleton />}>
        <CartPageContent />
      </Suspense>
    </div>
  );
}

function CartLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
