import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

// Helper to safely access environment variables
const getEnv = (key: string): string => {
  if (typeof process.env[key] === "string") return process.env[key]!;
  throw new Error(`Missing environment variable: ${key}`);
};

export default {
  providers: [
    Google({
      clientId: getEnv("GOOGLE_CLIENT_ID"),
      clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
    }),
    Resend({
      apiKey: getEnv("RESEND_API_KEY"),
      from: getEnv("EMAIL_FROM"),
    }),
  ],
  secret: getEnv("AUTH_SECRET"),
} satisfies NextAuthConfig;