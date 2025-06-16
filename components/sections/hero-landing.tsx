import Link from "next/link";

import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";
import { cn, nFormatter } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export default async function HeroLanding() {
  const instagramFollowers = "6.2k/100";
  // fetch this dynamically or hardcode for now

  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/mickasmt/next-saas-stripe-starter",
    {
      ...(env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      // data will revalidate every hour
      next: { revalidate: 3600 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));

  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <Link
          href="https://www.threads.net/@yourapp" // Replace with your link
          className={cn(
            buttonVariants({ variant: "outline", size: "sm", rounded: "full" }),
            "px-4",
          )}
          target="_blank"
        >
          <span className="mr-3">📢</span>
          <span className="hidden md:flex">
            Explore more updates and media on threads
          </span>
          <svg
            className="ml-2"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2Z" />
            <path d="M9.75 7.5c1.44 0 2.77.75 3.45 1.98.75 1.38.75 3.54-.45 4.59-1.29 1.11-3.54.63-3.84-.72-.3-1.38 1.29-2.1 2.91-1.44 1.65.69 2.46 2.91 1.89 4.41" />
          </svg>
        </Link>

        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          Power your restaurant with{" "}
          <span className="font-extrabold text-gradient_gold">
            cls.RmS
            <sup className="align-super text-sm text-gradient_gold">™</sup>
          </span>
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Built using Next.js 14, React 18, React Native, TypeScript, Tailwind
          CSS, Node.js, Express, Socket.io, JWT, and MongoDB/PostgreSQL.
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link
            href="/pricing"
            prefetch={true}
            className={cn(
              buttonVariants({ size: "lg", rounded: "full" }),
              "gap-2",
            )}
          >
            <span>Go Pricing</span>
            <Icons.arrowRight className="size-4" />
          </Link>
          <Link
            href="https://www.instagram.com/codelits_studio/"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
                rounded: "full",
              }),
              "px-5",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="mr-2 size-4"
            >
              <path d="M7.75 2C5.574 2 4 3.574 4 5.75v12.5C4 20.426 5.574 22 7.75 22h8.5c2.176 0 3.75-1.574 3.75-3.75V5.75C20 3.574 18.426 2 16.25 2h-8.5zm0 2h8.5c1.243 0 1.75.507 1.75 1.75v8.5c0 1.243-.507 1.75-1.75 1.75h-8.5c-1.243 0-1.75-.507-1.75-1.75v-8.5c0-1.243.507-1.75 1.75-1.75zm4.25 1.5a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5zm0 2a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5zm3.5-.5a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75z" />
            </svg>

            <p>
              Instagram{" "}
              <span className="font-semibold">{instagramFollowers}</span>
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
