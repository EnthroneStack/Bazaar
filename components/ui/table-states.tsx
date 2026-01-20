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
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function TableLoadingSkeleton() {
  return (
    <Card className="w-full overflow-hidden animate-pulse">
      <ScrollArea className="w-full">
        <div className="min-w-[900px] md:min-w-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Skeleton className="h-5 w-5 rounded" />
                </TableHead>
                <TableHead className="min-w-[200px]">
                  <Skeleton className="h-4 w-32 rounded" />
                </TableHead>
                <TableHead className="min-w-[120px]">
                  <Skeleton className="h-4 w-24 rounded" />
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <Skeleton className="h-4 w-20 rounded" />
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <Skeleton className="h-4 w-24 rounded" />
                </TableHead>
                <TableHead className="min-w-[120px]">
                  <Skeleton className="h-4 w-28 rounded" />
                </TableHead>
                <TableHead className="min-w-[130px]">
                  <Skeleton className="h-4 w-32 rounded" />
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <Skeleton className="h-4 w-20 rounded" />
                </TableHead>
                <TableHead className="min-w-[100px] text-right">
                  <Skeleton className="h-4 w-24 rounded ml-auto" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(6)].map((_, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-transparent">
                  <TableCell>
                    <Skeleton className="h-5 w-5 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded-lg" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[160px] sm:w-[180px] rounded" />
                        <Skeleton className="h-3 w-[100px] sm:w-[120px] rounded" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16 sm:w-20 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Skeleton className="h-4 w-12 sm:w-16 rounded" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-12 sm:w-16 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 sm:w-24 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-24 sm:w-28 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-8 sm:w-12 rounded" />
                      <Skeleton className="h-3 w-12 sm:w-16 rounded" />
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
        <Skeleton className="h-4 w-40 sm:w-48 rounded" />
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
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center p-8 sm:p-12 text-center">
        <div className="mb-4 sm:mb-6 rounded-full bg-muted/50 p-3 sm:p-4">
          <Package className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg sm:text-xl font-semibold text-foreground">
          No products found
        </h3>
        <p className="mb-6 sm:mb-8 text-sm sm:text-base text-muted-foreground max-w-[280px] sm:max-w-sm">
          Get started by adding your first product. It will appear here once
          created.
        </p>
        <Button asChild className="text-white bg-primary hover:bg-primary/90">
          <Link href="/store/add-product">Add Product</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
