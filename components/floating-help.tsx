"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How accurate are the AI predictions?",
    answer:
      "Our AI models achieve an average accuracy of 87% across all major leagues. The confidence rating shown with each prediction indicates the model's certainty level.",
  },
  {
    question: "How does the virtual wallet work?",
    answer:
      "The virtual wallet uses play money to simulate real betting. You start with $5,000 in virtual currency. Winnings and losses are tracked to calculate your ROI and performance metrics.",
  },
  {
    question: "What leagues are covered?",
    answer:
      "We cover 25+ major leagues including Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Champions League, Europa League, and many more.",
  },
  {
    question: "Can I export my betting history?",
    answer:
      "Yes! Pro and Enterprise users can export their complete betting history and analytics reports in CSV or PDF format.",
  },
  {
    question: "How are upset alerts determined?",
    answer:
      "Upset alerts are triggered when our AI predicts a significantly different outcome compared to bookmaker odds, indicating potential value betting opportunities.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "Currently, we offer a fully responsive web application. A dedicated mobile app is planned for Q3 2025.",
  },
];

export function FloatingHelp() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Help Button */}
      <Sheet open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="rounded-full w-14 h-14 bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>Help & FAQs</SheetTitle>
            <SheetDescription>
              Find answers to common questions about AI Football Predictor
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  📖 User Guide
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  📧 Contact Support
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  🎥 Video Tutorials
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  💬 Live Chat
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-semibold">Need More Help?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Can't find what you're looking for? Our support team is here to
                help!
              </p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Contact Support
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
