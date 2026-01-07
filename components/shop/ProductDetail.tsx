// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";

// import {
//   ShoppingCart,
//   Heart,
//   Share2,
//   Star,
//   ChevronLeft,
//   ChevronRight,
//   Check,
//   Shield,
//   Truck,
//   RotateCcw,
//   Eye,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import ProductCard from "@/components/ProductCard";
// import { productDummyData, reviewData } from "@/assets/assets";
// import { productAverageRatings } from "@/lib/product-review-map";

// const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

// interface ProductDetailProps {
//   productId: string;
// }

// const ProductDetailPage = ({ productId }: ProductDetailProps) => {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState("description");
//   const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

//   const product = productDummyData.find((p) => p.id === productId);
//   const productRating = productAverageRatings.find((p) => p.id === productId);
//   const reviews = reviewData.filter((review) => review.productId === productId);

//   // Get related products (same category)
//   const relatedProducts = productDummyData
//     .filter((p) => p.category === product?.category && p.id !== productId)
//     .slice(0, 4);

//   // Get sponsored products (different category)
//   const sponsoredProducts = productDummyData
//     .filter((p) => p.category !== product?.category)
//     .slice(0, 4);

//   // Get customers also viewed
//   const customersAlsoViewed = productDummyData
//     .filter((p) => p.id !== productId)
//     .sort(() => Math.random() - 0.5)
//     .slice(0, 6);

//   useEffect(() => {
//     // Simulate recently viewed products
//     const viewed = productDummyData
//       .filter((p) => p.id !== productId)
//       .sort(() => Math.random() - 0.5)
//       .slice(0, 4);
//     setRecentlyViewed(viewed);

//     // In a real app, you would track viewed products in localStorage or database
//     const viewedProducts = JSON.parse(
//       localStorage.getItem("recentlyViewed") || "[]"
//     );
//     const updatedViewed = [
//       productId,
//       ...viewedProducts.filter((id: string) => id !== productId),
//     ].slice(0, 10);
//     localStorage.setItem("recentlyViewed", JSON.stringify(updatedViewed));
//   }, [productId]);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Product Not Found
//           </h2>
//           <Link href="/shop">
//             <Button>Back to Shop</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const rating = productRating?.averageRating || 0;
//   const discount =
//     product.mrp > product.price
//       ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
//       : 0;

//   const handleAddToCart = () => {
//     // Add to cart logic here
//     console.log(`Added ${quantity} ${product.name} to cart`);
//   };

//   const handleBuyNow = () => {
//     // Buy now logic here
//     console.log(`Buying ${quantity} ${product.name}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Breadcrumb */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <nav className="flex items-center space-x-2 text-sm text-gray-600">
//             <Link href="/" className="hover:text-gray-900">
//               Home
//             </Link>
//             <ChevronRight className="h-4 w-4" />
//             <Link href="/shop" className="hover:text-gray-900">
//               Shop
//             </Link>
//             <ChevronRight className="h-4 w-4" />
//             <span className="text-gray-900">{product.category}</span>
//             <ChevronRight className="h-4 w-4" />
//             <span className="text-gray-500 truncate">{product.name}</span>
//           </nav>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Main Product Section */}
//         <div className="bg-white rounded-lg shadow-sm border mb-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
//             {/* Product Images */}
//             <div className="space-y-4">
//               {/* Main Image */}
//               <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
//                 <Image
//                   src={product.images[selectedImage]}
//                   alt={product.name}
//                   width={600}
//                   height={600}
//                   className="w-full h-full object-contain"
//                 />
//               </div>

//               {/* Thumbnail Images */}
//               <div className="flex space-x-2 overflow-x-auto">
//                 {product.images.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
//                       selectedImage === index
//                         ? "border-primary"
//                         : "border-gray-200"
//                     }`}
//                   >
//                     <Image
//                       src={image}
//                       alt={`${product.name} view ${index + 1}`}
//                       width={80}
//                       height={80}
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Product Info */}
//             <div className="space-y-6">
//               {/* Header */}
//               <div>
//                 <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
//                   {product.name}
//                 </h1>

//                 {/* Rating and Reviews */}
//                 <div className="flex items-center space-x-4 mb-4">
//                   <div className="flex items-center space-x-1">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star
//                         key={star}
//                         className={`h-5 w-5 ${
//                           star <= Math.floor(rating)
//                             ? "text-yellow-400 fill-current"
//                             : star === Math.ceil(rating) && rating % 1 !== 0
//                             ? "text-yellow-400 fill-current"
//                             : "text-gray-300"
//                         }`}
//                       />
//                     ))}
//                     <span className="text-sm text-gray-600 ml-1">
//                       {rating.toFixed(1)}
//                     </span>
//                   </div>
//                   <span className="text-sm text-gray-500">
//                     {reviews.length} reviews
//                   </span>
//                   <span
//                     className={`text-sm font-medium ${
//                       product.inStock ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {product.inStock ? "In Stock" : "Out of Stock"}
//                   </span>
//                 </div>

