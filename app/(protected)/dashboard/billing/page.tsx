import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { BillingInfo } from "@/components/pricing/billing-info";

export const metadata = constructMetadata({
  title: "Billing – cls.Rms™ | Codelits Studio Pvt. Ltd.",
  description:
    "Securely manage your cls.Rms™ billing and subscription details powered by Stripe. View your plan, invoices, and payment method.",
});

export default async function BillingPage() {
  const user = await getCurrentUser();

  if (!user || !user.id || user.role !== "USER") {
    redirect("/login");
  }

  const userSubscriptionPlan = await getUserSubscriptionPlan(user.id);

  return (
    <>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan securely."
      />
      <div className="grid gap-8">
        <BillingInfo userSubscriptionPlan={userSubscriptionPlan} />
      </div>
    </>
  );
}
