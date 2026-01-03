"use client";

import BestSelling from "@/components/shop/BestSelling";
import CategoriesMarquee from "@/components/home/CategoriesMarquee";
import LatestProducts from "@/components/shop/LatestProducts";
import Newsletter from "@/components/home/Newsletter";
import OurSpec from "@/components/home/OurSpec";
import Hero from "@/components/home/Hero";

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
