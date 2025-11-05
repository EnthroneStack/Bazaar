import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { productDummyData } from "@/assets/assets";
import { productAverageRatings } from "@/lib/product-review-map";
import { ShoppingCart, StarIcon } from "lucide-react";

type Product = (typeof productDummyData)[0];

const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

const ProductCard = ({ product, viewMode = "grid" }: ProductCardProps) => {
  const productWithRating = productAverageRatings.find(
    (p) => p.id === product.id
  );

  const rating = productWithRating?.averageRating ?? 0;

  if (viewMode === "list") {
    return (
      <Link
        href=""
        className="group flex gap-4 p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="bg-[#F5F5F5] rounded-lg w-24 h-24 flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
          <Image
            src={product.images[0]}
            width={96}
            height={96}
            className="max-h-20 w-auto group-hover:scale-110 duration-300 transition-transform"
            alt={product.name}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-1 mt-2">
            {Array(5)
              .fill("")
              .map((_, index) => {
                const fillColor =
                  rating >= index + 1
                    ? "#0d97d9"
                    : rating > index && rating < index + 1
                    ? "url(#half-star)"
                    : "#D1D5DB";

                return (
                  <StarIcon
                    key={index}
                    size={16}
                    className="text-transparent transition-transform duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_0_3px_rgba(13, 151, 217, 0.5)]"
                    fill={fillColor}
                  />
                );
              })}

            <span className="text-xs text-gray-600 ml-1">
              {rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400 ml-2">
              {product.category}
            </span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
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

            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-100 transition-colors duration-200"
            >
              <ShoppingCart size={16} />
              <span className="text-sm">Add to Cart</span>
            </button>
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
      href=""
      className="group max-xl:mx-auto transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="bg-[#F5F5F5] rounded-lg h-40 sm:h-68 sm:w-60 flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <Image
          src={product.images[0]}
          width={500}
          height={500}
          className="max-h-30 sm:max-h-40 w-auto group-hover:scale-110 duration-300 transition-transform"
          alt={product.name}
        />
      </div>

      <div className="flex justify-between text-sm gap-3 text-slate-800 pt-2 max-w-60">
        <div>
          <p className="font-medium">{product.name}</p>

          <div className="flex items-center gap-1 mt-0.5">
            {Array(5)
              .fill("")
              .map((_, index) => {
                const fillColor =
                  rating >= index + 1
                    ? "#0d97d9"
                    : rating > index && rating < index + 1
                    ? "url(#half-star)"
                    : "#D1D5DB";

                return (
                  <StarIcon
                    key={index}
                    size={16}
                    className="text-transparent transition-transform duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_0_3px_rgba(13, 151, 217, 0.5)]"
                    fill={fillColor}
                  />
                );
              })}

            <span className="text-xs text-gray-600 ml-1">{rating}</span>
          </div>
        </div>

        <p className="font-semibold">
          {currency}
          {product.price}
        </p>
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
