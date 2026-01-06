"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Building, FileText, Shield } from "lucide-react";
import { AddressSection } from "./AddressSection";

interface BusinessInfoCardProps {
  store: {
    businessType: string;
    status: string;
    registrationNo?: string;
    taxId?: string;
    address: any;
  };
}

export function BusinessInfoCard({ store }: BusinessInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Information</CardTitle>
        <CardDescription>Legal and registration details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Business Type</Label>
            <div className="flex items-center gap-2 p-2 border rounded-md">
              <Building className="h-4 w-4 text-gray-500" />
              <span className="capitalize">
                {store.businessType.toLowerCase()}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Store Status</Label>
            <div className="flex items-center gap-2 p-2 border rounded-md">
              <Shield className="h-4 w-4 text-gray-500" />
              <Badge
                variant={
                  store.status === "APPROVED"
                    ? "default"
                    : store.status === "PENDING"
                    ? "secondary"
                    : "destructive"
                }
                className="text-white"
              >
                {store.status}
              </Badge>
            </div>
          </div>

          {store.registrationNo && (
            <div className="space-y-2">
              <Label>Registration Number</Label>
              <div className="flex items-center gap-2 p-2 border rounded-md">
                <FileText className="h-4 w-4 text-gray-500" />
                <span>{store.registrationNo}</span>
                <Badge variant="outline">Read Only</Badge>
              </div>
            </div>
          )}

          {store.taxId && (
            <div className="space-y-2">
              <Label>Tax ID</Label>
              <div className="flex items-center gap-2 p-2 border rounded-md">
                <FileText className="h-4 w-4 text-gray-500" />
                <span>{store.taxId}</span>
                <Badge variant="outline">Read Only</Badge>
              </div>
            </div>
          )}
        </div>

        {store.address && <AddressSection address={store.address} />}
      </CardContent>
    </Card>
  );
}
