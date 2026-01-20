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

export default function ProductTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

        <ScrollArea className="w-full">
          <div className="min-w-[900px] md:min-w-0">
            <Table>
              <TableHeader>
                <TableRow className="animate-pulse">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <TableHead key={i}>
                      <Skeleton className="h-4 w-[80%] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className="animate-pulse"
                    style={{ animationDelay: `${rowIndex * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="relative overflow-hidden">
                        <Skeleton className="h-4 w-4 rounded-sm bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative overflow-hidden rounded-lg">
                          <Skeleton className="h-10 w-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                        </div>
                        <div className="space-y-2">
                          <div className="relative overflow-hidden">
                            <Skeleton className="h-4 w-[160px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                          </div>
                          <div className="relative overflow-hidden">
                            <Skeleton className="h-3 w-[120px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="relative overflow-hidden">
                        <Skeleton className="h-4 w-[90px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="relative overflow-hidden">
                        <Skeleton className="h-4 w-[70px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="relative overflow-hidden">
                        <Skeleton className="h-4 w-[80px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="relative overflow-hidden">
                        <Skeleton className="h-4 w-[90px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="relative overflow-hidden">
                        <Skeleton className="h-4 w-[100px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="relative overflow-hidden">
                        <Skeleton className="h-4 w-[50px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="relative overflow-hidden ml-auto w-fit">
                        <Skeleton className="h-8 w-8 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t p-4 animate-pulse">
        <Skeleton className="h-4 w-[180px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <Skeleton className="h-8 w-8 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <Skeleton className="h-8 w-8 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      </CardFooter>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </Card>
  );
}
