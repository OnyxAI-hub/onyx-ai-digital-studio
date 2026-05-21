import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import SafetyBadge from "./SafetyBadge";
import { creativeApps } from "@/data/studio";
import { getStudioHref } from "@/lib/studioRouting";

const CreativeAppsSection = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading
          badge="Creative Apps"
          title="Specialized AI Tools"
          description="Specialized AI tools for editing, motion, brand visuals, and creative workflows."
        />
      </AnimatedSection>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {creativeApps.map((a, i) => {
          const available = a.status === "Available";
          const ctaLabel = available ? "Request This" : a.status === "Early Access" ? "Request Access" : "Coming Soon";
          return (
            <AnimatedSection key={a.title} delay={i * 0.04}>
              <div className="glass-card-hover p-5 h-full flex flex-col">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card border border-border/60">
                    <a.icon className="h-4 w-4 text-foreground/70" />
                  </div>
                  <SafetyBadge safety={a.safety} />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold tracking-tight">{a.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed flex-1">{a.description}</p>
                <p className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground/80">{a.status}</p>
                <Link to={getStudioHref(a.intakeType, { app: a.title })} className="mt-3">
                  <Button size="sm" variant="outline" className="w-full text-[11px] uppercase tracking-wider">
                    {ctaLabel}
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
      <AnimatedSection>
        <p className="mt-6 text-center text-[11px] text-muted-foreground/70 max-w-2xl mx-auto">
          Some tools, models, and request types may be restricted based on safety rules, platform policies, or availability. Face swap, likeness, and similar tools are consent-based and subject to review.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default CreativeAppsSection;
