"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

interface Address {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  [key: string]: any;
}

interface AddressSectionProps {
  address: Address;
}

export function AddressSection({ address }: AddressSectionProps) {
  if (!address || typeof address !== "object") {
    return null;
  }

  return (
    <fieldset className="space-y-4 border-2 border-gray-200 rounded-lg p-3 sm:p-4">
      <legend className="text-sm font-medium text-gray-700 px-1 sm:px-2 flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        Address
      </legend>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {address.street && (
          <div className="space-y-1 sm:space-y-2">
            <Label className="text-xs text-gray-500">Street</Label>
            <div className="p-2 border rounded-md bg-gray-50">
              <span className="text-sm">{address.street}</span>
            </div>
          </div>
        )}

        {address.city && (
          <div className="space-y-1 sm:space-y-2">
            <Label className="text-xs text-gray-500">City</Label>
            <div className="p-2 border rounded-md bg-gray-50">
              <span className="text-sm">{address.city}</span>
            </div>
          </div>
        )}

        {address.state && (
          <div className="space-y-1 sm:space-y-2">
            <Label className="text-xs text-gray-500">State/Province</Label>
            <div className="p-2 border rounded-md bg-gray-50">
              <span className="text-sm">{address.state}</span>
            </div>
          </div>
        )}

        {address.zip && (
          <div className="space-y-1 sm:space-y-2">
            <Label className="text-xs text-gray-500">ZIP/Postal Code</Label>
            <div className="p-2 border rounded-md bg-gray-50">
              <span className="text-sm">{address.zip}</span>
            </div>
          </div>
        )}

        {address.country && (
          <div className="space-y-1 sm:space-y-2 col-span-1 sm:col-span-2">
            <Label className="text-xs text-gray-500">Country</Label>
            <div className="p-2 border rounded-md bg-gray-50">
              <span className="text-sm">{address.country}</span>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2 border-t">
        <Badge variant="outline" className="text-xs">
          Read Only
        </Badge>
      </div>
    </fieldset>
  );
}
