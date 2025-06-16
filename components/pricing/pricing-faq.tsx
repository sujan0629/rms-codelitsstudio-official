"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HeaderSection } from "@/components/shared/header-section";

const pricingFaqData = [
  {
    id: "item-1",
    question: "What is the cost of the Starter plan?",
    answer:
      "The Starter plan is completely free, with no monthly or annual charges. It includes Online Ordering, Menu Management, and Admin Dashboard features.",
  },
  {
    id: "item-2",
    question: "How much does the Basic plan cost per month and per year?",
    answer:
      "The Basic plan is priced at NPR 888 per month. If you choose annual billing, you get 10% off, making it NPR 9,590 per year.",
  },
  {
    id: "item-3",
    question: "What is the price of the Standard plan per month and per year?",
    answer:
      "The Standard plan costs NPR 1,414 per month. With annual billing, you save 10%, paying NPR 15,271 per year.",
  },
  {
    id: "item-4",
    question: "How much do I pay for the Enterprise plan monthly and yearly?",
    answer:
      "The Enterprise plan is NPR 2,222 per month. With yearly billing and a 10% discount, it totals NPR 23,998 per year.",
  },
  {
    id: "item-5",
    question: "Do you offer a free trial?",
    answer:
      "We don’t offer a separate trial for paid plans, but you can start with our free Starter plan anytime and upgrade when ready. All paid plans are subscription-based with no long-term commitments.",
  },
];

export function PricingFaq() {
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Explore our comprehensive FAQ to find quick answers to common inquiries. If you need further assistance, don't hesitate to contact us for personalized help."
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
              {faqItem.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
