"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import slugify from "slugify";
import StepIndicator from "@/components/StepIndicator";
import StoreHeader from "@/components/create-store/StoreHeader";
import StepStoreDetails from "@/components/create-store/steps/StepStoreDetails";
import StepBusinessInfo from "@/components/create-store/steps/StepBusinessInfo";
import StepLocation from "@/components/create-store/steps/StepLocation";
import StepReview from "@/components/create-store/steps/StepReview";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

interface StoreFormData {
  storeName: string;
  username: string;
  slug: string;
  businessEmail: string;
  phoneNumber: string;
  businessType: "INDIVIDUAL" | "COMPANY" | "PARTNERSHIP";
  businessRegistrationNumber?: string;
  taxId?: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  logo: File | null;
  coverImage: File | null;
  acceptTerms: boolean;
  marketingOptIn: boolean;
}

interface FormErrors {
  [key: string]: string;
}

type BusinessType = "INDIVIDUAL" | "COMPANY" | "PARTNERSHIP";

const STEP_LABELS = [
  "Store Details",
  "Business Info",
  "Location",
  "Review & Submit",
];

export default function CreateStorePage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [previewCover, setPreviewCover] = useState<string | null>(null);

  const [formData, setFormData] = useState<StoreFormData>({
    storeName: "",
    username: "",
    slug: "",
    businessEmail: "",
    phoneNumber: "",
    businessType: "INDIVIDUAL",
    businessRegistrationNumber: "",
    taxId: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },

    logo: null,
    coverImage: null,
    acceptTerms: false,
    marketingOptIn: false,
  });

  /* ----------------------------- VALIDATION ----------------------------- */

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: FormErrors = {};

    if (stepNumber === 1) {
      if (!formData.storeName.trim())
        newErrors.storeName = "Store name is required";

      if (!formData.username.trim())
        newErrors.username = "Store username is required";

      if (!formData.description.trim())
        newErrors.description = "Description is required";
    }

    if (stepNumber === 2) {
      if (!formData.businessEmail)
        newErrors.businessEmail = "Business email is required";

      if (!formData.phoneNumber)
        newErrors.phoneNumber = "Phone number is required";

      if (
        formData.businessType === "COMPANY" &&
        !formData.businessRegistrationNumber
      ) {
        newErrors.businessRegistrationNumber =
          "Registration number required for companies";
      }
    }

    if (stepNumber === 3) {
      if (!formData.address.street) newErrors.street = "Street is required";
      if (!formData.address.city) newErrors.city = "City is required";
      if (!formData.address.state) newErrors.state = "State is required";
      if (!formData.address.postalCode)
        newErrors.postalCode = "Postal code is required";
      if (!formData.address.country) newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ----------------------------- HANDLERS ----------------------------- */

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.replace("address.", "");
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUsernameChange = async (value: string) => {
    setFormData((prev) => ({
      ...prev,
      username: value,
    }));

    if (!value) {
      setFormData((prev) => ({ ...prev, slug: "" }));
      return;
    }

    const res = await fetch(`/api/store/slug?username=${value}`);
    const data = await res.json();

    setFormData((prev) => ({
      ...prev,
      slug: data.slug,
    }));
  };

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    type: "logo" | "cover"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "logo") {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, logo: "Please upload an image file" }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, logo: "Logo must be less than 2MB" }));
        return;
      }
      setFormData((prev) => ({ ...prev, logo: file }));
      setPreviewLogo(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, coverImage: file }));
      setPreviewCover(URL.createObjectURL(file));
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ----------------------------- SUBMIT ----------------------------- */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateStep(step)) return;

    if (!formData.acceptTerms) {
      setErrors({ acceptTerms: "You must accept the terms" });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 1500));
      router.push("/dashboard?store=created");
    } catch {
      setErrors({ submit: "Failed to create store" });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ----------------------------- RENDER ----------------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <StoreHeader />
        <StepIndicator step={step} />
        <h2 className="text-center text-2xl font-semibold mb-8 text-gray-800">
          Step {step}: {STEP_LABELS[step - 1]}
        </h2>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {step === 1 && (
              <StepStoreDetails
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
                onUsernameChange={handleUsernameChange}
                previewLogo={previewLogo}
                handleFileUpload={handleFileUpload}
              />
            )}

            {step === 2 && (
              <StepBusinessInfo
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
                onBusinessTypeChange={(value: BusinessType) =>
                  setFormData((p) => ({ ...p, businessType: value }))
                }
                handleFileUpload={handleFileUpload}
                previewCover={previewCover}
              />
            )}

            {step === 3 && (
              <StepLocation
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
                onCountryChange={(value) =>
                  setFormData((p) => ({
                    ...p,
                    address: { ...p.address, country: value },
                  }))
                }
                onCheckboxChange={(checked) =>
                  setFormData((p) => ({ ...p, marketingOptIn: checked }))
                }
              />
            )}

            {step === 4 && (
              <>
                <StepReview formData={formData} />

                <div className="mt-6 flex items-start gap-3">
                  <Checkbox
                    checked={formData.acceptTerms}
                    onCheckedChange={(v) =>
                      setFormData((p) => ({
                        ...p,
                        acceptTerms: !!v,
                      }))
                    }
                  />
                  <div>
                    <p className="text-sm">
                      I agree to the Terms of Service and Privacy Policy
                    </p>
                    {errors.acceptTerms && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.acceptTerms}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {errors.submit && (
              <p className="mt-6 text-sm text-destructive flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.submit}
              </p>
            )}

            <div className="flex justify-between mt-10 pt-6 border-t border-gray-300">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  type="button"
                  className="border-gray-300 text-gray-700"
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <Button onClick={nextStep} type="button" className="text-white">
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Create Store
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </motion.div>
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Need help? Contact our seller support team at info@bazaar.com</p>
          <p className="mt-2">Average approval time: 24-48 hours</p>
        </div>
      </div>
    </div>
  );
}
