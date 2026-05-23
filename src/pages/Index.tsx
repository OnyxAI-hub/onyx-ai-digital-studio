import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Palette, Code2, MessageSquare, Star, Send, Clock, Smartphone, Briefcase, Bot, Inbox, CalendarClock, PhoneMissed, CreditCard as CardIcon, MailCheck, LineChart, Building2, Image as ImageIcon, Video, Mic, Globe, Sparkles, Zap, Layers, FileText, Rocket } from "lucide-react";
import { toast } from "sonner";
import AnimatedSection from "@/components/shared/AnimatedSection";
import HeroBackground from "@/components/shared/HeroBackground";
import SectionHeading from "@/components/shared/SectionHeading";
import StarGlimmers from "@/components/shared/StarGlimmers";
import { featuredServices } from "@/data/services";
import { packages } from "@/data/packages";
import { projects } from "@/data/portfolio";
import { testimonials } from "@/data/testimonials";
import { modelCategories } from "@/data/credits";
import StudioCategoriesSection from "@/components/studio/StudioCategoriesSection";
import ModelHighlightsSection from "@/components/studio/ModelHighlightsSection";
import ImageModelsSection from "@/components/studio/ImageModelsSection";
import VideoModelsSection from "@/components/studio/VideoModelsSection";
import CreativeAppsSection from "@/components/studio/CreativeAppsSection";
import GallerySection from "@/components/studio/GallerySection";

/* ─── Hero ─── */
const HERO_CHIPS: { label: string; icon: typeof ImageIcon; type: string }[] = [
  { label: "Image", icon: ImageIcon, type: "AI Image Creation" },
  { label: "Video", icon: Video, type: "AI Video Generation" },
  { label: "Audio", icon: Mic, type: "Custom AI Request" },
  { label: "Website", icon: Globe, type: "Website / Landing Page" },
  { label: "Automation", icon: Bot, type: "Automation System" },
];

const HERO_PROMPTS = [
  "Create a promo video",
  "Generate cover art",
  "Build a landing page",
  "Design brand visuals",
  "Create a music visualizer",
  "Set up an AI agent",
];

