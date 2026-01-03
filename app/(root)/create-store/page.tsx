"use client";

import { useState, FormEvent, ChangeEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StepIndicator from "@/components/create-store/StepIndicator";
import StoreHeader from "@/components/create-store/StoreHeader";
import StepStoreDetails from "@/components/create-store/steps/StepStoreDetails";
import StepBusinessInfo from "@/components/create-store/steps/StepBusinessInfo";
import StepLocation from "@/components/create-store/steps/StepLocation";
import StepReview from "@/components/create-store/steps/StepReview";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";
import axios from "axios";
import {
  BusinessType,
  FormErrors,
  STEP_LABELS,
  StorestoreInfo,
} from "@/components/create-store/type";

export default function CreateStorePage() {
  const { user } = useUser();
  const router = useRouter();
  const { getToken } = useAuth();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [previewCover, setPreviewCover] = useState<string | null>(null);
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);

  const [storeInfo, setStoreInfo] = useState<StorestoreInfo>({
    storeName: "",
    description: "",
    username: "",
    businessEmail: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    businessType: "INDIVIDUAL",
    businessRegistrationNumber: "",
    taxId: "",
    slug: "",
    logo: null,
    coverImage: null,
    acceptTerms: false,
    marketingOptIn: false,
  });

  /* ----------------------------- SLUG (DEBOUNCED) ----------------------------- */

  const debouncedUsername = useDebounce(storeInfo.username, 800);

  const lastRequestId = useRef(0);

  useEffect(() => {
    if (!debouncedUsername.trim()) {
      setStoreInfo((p) => ({ ...p, slug: "" }));
      return;
    }

    const controller = new AbortController();
    const requestId = ++lastRequestId.current;

    const generateSlug = async () => {
      setIsGeneratingSlug(true);

      try {
        const res = await fetch(
          `/api/store/slug?username=${encodeURIComponent(debouncedUsername)}`,
          { signal: controller.signal }
        );

        const data = await res.json();

        if (requestId !== lastRequestId.current) return;

        setStoreInfo((p) => ({
          ...p,
          slug: data.slug,
        }));
      } catch (err: any) {
        if (err.name === "AbortError") return;

        const fallback = debouncedUsername
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");

        setStoreInfo((p) => ({
          ...p,
          slug: fallback || `store-${Date.now()}`,
        }));
      } finally {
        if (requestId === lastRequestId.current) {
          setIsGeneratingSlug(false);
        }
      }
    };

    generateSlug();

    return () => {
      controller.abort();
    };
  }, [debouncedUsername]);

  /* ----------------------------- VALIDATION ----------------------------- */

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: FormErrors = {};

    if (stepNumber === 1) {
      if (!storeInfo.storeName.trim())
        newErrors.storeName = "Store name is required";

      if (!storeInfo.username.trim())
        newErrors.username = "Store username is required";

      if (!storeInfo.description.trim())
        newErrors.description = "Description is required";
    }

    if (stepNumber === 2) {
      if (!storeInfo.businessEmail)
        newErrors.businessEmail = "Business email is required";

      if (!storeInfo.phoneNumber)
        newErrors.phoneNumber = "Phone number is required";

      if (
        storeInfo.businessType === "COMPANY" &&
        !storeInfo.businessRegistrationNumber
      ) {
        newErrors.businessRegistrationNumber =
          "Registration number required for companies";
      }
    }

    if (stepNumber === 3) {
      if (!storeInfo.address.street) newErrors.street = "Street is required";
      if (!storeInfo.address.city) newErrors.city = "City is required";
      if (!storeInfo.address.state) newErrors.state = "State is required";
      if (!storeInfo.address.postalCode)
        newErrors.postalCode = "Postal code is required";
      if (!storeInfo.address.country) newErrors.country = "Country is required";
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
      setStoreInfo((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
      return;
    }

    setStoreInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUsernameChange = (value: string) => {
    setStoreInfo((p) => ({ ...p, username: value }));
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
        setErrors((prev) => ({ ...prev, logo: "Max 2MB" }));
        return;
      }
      setStoreInfo((prev) => ({ ...prev, logo: file }));
      setPreviewLogo(URL.createObjectURL(file));
    } else {
      setStoreInfo((prev) => ({ ...prev, coverImage: file }));
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

  const buildFormData = (data: StorestoreInfo) => {
    const formData = new FormData();

    formData.append("storeName", data.storeName);
    formData.append("username", data.username);
    formData.append("description", data.description);
    formData.append("businessEmail", data.businessEmail);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("businessType", data.businessType);
    formData.append("address", JSON.stringify(data.address));

    if (data.businessRegistrationNumber) {
      formData.append(
        "businessRegistrationNumber",
        data.businessRegistrationNumber
      );
    }

    if (data.taxId) {
      formData.append("taxId", data.taxId);
    }

    if (data.logo) {
      formData.append("logo", data.logo);
    }

    if (data.coverImage) {
      formData.append("coverImage", data.coverImage);
    }

    formData.append("acceptTerms", String(data.acceptTerms));
    formData.append("marketingOptIn", String(data.marketingOptIn));

    return formData;
  };

  /* ----------------------------- SUBMIT ----------------------------- */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const submission = (async () => {
      if (!storeInfo.acceptTerms) {
        setErrors({ acceptTerms: "You must accept the terms" });
        throw new Error("You must accept the terms");
      }

      setIsSubmitting(true);

      try {
        const token = await getToken();
        const formData = buildFormData(storeInfo);

        const { data } = await axios.post("/api/store/create", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        return data;
      } catch (error: any) {
        setErrors({ submit: "Failed to create store" });

        throw new Error(
          error?.response?.data?.error?.message ||
            error?.response?.data?.error ||
            error.message ||
            "Failed to create store"
        );
      } finally {
        setIsSubmitting(false);
      }
    })();

    notifyStoreCreation(submission);
  };

  const notifyStoreCreation = (promise: Promise<any>) => {
    toast.promise(promise, {
      loading: "Submitting data...",
      success: (data) => {
        router.push("/admin");
        return data.message || "Store created successfully";
      },
      error: (err) => err.message,
    });
  };

  /* ----------------------------- RENDER ----------------------------- */

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 px-3 sm:py-12 sm:px-4 lg:px-8 overflow-x-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <StoreHeader />
        <StepIndicator step={step} />
        <h2 className="text-center text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-gray-800 px-2">
          Step {step}: {STEP_LABELS[step - 1]}
        </h2>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 w-full overflow-hidden"
          >
            {step === 1 && (
              <StepStoreDetails
                storeInfo={storeInfo}
                errors={errors}
                onChange={handleInputChange}
                onUsernameChange={handleUsernameChange}
                previewLogo={previewLogo}
                handleFileUpload={handleFileUpload}
                isGeneratingSlug={isGeneratingSlug}
              />
            )}

            {step === 2 && (
              <StepBusinessInfo
                storeInfo={storeInfo}
                errors={errors}
                onChange={handleInputChange}
                onBusinessTypeChange={(value: BusinessType) =>
                  setStoreInfo((p) => ({ ...p, businessType: value }))
                }
                handleFileUpload={handleFileUpload}
                previewCover={previewCover}
              />
            )}

            {step === 3 && (
              <StepLocation
                storeInfo={storeInfo}
                errors={errors}
                onChange={handleInputChange}
                onCountryChange={(value) =>
                  setStoreInfo((p) => ({
                    ...p,
                    address: { ...p.address, country: value },
                  }))
                }
                onCheckboxChange={(checked) =>
                  setStoreInfo((p) => ({ ...p, marketingOptIn: checked }))
                }
              />
            )}

            {step === 4 && (
              <>
                <StepReview storeInfo={storeInfo} />

                <div className="mt-6 flex items-start gap-3">
                  <Checkbox
                    checked={storeInfo.acceptTerms}
                    onCheckedChange={(v) =>
                      setStoreInfo((p) => ({
                        ...p,
                        acceptTerms: !!v,
                      }))
                    }
                    className="mt-1 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-700">
                      I agree to the Terms of Service and Privacy Policy
                    </p>
                    {errors.acceptTerms && (
                      <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {errors.acceptTerms}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {errors.submit && (
              <p className="mt-6 text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errors.submit}
              </p>
            )}

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 sm:mt-10 pt-6 border-t border-gray-300">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  type="button"
                  className="border-gray-300 text-gray-700 w-full sm:w-auto order-2 sm:order-1"
                >
                  Back
                </Button>
              ) : (
                <div className="order-2 sm:order-1" />
              )}

              {step < 4 ? (
                <Button
                  onClick={nextStep}
                  type="button"
                  className="w-full sm:w-auto order-1 sm:order-2 text-white"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto order-1 sm:order-2 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2 text-white" />
                      Create Store
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </motion.div>
        <div className="mt-8 sm:mt-12 text-center text-sm text-gray-500 px-2">
          <p>Need help? Contact our seller support team at info@bazaar.com</p>
          <p className="mt-2">Average approval time: 24-48 hours</p>
        </div>
      </div>
    </div>
  );
}
