import { Globe, Rocket, Zap } from "lucide-react";

export interface Package {
  name: string;
  price: number;
  pricePrefix?: string;
  description: string;
  icon: typeof Globe;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
  ctaLink: string;
  consultationNote?: string;
  supportingNote?: string;
  intakeLink?: string;
}

export const CALENDLY = "https://calendly.com/onyxai-contact/onyx-consultation";
export const STARTER_PAYMENT_LINK = "https://buy.stripe.com/6oU6oG5PZ2U66lL2qX1RC03";

export const packages: Package[] = [
  {
    name: "Starter",
    price: 100,
    description: "Clean, modern website for your business or idea. Best for a simple professional online presence.",
    icon: Globe,
    cta: "Pay & Start",
    ctaLink: STARTER_PAYMENT_LINK,
    consultationNote: "Prefer to talk first? Book a consultation",
    features: [
      "Up to 3 pages",
      "Responsive design",
      "Content upload",
      "Up to 2 feature integrations",
      "Opt-in form",
      "Speed optimization",
      "Social media icons",
      "Revisions during active build phase",
      "5-day delivery",
    ],
  },
  {
    name: "Business",
    price: 350,
    pricePrefix: "Starting at",
    description: "Professional multi-page website with key features to grow your business online.",
    icon: Rocket,
    highlighted: true,
    badge: "Most Popular",
    cta: "Book a Consultation",
    ctaLink: CALENDLY,
    intakeLink: "/project-intake?package=Business",
    supportingNote: "Business projects start at $350. Final scope depends on features, pages, timeline, and add-ons.",
    features: [
      "Up to 5 pages",
      "Responsive design",
      "Content upload",
      "Up to 5 feature integrations",
      "Opt-in form",
      "Autoresponder integration",
      "Speed optimization",
      "Social media icons",
      "Revisions during active build phase",
      "7-day delivery",
    ],
  },
  {
    name: "Advanced Website / Web App",
    price: 650,
    pricePrefix: "Starting at",
    description: "Advanced website or web app with stronger customization, payments, and higher-end integrations.",
    icon: Zap,
    cta: "Book a Consultation",
    ctaLink: CALENDLY,
    intakeLink: "/project-intake?package=Advanced",
    supportingNote: "Advanced projects start at $650 and are reviewed before kickoff to confirm scope, complexity, and deliverables.",
    features: [
      "Up to 8 pages",
      "Responsive design",
      "Content upload",
      "Up to 10 feature integrations",
      "Payment integration",
      "E-commerce or booking system",
      "Up to 10 products",
      "Autoresponder integration",
      "Hosting setup",
      "Speed optimization",
      "Social media icons",
      "Revisions during active build phase",
      "14-day delivery",
      "More advanced functionality may require consultation and custom scope confirmation",
    ],
  },
];

export interface Extra {
  name: string;
  price: string;
  description: string;
}

export const extras: Extra[] = [
  { name: "Additional Page", price: "$20", description: "Expand your site with professionally designed pages" },
  { name: "Additional Plugin / Feature Install", price: "$20", description: "Install and configure an additional plugin or feature" },
  { name: "Additional Product", price: "$10", description: "Add an extra product to your store catalog" },
  { name: "Payment Integration", price: "$65", description: "Stripe or PayPal checkout configured for your site" },
  { name: "E-commerce Functionality", price: "$65", description: "Cart, checkout, and product management setup" },
  { name: "Booking / Calendly Setup", price: "$40", description: "Embed and configure booking or scheduling flows" },
  { name: "Autoresponder / Email Automation", price: "$40", description: "Automated email sequences for new leads" },
  { name: "Hosting Setup", price: "$40", description: "Domain, hosting, and deployment configuration" },
  { name: "Logo Design", price: "$75", description: "A custom logo with two refined concepts to choose from" },
  { name: "Brand Kit", price: "$60", description: "Complete brand identity — logo, colors, fonts, and guidelines" },
  { name: "Copywriting", price: "$50", description: "Conversion-focused copy written for your audience" },
  { name: "Custom Animations", price: "$50", description: "Premium motion design and interactive transitions" },
  { name: "AI Chatbot Integration", price: "$125", description: "Intelligent chatbot for lead capture and support" },
  { name: "Monthly Maintenance", price: "$30/month", description: "Ongoing updates, backups, and security monitoring" },
  { name: "Rush Delivery", price: "$75", description: "Accelerated timeline — deliver your project faster" },
];
