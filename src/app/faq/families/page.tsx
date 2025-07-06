import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown, ChevronUp, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FamiliesFAQPage() {
  const faqs = [
    {
      question: "How do I find the right au pair for my family?",
      answer:
        "Our AI-powered matching system considers your preferences for languages, experience, interests, and lifestyle to suggest compatible au pairs. You can browse profiles, read reviews, and connect with candidates who match your family's needs.",
    },
    {
      question: "What are the visa requirements for hosting an au pair?",
      answer:
        "Visa requirements vary by country. We provide guidance on J-1 visa applications for the US, Working Holiday visas for other countries, and help facilitate the necessary documentation. Our support team can guide you through the specific requirements for your location.",
    },
    {
      question: "How much does it cost to host an au pair?",
      answer:
        "Costs include the au pair's weekly stipend (varies by country), room and board, and our platform fees. In the US, the average weekly stipend is $195.75. We provide transparent pricing and help you budget for the full experience.",
    },
    {
      question: "What background checks are performed on au pairs?",
      answer:
        "All au pairs undergo comprehensive background checks including criminal history, reference checks from previous employers or families, medical examinations, and verification of childcare experience and certifications.",
    },
    {
      question: "How long does the matching process take?",
      answer:
        "Most families find their au pair within 2-4 weeks of creating their profile. The timeline depends on your specific requirements, location, and how quickly you respond to potential matches.",
    },
    {
      question: "What support do you provide during the au pair's stay?",
      answer:
        "We offer 24/7 support, monthly check-ins, mediation services for any issues, cultural orientation programs, and access to local coordinator networks. Our goal is to ensure a positive experience for both families and au pairs.",
    },
    {
      question: "Can we extend our au pair's stay?",
      answer:
        "Yes, many au pairs can extend their stay for an additional 6-12 months, depending on visa regulations in your country. We help facilitate extensions when both parties are satisfied with the arrangement.",
    },
    {
      question: "What happens if the match doesn't work out?",
      answer:
        "While rare, if a match isn't working out, we provide mediation services and, if necessary, help find a replacement au pair. We also offer a satisfaction guarantee within the first 30 days.",
    },
    {
      question: "What are my responsibilities as a host family?",
      answer:
        "You'll provide a private room, meals, transportation assistance, and treat your au pair as a family member. You're also responsible for clear communication about expectations, fair working hours, and cultural integration opportunities.",
    },
    {
      question: "How do I prepare my home for an au pair?",
      answer:
        "Ensure you have a private bedroom available, clear house rules established, and are prepared to share cultural experiences. We provide a comprehensive preparation guide to help make the transition smooth for everyone.",
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
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                FAQ for Host Families
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Everything you need to know about hosting an au pair and using
                our platform
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
                  Still have questions?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our support team is here to help you through every step of the
                  process.
                </p>
                <Button asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
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
