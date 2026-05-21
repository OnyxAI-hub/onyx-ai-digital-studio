import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import SafetyBadge from "./SafetyBadge";
import { modelHighlights } from "@/data/studio";
import { getStudioHref } from "@/lib/studioRouting";

const ModelHighlightsSection = () => (
  <section id="models" className="section-padding section-silver">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading
          badge="Model Highlights"
          title="Powerful AI Workflows"
          description="Explore powerful AI workflows for images, video, audio, design, and more."
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="relative -mx-4 px-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-5 min-w-max">
            {modelHighlights.map((m) => (
              <div
                key={m.name}
                className="silver-card-hover w-[300px] shrink-0 p-5 flex flex-col"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-md border border-border/60 bg-card/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {m.type}
                  </span>
                  <SafetyBadge safety={m.safety} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-foreground">{m.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{m.description}</p>
                <div className="mt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">Generate</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {m.generate.map((g) => (
                      <span key={g} className="rounded-md bg-card/50 border border-border/40 px-1.5 py-0.5 text-[10px] text-foreground/80">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-foreground/80 font-medium">
                    <Sparkles className="h-3 w-3" /> {m.cost}
                  </span>
                  {m.status && (
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.status}</span>
                  )}
                </div>
                <Link to={getStudioHref(m.intakeType, { model: m.name })} className="mt-4">
                  <Button size="sm" className="w-full gap-2 text-[11px] uppercase tracking-wider">
                    Create With This Model <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <p className="mt-4 text-center text-[11px] text-muted-foreground/70 max-w-2xl mx-auto">
          Model names are platform-internal workflow labels. Credit costs vary by model, output type, quality, length, and complexity.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default ModelHighlightsSection;
