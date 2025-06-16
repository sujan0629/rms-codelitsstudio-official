import { FeatureLdg, InfoLdg, TestimonialType } from "types";

export const infos: InfoLdg[] = [
  {
    title: "Scale Your Restaurant Business with Confidence",
    description:
      "Empower your restaurant with advanced tech solutions to boost efficiency, customer satisfaction, and growth.",
    image: "/_static/illustrations/work-from-home.jpg",
    list: [
      {
        title: "Flexible",
        description:
          "Customize your integrations to fit your unique requirements.",
        icon: "laptop",
      },
      {
        title: "Efficient",
        description: "Streamline your processes and reducing manual effort.",
        icon: "search",
      },
      {
        title: "Reliable",
        description:
          "Rely on our robust infrastructure and comprehensive documentation.",
        icon: "settings",
      },
    ],
  },
  {
    title: "Effortless Restaurant Integration",
    description:
      "Easily connect our platform with your existing restaurant workflows and tools for smooth operations and improved efficiency.",
    image: "/_static/illustrations/restaurant-integration.jpg",
    list: [
      {
        title: "Team Collaboration",
        description:
          "Coordinate seamlessly with your staff in real-time for smooth operations.",
        icon: "laptop",
      },
      {
        title: "Cutting-Edge Innovation",
        description: "Always stay ahead with the latest features and updates.",
        icon: "settings",
      },
      {
        title: "Built to Scale",
        description:
          "Easily grow your business with a platform that adapts to your needs.",
        icon: "search",
      },
    ],
  },
];
export const features: FeatureLdg[] = [
  {
    title: "Online Ordering System",
    description:
      "Let customers place food orders quickly and easily through your digital menu.",
    link: "/online-ordering",
    icon: "laptop",
  },
  {
    title: "Menu Management",
    description:
      "Dynamically manage and update your food items, combos, and availability.",
    link: "/menu-management",
    icon: "bookOpen",
  },
  {
    title: "Table Reservation System",
    description:
      "Enable diners to reserve tables in advance, boosting restaurant efficiency.",
    link: "/reservations",
    icon: "check",
  },
  {
    title: "Customer Accounts",
    description:
      "Let users create accounts to track past orders and manage preferences.",
    link: "/customers",
    icon: "user",
  },
  {
    title: "Admin Dashboard (Backoffice)",
    description:
      "Monitor and manage orders, revenue, staff, and customers in one place.",
    link: "/admin",
    icon: "dashboard",
  },
  {
    title: "Multi-location Support",
    description:
      "Operate and control multiple outlets from a single unified platform.",
    link: "/locations",
    icon: "package",
  },
  {
    title: "Payment Gateway Integration",
    description:
      "Accept payments via cards, wallets, or digital platforms seamlessly.",
    link: "/payment-gateways",
    icon: "billing",
  },
  {
    title: "Delivery Area & Radius Setup",
    description:
      "Define zones, set delivery radius limits, and assign charges flexibly.",
    link: "/delivery-settings",
    icon: "settings",
  },
  {
    title: "Discounts and Coupons",
    description:
      "Attract customers with special discounts, promo codes, and offers.",
    link: "/coupons",
    icon: "copy",
  },
  {
    title: "Scheduled Orders",
    description:
      "Allow customers to schedule orders for future pickup or delivery.",
    link: "/scheduled-orders",
    icon: "arrowUpRight",
  },
  {
    title: "Order Management",
    description:
      "Track incoming, processing, and completed orders in real-time.",
    link: "/orders",
    icon: "check",
  },
  {
    title: "Reservation Management",
    description:
      "Manage, edit, or cancel upcoming bookings with full visibility.",
    link: "/reservations/manage",
    icon: "billing",
  },
  {
    title: "Staff/User Roles & Permissions",
    description:
      "Assign permissions to team members for secure access control.",
    link: "/roles",
    icon: "user",
  },
  {
    title: "Email and SMS Notifications",
    description:
      "Send real-time alerts and updates to customers and staff via email/SMS.",
    link: "/notifications",
    icon: "messages",
  },
  {
    title: "Push Notifications (via extension)",
    description:
      "Notify users instantly with in-browser or device push alerts.",
    link: "/push-notifications",
    icon: "copy",
  },
  {
    title: "Mobile Responsive Design",
    description:
      "Looks great on all screen sizes, from smartphones to desktops.",
    link: "/responsive",
    icon: "laptop",
  },
  {
    title: "Progressive Web App (PWA) (via extension)",
    description:
      "Installable web app with offline access and native-like performance.",
    link: "/pwa",
    icon: "package",
  },
  {
    title: "Custom Themes & Branding",
    description:
      "Tailor fonts, colors, and layouts to align with your brand identity.",
    link: "/themes",
    icon: "user",
  },
  {
    title: "Loyalty & Reward Points (via extension)",
    description: "Encourage return visits with a point-based loyalty system.",
    link: "/loyalty",
    icon: "settings",
  },
  {
    title: "Wallet System (via extension)",
    description: "Let users preload balance and use it for faster checkouts.",
    link: "/wallet",
    icon: "billing",
  },
  {
    title: "Reviews & Ratings (via extension)",
    description:
      "Collect authentic feedback to improve credibility and engagement.",
    link: "/reviews",
    icon: "messages",
  },
  {
    title: "Analytics & Reports",
    description:
      "Visualize business metrics, revenue trends, and customer behavior.",
    link: "/analytics",
    icon: "lineChart",
  },
  {
    title: "Tax & Fee Configuration",
    description: "Set up regional taxes, service fees, and surcharges easily.",
    link: "/taxes",
    icon: "billing",
  },
  {
    title: "Multilingual & Multi-currency Support",
    description:
      "Support international customers with multiple languages and currencies.",
    link: "/i18n",
    icon: "settings",
  },
  {
    title: "SEO Optimization",
    description:
      "Improve your visibility on search engines with structured SEO features.",
    link: "/seo",
    icon: "search",
  },
  {
    title: "Mobile Application",
    description:
      "Dedicated iOS and Android apps for faster customer access (coming soon).",
    link: "/mobile-app",
    icon: "laptop",
  },
  {
    title: "POS System (via extension)",
    description:
      "Complete in-store transactions with an integrated point-of-sale system.",
    link: "/pos",
    icon: "billing",
  },
  {
    title: "Delivery Driver Management (via “DeliveryBoy” extension)",
    description:
      "Track delivery agents, assign orders, and monitor delivery status.",
    link: "/drivers",
    icon: "user",
  },
  {
    title: "Printable Receipts/Kitchen Tickets",
    description:
      "Print clean order receipts and kitchen tickets for every transaction.",
    link: "/tickets",
    icon: "lineChart",
  },
  {
    title: "Social & Chat Integrations (via community extensions)",
    description:
      "Enable Facebook Messenger, WhatsApp, and other social integrations.",
    link: "/social",
    icon: "messages",
  },
];
export const testimonials: TestimonialType[] = [
  {
    name: "Sanjay Shrestha",
    job: "Restaurant Owner - Kathmandu",
    image: "/people/man1.jpg",
    review:
      "This platform has made the ordering system at my restaurant much easier. It has improved the customer experience and made staff work more efficient. I'm highly satisfied.",
  },
  {
    name: "Anita Chaudhary",
    job: "Hotel Manager - Dhangadhi",
    image: "/people/woman1.jpg",
    review:
      "This app has simplified everything from menu management to table reservations in our hotel. It changed our mindset about technology being difficult to use.",
  },
  {
    name: "Bijay Thapa",
    job: "Chef - Pokhara",
    image: "/people/man2.jpg",
    review:
      "Now that orders come clearly and quickly into the kitchen, our work is more organized. Digital receipts and updates have been a big help.",
  },
  {
    name: "Nisha Gurung",
    job: "Café Owner - Lalitpur",
    image: "/people/woman2.jpg",
    review:
      "It’s become easier to communicate with customers. Notifications, coupons, and digital payments all in one place is a great feature.",
  },
  {
    name: "Ramesh Adhikari",
    job: "POS Operator - Biratnagar",
    image: "/people/man3.jpg",
    review:
      "The POS system is very user-friendly. All data is visible on a single dashboard and reports can be accessed easily. It’s easy for new users too.",
  },
  {
    name: "Pratiksha KC",
    job: "Bakery Manager - Butwal",
    image: "/people/woman3.jpg",
    review:
      "After implementing the loyalty and reward system, we've seen an increase in returning customers. The app also enhances our branding.",
  },
  {
    name: "Kiran Lama",
    job: "Waiter - Bhaktapur",
    image: "/people/man4.jpg",
    review:
      "Being able to view and update orders through mobile has improved coordination among staff. Our trust in technology has increased.",
  },
];
