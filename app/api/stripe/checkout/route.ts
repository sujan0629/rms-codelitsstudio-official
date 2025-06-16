// app/api/stripe/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateUserStripe } from "@/actions/generate-user-stripe";

export async function POST(req: NextRequest) {
  const { priceId, userId } = await req.json();

  try {
    const result = await generateUserStripe(priceId);
    if (result.status === "success" && result.stripeUrl) {
      return NextResponse.json({ url: result.stripeUrl });
    } else {
      return NextResponse.json(
        { error: "Failed to generate stripe session" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
