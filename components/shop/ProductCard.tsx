import Image from "next/image";
import Link from "next/link";
import type { productDummyData } from "@/assets/assets";
import { productAverageRatings } from "@/lib/product-review-map";
import { ShoppingCart } from "lucide-react";
import StarRating from "./StarRating";
import { Button } from "../ui/button";

type Product = (typeof productDummyData)[0];

const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  searchQuery?: string;
  shouldHighlight?: boolean;
}

const HighlightSearchTerm = ({
  text,
  searchTerm,
  shouldHighlight = true,
}: {
  text: string;
  searchTerm: string;
  shouldHighlight?: boolean;
}) => {
  if (!searchTerm || !shouldHighlight) return <>{text}</>;

  const lowerCaseText = text.toLowerCase();
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const index = lowerCaseText.indexOf(lowerCaseSearchTerm);

  if (index === -1) return <>{text}</>;

  const before = text.slice(0, index);
  const match = text.slice(index, index + searchTerm.length);
  const after = text.slice(index + searchTerm.length);

  return (
    <>
      {before}
      <span className="bg-primary text-primary-foreground px-1 rounded mx-0.5">
        {match}
      </span>
      {after}
    </>
  );
};

const ProductCard = ({
  product,
  viewMode = "grid",
  searchQuery = "",
}: ProductCardProps) => {
  const productWithRating = productAverageRatings.find(
    (p) => p.id === product.id
  );
  const rating = productWithRating?.averageRating ?? 0;

  const productMatchesSearch =
    !!searchQuery &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase());

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
            <HighlightSearchTerm
              text={product.name}
              searchTerm={searchQuery}
              shouldHighlight={productMatchesSearch}
            />
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-1 mt-2 flex-wrap">
            <StarRating
              rating={rating}
              size="sm"
              showRating
              className="flex-shrink-0"
            />

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
        <p className="font-medium text-sm sm:text-base">
          <HighlightSearchTerm
            text={product.name}
            searchTerm={searchQuery}
            shouldHighlight={productMatchesSearch}
          />
        </p>

        <div className="flex items-center gap-1 mt-0.5">
          <StarRating rating={rating} size="sm" showRating />
        </div>

        <div className="flex items-center justify-between">
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

          <span className="text-xs text-gray-400 ml-2 hidden sm:inline flex-shrink-0">
            {product.category}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
