import { Globe, Layout, Code, BarChart3, CalendarCheck, CreditCard, Bot, Cog, Smartphone } from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: typeof Globe;
  features: string[];
}

export const coreServices: Service[] = [
  {
    title: "Business Websites",
    description: "Professional, responsive websites designed to showcase your brand and convert visitors into customers.",
    icon: Globe,
    features: ["Custom Design", "Mobile-Responsive", "SEO Optimized", "Fast Loading"],
  },
  {
    title: "Landing Pages",
    description: "High-converting landing pages built to capture leads and drive specific business actions.",
    icon: Layout,
    features: ["Conversion-Focused", "A/B Ready", "Analytics Integrated", "Fast Turnaround"],
  },
  {
    title: "Web Applications",
    description: "Custom web apps with dynamic features, user authentication, and real-time functionality.",
    icon: Code,
    features: ["Custom Features", "User Dashboards", "Real-Time Data", "Scalable Architecture"],
  },
  {
    title: "Dashboards & Admin Panels",
    description: "Data-driven dashboards that give you full control and visibility over your business operations.",
    icon: BarChart3,
    features: ["Data Visualization", "Role-Based Access", "Real-Time Updates", "Custom Reports"],
  },
  {
    title: "Booking & Scheduling Systems",
    description: "Online booking systems that let your clients schedule appointments and services with ease.",
    icon: CalendarCheck,
    features: ["Calendar Integration", "Email Reminders", "Payment Collection", "Client Management"],
  },
  {
    title: "Payment Integrations",
    description: "Secure payment processing so you can accept payments online with confidence.",
    icon: CreditCard,
    features: ["Stripe / PayPal", "Invoicing", "Subscription Billing", "PCI Compliant"],
  },
  {
    title: "Automation & Workflows",
    description: "Automate repetitive tasks and streamline your business processes to save time and money.",
    icon: Cog,
    features: ["Email Automation", "CRM Integration", "Task Automation", "Custom Workflows"],
  },
  {
    title: "AI Chatbots",
    description: "Intelligent chatbots that qualify leads, answer FAQs, and engage visitors 24/7.",
    icon: Bot,
    features: ["Lead Qualification", "FAQ Handling", "24/7 Availability", "Custom Responses"],
  },
];

export const featuredServices = coreServices.slice(0, 6);
