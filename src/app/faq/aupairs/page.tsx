import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown, ChevronUp, Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AuPairsFAQPage() {
  const faqs = [
    {
      question: "What qualifications do I need to become an au pair?",
      answer:
        "You need to be 18-26 years old, have childcare experience (minimum 200 hours), speak basic English, have a clean background check, and be in good health. Some countries may have additional requirements like a driver's license.",
    },
    {
      question: "How do I create an attractive profile?",
      answer:
        "Include clear photos showing you with children, write a personal letter explaining your motivation, list your childcare experience and certifications, mention your hobbies and interests, and be honest about your expectations and preferences.",
    },
    {
      question: "What should I expect in terms of working hours and duties?",
      answer:
        "Typically 25-45 hours per week including childcare, light housekeeping related to children, and meal preparation. You should have at least 1.5 days off per week and shouldn't work more than 10 hours per day.",
    },
    {
      question: "How much will I earn as an au pair?",
      answer:
        "Compensation varies by country. In the US, the minimum weekly stipend is $195.75 plus room, board, and up to $500 for education. Other countries have different arrangements, often including pocket money and living expenses.",
    },
    {
      question: "What about visa requirements and travel arrangements?",
      answer:
        "We help guide you through the visa application process. For the US, you'll need a J-1 visa. Other countries may require working holiday or au pair-specific visas. We provide detailed guidance and required documentation.",
    },
    {
      question: "Will I have time for studying or personal activities?",
      answer:
        "Yes! Au pairs typically have time for language classes, personal interests, and cultural activities. Many families encourage education and personal development. You'll also have weekends and vacation time.",
    },
    {
      question: "What if I have problems with my host family?",
      answer:
        "We provide 24/7 support and mediation services. Our local coordinators help resolve issues, and if necessary, we can help find a new host family. Clear communication and cultural understanding usually resolve most concerns.",
    },
    {
      question: "Can I travel during my au pair stay?",
      answer:
        "Yes! Many au pairs travel extensively during their stay. You'll have vacation time, and many families are flexible about time off for travel. Some families even include the au pair in family vacations.",
    },
    {
      question: "What happens after my au pair year?",
      answer:
        "Many au pairs extend their stay, travel, or return home with improved language skills and cultural experience. The experience often leads to career opportunities in childcare, education, or international relations.",
    },
    {
      question: "How do I prepare for the cultural differences?",
      answer:
        "We provide cultural orientation materials and connect you with other au pairs in your area. Keep an open mind, communicate openly with your host family, and embrace the differences as learning opportunities.",
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
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                FAQ for Au Pairs
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Your guide to becoming an au pair and making the most of your
                cultural exchange experience
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
                  Ready to start your au pair journey?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Join thousands of au pairs who have found their perfect host
                  family through our platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/auth/register?role=aupair">
                      Start Your Application
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
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
