import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import SafetyBadge from "./SafetyBadge";
import { videoModels } from "@/data/studio";
import { getStudioHref } from "@/lib/studioRouting";

const VideoModelsSection = () => (
  <section className="section-padding section-silver">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading
          badge="Video Models"
          title="Video Models"
          description="Create short AI video clips, motion concepts, promo visuals, cinematic loops, and music visuals."
        />
      </AnimatedSection>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {videoModels.map((m, i) => (
          <AnimatedSection key={m.name} delay={i * 0.05}>
            <div className="glass-card-hover p-5 h-full flex flex-col">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card border border-border/60">
                  <Video className="h-4 w-4 text-foreground/70" />
                </div>
                <SafetyBadge safety={m.safety} />
              </div>
              <h3 className="mt-4 font-display text-base font-bold tracking-tight">{m.name}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{m.description}</p>
              <div className="mt-4 rounded-md border border-border/40 bg-card/30 divide-y divide-border/30">
                {m.tiers.map((t) => (
                  <div key={t.length} className="flex items-center justify-between px-3 py-1.5 text-[11px]">
                    <span className="text-muted-foreground">{t.length}</span>
                    <span className="font-semibold text-foreground/90">{t.credits}</span>
                  </div>
                ))}
              </div>
              <Link to={getStudioHref(m.intakeType, { model: m.name })} className="mt-4">
                <Button size="sm" variant="outline" className="w-full gap-2 text-[11px] uppercase tracking-wider">
                  Submit Request <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        ))}
      </div>
      <AnimatedSection>
        <p className="mt-6 text-center text-[11px] text-muted-foreground/70 max-w-2xl mx-auto">
          Video credit costs vary by model, duration, quality, and generation complexity. Prices shown are starting estimates.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default VideoModelsSection;
