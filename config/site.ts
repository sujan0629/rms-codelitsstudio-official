import { SidebarNavItem, SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "cls.Rms®",
  description:
    "cls.Rms® by Codelits Studio Pvt. Ltd — A modern, efficient Restaurant Management System designed to streamline your restaurant operations with ease. Manage pricing, orders, staff, and more all in one platform.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://codelitsstudio.com/",
    github: "https://github.com/codelitsstudio", // or remove if no github
  },
  mailSupport: "support@codelitsstudio.com",
  mailContact: "contact@codelitsstudio.com",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "#" },
      { title: "Enterprise", href: "#" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Security", href: "#" },
      { title: "Customization", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Changelog", href: "#" },
    ],
  },
];
