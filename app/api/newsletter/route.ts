import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid email provided." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      console.error(
        "Missing BREVO_API_KEY or BREVO_LIST_ID in environment variables.",
      );
      return new Response(
        JSON.stringify({ error: "Server configuration error." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Log incoming values (temporarily for debugging)
    console.log("📩 Subscribing:", email);
    console.log("📋 List ID:", BREVO_LIST_ID);

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [Number(BREVO_LIST_ID)],
        updateEnabled: true, // updates contact if already exists
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Brevo Error:", data);
      return new Response(
        JSON.stringify({ error: data?.message || "Subscription failed." }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    console.log("✅ Subscribed:", data);

    return new Response(
      JSON.stringify({ message: "Subscribed successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error: any) {
    console.error("🚨 Server Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