//                 {/* Price */}
//                 <div className="flex items-center space-x-3 mb-4">
//                   <span className="text-3xl font-bold text-gray-900">
//                     {currency}
//                     {product.price}
//                   </span>
//                   {product.mrp > product.price && (
//                     <>
//                       <span className="text-xl text-gray-500 line-through">
//                         {currency}
//                         {product.mrp}
//                       </span>
//                       <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
//                         Save {discount}%
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Description */}
//               <p className="text-gray-600 leading-relaxed">
//                 {product.description}
//               </p>

//               {/* Quantity and Actions */}
//               <div className="space-y-4">
//                 {/* Quantity Selector */}
//                 <div className="flex items-center space-x-4">
//                   <span className="text-sm font-medium text-gray-700">
//                     Quantity:
//                   </span>
//                   <div className="flex items-center border border-gray-300 rounded-lg">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="px-3 py-2 hover:bg-gray-100 transition-colors"
//                     >
//                       -
//                     </button>
//                     <span className="px-4 py-2 min-w-12 text-center">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="px-3 py-2 hover:bg-gray-100 transition-colors"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
//                   <Button
//                     onClick={handleAddToCart}
//                     disabled={!product.inStock}
//                     className="flex-1 bg-primary hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
//                   >
//                     <ShoppingCart className="h-5 w-5" />
//                     <span>Add to Cart</span>
//                   </Button>

//                   <Button
//                     onClick={handleBuyNow}
//                     disabled={!product.inStock}
//                     className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors"
//                   >
//                     Buy Now
//                   </Button>

//                   <div className="flex space-x-2">
//                     <Button
//                       variant="outline"
//                       className="p-3 border-gray-300 hover:bg-gray-50"
//                     >
//                       <Heart className="h-5 w-5" />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="p-3 border-gray-300 hover:bg-gray-50"
//                     >
//                       <Share2 className="h-5 w-5" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//               {/* Features */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Truck className="h-5 w-5 text-green-600" />
//                   <span>Free shipping</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <RotateCcw className="h-5 w-5 text-green-600" />
//                   <span>30-day returns</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Shield className="h-5 w-5 text-green-600" />
//                   <span>2-year warranty</span>
//                 </div>
//               </div>

//               {/* Seller Info */}
//               <div className="pt-6 border-t">
//                 <h3 className="text-sm font-medium text-gray-900 mb-3">
//                   Sold by
//                 </h3>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
//                     <Image
//                       src={product.store.logo}
//                       alt={product.store.name}
//                       width={40}
//                       height={40}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">
//                       {product.store.name}
//                     </p>
//                     <div className="flex items-center space-x-1 text-sm text-gray-600">
//                       <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                       <span>4.8 • 98% Positive Feedback</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-3 flex space-x-4 text-sm">
//                   <button className="text-primary hover:text-primary-600 font-medium">
//                     Visit Store
//                   </button>
//                   <button className="text-primary hover:text-primary-600 font-medium">
//                     Contact Seller
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Details Tabs */}
//         <div className="bg-white rounded-lg shadow-sm border mb-8">
//           <div className="border-b">
//             <nav className="flex space-x-8 px-6">
//               {[
//                 { id: "description", label: "Description" },
//                 { id: "specifications", label: "Specifications" },
//                 { id: "reviews", label: `Reviews (${reviews.length})` },
//                 { id: "shipping", label: "Shipping & Returns" },
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                     activeTab === tab.id
//                       ? "border-primary text-primary"
//                       : "border-transparent text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           <div className="p-6">
//             {activeTab === "description" && (
//               <div className="prose max-w-none">
//                 <p className="text-gray-600 leading-relaxed">
//                   {product.description}
//                 </p>
//                 <ul className="mt-4 space-y-2 text-gray-600">
//                   <li className="flex items-center space-x-2">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Premium quality materials</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>1-year manufacturer warranty</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Free technical support</span>
//                   </li>
//                 </ul>
//               </div>
//             )}

//             {activeTab === "specifications" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-3">General</h4>
//                   <dl className="space-y-2">
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Brand</dt>
//                       <dd className="text-gray-900">{product.store.name}</dd>
//                     </div>
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Category</dt>
//                       <dd className="text-gray-900">{product.category}</dd>
//                     </div>
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Model</dt>
//                       <dd className="text-gray-900">
//                         PRO-{product.id.split("_")[1]}
//                       </dd>
//                     </div>
//                   </dl>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-3">Dimensions</h4>
//                   <dl className="space-y-2">
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Weight</dt>
//                       <dd className="text-gray-900">1.2 kg</dd>
//                     </div>
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Dimensions</dt>
//                       <dd className="text-gray-900">15 × 10 × 5 cm</dd>
//                     </div>
//                   </dl>
//                 </div>
//               </div>
//             )}

