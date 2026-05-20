import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageIcon, Video, Mic, Globe, Bot, Sparkles, Upload, ArrowRight, Info } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import StudioSidebar from "@/components/studio/StudioSidebar";
import { modelCategories } from "@/data/credits";

type Tab = "Image" | "Video" | "Audio" | "Website" | "Automation";

const TABS: { id: Tab; label: string; icon: typeof ImageIcon; intakeType: string; cost: string }[] = [
  { id: "Image", label: "Image", icon: ImageIcon, intakeType: "AI Image Creation", cost: "From 5 credits" },
  { id: "Video", label: "Video", icon: Video, intakeType: "AI Video Generation", cost: "From 500 credits" },
  { id: "Audio", label: "Audio", icon: Mic, intakeType: "Custom AI Request", cost: "From 10 credits" },
  { id: "Website", label: "Website", icon: Globe, intakeType: "Website / Landing Page", cost: "Custom quote" },
  { id: "Automation", label: "Automation", icon: Bot, intakeType: "Automation System", cost: "Custom quote" },
];

const Generate = () => {
  const [tab, setTab] = useState<Tab>("Image");
  const [prompt, setPrompt] = useState("");
  const active = TABS.find((t) => t.id === tab)!;
  const submitHref = `/project-intake?type=${encodeURIComponent(active.intakeType)}&prompt=${encodeURIComponent(prompt)}`;

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedSection>
            <div className="text-center">
              <span className="mb-4 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Generate
              </span>
              <h1 className="font-display text-4xl font-bold md:text-5xl tracking-tight">
                Create With <span className="gradient-text">ONYX AI Studio</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Describe what you want to create. ONYX reviews every request and fulfills it through our AI workflows and creative team.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="mt-10 glass-card p-6 md:p-8 max-w-3xl mx-auto">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-5">
                {TABS.map((t) => {
                  const isActive = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
                        isActive
                          ? "border-foreground/40 bg-foreground/10 text-foreground"
                          : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <t.icon className="h-3.5 w-3.5" />
                      {t.label}
                    </button>
                  );
                })}
              </div>

              {/* Prompt */}
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create…  e.g. 'A cinematic 10s promo video for my coffee brand, moody lighting, slow zoom-in'"
                className="min-h-[140px] text-base"
              />

              {/* Meta row */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/40 bg-card/30 p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  Estimated cost: <span className="text-foreground font-medium">{active.cost}</span>
                </div>
                <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Upload className="h-3.5 w-3.5" /> Attach reference (on intake)
                </button>
              </div>

              <Link to={submitHref}>
                <Button size="lg" className="mt-5 w-full gap-2">
                  Submit Request <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <div className="mt-4 flex items-start gap-2 text-[11px] text-muted-foreground/80 leading-relaxed">
                <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <p>
                  Requests are reviewed before production. Pricing and credit usage may vary depending on complexity, length, and quality. Video, audio, and premium creative requests use more credits.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Model categories */}
          <div className="mt-16">
            <AnimatedSection>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-center tracking-tight">
                Create Across Multiple AI Workflows
              </h2>
              <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
                Different workflows for different needs — pick one to start a request.
              </p>
            </AnimatedSection>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {modelCategories.map((m, i) => (
                <AnimatedSection key={m.title} delay={i * 0.05}>
                  <Link to={`/project-intake?type=${encodeURIComponent(m.intakeType)}`} className="block h-full">
                    <div className="glass-card-hover p-5 h-full">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-card border border-border/60">
                        <m.icon className="h-4 w-4 text-foreground/70" />
                      </div>
                      <h3 className="font-display text-base font-semibold tracking-tight">{m.title}</h3>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{m.description}</p>
                      <p className="mt-3 text-[11px] uppercase tracking-wider text-foreground/60 font-medium">{m.cost}</p>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Recent placeholder */}
          <AnimatedSection delay={0.2}>
            <div className="mt-16 glass-card p-8 text-center max-w-3xl mx-auto">
              <h3 className="font-display text-lg font-semibold tracking-tight">Recent Requests</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign-in and request history will appear here once accounts are enabled. For now, submit a request and we'll follow up by email.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default Generate;
