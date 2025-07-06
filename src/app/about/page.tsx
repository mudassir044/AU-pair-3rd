import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Users, Globe, Shield, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Muhammad Mudassir",
      role: "CEO & Founder",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fc43a92b8265a4538b0f81284c0c6d60c%2Fd9aeeea2a4cc448fadf20b9e15cae63e?format=webp&width=800",
      bio: "Visionary entrepreneur passionate about connecting cultures and creating meaningful international experiences through technology.",
      linkedin: "https://www.linkedin.com/in/muhammad-mudassir-1036a51aa/",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to transform cultural exchange",
    },
    {
      year: "2021",
      title: "1,000 Matches",
      description:
        "Reached our first major milestone of successful connections",
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded to 25 countries with verified host families",
    },
    {
      year: "2023",
      title: "10,000+ Users",
      description: "Grew our community to over 10,000 active members",
    },
    {
      year: "2024",
      title: "AI Matching",
      description: "Launched AI-powered matching for better compatibility",
    },
    {
      year: "2025",
      title: "50+ Countries",
      description: "Operating in 50+ countries with 24/7 support",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Comprehensive background checks and verification processes ensure the safety of all community members.",
    },
    {
      icon: Heart,
      title: "Cultural Exchange",
      description:
        "We believe in the power of cultural exchange to create understanding and lifelong connections.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building a supportive global community where families and au pairs can thrive together.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description:
        "Creating positive change by connecting people across borders and fostering international understanding.",
    },
  ];

  const stats = [
    { number: "50+", label: "Countries", icon: Globe },
    { number: "Safe", label: "Verified Platform", icon: Heart },
    { number: "Trusted", label: "Secure Matching", icon: Award },
    { number: "24/7", label: "Support Available", icon: Shield },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-primary-950 dark:via-background dark:to-blue-950 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Connecting Cultures,
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {" "}
                Building Bridges
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              We're on a mission to make cultural exchange safe, accessible, and
              meaningful for families and au pairs worldwide.
            </p>
            <div className="flex justify-center">
              <Image
                src="https://images.pexels.com/photos/7579306/pexels-photo-7579306.jpeg"
                alt="Diverse community connecting"
                width={800}
                height={400}
                className="rounded-3xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-primary-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                At Au Pair Connect, we believe that cultural exchange has the
                power to break down barriers, create understanding, and build
                lasting relationships that span continents.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Founded by former au pairs and host families, we understand the
                unique challenges and incredible rewards of international
                cultural exchange. Our platform is designed to make these
                life-changing experiences safe, accessible, and meaningful for
                everyone involved.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary-600 hover:to-blue-700"
              >
                <Link href="/auth/register">Join Our Mission</Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/8828605/pexels-photo-8828605.jpeg"
                alt="Global connection world map"
                width={600}
                height={400}
                className="rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything we do is guided by these core principles that shape our
              platform and community.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-primary-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Founder
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Leading the vision to transform cultural exchange through
              technology and meaningful connections.
            </p>
          </div>
          <div className="flex justify-center">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 max-w-md"
              >
                <CardHeader>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-40 h-40 rounded-full object-cover mx-auto mb-4"
                  />
                  <CardTitle className="text-2xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-semibold text-lg">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {member.bio}
                  </p>
                  {member.linkedin && (
                    <Button asChild variant="outline">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        Connect on LinkedIn
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Be part of a global movement that&apos;s changing lives through
            cultural exchange.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100"
            >
              <Link href="/auth/register">Get Started Today</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-primary"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
