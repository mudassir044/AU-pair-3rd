"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown, ChevronUp, Settings, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TechnicalFAQPage() {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "Click 'Forgot Password' on the login page, enter your email address, and check your inbox for a password reset link. If you don't see the email, check your spam folder. The link expires after 24 hours.",
    },
    {
      question: "Why can't I upload photos to my profile?",
      answer:
        "Ensure your images are in JPG, PNG, or GIF format and under 5MB each. Clear your browser cache and try again. If you're on mobile, try using a different browser or the desktop version.",
    },
    {
      question: "How do I change my account information?",
      answer:
        "Go to your profile settings and click 'Edit Profile'. You can update most information except your email address. For email changes, contact our support team for security verification.",
    },
    {
      question:
        "I'm not receiving notifications or messages. What should I do?",
      answer:
        "Check your notification settings in your profile, ensure our emails aren't going to spam, and verify your email address is correct. For mobile app notifications, check your device's notification settings.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "Contact our support team to request account deletion. For security reasons, we require verification before deleting accounts. Note that some information may be retained for legal compliance.",
    },
    {
      question: "Why is the website running slowly?",
      answer:
        "Clear your browser cache and cookies, try a different browser, or check your internet connection. If the issue persists, it may be temporary server maintenance - try again in a few minutes.",
    },
    {
      question: "I'm having trouble with video calls. What can I do?",
      answer:
        "Ensure your browser allows camera and microphone access, check your internet connection, and try refreshing the page. Chrome and Firefox work best for video calls. For mobile, try the desktop version.",
    },
    {
      question: "How do I report a problem or bug?",
      answer:
        "Use the 'Report Issue' button in your account menu, or contact support with details about what happened, which browser you're using, and any error messages you saw.",
    },
    {
      question: "Can I use the platform on my mobile device?",
      answer:
        "Yes! Our platform is mobile-friendly and works on all modern smartphones and tablets. For the best experience, use the latest version of Chrome, Safari, or Firefox on your mobile device.",
    },
    {
      question: "What browsers are supported?",
      answer:
        "We support the latest versions of Chrome, Firefox, Safari, and Edge. Internet Explorer is not supported. Make sure your browser is up to date for the best experience.",
    },
    {
      question: "How do I enable two-factor authentication?",
      answer:
        "Go to Security Settings in your profile and enable 2FA. You'll need an authenticator app like Google Authenticator or Authy. Follow the setup instructions to scan the QR code and verify your setup.",
    },
    {
      question: "I'm getting an error message. What does it mean?",
      answer:
        "Common errors include network timeouts, session expiration, or server maintenance. Try refreshing the page, logging out and back in, or clearing your browser cache. If the error persists, contact support with the exact error message.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-primary-950 dark:via-background dark:to-blue-950 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-6">
              <Link href="/contact" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Contact
              </Link>
            </Button>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Technical Support
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Get help with platform features, account issues, and technical
                problems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>

            {/* Still have questions? */}
            <Card className="mt-12">
              <CardContent className="text-center py-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Need more help?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our technical support team is available 24/7 to help resolve
                  any issues.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/contact">Contact Technical Support</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="mailto:tech@aupairconnect.com">
                      Email Tech Team
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="shadow-lg">
      <CardHeader
        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{question}</CardTitle>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-0">
          <p className="text-gray-600 dark:text-gray-300">{answer}</p>
        </CardContent>
      )}
    </Card>
  );
}
