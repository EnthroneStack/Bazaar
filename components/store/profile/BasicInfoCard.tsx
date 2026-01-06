"use client";

import { StoreProfile } from "@/app/store/profile/page";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Store } from "lucide-react";

interface BasicInfoCardProps {
  store: StoreProfile;
  editing: boolean;
  onFieldChange: (field: string, value: string) => void;
  hasUnsavedChanges: boolean;
}

export function BasicInfoCard({
  store,
  editing,
  onFieldChange,
}: BasicInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Store details that customers will see</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Store Name</Label>
            {editing ? (
              <Input
                id="name"
                value={store.name}
                onChange={(e) => onFieldChange("name", e.target.value)}
                className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
              />
            ) : (
              <div className="flex items-center gap-2 p-2 border rounded-md">
                <Store className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{store.name}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="flex items-center gap-2 p-2 border rounded-md">
              <span className="font-mono">@{store.username}</span>
              <Badge variant="outline">Read Only</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center gap-2 p-2 border rounded-md">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{store.email}</span>
              <Badge variant="outline">Read Only</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact Number</Label>
            {editing ? (
              <Input
                id="contact"
                value={store.contact}
                onChange={(e) => onFieldChange("contact", e.target.value)}
                className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
              />
            ) : (
              <div className="flex items-center gap-2 p-2 border rounded-md">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{store.contact}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Store Description</Label>
          {editing ? (
            <Textarea
              id="description"
              value={store.description}
              onChange={(e) => onFieldChange("description", e.target.value)}
              rows={3}
              className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
            />
          ) : (
            <p className="p-2 border rounded-md">{store.description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
