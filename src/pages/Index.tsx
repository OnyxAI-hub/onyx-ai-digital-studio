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

const HERO_STATS = [
  { value: "70+", label: "Models" },
  { value: "$4", label: "Per Month" },
  { value: "130K", label: "Credits" },
  { value: "5", label: "Plans" },
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

      <div className="relative z-10 container-narrow px-4 text-center py-24">
        <AnimatedSection>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI Creative Platform — Now Live
          </span>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <h1 className="font-display font-black tracking-[-0.04em] leading-[0.95] text-balance text-6xl md:text-8xl lg:text-[6rem]">
            <span className="block text-foreground">Create Anything.</span>
            <span className="block gradient-text">Powered by AI.</span>
            <span className="block mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground tracking-tight">
              Starting at $4/month.
            </span>
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <p className="mx-auto mt-8 max-w-lg text-base md:text-lg text-muted-foreground/80 leading-relaxed">
            70+ AI models. Images, video, audio, music, and more — all in one studio. Cheaper than every competitor.
          </p>
        </AnimatedSection>

        {/* Prompt bar */}
        <AnimatedSection delay={0.3}>
          <form
            onSubmit={(e) => { e.preventDefault(); window.location.href = href; }}
            className="mx-auto mt-10 max-w-2xl"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-2.5 shadow-[0_0_80px_rgba(6,182,212,0.08)]">
              <Sparkles className="h-5 w-5 ml-3 text-cyan-300/70 shrink-0" />
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create…"
                className="flex-1 bg-transparent text-base md:text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none px-1 py-2.5"
              />
              <Link to={href}>
                <Button size="lg" className="gap-2 uppercase tracking-wider text-xs h-12 px-5">
                  Start Creating <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
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
          </form>
        </AnimatedSection>

        {/* Stats row */}
        <AnimatedSection delay={0.35}>
          <div className="mt-10 mx-auto max-w-2xl grid grid-cols-4 divide-x divide-white/[0.06]">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="px-2 text-center">
                <div className="font-display text-2xl md:text-3xl font-black text-foreground tracking-tight">{s.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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

/* ─── Model Ticker ─── */
const MODEL_TICKER = [
  "WAN 2.0", "Flux Pro", "DALL·E 3", "Seedance", "ElevenLabs", "Suno",
  "Runway", "Kling", "GPT-4o", "Claude", "Grok", "Ideogram v3",
  "Stable Diffusion", "MusicGen", "Bark", "Sora", "Veo 2", "Luma Dream Machine",
];

const ModelTicker = () => (
  <section className="relative border-y border-[hsl(0,0%,10%)] bg-[hsl(0,0%,3%)] overflow-hidden py-4">
    {/* Edge fade masks */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[hsl(0,0%,3%)] to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[hsl(0,0%,3%)] to-transparent" />
    <div className="relative space-y-3">
      <div className="flex ticker-left whitespace-nowrap">
        {[...MODEL_TICKER, ...MODEL_TICKER].map((name, i) => (
          <span key={`l-${name}-${i}`} className="mx-2 shrink-0 border border-border/40 bg-card/50 rounded-full px-4 py-1.5 text-[11px] font-medium text-muted-foreground">
            {name}
          </span>
        ))}
      </div>
      <div className="flex ticker-right whitespace-nowrap">
        {[...MODEL_TICKER.slice().reverse(), ...MODEL_TICKER.slice().reverse()].map((name, i) => (
          <span key={`r-${name}-${i}`} className="mx-2 shrink-0 border border-border/30 bg-card/30 rounded-full px-4 py-1.5 text-[11px] font-medium text-muted-foreground/70">
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

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
const SHOWCASE_MODELS = [
  { name: "WAN 2.0", letter: "W", type: "Video", desc: "Text & image to video", cost: "From 500 cr", gradient: "from-slate-900 via-indigo-950 to-cyan-950", href: "/generate?tab=Video", premium: true },
  { name: "Flux Pro", letter: "F", type: "Image", desc: "Photorealistic images", cost: "From 5 cr", gradient: "from-zinc-800 via-zinc-700 to-zinc-900", href: "/generate?tab=Image", premium: false },
  { name: "Seedance", letter: "S", type: "Video", desc: "Cinematic AI video", cost: "From 300 cr", gradient: "from-indigo-950 via-violet-950 to-slate-900", href: "/generate?tab=Video", premium: true },
  { name: "ElevenLabs", letter: "E", type: "Audio", desc: "Voice & music AI", cost: "From 10 cr", gradient: "from-stone-700 via-zinc-600 to-stone-800", href: "/generate?tab=Audio", premium: false },
  { name: "GPT-4o", letter: "G", type: "Chat", desc: "OpenAI flagship", cost: "From 2 cr", gradient: "from-slate-800 via-zinc-700 to-slate-900", href: "/generate?tab=Image", premium: false },
  { name: "DALL·E 3", letter: "D", type: "Image", desc: "Creative image AI", cost: "From 8 cr", gradient: "from-zinc-900 via-slate-800 to-black", href: "/generate?tab=Image", premium: false },
  { name: "Runway", letter: "R", type: "Video", desc: "Professional video", cost: "From 200 cr", gradient: "from-cyan-950 via-slate-900 to-zinc-900", href: "/generate?tab=Video", premium: true },
  { name: "Suno", letter: "S", type: "Audio", desc: "AI music generation", cost: "From 15 cr", gradient: "from-violet-950 via-slate-900 to-zinc-950", href: "/generate?tab=Audio", premium: false },
];

const ModelShowcaseSection = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading
          badge="70+ Models"
          title="The Most Powerful AI Models"
          description="Every top model available in one platform. No switching apps. No separate subscriptions."
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {SHOWCASE_MODELS.map((model) => (
            <div key={model.name} className="glass-card-hover overflow-hidden group cursor-pointer">
              <div className={`relative aspect-[4/5] bg-gradient-to-br ${model.gradient} overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-black/40 backdrop-blur px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white/80">
                  {model.type}
                </span>
                {model.premium && (
                  <span className="absolute top-3 right-3 rounded-full bg-foreground/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-background">
                    Premium
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-7xl md:text-8xl font-black text-white/10 select-none group-hover:text-white/15 transition-all duration-500 group-hover:scale-110">
                    {model.letter}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display text-lg font-bold text-white tracking-tight">{model.name}</p>
                  <p className="text-[10px] text-white/50 mt-0.5">{model.desc}</p>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-foreground/90">{model.cost}</p>
                  <p className="text-[10px] text-muted-foreground">per generation</p>
                </div>
                <Link to={model.href}>
                  <Button size="sm" variant="outline" className="h-8 text-[10px] uppercase tracking-wider gap-1.5">
                    Try <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="mt-12 text-center">
          <Link to="/generate">
            <Button size="lg" variant="outline" className="gap-2 border-white/15 hover:border-white/30">
              See all 70+ models <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

/* ─── What You Can Create (Bento) ─── */
const BENTO_CARDS = [
  {
    icon: ImageIcon,
    title: "Image & Video Studio",
    desc: "Generate cinematic stills and motion. From product photography to full ad campaigns — rendered in minutes.",
    examples: ["Flux Pro", "DALL·E 3", "Runway", "WAN 2.0", "Seedance", "Ideogram"],
    gradient: "from-slate-900 to-indigo-950",
    href: "/generate?tab=Image",
  },
  {
    icon: Mic,
    title: "Music & Audio",
    desc: "Compose original tracks, generate voiceovers, and craft soundscapes with state-of-the-art audio AI.",
    examples: ["Suno", "ElevenLabs", "MusicGen", "Bark", "Voiceover", "SFX"],
    gradient: "from-stone-800 to-zinc-900",
    href: "/generate?tab=Audio",
  },
  {
    icon: Globe,
    title: "Websites & Automation",
    desc: "Launch landing pages, full sites, and automated workflows. Booking, payments, lead capture — handled.",
    examples: ["Landing pages", "Web apps", "AI agents", "Booking flows", "CRM sync", "Email automation"],
    gradient: "from-zinc-900 to-slate-900",
    href: "/project-intake",
  },
];

const WhatYouCanCreateSection = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading badge="Creation Hub" title="One Platform. Infinite Creations." description="Three studios. Endless output. Built for creators who refuse to compromise." />
      </AnimatedSection>
      <div className="grid gap-6 md:grid-cols-3">
        {BENTO_CARDS.map((c, i) => (
          <AnimatedSection key={c.title} delay={i * 0.1}>
            <Link to={c.href} className="block group">
              <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${c.gradient} min-h-[420px] p-8 flex flex-col transition-all duration-500 hover:border-white/25 hover:scale-[1.01] hover:shadow-[0_20px_80px_rgba(0,0,0,0.5)]`}>
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/[0.03] blur-3xl" />
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur">
                  <c.icon className="h-8 w-8 text-white/90" />
                </div>
                <h3 className="relative z-10 mt-6 font-display text-2xl md:text-3xl font-bold tracking-tight text-white">{c.title}</h3>
                <p className="relative z-10 mt-3 text-sm text-white/70 leading-relaxed">{c.desc}</p>
                <div className="relative z-10 mt-auto pt-6 flex flex-wrap gap-1.5">
                  {c.examples.map((ex) => (
                    <span key={ex} className="rounded-full border border-white/15 bg-white/[0.05] backdrop-blur px-2.5 py-1 text-[10px] font-medium text-white/80 uppercase tracking-wider">{ex}</span>
                  ))}
                </div>
                <div className="relative z-10 mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/80 group-hover:text-white">
                  Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Pricing Preview ─── */
const PRICING_PLANS = [
  { name: "Free", price: 0, credits: "25 credits", features: ["Try the studio", "Standard models", "Community support"], cta: "Start Free", highlight: false },
  { name: "Starter", price: 4, credits: "1,500 credits / mo", features: ["All standard models", "Image + audio", "Email support"], cta: "Choose Starter", highlight: false },
  { name: "Basic", price: 9, credits: "5,000 credits / mo", features: ["All standard + select premium", "Video generation", "Priority queue"], cta: "Choose Basic", highlight: false },
  { name: "Premium", price: 21, credits: "20,000 credits / mo", features: ["Every model unlocked", "Pro video & audio", "Fast lane rendering"], cta: "Choose Premium", highlight: true },
  { name: "Pro", price: 54, credits: "130,000 credits / mo", features: ["Maximum throughput", "Team-ready capacity", "Dedicated support"], cta: "Choose Pro", highlight: false },
];

const PricingPreviewSection = () => (
  <section className="section-padding section-silver">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading badge="Pricing" title="Always Cheaper Than Competitors" description="Every plan priced $1-2 below Budget Pixel AI. Same top models. Less money." />
      </AnimatedSection>
      <div className="md:grid md:grid-cols-5 md:gap-4 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible">
        {PRICING_PLANS.map((p, i) => (
          <AnimatedSection key={p.name} delay={i * 0.06}>
            <div className={`relative h-full min-w-[240px] md:min-w-0 rounded-2xl p-6 flex flex-col ${p.highlight ? "silver-card shadow-[0_0_60px_rgba(255,255,255,0.08)] md:scale-[1.04] border border-white/20" : "glass-card"}`}>
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-background">
                  Most Popular
                </span>
              )}
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">{p.name}</span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-5xl font-black tracking-tight">${p.price}</span>
                <span className="text-xs text-muted-foreground">/mo</span>
              </div>
              <p className="mt-2 text-xs font-semibold text-cyan-300/80">{p.credits}</p>
              <ul className="mt-5 space-y-2 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="h-3.5 w-3.5 shrink-0 text-foreground/60 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/pricing" className="mt-6">
                <Button className="w-full" variant={p.highlight ? "default" : "outline"} size="sm">{p.cta}</Button>
              </Link>
            </div>
          </AnimatedSection>
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">Annual billing saves up to 30% · Cancel anytime · No hidden fees</p>
    </div>
  </section>
);

/* ─── Trust Strip ─── */
const TRUST_STATS = [
  { value: "70+", label: "AI Models" },
  { value: "$4", label: "Starting / mo" },
  { value: "130K", label: "Max Credits" },
  { value: "5", label: "Subscription Tiers" },
  { value: "24/7", label: "Platform Access" },
];

const TrustStripSection = () => (
  <section className="section-charcoal border-y border-[hsl(0,0%,10%)]">
    <div className="container-narrow px-4 py-14">
      <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
        {TRUST_STATS.map((s, i) => (
          <AnimatedSection key={s.label} delay={i * 0.05}>
            <div className="px-4 py-4 text-center">
              <div className="font-display text-3xl md:text-4xl font-black text-foreground tracking-tight">{s.value}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">{s.label}</div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Page ─── */
const Index = () => (
  <main>
    <Hero />
    <ModelTicker />
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
