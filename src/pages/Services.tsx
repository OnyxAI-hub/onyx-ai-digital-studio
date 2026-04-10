import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { coreServices } from "@/data/services";
import { extras } from "@/data/packages";

const Services = () => (
  <main className="pt-20">
    <section className="section-padding">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <span className="mb-4 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Our Services
          </span>
          <h1 className="font-display text-4xl font-bold md:text-5xl tracking-tight">
            Everything You Need to <span className="gradient-text">Succeed Online</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From professional websites to custom web applications and AI-powered tools — we build what your business needs.
          </p>
        </AnimatedSection>
      </div>
    </section>

    <section className="section-padding bg-card/20">
      <div className="container-narrow">
        <AnimatedSection>
          <SectionHeading badge="Core Services" title="What We Build" />
        </AnimatedSection>
        <div className="grid gap-6 md:grid-cols-2">
          {coreServices.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.05}>
              <Link
                to={`/contact?service=${encodeURIComponent(service.title)}`}
                className="block h-full"
              >
                <div className="glass-card-hover p-6 h-full group cursor-pointer transition-all">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-card border border-border/60">
                    <service.icon className="h-5 w-5 text-foreground/70" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2 tracking-tight group-hover:text-foreground transition-colors">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                  <ul className="space-y-1.5 mb-4">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    Get started <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-narrow">
        <AnimatedSection>
          <SectionHeading badge="Add-Ons" title="Extras & Enhancements" description="Boost your project with these optional add-on services." />
        </AnimatedSection>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {extras.map((extra, i) => (
            <AnimatedSection key={extra.name} delay={i * 0.05}>
              <Link
                to={`/contact?extra=${encodeURIComponent(extra.name)}`}
                className="block"
              >
                <div className="glass-card-hover p-5 flex items-start justify-between gap-4 group cursor-pointer transition-all">
                  <div>
                    <h4 className="font-display text-sm font-semibold group-hover:text-foreground transition-colors">{extra.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{extra.description}</p>
                  </div>
                  <span className="shrink-0 rounded-md bg-card border border-border/60 px-2 py-1 text-xs font-semibold text-foreground/70">{extra.price}</span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-card/20">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl font-bold tracking-tight">Not Sure What You Need?</h2>
          <p className="mt-3 text-muted-foreground">Book a free consultation and we'll recommend the best solution for your business.</p>
          <Link to="/contact" className="mt-6 inline-block">
            <Button size="lg" className="gap-2">Book a Consultation <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default Services;
