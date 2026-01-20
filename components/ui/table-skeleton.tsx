"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

export type TableColumn = {
  key: string;
  header?: string;
  width?: string;
  className?: string;
  skeletonWidth?: string;
};

export type TableSkeletonProps = {
  // Table configuration
  columns: TableColumn[];
  rows?: number;
  minWidth?: string;

  // Card configuration
  hasCard?: boolean;
  hasHeader?: boolean;
  headerContent?: ReactNode;

  // Footer configuration
  hasFooter?: boolean;
  footerContent?: ReactNode;

  // Scroll configuration
  hasScroll?: boolean;

  // Style configuration
  shimmerIntensity?: "light" | "medium" | "dark";
  rowHeight?: string;
  skeletonVariant?: "default" | "rounded" | "pill";

  // Animation configuration
  enableShimmer?: boolean;
  enableStaggeredRows?: boolean;
  staggerDelay?: number;
};

const defaultColumns: TableColumn[] = [
  { key: "checkbox", skeletonWidth: "w-4" },
  { key: "product", skeletonWidth: "w-[160px]" },
  { key: "category", skeletonWidth: "w-[90px]" },
  { key: "price", skeletonWidth: "w-[70px]" },
  { key: "stock", skeletonWidth: "w-[80px]" },
  { key: "status", skeletonWidth: "w-[90px]" },
  { key: "published", skeletonWidth: "w-[100px]" },
  { key: "sales", skeletonWidth: "w-[50px]" },
  { key: "actions", skeletonWidth: "w-8", className: "text-right" },
];

