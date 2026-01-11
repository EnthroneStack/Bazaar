"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Rocket,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Zap,
  Store,
  Package,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ApprovedStoreUIProps {
  onNavigateDashboard: () => void;
  applicationId: string;
  submittedAt: string;
}

export default function ApprovedStoreUI({
  onNavigateDashboard,
  applicationId,
  submittedAt,
}: ApprovedStoreUIProps) {
  useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 mb-6 relative shadow-lg"
            >
              <CheckCircle className="w-12 h-12 text-emerald-600" />
              <div className="absolute inset-0 rounded-full border-4 border-emerald-200"></div>
              <div className="absolute -inset-4 rounded-full border-2 border-emerald-100 animate-ping opacity-30"></div>
            </motion.div>

            <Badge
              variant="outline"
              className="mb-4 px-4 py-1.5 bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Successfully Approved
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Welcome to Bazaar Marketplace!
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your store has been successfully verified and is now ready to
              launch. Let's start your e-commerce journey!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border-emerald-200 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  Store Ready for Launch
                </CardTitle>
                <CardDescription>
                  Complete setup checklist to start selling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">
                      Store Setup Progress
                    </span>
                    <span className="text-emerald-600 font-semibold">
                      20% Complete
                    </span>
                  </div>
                  <Progress
                    value={20}
                    className="h-2 bg-emerald-100 [&>div]:bg-emerald-600"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Store Approval Complete
                      </p>
                      <p className="text-sm text-gray-500">
                        Your store has been verified and approved
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Store className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Store Dashboard Access
                      </p>
                      <p className="text-sm text-gray-500">
                        Set up your store settings and preferences
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <Package className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Add First Product
                      </p>
                      <p className="text-sm text-gray-500">
                        Upload products to start selling immediately
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Customize Storefront
                      </p>
                      <p className="text-sm text-gray-500">
                        Design your store to match your brand
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="border-emerald-200 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-800">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">Ready</p>
                      <p className="text-sm text-gray-500">
                        Your store is live and active
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        Instant
                      </p>
                      <p className="text-sm text-gray-500">
                        Start selling immediately
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-800">
                    Launch Your Store
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={onNavigateDashboard}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 h-12 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    size="lg"
                  >
                    <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Enter Store Dashboard
                  </Button>

                  <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 p-3 rounded-lg">
                    <Rocket className="w-4 h-4" />
                    <span>
                      Complete setup in just a few minutes and start selling
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-800">
                    Quick Start Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      Set up your store settings
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      Upload your first product
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      Customize your storefront
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      Set up payment methods
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="mt-8 border-emerald-100 shadow-lg">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Premium Features
                    </h4>
                    <p className="text-sm text-gray-600">
                      Access advanced analytics, marketing tools, and customer
                      insights
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Growth Tools
                    </h4>
                    <p className="text-sm text-gray-600">
                      Built-in marketing features to help you grow your business
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Secure Platform
                    </h4>
                    <p className="text-sm text-gray-600">
                      Enterprise-grade security with reliable payment processing
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="max-w-md mx-auto space-y-4">
              <Button
                onClick={onNavigateDashboard}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 h-14 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
                size="lg"
              >
                <span className="flex items-center justify-center gap-3">
                  <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                  Launch Store Dashboard
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
              <p className="text-center text-sm text-gray-500">
                Access your store dashboard to customize settings and start
                selling
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Application ID:{" "}
              <span className="font-medium">#{applicationId}</span> • Approved
              on{" "}
              {new Date(submittedAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