//             {activeTab === "reviews" && (
//               <div className="space-y-6">
//                 {/* Rating Summary */}
//                 <div className="flex items-center space-x-8">
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-gray-900">
//                       {rating.toFixed(1)}
//                     </div>
//                     <div className="flex items-center justify-center space-x-1 mt-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           className={`h-4 w-4 ${
//                             star <= Math.floor(rating)
//                               ? "text-yellow-400 fill-current"
//                               : star === Math.ceil(rating) && rating % 1 !== 0
//                               ? "text-yellow-400 fill-current"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <div className="text-sm text-gray-600 mt-1">
//                       {reviews.length} reviews
//                     </div>
//                   </div>

//                   <div className="flex-1 space-y-2">
//                     {[5, 4, 3, 2, 1].map((stars) => {
//                       const count = reviews.filter(
//                         (r) => Math.round(r.rating) === stars
//                       ).length;
//                       const percentage =
//                         reviews.length > 0 ? (count / reviews.length) * 100 : 0;

//                       return (
//                         <div
//                           key={stars}
//                           className="flex items-center space-x-2"
//                         >
//                           <span className="text-sm text-gray-600 w-4">
//                             {stars}
//                           </span>
//                           <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                           <div className="flex-1 bg-gray-200 rounded-full h-2">
//                             <div
//                               className="bg-yellow-400 h-2 rounded-full"
//                               style={{ width: `${percentage}%` }}
//                             />
//                           </div>
//                           <span className="text-sm text-gray-600 w-8 text-right">
//                             {count}
//                           </span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Reviews List */}
//                 <div className="space-y-4">
//                   {reviews.map((review) => (
//                     <div
//                       key={review.id}
//                       className="border-b pb-4 last:border-b-0"
//                     >
//                       <div className="flex items-center space-x-3 mb-2">
//                         <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
//                           <Image
//                             src={review.user.avatar}
//                             alt={review.user.name}
//                             width={40}
//                             height={40}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-900">
//                             {review.user.name}
//                           </p>
//                           <div className="flex items-center space-x-1">
//                             <div className="flex items-center space-x-1">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <Star
//                                   key={star}
//                                   className={`h-3 w-3 ${
//                                     star <= review.rating
//                                       ? "text-yellow-400 fill-current"
//                                       : "text-gray-300"
//                                   }`}
//                                 />
//                               ))}
//                             </div>
//                             <span className="text-sm text-gray-500">
//                               {new Date(review.createdAt).toLocaleDateString()}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <p className="text-gray-600">{review.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === "shipping" && (
//               <div className="space-y-4 text-gray-600">
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-2">
//                     Shipping Information
//                   </h4>
//                   <p>
//                     Free standard shipping on all orders. Express shipping
//                     available for an additional fee.
//                   </p>
//                   <ul className="mt-2 space-y-1">
//                     <li>• Standard shipping: 3-5 business days</li>
//                     <li>• Express shipping: 1-2 business days</li>
//                     <li>• Free returns within 30 days</li>
//                   </ul>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-2">
//                     Return Policy
//                   </h4>
//                   <p>
//                     We offer a 30-day return policy for all unused items in
//                     original packaging.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <section className="mb-12">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Related Products
//               </h2>
//               <Link
//                 href={`/shop?category=${product.category}`}
//                 className="text-primary hover:text-primary-600 font-medium flex items-center space-x-1"
//               >
//                 <span>View All</span>
//                 <ChevronRight className="h-4 w-4" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {relatedProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Sponsored Products */}
//         {sponsoredProducts.length > 0 && (
//           <section className="mb-12">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">
//               Sponsored Products
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {sponsoredProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Customers Also Viewed */}
//         {customersAlsoViewed.length > 0 && (
//           <section className="mb-12">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Customers Also Viewed
//               </h2>
//               <div className="flex items-center space-x-1 text-gray-500">
//                 <Eye className="h-4 w-4" />
//                 <span className="text-sm">Based on your browsing history</span>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//               {customersAlsoViewed.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Recently Viewed */}
//         {recentlyViewed.length > 0 && (
//           <section className="mb-12">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Recently Viewed
//               </h2>
//               <button className="text-primary hover:text-primary-600 font-medium">
//                 Clear History
//               </button>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {recentlyViewed.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;

// "use client";

// import { productDummyData, reviewData } from "@/assets/assets";
// import {
//   Check,
//   ChevronRight,
//   Heart,
//   RotateCcw,
//   Share2,
//   Shield,
//   ShoppingCart,
//   Star,
//   Truck,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { Button } from "./ui/button";
// import StarRating from "./StarRating";
// import { productAverageRatings } from "@/lib/product-review-map";
// import QuantitySelector from "./QuantitySelector";
// import { useProductTracking } from "@/context/ProductTrackingContext";
// import ProductCard from "./ProductCard";

