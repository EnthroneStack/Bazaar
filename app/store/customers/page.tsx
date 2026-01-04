// app/store/customers/page.tsx

import CustomerInsights from "@/components/store/customers/CustomerInsights";
import CustomerList from "@/components/store/customers/CustomerList";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage and analyze your customer base</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Export Data
        </button>
      </div>

      <CustomerInsights />
      <CustomerList />
    </div>
  );
}
