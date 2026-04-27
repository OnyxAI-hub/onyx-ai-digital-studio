import { Globe, Rocket, Zap, PhoneCall } from "lucide-react";

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
    name: "Business Website",
    price: 350,
    pricePrefix: "Starting at",
    description: "Professional multi-page website designed to help your business look credible, explain your services clearly, and make it easier for customers to contact you.",
    icon: Rocket,
    cta: "Book a Consultation",
    ctaLink: CALENDLY,
    intakeLink: "/project-intake?package=Business",
    features: [
      "Up to 5 pages",
      "Responsive design",
      "Content upload",
      "Service sections",
      "Contact / request form",
      "Basic SEO structure",
      "Speed optimization",
      "Social media links",
      "Revisions during active build phase",
      "7-day delivery",
    ],
  },
  {
    name: "Advanced Website / Web App",
    price: 650,
    pricePrefix: "Starting at",
    description: "Advanced website or web app with stronger customization, payments, booking, automation, and higher-end functionality.",
    icon: Zap,
    highlighted: true,
    badge: "Most Popular",
    cta: "Book a Consultation",
    ctaLink: CALENDLY,
    intakeLink: "/project-intake?package=Advanced",
    features: [
      "Up to 8 pages",
      "Responsive design",
      "Content upload",
      "Payment integration",
      "Booking or request system",
      "E-commerce or product setup",
      "Autoresponder / email automation",
      "Hosting setup support",
      "Speed optimization",
      "Revisions during active build phase",
      "14-day delivery",
      "Custom scope confirmation required",
    ],
  },
  {
    name: "AI Voice Agent Setup",
    price: 500,
    pricePrefix: "Starting at",
    description: "AI voice agent setup for businesses that want a smarter way to answer calls, capture customer details, and route service requests.",
    icon: PhoneCall,
    cta: "Book a Consultation",
    ctaLink: CALENDLY,
    intakeLink: "/project-intake?package=AI%20Voice%20Agent",
    supportingNote: "AI voice agent pricing may vary depending on call volume, platform costs, phone number setup, and requested workflow complexity.",
    features: [
      "AI phone assistant setup",
      "Custom call script / call flow",
      "Business FAQ training",
      "Lead capture questions",
      "Service request intake",
      "Call summary workflow",
      "Missed-call support flow",
      "Basic handoff instructions",
      "Testing and launch support",
      "Usage and platform costs may vary",
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
