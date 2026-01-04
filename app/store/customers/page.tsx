// // app/store/customers/page.tsx

// import CustomerInsights from "@/components/store/customers/CustomerInsights";
// import CustomerList from "@/components/store/customers/CustomerList";

// export default function CustomersPage() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
//           <p className="text-gray-600">Manage and analyze your customer base</p>
//         </div>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//           Export Data
//         </button>
//       </div>

//       <CustomerInsights />
//       <CustomerList />
//     </div>
//   );
// }

// app/store/customers/page.tsx
import CustomerInsights from "@/components/store/customers/CustomerInsights";
import CustomerList from "@/components/store/customers/CustomerList";

export default function CustomersPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* RESPONSIVE CHANGE: Stack header on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Customers
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage and analyze your customer base
          </p>
        </div>
        {/* RESPONSIVE CHANGE: Full width button on mobile */}
        <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
          Export Data
        </button>
      </div>

      <CustomerInsights />
      <CustomerList />
    </div>
  );
}
