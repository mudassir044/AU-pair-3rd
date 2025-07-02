import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Scale,
  Shield,
  Users,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      icon: Users,
      title: "User Accounts and Eligibility",
      content: [
        "You must be at least 18 years old to use our platform",
        "You must provide accurate and complete information when creating your account",
        "You are responsible for maintaining the security of your account credentials",
        "Each person may only create one account on our platform",
        "We reserve the right to suspend or terminate accounts that violate these terms",
      ],
    },
    {
      icon: Shield,
      title: "User Conduct and Safety",
      content: [
        "You must treat all users with respect and dignity",
        "Harassment, discrimination, or inappropriate behavior is strictly prohibited",
        "You may not use our platform for any illegal activities",
        "You must not share personal contact information outside our secure platform initially",
        "You agree to undergo background checks and verification processes as required",
        "You must report any safety concerns or inappropriate behavior immediately",
      ],
    },
    {
      icon: FileText,
      title: "Content and Intellectual Property",
      content: [
        "You retain ownership of content you upload to your profile",
        "By uploading content, you grant us a license to display it on our platform",
        "You must not upload content that infringes on others' intellectual property rights",
        "We own all rights to the platform's design, features, and functionality",
        "You may not copy, modify, or distribute our platform's code or design",
        "We reserve the right to remove content that violates our community standards",
      ],
    },
    {
      icon: Scale,
      title: "Platform Services and Availability",
      content: [
        "We provide a platform to connect au pairs and host families",
        "We do not guarantee that you will find a suitable match",
        "We are not responsible for the actions or behavior of other users",
        "Platform availability may be interrupted for maintenance or technical issues",
        "We may modify or discontinue features with appropriate notice",
        "Premium features are available through paid subscription plans",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Limitations of Liability",
      content: [
        "We are not liable for interactions between users that occur outside our platform",
        "We do not conduct in-person meetings or arrangements between users",
        "Users are responsible for their own safety during meetings and exchanges",
        "We are not liable for any damages arising from use of our platform",
        "Our total liability is limited to the amount you paid for our services",
        "We recommend users verify all information and take appropriate safety precautions",
      ],
    },
    {
      icon: CheckCircle,
      title: "Payment Terms and Refunds",
      content: [
        "Subscription fees are charged monthly or annually as selected",
        "All payments are processed securely through encrypted payment systems",
        "You can cancel your subscription at any time",
        "Refunds are available within 30 days of initial subscription purchase",
        "No refunds are provided for partial months of service",
        "We reserve the right to change pricing with 30 days notice to existing subscribers",
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
              Terms of
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {" "}
                Service
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
              Please read these terms carefully before using our platform. By
              using Au Pair Connect, you agree to these terms and conditions.
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
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                  Welcome to Au Pair Connect. These Terms of Service ("Terms")
                  govern your use of our platform and services. By accessing or
                  using our website and mobile application, you agree to be
                  bound by these Terms.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  If you do not agree to these Terms, please do not use our
                  platform. We may update these Terms from time to time, and
                  your continued use constitutes acceptance of any changes.
                </p>
              </CardContent>
            </Card>

            {/* Terms Sections */}
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

            {/* Additional Important Sections */}
            <div className="mt-12 lg:mt-16 space-y-8">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">
                    Privacy and Data Protection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
                    Your privacy is important to us. Our use of your personal
                    information is governed by our Privacy Policy, which is
                    incorporated into these Terms by reference. By using our
                    platform, you also agree to our Privacy Policy.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                    We collect and process personal information in accordance
                    with applicable data protection laws, including GDPR for
                    users in the European Union.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">
                    Dispute Resolution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      In the event of any disputes arising from your use of our
                      platform:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                          First, contact our support team to attempt resolution
                        </p>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                          Disputes will be resolved through binding arbitration
                        </p>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                          These Terms are governed by the laws of New York State
                        </p>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">
                    Account Termination
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      You may terminate your account at any time by contacting
                      our support team. We may terminate your account if:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                          You violate these Terms of Service
                        </p>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                          You engage in fraudulent or harmful behavior
                        </p>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                          Your account remains inactive for an extended period
                        </p>
                      </li>
                    </ul>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      Upon termination, your access to the platform will be
                      discontinued, and your data may be deleted in accordance
                      with our Privacy Policy.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
                    If you have any questions about these Terms of Service,
                    please contact us:
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      <strong>Email:</strong> legal@aupairconnect.com
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

              <Card className="shadow-xl bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-950 dark:to-blue-950">
                <CardContent className="pt-6">
                  <p className="text-center text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    <strong>Important:</strong> By using Au Pair Connect, you
                    acknowledge that you have read, understood, and agree to be
                    bound by these Terms of Service and our Privacy Policy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
