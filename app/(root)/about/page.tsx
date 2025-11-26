"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Truck,
  Shield,
  Headphones,
  Award,
  Users,
  Globe,
  ArrowRight,
  CheckCircle2,
  Target,
  Eye,
  Rocket,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { assets } from "@/assets/assets";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  const stats = [
    { number: "10M+", label: "Happy Customers" },
    { number: "100+", label: "Countries Served" },
    { number: "50K+", label: "Brand Partners" },
    { number: "24/7", label: "Customer Support" },
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Security",
      description:
        "Your data and transactions are protected with enterprise-grade security",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Customer First",
      description:
        "We're here for you 24/7 with dedicated support and easy returns",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Connecting buyers and sellers across the world seamlessly",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Assured",
      description: "Rigorous quality checks and verified seller program",
    },
  ];

  const milestones = [
    {
      year: "2018",
      event: "Bazaar Founded",
      description: "Started with a vision to revolutionize e-commerce",
    },
    {
      year: "2019",
      event: "1M Customers",
      description: "Reached our first million happy customers",
    },
    {
      year: "2020",
      event: "Global Expansion",
      description: "Launched in 50+ countries worldwide",
    },
    {
      year: "2022",
      event: "Mobile App Launch",
      description: "Award-winning mobile shopping experience",
    },
    {
      year: "2023",
      event: "AI Integration",
      description: "Implemented advanced AI for personalized shopping",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Revolutionizing <span className="text-primary">E-commerce</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Bazaar is more than just a marketplace. We're building the
                future of commerce by connecting millions of buyers and sellers
                worldwide with cutting-edge technology.
              </p>
              <div className="flex gap-4">
                <Button size="lg">
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Join Our Team
                  <Users className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <Image
                src={assets.hero_product_img1}
                alt="Bazaar Team"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our Purpose & Promise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving innovation in e-commerce while staying true to our core
              values
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Vision Card */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-100">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mr-4">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900">
                    Our Vision
                  </h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  To create a world where commerce is borderless, accessible,
                  and empowering for everyone. We envision a future where
                  anyone, anywhere can easily discover, connect, and transact
                  with confidence and joy.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Global commerce without boundaries
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      AI-powered personalized experiences
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Sustainable and ethical commerce
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mission Card */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-100">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900">
                    Our Mission
                  </h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  To build the most trusted and innovative commerce platform
                  that empowers businesses of all sizes to thrive and enables
                  customers to discover amazing products with unparalleled
                  convenience and security.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Rocket className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Empower entrepreneurs worldwide
                    </span>
                  </div>
                  <div className="flex items-center">
                    <HeartHandshake className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Build trust through transparency
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Create exceptional customer experiences
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Core Purpose */}
          <div className="mt-16 text-center">
            <Card className="border-0 shadow-lg bg-slate-900 text-white max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  Our Core Purpose
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  To democratize commerce and create economic opportunities for
                  people everywhere through technology that's both powerful and
                  easy to use.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a startup dream to a global marketplace, discover the story
              behind Bazaar's success
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-12">
                <div className="flex-shrink-0 w-24 text-right pr-8">
                  <div className="font-bold text-slate-900 text-lg">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mt-2 relative">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping"></div>
                </div>
                <div className="ml-8 flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {milestone.event}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Bazaar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Join the Bazaar Family?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're a buyer looking for great deals or a seller wanting
            to reach millions, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-white">
              Start Shopping
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Become a Seller
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

// import React from "react";

// const page = () => {
//   return (
//     <section className="min-h-screen">
//       <p>About</p>
//     </section>
//   );
// };

// export default page;
