import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

interface ProjectData {
  slug: string;
  title: string;
  category: string;
  gradient: string;
  description: string;
  overview: string;
  features: { title: string; desc: string }[];
  tags: string[];
  mockups: { label: string; gradient: string }[];
}

const projectsData: ProjectData[] = [
  {
    slug: "nutrifit-wellness",
    title: "NutriFit Wellness",
    category: "E-Commerce & Health",
    gradient: "from-emerald-500/20 to-teal-600/20",
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
    mockups: [
      { label: "Homepage", gradient: "from-emerald-500/10 to-teal-600/10" },
      { label: "Product Page", gradient: "from-teal-500/10 to-green-600/10" },
      { label: "Checkout", gradient: "from-green-500/10 to-emerald-600/10" },
    ],
  },
  {
    slug: "primeshine-cleaning",
    title: "PrimeShine Cleaning Co.",
    category: "Service Business",
    gradient: "from-blue-500/20 to-cyan-600/20",
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
    mockups: [
      { label: "Landing Page", gradient: "from-blue-500/10 to-cyan-600/10" },
      { label: "Booking Flow", gradient: "from-cyan-500/10 to-sky-600/10" },
      { label: "Quote Calculator", gradient: "from-sky-500/10 to-blue-600/10" },
    ],
  },
  {
    slug: "quality-fitness-club",
    title: "Quality Fitness Club",
    category: "Dashboard & Web App",
    gradient: "from-rose-500/20 to-orange-600/20",
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
    mockups: [
      { label: "Dashboard Overview", gradient: "from-rose-500/10 to-orange-600/10" },
      { label: "Class Schedule", gradient: "from-orange-500/10 to-amber-600/10" },
      { label: "Member Profile", gradient: "from-amber-500/10 to-rose-600/10" },
    ],
  },
];

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/portfolio" replace />;

  return (
    <main className="pt-20">
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

      {/* Mockup previews */}
      <section className="pb-16 px-4">
        <div className="container-narrow">
          <div className="grid gap-6 md:grid-cols-3">
            {project.mockups.map((m, i) => (
              <AnimatedSection key={m.label} delay={i * 0.1}>
                <div className={`glass-card overflow-hidden`}>
                  <div className={`h-48 bg-gradient-to-br ${m.gradient} flex items-center justify-center`}>
                    <span className="font-display text-sm font-medium text-foreground/20">{m.label}</span>
                  </div>
                  <div className="p-4 text-center">
                    <span className="text-xs text-muted-foreground font-medium">{m.label}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

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
