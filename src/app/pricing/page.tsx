"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Check,
  Crown,
  Star,
  Shield,
  Zap,
  Users,
  ArrowRight,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

type PricingRole = "families" | "aupairs";
type PlanType = "free" | "standard" | "premium" | "verified";

export default function PricingPage() {
  const [selectedRole, setSelectedRole] = useState<PricingRole>("families");
  const { user } = useAuthStore();

  const handleUpgrade = async (planType: PlanType) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upgrade`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
          body: JSON.stringify({
            role: selectedRole === "families" ? "host_family" : "au_pair",
            planType,
          }),
        },
      );

      if (response.ok) {
        // Handle successful upgrade
        console.log("Upgrade successful");
      }
    } catch (error) {
      console.error("Upgrade failed:", error);
    }
  };

  const familyPlans = [
    {
      type: "free" as PlanType,
      name: "Free Plan",
      price: "$0",
      period: "/week",
      description: "Perfect for getting started",
      features: [
        "View 10 unverified Au Pair profiles/week",
        "Basic profile creation",
        "Limited search functionality",
        "Email support",
      ],
      icon: Star,
      popular: false,
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
    },
    {
      type: "standard" as PlanType,
      name: "Standard Plan",
      price: "$8.99",
      period: "/week",
      description: "Great for active families",
      features: [
        "View up to 50 verified profiles/week",
        "Send/receive messages",
        "Save up to 30 profiles",
        "Advanced search filters",
        "Priority support",
      ],
      icon: Shield,
      popular: true,
      buttonText: "Upgrade Now",
      buttonVariant: "default" as const,
    },
    {
      type: "premium" as PlanType,
      name: "Premium Plan",
      price: "$14.99",
      period: "/week",
      description: "Complete family solution",
      features: [
        "View 100 verified profiles/week",
        "Unlimited messaging",
        "Save unlimited profiles",
        "Advanced filters",
        "Priority placement",
        "Profile Boost",
        "Early Access Matching",
        "Concierge Matchmaking Call",
      ],
      icon: Crown,
      popular: false,
      buttonText: "Go Premium",
      buttonVariant: "default" as const,
    },
  ];

  const auPairPlans = [
    {
      type: "free" as PlanType,
      name: "Free Plan",
      price: "$0",
      period: "/month",
      description: "Start your au pair journey",
      features: [
        "Build profile",
        "Get listed",
        "Appear in limited searches",
        "Basic messaging",
      ],
      icon: Star,
      popular: false,
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
    },
    {
      type: "verified" as PlanType,
      name: "Verified Plan",
      price: "$4.99",
      period: "/month",
      description: "Stand out to families",
      features: [
        "Verified badge",
        "Priority visibility",
        "Unlimited applications",
        "Save families",
        "Advanced messaging",
        "Profile optimization tips",
        "24/7 support",
      ],
      icon: Zap,
      popular: true,
      buttonText: "Get Verified",
      buttonVariant: "default" as const,
    },
  ];

  const currentPlans = selectedRole === "families" ? familyPlans : auPairPlans;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const roleToggleVariants = {
    initial: { x: selectedRole === "families" ? 0 : "100%" },
    animate: { x: selectedRole === "families" ? 0 : "100%" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Perfect Plan
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Transparent pricing designed for families and au pairs. No hidden
              fees, cancel anytime.
            </p>

            {/* Role Toggle */}
            <div className="relative bg-gray-100 rounded-full p-1 inline-flex mb-16">
              <motion.div
                className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm"
                style={{ width: "calc(50% - 4px)" }}
                variants={roleToggleVariants}
                initial="initial"
                animate="animate"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                onClick={() => setSelectedRole("families")}
                className={`relative z-10 px-6 py-3 rounded-full font-medium transition-colors flex items-center ${
                  selectedRole === "families"
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Host Families
              </button>
              <button
                onClick={() => setSelectedRole("aupairs")}
                className={`relative z-10 px-6 py-3 rounded-full font-medium transition-colors flex items-center ${
                  selectedRole === "aupairs"
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Star className="w-4 h-4 mr-2" />
                Au Pairs
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRole}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`grid gap-8 ${
                currentPlans.length === 2
                  ? "lg:grid-cols-2 max-w-4xl mx-auto"
                  : "lg:grid-cols-3"
              }`}
            >
              {currentPlans.map((plan, index) => {
                const Icon = plan.icon;
                return (
                  <motion.div
                    key={plan.type}
                    variants={cardVariants}
                    className="relative"
                  >
                    {plan.popular && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                      >
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </div>
                      </motion.div>
                    )}

                    <Card
                      className={`h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 ${
                        plan.popular
                          ? "ring-2 ring-blue-500 scale-105"
                          : "hover:scale-105"
                      }`}
                    >
                      <CardHeader className="text-center pb-6">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                            plan.popular
                              ? "bg-gradient-to-r from-blue-600 to-purple-600"
                              : "bg-gray-100"
                          }`}
                        >
                          <Icon
                            className={`w-8 h-8 ${
                              plan.popular ? "text-white" : "text-gray-600"
                            }`}
                          />
                        </motion.div>
                        <CardTitle className="text-2xl font-bold">
                          {plan.name}
                        </CardTitle>
                        <p className="text-gray-600">{plan.description}</p>
                        <div className="mt-4">
                          <span className="text-4xl font-bold text-gray-900">
                            {plan.price}
                          </span>
                          <span className="text-gray-600">{plan.period}</span>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <ul className="space-y-4 mb-8">
                          {plan.features.map((feature, featureIndex) => (
                            <motion.li
                              key={featureIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * featureIndex }}
                              className="flex items-start"
                            >
                              <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>

                        <Button
                          onClick={() => handleUpgrade(plan.type)}
                          variant={plan.buttonVariant}
                          className={`w-full h-12 text-base font-semibold ${
                            plan.popular
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                              : ""
                          }`}
                        >
                          {plan.buttonText}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>

                        {user && (
                          <p className="text-sm text-gray-500 text-center mt-3">
                            Current plan expires: Dec 31, 2024
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of families and au pairs who trust our platform for
              their cultural exchange journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure & Verified",
                description:
                  "All profiles undergo thorough verification for your safety and peace of mind.",
              },
              {
                icon: Zap,
                title: "Instant Matching",
                description:
                  "Our AI-powered algorithm finds perfect matches based on your preferences.",
              },
              {
                icon: Users,
                title: "24/7 Support",
                description:
                  "Round-the-clock customer support throughout your cultural exchange journey.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join our global community and discover the life-changing
              experience of cultural exchange.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Start Your Journey Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
