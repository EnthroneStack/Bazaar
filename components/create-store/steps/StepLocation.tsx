import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, MapPinIcon } from "lucide-react";
import { getCountryOptions } from "@/lib/getCountries";

interface Props {
  storeInfo: any;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<any>) => void;
  onCheckboxChange: (checked: boolean) => void;
  onCountryChange: (value: string) => void;
}

const StepLocation = ({
  storeInfo,
  errors,
  onChange,
  onCheckboxChange,
  onCountryChange,
}: Props) => {
  const countryOptions = getCountryOptions();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 text-gray-700">
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2">
          <Label className="text-sm sm:text-base">Street Address *</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <Input
              name="address.street"
              value={storeInfo.address.street}
              onChange={onChange}
              placeholder="123 Main Street"
              className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-r-lg border text-sm sm:text-base ${
                errors.street ? "border-red-300" : "border-gray-300"
              } focus:ring-2 focus:ring-primary focus:border-transparent transition`}
            />
          </div>
          {errors.street && (
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              {errors.street}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm sm:text-base">City *</Label>
            <Input
              name="address.city"
              value={storeInfo.address.city}
              onChange={onChange}
              placeholder="New York"
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                errors.city ? "border-red-300" : "border-gray-300"
              } focus:ring-2 focus:ring-primary focus:border-transparent transition`}
            />
            {errors.city && (
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                {errors.city}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">State/Province *</Label>
            <Input
              name="address.state"
              value={storeInfo.address.state}
              onChange={onChange}
              placeholder="NY"
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                errors.state ? "border-red-300" : "border-gray-300"
              } focus:ring-2 focus:ring-primary focus:border-transparent transition`}
            />
            {errors.state && (
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                {errors.state}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Postal Code *</Label>
            <Input
              name="address.postalCode"
              value={storeInfo.address.postalCode}
              onChange={onChange}
              placeholder="10001"
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                errors.postalCode ? "border-red-300" : "border-gray-300"
              } focus:ring-2 focus:ring-primary focus:border-transparent transition`}
            />
            {errors.postalCode && (
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                {errors.postalCode}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Country *</Label>
            <Select
              value={storeInfo.address.country}
              onValueChange={onCountryChange}
            >
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="max-h-64 sm:max-h-72 bg-white border shadow-lg z-50">
                {countryOptions.map((country) => (
                  <SelectItem
                    key={country.code}
                    value={country.code}
                    className="text-sm sm:text-base"
                  >
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                {errors.country}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 p-3 sm:p-4 rounded-lg border border-gray-300 bg-gray-50">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={storeInfo.marketingOptIn}
              onCheckedChange={(v) => onCheckboxChange(!!v)}
              className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:text-white shrink-0"
            />

            <Label className="text-sm leading-tight">
              Receive marketplace updates and tips
            </Label>
          </div>
          <p className="text-xs text-gray-500">
            Get notified about new features, seller promotions, and best
            practices
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepLocation;
