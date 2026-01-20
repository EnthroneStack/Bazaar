"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function TableLoadingSkeleton() {
  return (
    <Card className="w-full overflow-hidden">
      <ScrollArea className="w-full">
        <div className="min-w-[900px] md:min-w-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Skeleton className="h-5 w-5" />
                </TableHead>
                <TableHead className="min-w-[200px]">
                  <Skeleton className="h-4 w-32" />
                </TableHead>
                <TableHead className="min-w-[120px]">
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead className="min-w-[120px]">
                  <Skeleton className="h-4 w-28" />
                </TableHead>
                <TableHead className="min-w-[130px]">
                  <Skeleton className="h-4 w-32" />
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead className="min-w-[100px] text-right">
                  <Skeleton className="h-4 w-24 ml-auto" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-transparent">
                  <TableCell>
                    <Skeleton className="h-5 w-5" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded-lg" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[180px]" />
                        <Skeleton className="h-3 w-[120px]" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-28 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t p-4 gap-4">
        <Skeleton className="h-4 w-48" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  );
}

export function TableEmptyState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-8 sm:p-12 text-center">
        <div className="mb-4 sm:mb-6 rounded-full bg-muted p-3 sm:p-4">
          <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
        </div>
        <Skeleton className="h-6 w-48 mb-3 sm:mb-4" />
        <Skeleton className="h-4 w-72 max-w-[300px] mb-6 sm:mb-8" />
        <Skeleton className="h-10 w-40 rounded-md" />
      </CardContent>
    </Card>
  );
}
