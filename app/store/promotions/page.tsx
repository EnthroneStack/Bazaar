// // app/store/promotions/page.tsx

// import ActivePromotions from "@/components/store/promotions/ActivePromotions";
// import PromotionManager from "@/components/store/promotions/PromotionManager";

// export default function PromotionsPage() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             Promotions & Discounts
//           </h1>
//           <p className="text-gray-600">
//             Create and manage promotional campaigns
//           </p>
//         </div>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//           Create Promotion
//         </button>
//       </div>

//       <ActivePromotions />
//       <PromotionManager />
//     </div>
//   );
// }

// app/store/promotions/page.tsx
import ActivePromotions from "@/components/store/promotions/ActivePromotions";
import PromotionManager from "@/components/store/promotions/PromotionManager";

export default function PromotionsPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* RESPONSIVE CHANGE: Stack header on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Promotions & Discounts
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Create and manage promotional campaigns
          </p>
        </div>
        {/* RESPONSIVE CHANGE: Full width button on mobile */}
        <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
          Create Promotion
        </button>
      </div>

      <ActivePromotions />
      <PromotionManager />
    </div>
  );
}
