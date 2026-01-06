"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import { LogoUploadCard } from "@/components/store/profile/LogoUploadCard";
import { BasicInfoCard } from "@/components/store/profile/BasicInfoCard";
import { BusinessInfoCard } from "@/components/store/profile/BusinessInfoCard";
import { MetadataCard } from "@/components/store/profile/MetadataCard";
import { toast } from "sonner";

export type StoreProfile = {
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
  const [originalStore, setOriginalStore] = useState<StoreProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setOriginalStore(data.store);
    } catch (error) {
      console.error("Failed to load store:", error);
      toast.error("Failed to load store information");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoPreview = (file: File | null) => {
    if (!file) {
      setLogoPreview(null);
      setLogoFile(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
      setLogoFile(file);
    };
    reader.readAsDataURL(file);
  };

  const uploadLogoToServer = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("logo", file);

      const res = await fetch("/api/store/logo", {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload logo");

      const data = await res.json();
      return data.logo;
    } catch (error) {
      console.error("Logo upload error:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!store) return;

    setSaving(true);

    await toast.promise(
      async () => {
        let logoUrl = store.logo;

        if (logoFile) {
          logoUrl = await uploadLogoToServer(logoFile);
        }

        const res = await fetch("/api/store/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: store.name,
            description: store.description,
            contact: store.contact,
          }),
        });

        if (!res.ok) throw new Error("Failed to update store");

        const updatedData = await res.json();

        setStore(updatedData.store);
        setOriginalStore(updatedData.store);

        window.dispatchEvent(new Event("store-updated"));

        setLogoPreview(null);
        setLogoFile(null);
        setEditing(false);
      },
      {
        loading: logoFile
          ? "Uploading logo & saving changes..."
          : "Saving changes...",
        success: "Profile updated successfully",
        error: (err) =>
          err instanceof Error ? err.message : "Failed to update profile",
      }
    );

    setSaving(false);
  };

  const handleCancel = () => {
    if (originalStore) {
      setStore(originalStore);
    }

    setLogoPreview(null);
    setLogoFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setEditing(false);
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

  const currentLogo = logoPreview || store.logo;

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-700">Store Profile</h1>
        </div>

        <div className="flex gap-2">
          {editing ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border border-gray-300 text-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="text-white"
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditing(true)} className="text-white">
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6">
        <LogoUploadCard
          logo={currentLogo}
          storeName={store.name}
          editing={editing}
          onLogoPreview={handleLogoPreview}
          fileInputRef={fileInputRef}
          hasUnsavedLogo={!!logoFile}
        />

        <BasicInfoCard
          store={store}
          editing={editing}
          onFieldChange={handleFieldChange}
          hasUnsavedChanges={editing}
        />

        <BusinessInfoCard store={store} />

        <MetadataCard store={store} />
      </div>
    </div>
  );
}