// const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

// const ProductDetail = ({ productId }: { productId: string }) => {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState("description");

//   const {
//     recentlyViewed,
//     customersAlsoViewed,
//     trackProductView,
//     trackProductPurchase,
//     getSimilarProducts,
//     clearRecentlyViewed,
//   } = useProductTracking();

//   const product = productDummyData.find((p) => p.id === productId);
//   const productRating = productAverageRatings.find((p) => p.id === productId);
//   const reviews = reviewData.filter((review) => review.productId === productId);

//   const relatedProducts = getSimilarProducts(productId);
//   const sponsoredProducts = productDummyData
//     .filter((p) => p.category !== product?.category)
//     .slice(0, 4);

//   useEffect(() => {
//     if (product) {
//       trackProductView(productId);
//     }
//   }, [productId, product, trackProductView]);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Product Not Found
//           </h2>
//           <Link href="/shop">
//             <Button>Back to Shop</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const rating = productRating?.averageRating || 0;
//   const discount =
//     product.mrp > product.price
//       ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
//       : 0;

//   const handleAddToCart = () => {
//     console.log(`Added ${quantity} ${product.name} to cart`);
//   };

//   const handleBuyNow = () => {
//     console.log(`Buying ${quantity} ${product.name}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Breadcrumb */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <nav className="flex items-center gap-2 text-sm text-gray-600">
//             <Link href="/" className="hover:text-gray-900">
//               Home
//             </Link>
//             <ChevronRight className="h-4 w-4" />

//             <Link href="/shop" className="hover:text-gray-900">
//               Shop
//             </Link>
//             <ChevronRight className="h-4 w-4" />

//             <span className="text-gray-900">{product?.category}</span>
//             <ChevronRight className="h-4 w-4" />

//             <span className="text-gray-500 truncate">{product?.name}</span>
//           </nav>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Product Section */}
//         <div className="bg-white border-gray-400 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 mb-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
//             {/* Product Images */}
//             <div className="space-y-4">
//               <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
//                 <Image
//                   src={product.images[selectedImage]}
//                   alt={product.name}
//                   width={600}
//                   height={600}
//                   className="w-full h-full object-contain"
//                 />
//               </div>

//               {/* Thumbnail Images */}
//               <div className="flex gap-2 overflow-x-auto">
//                 {product?.images.map((image, index) => (
//                   <Button
//                     variant="outline"
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`shrink-0 w-20 h-20 overflow-hidden ${
//                       selectedImage === index
//                         ? "border-primary"
//                         : "border-gray-200"
//                     }`}
//                   >
//                     <Image
//                       src={image}
//                       alt={`${product.name} view ${index + 1}`}
//                       width={80}
//                       height={80}
//                       className="w-full h-full object-cover"
//                     />
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             {/* Product Info */}
//             <div className="space-y-6">
//               {/* Header */}
//               <div>
//                 <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
//                   {product.name}
//                 </h1>

//                 {/* Rating and Reviews */}
//                 <div className="flex items-center space-x-4 mb-4">
//                   <StarRating rating={rating} size="lg" showRating />
//                   <span
//                     className={`text-sm font-medium ${
//                       product.inStock ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {product.inStock ? "In Stock" : "Out of Stock"}
//                   </span>
//                 </div>

//                 {/* Price */}
//                 <div className="flex items-center gap-3 mb-4">
//                   <span className="text-3xl font-bold text-gray-900">
//                     {currency}
//                     {product.price}
//                   </span>
//                   {product?.mrp > product?.price && (
//                     <>
//                       <span className="text-xl text-gray-500 line-through">
//                         {currency}
//                         {product.mrp}
//                       </span>
//                       <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
//                         Save {discount}%
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Description */}
//               <p className="text-gray-600 leading-relaxed">
//                 {product.description}
//               </p>

//               {/* Quantity and Actions */}
//               <div className="space-y-4">
//                 {/* Quantity Selector */}
//                 <QuantitySelector
//                   quantity={quantity}
//                   onQuantityChange={setQuantity}
//                   min={1}
//                   max={99}
//                   size="md"
//                   className="space-x-4"
//                 />

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
//                   <Button
//                     onClick={handleAddToCart}
//                     disabled={!product.inStock}
//                     className="flex-1 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transition-colors duration-300"
//                   >
//                     <ShoppingCart className="h-5 w-5" />
//                     <span>Add to Cart</span>
//                   </Button>

//                   <Button
//                     onClick={handleBuyNow}
//                     disabled={!product.inStock}
//                     className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-mediumshadow-xl hover:shadow-2xl transition-colors duration-300"
//                   >
//                     Buy Now
//                   </Button>

