import { Store } from "lucide-react";

const StoreHeader = () => {
  return (
    <div className="text-center mb-12">
      <Store className="w-16 h-16 text-primary mx-auto mb-4" />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Create Your Store
      </h1>
      <p className="text-lg text-gray-600">
        Join our marketplace and start selling to millions of customers
        worldwide
      </p>
    </div>
  );
};

export default StoreHeader;
