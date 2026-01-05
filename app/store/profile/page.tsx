"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import { LogoUploadCard } from "@/components/store/profile/LogoUploadCard";
import { BasicInfoCard } from "@/components/store/profile/BasicInfoCard";
import { BusinessInfoCard } from "@/components/store/profile/BusinessInfoCard";
import { MetadataCard } from "@/components/store/profile/MetadataCard";

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

  const handleFieldChange = (field: string, value: string) => {
    if (store) {
      setStore({ ...store, [field]: value });
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
        <LogoUploadCard
          logo={store.logo}
          storeName={store.name}
          editing={editing}
          onLogoUpload={handleLogoUpload}
        />

        <BasicInfoCard
          store={store}
          editing={editing}
          onFieldChange={handleFieldChange}
        />

        <BusinessInfoCard store={store} />

        <MetadataCard store={store} />
      </div>
    </div>
  );
}
