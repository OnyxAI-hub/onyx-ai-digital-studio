import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe2, Heart, Palette, Code2, ChevronDown, Briefcase, Monitor, Languages, Target } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import xavierHeadshot from "@/assets/xavier-headshot.jpg";

const differentiators = [
  {
    icon: Palette,
    title: "Premium Design",
    desc: "Every layout is designed from scratch — tailored to your brand, your audience, and your goals.",
    detail: "We obsess over spacing, typography, and color to create designs that look custom-built because they are. No templates, no shortcuts — just clean, intentional design that elevates your brand.",
  },
  {
    icon: Code2,
    title: "Modern Technology",
    desc: "Built on the same tech stack powering top startups — fast, secure, and ready to scale.",
    detail: "We use React, TypeScript, Tailwind CSS, and Supabase to deliver sites that load fast, rank well, and adapt as your business grows. Your project is future-proof from day one.",
  },
  {
    icon: Heart,
    title: "Client-First Process",
    desc: "Your goals drive every decision — from discovery to launch and beyond.",
    detail: "Transparent communication, realistic timelines, and generous revisions mean you're always confident in the outcome. We build with you, not just for you.",
  },
  {
    icon: Globe2,
    title: "Bilingual Support",
    desc: "Fluent in English and Spanish — clearer briefs, faster feedback, better results.",
    detail: "From discovery calls to final handoff, we communicate in the language you're most comfortable with. This eliminates miscommunication and keeps projects moving smoothly.",
  },
];

const timeline = [
  {
    step: "Discovery",
    desc: "We learn your business, goals, and audience.",
    detail: "This includes a 30-minute strategy call, competitor analysis, and a written project brief outlining scope, timeline, and deliverables.",
  },
  {
    step: "Design",
    desc: "We create mockups and refine the visual direction together.",
    detail: "You'll receive full-page design mockups for review. We iterate based on your feedback until the look and feel is exactly right.",
  },
  {
    step: "Build",
    desc: "We develop your project with clean code and thorough testing.",
    detail: "Development happens in sprints with regular check-ins. We test across devices and browsers to ensure everything works flawlessly.",
  },
  {
    step: "Launch",
    desc: "We deploy everything and make sure it runs smoothly.",
    detail: "We handle hosting setup, domain configuration, SSL, and a final QA pass. You get full access and ownership of everything.",
  },
  {
    step: "Support",
    desc: "We stick around for updates, improvements, and growth.",
    detail: "Post-launch support is included with select packages. We also offer monthly maintenance plans for ongoing peace of mind.",
  },
];

const trustHighlights = [
  { icon: Briefcase, label: "Business-Focused Builds" },
  { icon: Monitor, label: "Modern Websites & Web Apps" },
  { icon: Languages, label: "Bilingual Support" },
  { icon: Target, label: "Conversion-Minded Design" },
];

const DifferentiatorCard = ({ d }: { d: typeof differentiators[0] }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="glass-card-hover p-6 flex gap-4 cursor-pointer select-none transition-all"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card border border-border/60">
        <d.icon className="h-5 w-5 text-foreground/70" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold tracking-tight">{d.title}</h3>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
        {expanded && (
          <p className="mt-3 text-sm text-muted-foreground/80 leading-relaxed border-t border-border/20 pt-3">
            {d.detail}
          </p>
        )}
      </div>
    </div>
  );
};

const TimelineItem = ({ item, index }: { item: typeof timeline[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="relative flex gap-6 pb-12 pl-10 md:pl-0 cursor-pointer select-none"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="absolute left-0 top-1 md:left-1/2 md:-translate-x-1/2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background text-xs font-bold text-foreground/70">
          {index + 1}
        </div>
      </div>
      <div className="md:w-1/2 md:ml-auto md:pl-10">
        <div className="flex items-center gap-2">
          <h3 className="font-display font-semibold tracking-tight">{item.step}</h3>
          <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
        {expanded && (
          <p className="mt-2 text-sm text-muted-foreground/80 leading-relaxed border-t border-border/20 pt-2">
            {item.detail}
          </p>
        )}
      </div>
    </div>
  );
};

const About = () => (
  <main className="pt-20">
    {/* Hero */}
    <section className="section-padding">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <span className="mb-4 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Behind ONYX AI
          </span>
          <h1 className="font-display text-4xl font-bold md:text-5xl tracking-tight">
            <span className="gradient-text">ONYX AI</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
            Modern websites and web applications built to help businesses grow, convert, and stand out.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* Founder */}
    <section className="pb-20 px-4">
      <div className="container-narrow">
        <AnimatedSection>
          <div className="glass-card p-8 md:p-12 md:flex gap-10 items-start">
            <div className="mb-6 md:mb-0 md:w-1/3 flex justify-center">
              <div className="h-56 w-56 rounded-lg overflow-hidden border border-border/60 shadow-lg">
                <img
                  src={xavierHeadshot}
                  alt="Xavier de Jesus Ruiz — Founder of ONYX AI"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="font-display text-2xl font-bold tracking-tight">Xavier de Jesus Ruiz</h2>
              <p className="text-sm text-muted-foreground mt-1 font-medium">Founder & Developer</p>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                ONYX AI was founded on a straightforward principle: every business deserves a digital presence that actually drives results — not a recycled template with a logo swap, but a purpose-built platform designed to convert visitors and scale with your growth.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Xavier specializes in building modern websites and web applications with deep expertise in UI/UX design, full-stack development, and AI integration. Every project blends clean design with strong functionality and measurable business impact.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Fluent in English and Spanish, ONYX AI serves a diverse range of clients with clear communication, zero jargon, and a relentless focus on quality.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Trust Highlights */}
        <AnimatedSection delay={0.15}>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustHighlights.map((h) => (
              <div key={h.label} className="glass-card flex flex-col items-center gap-2.5 py-5 px-4 text-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card">
                  <h.icon className="h-4 w-4 text-foreground/60" />
                </div>
                <span className="text-xs font-medium text-muted-foreground tracking-wide">{h.label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Differentiators */}
    <section className="section-padding bg-card/20">
      <div className="container-narrow">
        <AnimatedSection>
          <SectionHeading badge="Why ONYX AI" title="What Sets Us Apart" />
        </AnimatedSection>
        <div className="grid gap-6 md:grid-cols-2">
          {differentiators.map((d, i) => (
            <AnimatedSection key={d.title} delay={i * 0.1}>
              <DifferentiatorCard d={d} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Process Timeline */}
    <section className="section-padding">
      <div className="container-narrow">
        <AnimatedSection>
          <SectionHeading badge="Our Process" title="From Idea to Launch" description="A clear, structured process designed to keep your project moving. Click any step for more detail." />
        </AnimatedSection>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border/40 md:left-1/2 md:-translate-x-px" />
          {timeline.map((item, i) => (
            <AnimatedSection key={item.step} delay={i * 0.1}>
              <TimelineItem item={item} index={i} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Bottom CTA */}
    <section className="section-padding bg-card/20">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl font-bold tracking-tight">Ready to Work Together?</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Let's turn your vision into a polished, high-performing digital product.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://calendly.com/onyxai-contact/onyx-consultation" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">Book a Consultation <ArrowRight className="h-4 w-4" /></Button>
            </a>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="gap-2">View Portfolio</Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default About;
