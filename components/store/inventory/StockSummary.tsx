// // components/store/inventory/StockSummary.tsx
// import { TrendingUp, TrendingDown, Minus } from "lucide-react";

// const summaryData = [
//   {
//     title: "Total Value",
//     value: "$45,820",
//     change: "+12.4%",
//     trend: "up",
//     description: "Based on current stock",
//   },
//   {
//     title: "Stock Turnover",
//     value: "4.2",
//     change: "-0.8%",
//     trend: "down",
//     description: "Times per quarter",
//   },
//   {
//     title: "Stockout Rate",
//     value: "2.3%",
//     change: "-1.2%",
//     trend: "down",
//     description: "Lower is better",
//   },
//   {
//     title: "Avg. Stock Days",
//     value: "45",
//     change: "0%",
//     trend: "neutral",
//     description: "Days in inventory",
//   },
// ];

// export default function StockSummary() {
//   const getTrendIcon = (trend: string) => {
//     switch (trend) {
//       case "up":
//         return <TrendingUp className="h-4 w-4 text-green-600" />;
//       case "down":
//         return <TrendingDown className="h-4 w-4 text-red-600" />;
//       default:
//         return <Minus className="h-4 w-4 text-gray-600" />;
//     }
//   };

//   const getTrendColor = (trend: string, change: string) => {
//     if (trend === "up") return "text-green-600";
//     if (trend === "down") return "text-red-600";
//     return "text-gray-600";
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//       {summaryData.map((item) => (
//         <div
//           key={item.title}
//           className="bg-white rounded-xl border border-gray-200 p-6"
//         >
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-sm text-gray-600">{item.title}</p>
//               <p className="text-2xl font-bold text-gray-900 mt-2">
//                 {item.value}
//               </p>
//               <div
//                 className={`flex items-center mt-1 ${getTrendColor(
//                   item.trend,
//                   item.change
//                 )}`}
//               >
//                 {getTrendIcon(item.trend)}
//                 <span className="text-sm ml-1">{item.change}</span>
//                 <span className="text-xs text-gray-500 ml-2">
//                   from last month
//                 </span>
//               </div>
//             </div>
//           </div>
//           <p className="text-xs text-gray-500 mt-4">{item.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// components/store/inventory/StockSummary.tsx
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const summaryData = [
  {
    title: "Total Value",
    value: "$45,820",
    change: "+12.4%",
    trend: "up",
    description: "Based on current stock",
  },
  {
    title: "Stock Turnover",
    value: "4.2",
    change: "-0.8%",
    trend: "down",
    description: "Times per quarter",
  },
  {
    title: "Stockout Rate",
    value: "2.3%",
    change: "-1.2%",
    trend: "down",
    description: "Lower is better",
  },
  {
    title: "Avg. Stock Days",
    value: "45",
    change: "0%",
    trend: "neutral",
    description: "Days in inventory",
  },
];

export default function StockSummary() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />;
      default:
        return <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />;
    }
  };

  return (
    // RESPONSIVE CHANGE: 1 column mobile, 2 tablet, 4 desktop
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
      {summaryData.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6"
        >
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 truncate">
                {item.title}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2 truncate">
                {item.value}
              </p>
              <div
                className={`flex items-center mt-1 ${
                  item.trend === "up"
                    ? "text-green-600"
                    : item.trend === "down"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {getTrendIcon(item.trend)}
                <span className="text-xs sm:text-sm ml-1">{item.change}</span>
                <span className="text-xs text-gray-500 ml-1 sm:ml-2 hidden sm:inline">
                  from last month
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3 sm:mt-4">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
