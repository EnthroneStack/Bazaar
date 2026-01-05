"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Loader2,
  Save,
  ArrowLeft,
  Upload,
  Store,
  Mail,
  Phone,
  MapPin,
  Building,
  FileText,
  Shield,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

type StoreProfile = {
  id: string;
  name: string;
  description: string;
  email: string;
  contact: string;
  address: any;
  businessType: string;
  registrationNo?: string;
  taxId?: string;
  status: string;
  logo?: string;
  coverImage?: string;
  username: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export default function StoreProfilePage() {
  const [store, setStore] = useState<StoreProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/store/profile");

      if (!res.ok) throw new Error("Failed to fetch store");

      const data = await res.json();
      setStore(data.store);
    } catch (error) {
      console.error("Failed to load store:", error);
      setError("Failed to load store information");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!store) return;

    try {
      setSaving(true);
      setError(null);

      const res = await fetch("/api/store/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: store.name,
          description: store.description,
          contact: store.contact,
        }),
      });

      if (!res.ok) throw new Error("Failed to update store");

      setSuccess(true);
      setEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("logo", file);

      const res = await fetch("/api/store/upload-logo", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload logo");

      const data = await res.json();
      setStore((prev) => (prev ? { ...prev, logo: data.logoUrl } : null));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError("Failed to upload logo");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertDescription>
            Store not found. Please create a store first.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Store Profile</h1>
        </div>

        <div className="flex gap-2">
          {editing ? (
            <>
              <Button variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditing(true)}>Edit Profile</Button>
          )}
        </div>
      </div>

      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertDescription className="text-green-700">
            Profile updated successfully!
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Store Logo</CardTitle>
            <CardDescription>
              Upload your store logo (Recommended: 400x400px)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-40 w-40 border-4 border-white shadow-lg">
                <AvatarImage src={store.logo ?? undefined} />
                <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                  {store.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              {editing && (
                <div className="flex flex-col items-center gap-2">
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors">
                      <Upload className="h-4 w-4" />
                      Upload New Logo
                    </div>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleLogoUpload(file);
                      }}
                    />
                  </Label>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, or WebP. Max 2MB.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Store details that customers will see
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Store Name</Label>
                {editing ? (
                  <Input
                    id="name"
                    value={store.name}
                    onChange={(e) =>
                      setStore({ ...store, name: e.target.value })
                    }
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
                    onChange={(e) =>
                      setStore({ ...store, contact: e.target.value })
                    }
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
                  onChange={(e) =>
                    setStore({ ...store, description: e.target.value })
                  }
                  rows={3}
                />
              ) : (
                <p className="p-2 border rounded-md">{store.description}</p>
              )}
            </div>
          </CardContent>
        </Card>

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

            {store.address && (
              <div className="space-y-2">
                <Label>Address</Label>
                <div className="flex items-start gap-2 p-3 border rounded-md bg-gray-50">
                  <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                  <pre className="text-sm whitespace-pre-wrap font-sans">
                    {JSON.stringify(store.address, null, 2)}
                  </pre>
                  <Badge variant="outline">Read Only</Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Metadata */}
        <Card>
          <CardHeader>
            <CardTitle>Store Metadata</CardTitle>
            <CardDescription>
              System information about your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Store ID</p>
                <p className="font-mono">{store.id}</p>
              </div>
              <div>
                <p className="text-gray-500">User ID</p>
                <p className="font-mono truncate">{store.userId}</p>
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
      </div>
    </div>
  );
}
