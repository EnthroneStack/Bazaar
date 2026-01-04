// components/store/settings/StoreSettings.tsx
"use client";

import { useState } from "react";
import {
  Store,
  Globe,
  CreditCard,
  Truck,
  Mail,
  Bell,
  Shield,
  Users,
  Upload,
  Save,
  Image,
} from "lucide-react";

export default function StoreSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    storeName: "My Awesome Store",
    storeEmail: "contact@myawesomestore.com",
    storePhone: "+1 (555) 123-4567",
    storeDescription: "Premium products for everyday life",

    // Store Details
    currency: "USD",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    language: "en",

    // Payment Settings
    acceptedPayments: {
      creditCard: true,
      paypal: true,
      applePay: true,
      googlePay: false,
      bankTransfer: true,
    },
    paymentTerms: "net30",

    // Shipping Settings
    shippingMethods: [
      { name: "Standard Shipping", price: 4.99, days: "5-7" },
      { name: "Express Shipping", price: 9.99, days: "2-3" },
      { name: "Overnight", price: 24.99, days: "1" },
    ],
    freeShippingThreshold: 50,

    // Notification Settings
    notifications: {
      newOrder: true,
      lowStock: true,
      customerReview: true,
      newsletter: false,
      marketing: false,
    },

    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    ipWhitelist: ["192.168.1.1", "10.0.0.1"],

    // Team Settings
    teamMembers: [
      {
        name: "John Doe",
        email: "john@store.com",
        role: "Owner",
        status: "active",
      },
      {
        name: "Jane Smith",
        email: "jane@store.com",
        role: "Manager",
        status: "active",
      },
      {
        name: "Bob Wilson",
        email: "bob@store.com",
        role: "Staff",
        status: "pending",
      },
    ],

    // Store Logo
    storeLogo: "/api/placeholder/150/150",
  });

  const tabs = [
    { id: "general", label: "General", icon: Store },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "team", label: "Team", icon: Users },
    { id: "appearance", label: "Appearance", icon: Image },
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as object),
        [field]: value,
      },
    }));
  };

  const handleDirectChange = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would make an API call
    console.log("Saving settings:", settings);
    alert("Settings saved successfully!");
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Store Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Name *
            </label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => handleDirectChange("storeName", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Email *
            </label>
            <input
              type="email"
              value={settings.storeEmail}
              onChange={(e) => handleDirectChange("storeEmail", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Phone
            </label>
            <input
              type="tel"
              value={settings.storePhone}
              onChange={(e) => handleDirectChange("storePhone", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Description
            </label>
            <textarea
              value={settings.storeDescription}
              onChange={(e) =>
                handleDirectChange("storeDescription", e.target.value)
              }
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Regional Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency *
            </label>
            <select
              value={settings.currency}
              onChange={(e) => handleDirectChange("currency", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="GBP">British Pound (GBP)</option>
              <option value="CAD">Canadian Dollar (CAD)</option>
              <option value="AUD">Australian Dollar (AUD)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone *
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => handleDirectChange("timezone", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Format *
            </label>
            <select
              value={settings.dateFormat}
              onChange={(e) => handleDirectChange("dateFormat", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language *
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleDirectChange("language", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Accepted Payment Methods
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(settings.acceptedPayments).map(
            ([method, enabled]) => (
              <div
                key={method}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900 capitalize">
                      {method.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {enabled ? "Enabled" : "Disabled"}
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) =>
                      handleInputChange(
                        "acceptedPayments",
                        method,
                        e.target.checked
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Payment Terms
        </h3>
        <div className="max-w-md">
          <select
            value={settings.paymentTerms}
            onChange={(e) => handleDirectChange("paymentTerms", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="net15">Net 15 Days</option>
            <option value="net30">Net 30 Days</option>
            <option value="net60">Net 60 Days</option>
            <option value="dueOnReceipt">Due on Receipt</option>
            <option value="prepayment">Prepayment Required</option>
          </select>
          <p className="text-sm text-gray-500 mt-2">
            These terms apply to all invoices and purchase orders.
          </p>
        </div>
      </div>
    </div>
  );

  const renderShippingSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Shipping Methods
        </h3>
        <div className="space-y-4">
          {settings.shippingMethods.map((method, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900">{method.name}</div>
                <div className="text-sm text-gray-500">
                  Delivery: {method.days} business days
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">
                  ${method.price.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">per order</div>
              </div>
              <div className="ml-4 flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 hover:border-gray-400 flex items-center justify-center">
            <Truck className="h-5 w-5 mr-2" />
            Add New Shipping Method
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Free Shipping
        </h3>
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Order Amount for Free Shipping
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={settings.freeShippingThreshold}
              onChange={(e) =>
                handleDirectChange(
                  "freeShippingThreshold",
                  parseInt(e.target.value)
                )
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Orders above this amount qualify for free shipping.
          </p>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Email Notifications
        </h3>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([type, enabled]) => (
            <div
              key={type}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900 capitalize">
                    {type.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className="text-sm text-gray-500">
                    Receive email notifications for {type}
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) =>
                    handleInputChange("notifications", type, e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Notification Frequency
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="font-medium text-gray-900">Real-time</div>
            <p className="text-sm text-gray-500 mt-1">
              Immediate notifications
            </p>
            <div className="mt-4">
              <input
                type="radio"
                name="frequency"
                className="text-blue-600"
                defaultChecked
              />
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="font-medium text-gray-900">Daily Digest</div>
            <p className="text-sm text-gray-500 mt-1">Once per day summary</p>
            <div className="mt-4">
              <input type="radio" name="frequency" className="text-blue-600" />
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="font-medium text-gray-900">Weekly Summary</div>
            <p className="text-sm text-gray-500 mt-1">Weekly report email</p>
            <div className="mt-4">
              <input type="radio" name="frequency" className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Account Security
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">
                  Two-Factor Authentication
                </div>
                <div className="text-sm text-gray-500">
                  Add an extra layer of security to your account
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) =>
                  handleDirectChange("twoFactorAuth", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">
              Session Timeout
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={settings.sessionTimeout}
                onChange={(e) =>
                  handleDirectChange("sessionTimeout", parseInt(e.target.value))
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="0">Never (Not Recommended)</option>
              </select>
              <p className="text-sm text-gray-500">
                Automatically log out after inactivity
              </p>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">IP Whitelist</div>
            <div className="space-y-2">
              {settings.ipWhitelist.map((ip, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-mono text-gray-700">{ip}</span>
                  <button className="text-red-600 hover:text-red-800 text-sm">
                    Remove
                  </button>
                </div>
              ))}
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                + Add IP Address
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Restrict access to specific IP addresses for enhanced security
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeamSettings = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Invite Team Member
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {settings.teamMembers.map((member, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {member.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{member.email}</td>
                  <td className="px-6 py-4">
                    <select
                      value={member.role}
                      onChange={(e) => {
                        const updated = [...settings.teamMembers];
                        updated[index].role = e.target.value;
                        handleDirectChange("teamMembers", updated);
                      }}
                      className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                    >
                      <option value="Owner">Owner</option>
                      <option value="Manager">Manager</option>
                      <option value="Staff">Staff</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        member.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {member.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Store Branding
        </h3>
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <div className="h-32 w-32 bg-gray-100 rounded-lg flex items-center justify-center">
              <Image className="h-12 w-12 text-gray-400" />
            </div>
            <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm flex items-center">
              <Upload className="h-4 w-4 mr-1" />
              Upload New Logo
            </button>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-600 border border-gray-300"></div>
                  <input
                    type="text"
                    value="#3B82F6"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-gray-800 border border-gray-300"></div>
                  <input
                    type="text"
                    value="#1F2937"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              These colors will be used across your storefront, emails, and
              marketing materials.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Theme Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-2 border-blue-500 rounded-lg p-4">
            <div className="h-32 bg-gray-800 rounded-lg mb-3"></div>
            <div className="font-medium text-gray-900">Dark Theme</div>
            <p className="text-sm text-gray-500 mt-1">
              Professional dark interface
            </p>
            <div className="mt-4">
              <input
                type="radio"
                name="theme"
                className="text-blue-600"
                defaultChecked
              />
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="h-32 bg-white rounded-lg mb-3 border"></div>
            <div className="font-medium text-gray-900">Light Theme</div>
            <p className="text-sm text-gray-500 mt-1">Clean light interface</p>
            <div className="mt-4">
              <input type="radio" name="theme" className="text-blue-600" />
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-3"></div>
            <div className="font-medium text-gray-900">Custom Theme</div>
            <p className="text-sm text-gray-500 mt-1">Fully customizable</p>
            <div className="mt-4">
              <input type="radio" name="theme" className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "payments":
        return renderPaymentSettings();
      case "shipping":
        return renderShippingSettings();
      case "notifications":
        return renderNotificationSettings();
      case "security":
        return renderSecuritySettings();
      case "team":
        return renderTeamSettings();
      case "appearance":
        return renderAppearanceSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderActiveTab()}

        {/* Save Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-end">
            <button
              onClick={handleSaveSettings}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