//                   <div className="flex gap-2">
//                     <Button
//                       variant="outline"
//                       className="p-3 border-gray-300 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-colors duration-300"
//                     >
//                       <Heart className="h-5 w-5" />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="p-3 border-gray-300 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-colors duration-300"
//                     >
//                       <Share2 className="h-5 w-5" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//               {/* Features */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-400">
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Truck className="h-5 w-5 text-green-600" />
//                   <span>Free shipping</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <RotateCcw className="h-5 w-5 text-green-600" />
//                   <span>7-day returns</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Shield className="h-5 w-5 text-green-600" />
//                   <span>2-year warranty</span>
//                 </div>
//               </div>

//               {/* Seller Info */}
//               <div className="pt-6 border-t">
//                 <h3 className="text-sm font-medium text-gray-900 mb-3">
//                   Sold by
//                 </h3>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
//                     <Image
//                       src={product.store.logo}
//                       alt={product.store.name}
//                       width={40}
//                       height={40}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">
//                       {product.store.name}
//                     </p>
//                     <div className="flex items-center space-x-1 text-sm text-gray-600">
//                       <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                       <span>4.8 • 98% Positive Feedback</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-3 flex space-x-4 text-sm">
//                   <button className="text-primary hover:text-primary-600 font-medium cursor-pointer">
//                     Visit Store
//                   </button>
//                   <button className="text-primary hover:text-primary-600 font-medium cursor-pointer">
//                     Contact Seller
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Details Tabs */}
//         <div className="bg-white rounded-lg shadow-sm border mb-8">
//           <div className="border-b">
//             <nav className="flex space-x-8 px-6">
//               {[
//                 { id: "description", label: "Description" },
//                 { id: "specifications", label: "Specifications" },
//                 { id: "reviews", label: `Reviews (${reviews.length})` },
//                 { id: "shipping", label: "Shipping & Returns" },
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
//                     activeTab === tab.id
//                       ? "border-primary text-primary"
//                       : "border-transparent text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           <div className="p-6">
//             {activeTab === "description" && (
//               <div className="prose max-w-none">
//                 <p className="text-gray-600 leading-relaxed">
//                   {product.description}
//                 </p>
//                 <ul className="mt-4 space-y-2 text-gray-600">
//                   <li className="flex items-center space-x-2">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Premium quality materials</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>1-year manufacturer warranty</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Free technical support</span>
//                   </li>
//                 </ul>
//               </div>
//             )}

//             {activeTab === "specifications" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-3">General</h4>
//                   <dl className="space-y-2">
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Brand</dt>
//                       <dd className="text-gray-900">{product.store.name}</dd>
//                     </div>
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Category</dt>
//                       <dd className="text-gray-900">{product.category}</dd>
//                     </div>
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Model</dt>
//                       <dd className="text-gray-900">
//                         PRO-{product.id.split("_")[1]}
//                       </dd>
//                     </div>
//                   </dl>
//                 </div>

//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-3">Dimensions</h4>
//                   <dl className="space-y-2">
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Weight</dt>
//                       <dd className="text-gray-900">1.2 kg</dd>
//                     </div>
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Dimensions</dt>
//                       <dd className="text-gray-900">15 × 10 × 5 cm</dd>
//                     </div>
//                   </dl>
//                 </div>
//               </div>
//             )}

//             {activeTab === "reviews" && (
//               <div className="space-y-6">
//                 <div className="flex items-center space-x-8">
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-gray-900">
//                       {rating.toFixed(1)}
//                     </div>
//                     <StarRating rating={rating} />
//                     <div className="text-sm text-gray-600 mt-1">
//                       {reviews.length} reviews
//                     </div>
//                   </div>

//                   <div className="flex-1 space-y-2">
//                     {[5, 4, 3, 2, 1].map((stars) => {
//                       const count = reviews.filter(
//                         (r) => Math.round(r.rating) === stars
//                       ).length;
//                       const percentage =
//                         reviews.length > 0 ? (count / reviews.length) * 100 : 0;

