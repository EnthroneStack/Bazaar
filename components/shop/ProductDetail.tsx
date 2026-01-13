"use client";

import { productDummyData, reviewData } from "@/assets/assets";
import {
  Check,
  ChevronRight,
  Heart,
  RotateCcw,
  Share2,
  Shield,
  ShoppingCart,
  Truck,
  Eye,
  MessageCircle,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { productAverageRatings } from "@/lib/product-review-map";
import ProductCard from "./ProductCard";
import { Button } from "../ui/button";
import QuantitySelector from "../QuantitySelector";
import { useAppDispatch } from "@/hooks/redux-hook";
import { addToCart } from "@/lib/redux/features/cart/cartSlice";
import { toast } from "sonner";
import { useProductTracking } from "@/context/ProductTrackingContext";

const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

const ProductDetail = ({ productId }: { productId: string }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isOrderingViaWhatsApp, setIsOrderingViaWhatsApp] = useState(false);

  const dispatch = useAppDispatch();

  const {
    recentlyViewed,
    customersAlsoViewed,
    trackProductView,
    trackProductPurchase,
    getSimilarProducts,
    clearRecentlyViewed,
  } = useProductTracking();

  const product = productDummyData.find((p) => p.id === productId);
  const productRating = productAverageRatings.find((p) => p.id === productId);
  const reviews = reviewData.filter((review) => review.productId === productId);

  const sponsoredProducts = productDummyData
    .filter((p) => p.category !== product?.category)
    .slice(0, 4);

  useEffect(() => {
    if (product) {
      trackProductView(productId);
    }
  }, [productId, product, trackProductView]);

  useEffect(() => {
    const loadRelatedProducts = async () => {
      setLoadingRelated(true);
      const products = await getSimilarProducts(productId);
      setRelatedProducts(products);
      setLoadingRelated(false);
    };

    if (productId) {
      loadRelatedProducts();
    }
  }, [productId, getSimilarProducts]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }
  const rating = productRating?.averageRating || 0;
  const discount =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  // WhatsApp Integration Functions
  const generateWhatsAppOrderMessage = () => {
    const storeName = product.store.name;
    const productName = product.name;
    const price = product.price;
    const total = price * quantity;

    const message = `Hello ${storeName}!%0A%0AI want to order:%0A%0A*${productName}*%0AQuantity: ${quantity}%0APrice: ${currency}${price} each%0ATotal: ${currency}${total}%0A%0ACan we proceed with this order?`;

    return message;
  };

  const handleWhatsAppOrder = () => {
    setIsOrderingViaWhatsApp(true);

    // In a real app, you'd have the seller's WhatsApp number from the product/store data
    // For now, we'll use a placeholder number
    const sellerWhatsAppNumber = "+2348134148470"; // Nigerian format
    const message = generateWhatsAppOrderMessage();

    // Construct WhatsApp URL
    const whatsappUrl = `https://wa.me/${sellerWhatsAppNumber}?text=${message}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Track the purchase attempt
    trackProductPurchase(productId);

    // Reset loading state after a delay
    setTimeout(() => {
      setIsOrderingViaWhatsApp(false);
    }, 2000);
  };
  const handleAddToCart = async () => {
    if (!product.inStock) {
      toast.error("This product is out of stock");
      return;
    }

    setIsAddingToCart(true);

    try {
      // Add product to cart with the selected quantity
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart({ productId }));
      }

      // Show success notification
      toast.success(`Added ${quantity} ${product.name} to cart!`, {
        duration: 3000,
        icon: "🛒",
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };
  const handleBuyNow = () => {
    // First add to cart
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({ productId }));
    }

    // Then track purchase and redirect to checkout
    trackProductPurchase(productId);

    // In a real app, redirect to checkout page
    // router.push('/checkout');

    alert(
      `Added ${quantity} ${product.name} to cart! Redirecting to checkout...`
    );
  };

  // Share product via WhatsApp
  const handleShareViaWhatsApp = () => {
    const productUrl = `${window.location.origin}/product/${productId}`;
    const message = `Check out this product: ${product.name}%0A${productUrl}`;

    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />

            <Link href="/shop" className="hover:text-gray-900">
              Shop
            </Link>
            <ChevronRight className="h-4 w-4" />

            <span className="text-gray-900">{product?.category}</span>
            <ChevronRight className="h-4 w-4" />

            <span className="text-gray-500 truncate">{product?.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Section */}
        <div className="bg-white border-gray-400 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-2 overflow-x-auto">
                {product?.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
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
              {/* Header */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                  {product.name}
                </h1>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-4 mb-4">
                  <StarRating rating={rating} size="lg" showRating />
                  <span className="text-sm text-gray-500">
                    {reviews.length} reviews
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      product.inStock ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {currency}
                    {product.price}
                  </span>
                  {product?.mrp > product?.price && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        {currency}
                        {product.mrp}
                      </span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                        Save {discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                {/* Quantity Selector */}
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  min={1}
                  max={99}
                  size="md"
                  className="space-x-4"
                />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAddingToCart}
                    className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transition-colors duration-300"
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleWhatsAppOrder}
                    disabled={!product.inStock || isOrderingViaWhatsApp}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium shadow-xl hover:shadow-2xl transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    {isOrderingViaWhatsApp ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Opening WhatsApp...</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-5 w-5" />
                        <span>Order on WhatsApp</span>
                      </>
                    )}
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="p-3 border-gray-300 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-colors duration-300"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button
                      onClick={handleShareViaWhatsApp}
                      variant="outline"
                      className="p-3 border-gray-300 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-colors duration-300"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* WhatsApp Benefits */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center space-x-2 text-green-800 mb-2">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">Why order via WhatsApp?</span>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Chat directly with the seller</li>
                    <li>• Negotiate price (if allowed)</li>
                    <li>• Arrange delivery/pickup</li>
                    <li>• Get instant responses</li>
                  </ul>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-400">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <RotateCcw className="h-5 w-5 text-green-600" />
                  <span>7-day returns</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>2-year warranty</span>
                </div>
              </div>

              {/* Seller Info */}
              <div className="pt-6 border-t">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Sold by
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                    <Image
                      src={product.store.logo}
                      alt={product.store.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.store.name}
                    </p>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <StarRating rating={4.8} size="sm" showRating={false} />
                      <span>4.8 • 98% Positive Feedback</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex space-x-4 text-sm">
                  <Link
                    href={`/store/${product.store.id}`}
                    className="text-primary hover:text-primary-600 font-medium cursor-pointer"
                  >
                    Visit Store
                  </Link>
                  <button
                    onClick={() => {
                      const message = `Hello ${product.store.name}! I saw your product ${product.name} on Bazaar. Can we chat about it?`;
                      window.open(
                        `https://wa.me/2341234567890?text=${encodeURIComponent(
                          message
                        )}`,
                        "_blank"
                      );
                    }}
                    className="text-green-600 hover:text-green-700 font-medium cursor-pointer flex items-center space-x-1"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat on WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      window.open(
                        `tel:${product.store.contact || "+2341234567890"}`
                      );
                    }}
                    className="text-primary hover:text-primary-600 font-medium cursor-pointer flex items-center space-x-1"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Seller</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "description", label: "Description" },
                { id: "specifications", label: "Specifications" },
                { id: "reviews", label: `Reviews (${reviews.length})` },
                { id: "shipping", label: "Shipping & Returns" },
                { id: "seller", label: "Seller Info" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
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

          <div className="p-6">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Premium quality materials</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>1-year manufacturer warranty</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Free technical support</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">General</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Brand</dt>
                      <dd className="text-gray-900">{product.store.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Category</dt>
                      <dd className="text-gray-900">{product.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Model</dt>
                      <dd className="text-gray-900">
                        PRO-{product.id.split("_")[1]}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Dimensions</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Weight</dt>
                      <dd className="text-gray-900">1.2 kg</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Dimensions</dt>
                      <dd className="text-gray-900">15 × 10 × 5 cm</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">
                      {rating.toFixed(1)}
                    </div>
                    <StarRating rating={rating} size="md" showRating={false} />
                    <div className="text-sm text-gray-600 mt-1">
                      {reviews.length} reviews
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = reviews.filter(
                        (r) => Math.round(r.rating) === stars
                      ).length;
                      const percentage =
                        reviews.length > 0 ? (count / reviews.length) * 100 : 0;

                      return (
                        <div
                          key={stars}
                          className="flex items-center space-x-2"
                        >
                          <span className="text-sm text-gray-600 w-4">
                            {stars}
                          </span>
                          <StarRating
                            rating={stars}
                            size="sm"
                            showRating={false}
                          />
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8 text-right">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-4 last:border-0"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                          <Image
                            src={review.user.avatar}
                            alt={review.user.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {review.user.name}
                          </p>
                          <div className="flex items-center space-x-2">
                            <StarRating
                              rating={review.rating}
                              showRating={true}
                              size="sm"
                            />
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Shipping Information
                  </h4>
                  <p>
                    Free standard shipping on all orders. Express shipping
                    available for an additional fee.
                  </p>
                  <ul className="mt-2 space-y-1">
                    <li>• Standard shipping: 3-5 business days</li>
                    <li>• Express shipping: 1-2 business days</li>
                    <li>• Free returns within 30 days</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Return Policy
                  </h4>
                  <p>
                    We offer a 30-day return policy for all unused items in
                    original packaging.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "seller" && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                    <Image
                      src={product.store.logo}
                      alt={product.store.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {product.store.name}
                    </h3>
                    <p className="text-gray-600">
                      Verified Seller • Joined 2023
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Seller Details
                    </h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Location</dt>
                        <dd className="text-gray-900">Lagos, Nigeria</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Response Time</dt>
                        <dd className="text-gray-900">Within 1 hour</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Rating</dt>
                        <dd className="text-gray-900">4.8/5.0</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Contact Seller
                    </h4>
                    <div className="space-y-3">
                      <Button
                        onClick={handleWhatsAppOrder}
                        className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span>Order via WhatsApp</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          window.open(`tel:+2341234567890`);
                        }}
                      >
                        <Phone className="h-5 w-5 mr-2" />
                        Call Seller
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">
                    WhatsApp Business Tips
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Sellers usually respond fastest on WhatsApp</li>
                    <li>• You can negotiate prices (if allowed)</li>
                    <li>• Ask for more photos/videos before buying</li>
                    <li>• Confirm delivery/pickup arrangements</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Related Products
              </h2>
              <Link
                href={`/shop?category=${product.category}`}
                className="text-primary hover:text-primary-600 font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Sponsored Products */}
        {sponsoredProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Sponsored Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {sponsoredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Customers Also Viewed */}
        {customersAlsoViewed.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Customers Also Viewed
              </h2>
              <div className="flex items-center space-x-1 text-gray-500">
                <Eye className="h-4 w-4" />
                <span className="text-sm">
                  Based on collective browsing patterns
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {customersAlsoViewed
                .map((tracked) =>
                  productDummyData.find((p) => p.id === tracked.id)
                )
                .filter(Boolean)
                .map((product) => (
                  <ProductCard key={product!.id} product={product!} />
                ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Recently Viewed
              </h2>
              <button
                onClick={clearRecentlyViewed}
                className="text-primary hover:text-primary-600 font-medium"
              >
                Clear History
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recentlyViewed
                .map((tracked) =>
                  productDummyData.find((p) => p.id === tracked.id)
                )
                .filter(Boolean)
                .map((product) => (
                  <ProductCard key={product!.id} product={product!} />
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
