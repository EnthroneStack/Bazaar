import Banner from "@/components/home/Banner";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Banner />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
