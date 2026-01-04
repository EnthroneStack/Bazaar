// import StoreHeader from "@/components/store/StoreHeader";
// import StoreSidebar from "@/components/store/StoreSidebar";

// export default function StoreLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <StoreHeader />
//       <div className="flex">
//         <StoreSidebar />
//         <main className="flex-1 p-6 md:p-8">{children}</main>
//       </div>
//     </div>
//   );
// }

// app/store/layout.tsx
import StoreHeader from "@/components/store/StoreHeader";
import StoreSidebar from "@/components/store/StoreSidebar";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <StoreHeader />
      <div className="flex">
        <StoreSidebar />
        {/* RESPONSIVE CHANGE: Adjust padding for mobile */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
