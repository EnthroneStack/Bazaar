"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  BuildingStorefrontIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ShieldCheckIcon,
  BellIcon,
  CreditCardIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ReceiptPercentIcon,
  LanguageIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

interface StoreSettings {
  name: string;
  username: string;
  description: string;
  email: string;
  contact: string;
  address: string;
  logo: string | null;
  favicon: string | null;
  themeColor: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  slug: string;
  subdomain: string | null;
  customDomain: string | null;
  status: string;
  isActive: boolean;
  categories: string[];
  settings: {
    currency: string;
    timezone: string;
    language: string;
    taxRate: number;
    emailNotifications: Record<string, boolean>;
  };
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [store, setStore] = useState<StoreSettings | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchStoreSettings();
  }, []);

  const fetchStoreSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/store/store");

      if (!response.ok) {
        throw new Error(`Failed to fetch store: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success || !data.store) {
        throw new Error("Invalid store response");
      }

      setStore(data.store);

      if (data.store.logo) {
        setLogoPreview(data.store.logo);
      }
    } catch (error) {
      console.error("Failed to fetch store settings:", error);

      // Fallback with default settings
      setStore({
        name: "",
        username: "",
        description: "",
        email: "",
        contact: "",
        address: "",
        logo: null,
        favicon: null,
        themeColor: null,
        metaTitle: null,
        metaDescription: null,
        slug: "",
        subdomain: null,
        customDomain: null,
        status: "pending",
        isActive: false,
        categories: [],
        settings: {
          currency: "USD",
          timezone: "UTC",
          language: "en",
          taxRate: 0.0,
          emailNotifications: {},
        },
      });

      setSaveMessage({
        type: "error",
        text: "Failed to load store settings. Using defaults.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSaveMessage({
        type: "error",
        text: "Please upload an image file (JPEG, PNG, etc.)",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setSaveMessage({
        type: "error",
        text: "Image size must be less than 5MB",
      });
      return;
    }

    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!store) return;

    setLoading(true);
    setSaveMessage(null);

    try {
      let response;

      if (logoFile) {
        // Use FormData for file upload
        const formData = new FormData();
        formData.append("name", store.name);
        formData.append("username", store.username);
        formData.append("description", store.description);
        formData.append("email", store.email);
        formData.append("contact", store.contact);
        formData.append("address", store.address);
        formData.append("logo", logoFile);
        formData.append("settings", JSON.stringify(store.settings));

        response = await fetch("/api/store", {
          method: "PUT",
          body: formData,
        });
      } else {
        // Use JSON for non-file updates
        response = await fetch("/api/store", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(store),
        });
      }

      const data = await response.json();

      if (data.success) {
        setSaveMessage({
          type: "success",
          text: data.message || "Settings saved successfully",
        });

        // Update store with response data
        if (data.data) {
          setStore((prev) => ({
            ...prev!,
            ...data.data,
            settings: data.data.settings || prev!.settings,
          }));
        }

        // Clear logo file after successful upload
        setLogoFile(null);
      } else {
        setSaveMessage({
          type: "error",
          text: data.error || "Failed to save settings",
        });
      }
    } catch (error) {
      console.error("Save failed:", error);
      setSaveMessage({
        type: "error",
        text: "Failed to save settings. Please try again.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setSaveMessage(null), 5000);
    }
  };

  const updateStoreField = (field: keyof StoreSettings, value: any) => {
    setStore((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const updateSettingsField = (
    field: keyof StoreSettings["settings"],
    value: any
  ) => {
    setStore((prev) =>
      prev
        ? {
            ...prev,
            settings: {
              ...prev.settings,
              [field]: value,
            },
          }
        : null
    );
  };

  const tabs = [
    { id: "general", name: "General", icon: BuildingStorefrontIcon },
    { id: "store-settings", name: "Store Settings", icon: Cog6ToothIcon },
    { id: "notifications", name: "Notifications", icon: BellIcon },
    { id: "payment", name: "Payment", icon: CreditCardIcon },
    { id: "security", name: "Security", icon: ShieldCheckIcon },
  ];

  const currencies = [
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "INR", label: "Indian Rupee (₹)" },
    { value: "JPY", label: "Japanese Yen (¥)" },
  ];

  const timezones = [
    { value: "UTC", label: "UTC" },
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "Europe/Paris", label: "Paris (CET)" },
    { value: "Asia/Kolkata", label: "India (IST)" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  ];

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "hi", label: "Hindi" },
    { value: "ja", label: "Japanese" },
  ];

  if (loading && !store) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="text-center py-12">
        <BuildingStorefrontIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No store found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          You need to create a store first.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Manage your store settings and preferences
        </p>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div
          className={`rounded-md p-4 ${
            saveMessage.type === "success" ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <div className="flex items-center">
            {saveMessage.type === "success" ? (
              <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
            ) : (
              <ExclamationCircleIcon className="h-5 w-5 text-red-400 mr-2" />
            )}
            <div
              className={`text-sm font-medium ${
                saveMessage.type === "success"
                  ? "text-green-800"
                  : "text-red-800"
              }`}
            >
              {saveMessage.text}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  <Icon
                    className={`h-5 w-5 inline mr-2 ${
                      activeTab === tab.id ? "text-primary" : "text-gray-400"
                    }`}
                  />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          {activeTab === "general" && (
            <div className="px-6 py-8 space-y-8">
              {/* Store Logo */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Store Logo
                    </h3>
                    <p className="text-sm text-gray-500">
                      Upload your store logo (Max 5MB, recommended: 512x512px)
                    </p>
                  </div>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <span className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      {store.logo ? "Change Logo" : "Upload Logo"}
                    </span>
                  </label>
                </div>
                <div className="mt-2">
                  <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                    {logoPreview ? (
                      <Image
                        src={logoPreview}
                        alt="Store logo"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    ) : (
                      <BuildingStorefrontIcon className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  {logoFile && (
                    <p className="mt-2 text-sm text-gray-500">
                      {logoFile.name} (
                      {(logoFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              </div>

              {/* Store Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Store Information
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Name *
                    </label>
                    <input
                      type="text"
                      value={store.name}
                      onChange={(e) => updateStoreField("name", e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <GlobeAltIcon className="h-4 w-4 inline mr-1" />
                      Store Username *
                    </label>
                    <input
                      type="text"
                      value={store.username}
                      onChange={(e) =>
                        updateStoreField("username", e.target.value)
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      required
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      marketplace.com/
                      {store.slug || store.username.toLowerCase()}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={store.description}
                      onChange={(e) =>
                        updateStoreField("description", e.target.value)
                      }
                      rows={4}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <EnvelopeIcon className="h-4 w-4 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={store.email}
                      onChange={(e) =>
                        updateStoreField("email", e.target.value)
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <PhoneIcon className="h-4 w-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={store.contact}
                      onChange={(e) =>
                        updateStoreField("contact", e.target.value)
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPinIcon className="h-4 w-4 inline mr-1" />
                      Store Address *
                    </label>
                    <textarea
                      value={store.address}
                      onChange={(e) =>
                        updateStoreField("address", e.target.value)
                      }
                      rows={3}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "store-settings" && (
            <div className="px-6 py-8 space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Store Configuration
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CurrencyDollarIcon className="h-4 w-4 inline mr-1" />
                      Currency
                    </label>
                    <select
                      value={store.settings.currency}
                      onChange={(e) =>
                        updateSettingsField("currency", e.target.value)
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      {currencies.map((currency) => (
                        <option key={currency.value} value={currency.value}>
                          {currency.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <ClockIcon className="h-4 w-4 inline mr-1" />
                      Timezone
                    </label>
                    <select
                      value={store.settings.timezone}
                      onChange={(e) =>
                        updateSettingsField("timezone", e.target.value)
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      {timezones.map((tz) => (
                        <option key={tz.value} value={tz.value}>
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <LanguageIcon className="h-4 w-4 inline mr-1" />
                      Language
                    </label>
                    <select
                      value={store.settings.language}
                      onChange={(e) =>
                        updateSettingsField("language", e.target.value)
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <ReceiptPercentIcon className="h-4 w-4 inline mr-1" />
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={store.settings.taxRate}
                      onChange={(e) =>
                        updateSettingsField(
                          "taxRate",
                          parseFloat(e.target.value)
                        )
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="px-6 py-8 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Email Notifications
                </h3>
                <p className="text-sm text-gray-500">
                  Configure what email notifications you receive
                </p>
              </div>
              {[
                {
                  id: "new-orders",
                  label: "New orders",
                  description: "Receive emails when new orders are placed",
                },
                {
                  id: "low-stock",
                  label: "Low stock alerts",
                  description: "Get notified when products are running low",
                },
                {
                  id: "customer-reviews",
                  label: "New reviews",
                  description: "Receive emails when customers leave reviews",
                },
                {
                  id: "store-updates",
                  label: "Store updates",
                  description:
                    "Get notified about platform updates and features",
                },
              ].map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {setting.label}
                    </p>
                    <p className="text-sm text-gray-500">
                      {setting.description}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={
                        store.settings.emailNotifications[setting.id] !== false
                      }
                      onChange={(e) => {
                        const newNotifications = {
                          ...store.settings.emailNotifications,
                          [setting.id]: e.target.checked,
                        };
                        updateSettingsField(
                          "emailNotifications",
                          newNotifications
                        );
                      }}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeTab === "payment" && (
            <div className="px-6 py-8 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Payment Settings
                </h3>
                <p className="text-sm text-gray-500">
                  Configure your payment methods and payout preferences
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Available Payment Methods
                </h4>
                <div className="space-y-4">
                  {[
                    { name: "Credit/Debit Cards", enabled: true },
                    { name: "PayPal", enabled: false },
                    { name: "Bank Transfer", enabled: true },
                    { name: "Cash on Delivery", enabled: true },
                  ].map((method, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-900">
                        {method.name}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={method.enabled}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="px-6 py-8 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Security Settings
                </h3>
                <p className="text-sm text-gray-500">
                  Manage your account security and access
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Two-Factor Authentication
                </h4>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Enable 2FA
                    </p>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-100">
                    Enable
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Active Sessions
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      device: "Chrome on Windows",
                      location: "New York, US",
                      time: "Now",
                    },
                    {
                      device: "Safari on iPhone",
                      location: "Los Angeles, US",
                      time: "2 hours ago",
                    },
                  ].map((session, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center">
                        <UserCircleIcon className="h-8 w-8 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {session.device}
                          </p>
                          <p className="text-xs text-gray-500">
                            {session.location} • {session.time}
                          </p>
                        </div>
                      </div>
                      {index === 0 ? (
                        <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                          Current
                        </span>
                      ) : (
                        <button className="text-sm text-red-600 hover:text-red-800">
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="px-6 py-4 bg-gray-50">
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
