import AdminLayout from "@/components/admin/AdminLayout";
import React from "react";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Bazaar - Admin",
  description: "Bazaar - Admin",
};

const RootAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <SignedIn> */}
      <AdminLayout>{children}</AdminLayout>
      {/* </SignedIn> */}
      {/* <SignedOut>
        <div className="min-h-screen flex items-center justify-center">
          <SignIn fallbackRedirectUrl="/admin" routing="hash" />
        </div>
      </SignedOut> */}
    </>
  );
};

export default RootAdminLayout;
