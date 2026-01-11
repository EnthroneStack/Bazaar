"use client";

import { CheckCircle, Rocket, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ApprovedStoreUIProps {
  onNavigateDashboard: () => void;
  redirectDelay?: number;
}

export default function ApprovedStoreUI({
  onNavigateDashboard,
  redirectDelay = 2000,
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

    const timeout = setTimeout(() => {
      onNavigateDashboard();
    }, redirectDelay);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onNavigateDashboard, redirectDelay]);

  const handleManualRedirect = () => {
    onNavigateDashboard();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-200">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-green-400 to-teal-500" />

          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-100 rounded-full opacity-50" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-green-100 rounded-full opacity-50" />

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-30" />
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-4 border-4 border-emerald-300 border-t-transparent rounded-full opacity-30"
                  />
                </div>
              </motion.div>

              {/* Header */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    Congratulations!
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text">
                  Store Approved!
                </h1>

                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                  Your store has been successfully verified and is now ready to
                  launch. Get ready to start your e-commerce journey!
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-md mb-8"
              >
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-700">
                        🎯
                      </div>
                      <div className="text-sm text-emerald-600 mt-2">
                        Ready to Launch
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-700">
                        ⚡
                      </div>
                      <div className="text-sm text-emerald-600 mt-2">
                        Instant Setup
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-md"
              >
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Rocket className="w-5 h-5 text-emerald-600 animate-pulse" />
                    <span className="text-sm font-medium text-emerald-700">
                      Redirecting to your dashboard...
                    </span>
                  </div>

                  <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-500"
                    />
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={handleManualRedirect}
                >
                  <span className="flex items-center justify-center gap-2">
                    Enter Store Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>

                <p className="text-xs text-gray-500 mt-4">
                  You'll be redirected automatically in a few seconds
                </p>
              </motion.div>

              {/* Tips */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-8 border-t border-gray-100"
              >
                <p className="text-sm text-gray-500">
                  💡 <span className="font-medium text-gray-700">Pro Tip:</span>{" "}
                  Upload your first product to get started!
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating celebration elements */}
      <AnimatePresence>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
              x: Math.random() * 100 - 50,
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute text-2xl pointer-events-none"
            style={{
              left: `${20 + i * 30}%`,
            }}
          >
            {["🎉", "✨", "🚀"][i]}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
