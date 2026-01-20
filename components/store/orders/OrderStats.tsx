// import {
//   DollarSign,
//   Package,
//   Clock,
//   CheckCircle,
//   TrendingUp,
// } from "lucide-react";

// const orderStats = [
//   {
//     title: "Total Revenue",
//     value: "$24,580",
//     change: "+12.5%",
//     icon: DollarSign,
//     color: "bg-green-100 text-green-600",
//   },
//   {
//     title: "Total Orders",
//     value: "1,248",
//     change: "+8.2%",
//     icon: Package,
//     color: "bg-blue-100 text-blue-600",
//   },
//   {
//     title: "Avg. Order Value",
//     value: "$89.50",
//     change: "+5.3%",
//     icon: TrendingUp,
//     color: "bg-purple-100 text-purple-600",
//   },
//   {
//     title: "Pending Orders",
//     value: "42",
//     change: "-3.1%",
//     icon: Clock,
//     color: "bg-yellow-100 text-yellow-600",
//   },
//   {
//     title: "Completed Orders",
//     value: "1,156",
//     change: "+10.7%",
//     icon: CheckCircle,
//     color: "bg-indigo-100 text-indigo-600",
//   },
// ];

// export default function OrderStats() {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6">
//       {orderStats.map((stat) => {
//         const Icon = stat.icon;
//         return (
//           <div
//             key={stat.title}
//             className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6"
//           >
//             <div className="flex items-center justify-between">
//               <div className="min-w-0">
//                 <p className="text-xs sm:text-sm text-gray-600 truncate">
//                   {stat.title}
//                 </p>
//                 <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2 truncate">
//                   {stat.value}
//                 </p>
//                 <p
//                   className={`text-xs sm:text-sm mt-1 truncate ${
//                     stat.change.startsWith("+")
//                       ? "text-green-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {stat.change} from last month
//                 </p>
//               </div>

//               <div
//                 className={`p-2 sm:p-3 rounded-full ${stat.color} ml-2 flex-shrink-0`}
//               >
//                 <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import {
  DollarSign,
  Package,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

type Props = {
  stats: {
    totalRevenue: number;
    totalOrders: number;
    avgOrderValue: number;
    pendingOrders: number;
    completedOrders: number;
  };
};

export default function OrderStats({ stats }: Props) {
  const orderStats = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Avg. Order Value",
      value: `$${stats.avgOrderValue.toFixed(2)}`,
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders.toString(),
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Completed Orders",
      value: stats.completedOrders.toString(),
      icon: CheckCircle,
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
      {orderStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">{stat.title}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
