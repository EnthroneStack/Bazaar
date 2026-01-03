export interface StorestoreInfo {
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

export interface FormErrors {
  [key: string]: string;
}

export type BusinessType = "INDIVIDUAL" | "COMPANY" | "PARTNERSHIP";

export const STEP_LABELS = [
  "Store Details",
  "Business Info",
  "Location",
  "Review & Submit",
];
