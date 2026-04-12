import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe2, Heart, Palette, Code2, ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import xavierHeadshot from "@/assets/xavier-headshot.jpg";

const differentiators = [
  {
    icon: Palette,
    title: "Premium Design",
    desc: "Clean, modern, and tailored to your brand — never a cookie-cutter template.",
    detail: "We obsess over spacing, typography, and color to create designs that look custom-built because they are. Every layout is crafted from scratch based on your brand identity and industry.",
  },
  {
    icon: Code2,
    title: "Modern Technology",
    desc: "Built with the latest tools for speed, security, and scalability.",
    detail: "We use React, TypeScript, Tailwind CSS, and Supabase — the same tech stack powering top startups. Your site will be fast, accessible, and future-proof.",
  },
  {
    icon: Heart,
    title: "Client-First Approach",
    desc: "We listen, we adapt, and we deliver exactly what your business needs.",
    detail: "Your goals drive every decision. We keep communication transparent, timelines realistic, and revisions generous so you're always confident in the outcome.",
  },
  {
    icon: Globe2,
    title: "Bilingual Support",
    desc: "Fluent in English and Spanish — we serve clients in both languages.",
    detail: "From discovery calls to final handoff, we communicate in the language you're most comfortable with. This means clearer briefs, faster feedback, and better results.",
  },
];

const timeline = [
  {
    step: "Discovery",
    desc: "We meet to understand your business, goals, and audience.",
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
    desc: "We stick around to help with updates and improvements.",
    detail: "Post-launch support is included with select packages. We also offer monthly maintenance plans for ongoing peace of mind.",
  },
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
      className="relative flex gap-6 pb-10 pl-10 md:pl-0 cursor-pointer select-none"
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
    <section className="section-padding">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <span className="mb-4 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">About</span>
          <h1 className="font-display text-4xl font-bold md:text-5xl tracking-tight">
            <span className="gradient-text">ONYX AI</span>
          </h1>
        </AnimatedSection>
      </div>
    </section>

    <section className="pb-20 px-4">
      <div className="container-narrow">
        <AnimatedSection>
          <div className="glass-card p-8 md:p-12 md:flex gap-10 items-center">
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
                ONYX AI was founded on a straightforward principle: every business deserves a digital presence that actually drives results — not a recycled template with a logo swap, but a purpose-built platform designed to convert visitors, build credibility, and scale with your growth.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Xavier specializes in building modern websites and web applications for businesses, startups, and entrepreneurs. With deep expertise in UI/UX design, full-stack development, and AI integration, every project is crafted with clean design, strong functionality, and measurable business impact at its core.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Fluent in English and Spanish, ONYX AI serves a diverse range of clients with clear communication, zero jargon, and a relentless focus on quality.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>

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

    <section className="section-padding">
      <div className="container-narrow">
        <AnimatedSection>
          <SectionHeading badge="Our Process" title="From Idea to Launch" description="A straightforward process designed to keep things moving. Click any step for more detail." />
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

    <section className="section-padding bg-card/20">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl font-bold tracking-tight">Ready to Work Together?</h2>
          <p className="mt-3 text-muted-foreground">Let's discuss your project and build something great.</p>
          <Link to="/contact" className="mt-6 inline-block">
            <Button size="lg" className="gap-2">Book a Consultation <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default About;
