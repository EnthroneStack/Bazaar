"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface LogoUploadCardProps {
  logo?: string;
  storeName: string;
  editing: boolean;
  onLogoUpload: (file: File) => void;
}

export function LogoUploadCard({
  logo,
  storeName,
  editing,
  onLogoUpload,
}: LogoUploadCardProps) {
  const initials = storeName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
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
            <AvatarImage src={logo} />
            <AvatarFallback className="text-3xl bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          {editing && (
            <div className="flex flex-col items-center gap-2">
              <Label htmlFor="logo-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none">
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
                    if (file) onLogoUpload(file);
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
  );
}