export function TableSkeleton({
  columns = defaultColumns,
  rows = 6,
  minWidth = "min-w-[900px] md:min-w-0",
  hasCard = true,
  hasHeader = false,
  headerContent,
  hasFooter = true,
  footerContent,
  hasScroll = true,
  shimmerIntensity = "medium",
  rowHeight = "h-12",
  skeletonVariant = "default",
  enableShimmer = true,
  enableStaggeredRows = true,
  staggerDelay = 0.1,
}: TableSkeletonProps) {
  const getShimmerColor = () => {
    switch (shimmerIntensity) {
      case "light":
        return "via-white/10 to-transparent";
      case "medium":
        return "via-white/20 to-transparent";
      case "dark":
        return "via-white/30 to-transparent";
      default:
        return "via-white/20 to-transparent";
    }
  };

  const getSkeletonClasses = () => {
    const base = "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200";
    switch (skeletonVariant) {
      case "rounded":
        return `${base} rounded-md`;
      case "pill":
        return `${base} rounded-full`;
      default:
        return base;
    }
  };

  const renderSkeletonCell = (
    column: TableColumn,
    rowIndex: number,
    isLastRow?: boolean,
  ) => {
    const skeletonClasses = getSkeletonClasses();
    const animationDelay = enableStaggeredRows
      ? `${rowIndex * staggerDelay}s`
      : "0s";

    // Special handling for different column types
    switch (column.key) {
      case "checkbox":
        return <Skeleton className={`h-4 w-4 rounded-sm ${skeletonClasses}`} />;
      case "product":
        return (
          <div className="flex items-center gap-3">
            <Skeleton className={`h-10 w-10 rounded-lg ${skeletonClasses}`} />
            <div className="space-y-2">
              <Skeleton
                className={`h-4 ${column.skeletonWidth || "w-[160px]"} ${skeletonClasses}`}
              />
              <Skeleton
                className={`h-3 ${column.skeletonWidth || "w-[120px]"} ${skeletonClasses}`}
              />
            </div>
          </div>
        );
      case "avatar":
        return (
          <div className="flex items-center gap-3">
            <Skeleton className={`h-8 w-8 rounded-full ${skeletonClasses}`} />
            <div className="space-y-1">
              <Skeleton
                className={`h-4 ${column.skeletonWidth || "w-[120px]"} ${skeletonClasses}`}
              />
              <Skeleton
                className={`h-3 ${column.skeletonWidth || "w-[80px]"} ${skeletonClasses}`}
              />
            </div>
          </div>
        );
      case "image":
        return (
          <Skeleton className={`h-12 w-12 rounded-lg ${skeletonClasses}`} />
        );
      case "badge":
      case "status":
        return (
          <Skeleton
            className={`h-6 ${column.skeletonWidth || "w-20"} rounded-full ${skeletonClasses}`}
          />
        );
      case "actions":
        return (
          <div className="flex justify-end gap-1">
            <Skeleton className={`h-8 w-8 rounded-md ${skeletonClasses}`} />
            <Skeleton className={`h-8 w-8 rounded-md ${skeletonClasses}`} />
          </div>
        );
      case "number":
        return (
          <Skeleton
            className={`h-4 ${column.skeletonWidth || "w-16"} ${skeletonClasses}`}
          />
        );
      case "price":
        return (
          <div className="flex items-center gap-1">
            <Skeleton className={`h-4 w-3 ${skeletonClasses}`} />
            <Skeleton
              className={`h-4 ${column.skeletonWidth || "w-16"} ${skeletonClasses}`}
            />
          </div>
        );
      case "date":
        return (
          <div className="space-y-1">
            <Skeleton
              className={`h-4 ${column.skeletonWidth || "w-24"} ${skeletonClasses}`}
            />
            <Skeleton
              className={`h-3 ${column.skeletonWidth || "w-16"} ${skeletonClasses}`}
            />
          </div>
        );
      default:
        return (
          <Skeleton
            className={`h-4 ${column.skeletonWidth || "w-32"} ${skeletonClasses}`}
          />
        );
    }
  };

  const TableContent = () => (
    <>
      {enableShimmer && (
        <div
          className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${getShimmerColor()}, transparent)`,
          }}
        />
      )}

      {hasScroll ? (
        <ScrollArea className="w-full">
          <div className={minWidth}>
            <Table>
              <TableHeader>
                <TableRow className="animate-pulse">
                  {columns.map((column, i) => (
                    <TableHead key={i} className={column.className}>
                      <Skeleton
                        className={`h-4 w-[80%] ${getSkeletonClasses()}`}
                      />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className={`animate-pulse ${rowHeight}`}
                    style={
                      enableStaggeredRows
                        ? { animationDelay: `${rowIndex * staggerDelay}s` }
                        : undefined
                    }
                  >
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex} className={column.className}>
                        <div className="relative overflow-hidden">
                          {renderSkeletonCell(
                            column,
                            rowIndex,
                            rowIndex === rows - 1,
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className={minWidth}>
          <Table>
            <TableHeader>
              <TableRow className="animate-pulse">
                {columns.map((column, i) => (
                  <TableHead key={i} className={column.className}>
                    <Skeleton
                      className={`h-4 w-[80%] ${getSkeletonClasses()}`}
                    />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={`animate-pulse ${rowHeight}`}
                  style={
                    enableStaggeredRows
                      ? { animationDelay: `${rowIndex * staggerDelay}s` }
                      : undefined
                  }
                >
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex} className={column.className}>
                      <div className="relative overflow-hidden">
                        {renderSkeletonCell(
                          column,
                          rowIndex,
                          rowIndex === rows - 1,
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );

  const TableFooter = () =>
    hasFooter && (
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t p-4 animate-pulse">
        {footerContent || (
          <>
            <Skeleton className={`h-4 w-[180px] ${getSkeletonClasses()}`} />
            <div className="flex gap-2">
              <Skeleton
                className={`h-8 w-8 rounded-md ${getSkeletonClasses()}`}
              />
              <Skeleton
                className={`h-8 w-8 rounded-md ${getSkeletonClasses()}`}
              />
              <Skeleton
                className={`h-8 w-8 rounded-md ${getSkeletonClasses()}`}
              />
            </div>
          </>
        )}
      </CardFooter>
    );

  const TableHeaderSection = () =>
    hasHeader && (
      <CardHeader>
        {headerContent || (
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className={`h-6 w-48 ${getSkeletonClasses()}`} />
              <Skeleton className={`h-4 w-64 ${getSkeletonClasses()}`} />
            </div>
            <Skeleton
              className={`h-10 w-32 rounded-md ${getSkeletonClasses()}`}
            />
          </div>
        )}
      </CardHeader>
    );

  if (!hasCard) {
    return (
      <div className="relative">
        <TableContent />
        <TableFooter />
      </div>
    );
  }

  return (
    <Card className="overflow-hidden">
      <TableHeaderSection />
      <div className="relative">
        <TableContent />
      </div>
      <TableFooter />
    </Card>
  );
}

// Pre-configured table skeletons for different use cases
export function ProductTableSkeleton({ rows = 6 }: { rows?: number }) {
  const columns: TableColumn[] = [
    { key: "checkbox", skeletonWidth: "w-4" },
    { key: "product", skeletonWidth: "w-[160px]" },
    { key: "category", skeletonWidth: "w-[90px]" },
    { key: "price", skeletonWidth: "w-[70px]" },
    { key: "stock", skeletonWidth: "w-[80px]" },
    { key: "status", skeletonWidth: "w-[90px]" },
    { key: "published", skeletonWidth: "w-[100px]" },
    { key: "sales", skeletonWidth: "w-[50px]" },
    { key: "actions", skeletonWidth: "w-8", className: "text-right" },
  ];

  return (
    <TableSkeleton
      columns={columns}
      rows={rows}
      minWidth="min-w-[900px] md:min-w-0"
    />
  );
}

export function OrderTableSkeleton({ rows = 6 }: { rows?: number }) {
  const columns: TableColumn[] = [
    { key: "checkbox", skeletonWidth: "w-4" },
    { key: "order", skeletonWidth: "w-[120px]" },
    { key: "customer", skeletonWidth: "w-[140px]" },
    { key: "date", skeletonWidth: "w-[100px]" },
    { key: "status", skeletonWidth: "w-[90px]" },
    { key: "items", skeletonWidth: "w-[70px]" },
    { key: "total", skeletonWidth: "w-[80px]" },
    { key: "payment", skeletonWidth: "w-[100px]" },
    { key: "actions", skeletonWidth: "w-8", className: "text-right" },
  ];

  return (
    <TableSkeleton
      columns={columns}
      rows={rows}
      minWidth="min-w-[1000px] md:min-w-0"
    />
  );
}

export function CustomerTableSkeleton({ rows = 6 }: { rows?: number }) {
  const columns: TableColumn[] = [
    { key: "checkbox", skeletonWidth: "w-4" },
    { key: "avatar", skeletonWidth: "w-[120px]" },
    { key: "email", skeletonWidth: "w-[160px]" },
    { key: "phone", skeletonWidth: "w-[100px]" },
    { key: "location", skeletonWidth: "w-[120px]" },
    { key: "orders", skeletonWidth: "w-[70px]" },
    { key: "spent", skeletonWidth: "w-[80px]" },
    { key: "status", skeletonWidth: "w-[90px]" },
    { key: "actions", skeletonWidth: "w-8", className: "text-right" },
  ];

  return (
    <TableSkeleton
      columns={columns}
      rows={rows}
      minWidth="min-w-[950px] md:min-w-0"
    />
  );
}

export function InventoryTableSkeleton({ rows = 6 }: { rows?: number }) {
  const columns: TableColumn[] = [
    { key: "checkbox", skeletonWidth: "w-4" },
    { key: "product", skeletonWidth: "w-[140px]" },
    { key: "sku", skeletonWidth: "w-[100px]" },
    { key: "stock", skeletonWidth: "w-[80px]" },
    { key: "threshold", skeletonWidth: "w-[90px]" },
    { key: "status", skeletonWidth: "w-[90px]" },
    { key: "last_updated", skeletonWidth: "w-[120px]" },
    { key: "value", skeletonWidth: "w-[80px]" },
    { key: "actions", skeletonWidth: "w-8", className: "text-right" },
  ];

  return (
    <TableSkeleton
      columns={columns}
      rows={rows}
      minWidth="min-w-[950px] md:min-w-0"
    />
  );
}

export function PromotionsTableSkeleton({ rows = 6 }: { rows?: number }) {
  const columns: TableColumn[] = [
    { key: "checkbox", skeletonWidth: "w-4" },
    { key: "name", skeletonWidth: "w-[140px]" },
    { key: "type", skeletonWidth: "w-[90px]" },
    { key: "discount", skeletonWidth: "w-[80px]" },
    { key: "status", skeletonWidth: "w-[90px]" },
    { key: "start_date", skeletonWidth: "w-[100px]" },
    { key: "end_date", skeletonWidth: "w-[100px]" },
    { key: "usage", skeletonWidth: "w-[70px]" },
    { key: "actions", skeletonWidth: "w-8", className: "text-right" },
  ];

  return (
    <TableSkeleton
      columns={columns}
      rows={rows}
      minWidth="min-w-[900px] md:min-w-0"
      hasHeader={true}
    />
  );
}

export function AnalyticsTableSkeleton({ rows = 6 }: { rows?: number }) {
  const columns: TableColumn[] = [
    { key: "period", skeletonWidth: "w-[120px]" },
    { key: "revenue", skeletonWidth: "w-[100px]" },
    { key: "orders", skeletonWidth: "w-[80px]" },
    { key: "customers", skeletonWidth: "w-[90px]" },
    { key: "conversion", skeletonWidth: "w-[80px]" },
    { key: "avg_order", skeletonWidth: "w-[90px]" },
    { key: "growth", skeletonWidth: "w-[70px]" },
  ];

  return (
    <TableSkeleton
      columns={columns}
      rows={rows}
      minWidth="min-w-[800px] md:min-w-0"
      hasFooter={false}
      hasScroll={false}
    />
  );
}

// Lightweight version without shimmer for simple tables
export function SimpleTableSkeleton({
  rows = 6,
  columns = 5,
}: {
  rows?: number;
  columns?: number;
}) {
  const simpleColumns = Array.from({ length: columns }).map((_, i) => ({
    key: `col-${i}`,
    skeletonWidth: i === 0 ? "w-[120px]" : "w-[100px]",
  })) as TableColumn[];

  return (
    <TableSkeleton
      columns={simpleColumns}
      rows={rows}
      enableShimmer={false}
      hasCard={false}
      hasFooter={false}
      hasScroll={false}
    />
  );
}
