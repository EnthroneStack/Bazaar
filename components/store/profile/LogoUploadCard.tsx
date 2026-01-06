"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LogoUploadCardProps {
  logo?: string;
  storeName: string;
  editing: boolean;
  onLogoPreview: (file: File | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  hasUnsavedLogo: boolean;
}

export function LogoUploadCard({
  logo,
  storeName,
  editing,
  onLogoPreview,
  fileInputRef,
  hasUnsavedLogo,
}: LogoUploadCardProps) {
  const initials = storeName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }

      onLogoPreview(file);
    }
  };

  const clearLogoPreview = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onLogoPreview(null);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="relative">
        <Avatar className="h-44 w-44 shadow-lg border-4 border-white">
          <AvatarImage src={logo} />
          <AvatarFallback className="text-4xl bg-primary/10 text-primary font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        {hasUnsavedLogo && (
          <Badge className="absolute -top-2 -right-2 bg-amber-500">
            Unsaved
          </Badge>
        )}
      </div>

      {editing && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-2">
            <Label htmlFor="logo-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <Upload className="h-4 w-4" />
                {hasUnsavedLogo ? "Change Logo" : "Upload new logo"}
              </div>
            </Label>

            {hasUnsavedLogo && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearLogoPreview}
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <Input
            id="logo-upload"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <p className="text-xs text-muted-foreground">
            PNG, JPG, or WebP • Max 2MB
          </p>

          {hasUnsavedLogo && (
            <p className="text-xs text-amber-600">
              Logo changes will be saved when you click "Save Changes"
            </p>
          )}
        </div>
      )}
    </div>
  );
}
