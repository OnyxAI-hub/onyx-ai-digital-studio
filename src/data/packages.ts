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
}

export const CALENDLY = "https://calendly.com/onyxai-contact/onyx-consultation";
export const STARTER_PAYMENT_LINK = "https://buy.stripe.com/6oU6oG5PZ2U66lL2qX1RC03";

export const packages: Package[] = [
  {
    name: "Starter",
    price: 150,
    description: "A clean, professional website to establish your online presence and start attracting clients.",
    icon: Globe,
    cta: "Pay & Start",
    ctaLink: STARTER_PAYMENT_LINK,
    consultationNote: "Prefer to talk first? Book a consultation",
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
    price: 300,
    pricePrefix: "Starting at",
    description: "For growing brands that need a stronger digital presence, custom design, and more functionality.",
    icon: Rocket,
    highlighted: true,
    badge: "Most Popular",
    cta: "Book a Consultation",
    ctaLink: CALENDLY,
    consultationNote: "Need help deciding? Book a consultation",
    supportingNote: "Business projects start at $300. Final scope depends on features, pages, timeline, and add-ons.",
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
    price: 500,
    pricePrefix: "Starting at",
    description: "Custom-built web apps, dashboards, and automation — scoped to your exact business needs.",
    icon: Zap,
    cta: "Book a Consultation",
    ctaLink: CALENDLY,
    consultationNote: "Want to discuss scope first? Book a consultation",
    supportingNote: "Advanced projects start at $500 and are reviewed before kickoff to confirm scope, complexity, and deliverables.",
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
  { name: "Additional Page", price: "$20", description: "Expand your site with professionally designed pages" },
  { name: "Additional Plugin / Feature Install", price: "$15", description: "Install and configure an additional plugin or feature" },
  { name: "Additional Product", price: "$10", description: "Add an extra product to your store catalog" },
  { name: "Payment Integration", price: "$50", description: "Stripe or PayPal checkout configured for your site" },
  { name: "E-commerce Functionality", price: "$50", description: "Cart, checkout, and product management setup" },
  { name: "Booking / Calendly Setup", price: "$25", description: "Embed and configure booking or scheduling flows" },
  { name: "Autoresponder / Email Automation", price: "$30", description: "Automated email sequences for new leads" },
  { name: "Hosting Setup", price: "$25", description: "Domain, hosting, and deployment configuration" },
  { name: "Logo Design", price: "$75", description: "A custom logo with two refined concepts to choose from" },
  { name: "Brand Kit", price: "$60", description: "Complete brand identity — logo, colors, fonts, and guidelines" },
  { name: "Copywriting", price: "$50", description: "Conversion-focused copy written for your audience" },
  { name: "Custom Animations", price: "$50", description: "Premium motion design and interactive transitions" },
  { name: "AI Chatbot Integration", price: "$125", description: "Intelligent chatbot for lead capture and support" },
  { name: "Monthly Maintenance", price: "$30/month", description: "Ongoing updates, backups, and security monitoring" },
  { name: "Rush Delivery", price: "$75", description: "Accelerated timeline — deliver your project faster" },
];
