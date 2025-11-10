import Image from "next/image";
import Link from "next/link";
import type { productDummyData } from "@/assets/assets";
import { productAverageRatings } from "@/lib/product-review-map";
import { ShoppingCart, StarIcon } from "lucide-react";
import { Button } from "./ui/button";

type Product = (typeof productDummyData)[0];

const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

interface ProductCardProps {
  product: Product;
  viewMode?: string;
}

const ProductCard = ({ product, viewMode = "grid" }: ProductCardProps) => {
  const productWithRating = productAverageRatings.find(
    (p) => p.id === product.id
  );
  const rating = productWithRating?.averageRating ?? 0;

  if (viewMode === "list") {
    return (
      <Link
        href={`/product/${product.id}`}
        className="group w-full flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300"
      >
        <div className="bg-[#F5F5F5] w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 rounded-lg flex-shrink-0">
          <Image
            src={product.images[0]}
            width={96}
            height={96}
            alt={product.name}
            className="max-h-12 sm:max-h-20 w-auto group-hover:scale-110 duration-300 transition-transform"
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <h3 className="font-semibold text-sm sm:text-lg text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-1 mt-2 flex-wrap">
            {Array.from({ length: 5 }, (_, index) => {
              const fillColor =
                rating >= index + 1
                  ? "#0d97d9"
                  : rating > index && rating < index + 1
                  ? "url(#half-star)"
                  : "#D1D5DB";

              return (
                <StarIcon
                  key={index}
                  size={14}
                  className="text-transparent transition-transform duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_0_3px_rgba(13, 151, 217, 0.5)] flex-shrink-0"
                  fill={fillColor}
                />
              );
            })}

            <span className="text-xs text-gray-600 ml-1 flex-shrink-0">
              {rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400 ml-2 hidden sm:inline flex-shrink-0">
              {product.category}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-3">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold text-gray-900">
                {currency}
                {product.price}
              </span>
              {product.mrp > product.price && (
                <span className="text-sm font-normal text-gray-500 line-through">
                  {currency}
                  {product.mrp}
                </span>
              )}
            </div>

            <Button className="bg-primary text-white hover:bg-primary-100 shadow-sm shadow-slate-300 hover:shadow-md duration-300 transition-all w-full sm:w-auto flex-shrink-0">
              <ShoppingCart size={16} />
              <span className="text-sm font-normal ml-2">Add to Cart</span>
            </Button>
          </div>
        </div>

        <svg width="0" height="0">
          <defs>
            <linearGradient id="half-star">
              <stop offset="50%" stopColor="#0d97d9" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
        </svg>
      </Link>
    );
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="group transition-transform duration-300 hover:scale-[1.02] w-full"
    >
      <div className="bg-[#F5F5F5] h-40 sm:h-48 w-full sm:w-50 flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <Image
          src={product.images[0]}
          width={500}
          height={500}
          alt={product.name}
          className="max-h-24 sm:max-h-32 w-auto group-hover:scale-110 duration-300 transition-transform object-contain"
        />
      </div>

      <div className="mt-2">
        <p className="font-medium text-sm sm:text-base">{product.name}</p>

        <div className="flex items-center gap-1 mt-0.5">
          {Array.from({ length: 5 }, (_, index) => {
            const fillColor =
              rating >= index + 1
                ? "#0d97d9"
                : rating > index && rating < index + 1
                ? "url(#half-star)"
                : "#D1D5DB";

            return (
              <StarIcon
                key={index}
                size={14}
                fill={fillColor}
                className="text-transparent transition-transform duration-200 group-hover:scale-110"
              />
            );
          })}
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-base font-bold text-gray-900">
            {currency}
            {product.price}
          </span>
          {product.mrp > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {currency}
              {product.mrp}
            </span>
          )}
        </div>
      </div>

      <svg width="0" height="0">
        <defs>
          <linearGradient id="half-star">
            <stop offset="50%" stopColor="#0d97d9" />
            <stop offset="50%" stopColor="#D1D5DB" />
          </linearGradient>
        </defs>
      </svg>
    </Link>
  );
};

export default ProductCard;
