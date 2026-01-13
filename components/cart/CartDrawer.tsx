// "use client";

// import { useState } from "react";
// import { ShoppingCart, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Separator } from "@/components/ui/separator";
// import Image from "next/image";
// import Link from "next/link";
// import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
// import { addToCart, removeFromCart } from "@/lib/redux/features/cart/cartSlice";

// export function CartDrawer() {
//   const [open, setOpen] = useState(false);
//   const { cartItems, total } = useAppSelector((state) => state.cart);
//   const products = useAppSelector((state) => state.product.list);
//   const dispatch = useAppDispatch();

//   const calculateSubtotal = () => {
//     let subtotal = 0;
//     Object.entries(cartItems).forEach(([productId, quantity]) => {
//       const product = products.find((p) => p.id === productId);
//       if (product) {
//         subtotal += product.price * quantity;
//       }
//     });
//     return subtotal;
//   };

//   const handleIncrease = (productId: string) => {
//     dispatch(addToCart({ productId }));
//   };

//   const handleDecrease = (productId: string) => {
//     dispatch(removeFromCart({ productId }));
//   };

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <Button variant="ghost" size="icon" className="relative">
//           <ShoppingCart className="h-5 w-5" />
//           {total > 0 && (
//             <span className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-primary text-white rounded-full flex items-center justify-center">
//               {total}
//             </span>
//           )}
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="w-full sm:max-w-md flex flex-col">
//         <SheetHeader>
//           <SheetTitle className="flex items-center justify-between">
//             <span>Your Cart ({total} items)</span>
//             <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
//               <X className="h-4 w-4" />
//             </Button>
//           </SheetTitle>
//         </SheetHeader>

//         <div className="flex-1 overflow-y-auto py-4">
//           {total === 0 ? (
//             <div className="text-center py-12">
//               <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600 mb-4">Your cart is empty</p>
//               <Button onClick={() => setOpen(false)} asChild>
//                 <Link href="/shop">Start Shopping</Link>
//               </Button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {Object.entries(cartItems).map(([productId, quantity]) => {
//                 const product = products.find((p) => p.id === productId);
//                 if (!product) return null;

//                 return (
//                   <div key={productId} className="flex gap-3 pb-4 border-b">
//                     <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
//                       <Image
//                         src={product.image || "/placeholder.jpg"}
//                         alt={product.name}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex justify-between">
//                         <h4 className="text-sm font-medium">{product.name}</h4>
//                         <p className="font-medium">
//                           ${(product.price * quantity).toFixed(2)}
//                         </p>
//                       </div>
//                       <p className="mt-1 text-sm text-gray-500">
//                         ${product.price.toFixed(2)} each
//                       </p>
//                       <div className="mt-2 flex items-center gap-2">
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="h-7 w-7"
//                           onClick={() => handleDecrease(productId)}
//                         >
//                           -
//                         </Button>
//                         <span className="w-8 text-center">{quantity}</span>
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="h-7 w-7"
//                           onClick={() => handleIncrease(productId)}
//                         >
//                           +
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}

//               {/* Order Summary */}
//               <div className="pt-4">
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Subtotal</span>
//                     <span className="font-medium">
//                       ${calculateSubtotal().toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Shipping</span>
//                     <span className="font-medium">$0.00</span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Total</span>
//                     <span className="text-primary">
//                       ${calculateSubtotal().toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="pt-4 border-t">
//           {total > 0 ? (
//             <>
//               <Button
//                 className="w-full mb-3"
//                 asChild
//                 onClick={() => setOpen(false)}
//               >
//                 <Link href="/cart">View Full Cart</Link>
//               </Button>
//               <Button
//                 variant="outline"
//                 className="w-full"
//                 onClick={() => setOpen(false)}
//               >
//                 Continue Shopping
//               </Button>
//             </>
//           ) : (
//             <Button
//               variant="outline"
//               className="w-full"
//               onClick={() => setOpen(false)}
//             >
//               Continue Shopping
//             </Button>
//           )}
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }
