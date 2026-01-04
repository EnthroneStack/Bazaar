// // components/store/promotions/PromotionManager.tsx
// "use client";

// import { Tag, Calendar, Percent, DollarSign, Truck, Hash } from "lucide-react";
// import { useState } from "react";

// export default function PromotionManager() {
//   const [promoType, setPromoType] = useState("percentage");
//   const [promoData, setPromoData] = useState({
//     name: "",
//     code: "",
//     value: "",
//     startDate: "",
//     endDate: "",
//     minPurchase: "",
//     usageLimit: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Promotion created:", { type: promoType, ...promoData });
//     alert("Promotion created successfully!");
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-6">
//       <div className="flex items-center mb-6">
//         <Tag className="h-6 w-6 text-blue-600 mr-3" />
//         <div>
//           <h3 className="font-semibold text-gray-900">Create New Promotion</h3>
//           <p className="text-sm text-gray-600">
//             Set up a new promotional campaign
//           </p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Promotion Type */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-3">
//             Promotion Type
//           </label>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <button
//               type="button"
//               onClick={() => setPromoType("percentage")}
//               className={`p-4 border rounded-lg flex flex-col items-center transition-colors ${
//                 promoType === "percentage"
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-300 hover:border-gray-400"
//               }`}
//             >
//               <Percent className="h-6 w-6 text-gray-700 mb-2" />
//               <span className="font-medium">Percentage Off</span>
//             </button>
//             <button
//               type="button"
//               onClick={() => setPromoType("fixed")}
//               className={`p-4 border rounded-lg flex flex-col items-center transition-colors ${
//                 promoType === "fixed"
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-300 hover:border-gray-400"
//               }`}
//             >
//               <DollarSign className="h-6 w-6 text-gray-700 mb-2" />
//               <span className="font-medium">Fixed Amount</span>
//             </button>
//             <button
//               type="button"
//               onClick={() => setPromoType("shipping")}
//               className={`p-4 border rounded-lg flex flex-col items-center transition-colors ${
//                 promoType === "shipping"
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-300 hover:border-gray-400"
//               }`}
//             >
//               <Truck className="h-6 w-6 text-gray-700 mb-2" />
//               <span className="font-medium">Free Shipping</span>
//             </button>
//             <button
//               type="button"
//               onClick={() => setPromoType("bogo")}
//               className={`p-4 border rounded-lg flex flex-col items-center transition-colors ${
//                 promoType === "bogo"
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-300 hover:border-gray-400"
//               }`}
//             >
//               <Hash className="h-6 w-6 text-gray-700 mb-2" />
//               <span className="font-medium">Buy One Get One</span>
//             </button>
//           </div>
//         </div>

//         {/* Basic Information */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Promotion Name *
//             </label>
//             <input
//               type="text"
//               required
//               value={promoData.name}
//               onChange={(e) =>
//                 setPromoData({ ...promoData, name: e.target.value })
//               }
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="e.g., Summer Sale 2024"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Promotion Code *
//             </label>
//             <input
//               type="text"
//               required
//               value={promoData.code}
//               onChange={(e) =>
//                 setPromoData({ ...promoData, code: e.target.value })
//               }
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="e.g., SUMMER20"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Discount Value *
//             </label>
//             <div className="relative">
//               {promoType === "percentage" && (
//                 <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               )}
//               {promoType === "fixed" && (
//                 <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               )}
//               <input
//                 type="number"
//                 required
//                 value={promoData.value}
//                 onChange={(e) =>
//                   setPromoData({ ...promoData, value: e.target.value })
//                 }
//                 className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   promoType === "fixed" ? "pl-10" : ""
//                 }`}
//                 placeholder={
//                   promoType === "percentage" ? "e.g., 20" : "e.g., 10"
//                 }
//               />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Minimum Purchase ($)
//             </label>
//             <input
//               type="number"
//               value={promoData.minPurchase}
//               onChange={(e) =>
//                 setPromoData({ ...promoData, minPurchase: e.target.value })
//               }
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="e.g., 50"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Start Date *
//             </label>
//             <input
//               type="date"
//               required
//               value={promoData.startDate}
//               onChange={(e) =>
//                 setPromoData({ ...promoData, startDate: e.target.value })
//               }
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               End Date *
//             </label>
//             <input
//               type="date"
//               required
//               value={promoData.endDate}
//               onChange={(e) =>
//                 setPromoData({ ...promoData, endDate: e.target.value })
//               }
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Usage Limits */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Usage Limit
//           </label>
//           <input
//             type="number"
//             value={promoData.usageLimit}
//             onChange={(e) =>
//               setPromoData({ ...promoData, usageLimit: e.target.value })
//             }
//             className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="Leave empty for unlimited"
//           />
//           <p className="text-sm text-gray-500 mt-2">
//             Maximum number of times this promotion can be used. Leave empty for
//             unlimited usage.
//           </p>
//         </div>

