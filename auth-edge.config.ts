import type { NextAuthConfig } from "next-auth";

// Netlify Edge compatible environment access
const getEnv = (key: string): string => {
  if (typeof globalThis.Netlify !== "undefined" && globalThis.Netlify.env?.get(key)) {
    return globalThis.Netlify.env.get(key)!;
  }

  if (typeof process.env[key] === "string") {
    return process.env[key]!;
  }

  const publicKey = `NEXT_PUBLIC_${key}`;
  if (typeof process.env[publicKey] === "string") {
    return process.env[publicKey]!;
  }

  if (typeof process !== "undefined" && process.env.NODE_ENV === "production") {
    throw new Error(`Missing environment variable: ${key}`);
  }

  console.warn(`Missing environment variable: ${key}. Using placeholder.`);
  return "DEV_PLACEHOLDER";
};

export const authEdgeConfig: NextAuthConfig = {
  secret: getEnv("AUTH_SECRET"),
  providers: [], // Add your providers here
  pages: { signIn: "/login" },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as any;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  session: { strategy: "jwt" },
};
