"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { UserSubscriptionPlan } from "@/types";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ModalContext } from "@/components/modals/providers";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

interface PricingCardsProps {
  userId?: string;
  subscriptionPlan?: UserSubscriptionPlan;
}

export function PricingCards({ userId, subscriptionPlan }: PricingCardsProps) {
  const isYearlyDefault =
    !subscriptionPlan?.stripeCustomerId || subscriptionPlan.interval === "year"
      ? true
      : false;
  const [isYearly, setIsYearly] = useState<boolean>(!!isYearlyDefault);
  const [pendingPlanTitle, setPendingPlanTitle] = useState<string | null>(null);

  const { setShowSignInModal } = useContext(ModalContext);

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  // Calculate yearly prices with 10% discount
  const calculateYearlyPrice = (monthlyPrice: number) => {
    const yearly = monthlyPrice * 12;
    return Math.round(yearly * 0.9); // 10% discount
  };

  // Plan IDs from environment variables (make sure these are set with NEXT_PUBLIC_ prefix)
  const planIds = {
    Starter: {
      monthly: "free", // free or null for starter
      yearly: "free",
    },
    Basic: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_BASIC_MONTHLY_PLAN_ID!,
      yearly: process.env.NEXT_PUBLIC_STRIPE_BASIC_YEARLY_PLAN_ID!,
    },
    Standard: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_STANDARD_MONTHLY_PLAN_ID!,
      yearly: process.env.NEXT_PUBLIC_STRIPE_STANDARD_YEARLY_PLAN_ID!,
    },
    Enterprise: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PLAN_ID!,
      yearly: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PLAN_ID!,
    },
  };

  // Your pricing data
  const pricingData = [
    {
      title: "Starter",
      prices: { monthly: 0 },
      benefits: [
        "Online Ordering System",
        "Menu Management",
        "Admin Dashboard (Backoffice)",
      ],
      limitations: [
        "Payment Gateway Integration",
        "Multi-location Support",
        "Analytics & Reports",
        "Custom Branding",
        "Order Management",
        "Reservation Management",
        "Email and SMS Notifications",
        "Mobile Responsive Design",
        "Customer Accounts",
        "Table Reservation System",
      ],
    },
    {
      title: "Basic",
      prices: { monthly: 888 },
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
      limitations: [
        "Multi-location Support",
        "Analytics & Reports",
        "Custom Branding",
      ],
    },
    {
      title: "Standard",
      prices: { monthly: 1414 },
      benefits: [
        "Everything in Basic",
        "Multi-location Support",
        "Analytics & Reports",
        "Custom Themes & Branding",
        "Multilingual & Multi-currency",
        "SEO Optimization",
        "Push Notifications",
        "Social & Chat Integrations",
      ],
      limitations: [
        "Loyalty & Reward System",
        "Driver Management",
        "Mobile Applications",
      ],
    },
    {
      title: "Enterprise",
      prices: { monthly: 2222 },
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
      limitations: [],
    },
  ];

  const handleCheckout = async (offerTitle: string) => {
    setPendingPlanTitle(offerTitle); // Set the clicked plan
    const planId = planIds[offerTitle][isYearly ? "yearly" : "monthly"];

    if (!userId) {
      setPendingPlanTitle(null);
      return setShowSignInModal(true);
    }

    if (planId === "free") {
      setPendingPlanTitle(null);
      return (window.location.href = "/dashboard");
    }

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: planId,
          userId,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Stripe checkout failed:", data);
      }
    } catch (err) {
      console.error("Error starting checkout:", err);
    } finally {
      setPendingPlanTitle(null); // Reset the pending plan
    }
  };

  const PricingCard = ({ offer }: { offer: (typeof pricingData)[0] }) => {
    const monthlyPrice = offer.prices.monthly;
    const yearlyPrice = calculateYearlyPrice(monthlyPrice);
    const fullYearPrice = monthlyPrice * 12;
    const planId = planIds[offer.title]?.[isYearly ? "yearly" : "monthly"];

    return (
      <div
        className={cn(
          "relative flex flex-col overflow-hidden rounded-3xl border shadow-sm",
          offer.title === "Standard" ? "-m-0.5 border-2 border-purple-400" : "",
          offer.title === "Enterprise" ? "border-2 border-yellow-400" : "",
        )}
        key={offer.title}
      >
        <div className="min-h-[150px] items-start space-y-4 bg-muted/50 p-6">
          <p className="flex font-urban text-sm font-bold uppercase tracking-wider text-muted-foreground">
            {offer.title}
          </p>

          <div className="flex flex-row">
            <div className="flex flex-col">
              {monthlyPrice === 0 ? (
                <div className="flex flex-col">
                  <div className="text-left text-3xl font-semibold leading-6">
                    Free
                  </div>
                </div>
              ) : isYearly ? (
                <>
                  <div className="flex items-end">
                    <div className="text-left text-3xl font-semibold leading-6">
                      NPR {yearlyPrice}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center">
                      <span className="mr-2 text-base text-muted-foreground/80 line-through">
                        NPR {fullYearPrice}
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        (Save 10%)
                      </span>
                    </div>
                    <div className="text-base font-medium text-muted-foreground">
                      per year
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-end">
                    <div className="text-left text-3xl font-semibold leading-6">
                      NPR {monthlyPrice}
                    </div>
                    <div className="-mb-1 ml-2 text-left text-base font-medium text-muted-foreground">
                      /month
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col justify-between gap-16 p-6">
          <ul className="space-y-2 text-left text-sm font-medium leading-normal">
            {offer.benefits.map((feature) => (
              <li className="flex items-start gap-x-3" key={feature}>
                <Icons.check
                  className={cn(
                    "size-5 shrink-0",
                    offer.title === "Enterprise"
                      ? "text-yellow-500"
                      : "text-purple-500",
                  )}
                />
                <p>{feature}</p>
              </li>
            ))}

            {offer.limitations.length > 0 &&
              offer.limitations.map((feature) => (
                <li
                  className="flex items-start text-muted-foreground"
                  key={feature}
                >
                  <Icons.close className="mr-3 size-5 shrink-0" />
                  <p>{feature}</p>
                </li>
              ))}
          </ul>

          {userId && subscriptionPlan ? (
            offer.title === "Starter" ? (
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    rounded: "full",
                  }),
                  "w-full",
                )}
              >
                Go to dashboard
              </Link>
            ) : (
              <Button
                variant={
                  offer.title === "Standard"
                    ? "default"
                    : offer.title === "Enterprise"
                      ? "default"
                      : "outline"
                }
                rounded="full"
                className={cn(
                  "w-full",
                  offer.title === "Enterprise"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "",
                )}
                onClick={() => handleCheckout(offer.title)}
                disabled={
                  subscriptionPlan?.title === offer.title ||
                  pendingPlanTitle === offer.title
                }
              >
                {pendingPlanTitle === offer.title ? (
                  <span className="flex items-center gap-2">
                    <Icons.spinner className="size-4 animate-spin" />
                    Processing...
                  </span>
                ) : subscriptionPlan?.title === offer.title ? (
                  "Current Plan"
                ) : (
                  "Upgrade Plan"
                )}
              </Button>
            )
          ) : (
            <Button
              variant={
                offer.title === "Standard"
                  ? "default"
                  : offer.title === "Enterprise"
                    ? "default"
                    : "outline"
              }
              rounded="full"
              className={cn(
                offer.title === "Enterprise"
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "",
              )}
              onClick={() => setShowSignInModal(true)}
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <MaxWidthWrapper>
      <section className="flex flex-col items-center text-center">
        <HeaderSection
          label="Pricing"
          title="Start at full Speed - cls.RmS™"
          subtitle="All-in-one solution for modern restaurants"
        />

        <div className="mb-4 mt-10 flex items-center gap-5">
          <ToggleGroup
            type="single"
            size="sm"
            value={isYearly ? "yearly" : "monthly"}
            onValueChange={(value) => setIsYearly(value === "yearly")}
            aria-label="toggle-year"
            className="h-9 overflow-hidden rounded-full border bg-background p-1 *:h-7 *:text-muted-foreground"
          >
            <ToggleGroupItem
              value="monthly"
              className="rounded-full px-5 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground"
              aria-label="Toggle monthly billing"
            >
              Monthly
            </ToggleGroupItem>
            <ToggleGroupItem
              value="yearly"
              className="rounded-full px-5 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground"
              aria-label="Toggle yearly billing"
            >
              Yearly (Save 10%)
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="grid gap-5 bg-inherit py-5 lg:grid-cols-4">
          {pricingData.map((offer) => (
            <PricingCard offer={offer} key={offer.title} />
          ))}
        </div>

        {/* Updated info box with matching card design */}
        <div className="mt-8 w-full rounded-3xl border bg-muted/50 p-6 shadow-sm">
          <h3 className="text-center text-xl font-bold">
            cls.RmS™ Restaurant Management System
          </h3>
          <p className="mt-3 text-balance text-center text-base text-muted-foreground">
            Visit{" "}
            <a
              href="https://codelitsstudio.com"
              className="font-medium text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              codelitsstudio.com
            </a>{" "}
            for more information or email{" "}
            <a
              className="font-medium text-primary hover:underline"
              href="mailto:contact@codelitsstudio.com"
            >
              contact@codelitsstudio.com
            </a>
          </p>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
