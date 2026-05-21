import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import SafetyBadge from "./SafetyBadge";
import { imageModels } from "@/data/studio";
import { getStudioHref } from "@/lib/studioRouting";

const ImageModelsSection = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <AnimatedSection>
        <SectionHeading
          badge="Image Models"
          title="Image Models"
          description="Create cover art, product visuals, social graphics, campaign images, brand concepts, and more."
        />
      </AnimatedSection>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {imageModels.map((m, i) => (
          <AnimatedSection key={m.name} delay={i * 0.05}>
            <div className="glass-card-hover overflow-hidden h-full flex flex-col">
              <div className={`relative h-32 bg-gradient-to-br ${m.gradient} flex items-center justify-center`}>
                <ImageIcon className="h-8 w-8 text-white/20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.08),transparent_60%)]" />
                <div className="absolute top-3 right-3">
                  <SafetyBadge safety={m.safety} />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-base font-semibold tracking-tight">{m.name}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{m.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.generate.map((g) => (
                    <span key={g} className="rounded-md bg-card/50 border border-border/40 px-1.5 py-0.5 text-[10px] text-foreground/80">
                      {g}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-wider text-foreground/70 font-semibold">{m.cost}</p>
                <Link to={`/project-intake?type=${encodeURIComponent(m.intakeType)}&model=${encodeURIComponent(m.name)}`} className="mt-4">
                  <Button size="sm" variant="outline" className="w-full gap-2 text-[11px] uppercase tracking-wider">
                    Submit Request <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ImageModelsSection;
