import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Star, Zap, Crown, Shield } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans | Au Pair Connect",
  description:
    "Choose the perfect plan for your cultural exchange journey. Transparent pricing for au pairs and host families with premium features.",
  keywords: [
    "pricing",
    "plans",
    "subscription",
    "au pair cost",
    "host family pricing",
  ],
};

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      description: "Perfect for getting started",
      price: "Free",
      period: "",
      icon: Star,
      features: [
        "Create profile",
        "Browse 10 matches per day",
        "Basic messaging",
        "Email support",
        "Mobile app access",
      ],
      limitations: [
        "Limited matches",
        "Basic search filters",
        "Standard support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      description: "Most popular choice",
      price: "$29",
      period: "/month",
      icon: Zap,
      features: [
        "Everything in Basic",
        "Unlimited matches",
        "Advanced search filters",
        "Priority messaging",
        "Video call scheduling",
        "Background check assistance",
        "24/7 phone support",
        "Profile boost feature",
      ],
      limitations: [],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Premium Plus",
      description: "For serious seekers",
      price: "$49",
      period: "/month",
      icon: Crown,
      features: [
        "Everything in Premium",
        "Dedicated account manager",
        "Express verification",
        "Custom matching service",
        "Contract review assistance",
        "Visa support guidance",
        "Travel planning help",
        "Premium profile badge",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "Is there really a free plan?",
      answer:
        "Yes! Our Basic plan is completely free and allows you to create a profile, browse matches, and send messages. It's a great way to get started and see if our platform is right for you.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Absolutely. All our paid plans can be cancelled at any time. There are no long-term contracts or cancellation fees.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our encrypted payment system.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, we'll provide a full refund within the first 30 days.",
    },
    {
      question: "What's included in the background check?",
      answer:
        "Our background checks include criminal history verification, reference checks, and identity verification. Premium and Premium Plus members receive assistance with the process.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-primary-950 dark:via-background dark:to-blue-950 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Simple, Transparent
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {" "}
                Pricing
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Choose the plan that fits your needs. Start free and upgrade when
              you're ready for more features.
            </p>
            <div className="inline-flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4 mr-2" />
              30-day money-back guarantee on all paid plans
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <Card
                  key={index}
                  className={`relative shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                    plan.popular
                      ? "ring-2 ring-primary border-primary scale-105"
                      : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                        plan.popular
                          ? "bg-gradient-to-br from-primary to-blue-600"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 sm:w-8 sm:h-8 ${
                          plan.popular
                            ? "text-white"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base mb-4">
                      {plan.description}
                    </CardDescription>
                    <div className="text-center">
                      <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                        {plan.period}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start space-x-3"
                        >
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      asChild
                      className={`w-full h-10 sm:h-12 text-sm sm:text-base ${
                        plan.popular
                          ? "bg-gradient-to-r from-primary to-blue-600 hover:from-primary-600 hover:to-blue-700"
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      <Link href="/auth/register">{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-primary-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Compare Plans
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See what's included in each plan to find the perfect fit for your
              needs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 sm:p-6 font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    Features
                  </th>
                  <th className="text-center p-4 sm:p-6 font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    Basic
                  </th>
                  <th className="text-center p-4 sm:p-6 font-semibold text-primary text-sm sm:text-base">
                    Premium
                  </th>
                  <th className="text-center p-4 sm:p-6 font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    Premium Plus
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Profile Creation",
                    basic: true,
                    premium: true,
                    plus: true,
                  },
                  {
                    feature: "Daily Matches",
                    basic: "10",
                    premium: "Unlimited",
                    plus: "Unlimited",
                  },
                  {
                    feature: "Advanced Filters",
                    basic: false,
                    premium: true,
                    plus: true,
                  },
                  {
                    feature: "Video Calls",
                    basic: false,
                    premium: true,
                    plus: true,
                  },
                  {
                    feature: "Background Check Help",
                    basic: false,
                    premium: true,
                    plus: true,
                  },
                  {
                    feature: "24/7 Support",
                    basic: false,
                    premium: true,
                    plus: true,
                  },
                  {
                    feature: "Dedicated Manager",
                    basic: false,
                    premium: false,
                    plus: true,
                  },
                  {
                    feature: "Visa Assistance",
                    basic: false,
                    premium: false,
                    plus: true,
                  },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  >
                    <td className="p-4 sm:p-6 text-gray-900 dark:text-white text-sm sm:text-base">
                      {row.feature}
                    </td>
                    <td className="text-center p-4 sm:p-6 text-sm sm:text-base">
                      {typeof row.basic === "boolean" ? (
                        row.basic ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        <span className="text-gray-600 dark:text-gray-300">
                          {row.basic}
                        </span>
                      )}
                    </td>
                    <td className="text-center p-4 sm:p-6 text-sm sm:text-base">
                      {typeof row.premium === "boolean" ? (
                        row.premium ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        <span className="text-primary font-semibold">
                          {row.premium}
                        </span>
                      )}
                    </td>
                    <td className="text-center p-4 sm:p-6 text-sm sm:text-base">
                      {typeof row.plus === "boolean" ? (
                        row.plus ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        <span className="text-gray-600 dark:text-gray-300">
                          {row.plus}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have questions about our pricing? Here are some common questions
              and answers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary to-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of families and au pairs who trust our platform for
            their cultural exchange journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold"
            >
              <Link href="/auth/register">Start Free Trial</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-primary px-6 py-3 sm:px-8 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold"
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
