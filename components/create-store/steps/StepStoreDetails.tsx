import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, CameraIcon, Loader2 } from "lucide-react";

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
  isGeneratingSlug?: boolean;
}

const StepStoreDetails = ({
  formData,
  errors,
  onChange,
  previewLogo,
  handleFileUpload,
  onUsernameChange,
  isGeneratingSlug = false,
}: StepStoreDetailsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="storeName"
            className="text-gray-700 text-sm sm:text-base"
          >
            Store Name *
          </Label>
          <Input
            id="storeName"
            name="storeName"
            value={formData.storeName}
            onChange={onChange}
            placeholder="Tech Innovations Inc."
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
              errors.storeName ? "border-red-300" : "border-gray-300"
            } focus:ring focus:ring-primary focus:border-transparent transition`}
          />
          {errors.storeName && (
            <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              {errors.storeName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm sm:text-base">
            Store Username *
          </Label>
          <div className="relative">
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={(e) => onUsernameChange(e.target.value)}
              placeholder="zola-fashion"
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                errors.username ? "border-red-300" : "border-gray-300"
              } focus:ring focus:ring-primary focus:border-transparent transition`}
            />
            {isGeneratingSlug && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
              </div>
            )}
          </div>
          {errors.username && (
            <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              {errors.username}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Only letters, numbers, and hyphens allowed
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm sm:text-base">Store Slug</Label>
          <div className="relative">
            <Input
              value={formData.slug}
              disabled
              className="text-sm sm:text-base pr-10"
            />
            {isGeneratingSlug && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
              </div>
            )}
          </div>
          <p className="text-xs text-primary mt-1 break-words">
            Your store will be accessible at: https://bazaar.com/
            {formData.slug || "your-store"}
          </p>
          {formData.slug && !isGeneratingSlug && (
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              ✓ Unique slug generated
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 text-sm sm:text-base">
            Store Logo
          </Label>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="relative self-start">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                {previewLogo ? (
                  <Image
                    src={previewLogo}
                    alt="Logo preview"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <CameraIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                )}
              </div>

              <label className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:opacity-90 transition">
                <CameraIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
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

      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-gray-700 text-sm sm:text-base"
          >
            Store Description *
          </Label>
          <Textarea
            id="description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={onChange}
            placeholder="Describe your business..."
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
              errors.description ? "border-red-300" : "border-gray-300"
            } focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none min-h-[120px]`}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formData.description.length}/500</span>
            {errors.description && (
              <span className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
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
