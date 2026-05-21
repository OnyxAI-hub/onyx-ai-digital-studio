import { Gauge, Briefcase, Layers, Coins, Trophy } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";

const items = [
  { icon: Gauge, title: "Transparent model pricing", body: "Credit costs are based on model type, quality, duration, and complexity, so users understand what they are spending." },
  { icon: Briefcase, title: "Creative platform + done-for-you", body: "Use credits for creative requests, or book ONYX for websites, automation systems, AI agents, and custom builds." },
  { icon: Layers, title: "Built for creators and businesses", body: "Generate media, manage assets, build websites, automate workflows, and grow your digital presence in one place." },
  { icon: Coins, title: "Flexible credits", body: "Subscribe monthly, buy extra credits anytime, or request custom work when a project needs more attention." },
  { icon: Trophy, title: "Community and rewards", body: "Earn credits through challenges, daily rewards, posting, and creative activity as the platform grows." },
];

const WhyOnyx = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading badge="Why ONYX" title="Why choose ONYX AI Studio?" description="Premium AI creative platform built on transparent pricing, flexible credits, and a done-for-you services layer." />
      </AnimatedSection>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <AnimatedSection key={it.title} delay={i * 0.05}>
            <div className="silver-card-hover p-6 h-full">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-card border border-border/60">
                <it.icon className="h-4 w-4 text-foreground/80" />
              </div>
              <h3 className="font-display text-base font-semibold tracking-tight">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.body}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default WhyOnyx;
