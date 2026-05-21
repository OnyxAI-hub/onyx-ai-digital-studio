import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { studioCategories } from "@/data/studio";
import { getStudioHref } from "@/lib/studioRouting";

const StudioCategoriesSection = () => (
  <section id="studio" className="section-padding">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading
          badge="Creation Hub"
          title="The ONYX Creation Studio"
          description="One hub for image, video, audio, design, and clip workflows — request-based while full model APIs are phased in."
        />
      </AnimatedSection>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {studioCategories.map((c, i) => (
          <AnimatedSection key={c.title} delay={i * 0.05}>
            <div className="glass-card-hover p-5 h-full flex flex-col">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-card border border-border/60">
                <c.icon className="h-4 w-4 text-foreground/70" />
              </div>
              <h3 className="font-display text-base font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{c.description}</p>
              <ul className="mt-3 mb-4 flex flex-wrap gap-1.5">
                {c.items.map((it) => (
                  <li key={it} className="rounded-md border border-border/40 bg-card/30 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    {it}
                  </li>
                ))}
              </ul>
              <Link to={c.title === "Studio Gallery" ? "/gallery" : getStudioHref(c.intakeType)} className="mt-auto">
                <Button size="sm" variant="outline" className="w-full gap-2 text-[11px] uppercase tracking-wider">
                  {c.cta} <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        ))}
      </div>
      <AnimatedSection>
        <p className="mt-6 text-center text-[11px] text-muted-foreground/70 max-w-2xl mx-auto">
          Some platform features are launching in phases. Creative requests may be reviewed and fulfilled by ONYX AI Studio while automated model access is being built.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default StudioCategoriesSection;
