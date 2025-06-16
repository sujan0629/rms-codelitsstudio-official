import Image from "next/image";
import Link from "next/link";

import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

const logos = [
  {
    title: "Next.js 14",
    href: "https://nextjs.org/",
    src: "/logos/nextjs.png",
  },
  {
    title: "React 18",
    href: "https://react.dev/",
    src: "/logos/react.png",
  },
  {
    title: "React Native",
    href: "https://reactnative.dev/",
    src: "/logos/react-native.png",
  },
  {
    title: "TypeScript",
    href: "https://www.typescriptlang.org/",
    src: "/logos/typescript.png",
  },
  {
    title: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    src: "/logos/tailwindcss.png",
  },
  {
    title: "Node.js",
    href: "https://nodejs.org/",
    src: "/logos/nodejs.png",
  },
  {
    title: "Express",
    href: "https://expressjs.com/",
    src: "/logos/express.png",
  },
  {
    title: "Socket.io",
    href: "https://socket.io/",
    src: "/logos/socketio.png",
  },
  {
    title: "JWT",
    href: "https://jwt.io/",
    src: "/logos/jwt.png",
  },
  {
    title: "MongoDB",
    href: "https://www.mongodb.com/",
    src: "/logos/mongodb.png",
  },
  {
    title: "PostgreSQL",
    href: "https://www.postgresql.org/",
    src: "/logos/postgresql.png",
  },
  {
    title: "GraphQL",
    href: "https://graphql.org/",
    src: "/logos/graphql.png",
  },
].map((logo) => ({
  ...logo,
  width: 100,
  height: 30,
}));

export default function Powered() {
  return (
    <section className="py-14 text-muted-foreground">
      <MaxWidthWrapper>
        <h2 className="text-center text-sm font-semibold uppercase">
          Powered by
        </h2>

        <div className="mt-10 grid grid-cols-2 place-items-center gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {logos.map((logo) => (
            <Link
              key={logo.title}
              href={logo.href}
              target="_blank"
              aria-label={logo.title}
              className="duration-250 grayscale transition hover:text-foreground hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.title}
                width={logo.width}
                height={logo.height}
                className="h-auto w-full object-contain"
              />
            </Link>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
