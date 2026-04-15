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
}

const CALENDLY = "https://calendly.com/onyxai-contact/onyx-consultation";

export const packages: Package[] = [
  {
    name: "Starter",
    price: 250,
    description: "A clean, professional website to establish your online presence and start attracting clients.",
    icon: Globe,
    cta: "Pay & Start",
    ctaLink: "https://buy.stripe.com/aFa8wOa6f66i4dD4z51RC00",
    features: [
      "1–3 Page Responsive Website",
      "Mobile-Friendly Design",
      "Basic SEO Setup",
      "Contact Form Integration",
      "1 Round of Revisions",
      "2-Week Delivery",
    ],
  },
  {
    name: "Business",
    price: 750,
    pricePrefix: "Starting at",
    description: "For growing brands that need a stronger digital presence, custom design, and more functionality.",
    icon: Rocket,
    highlighted: true,
    badge: "Most Popular",
    cta: "Book a Consultation",
    ctaLink: CALENDLY,
    features: [
      "Up to 7 Pages",
      "Custom UI/UX Design",
      "Advanced SEO & Analytics",
      "Blog or Portfolio Section",
      "Social Media Integration",
      "3 Rounds of Revisions",
      "Priority Support",
      "3-Week Delivery",
    ],
  },
  {
    name: "Advanced",
    price: 1500,
    pricePrefix: "Starting at",
    description: "Custom-built web apps, dashboards, and automation — scoped to your exact business needs.",
    icon: Zap,
    cta: "Book a Consultation",
    ctaLink: CALENDLY,
    features: [
      "Unlimited Pages",
      "Custom Web App Features",
      "E-Commerce or Booking System",
      "Dashboard & Admin Panel",
      "Payment Integration",
      "API Integrations",
      "5 Rounds of Revisions",
      "30-Day Post-Launch Support",
      "4-Week Delivery",
    ],
  },
];

export interface Extra {
  name: string;
  price: string;
  description: string;
}

export const extras: Extra[] = [
  { name: "Additional Page", price: "$50/page", description: "Expand your site with professionally designed pages" },
  { name: "Logo Design", price: "$75", description: "A custom logo with two refined concepts to choose from" },
  { name: "Brand Kit", price: "$120", description: "Complete brand identity — logo, colors, fonts, and guidelines" },
  { name: "Copywriting", price: "$80/page", description: "Conversion-focused copy written for your audience" },
  { name: "Monthly Maintenance", price: "$50/mo", description: "Ongoing updates, backups, and security monitoring" },
  { name: "Rush Delivery", price: "$150", description: "Accelerated timeline — deliver your project 50% faster" },
  { name: "AI Chatbot Integration", price: "$200", description: "Intelligent chatbot for lead capture and support" },
  { name: "Email Marketing Setup", price: "$100", description: "Newsletter infrastructure and automation workflows" },
  { name: "Custom Animations", price: "$100", description: "Premium motion design and interactive transitions" },
];
