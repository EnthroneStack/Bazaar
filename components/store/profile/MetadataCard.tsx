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
      <CardHeader>
        <CardTitle>Store Metadata</CardTitle>
        <CardDescription>System information about your store</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Store ID</p>
            <p className="font-mono text-xs">{store.id}</p>
          </div>
          <div>
            <p className="text-gray-500">User ID</p>
            <p className="font-mono text-xs truncate">{store.userId}</p>
          </div>
          <div>
            <p className="text-gray-500">Created On</p>
            <p>{new Date(store.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Last Updated</p>
            <p>{new Date(store.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
