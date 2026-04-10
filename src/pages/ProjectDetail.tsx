import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X, Maximize2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AnimatedSection from "@/components/shared/AnimatedSection";
import BrowserFrame from "@/components/portfolio/BrowserFrame";

// Mockups
import NutrifitHomepage from "@/components/portfolio/mockups/NutrifitHomepage";
import NutrifitProduct from "@/components/portfolio/mockups/NutrifitProduct";
import NutrifitCheckout from "@/components/portfolio/mockups/NutrifitCheckout";
import PrimeshineLanding from "@/components/portfolio/mockups/PrimeshineLanding";
import PrimeshineBooking from "@/components/portfolio/mockups/PrimeshineBooking";
import PrimeshineQuote from "@/components/portfolio/mockups/PrimeshineQuote";
import FitnessDashboard from "@/components/portfolio/mockups/FitnessDashboard";
import FitnessSchedule from "@/components/portfolio/mockups/FitnessSchedule";
import FitnessProfile from "@/components/portfolio/mockups/FitnessProfile";
import { ReactNode } from "react";

interface MockupScreen {
  label: string;
  url: string;
  component: ReactNode;
}

interface ProjectData {
  slug: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  features: { title: string; desc: string }[];
  tags: string[];
  screens: MockupScreen[];
}

