import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { projects } from "@/data/portfolio";

const Portfolio = () => (
  <main className="pt-20">
    <section className="section-padding">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <span className="mb-4 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Portfolio</span>
          <h1 className="font-display text-4xl font-bold md:text-5xl tracking-tight">
            Our <span className="gradient-text">Recent Work</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Real projects, real results. Here's a look at what we've built for our clients.
          </p>
        </AnimatedSection>
      </div>
    </section>

    <section className="pb-20 px-4">
      <div className="container-narrow">
        <div className="grid gap-8">
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.1}>
              <Link to={`/portfolio/${project.slug}`} className="block group">
                <div className="glass-card-hover overflow-hidden md:flex transition-all duration-300 group-hover:border-foreground/20 group-hover:shadow-lg group-hover:shadow-foreground/5">
                  <div className={`h-64 md:h-auto md:w-2/5 bg-gradient-to-br ${project.gradient} flex items-center justify-center opacity-50 group-hover:opacity-70 transition-opacity duration-300`}>
                    <span className="font-display text-2xl font-bold opacity-30 group-hover:opacity-50 transition-opacity">{project.title}</span>
                  </div>
                  <div className="p-8 md:w-3/5">
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{project.category}</span>
                    <h2 className="mt-2 font-display text-2xl font-bold tracking-tight group-hover:text-foreground transition-colors">{project.title}</h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                      View Project <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
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
          <h2 className="font-display text-3xl font-bold tracking-tight">Want to See Your Business Here?</h2>
          <p className="mt-3 text-muted-foreground">Let's build something you'll be proud to show off.</p>
          <Link to="/contact" className="mt-6 inline-block">
            <Button size="lg" className="gap-2">Start Your Project <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default Portfolio;