//                       return (
//                         <div
//                           key={stars}
//                           className="flex items-center space-x-2"
//                         >
//                           <span className="text-sm text-gray-600 w-4">
//                             {stars}
//                           </span>
//                           <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                           <div className="flex-1 bg-gray-200 rounded-full h-2">
//                             <div
//                               className="bg-yellow-400 h-2 rounded-full"
//                               style={{ width: `${percentage}%` }}
//                             />
//                           </div>
//                           <span className="text-sm text-gray-600 w-8 text-right">
//                             {count}
//                           </span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   {reviews.map((review) => (
//                     <div
//                       key={review.id}
//                       className="border-b pb-4 last:border-0"
//                     >
//                       <div className="flex items-center space-x-3 mb-2">
//                         <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
//                           <Image
//                             src={review.user.avatar}
//                             alt={review.user.name}
//                             width={40}
//                             height={40}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-900">
//                             {review.user.name}
//                           </p>
//                           <div className="flex items-center space-x-2">
//                             <StarRating
//                               rating={review.rating}
//                               showRating={true}
//                               size="sm"
//                             />
//                           </div>
//                           <span className="text-sm text-gray-500">
//                             {new Date(review.createdAt).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </div>
//                       <p className="text-gray-600">{review.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === "shipping" && (
//               <div className="space-y-4 text-gray-600">
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-2">
//                     Shipping Information
//                   </h4>
//                   <p>
//                     Free standard shipping on all orders. Express shipping
//                     available for an additional fee.
//                   </p>
//                   <ul className="mt-2 space-y-1">
//                     <li>• Standard shipping: 3-5 business days</li>
//                     <li>• Express shipping: 1-2 business days</li>
//                     <li>• Free returns within 30 days</li>
//                   </ul>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-2">
//                     Return Policy
//                   </h4>
//                   <p>
//                     We offer a 30-day return policy for all unused items in
//                     original packaging.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <section className="mb-12">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Related Products
//               </h2>
//               <Link
//                 href={`/shop?category=${product.category}`}
//                 className="text-primary hover:text-primary-600 font-medium flex items-center space-x-1"
//               >
//                 <span>View All</span>
//                 <ChevronRight className="h-4 w-4" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {relatedProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Sponsored Products */}
//         {sponsoredProducts.length > 0 && (
//           <section className="mb-12">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">
//               Sponsored Products
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {sponsoredProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

// components/ProductDetail.tsx (Corrected)
// "use client";

// import { productDummyData, reviewData } from "@/assets/assets";
// import {
//   Check,
//   ChevronRight,
//   Heart,
//   RotateCcw,
//   Share2,
//   Shield,
//   ShoppingCart,
//   Truck,
//   Eye,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { Button } from "./ui/button";
// import StarRating from "./StarRating";
// import { productAverageRatings } from "@/lib/product-review-map";
// import QuantitySelector from "./QuantitySelector";
// import { useProductTracking } from "@/context/ProductTrackingContext";
// import ProductCard from "./ProductCard";

// const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

// const ProductDetail = ({ productId }: { productId: string }) => {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState("description");
//   const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
//   const [loadingRelated, setLoadingRelated] = useState(false);

//   const {
//     recentlyViewed,
//     customersAlsoViewed,
//     trackProductView,
//     trackProductPurchase,
//     getSimilarProducts,
//     clearRecentlyViewed,
//   } = useProductTracking();

//   const product = productDummyData.find((p) => p.id === productId);
//   const productRating = productAverageRatings.find((p) => p.id === productId);
//   const reviews = reviewData.filter((review) => review.productId === productId);

//   // Get recommendations using the tracking service
//   // const relatedProducts = getSimilarProducts(productId);
//   const sponsoredProducts = productDummyData
//     .filter((p) => p.category !== product?.category)
//     .slice(0, 4);

//   useEffect(() => {
//     if (product) {
//       // Track product view
//       trackProductView(productId);
//     }
//   }, [productId, product, trackProductView]);
//   useEffect(() => {
//     const loadRelatedProducts = async () => {
//       setLoadingRelated(true);
//       const products = await getSimilarProducts(productId);
//       setRelatedProducts(products);
//       setLoadingRelated(false);
//     };

//     if (productId) {
//       loadRelatedProducts();
//     }
//   }, [productId, getSimilarProducts]);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Product Not Found
//           </h2>
//           <Link href="/shop">
//             <Button>Back to Shop</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const rating = productRating?.averageRating || 0;
//   const discount =
//     product.mrp > product.price
//       ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
//       : 0;

//   const handleAddToCart = () => {
//     console.log(`Added ${quantity} ${product.name} to cart`);
//   };

//   const handleBuyNow = () => {
//     console.log(`Buying ${quantity} ${product.name}`);
//     trackProductPurchase(productId);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Breadcrumb */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <nav className="flex items-center gap-2 text-sm text-gray-600">
//             <Link href="/" className="hover:text-gray-900">
//               Home
//             </Link>
//             <ChevronRight className="h-4 w-4" />

//             <Link href="/shop" className="hover:text-gray-900">
//               Shop
//             </Link>
//             <ChevronRight className="h-4 w-4" />

//             <span className="text-gray-900">{product?.category}</span>
//             <ChevronRight className="h-4 w-4" />

//             <span className="text-gray-500 truncate">{product?.name}</span>
//           </nav>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Product Section */}
//         <div className="bg-white border-gray-400 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 mb-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
//             {/* Product Images */}
//             <div className="space-y-4">
//               <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
//                 <Image
//                   src={product.images[selectedImage]}
//                   alt={product.name}
//                   width={600}
//                   height={600}
//                   className="w-full h-full object-contain"
//                 />
//               </div>

//               {/* Thumbnail Images */}
//               <div className="flex gap-2 overflow-x-auto">
//                 {product?.images.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
//                       selectedImage === index
//                         ? "border-primary"
//                         : "border-gray-200"
//                     }`}
//                   >
//                     <Image
//                       src={image}
//                       alt={`${product.name} view ${index + 1}`}
//                       width={80}
//                       height={80}
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Product Info */}
//             <div className="space-y-6">
//               {/* Header */}
//               <div>
//                 <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
//                   {product.name}
//                 </h1>

