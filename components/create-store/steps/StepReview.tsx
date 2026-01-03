import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Store,
  Mail,
  Phone,
  MapPin,
  FileText,
  Globe,
  Building,
  IdCard,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  Info,
  ImageOff,
} from "lucide-react";
import Image from "next/image";

interface Props {
  storeInfo: any;
  errors?: Record<string, string>;
}

const StepReview = ({ storeInfo, errors = {} }: Props) => {
  const formatBusinessType = (type: string) => {
    const types: Record<string, string> = {
      INDIVIDUAL: "Individual",
      COMPANY: "Company",
      PARTNERSHIP: "Partnership",
    };
    return types[type] || type;
  };

  return (
    <div className="space-y-8">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-white border border-blue-200 flex items-center justify-center shadow-sm">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Store Application Review
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Please verify all information before submitting your store
                application.
              </p>
            </div>
            <Badge
              variant="outline"
              className="bg-white border-blue-200 text-blue-700"
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Step 4 of 4
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Store Information Card */}
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Store className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">
                  Store Information
                </h4>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Store Name
                  </p>
                  <p className="font-medium text-gray-900">
                    {storeInfo.storeName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Store URL
                  </p>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <p className="font-medium text-blue-600">
                      bazaar.com/{storeInfo.slug}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      Preview
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Description
                  </p>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">
                    {storeInfo.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {storeInfo.description.length}/500 characters
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information Card */}
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">
                  Contact Information
                </h4>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Business Email
                    </p>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                      <p className="font-medium text-gray-900 text-xs break-all">
                        {storeInfo.businessEmail}
                      </p>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Phone Number
                    </p>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                      <p className="font-medium text-gray-900 text-xs">
                        {storeInfo.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Details Card */}
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">
                  Business Details
                </h4>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Business Type
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        storeInfo.businessType === "COMPANY"
                          ? "default"
                          : "outline"
                      }
                      className={
                        storeInfo.businessType === "COMPANY"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : storeInfo.businessType === "PARTNERSHIP"
                          ? "bg-purple-100 text-purple-800 border-purple-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                      }
                    >
                      {formatBusinessType(storeInfo.businessType)}
                    </Badge>
                  </div>
                </div>

                {storeInfo.businessType === "COMPANY" &&
                  storeInfo.businessRegistrationNumber && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Registration Number
                      </p>
                      <div className="flex items-center gap-2">
                        <IdCard className="w-4 h-4 text-gray-400" />
                        <p className="font-medium text-gray-900">
                          {storeInfo.businessRegistrationNumber}
                        </p>
                      </div>
                    </div>
                  )}

                {storeInfo.taxId && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Tax ID
                    </p>
                    <div className="flex items-center gap-2">
                      <IdCard className="w-4 h-4 text-gray-400" />
                      <p className="font-medium text-gray-900">
                        {storeInfo.taxId}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Location Card */}
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Store Location</h4>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Complete Address
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-900">
                      {storeInfo.address.street}
                    </p>
                    <p className="text-gray-700">
                      {storeInfo.address.city}, {storeInfo.address.state}{" "}
                      {storeInfo.address.postalCode}
                    </p>
                    <p className="text-gray-700">{storeInfo.address.country}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Shipping Information
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      This address will be used for shipping labels, returns,
                      and customer support.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Store Media Card */}
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Store Media</h4>
              </div>

              <div className="space-y-6">
                {/* Logo Section */}
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Store Logo
                  </p>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 rounded-lg border-2 border-gray-300 overflow-hidden bg-white flex items-center justify-center shadow-sm">
                      {storeInfo.logo ? (
                        <Image
                          src={URL.createObjectURL(storeInfo.logo)}
                          alt="Logo preview"
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      ) : (
                        <Store className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Store Logo
                      </p>
                      <p className="text-xs text-gray-500">
                        {storeInfo.logo ? "Uploaded ✓" : "Not uploaded"} •
                        Recommended: 400×400px, max 2MB
                      </p>
                    </div>
                    {storeInfo.logo && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Uploaded ✓
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Cover Image Section */}
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Store Cover Image
                  </p>
                  <div className="space-y-3">
                    {storeInfo.coverImage ? (
                      <>
                        <div className="relative h-32 rounded-lg border-2 border-gray-300 overflow-hidden bg-gray-100">
                          <Image
                            src={URL.createObjectURL(storeInfo.coverImage)}
                            alt="Cover preview"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">
                            Recommended: 1920×600px, max 5MB
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            Uploaded ✓
                          </Badge>
                        </div>
                      </>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                        <div className="space-y-2">
                          <div className="mx-auto w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <ImageOff className="w-6 h-6 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">
                              No cover image uploaded
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Optional • Recommended: 1920×600px, max 5MB
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <Info className="w-4 h-4 text-amber-600 mt-0.5" />
                  <p className="text-xs text-amber-700">
                    These images will be displayed on your store's public
                    profile and product pages. You can update them later in your
                    store settings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Card */}
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Preferences</h4>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Marketing Updates
                    </p>
                    <p className="text-xs text-gray-500">
                      Receive marketplace tips and promotions
                    </p>
                  </div>
                  <Badge
                    variant={storeInfo.marketingOptIn ? "default" : "outline"}
                    className={
                      storeInfo.marketingOptIn
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : ""
                    }
                  >
                    {storeInfo.marketingOptIn
                      ? "Subscribed ✓"
                      : "Not subscribed"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="border border-blue-200 bg-blue-50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">
                    What happens next?
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mt-1.5"></span>
                      Your store application will be reviewed by our team
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mt-1.5"></span>
                      Average approval time: 24-48 hours
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mt-1.5"></span>
                      You'll receive an email notification once approved
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mt-1.5"></span>
                      Store media can be updated anytime in settings
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Error Display */}
      {errors.submit && (
        <Card className="border border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700 font-medium">Submission Error</p>
            </div>
            <p className="text-red-600 text-sm mt-1">{errors.submit}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StepReview;