const projectsData: ProjectData[] = [
  {
    slug: "nutrifit-wellness",
    title: "NutriFit Wellness",
    category: "E-Commerce & Health",
    description: "A modern e-commerce platform for a wellness brand, featuring product catalogs, online ordering, and a nutrition blog. Built for speed, conversion, and brand authority.",
    overview: "NutriFit Wellness needed a digital storefront that matched the quality of their products — clean, fast, and built to convert browsers into buyers. We designed and developed a complete e-commerce experience from the ground up, with a focus on mobile performance, seamless checkout, and content-driven SEO to drive organic traffic.",
    features: [
      { title: "Product Catalog", desc: "Filterable product grid with detailed pages, nutritional info, and customer reviews." },
      { title: "Secure Checkout", desc: "Stripe-powered payment processing with cart management and order confirmation." },
      { title: "Nutrition Blog", desc: "SEO-optimized content hub to drive organic traffic and build brand authority." },
      { title: "Mobile-First Design", desc: "Fully responsive layout optimized for mobile shopping and fast load times." },
      { title: "Inventory Management", desc: "Real-time stock tracking with low-inventory alerts and automated updates." },
      { title: "Analytics Dashboard", desc: "Integrated sales and traffic analytics for data-driven business decisions." },
    ],
    tags: ["React", "Tailwind CSS", "Stripe", "SEO", "E-Commerce", "CMS"],
    screens: [
      { label: "Homepage", url: "nutrifit-wellness.com", component: <NutrifitHomepage /> },
      { label: "Product Page", url: "nutrifit-wellness.com/products/protein-blend", component: <NutrifitProduct /> },
      { label: "Checkout", url: "nutrifit-wellness.com/checkout", component: <NutrifitCheckout /> },
    ],
  },
  {
    slug: "primeshine-cleaning",
    title: "PrimeShine Cleaning Co.",
    category: "Service Business",
    description: "Professional website with online booking, service area maps, and an instant quote calculator. Designed to convert visitors into booked appointments.",
    overview: "PrimeShine needed more than a brochure site — they needed a booking engine. We built a conversion-focused platform that lets customers explore services, check availability in their area, get an instant estimate, and book directly online. The result: a 3x increase in online bookings within the first month.",
    features: [
      { title: "Online Booking System", desc: "Calendar-based scheduling with real-time availability and confirmation emails." },
      { title: "Instant Quote Calculator", desc: "Interactive estimator based on property size, service type, and frequency." },
      { title: "Service Area Map", desc: "Interactive map showing coverage zones with ZIP code validation." },
      { title: "Responsive Design", desc: "Pixel-perfect layout across all devices, optimized for mobile-first browsing." },
      { title: "Review Integration", desc: "Google Reviews feed displaying real client testimonials and ratings." },
      { title: "SEO & Local Search", desc: "Optimized for local search results to capture high-intent service queries." },
    ],
    tags: ["React", "TypeScript", "Booking System", "Responsive", "Maps API", "SEO"],
    screens: [
      { label: "Landing Page", url: "primeshinecleaning.com", component: <PrimeshineLanding /> },
      { label: "Booking Flow", url: "primeshinecleaning.com/book", component: <PrimeshineBooking /> },
      { label: "Quote Calculator", url: "primeshinecleaning.com/quote", component: <PrimeshineQuote /> },
    ],
  },
  {
    slug: "quality-fitness-club",
    title: "Quality Fitness Club",
    category: "Dashboard & Web App",
    description: "Member management dashboard with class scheduling, payment tracking, and engagement analytics. A complete digital toolkit for gym operations.",
    overview: "Quality Fitness Club was running their operations across spreadsheets and paper sign-up sheets. We built a centralized dashboard that handles member management, class scheduling, payment tracking, and engagement analytics — giving staff a single source of truth and members a seamless digital experience.",
    features: [
      { title: "Member Management", desc: "Complete member profiles with attendance history, plan details, and contact info." },
      { title: "Class Scheduling", desc: "Drag-and-drop calendar for class creation, instructor assignment, and capacity limits." },
      { title: "Payment Tracking", desc: "Automated billing with payment history, overdue alerts, and revenue reporting." },
      { title: "Engagement Analytics", desc: "Visual dashboards tracking attendance trends, retention rates, and growth metrics." },
      { title: "Member Portal", desc: "Self-service portal for members to book classes, update info, and view history." },
      { title: "Notification System", desc: "Automated email and SMS reminders for classes, payments, and announcements." },
    ],
    tags: ["React", "Supabase", "Dashboard", "Analytics", "Auth", "Real-time"],
    screens: [
      { label: "Dashboard Overview", url: "app.qualityfitnessclub.com/dashboard", component: <FitnessDashboard /> },
      { label: "Class Schedule", url: "app.qualityfitnessclub.com/schedule", component: <FitnessSchedule /> },
      { label: "Member Profile", url: "app.qualityfitnessclub.com/members/alex-torres", component: <FitnessProfile /> },
    ],
  },
];

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/portfolio" replace />;

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedSection>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" /> Back to Portfolio
            </Link>
            <span className="mb-3 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{project.category}</span>
            <h1 className="font-display text-4xl font-bold md:text-5xl tracking-tight">{project.title}</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground">{tag}</span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Screen Previews */}
      <section className="pb-20 px-4">
        <div className="container-narrow">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold tracking-tight mb-8">Project Screens</h2>
          </AnimatedSection>
          <div className="grid gap-8 md:grid-cols-3">
            {project.screens.map((screen, i) => (
              <AnimatedSection key={screen.label} delay={i * 0.1}>
                <div
                  className="group cursor-pointer"
                  onClick={() => setLightboxIdx(i)}
                >
                  <BrowserFrame url={screen.url}>
                    <div className="relative overflow-hidden max-h-[320px]">
                      {screen.component}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-card/90 backdrop-blur-sm border border-border/60 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium shadow-lg">
                          <Maximize2 className="h-4 w-4" /> View Full Screen
                        </div>
                      </div>
                    </div>
                  </BrowserFrame>
                  <p className="mt-3 text-center text-sm font-medium text-muted-foreground">{screen.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={lightboxIdx !== null} onOpenChange={() => setLightboxIdx(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-background border-border/60 overflow-hidden">
          {lightboxIdx !== null && (
            <>
              <div className="p-4 pb-0 flex items-center justify-between">
                <p className="text-sm font-semibold">{project.screens[lightboxIdx].label}</p>
              </div>
              <div className="p-4">
                <BrowserFrame url={project.screens[lightboxIdx].url}>
                  <div className="max-h-[70vh] overflow-y-auto">
                    {project.screens[lightboxIdx].component}
                  </div>
                </BrowserFrame>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Overview */}
      <section className="section-padding bg-card/20">
        <div className="container-narrow">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold tracking-tight mb-4">Project Overview</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">{project.overview}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold tracking-tight mb-8">Features & Capabilities</h2>
          </AnimatedSection>
          <div className="grid gap-5 md:grid-cols-2">
            {project.features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.05}>
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card/20">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold tracking-tight">Want Something Like This?</h2>
            <p className="mt-3 text-muted-foreground">Let's build a solution tailored to your business.</p>
            <Link to="/contact" className="mt-6 inline-block">
              <Button size="lg" className="gap-2">Start Your Project <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;
