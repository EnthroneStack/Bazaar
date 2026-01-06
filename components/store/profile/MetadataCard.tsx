"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MetadataCardProps {
  store: {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function MetadataCard({ store }: MetadataCardProps) {
  return (
    <Card>
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">Store Metadata</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          System information about your store
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs sm:text-sm">Store ID</p>
            <p className="font-mono text-xs sm:text-sm truncate">{store.id}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs sm:text-sm">User ID</p>
            <p className="font-mono text-xs sm:text-sm truncate">
              {store.userId}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs sm:text-sm">Created On</p>
            <p className="text-sm sm:text-base">
              {new Date(store.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs sm:text-sm">Last Updated</p>
            <p className="text-sm sm:text-base">
              {new Date(store.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
