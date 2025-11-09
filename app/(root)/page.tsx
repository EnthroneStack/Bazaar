"use client";

import BestSelling from "@/components/BestSelling";
import CategoriesMarquee from "@/components/CategoriesMarquee";
import Hero from "@/components/Hero";
import LatestProducts from "@/components/LatestProducts";
import Newsletter from "@/components/Newsletter";
import OurSpec from "@/components/OurSpec";

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoriesMarquee />
      <LatestProducts />
      <BestSelling />
      <OurSpec />
      <Newsletter />
    </div>
  );
};

export default Home;
