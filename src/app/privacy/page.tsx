import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Users, Globe, FileText } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account (name, email, phone number)",
        "Profile information including photos, videos, and personal descriptions",
        "Communication data from messages and video calls within our platform",
        "Device and usage information to improve our services",
        "Location data (with your permission) to suggest local matches",
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To create and maintain your profile on our platform",
        "To suggest compatible matches based on your preferences",
        "To facilitate communication between users",
        "To provide customer support and respond to your inquiries",
        "To improve our services and develop new features",
        "To send important updates about our platform and services",
      ],
    },
    {
      icon: Lock,
      title: "Information Sharing",
      content: [
        "We only share information that you choose to make visible on your profile",
        "We never sell your personal information to third parties",
        "We may share anonymized data for research and improvement purposes",
        "We cooperate with law enforcement when required by legal obligations",
        "We use trusted service providers who help us operate our platform",
      ],
    },
    {
      icon: Users,
      title: "Your Privacy Rights",
      content: [
        "Access and download your personal data at any time",
        "Correct or update your information through your profile settings",
        "Delete your account and associated data permanently",
        "Control who can see your profile and contact you",
        "Opt out of marketing communications while keeping your account active",
      ],
    },
    {
      icon: Globe,
      title: "International Transfers",
      content: [
        "Your data may be transferred to and processed in countries outside your residence",
        "We ensure appropriate safeguards are in place for international transfers",
        "We comply with applicable data protection laws in all jurisdictions",
        "Users in the EU have additional rights under GDPR",
        "We maintain data processing agreements with all international partners",
      ],
    },
    {
      icon: FileText,
      title: "Data Security",
      content: [
        "We use industry-standard encryption to protect your data",
        "Regular security audits and penetration testing",
        "Secure data centers with 24/7 monitoring",
        "Employee access to data is limited and logged",
        "We have incident response procedures for any security breaches",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-primary-950 dark:via-background dark:to-blue-950 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Privacy
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {" "}
                Policy
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
            </p>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Last updated: January 1, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <Card className="shadow-xl mb-8 lg:mb-12">
              <CardContent className="pt-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  Au Pair Connect ("we," "our," or "us") is committed to
                  protecting your privacy and personal information. This Privacy
                  Policy explains how we collect, use, disclose, and safeguard
                  your information when you use our cultural exchange platform
                  and services. By using our platform, you agree to the
                  collection and use of information in accordance with this
                  policy.
                </p>
              </CardContent>
            </Card>

            {/* Privacy Sections */}
            <div className="space-y-8 lg:space-y-12">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Card key={index} className="shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl sm:text-2xl">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center mr-4">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 sm:space-y-4">
                        {section.content.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                              {item}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Additional Information */}
            <div className="mt-12 lg:mt-16 space-y-8">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">
                    Cookies and Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      We use cookies and similar tracking technologies to
                      enhance your experience on our platform:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                          <strong>Essential cookies:</strong> Required for basic
                          platform functionality
                        </p>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                          <strong>Analytics cookies:</strong> Help us understand
                          how users interact with our platform
                        </p>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                          <strong>Preference cookies:</strong> Remember your
                          settings and preferences
                        </p>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">
                    Children's Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                    Our platform is not intended for children under 18 years of
                    age. We do not knowingly collect personal information from
                    children under 18. If you believe we have collected
                    information from a child under 18, please contact us
                    immediately so we can remove such information.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">
                    Changes to This Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Last updated" date. You are
                    advised to review this Privacy Policy periodically for any
                    changes. Your continued use of the platform after any
                    modifications constitutes acceptance of the updated policy.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">
                    Contact Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
                    If you have any questions about this Privacy Policy or our
                    data practices, please contact us:
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      <strong>Email:</strong> privacy@aupairconnect.com
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      <strong>Address:</strong> 123 Cultural Exchange Ave, New
                      York, NY 10001
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
