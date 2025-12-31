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
  formData: any;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<any>) => void;
  onCheckboxChange: (checked: boolean) => void;
  onCountryChange: (value: string) => void;
}

const StepLocation = ({
  formData,
  errors,
  onChange,
  onCheckboxChange,
  onCountryChange,
}: Props) => {
  const countryOptions = getCountryOptions();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-700">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Street Address *</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
              <MapPinIcon className="w-5 h-5" />
            </span>
            <Input
              name="address.street"
              value={formData.address.street}
              onChange={onChange}
              placeholder="123 Main Street"
              className={`flex-1 px-4 py-3 rounded-r-lg border ${
                errors.street ? "border-red-300" : "border-gray-300"
              } focus:ring-2 focus:ring-primary focus:border-transparent transition`}
            />
          </div>
          {errors.street && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.street}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>City *</Label>
            <Input
              name="address.city"
              value={formData.address.city}
              onChange={onChange}
              placeholder="New York"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.city ? "border-red-300" : "border-gray-300"
              } focus:ring-2 focus:ring-primary focus:border-transparent transition`}
            />
            {errors.city && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.city}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>State/Province *</Label>
            <Input
              name="address.state"
              value={formData.address.state}
              onChange={onChange}
              placeholder="NY"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.state ? "border-red-300" : "border-gray-300"
              } focus:ring-2 focus:ring-primary focus:border-transparent transition`}
            />
            {errors.state && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.state}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Postal Code *</Label>
            <Input
              name="address.postalCode"
              value={formData.address.postalCode}
              onChange={onChange}
              placeholder="10001"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.postalCode ? "border-red-300" : "border-gray-300"
              } focus:ring-2 focus:ring-primary focus:border-transparent transition`}
            />
            {errors.postalCode && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.postalCode}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Country *</Label>
            <Select
              value={formData.address.country}
              onValueChange={onCountryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="max-h-72 bg-white border shadow-lg z-50">
                {countryOptions.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.country}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4 rounded-lg border border-gray-300 bg-gray-50">
          <div className="flex items-start space-x-3 pt-4">
            <Checkbox
              checked={formData.marketingOptIn}
              onCheckedChange={(v) => onCheckboxChange(!!v)}
              className="data-[state=checked]:bg-primary data-[state=checked]:text-white"
            />

            <Label className="text-sm leading-tight">
              Receive marketplace updates and tips
            </Label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Get notified about new features, seller promotions, and best
            practices
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepLocation;
