import { motion } from "framer-motion";
import {
  XCircle,
  AlertTriangle,
  RefreshCw,
  Mail,
  FileText,
  Home,
  ShoppingBag,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RejectedStoreUIProps {
  reason: {
    primary: string;
    issues?: string[];
  } | null;
  onRetry: () => void;
  onNavigateHome?: () => void;
  onNavigateShop?: () => void;
  applicationId: string;
  submittedAt: string;
}

export default function RejectedStoreUI({
  reason,
  onRetry,
  onNavigateHome,
  onNavigateShop,
  applicationId,
  submittedAt,
}: RejectedStoreUIProps) {
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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-100 to-rose-100 mb-6 relative">
              <XCircle className="w-10 h-10 text-red-600" />
              <div className="absolute inset-0 rounded-full border-2 border-red-200"></div>
            </div>

            <Badge
              variant="outline"
              className="mb-4 px-4 py-1.5 bg-red-50 text-red-700 border-red-200 hover:bg-red-50"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Application Rejected
            </Badge>

            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Application Requires Review
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your store application couldn't be approved at this time. Please
              review the feedback below and resubmit.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Rejection Card */}
            <Card className="lg:col-span-2 border-red-200 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  Application Feedback
                </CardTitle>
                <CardDescription>
                  Detailed feedback from our review team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="reason" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="reason">Rejection Reason</TabsTrigger>
                    <TabsTrigger value="solutions">How to Fix</TabsTrigger>
                  </TabsList>

                  <TabsContent value="reason" className="space-y-4 pt-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="font-medium text-red-800 mb-2">
                            Primary Reason for Rejection
                          </h4>

                          <p className="text-red-700">
                            {reason?.primary ??
                              "Your application requires additional verification or documentation."}
                          </p>
                        </div>
                      </div>
                    </div>

                    {reason?.issues && reason.issues.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-800">
                          Issues Identified
                        </h4>

                        <ul className="space-y-2">
                          {reason.issues.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-sm text-gray-600"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="solutions" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">
                          Recommended Actions
                        </h4>
                        <ul className="space-y-2 text-green-700">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Review and update all business information
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Ensure all required documents are uploaded
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Verify business registration details
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Double-check contact information accuracy
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Quick Actions Sidebar */}
            <div className="space-y-8">
              <Card className="border-gray-200 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-800">Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={onRetry}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12"
                    size="lg"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Revise & Resubmit
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-gray-300 hover:bg-gray-50 h-12"
                    size="lg"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Download Application
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-800">
                    Need Assistance?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Support Team
                        </h4>
                        <a
                          href="mailto:support@bazaar.com"
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          support@bazaar.com
                        </a>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 pt-2">
                      Include your application ID in your email for faster
                      support.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Options */}
              <Card className="border-gray-200 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-800">Other Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="ghost"
                    onClick={onNavigateHome}
                    className="w-full justify-start h-11 text-gray-700 hover:bg-gray-100"
                  >
                    <Home className="w-4 h-4 mr-3" />
                    Return to Home
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={onNavigateShop}
                    className="w-full justify-start h-11 text-gray-700 hover:bg-gray-100"
                  >
                    <ShoppingBag className="w-4 h-4 mr-3" />
                    Browse Marketplace
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Important Notes */}
          <Card className="mt-8 border-amber-200 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    Important Notes
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>
                      • You can resubmit your application with corrections
                      immediately
                    </li>
                    <li>
                      • Review all information carefully before resubmitting
                    </li>
                    <li>
                      • New submissions will undergo the same review process
                    </li>
                    <li>
                      • Keep all supporting documents ready for verification
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Application ID:{" "}
              <span className="font-medium">#{applicationId}</span> • Rejected
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
