import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Users, Globe, Shield, Award, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Au Pair Connect",
  description:
    "Learn about Au Pair Connect's mission to connect cultures worldwide. Meet our team and discover our values for safe cultural exchange.",
  keywords: [
    "about",
    "team",
    "mission",
    "cultural exchange",
    "au pair platform",
  ],
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
      bio: "Former au pair turned entrepreneur with 10+ years in cultural exchange programs.",
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Community",
      image:
        "https://images.pexels.com/photos/2714626/pexels-photo-2714626.jpeg",
      bio: "Passionate about connecting cultures and building meaningful relationships worldwide.",
    },
    {
      name: "David Chen",
      role: "CTO",
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
      bio: "Technology leader focused on creating safe and intuitive platforms for global communities.",
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
    { number: "10,000+", label: "Successful Matches", icon: Heart },
    { number: "4.9/5", label: "Average Rating", icon: Award },
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
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our diverse team brings together expertise in cultural exchange,
              technology, and community building.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-semibold">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From a simple idea to a global platform connecting thousands of
              families and au pairs.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary to-blue-600"></div>
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                  >
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <CardTitle className="text-lg">
                            {milestone.year}
                          </CardTitle>
                        </div>
                        <CardDescription className="font-semibold text-gray-900 dark:text-white">
                          {milestone.title}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-gray-900"></div>
                </div>
              ))}
            </div>
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
            Be part of a global movement that's changing lives through cultural
            exchange.
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
