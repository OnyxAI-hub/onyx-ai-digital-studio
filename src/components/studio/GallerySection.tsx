import { useState } from "react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { galleryItems, galleryTabs } from "@/data/studio";
import { Sparkles } from "lucide-react";

const GallerySection = () => {
  const [tab, setTab] = useState<(typeof galleryTabs)[number]>("All");
  const items = tab === "All" ? galleryItems : galleryItems.filter((g) => g.category === tab);

  return (
    <section id="gallery" className="section-padding">
      <div className="container-narrow">
        <AnimatedSection>
          <SectionHeading
            badge="Featured Concepts"
            title="Studio Gallery"
            description="Featured concepts and AI-generated work from ONYX projects. Demo gallery while community publishing is in development."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {galleryTabs.map((t) => {
              const active = t === tab;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-full border px-3.5 py-1 text-[11px] font-medium uppercase tracking-wider transition-all ${
                    active
                      ? "border-foreground/40 bg-foreground/10 text-foreground"
                      : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px]">
          {items.map((g, i) => (
            <AnimatedSection
              key={g.title + i}
              delay={i * 0.03}
              className={`${g.span === "tall" ? "row-span-2" : ""} ${g.span === "wide" ? "sm:col-span-2" : ""}`}
            >
              <div className={`group relative h-full w-full overflow-hidden rounded-lg border border-border/60 bg-gradient-to-br ${g.gradient}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_55%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="rounded-full border border-white/15 bg-black/40 backdrop-blur px-2 py-0.5 text-[9px] uppercase tracking-wider text-white/80">
                    {g.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-[13px] font-semibold text-white tracking-tight">{g.title}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[10px] text-white/60">
                    <Sparkles className="h-2.5 w-2.5" /> {g.model}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <p className="mt-6 text-center text-[11px] text-muted-foreground/70">
            Demo gallery — featured concepts representing ONYX studio outputs. Real community publishing rolls out in phases.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default GallerySection;
