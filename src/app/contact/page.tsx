import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Users,
} from "lucide-react";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      info: "support@aupairconnect.com",
      action: "mailto:support@aupairconnect.com",
    },
    {
      icon: MessageSquare,
      title: "Chat Option",
      description: "Get instant help through our live chat",
      info: "Available 24/7",
      action: "#",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come see us at our headquarters",
      info: "123 Cultural Exchange Ave, New York, NY 10001",
      action: "#",
    },
  ];

  const faqCategories = [
    {
      icon: Users,
      title: "For Families",
      description: "Questions about hosting an au pair",
      link: "/faq/families",
    },
    {
      icon: HelpCircle,
      title: "For Au Pairs",
      description: "Information for au pair candidates",
      link: "/faq/aupairs",
    },
    {
      icon: Phone,
      title: "Technical Support",
      description: "Help with platform and account issues",
      link: "/faq/technical",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-primary-950 dark:via-background dark:to-blue-950 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Get in
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {" "}
                Touch
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Have questions about cultural exchange? Need help with your
              account? Our friendly support team is here to help you every step
              of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the method that works best for you. We're committed to
              providing quick and helpful responses.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
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
                      {method.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      {method.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-gray-900 dark:text-white mb-4 text-sm sm:text-base">
                      {method.info}
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <a href={method.action}>Contact</a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form and Info */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">
                  Send Us a Message
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4 sm:space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Handle form submission here
                    console.log("Form submitted");
                  }}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-sm sm:text-base"
                      >
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        className="h-10 sm:h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="lastName"
                        className="text-sm sm:text-base"
                      >
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        className="h-10 sm:h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="h-10 sm:h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm sm:text-base">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      className="h-10 sm:h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm sm:text-base">
                      Message
                    </Label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help..."
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-sm sm:text-base"
                      required
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary-600 hover:to-blue-700 h-10 sm:h-12 text-sm sm:text-base"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6 lg:space-y-8">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl flex items-center">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-primary" />
                    Support Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600 dark:text-gray-300">
                      Monday - Friday
                    </span>
                    <span className="font-semibold">8:00 AM - 8:00 PM EST</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600 dark:text-gray-300">
                      Saturday
                    </span>
                    <span className="font-semibold">
                      10:00 AM - 6:00 PM EST
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600 dark:text-gray-300">
                      Sunday
                    </span>
                    <span className="font-semibold">
                      12:00 PM - 4:00 PM EST
                    </span>
                  </div>
                  <div className="mt-4 p-3 sm:p-4 bg-primary-50 dark:bg-primary-950 rounded-lg">
                    <p className="text-xs sm:text-sm text-primary-700 dark:text-primary-300">
                      <strong>Emergency Support:</strong> Available 24/7 for
                      urgent safety concerns
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Find quick answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {faqCategories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <a
                          key={index}
                          href={category.link}
                          className="flex items-center p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                              {category.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                              {category.description}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-primary-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Global Presence
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              With offices around the world, we provide local support for our
              global community.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                city: "New York",
                address: "123 Cultural Exchange Ave",
                country: "United States",
              },
              {
                city: "London",
                address: "456 International St",
                country: "United Kingdom",
              },
              {
                city: "Berlin",
                address: "789 Au Pair Platz",
                country: "Germany",
              },
            ].map((office, index) => (
              <Card key={index} className="shadow-xl">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {office.city}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-1">
                      {office.address}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                      {office.country}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
