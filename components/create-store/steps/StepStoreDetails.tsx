import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Globe, AlertCircle, CameraIcon } from "lucide-react";

interface StepStoreDetailsProps {
  formData: any;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<any>) => void;
  onUsernameChange: (value: string) => void;
  previewLogo: string | null;
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo"
  ) => void;
}

const StepStoreDetails = ({
  formData,
  errors,
  onChange,
  previewLogo,
  handleFileUpload,
  onUsernameChange,
}: StepStoreDetailsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="storeName" className="text-gray-700">
            Store Name *
          </Label>
          <Input
            id="storeName"
            name="storeName"
            value={formData.storeName}
            onChange={onChange}
            placeholder="Tech Innovations Inc."
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.storeName ? "border-red-300" : "border-gray-300"
            } focus:ring focus:ring-primary focus:border-transparent transition`}
          />
          {errors.storeName && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.storeName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Store Username *</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={(e) => onUsernameChange(e.target.value)}
            placeholder="zola-fashion"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.username ? "border-red-300" : "border-gray-300"
            } focus:ring focus:ring-primary focus:border-transparent transition`}
          />
          {errors.username && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.username}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Store Slug</Label>
          <Input value={formData.slug} disabled />
          <p className="text-xs text-muted-foreground">
            Your store will be accessible at: https://bazaar.com/
            {formData.slug || "your-store"}
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700">Store Logo</Label>

          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                {previewLogo ? (
                  <Image
                    src={previewLogo}
                    alt="Logo preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <CameraIcon className="w-8 h-8 text-gray-400" />
                )}
              </div>

              <label className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:opacity-90 transition">
                <CameraIcon className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "logo")}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-sm">
              <p className="text-gray-600">
                Upload a high-quality logo (PNG, JPG)
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Recommended: 400×400px, max 2MB
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-700">
            Store Description *
          </Label>
          <Textarea
            id="description"
            name="description"
            rows={6}
            value={formData.description}
            onChange={onChange}
            placeholder="Describe your business..."
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.description ? "border-red-300" : "border-gray-300"
            } focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none`}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formData.description.length}/500</span>
            {errors.description && (
              <span className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.description}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepStoreDetails;
