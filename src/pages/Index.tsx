import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Rocket, Palette, Code2, MessageSquare, Star, Send, Zap, Clock, Smartphone, Briefcase, Bot } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { featuredServices } from "@/data/services";
import { packages } from "@/data/packages";
import { projects } from "@/data/portfolio";
import { testimonials } from "@/data/testimonials";

/* ─── Hero ─── */
const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Abstract background */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />
      {/* Silver glow orbs */}
      <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-white/[0.015] blur-3xl" />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(hsl(0 0% 40%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 40%) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      {/* Chrome line accents */}
      <div className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-[25%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      {/* Floating UI elements */}
      <div className="absolute top-[20%] right-[15%] hidden lg:block">
        <div className="glass-card p-4 animate-float opacity-30">
          <div className="flex gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-white/40" />
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-24 rounded bg-white/10" />
            <div className="h-2 w-32 rounded bg-white/5" />
            <div className="h-2 w-20 rounded bg-white/5" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[30%] left-[10%] hidden lg:block">
        <div className="glass-card p-3 animate-float opacity-20" style={{ animationDelay: "2s" }}>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-white/10 flex items-center justify-center">
              <Zap className="h-3 w-3 text-white/40" />
            </div>
            <div className="space-y-1">
              <div className="h-2 w-16 rounded bg-white/10" />
              <div className="h-1.5 w-12 rounded bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="relative z-10 container-narrow px-4 text-center">
      <AnimatedSection>
        <span className="mb-6 inline-block rounded-full border border-border/60 bg-card/60 px-5 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          AI-Powered Digital Agency
        </span>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
          Modern Websites
          <br />
          <span className="gradient-text">& Web Apps</span>
          <br />
          <span className="text-muted-foreground text-[0.65em]">Built to Grow Your Business</span>
        </h1>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <p className="mx-auto mt-8 max-w-xl text-base text-muted-foreground leading-relaxed">
          We design and build premium digital experiences that look great, work flawlessly,
          and drive real results for your business.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link to="/contact">
            <Button size="lg" className="gap-2 text-sm uppercase tracking-wider">
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/pricing">
            <Button size="lg" variant="outline" className="gap-2 text-sm uppercase tracking-wider">
              View Pricing
            </Button>
          </Link>
        </div>
      </AnimatedSection>
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
  <section className="border-y border-border/40 bg-card/20">
    <div className="container-narrow px-4 py-14">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {trustItems.map((item, i) => (
          <AnimatedSection key={item.label} delay={i * 0.1}>
            <div className="flex flex-col items-center gap-3 text-center">
              <item.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs font-medium uppercase tracking-wider text-foreground">{item.label}</span>
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
        <SectionHeading badge="What We Do" title="Services That Drive Results" description="From simple landing pages to complex web applications — we build what your business needs to succeed online." />
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

/* ─── How It Works ─── */
const steps = [
  { num: "01", title: "Discover", desc: "We learn about your business, goals, and target audience." },
  { num: "02", title: "Design", desc: "We create a custom design that reflects your brand identity." },
  { num: "03", title: "Build", desc: "We develop your site with clean code and modern technology." },
  { num: "04", title: "Launch", desc: "We deploy, test, and hand over everything ready to go." },
];

const HowItWorksSection = () => (
  <section className="section-padding bg-card/20">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading badge="Our Process" title="How It Works" description="A simple, transparent process from idea to launch." />
      </AnimatedSection>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <AnimatedSection key={step.num} delay={i * 0.1}>
            <div className="text-center">
              <span className="font-display text-5xl font-bold text-border">{step.num}</span>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
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
  <section className="section-padding bg-card/20">
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
  <section className="section-padding bg-card/20">
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
  <section className="section-padding">
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
const Newsletter = () => (
  <section className="section-padding bg-card/20">
    <div className="container-narrow">
      <AnimatedSection>
        <div className="mx-auto max-w-xl text-center">
          <Send className="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
          <h2 className="font-display text-2xl font-bold tracking-tight">Stay in the Loop</h2>
          <p className="mt-2 text-sm text-muted-foreground">Get updates on new services, tips, and exclusive offers.</p>
          <form className="mt-6 flex gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

/* ─── Final CTA ─── */
const FinalCTA = () => (
  <section className="section-padding">
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
            <Link to="/contact">
              <Button size="lg" className="gap-2 text-sm uppercase tracking-wider">
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
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
    <FeaturedServicesSection />
    <HowItWorksSection />
    <WhyChooseSection />
    <PackagePreview />
    <PortfolioPreview />
    <TestimonialsSection />
    <ChatbotTeaser />
    <Newsletter />
    <FinalCTA />
  </main>
);

export default Index;
