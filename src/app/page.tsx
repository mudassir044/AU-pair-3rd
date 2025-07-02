import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Heart,
  Users,
  Globe,
  Star,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const testimonials = [
    {
      id: 1,
      name: "Maria Rodriguez",
      role: "Au Pair from Spain",
      avatar:
        "https://images.pexels.com/photos/2714626/pexels-photo-2714626.jpeg",
      content:
        "Finding the perfect host family through Au Pair Connect was life-changing. The platform made it so easy to connect and communicate before my arrival. I felt safe and supported throughout the entire process.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jennifer Smith",
      role: "Host Family from USA",
      avatar:
        "https://images.pexels.com/photos/755049/pexels-photo-755049.jpeg",
      content:
        "We found an amazing au pair who became part of our family. The screening process and communication tools gave us confidence in our choice. Our children love their new cultural sister!",
      rating: 5,
    },
    {
      id: 3,
      name: "Anna Mueller",
      role: "Au Pair from Germany",
      avatar:
        "https://images.pexels.com/photos/15817434/pexels-photo-15817434.jpeg",
      content:
        "The experience exceeded all my expectations. Not only did I find a wonderful family, but I also made lifelong friends and improved my English significantly. Highly recommended!",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified & Safe",
      description:
        "All families and au pairs go through thorough background checks and verification processes.",
    },
    {
      icon: Heart,
      title: "Perfect Matches",
      description:
        "Our AI-powered matching algorithm finds the most compatible families and au pairs based on preferences.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to help you throughout your cultural exchange journey.",
    },
    {
      icon: Globe,
      title: "Global Network",
      description:
        "Connect with families and au pairs from over 50 countries around the world.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Successful Matches" },
    { number: "50+", label: "Countries" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "95%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-primary-950 dark:via-background dark:to-blue-950">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-600/10 dark:from-primary/5 dark:to-blue-600/5"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="hidden sm:inline">
                  Trusted by 10,000+ families worldwide
                </span>
                <span className="sm:hidden">10,000+ families trust us</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
                Find Your Perfect
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  Cultural Exchange
                </span>
                <span className="hidden sm:inline">
                  <br />
                </span>{" "}
                Match
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                Connect with verified host families and experienced au pairs for
                meaningful cultural exchanges. Safe, trusted, and life-changing
                experiences await.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary-600 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 btn-touch"
                >
                  <Link
                    href="/auth/register"
                    className="flex items-center justify-center"
                  >
                    <span className="hidden sm:inline">Get Started Today</span>
                    <span className="sm:hidden">Get Started</span>
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold border-2 hover:bg-primary hover:text-white transition-all duration-300 btn-touch"
                >
                  <Link
                    href="#how-it-works"
                    className="flex items-center justify-center"
                  >
                    <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Watch Demo</span>
                    <span className="sm:hidden">Demo</span>
                  </Link>
                </Button>
              </div>
              <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:flex sm:items-center sm:justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative z-10">
                <Image
                  src="https://images.pexels.com/photos/755049/pexels-photo-755049.jpeg"
                  alt="Happy family with au pair"
                  width={600}
                  height={400}
                  className="rounded-2xl sm:rounded-3xl shadow-2xl w-full h-64 sm:h-80 lg:h-96 object-cover"
                  priority
                />
              </div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-full blur-2xl sm:blur-3xl"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl sm:blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Au Pair Connect?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We provide the safest, most reliable platform for cultural
              exchanges with comprehensive support every step of the way.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-primary-950"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Getting started is simple. Follow these three easy steps to begin
              your cultural exchange journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary to-blue-600 transform -translate-y-1/2"></div>

            <Card className="text-center relative bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  1
                </div>
                <CardTitle className="text-2xl">Create Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                  Share your story, preferences, and what you're looking for in
                  a match. Upload photos and create a compelling profile.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center relative bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  2
                </div>
                <CardTitle className="text-2xl">Find Perfect Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                  Our advanced algorithm suggests the most compatible matches
                  based on your preferences, location, and lifestyle.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center relative bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  3
                </div>
                <CardTitle className="text-2xl">Start Your Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                  Connect, video chat, and plan your cultural exchange. We
                  provide ongoing support throughout your experience.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of families and au pairs who have found their
              perfect match through our platform.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join our global community and discover the life-changing experience
            of cultural exchange.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/auth/register?role=host">I'm a Host Family</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-primary px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300"
            >
              <Link href="/auth/register?role=aupair">I'm an Au Pair</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold">
                  Au Pair Connect
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md text-sm sm:text-base">
                Connecting cultures, families, and experiences worldwide.
                Building bridges through meaningful cultural exchanges.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Twitter
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">
                For Au Pairs
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/auth/register?role=aupair"
                    className="hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Find Families
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="hover:text-white transition-colors text-sm sm:text-base"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">
                For Families
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/auth/register?role=host"
                    className="hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Find Au Pairs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="hover:text-white transition-colors text-sm sm:text-base"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center sm:text-left text-sm sm:text-base">
              &copy; 2025 Au Pair Connect. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
