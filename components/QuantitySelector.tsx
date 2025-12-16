"use client";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const QuantitySelector = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  showLabel = true,
  label = "Quantity:",
  size = "md",
  className = "",
}: QuantitySelectorProps) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const buttonSizeClasses = {
    sm: "px-2 py-1",
    md: "px-3 py-2",
    lg: "px-4 py-3",
  };

  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {showLabel && (
        <span className={`font-medium text-gray-700 ${sizeClasses[size]}`}>
          {label}
        </span>
      )}
      <div className="flex items-center border border-gray-300 rounded-lg">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={quantity <= min}
          className={`hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            buttonSizeClasses[size]
          } ${quantity <= min ? "text-gray-400" : "text-gray-700"}`}
        >
          -
        </button>
        <span className={`px-4 py-2 min-w-12 text-center ${sizeClasses[size]}`}>
          {quantity}
        </span>
        <button
          type="button"
          onClick={handleIncrease}
          disabled={quantity >= max}
          className={`hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            buttonSizeClasses[size]
          } ${quantity >= max ? "text-gray-400" : "text-gray-700"}`}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