//                 {/* Rating and Reviews */}
//                 <div className="flex items-center space-x-4 mb-4">
//                   <StarRating rating={rating} size="lg" showRating />
//                   <span className="text-sm text-gray-500">
//                     {reviews.length} reviews
//                   </span>
//                   <span
//                     className={`text-sm font-medium ${
//                       product.inStock ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {product.inStock ? "In Stock" : "Out of Stock"}
//                   </span>
//                 </div>

//                 {/* Price */}
//                 <div className="flex items-center gap-3 mb-4">
//                   <span className="text-3xl font-bold text-gray-900">
//                     {currency}
//                     {product.price}
//                   </span>
//                   {product?.mrp > product?.price && (
//                     <>
//                       <span className="text-xl text-gray-500 line-through">
//                         {currency}
//                         {product.mrp}
//                       </span>
//                       <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
//                         Save {discount}%
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Description */}
//               <p className="text-gray-600 leading-relaxed">
//                 {product.description}
//               </p>

//               {/* Quantity and Actions */}
//               <div className="space-y-4">
//                 {/* Quantity Selector */}
//                 <QuantitySelector
//                   quantity={quantity}
//                   onQuantityChange={setQuantity}
//                   min={1}
//                   max={99}
//                   size="md"
//                   className="space-x-4"
//                 />

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
//                   <Button
//                     onClick={handleAddToCart}
//                     disabled={!product.inStock}
//                     className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transition-colors duration-300"
//                   >
//                     <ShoppingCart className="h-5 w-5" />
//                     <span>Add to Cart</span>
//                   </Button>

//                   <Button
//                     onClick={handleBuyNow}
//                     disabled={!product.inStock}
//                     className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium shadow-xl hover:shadow-2xl transition-colors duration-300"
//                   >
//                     Buy Now
//                   </Button>

//                   <div className="flex gap-2">
//                     <Button
//                       variant="outline"
//                       className="p-3 border-gray-300 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-colors duration-300"
//                     >
//                       <Heart className="h-5 w-5" />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="p-3 border-gray-300 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-colors duration-300"
//                     >
//                       <Share2 className="h-5 w-5" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//               {/* Features */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-400">
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Truck className="h-5 w-5 text-green-600" />
//                   <span>Free shipping</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <RotateCcw className="h-5 w-5 text-green-600" />
//                   <span>7-day returns</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Shield className="h-5 w-5 text-green-600" />
//                   <span>2-year warranty</span>
//                 </div>
//               </div>

//               {/* Seller Info */}
//               <div className="pt-6 border-t">
//                 <h3 className="text-sm font-medium text-gray-900 mb-3">
//                   Sold by
//                 </h3>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
//                     <Image
//                       src={product.store.logo}
//                       alt={product.store.name}
//                       width={40}
//                       height={40}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">
//                       {product.store.name}
//                     </p>
//                     <div className="flex items-center space-x-1 text-sm text-gray-600">
//                       <StarRating rating={4.8} size="sm" showRating={false} />
//                       <span>4.8 • 98% Positive Feedback</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-3 flex space-x-4 text-sm">
//                   <button className="text-primary hover:text-primary-600 font-medium cursor-pointer">
//                     Visit Store
//                   </button>
//                   <button className="text-primary hover:text-primary-600 font-medium cursor-pointer">
//                     Contact Seller
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Details Tabs */}
//         <div className="bg-white rounded-lg shadow-sm border mb-8">
//           <div className="border-b">
//             <nav className="flex space-x-8 px-6">
//               {[
//                 { id: "description", label: "Description" },
//                 { id: "specifications", label: "Specifications" },
//                 { id: "reviews", label: `Reviews (${reviews.length})` },
//                 { id: "shipping", label: "Shipping & Returns" },
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
//                     activeTab === tab.id
//                       ? "border-primary text-primary"
//                       : "border-transparent text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           <div className="p-6">
//             {activeTab === "description" && (
//               <div className="prose max-w-none">
//                 <p className="text-gray-600 leading-relaxed">
//                   {product.description}
//                 </p>
//                 <ul className="mt-4 space-y-2 text-gray-600">
//                   <li className="flex items-center space-x-2">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Premium quality materials</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>1-year manufacturer warranty</span>
//                   </li>
//                   <li className="flex items-center space-x-2">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Free technical support</span>
//                   </li>
//                 </ul>
//               </div>
//             )}

