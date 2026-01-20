// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableHead,
//   TableRow,
// } from "@/components/ui/table";
// import { Card, CardFooter } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// export default function ProductTableSkeleton({ rows = 6 }: { rows?: number }) {
//   return (
//     <Card className="overflow-hidden">
//       <ScrollArea className="w-full">
//         <div className="min-w-[900px] md:min-w-0">
//           <Table>
//             {/* Header Skeleton */}
//             <TableHeader>
//               <TableRow>
//                 {Array.from({ length: 9 }).map((_, i) => (
//                   <TableHead key={i}>
//                     <Skeleton className="h-4 w-[80%]" />
//                   </TableHead>
//                 ))}
//               </TableRow>
//             </TableHeader>

//             {/* Body Skeleton */}
//             <TableBody>
//               {Array.from({ length: rows }).map((_, rowIndex) => (
//                 <TableRow key={rowIndex}>
//                   {/* Checkbox */}
//                   <TableCell>
//                     <Skeleton className="h-4 w-4 rounded-sm" />
//                   </TableCell>

//                   {/* Product */}
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <Skeleton className="h-10 w-10 rounded-lg" />
//                       <div className="space-y-2">
//                         <Skeleton className="h-4 w-[160px]" />
//                         <Skeleton className="h-3 w-[120px]" />
//                       </div>
//                     </div>
//                   </TableCell>

//                   {/* Category */}
//                   <TableCell>
//                     <Skeleton className="h-4 w-[90px] rounded-full" />
//                   </TableCell>

//                   {/* Price */}
//                   <TableCell>
//                     <Skeleton className="h-4 w-[70px]" />
//                   </TableCell>

//                   {/* Stock */}
//                   <TableCell>
//                     <Skeleton className="h-4 w-[80px]" />
//                   </TableCell>

//                   {/* Inventory Status */}
//                   <TableCell>
//                     <Skeleton className="h-4 w-[90px] rounded-full" />
//                   </TableCell>

//                   {/* Published/Draft */}
//                   <TableCell>
//                     <Skeleton className="h-4 w-[100px] rounded-full" />
//                   </TableCell>

//                   {/* Sales */}
//                   <TableCell>
//                     <Skeleton className="h-4 w-[50px]" />
//                   </TableCell>

//                   {/* Actions */}
//                   <TableCell className="text-right">
//                     <Skeleton className="h-8 w-8 rounded-md ml-auto" />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//         <ScrollBar orientation="horizontal" />
//       </ScrollArea>

//       {/* Footer Skeleton */}
//       <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t p-4">
//         <Skeleton className="h-4 w-[180px]" />
//         <div className="flex gap-2">
//           <Skeleton className="h-8 w-8 rounded-md" />
//           <Skeleton className="h-8 w-8 rounded-md" />
//           <Skeleton className="h-8 w-8 rounded-md" />
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Card, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

export default function ProductTableSkeleton({ rows = 6 }: { rows?: number }) {
  const [loadedRows, setLoadedRows] = useState<number[]>([]);

  useEffect(() => {
    // Simulate progressive row loading
    const timers: NodeJS.Timeout[] = [];

    for (let i = 0; i < rows; i++) {
      const timer = setTimeout(() => {
        setLoadedRows((prev) => [...prev, i]);
      }, i * 100); // Stagger each row by 100ms

      timers.push(timer);
    }

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [rows]);

  const RowSkeleton = ({
    rowIndex,
    isLoaded,
  }: {
    rowIndex: number;
    isLoaded: boolean;
  }) => (
    <TableRow
      key={rowIndex}
      className={`transition-all duration-300 ease-in-out ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {/* Checkbox */}
      <TableCell>
        <Skeleton
          className={`h-4 w-4 rounded-sm ${isLoaded ? "animate-pulse" : ""}`}
        />
      </TableCell>

      {/* Product */}
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton
            className={`h-10 w-10 rounded-lg ${isLoaded ? "animate-pulse" : ""}`}
          />
          <div className="space-y-2">
            <Skeleton
              className={`h-4 w-[160px] ${isLoaded ? "animate-pulse" : ""}`}
            />
            <Skeleton
              className={`h-3 w-[120px] ${isLoaded ? "animate-pulse" : ""}`}
            />
          </div>
        </div>
      </TableCell>

      {/* Category */}
      <TableCell>
        <Skeleton
          className={`h-4 w-[90px] rounded-full ${isLoaded ? "animate-pulse" : ""}`}
        />
      </TableCell>

      {/* Price */}
      <TableCell>
        <Skeleton
          className={`h-4 w-[70px] ${isLoaded ? "animate-pulse" : ""}`}
        />
      </TableCell>

      {/* Stock */}
      <TableCell>
        <Skeleton
          className={`h-4 w-[80px] ${isLoaded ? "animate-pulse" : ""}`}
        />
      </TableCell>

      {/* Inventory Status */}
      <TableCell>
        <Skeleton
          className={`h-4 w-[90px] rounded-full ${isLoaded ? "animate-pulse" : ""}`}
        />
      </TableCell>

      {/* Published/Draft */}
      <TableCell>
        <Skeleton
          className={`h-4 w-[100px] rounded-full ${isLoaded ? "animate-pulse" : ""}`}
        />
      </TableCell>

      {/* Sales */}
      <TableCell>
        <Skeleton
          className={`h-4 w-[50px] ${isLoaded ? "animate-pulse" : ""}`}
        />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <Skeleton
          className={`h-8 w-8 rounded-md ml-auto ${isLoaded ? "animate-pulse" : ""}`}
        />
      </TableCell>
    </TableRow>
  );

  return (
    <Card className="overflow-hidden animate-pulse">
      <ScrollArea className="w-full">
        <div className="min-w-[900px] md:min-w-0">
          <Table>
            {/* Header Skeleton */}
            <TableHeader>
              <TableRow>
                {Array.from({ length: 9 }).map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-4 w-[80%] animate-pulse" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            {/* Body Skeleton with Progressive Loading */}
            <TableBody>
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <RowSkeleton
                  key={rowIndex}
                  rowIndex={rowIndex}
                  isLoaded={loadedRows.includes(rowIndex)}
                />
              ))}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Footer Skeleton */}
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t p-4">
        <Skeleton className="h-4 w-[180px] animate-pulse" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-md animate-pulse" />
          <Skeleton className="h-8 w-8 rounded-md animate-pulse" />
          <Skeleton className="h-8 w-8 rounded-md animate-pulse" />
        </div>
      </CardFooter>
    </Card>
  );
}
