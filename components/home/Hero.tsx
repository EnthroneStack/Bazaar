"use client";

import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  Truck,
} from "lucide-react";
import { slides } from "@/assets/assets";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const nextSlide = () => {
    setDirection("next");
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection("prev");
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative mx-auto max-w-7xl px-6 lg:px-12 py-10 overflow-hidden">
      <div className="relative">
        <div className="relative h-[700px] lg:h-[650px] overflow-hidden rounded-4xl">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.45,0,0.55,1)] ${
                  isActive
                    ? "opacity-100 translate-x-0 z-20"
                    : direction === "next"
                    ? "opacity-0 -translate-x-full z-10"
                    : "opacity-0 translate-x-full z-10"
                }`}
              >
                <div className={`absolute inset-0 ${slide.background} -z-20`} />
                <div className={`absolute inset-0 ${slide.pattern} -z-10`} />

                <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl" />
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center h-full p-8 lg:p-12 ${slide.layout}`}
                >
                  <div
                    className={`space-y-8 ${
                      slide.layout === "text-center"
                        ? "lg:col-span-2 text-center"
                        : ""
                    } ${slide.layout === "text-right" ? "lg:order-2" : ""}`}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/20">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-semibold text-gray-700">
                        {slide.badge}
                      </span>
                    </div>

                    <div className="space-y-6">
                      <h1 className="text-5xl lg:text-7xl font-black leading-tight text-gray-900">
                        {slide.title} <br />
                        <span className={slide.accentColor}>
                          {slide.highlight}
                        </span>
                      </h1>

                      <p className="text-gray-600 text-xl max-w-lg leading-relaxed">
                        {slide.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                      <Button
                        className={`px-10 py-4 text-white rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 ${slide.buttonColor}`}
                      >
                        Shop Collection
                      </Button>
                      <button className="flex items-center gap-3 text-gray-700 font-semibold hover:gap-4 transition-all duration-300 group">
                        Learn More
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    <div className="flex gap-8 pt-6">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-600">
                          Free Shipping
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-gray-600">
                          2-Year Warranty
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`relative ${
                      slide.layout === "text-center" ? "lg:col-span-2" : ""
                    } ${slide.layout === "text-right" ? "lg:order-1" : ""}`}
                  >
                    <div
                      className={`grid gap-4 ${
                        index === 0
                          ? "grid-cols-2"
                          : index === 1
                          ? "grid-cols-3"
                          : index === 2
                          ? "grid-cols-1 lg:grid-cols-2"
                          : "grid-cols-2 lg:grid-cols-3"
                      }`}
                    >
                      {slide.images.map((src, imageIndex) => (
                        <div
                          key={imageIndex}
                          className={`relative overflow-hidden rounded-2xl shadow-2xl group ${
                            index === 1 && imageIndex === 0
                              ? "col-span-2 row-span-2"
                              : index === 3 && imageIndex === 0
                              ? "col-span-2"
                              : ""
                          }`}
                        >
                          <Image
                            src={src}
                            alt={`Product ${imageIndex + 1}`}
                            width={400}
                            height={400}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <Button className="w-full bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white">
                              Quick View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full blur-lg" />
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-30 border border-white/20"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-30 border border-white/20"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        <div className="flex justify-center gap-4 mt-12">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? `bg-white/90 backdrop-blur-sm shadow-lg ${slide.accentColor} font-semibold`
                  : "bg-white/50 text-gray-400 hover:bg-white/70"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? "bg-current" : "bg-gray-400"
                }`}
              />
              <span className="text-sm">0{index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mt-16 text-gray-600 text-sm">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
          <Shield className="w-4 h-4" />
          <span>Trusted by 500+ fashion stores</span>
        </div>
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
          <Truck className="w-4 h-4" />
          <span>Free global shipping</span>
        </div>
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>4.9/5 Customer Rating</span>
        </div>
      </div>
    </section>
  );
}
