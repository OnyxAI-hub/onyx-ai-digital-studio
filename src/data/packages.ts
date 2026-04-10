import { Globe, Rocket, Zap } from "lucide-react";

export interface Package {
  name: string;
  price: number;
  description: string;
  icon: typeof Globe;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export const packages: Package[] = [
  {
    name: "Starter",
    price: 250,
    description: "Perfect for small businesses that need a professional online presence fast.",
    icon: Globe,
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
    price: 550,
    description: "For growing businesses that need more functionality and polish.",
    icon: Rocket,
    highlighted: true,
    badge: "Most Popular",
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
    price: 1100,
    description: "Full-scale web solutions with custom features and ongoing support.",
    icon: Zap,
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
  { name: "Additional Page", price: "$50/page", description: "Extra pages beyond your package limit" },
  { name: "Logo Design", price: "$75", description: "Professional logo with 2 concepts" },
  { name: "Brand Kit", price: "$120", description: "Logo, colors, fonts, and brand guidelines" },
  { name: "Copywriting", price: "$80/page", description: "Professional website copy that converts" },
  { name: "Monthly Maintenance", price: "$50/mo", description: "Updates, backups, and security patches" },
  { name: "Rush Delivery", price: "$150", description: "Get your project delivered 50% faster" },
  { name: "AI Chatbot Integration", price: "$200", description: "Custom chatbot for lead capture" },
  { name: "Email Marketing Setup", price: "$100", description: "Newsletter and automation setup" },
  { name: "Custom Animations", price: "$100", description: "Premium motion design and transitions" },
];
