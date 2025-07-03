import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Heart,
  MessageCircle,
  Calendar,
  CheckCircle,
  ArrowRight,
  Play,
  Shield,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | Au Pair Connect",
  description:
    "Learn how to find your perfect cultural exchange match with Au Pair Connect. Step-by-step guide to connecting au pairs and host families.",
  keywords: [
    "how it works",
    "au pair process",
    "cultural exchange",
    "host family matching",
  ],
};

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: "Create Your Profile",
      description:
        "Sign up and create a detailed profile with your preferences, experience, and what you're looking for.",
      details: [
        "Upload photos and videos",
        "Share your story and interests",
        "Set your preferences and requirements",
        "Complete background verification",
      ],
      icon: Users,
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
    },
    {
      number: 2,
      title: "Discover Perfect Matches",
      description:
        "Our smart algorithm finds compatible families and au pairs based on your criteria and preferences.",
      details: [
        "AI-powered matching system",
        "Filter by location, languages, and experience",
        "View compatibility scores",
        "Browse verified profiles",
      ],
      icon: Heart,
      image:
        "https://images.pexels.com/photos/2714626/pexels-photo-2714626.jpeg",
    },
    {
      number: 3,
      title: "Connect & Communicate",
      description:
        "Start conversations, schedule video calls, and get to know each other before making decisions.",
      details: [
        "Secure messaging platform",
        "Video call scheduling",
        "Share documents safely",
        "Get support from our team",
      ],
      icon: MessageCircle,
      image: "https://images.pexels.com/photos/755049/pexels-photo-755049.jpeg",
    },
    {
      number: 4,
      title: "Plan Your Journey",
      description:
        "Finalize arrangements, complete paperwork, and start your cultural exchange adventure.",
      details: [
        "Contract assistance",
        "Visa and legal support",
        "Travel planning help",
        "Ongoing support during stay",
      ],
      icon: Globe,
      image:
        "https://images.pexels.com/photos/7579306/pexels-photo-7579306.jpeg",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Profiles",
      description:
        "All users go through comprehensive background checks and verification processes.",
    },
    {
      icon: MessageCircle,
      title: "Secure Communication",
      description:
        "Built-in messaging and video calling tools to connect safely before meeting.",
    },
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description:
        "Integrated calendar system to manage interviews and important dates.",
    },
    {
      icon: CheckCircle,
      title: "24/7 Support",
      description:
        "Our dedicated team provides round-the-clock assistance throughout your journey.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-primary-950 dark:via-background dark:to-blue-950 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              How Au Pair Connect
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {" "}
                Works
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Your step-by-step guide to finding the perfect cultural exchange
              match. From profile creation to your new adventure, we're with you
              every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary-600 hover:to-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/auth/register" className="flex items-center">
                  Get Started Today
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold border-2 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Link href="#demo" className="flex items-center">
                  <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple Steps to Success
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our streamlined process makes it easy to find and connect with
              your perfect match.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="relative">
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={600}
                        height={400}
                        className="rounded-3xl shadow-2xl w-full h-64 sm:h-80 lg:h-96 object-cover"
                      />
                      <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                    }
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6">
                      {step.description}
                    </p>
                    <div className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-primary-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We provide all the tools and support you need for a successful
              cultural exchange experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of families and au pairs who have found their perfect
            match through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/auth/register?role=host">I'm a Host Family</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-primary px-6 py-3 sm:px-8 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold transition-all duration-300"
            >
              <Link href="/auth/register?role=aupair">I'm an Au Pair</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