//             {activeTab === "specifications" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-3">General</h4>
//                   <dl className="space-y-2">
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Brand</dt>
//                       <dd className="text-gray-900">{product.store.name}</dd>
//                     </div>
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Category</dt>
//                       <dd className="text-gray-900">{product.category}</dd>
//                     </div>
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Model</dt>
//                       <dd className="text-gray-900">
//                         PRO-{product.id.split("_")[1]}
//                       </dd>
//                     </div>
//                   </dl>
//                 </div>

//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-3">Dimensions</h4>
//                   <dl className="space-y-2">
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Weight</dt>
//                       <dd className="text-gray-900">1.2 kg</dd>
//                     </div>
//                     <div className="flex justify-between">
//                       <dt className="text-gray-600">Dimensions</dt>
//                       <dd className="text-gray-900">15 × 10 × 5 cm</dd>
//                     </div>
//                   </dl>
//                 </div>
//               </div>
//             )}

//             {activeTab === "reviews" && (
//               <div className="space-y-6">
//                 <div className="flex items-center space-x-8">
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-gray-900">
//                       {rating.toFixed(1)}
//                     </div>
//                     <StarRating rating={rating} size="md" showRating={false} />
//                     <div className="text-sm text-gray-600 mt-1">
//                       {reviews.length} reviews
//                     </div>
//                   </div>

//                   <div className="flex-1 space-y-2">
//                     {[5, 4, 3, 2, 1].map((stars) => {
//                       const count = reviews.filter(
//                         (r) => Math.round(r.rating) === stars
//                       ).length;
//                       const percentage =
//                         reviews.length > 0 ? (count / reviews.length) * 100 : 0;

//                       return (
//                         <div
//                           key={stars}
//                           className="flex items-center space-x-2"
//                         >
//                           <span className="text-sm text-gray-600 w-4">
//                             {stars}
//                           </span>
//                           <StarRating
//                             rating={stars}
//                             size="sm"
//                             showRating={false}
//                           />
//                           <div className="flex-1 bg-gray-200 rounded-full h-2">
//                             <div
//                               className="bg-yellow-400 h-2 rounded-full"
//                               style={{ width: `${percentage}%` }}
//                             />
//                           </div>
//                           <span className="text-sm text-gray-600 w-8 text-right">
//                             {count}
//                           </span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   {reviews.map((review) => (
//                     <div
//                       key={review.id}
//                       className="border-b pb-4 last:border-0"
//                     >
//                       <div className="flex items-center space-x-3 mb-2">
//                         <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
//                           <Image
//                             src={review.user.avatar}
//                             alt={review.user.name}
//                             width={40}
//                             height={40}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-900">
//                             {review.user.name}
//                           </p>
//                           <div className="flex items-center space-x-2">
//                             <StarRating
//                               rating={review.rating}
//                               showRating={true}
//                               size="sm"
//                             />
//                             <span className="text-sm text-gray-500">
//                               {new Date(review.createdAt).toLocaleDateString()}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <p className="text-gray-600">{review.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === "shipping" && (
//               <div className="space-y-4 text-gray-600">
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-2">
//                     Shipping Information
//                   </h4>
//                   <p>
//                     Free standard shipping on all orders. Express shipping
//                     available for an additional fee.
//                   </p>
//                   <ul className="mt-2 space-y-1">
//                     <li>• Standard shipping: 3-5 business days</li>
//                     <li>• Express shipping: 1-2 business days</li>
//                     <li>• Free returns within 30 days</li>
//                   </ul>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-2">
//                     Return Policy
//                   </h4>
//                   <p>
//                     We offer a 30-day return policy for all unused items in
//                     original packaging.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <section className="mb-12">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Related Products
//               </h2>
//               <Link
//                 href={`/shop?category=${product.category}`}
//                 className="text-primary hover:text-primary-600 font-medium flex items-center space-x-1"
//               >
//                 <span>View All</span>
//                 <ChevronRight className="h-4 w-4" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {relatedProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Sponsored Products */}
//         {sponsoredProducts.length > 0 && (
//           <section className="mb-12">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">
//               Sponsored Products
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {sponsoredProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Customers Also Viewed */}
//         {customersAlsoViewed.length > 0 && (
//           <section className="mb-12">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Customers Also Viewed
//               </h2>
//               <div className="flex items-center space-x-1 text-gray-500">
//                 <Eye className="h-4 w-4" />
//                 <span className="text-sm">
//                   Based on collective browsing patterns
//                 </span>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//               {customersAlsoViewed.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Recently Viewed */}
//         {recentlyViewed.length > 0 && (
//           <section className="mb-12">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Recently Viewed
//               </h2>
//               <button
//                 onClick={clearRecentlyViewed}
//                 className="text-primary hover:text-primary-600 font-medium"
//               >
//                 Clear History
//               </button>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {recentlyViewed.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
