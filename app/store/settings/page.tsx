// // app/store/settings/page.tsx

// import StoreSettings from "@/components/store/settings/StoreSettings";

// export default function SettingsPage() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
//         <p className="text-gray-600">
//           Configure your store preferences and details
//         </p>
//       </div>
//       <StoreSettings />
//     </div>
//   );
// }

// app/store/settings/page.tsx
import StoreSettings from "@/components/store/settings/StoreSettings";

export default function SettingsPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Store Settings
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Configure your store preferences and details
        </p>
      </div>
      <StoreSettings />
    </div>
  );
}
