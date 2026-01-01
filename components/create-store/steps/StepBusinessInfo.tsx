import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { Camera } from "lucide-react";

interface Props {
  formData: any;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBusinessTypeChange: (
    value: "INDIVIDUAL" | "COMPANY" | "PARTNERSHIP"
  ) => void;
  previewCover: string | null;
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover"
  ) => void;
}

const StepBusinessInfo = ({
  formData,
  errors,
  onChange,
  onBusinessTypeChange,
  previewCover,
  handleFileUpload,
}: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 text-gray-700">
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2">
          <Label className="text-sm sm:text-base">Business Email *</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <Input
              name="businessEmail"
              value={formData.businessEmail}
              onChange={onChange}
              placeholder="contact@yourbusiness.com"
              className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-r-lg border text-sm sm:text-base ${
                errors.businessEmail ? "border-red-300" : "border-gray-300"
              } focus:ring-2 focus:ring-primary focus:border-transparent transition`}
            />
          </div>
          {errors.businessEmail && (
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              {errors.businessEmail}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm sm:text-base">Phone Number *</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <Input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onChange}
              placeholder="+1 (555) 123-4567"
              className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-r-lg border text-sm sm:text-base ${
                errors.phoneNumber ? "border-red-300" : "border-gray-300"
              } focus:ring-2 focus:ring-primary focus:border-transparent transition`}
            />
          </div>
          {errors.phoneNumber && (
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              {errors.phoneNumber}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-sm sm:text-base">Business Type *</Label>

          <RadioGroup
            value={formData.businessType}
            onValueChange={onBusinessTypeChange}
            className="space-y-2 sm:space-y-3"
          >
            {[
              { id: "individual", label: "Individual" },
              { id: "company", label: "Company" },
              { id: "partnership", label: "Partnership" },
            ].map((type) => (
              <Label
                key={type.id}
                htmlFor={type.id}
                className={`
                  flex items-center gap-3 p-3 sm:p-4 rounded-lg border cursor-pointer transition text-sm sm:text-base
                  ${
                    formData.businessType === type.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary"
                  }
                `}
              >
                <RadioGroupItem
                  value={type.id}
                  id={type.id}
                  className="mt-0.5"
                />
                <span className="font-medium">{type.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2">
          <Label className="text-sm sm:text-base">
            Business Registration Number
            {formData.businessType === "company" && " *"}
          </Label>
          <Input
            name="businessRegistrationNumber"
            value={formData.businessRegistrationNumber}
            onChange={onChange}
            placeholder="Enter registration number if applicable"
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
              errors.businessRegistrationNumber
                ? "border-red-300"
                : "border-gray-300"
            } focus:ring-2 focus:ring-primary focus:border-transparent transition`}
          />
          {errors.businessRegistrationNumber && (
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              {errors.businessRegistrationNumber}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm sm:text-base">Tax ID (Optional)</Label>
          <Input
            name="taxId"
            value={formData.taxId}
            onChange={onChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm sm:text-base"
            placeholder="VAT, GST, EIN, etc."
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm sm:text-base">
            Store Cover Image (Optional)
          </Label>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 text-center hover:border-primary transition cursor-pointer">
            <label className="cursor-pointer block">
              <div className="space-y-2 sm:space-y-3">
                <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center">
                  <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Click to upload cover image
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Recommended: 1920×600px, max 5MB
                  </p>
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "cover")}
                className="hidden"
              />
            </label>
          </div>

          {previewCover && (
            <div className="mt-4 relative h-28 sm:h-32 rounded-lg overflow-hidden border">
              <Image
                src={previewCover}
                alt="Cover preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepBusinessInfo;
