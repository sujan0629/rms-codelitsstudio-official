"use client";

import React from "react";
import { CircleCheck } from "lucide-react";

import { HeaderSection } from "@/components/shared/header-section";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

// Pricing data from PricingCards
const pricingData = [
  {
    title: "Starter",
    benefits: [
      "Online Ordering System",
      "Menu Management",
      "Admin Dashboard (Backoffice)",
    ],
  },
  {
    title: "Basic",
    benefits: [
      "Everything in Starter",
      "Payment Gateway Integration",
      "Delivery Area & Radius Setup",
      "Discounts and Coupons",
      "Scheduled Orders",
      "Staff/User Roles & Permissions",
      "Tax & Fee Configuration",
      "Printable Receipts/Kitchen Tickets",
    ],
  },
  {
    title: "Standard",
    benefits: [
      "Everything in Basic",
      "Multi-location Support",
      "Analytics & Reports",
      "Custom Themes & Branding",
      "Multilingual & Multi-currency",
      "Reviews & Ratings",
      "SEO Optimization",
      "Push Notifications",
      "Social & Chat Integrations",
    ],
  },
  {
    title: "Enterprise",
    benefits: [
      "All features from Standard",
      "Loyalty & Reward Points",
      "Wallet System",
      "Reviews & Ratings",
      "Extensions Marketplace",
      "POS System",
      "Delivery Driver Management",
      "Progressive Web App (PWA)",
      "Priority Support",
      "Mobile Applications (iOS/Android)",
    ],
  },
];

// Helper to expand inherited benefits
const expandedBenefits: Record<string, Set<string>> = {};
const pricingOrder = ["Starter", "Basic", "Standard", "Enterprise"];
// Build expanded benefits in order
pricingOrder.forEach((title) => {
  const plan = pricingData.find((p) => p.title === title)!;
  const set = new Set<string>();
  plan.benefits.forEach((b) => {
    const inheritBasic = b.match(/^Everything in (.+)$/);
    const inheritAll = b.match(/^All features from (.+)$/);
    if (inheritBasic) {
      const ref = inheritBasic[1];
      // add all expanded benefits of ref
      expandedBenefits[ref]?.forEach((f) => set.add(f));
    } else if (inheritAll) {
      const ref = inheritAll[1];
      expandedBenefits[ref]?.forEach((f) => set.add(f));
    } else {
      set.add(b);
    }
  });
  expandedBenefits[title] = set;
});

// Collect unique features
const allFeatures = Array.from(
  new Set(pricingOrder.flatMap((title) => Array.from(expandedBenefits[title]))),
);

export function ComparePlans() {
  const renderCell = (planTitle: string, feature: string) => {
    return expandedBenefits[planTitle].has(feature) ? (
      <CircleCheck className="mx-auto size-[22px]" />
    ) : (
      "—"
    );
  };

  return (
    <MaxWidthWrapper>
      <HeaderSection
        label="Plans"
        title="Compare Our Plans"
        subtitle="Find the perfect plan tailored for your business needs!"
      />

      <div className="my-10 overflow-x-scroll max-lg:mx-[-0.8rem] md:overflow-x-visible">
        <table className="w-full table-fixed">
          <thead>
            <tr className="divide-x divide-border border">
              <th className="sticky left-0 z-20 w-40 bg-accent p-5 md:w-1/4 lg:top-14"></th>
              {pricingOrder.map((title) => (
                <th
                  key={title}
                  className="sticky z-10 w-40 bg-accent p-5 font-heading text-xl capitalize tracking-wide md:w-auto lg:top-14 lg:text-2xl"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-x divide-border border">
            {allFeatures.map((feature, idx) => (
              <tr key={idx} className="divide-x divide-border border">
                <td className="sticky left-0 bg-accent md:bg-transparent">
                  <div className="flex items-center justify-between space-x-2 p-4">
                    <span className="text-[15px] font-medium lg:text-base">
                      {feature}
                    </span>
                  </div>
                </td>
                {pricingOrder.map((title) => (
                  <td
                    key={title}
                    className="p-4 text-center text-[15px] text-muted-foreground lg:text-base"
                  >
                    {renderCell(title, feature)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MaxWidthWrapper>
  );
}
