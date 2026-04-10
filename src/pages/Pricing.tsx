import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { packages, extras } from "@/data/packages";

const Pricing = () => (
  <main className="pt-20">
    <section className="section-padding">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <span className="mb-4 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Pricing</span>
          <h1 className="font-display text-4xl font-bold md:text-5xl tracking-tight">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Pick the package that fits your business. No hidden fees, no surprises.
          </p>
        </AnimatedSection>
      </div>
    </section>

    <section className="pb-20 px-4">
      <div className="container-narrow">
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <AnimatedSection key={pkg.name} delay={i * 0.1}>
              <div className={`glass-card p-8 h-full flex flex-col relative ${pkg.highlighted ? "border-foreground/20 shadow-[0_0_50px_rgba(255,255,255,0.04)] md:scale-105" : ""}`}>
                {pkg.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-4 py-1 text-xs font-semibold text-background">
                    {pkg.badge}
                  </span>
                )}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-card border border-border/60">
                  <pkg.icon className="h-5 w-5 text-foreground/70" />
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight">{pkg.name}</h3>
                <div className="mt-2 mb-2">
                  <span className="font-display text-5xl font-bold">${pkg.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{pkg.description}</p>
                <ul className="mb-8 flex-1 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button className="w-full" variant={pkg.highlighted ? "default" : "outline"}>
                    Get Started <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Extras */}
    <section className="section-padding bg-card/20">
      <div className="container-narrow">
        <AnimatedSection>
          <SectionHeading badge="Add-Ons" title="Extras & Enhancements" description="Add these to any package for more functionality." />
        </AnimatedSection>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {extras.map((extra, i) => (
            <AnimatedSection key={extra.name} delay={i * 0.05}>
              <div className="glass-card-hover p-5 flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-display text-sm font-semibold">{extra.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{extra.description}</p>
                </div>
                <span className="shrink-0 rounded-md bg-card border border-border/60 px-2 py-1 text-xs font-semibold text-foreground/70">{extra.price}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl font-bold tracking-tight">Need a Custom Quote?</h2>
          <p className="mt-3 text-muted-foreground">Every business is different. Let's talk about what you need.</p>
          <Link to="/contact" className="mt-6 inline-block">
            <Button size="lg" className="gap-2">Book a Consultation <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default Pricing;
