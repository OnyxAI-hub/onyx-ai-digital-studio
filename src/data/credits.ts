import {
  Image as ImageIcon,
  Sparkles,
  Video,
  Mic,
  Music2,
  MessageSquare,
  Globe,
  Bot,
  Zap,
  Rocket,
  Crown,
  Gem,
} from "lucide-react";

export interface CreditPlan {
  name: string;
  monthly: number;
  annualMonthly: number;
  credits: string;
  popular?: boolean;
  icon: typeof Rocket;
  features: string[];
  cta: string;
  intakeType: string;
}

export const creditPlans: CreditPlan[] = [
  {
    name: "Free",
    monthly: 0,
    annualMonthly: 0,
    credits: "300 credits / month",
    icon: Sparkles,
    cta: "Start Free",
    intakeType: "Monthly Subscription",
    features: [
      "1 concurrent request",
      "500MB storage",
      "5 free assistant turns/day",
      "Limited model access",
      "Community feed access",
      "No commercial usage",
    ],
  },
  {
    name: "Starter",
    monthly: 4,
    annualMonthly: 3,
    credits: "5,000 credits / month",
    icon: Rocket,
    cta: "Start Starter",
    intakeType: "Monthly Subscription",
    features: [
      "2 concurrent creations / requests",
      "10GB storage",
      "5 free EBA turns per day",
      "Standard image generation access",
      "Basic prompt & content support",
      "Request-based creative fulfillment",
      "Access to free models when available",
    ],
  },
  {
    name: "Basic",
    monthly: 9,
    annualMonthly: 7.33,
    credits: "11,000 credits / month",
    icon: Zap,
    cta: "Start Basic",
    intakeType: "Monthly Subscription",
    features: [
      "3 concurrent creations / requests",
      "20GB storage",
      "10 free EBA turns per day",
      "Image generation access",
      "Basic video request access",
      "Social content support",
      "Request-based creative fulfillment",
    ],
  },
  {
    name: "Premium",
    monthly: 21,
    annualMonthly: 15.67,
    credits: "25,000 credits / month",
    popular: true,
    icon: Sparkles,
    cta: "Start Premium",
    intakeType: "Monthly Subscription",
    features: [
      "5 concurrent creations / requests",
      "40GB storage",
      "15 free EBA turns per day",
      "Image & video request access",
      "Music visualizer concepts",
      "Promo video concepts",
      "Brand & social content support",
      "Priority request handling",
    ],
  },
  {
    name: "Pro",
    monthly: 54,
    annualMonthly: 40.25,
    credits: "60,000 credits / month",
    icon: Crown,
    cta: "Start Pro",
    intakeType: "Monthly Subscription",
    features: [
      "7 concurrent creations / requests",
      "50GB storage",
      "25 free EBA turns per day",
      "5% bonus on credit packs",
      "Image / video / audio request access",
      "Brand asset & promo video support",
      "Music visualizer support",
      "Priority creative requests",
      "Model discounts when available",
    ],
  },
  {
    name: "Ultra",
    monthly: 124,
    annualMonthly: 86.5,
    credits: "130,000 credits / month",
    icon: Gem,
    cta: "Start Ultra",
    intakeType: "Monthly Subscription",
    features: [
      "10 concurrent creations / requests",
      "60GB storage",
      "30 free EBA turns per day",
      "10% bonus on credit packs",
      "Premium image / video / audio access",
      "Larger creative batches",
      "Music visualizers & promo campaigns",
      "Brand asset support",
      "Priority support",
      "Model discounts when available",
    ],
  },
];

export interface CreditPack {
  name: string;
  price: number;
  credits: string;
  creditsNumeric: string;
  bestFor: string;
  cta: string;
  featured?: boolean;
}

export const creditPacks: CreditPack[] = [
  {
    name: "Starter Credit Pack",
    price: 25,
    credits: "5,000 credits",
    creditsNumeric: "5,000",
    bestFor: "Testing ideas, image concepts, cover art drafts, and small creative requests.",
    cta: "Buy 5,000 Credits",
  },
  {
    name: "Creator Credit Pack",
    price: 75,
    credits: "20,000 credits",
    creditsNumeric: "20,000",
    bestFor: "Image sets, cover concepts, social visuals, content ideas, and creative batches.",
    cta: "Buy 20,000 Credits",
  },
  {
    name: "Studio Credit Pack",
    price: 150,
    credits: "50,000 credits",
    creditsNumeric: "50,000",
    bestFor: "Larger creative batches, promo concepts, visualizer ideas, brand assets, and short video requests.",
    cta: "Buy 50,000 Credits",
  },
  {
    name: "Pro Credit Pack",
    price: 300,
    credits: "110,000 credits",
    creditsNumeric: "110,000",
    bestFor: "High-volume creators, video-heavy requests, promo campaigns, brand assets, and larger AI creative workflows.",
    cta: "Buy 110,000 Credits",
    featured: true,
  },
  {
    name: "Ultimate Credit Pack",
    price: 500,
    credits: "500,000 credits",
    creditsNumeric: "500,000",
    bestFor: "Studios, teams, and agencies running heavy creative and video production workloads.",
    cta: "Buy 500,000 Credits",
  },
];

export interface ModelCategory {
  title: string;
  description: string;
  cost: string;
  icon: typeof ImageIcon;
  intakeType: string;
}

