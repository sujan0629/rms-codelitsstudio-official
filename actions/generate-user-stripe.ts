// actions/generate-user-stripe.ts
"use server";

import { auth } from "@/auth";

import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { absoluteUrl } from "@/lib/utils";

export type responseAction = {
  status: "success" | "error";
  stripeUrl?: string;
};

const billingUrl = absoluteUrl("/pricing");

export async function generateUserStripe(
  priceId: string,
): Promise<responseAction> {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user || !user.email || !user.id) {
      throw new Error("Unauthorized");
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user.id);

    // If user has a paid subscription, create billing portal session
    if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      });

      return {
        status: "success",
        stripeUrl: stripeSession.url,
      };
    }
    // For new subscriptions
    else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.email,
        line_items: [{ price: priceId, quantity: 1 }],
        metadata: { userId: user.id },
      });

      return {
        status: "success",
        stripeUrl: stripeSession.url || "",
      };
    }
  } catch (error) {
    console.error(error);
    return { status: "error" };
  }
}