//         {/* Actions */}
//         <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
//           <button
//             type="button"
//             className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//           >
//             Save as Draft
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Activate Promotion
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// components/store/promotions/PromotionManager.tsx
"use client";

import { Tag, Calendar, Percent, DollarSign, Truck, Hash } from "lucide-react";
import { useState } from "react";

export default function PromotionManager() {
  const [promoType, setPromoType] = useState("percentage");
  const [promoData, setPromoData] = useState({
    name: "",
    code: "",
    value: "",
    startDate: "",
    endDate: "",
    minPurchase: "",
    usageLimit: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Promotion created:", { type: promoType, ...promoData });
    alert("Promotion created successfully!");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center mb-4 sm:mb-6">
        <Tag className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2 sm:mr-3" />
        <div>
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
            Create New Promotion
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Set up a new promotional campaign
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Promotion Type - RESPONSIVE CHANGE: 2 columns mobile, 4 columns desktop */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Promotion Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setPromoType("percentage")}
              className={`p-3 sm:p-4 border rounded-lg flex flex-col items-center transition-colors ${
                promoType === "percentage"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Percent className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 mb-1 sm:mb-2" />
              <span className="font-medium text-xs sm:text-sm">
                Percentage Off
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPromoType("fixed")}
              className={`p-3 sm:p-4 border rounded-lg flex flex-col items-center transition-colors ${
                promoType === "fixed"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 mb-1 sm:mb-2" />
              <span className="font-medium text-xs sm:text-sm">
                Fixed Amount
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPromoType("shipping")}
              className={`p-3 sm:p-4 border rounded-lg flex flex-col items-center transition-colors ${
                promoType === "shipping"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 mb-1 sm:mb-2" />
              <span className="font-medium text-xs sm:text-sm">
                Free Shipping
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPromoType("bogo")}
              className={`p-3 sm:p-4 border rounded-lg flex flex-col items-center transition-colors ${
                promoType === "bogo"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Hash className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 mb-1 sm:mb-2" />
              <span className="font-medium text-xs sm:text-sm">
                Buy One Get One
              </span>
            </button>
          </div>
        </div>

        {/* Basic Information - RESPONSIVE CHANGE: 1 column mobile, 2 columns desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Promotion Name *
            </label>
            <input
              type="text"
              required
              value={promoData.name}
              onChange={(e) =>
                setPromoData({ ...promoData, name: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              placeholder="e.g., Summer Sale 2024"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Promotion Code *
            </label>
            <input
              type="text"
              required
              value={promoData.code}
              onChange={(e) =>
                setPromoData({ ...promoData, code: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              placeholder="e.g., SUMMER20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Value *
            </label>
            <div className="relative">
              {promoType === "percentage" && (
                <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              )}
              {promoType === "fixed" && (
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              )}
              <input
                type="number"
                required
                value={promoData.value}
                onChange={(e) =>
                  setPromoData({ ...promoData, value: e.target.value })
                }
                className={`w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                  promoType === "fixed" ? "pl-8 sm:pl-10" : ""
                }`}
                placeholder={
                  promoType === "percentage" ? "e.g., 20" : "e.g., 10"
                }
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Purchase ($)
            </label>
            <input
              type="number"
              value={promoData.minPurchase}
              onChange={(e) =>
                setPromoData({ ...promoData, minPurchase: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              placeholder="e.g., 50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date *
            </label>
            <input
              type="date"
              required
              value={promoData.startDate}
              onChange={(e) =>
                setPromoData({ ...promoData, startDate: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date *
            </label>
            <input
              type="date"
              required
              value={promoData.endDate}
              onChange={(e) =>
                setPromoData({ ...promoData, endDate: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Usage Limits */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Usage Limit
          </label>
          <input
            type="number"
            value={promoData.usageLimit}
            onChange={(e) =>
              setPromoData({ ...promoData, usageLimit: e.target.value })
            }
            className="w-full sm:w-1/3 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            placeholder="Leave empty for unlimited"
          />
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Maximum number of times this promotion can be used. Leave empty for
            unlimited usage.
          </p>
        </div>

        {/* Actions - RESPONSIVE CHANGE: Stack buttons on mobile */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-200">
          <button
            type="button"
            className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Activate Promotion
          </button>
        </div>
      </form>
    </div>
  );
}