export const modelCategories: ModelCategory[] = [
  {
    title: "AI Image Generation",
    description: "Images, cover art, product visuals, concept art, and campaign visuals.",
    cost: "From 5 credits",
    icon: ImageIcon,
    intakeType: "AI Image Creation",
  },
  {
    title: "HD / Premium Image Generation",
    description: "Higher-quality creative images, polished cover concepts, and premium assets.",
    cost: "From 15 credits",
    icon: Sparkles,
    intakeType: "AI Image Creation",
  },
  {
    title: "AI Video Generation",
    description: "Short AI video clips, promo concepts, visual loops, and motion assets.",
    cost: "From 500 credits",
    icon: Video,
    intakeType: "AI Video Generation",
  },
  {
    title: "AI Audio / Voice",
    description: "Voiceovers, audio concepts, creative audio support, and narration.",
    cost: "From 10 credits",
    icon: Mic,
    intakeType: "Custom AI Request",
  },
  {
    title: "Music Visualizers",
    description: "Looping visuals, lo-fi visuals, album promo clips, and short-form music content.",
    cost: "From 75 credits",
    icon: Music2,
    intakeType: "Music Visualizer",
  },
  {
    title: "AI Chat / Text Support",
    description: "Content ideas, scripts, captions, copywriting, brand messaging, and prompts.",
    cost: "From 2 credits",
    icon: MessageSquare,
    intakeType: "Custom AI Request",
  },
  {
    title: "Website / Landing Page Requests",
    description: "Submit a website, landing page, web app, or business system request.",
    cost: "Consultation or custom quote",
    icon: Globe,
    intakeType: "Website / Landing Page",
  },
  {
    title: "Automation / AI Agent Requests",
    description: "Request AI agents, intake systems, workflows, lead tracking, and automation.",
    cost: "Consultation or custom quote",
    icon: Bot,
    intakeType: "Automation System",
  },
];

export const creditCostRows: { type: string; use: string; cost: string }[] = [
  { type: "Chat / Text / Prompt Help", use: "Captions, scripts, ideas, copy, prompts", cost: "2–5 credits" },
  { type: "Standard Image", use: "Simple image, cover draft, concept image", cost: "5–10 credits" },
  { type: "Premium Image", use: "Polished cover art, brand visual, product visual", cost: "15–25 credits" },
  { type: "HD / 4K Image", use: "Hero visuals, posters, large prints", cost: "25–50 credits" },
  { type: "Audio / Voice", use: "Voiceover, narration, audio support (varies by length)", cost: "10–50 credits" },
  { type: "Music Visualizer Concept", use: "Looping visual, album visual, music promo", cost: "75+ credits" },
  { type: "Fast Video — 5 / 10 / 15 sec", use: "Quick motion concepts", cost: "300 / 600 / 900 credits" },
  { type: "Standard Video — 5 / 10 / 15 sec", use: "Social clips, promos, visual ideas", cost: "500 / 1,000 / 1,500 credits" },
  { type: "Premium Video — 5 / 10 / 15 sec", use: "Cinematic or polished promotional visuals", cost: "750 / 1,500 / 2,250 credits" },
  { type: "Ultra Video — 5 / 10 / 15 sec", use: "High-detail premium creative direction", cost: "1,000 / 2,000 / 3,000 credits" },
  { type: "Custom / Multi-Asset Request", use: "Multi-asset request, campaign, brand package", cost: "Custom quote" },
];

export interface OneTimeService {
  title: string;
  price: string;
  description: string;
  intakeType: string;
}

export const oneTimeServices: OneTimeService[] = [
  {
    title: "Websites & Web Apps",
    price: "Starting at $400",
    description: "Websites, landing pages, web apps, booking flows, payment flows, customer intake, and dashboards.",
    intakeType: "Website / Landing Page",
  },
  {
    title: "AI Creative Requests",
    price: "Starting at $25",
    description: "AI images, cover art concepts, product visuals, social media graphics, and custom creative requests.",
    intakeType: "AI Image Creation",
  },
  {
    title: "Promo Videos & Visualizers",
    price: "Starting at $75",
    description: "Short promo videos, music visualizers, Reels / TikTok concepts, and branded video content.",
    intakeType: "AI Promo Video",
  },
  {
    title: "AI Agent Setup",
    price: "Starting at $500",
    description: "Voice agents, chat agents, customer intake assistants, FAQ assistants, and lead capture agents.",
    intakeType: "AI Agent Setup",
  },
  {
    title: "Automation Systems",
    price: "Starting at $250",
    description: "Booking / payment flows, lead tracking, outreach systems, follow-up automation, and customer workflows.",
    intakeType: "Automation System",
  },
  {
    title: "Monthly Support",
    price: "Starting at $50/month",
    description: "Ongoing website updates, content support, automation support, AI agent support, and system improvements.",
    intakeType: "Monthly Support",
  },
];

export const PROJECT_TYPE_OPTIONS = [
  "Website / Landing Page",
  "Web App / Business System",
  "AI Image Creation",
  "AI Video Generation",
  "AI Promo Video",
  "Music Visualizer",
  "Cover Art / Brand Visual",
  "Branding / Logo Concepts",
  "AI Agent Setup",
  "Automation System",
  "Social Content Pack",
  "Creative Credit Pack",
  "Monthly Subscription",
  "Monthly Support",
  "Custom AI Request",
  "Not Sure Yet",
  "Other",
] as const;