const Hero = () => {
  const [prompt, setPrompt] = useState("");
  const href = `/generate${prompt ? `?prompt=${encodeURIComponent(prompt)}` : ""}`;
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,2%)] via-[hsl(0,0%,3%)] to-[hsl(0,0%,4%)]" />
        <HeroBackground />
        <div className="absolute top-[18%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute top-[82%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      </div>

      <div className="relative z-10 container-narrow px-4 text-center">
        <AnimatedSection>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI Creative Platform — Now Live
          </span>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <h1 className="font-display font-bold leading-[1.05] tracking-[-0.035em] text-balance text-4xl md:text-6xl lg:text-[4.5rem]">
            <span className="text-foreground">Build Smarter. Create Faster.</span>
            <br />
            <span className="gradient-text">Scale With AI.</span>
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <p className="mx-auto mt-7 max-w-xl text-[15px] md:text-base text-muted-foreground/90 leading-relaxed">
            ONYX AI Studio helps businesses and creators launch websites, generate media, build automations, and access powerful AI tools — all from one platform.
          </p>
        </AnimatedSection>

        {/* Prompt bar */}
        <AnimatedSection delay={0.3}>
          <form
            onSubmit={(e) => { e.preventDefault(); window.location.href = href; }}
            className="mx-auto mt-8 max-w-2xl"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-[hsl(0,0%,18%)] bg-[hsl(0,0%,5%)]/80 backdrop-blur-xl p-2 shadow-[0_0_60px_rgba(255,255,255,0.03)]">
              <Sparkles className="h-4 w-4 ml-2 text-foreground/50 shrink-0" />
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create…"
                className="flex-1 bg-transparent text-sm md:text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none px-1 py-2"
              />
              <Link to={href}>
                <Button size="sm" className="gap-2 uppercase tracking-wider text-[11px]">
                  Start Creating <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {HERO_CHIPS.map((c) => (
                <Link
                  key={c.label}
                  to={`/generate?tab=${c.label}`}
                  className="flex items-center gap-1.5 rounded-full border border-border/50 bg-card/40 px-3 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                >
                  <c.icon className="h-3 w-3" />
                  {c.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {HERO_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPrompt(p)}
                  className="rounded-md border border-border/40 bg-card/20 px-2.5 py-1 text-[10px] text-muted-foreground/80 hover:text-foreground hover:border-foreground/20 transition-all"
                >
                  {p}
                </button>
              ))}
            </div>
          </form>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/generate">
              <Button size="lg" className="h-14 px-10 text-sm uppercase tracking-widest gap-3 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                Start Creating Free <ArrowRight />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="h-14 px-10 text-sm uppercase tracking-widest border-white/15 hover:border-white/30">
                View Pricing
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ─── Trust ─── */
const trustItems = [
  { icon: CheckCircle, label: "50+ Projects Delivered" },
  { icon: Briefcase, label: "Business-Focused Builds" },
  { icon: Smartphone, label: "Responsive on All Devices" },
  { icon: Clock, label: "Fast Turnaround" },
];

const TrustSection = () => (
  <section className="border-y border-[hsl(0,0%,10%)] section-charcoal">
    <div className="container-narrow px-4 py-14">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {trustItems.map((item, i) => (
          <AnimatedSection key={item.label} delay={i * 0.1}>
            <div className="flex flex-col items-center gap-3 text-center">
              <item.icon className="h-5 w-5 text-[hsl(0,0%,45%)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[hsl(0,0%,80%)]">{item.label}</span>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Featured Services ─── */
const FeaturedServicesSection = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading badge="What We Do" title="Digital Systems for Modern Businesses" description="Websites, web apps, AI voice agents, and automation systems built for service-based businesses." />
      </AnimatedSection>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredServices.map((service, i) => (
          <AnimatedSection key={service.title} delay={i * 0.1}>
            <div className="glass-card-hover p-6 h-full">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-card border border-border/60">
                <service.icon className="h-5 w-5 text-foreground/70" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 tracking-tight">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
      <AnimatedSection>
        <div className="mt-10 text-center">
          <Link to="/services">
            <Button variant="outline" className="gap-2">See All Services <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

/* ─── Choose What You Want to Create ─── */
const CHOOSE_CARDS = [
  {
    icon: Globe,
    title: "Websites & Web Apps",
    desc: "Business websites, landing pages, web apps, booking flows, payment flows, customer intake systems, and dashboards.",
    examples: ["Business websites", "Landing pages", "Web apps", "Booking systems", "Payment flows", "Customer intake", "Dashboards"],
    cta: "Start a Website Project",
    href: "/project-intake?type=Website%20%2F%20Landing%20Page",
  },
  {
    icon: Sparkles,
    title: "AI Creative Studio",
    desc: "AI images, cover art, promo videos, music visualizers, brand assets, social content, and short-form video concepts.",
    examples: ["AI images", "Cover art", "Music visualizers", "Promo videos", "Social content", "Brand visuals", "Product images"],
    cta: "Start a Creative Request",
    href: "/project-intake?type=AI%20Image%20Creation",
  },
  {
    icon: Bot,
    title: "Business Automation",
    desc: "AI agents, chatbots, voice agents, lead tracking, follow-ups, outreach systems, booking automation, and customer workflows.",
    examples: ["AI voice agents", "AI chat agents", "Lead tracking", "Follow-up systems", "Outreach systems", "Booking automation", "Customer workflows"],
    cta: "Start an Automation Project",
    href: "/project-intake?type=Automation%20System",
  },
];

const ChooseWhatSection = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading badge="The Platform" title="Choose What You Want to Create" description="One studio for websites, AI creative work, and business automation." />
      </AnimatedSection>
      <div className="grid gap-6 md:grid-cols-3">
        {CHOOSE_CARDS.map((c, i) => (
          <AnimatedSection key={c.title} delay={i * 0.1}>
            <div className="glass-card-hover p-7 h-full flex flex-col">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-card border border-border/60">
                <c.icon className="h-5 w-5 text-foreground/70" />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              <ul className="mt-5 mb-6 flex flex-wrap gap-1.5">
                {c.examples.map((ex) => (
                  <li key={ex} className="rounded-md border border-border/40 bg-card/30 px-2 py-0.5 text-[11px] text-muted-foreground">{ex}</li>
                ))}
              </ul>
              <Link to={c.href} className="mt-auto">
                <Button variant="outline" className="w-full gap-2">{c.cta} <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Models / Workflows ─── */
const ModelsSection = () => (
  <section className="section-padding section-silver">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading badge="Workflows" title="Create Across Multiple AI Workflows" description="Pick a workflow — credits flex across image, video, audio, websites, and automation requests." />
      </AnimatedSection>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {modelCategories.map((m, i) => (
          <AnimatedSection key={m.title} delay={i * 0.05}>
            <Link to={`/project-intake?type=${encodeURIComponent(m.intakeType)}`} className="block h-full">
              <div className="glass-card-hover p-5 h-full">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-card border border-border/60">
                  <m.icon className="h-4 w-4 text-foreground/70" />
                </div>
                <h3 className="font-display text-base font-semibold tracking-tight">{m.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{m.description}</p>
                <p className="mt-3 text-[11px] uppercase tracking-wider text-foreground/60 font-medium">{m.cost}</p>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
      <AnimatedSection>
        <div className="mt-10 text-center">
          <Link to="/generate">
            <Button className="gap-2">Open Studio <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

/* ─── How It Works ─── */
const steps = [
  { num: "01", title: "Choose What You Want Created", desc: "Pick a website, image, video, music visual, automation system, AI agent, or custom request." },
  { num: "02", title: "Use Credits or Choose a Service", desc: "Subscribe monthly, buy extra credits, or book a consultation for larger custom projects." },
  { num: "03", title: "Submit Your Idea", desc: "Share your goal, style, references, business details, files, and timeline." },
  { num: "04", title: "ONYX Builds the Output", desc: "We use creative direction, prompting, AI workflows, and platform systems to create the result." },
  { num: "05", title: "Review, Refine & Launch", desc: "Review the finished work, request adjustments, and launch for your business, brand, or content." },
];

const HowItWorksSection = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading badge="Our Process" title="How ONYX AI Studio Works" description="From idea to delivery in five steps." />
      </AnimatedSection>
      <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
        {steps.map((step, i) => (
          <AnimatedSection key={step.num} delay={i * 0.08}>
            <div className="text-center">
              <span className="font-display text-5xl font-bold text-border">{step.num}</span>
              <h3 className="mt-3 font-display text-base font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Why Choose ONYX AI ─── */
const whyCards = [
  { icon: Clock, title: "Fast Turnaround", desc: "Most projects delivered in 2–4 weeks. We respect your time and deadlines." },
  { icon: Palette, title: "Premium Design", desc: "Every pixel is intentional. Your site will look polished, modern, and professional." },
  { icon: Code2, title: "Web Apps & Automation", desc: "Beyond static sites — we build tools that automate and streamline your operations." },
  { icon: MessageSquare, title: "Clear Communication", desc: "No jargon, no ghosting. You'll always know where your project stands." },
];

const WhyChooseSection = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading badge="Why Us" title="Why Businesses Choose ONYX AI" />
      </AnimatedSection>
      <div className="grid gap-6 md:grid-cols-2">
        {whyCards.map((card, i) => (
          <AnimatedSection key={card.title} delay={i * 0.1}>
            <div className="glass-card-hover p-8 flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-card border border-border/60">
                <card.icon className="h-5 w-5 text-foreground/70" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-1 tracking-tight">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Package Preview ─── */
const PackagePreview = () => (
  <section className="section-padding section-silver">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading badge="Pricing" title="Simple, Transparent Pricing" description="Choose a package that fits your needs. No hidden fees." />
      </AnimatedSection>
      <div className="grid gap-6 md:grid-cols-3">
        {packages.map((pkg, i) => (
          <AnimatedSection key={pkg.name} delay={i * 0.1}>
            <div className={`glass-card p-6 h-full flex flex-col relative ${pkg.highlighted ? "border-foreground/20 shadow-[0_0_40px_rgba(255,255,255,0.03)] md:scale-105" : ""}`}>
              {pkg.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
                  {pkg.badge}
                </span>
              )}
              <h3 className="font-display text-xl font-bold tracking-tight">{pkg.name}</h3>
              <div className="mt-2 mb-4">
                <span className="font-display text-4xl font-bold">${pkg.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{pkg.description}</p>
              <ul className="mb-6 flex-1 space-y-2">
                {pkg.features.slice(0, 5).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/pricing">
                <Button className="w-full" variant={pkg.highlighted ? "default" : "outline"}>See Details</Button>
              </Link>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Portfolio Preview ─── */
const PortfolioPreview = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading badge="Our Work" title="Recent Projects" description="A look at some of the businesses we've helped build and grow." />
      </AnimatedSection>
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project, i) => (
          <AnimatedSection key={project.title} delay={i * 0.1}>
            <div className="glass-card-hover overflow-hidden">
              <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center opacity-60`}>
                <span className="font-display text-lg font-bold opacity-40">{project.title}</span>
              </div>
              <div className="p-6">
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{project.category}</span>
                <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
      <AnimatedSection>
        <div className="mt-10 text-center">
          <Link to="/portfolio">
            <Button variant="outline" className="gap-2">View All Projects <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

/* ─── Testimonials ─── */
const TestimonialsSection = () => (
  <section className="section-padding section-charcoal">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading badge="Testimonials" title="What Our Clients Say" />
      </AnimatedSection>
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <AnimatedSection key={t.name} delay={i * 0.1}>
            <div className="glass-card-hover p-6">
              <div className="mb-3 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-foreground/60 text-foreground/60" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.content}"</p>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Chatbot Teaser ─── */
const ChatbotTeaser = () => (
  <section className="section-padding relative overflow-hidden">
    <StarGlimmers count={12} />
    <div className="container-narrow">
      <AnimatedSection>
        <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/[0.02] blur-3xl" />
          <Bot className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="font-display text-2xl font-bold md:text-3xl tracking-tight">Have Questions? Ask Our AI Assistant</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Our AI chatbot can answer your questions, recommend the right package, and help you get started — anytime.
          </p>
          <p className="mt-4 text-sm text-foreground/60 font-medium">Look for the chat icon in the bottom-right corner →</p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

/* ─── Newsletter ─── */
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    try {
      await fetch("https://hooks.zapier.com/hooks/catch/27176071/u7gr62q/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          email: email.trim(),
          form_type: "newsletter",
          source_page: "newsletter_section",
        }),
      });
      toast.success("You're subscribed. Check your inbox.");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-padding section-charcoal">
      <div className="container-narrow">
        <AnimatedSection>
          <div className="mx-auto max-w-xl text-center">
            <Send className="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
            <h2 className="font-display text-2xl font-bold tracking-tight">Stay in the Loop</h2>
            <p className="mt-2 text-sm text-muted-foreground">Get updates on new services, tips, and exclusive offers.</p>
            <form className="mt-6 flex gap-3" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Sending…" : "Subscribe"}
              </Button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ─── What We Automate ─── */

const automations = [
  { icon: Inbox, title: "Customer Intake", desc: "Collect customer details, project needs, service requests, and contact information through smarter forms and guided flows." },
  { icon: CalendarClock, title: "Booking & Scheduling", desc: "Connect customers to consultation or appointment booking through tools like Calendly, calendar flows, and service request systems." },
  { icon: PhoneMissed, title: "Missed Call Follow-Up", desc: "Create workflows that help capture missed opportunities and guide customers toward the next step." },
  { icon: Bot, title: "AI Voice & Chat Agents", desc: "Set up AI assistants that can answer basic questions, collect details, and support customer routing." },
  { icon: CardIcon, title: "Payment & Deposit Flows", desc: "Connect Stripe payment links, deposits, checkout flows, and payment-ready service paths." },
  { icon: MailCheck, title: "Email & Follow-Up Systems", desc: "Automate confirmations, reminders, lead alerts, and customer follow-up messages." },
  { icon: LineChart, title: "Lead Tracking", desc: "Send inquiries into Google Sheets, CRM tools, or organized tracking systems so leads are easier to manage." },
];

const WhatWeAutomateSection = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading badge="Automation" title="What ONYX AI Can Automate" description="Your website should do more than look good — it should help customers take action, request service, book calls, submit details, and move through your business flow." />
      </AnimatedSection>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {automations.map((a, i) => (
          <AnimatedSection key={a.title} delay={i * 0.05}>
            <div className="glass-card-hover p-6 h-full">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-card border border-border/60">
                <a.icon className="h-5 w-5 text-foreground/70" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 tracking-tight">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Built for Service-Based Businesses ─── */
const industries = [
  "Plumbing", "Cleaning", "Pressure Washing", "HVAC", "Landscaping",
  "Fitness Coaches", "Health Coaches", "Med Spas", "Local Contractors", "Consultants",
];

const IndustriesSection = () => (
  <section className="section-padding section-charcoal">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading badge="Who We Serve" title="Built for Service-Based Businesses" description="ONYX AI Studios is built for businesses that rely on calls, appointments, estimates, service requests, payments, and customer communication." />
      </AnimatedSection>
      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {industries.map((name, i) => (
          <AnimatedSection key={name} delay={i * 0.03}>
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2 text-sm text-foreground/80">
              <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
              {name}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Final CTA ─── */
const FinalCTA = () => (
  <section className="section-padding relative overflow-hidden">
    <StarGlimmers count={12} />
    <div className="container-narrow">
      <AnimatedSection>
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl tracking-tight">
            Ready to Build Something <span className="gradient-text">Powerful</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Let's talk about your project. Book a free consultation and see how ONYX AI can help your business grow.
          </p>
          <div className="mt-8">
            <a href="https://calendly.com/onyxai-contact/onyx-consultation" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 text-sm uppercase tracking-wider">
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

/* ─── Model Showcase ─── */
const MODEL_SHOWCASE = [
  { name: "WAN 2.0", type: "Video", cost: "from 500 cr", gradient: "from-slate-900 via-indigo-950 to-cyan-950", tab: "Video" },
  { name: "Flux Pro", type: "Image", cost: "from 5 cr", gradient: "from-zinc-800 via-zinc-700 to-zinc-900", tab: "Image" },
  { name: "Seedance", type: "Video", cost: "from 300 cr", gradient: "from-indigo-950 via-violet-950 to-slate-900", tab: "Video" },
  { name: "ElevenLabs", type: "Audio", cost: "from 10 cr", gradient: "from-stone-700 via-zinc-600 to-stone-800", tab: "Audio" },
  { name: "GPT-4o", type: "Chat", cost: "from 2 cr", gradient: "from-slate-800 via-zinc-700 to-slate-900", tab: "Image" },
  { name: "DALL·E 3", type: "Image", cost: "from 8 cr", gradient: "from-zinc-900 via-slate-800 to-black", tab: "Image" },
  { name: "Runway", type: "Video", cost: "from 200 cr", gradient: "from-cyan-950 via-slate-900 to-zinc-900", tab: "Video" },
  { name: "Suno", type: "Audio", cost: "from 15 cr", gradient: "from-violet-950 via-slate-900 to-zinc-950", tab: "Audio" },
];

const ModelShowcaseSection = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading
          badge="70+ Models"
          title="Powered by Industry-Leading AI Models"
          description="Explore the best AI models for images, video, audio, and more — all available inside ONYX Studio."
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="relative -mx-4 px-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-5 min-w-max">
            {MODEL_SHOWCASE.map((m) => (
              <div
                key={m.name}
                className="glass-card-hover w-[260px] shrink-0 flex flex-col"
              >
                <div className={`h-28 rounded-t-xl bg-gradient-to-br ${m.gradient} opacity-70`} />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base font-bold tracking-tight text-foreground">{m.name}</h3>
                    <span className="rounded-md border border-border/60 bg-card/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground shrink-0">
                      {m.type}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> {m.cost}
                  </p>
                  <Link to={`/generate?tab=${m.tab}`} className="mt-4">
                    <Button size="sm" variant="outline" className="w-full gap-2 text-[11px] uppercase tracking-wider">
                      Try It <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="mt-8 text-center">
          <Link to="/generate">
            <Button className="gap-2">Open Studio <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

/* ─── Page ─── */
const Index = () => (
  <main>
    <Hero />
    <TrustSection />
    <ModelShowcaseSection />
    <StudioCategoriesSection />
    <ModelHighlightsSection />
    <ImageModelsSection />
    <VideoModelsSection />
    <CreativeAppsSection />
    <ChooseWhatSection />
    <ModelsSection />
    <FeaturedServicesSection />
    <WhatWeAutomateSection />
    <HowItWorksSection />
    <WhyChooseSection />
    <PackagePreview />
    <GallerySection />
    <IndustriesSection />
    <PortfolioPreview />
    <TestimonialsSection />
    <ChatbotTeaser />
    <Newsletter />
    <FinalCTA />
  </main>
);

export default Index;
