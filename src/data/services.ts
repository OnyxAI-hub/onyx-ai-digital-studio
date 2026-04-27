import { Globe, Code, PhoneCall, Cog, CreditCard, LifeBuoy } from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: typeof Globe;
  features: string[];
}

export const coreServices: Service[] = [
  {
    title: "Business Websites",
    description: "Clean, professional websites built to explain your services, build trust, and make it easier for customers to contact you.",
    icon: Globe,
    features: ["Service Pages", "Mobile-Friendly", "Contact Forms", "Speed Optimized"],
  },
  {
    title: "Advanced Websites / Web Apps",
    description: "Custom websites and web apps with booking, payments, intake forms, dashboards, or more advanced business functionality.",
    icon: Code,
    features: ["Custom Functionality", "Booking & Payments", "Intake Flows", "Dashboards"],
  },
  {
    title: "AI Agent Setup",
    description: "AI voice or chat assistants that help answer questions, collect customer details, summarize requests, and support service-based businesses.",
    icon: PhoneCall,
    features: ["Voice or Chat Agents", "FAQ Training", "Lead Capture", "Call & Chat Summaries"],
  },
  {
    title: "Business Automation",
    description: "Automated workflows for customer intake, lead alerts, booking, notifications, follow-ups, and internal processes.",
    icon: Cog,
    features: ["Lead Capture", "Follow-Ups", "Notifications", "Internal Workflows"],
  },
  {
    title: "Payment & Booking Flows",
    description: "Stripe, Calendly, booking, request forms, and customer flow setup to help businesses accept inquiries and payments faster.",
    icon: CreditCard,
    features: ["Stripe Setup", "Calendly Integration", "Request Forms", "Customer Flows"],
  },
  {
    title: "Ongoing Support",
    description: "Maintenance, updates, support, and system improvements available after launch.",
    icon: LifeBuoy,
    features: ["Updates & Fixes", "Automation Tweaks", "System Improvements", "Monthly Plans"],
  },
];

export const featuredServices = coreServices.slice(0, 6);
