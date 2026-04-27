import { Globe, Rocket, Zap } from "lucide-react";

export interface Package {
  name: string;
  price: number;
  priceMax?: number;
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
export const STARTER_PAYMENT_LINK = "https://buy.stripe.com/28E8wOfqz2U6bG55D91RC06";
export const BUSINESS_PAYMENT_LINK = "https://buy.stripe.com/bJecN4emv8eq9xX5D91RC07";
export const ADVANCED_PAYMENT_LINK = "https://buy.stripe.com/eVq14mfqz2U611r5D91RC08";

export const packages: Package[] = [
  {
    name: "Starter",
    price: 100,
    description: "Clean, modern website for your business idea. Best for a simple, professional online presence.",
    icon: Globe,
    cta: "Get Started",
    ctaLink: "/contact",
    features: [
      "Up to 3 pages",
      "Mobile responsive design",
      "Contact form",
      "Social media icons",
      "Hosting setup",
    ],
  },
  {
    name: "Business",
    price: 350,
    priceMax: 800,
    pricePrefix: "Starting at",
    description: "Professional multi-page website with key features to grow your business online.",
    icon: Rocket,
    highlighted: true,
    badge: "Most Popular",
    cta: "Book a Free Consultation",
    ctaLink: CALENDLY,
    intakeLink: "/project-intake?package=Business",
    supportingNote: "Business projects start at $350. Final scope depends on features, pages, timeline, and add-ons.",
    features: [
      "Up to 5 pages",
      "Automation workflows",
      "Booking system",
      "Email auto-replies",
      "Payment integration",
      "SEO setup",
      "Social media icons",
    ],
  },
  {
    name: "Advanced",
    price: 600,
    priceMax: 1500,
    pricePrefix: "Starting at",
    description: "Top-tier website or web app with AI chatbot, full automation, booking, and ecommerce capabilities.",
    icon: Zap,
    cta: "Book a Free Consultation",
    ctaLink: CALENDLY,
    intakeLink: "/project-intake?package=Advanced",
    supportingNote: "Advanced projects start at $600 and are reviewed before kickoff to confirm scope, complexity, and deliverables.",
    features: [
      "Up to 8 pages",
      "AI chatbot integration",
      "Advanced automation workflows",
      "Ecommerce (up to 10 products)",
      "Opt-in forms",
      "Priority support",
      "Hosting setup",
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
