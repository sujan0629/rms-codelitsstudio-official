// middleware.ts
import { authEdgeConfig } from "@/auth-edge.config";
import NextAuth from "next-auth";

// Netlify Edge adapter
const middleware = NextAuth(authEdgeConfig).auth;

export default middleware;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
};