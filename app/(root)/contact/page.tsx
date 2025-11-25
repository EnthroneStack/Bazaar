"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
    orderNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "+234 (555) 123-4567",
      subtitle: "24/7 Customer Support",
      action: "Call Now",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "support@bazaar.com",
      subtitle: "We'll reply within 24 hours",
      action: "Send Email",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Start a conversation",
      subtitle: "Instant help available",
      action: "Chat Now",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      description: "123 Commerce Street, Minna, Niger State",
      subtitle: "Headquarters",
      action: "Get Directions",
    },
  ];

  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order from your account dashboard or using the tracking link sent to your email.",
    },
    {
      question: "What's your return policy?",
      answer:
        "We offer 30-day returns for most items. Some products may have different return policies.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary.",
    },
    {
      question: "How do I become a seller?",
      answer:
        "Visit our Seller Center to create an account and start selling on Bazaar.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your message has been received. Our team will get back to you within
            24 hours.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                email: "",
                subject: "",
                category: "",
                message: "",
                orderNumber: "",
              });
            }}
            className="bg-blue-600 hover:bg-primary-100"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're here to help! Reach out to us with any questions or
              concerns.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4 text-primary">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-900 font-semibold mb-1">
                    {method.description}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {method.subtitle}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Inquiry Type *
                      </label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="order">Order Support</SelectItem>
                          <SelectItem value="returns">
                            Returns & Refunds
                          </SelectItem>
                          <SelectItem value="technical">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="Brief subject line"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="orderNumber"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Order Number (if applicable)
                        </label>
                        <Input
                          id="orderNumber"
                          name="orderNumber"
                          value={formData.orderNumber}
                          onChange={handleChange}
                          placeholder="e.g., BAZ-123456"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Please describe your inquiry in detail..."
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    Support Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-semibold">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday - Sunday</span>
                      <span className="font-semibold">24/7</span>
                    </div>
                    <div className="pt-2 text-xs text-gray-500">
                      * Live chat and phone support available 24/7. Email
                      responses within 24 hours.
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-slate-900 mb-1">
                          {faq.question}
                        </h4>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="px-0 mt-4 text-primary">
                    View all FAQs →
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-slate-900 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">
                    Need Immediate Help?
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Our live chat support is available 24/7 for instant
                    assistance with your orders and inquiries.
                  </p>
                  <Button className="w-full text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Live Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
