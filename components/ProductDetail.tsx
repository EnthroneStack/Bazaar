// components/ProductDetailPage.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { productAverageRatings, productData } from "@/lib/product-review-map";
import {
  StarIcon,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Check,
  X,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { productDummyData, reviewData } from "@/assets/assets";

const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

interface ProductDetailPageProps {
  productId?: string;
}

const ProductDetail = ({ productId }: ProductDetailPageProps) => {
  const params = useParams();
  const id = productId || (params.id as string);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

  // Find current product
  const currentProduct =
    productData.find((p) => p.id === id) ||
    productDummyData.find((p) => p.id === id);
  const productRating =
    productAverageRatings.find((p) => p.id === id)?.averageRating || 0;
  const productReviews = reviewData.filter(
    (review: { productId: string }) => review.productId === id
  );

  // Get related products (same category)
  const relatedProducts = productData
    .filter((p) => p.category === currentProduct?.category && p.id !== id)
    .slice(0, 4);

  // Get sponsored products (different category, for demonstration)
  const sponsoredProducts = productData
    .filter((p) => p.category !== currentProduct?.category)
    .slice(0, 4);

  // Get "customers also viewed" products
  const customersAlsoViewed = productData
    .filter((p) => p.id !== id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  // Simulate recently viewed products
  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    const updatedViewed = [
      currentProduct,
      ...viewed.filter((p: any) => p?.id !== id),
    ].slice(0, 5);
    localStorage.setItem("recentlyViewed", JSON.stringify(updatedViewed));
    setRecentlyViewed(updatedViewed.filter(Boolean));
  }, [id, currentProduct]);

  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link href="/shop">
            <Button className="bg-primary text-white">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of ${currentProduct.name} to cart`);
  };

  const handleBuyNow = () => {
    // Buy now logic here
    console.log(`Buying ${quantity} of ${currentProduct.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary">
              Shop
            </Link>
            <span>/</span>
            <Link
              href={`/category/${currentProduct.category.toLowerCase()}`}
              className="hover:text-primary"
            >
              {currentProduct.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">
              {currentProduct.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-lg border p-4 flex items-center justify-center aspect-square">
              <Image
                src={currentProduct.images[selectedImage]}
                alt={currentProduct.name}
                width={600}
                height={600}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {currentProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${currentProduct.name} view ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentProduct.name}
              </h1>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon
                      key={index}
                      size={20}
                      className={`${
                        index < Math.floor(productRating)
                          ? "text-yellow-400 fill-current"
                          : index < productRating
                          ? "text-yellow-400 fill-current opacity-50"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {productRating.toFixed(1)} ({productReviews.length} reviews)
                  </span>
                </div>
                <span className="text-sm text-green-600 font-medium">
                  {currentProduct.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {currency}
                  {currentProduct.price}
                </span>
                {currentProduct.mrp > currentProduct.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {currency}
                      {currentProduct.mrp}
                    </span>
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                      Save {currency}
                      {currentProduct.mrp - currentProduct.price}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{currentProduct.description}</p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900">
                  Quantity:
                </span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!currentProduct.inStock}
                  className="flex-1 bg-primary text-white hover:bg-primary-600 py-3"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={!currentProduct.inStock}
                  className="flex-1 bg-orange-600 text-white hover:bg-orange-700 py-3"
                >
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-3"
                >
                  <Heart
                    size={20}
                    className={
                      isWishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }
                  />
                </Button>
                <Button variant="outline" className="p-3">
                  <Share2 size={20} />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y">
              <div className="flex items-center space-x-2">
                <Truck size={20} className="text-green-600" />
                <div>
                  <div className="font-medium text-sm">Free Shipping</div>
                  <div className="text-xs text-gray-500">
                    On orders over $50
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={20} className="text-blue-600" />
                <div>
                  <div className="font-medium text-sm">2-Year Warranty</div>
                  <div className="text-xs text-gray-500">
                    Product protection
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw size={20} className="text-purple-600" />
                <div>
                  <div className="font-medium text-sm">Easy Returns</div>
                  <div className="text-xs text-gray-500">
                    30-day return policy
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Sold by</h3>
              <div className="flex items-center space-x-3">
                <Image
                  src={currentProduct.store.logo}
                  alt={currentProduct.store.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="font-medium">{currentProduct.store.name}</div>
                  <div className="text-sm text-gray-600">
                    98% Positive Feedback
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Store
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <div className="border-b">
            <nav className="flex space-x-8">
              {[
                { id: "description", label: "Description" },
                { id: "specifications", label: "Specifications" },
                { id: "reviews", label: `Reviews (${productReviews.length})` },
                { id: "shipping", label: "Shipping & Returns" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p>{currentProduct.description}</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <Check size={16} className="text-green-600 mr-2" />
                    Premium quality materials
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="text-green-600 mr-2" />
                    Easy to use and maintain
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="text-green-600 mr-2" />
                    Customer support available
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Product Details</h4>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Brand</dt>
                      <dd className="font-medium">
                        {currentProduct.store.name}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Category</dt>
                      <dd className="font-medium">{currentProduct.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">SKU</dt>
                      <dd className="font-medium">{currentProduct.id}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Dimensions</h4>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Weight</dt>
                      <dd className="font-medium">1.2 kg</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Dimensions</dt>
                      <dd className="font-medium">15 x 10 x 8 cm</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Rating Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      {productRating.toFixed(1)}
                    </div>
                    <div className="flex justify-center mb-2">
                      {Array.from({ length: 5 }, (_, index) => (
                        <StarIcon
                          key={index}
                          size={20}
                          className={`${
                            index < Math.floor(productRating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-gray-600">
                      Based on {productReviews.length} reviews
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = productReviews.filter(
                        (r) => Math.floor(r.rating) === star
                      ).length;
                      const percentage =
                        productReviews.length > 0
                          ? (count / productReviews.length) * 100
                          : 0;

                      return (
                        <div key={star} className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 w-8">
                            {star}
                          </span>
                          <StarIcon
                            size={16}
                            className="text-yellow-400 fill-current"
                          />
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-12 text-right">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {productReviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-6 last:border-b-0"
                    >
                      <div className="flex items-start space-x-3">
                        <Image
                          src={review.user.avatar}
                          alt={review.user.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-medium">
                                {review.user.name}
                              </div>
                              <div className="flex items-center space-x-1">
                                {Array.from({ length: 5 }, (_, index) => (
                                  <StarIcon
                                    key={index}
                                    size={14}
                                    className={`${
                                      index < Math.floor(review.rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Shipping Information</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Free standard shipping on orders over $50</li>
                    <li>• Express shipping available for $9.99</li>
                    <li>• International shipping available</li>
                    <li>• Usually ships within 1-2 business days</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Return Policy</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 30-day money-back guarantee</li>
                    <li>• Free returns within 30 days</li>
                    <li>• Product must be in original condition</li>
                    <li>• Contact customer service for return authorization</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Related Products
              </h2>
              <Link
                href={`/category/${currentProduct.category.toLowerCase()}`}
                className="text-primary hover:text-primary-600 font-medium"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode="grid"
                />
              ))}
            </div>
          </section>
        )}

        {/* Sponsored Products */}
        {sponsoredProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Sponsored Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {sponsoredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode="grid"
                />
              ))}
            </div>
          </section>
        )}

        {/* Customers Also Viewed */}
        {customersAlsoViewed.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Customers Also Viewed
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {customersAlsoViewed.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border p-4"
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="aspect-square mb-3">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">
                        {currency}
                        {product.price}
                      </span>
                      <div
                        className={`text-xs px-2 py-1 rounded ${
                          product.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recently Viewed
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {recentlyViewed.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border p-4"
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="aspect-square mb-3">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">
                        {currency}
                        {product.price}
                      </span>
                      <div
                        className={`text-xs px-2 py-1 rounded ${
                          product.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
