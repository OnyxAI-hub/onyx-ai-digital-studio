import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import BrowserFrame from "@/components/portfolio/BrowserFrame";
import { projects } from "@/data/portfolio";
import { ReactNode } from "react";

import NutrifitHomepage from "@/components/portfolio/mockups/NutrifitHomepage";
import PrimeshineLanding from "@/components/portfolio/mockups/PrimeshineLanding";
import FitnessLanding from "@/components/portfolio/mockups/FitnessLanding";

const previewMap: Record<string, { component: ReactNode; url: string }> = {
  "nutrifit-wellness": { component: <NutrifitHomepage />, url: "nutrifit-wellness.com" },
  "primeshine-cleaning": { component: <PrimeshineLanding />, url: "primeshinecleaning.com" },
  "quality-fitness-club": { component: <FitnessLanding />, url: "qualityfitnessclub.com" },
};

const Portfolio = () => (
  <main className="pt-20">
    {/* Hero */}
    <section className="section-padding">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <span className="mb-4 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Portfolio</span>
          <h1 className="font-display text-4xl font-bold md:text-5xl tracking-tight">
            Our <span className="gradient-text">Recent Work</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Tailored digital experiences built for different business goals and industries.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* Projects */}
    <section className="pb-20 px-4">
      <div className="container-narrow">
        <div className="grid gap-10">
          {projects.map((project, i) => {
            const preview = previewMap[project.slug];
            return (
              <AnimatedSection key={project.title} delay={i * 0.1}>
                <Link to={`/portfolio/${project.slug}`} className="block group">
                  <div className="glass-card-hover overflow-hidden md:flex transition-all duration-300 group-hover:border-foreground/15 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] group-hover:-translate-y-0.5">
                    {/* Preview mockup */}
                    <div className="md:w-[45%] shrink-0 p-4 md:p-5">
                      <div className="transform transition-transform duration-500 group-hover:scale-[1.02]">
                        <BrowserFrame url={preview?.url ?? "example.com"}>
                          <div className="overflow-hidden max-h-[260px]">
                            {preview?.component}
                          </div>
                        </BrowserFrame>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-6 md:p-8 md:w-[55%] flex flex-col justify-center">
                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{project.category}</span>
                      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight group-hover:text-foreground transition-colors">{project.title}</h2>
                      <p className="mt-3 text-muted-foreground leading-relaxed">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground">{tag}</span>
                        ))}
                      </div>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                        Explore Project <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>

    {/* Bottom CTA */}
    <section className="section-padding bg-card/20">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl font-bold tracking-tight">Want Something Built for Your Business?</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Let's discuss your goals and build a digital product you'll be proud to show off.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://calendly.com/onyxai-contact/onyx-consultation" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">Book a Consultation <ArrowRight className="h-4 w-4" /></Button>
            </a>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="gap-2">View Pricing</Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default Portfolio;
