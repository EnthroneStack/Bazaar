import { motion } from "framer-motion";
import {
  Loader2,
  Clock,
  Mail,
  Home,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PendingStoreUIProps {
  applicationId: string;
  submittedAt: string;
  onNavigateHome?: () => void;
  onNavigateShop?: () => void;
}

export default function PendingStoreUI({
  onNavigateHome,
  onNavigateShop,
  applicationId,
  submittedAt,
}: PendingStoreUIProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 mb-6 relative">
              <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
              <div className="absolute inset-0 rounded-full border-2 border-amber-200 animate-pulse"></div>
            </div>
            <Badge
              variant="outline"
              className="mb-4 px-4 py-1.5 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50"
            >
              <Clock className="w-4 h-4 mr-2" />
              Under Review
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Store Application Submitted!
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your store application is currently being reviewed by our team.
              We'll notify you once the review is complete.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Main Status Card */}
            <Card className="border-amber-200 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <ShieldCheck className="w-6 h-6 text-amber-600" />
                  Application Status
                </CardTitle>
                <CardDescription>
                  Real-time updates on your application progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">
                      Review Progress
                    </span>
                    <span className="text-amber-600 font-semibold">
                      Step 2 of 3
                    </span>
                  </div>
                  <Progress
                    value={66}
                    className="h-2 bg-amber-100 [&>div]:bg-amber-600"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-600"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Application Received
                      </p>
                      <p className="text-sm text-gray-500">
                        Your application has been submitted successfully
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-amber-600 animate-spin" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Under Review</p>
                      <p className="text-sm text-gray-500">
                        Our team is reviewing your application
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Final Decision
                      </p>
                      <p className="text-sm text-gray-500">
                        You'll receive notification of the decision
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline & Next Steps */}
            <div className="space-y-8">
              <Card className="border-gray-200 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-800">
                    What to Expect Next
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">
                        Email Notification
                      </h4>
                      <p className="text-sm text-gray-600">
                        You'll receive an email with the decision. Please check
                        your spam folder if you don't see it.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">
                        Processing Time
                      </h4>
                      <p className="text-sm text-gray-600">
                        Typical review time is 24-48 hours. Complex applications
                        may take longer.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact & Support */}
              <Card className="border-gray-200 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-800">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    If you have questions about your application, contact our
                    support team.
                  </p>
                  <div className="space-y-2">
                    <a
                      href="mailto:support@bazaar.com"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Mail className="w-4 h-4" />
                      support@bazaar.com
                    </a>
                    <p className="text-sm text-gray-500">
                      Response time: Within 24 hours
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={onNavigateHome}
                  className="flex-1 border-gray-300 hover:bg-gray-50 h-12"
                  size="lg"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Go to Home
                </Button>
                <Button
                  variant="outline"
                  onClick={onNavigateShop}
                  className="flex-1 border-gray-300 hover:bg-gray-50 h-12"
                  size="lg"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Browse Shop
                </Button>
              </div>
              <p className="text-center text-sm text-gray-500">
                You can continue shopping while we review your application
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Application ID:{" "}
              <span className="font-medium">#{applicationId}</span> • Submitted
              on{" "}
              {new Date(submittedAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
