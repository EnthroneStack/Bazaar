// // app/store/analytics/page.tsx

// import AnalyticsDashboard from "@/components/store/analytics/AnalyticsDashboard";

// export default function AnalyticsPage() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
//         <p className="text-gray-600">
//           Detailed insights about your store performance
//         </p>
//       </div>
//       <AnalyticsDashboard />
//     </div>
//   );
// }

// app/store/analytics/page.tsx
import AnalyticsDashboard from "@/components/store/analytics/AnalyticsDashboard";

export default function AnalyticsPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Analytics
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Detailed insights about your store performance
        </p>
      </div>
      <AnalyticsDashboard />
    </div>
  );
}
