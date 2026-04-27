import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { packages, extras, CALENDLY } from "@/data/packages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const pricingFaqs = [
  {
    q: "What's included in each package?",
    a: "Starter ($100) includes up to 3 pages, dynamic design, content upload, and 2 feature integrations — perfect for a clean professional presence. Business (starting at $350) adds opt-in forms, autoresponder, payment integration, and up to 5 pages with 5 integrations. Advanced (starting at $500) is our top-tier build with AI chatbot, automation, booking system, full e-commerce (up to 10 products), hosting setup, and up to 8 pages. Each package includes revisions during the active build phase — see the revisions FAQ below for what counts as a revision vs. a new add-on.",
  },
  {
    q: "What counts as a \"revision\" during the build phase?",
    a: "A revision is a refinement to work that's already been built within the agreed scope — things like text edits, color or font tweaks, image swaps, button styling, spacing adjustments, or small layout changes on existing pages. Revisions are unlimited during the active build phase (before final approval and delivery). What does NOT count as a revision: adding new pages, new feature integrations, switching the entire design direction after approval, adding e-commerce or booking systems not in your package, or post-delivery changes. Those are treated as add-ons and quoted separately from the extras menu.",
  },
  {
    q: "How do revision limits actually work during the build?",
    a: "There's no hard cap on the number of revisions while the project is in active build — you can request as many in-scope tweaks as needed until you approve the final version. The build phase ends once you sign off on delivery. After that, any further changes become either (a) a paid add-on from the extras menu, (b) covered under Monthly Maintenance ($30/month), or (c) a new mini-project quote. This keeps timelines tight and protects both sides from endless scope creep.",
  },
  {
    q: "What are the delivery timelines?",
    a: "Starter delivers in 1 day (next-day). Business delivers in 3 days. Advanced delivers in 5 days. Timelines start once we've received all your content, brand assets, and project details. Revision rounds during the build phase are included within these timelines — major scope changes mid-build may shift the delivery date. Need it faster? Add Rush Delivery ($75) to move to the front of the queue.",
  },
  {
    q: "What if my project needs custom scope or features beyond the package?",
    a: "Business and Advanced projects may require a quick consultation before kickoff to confirm scope, selected features, and timeline. Custom features beyond the listed package — extra pages ($20 each), additional plugins ($20), payment integration ($65), AI chatbot ($125), and more — can be added from the extras menu or quoted individually. Anything added mid-build counts as new scope (not a revision) and will be priced and confirmed in writing before work continues.",
  },
  {
    q: "Why are Business and Advanced \"starting at\" prices?",
    a: "The base price covers the standard scope listed on each package. Final pricing depends on the number of pages, feature integrations, add-ons, and timeline. Revisions to in-scope work are included; new features added during or after the build are quoted as extras. We confirm the exact total during your consultation — no surprise charges.",
  },
  {
    q: "Do you offer payment plans or deposits?",
    a: "Starter is paid in full upfront via Stripe. Business and Advanced typically require a 50% deposit to start, with the balance due at delivery. Payment terms — including any add-ons or scope changes added mid-build — are confirmed in writing during your consultation.",
  },
  {
    q: "What happens after my website is delivered?",
    a: "You receive full ownership of your site, all files, and a handoff walkthrough. Once you've approved final delivery, the build phase officially ends — no more free revisions. Future changes are handled three ways: (1) Monthly Maintenance ($30/month) covers small updates, backups, and security monitoring; (2) one-off changes are billed from the extras menu; (3) larger updates are quoted as a new mini-project. Hosting setup is included in Advanced and available as an add-on for other tiers.",
  },
];


const Pricing = () => (
  <main className="pt-20">
    <section className="section-padding">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <span className="mb-4 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Pricing</span>
          <h1 className="font-display text-4xl font-bold md:text-5xl tracking-tight">
            Invest in a Website That <span className="gradient-text">Works for You</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Premium web solutions built around your goals. Choose a package or book a consultation to scope your project.
          </p>
        </AnimatedSection>
      </div>
    </section>

    <section className="pb-12 px-4">
      <div className="container-narrow">
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => {
            const isExternal = pkg.ctaLink.startsWith("http");
            return (
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
                    {pkg.pricePrefix && (
                      <span className="block text-xs text-muted-foreground mb-0.5">{pkg.pricePrefix}</span>
                    )}
                    <span className="font-display text-5xl font-bold">${pkg.price.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{pkg.description}</p>
                  <ul className="mb-6 flex-1 space-y-3">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  {pkg.supportingNote && (
                    <p className="mb-4 text-[11px] leading-relaxed text-muted-foreground/70">
                      {pkg.supportingNote}
                    </p>
                  )}
                  {isExternal ? (
                    <a href={pkg.ctaLink} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full" variant={pkg.highlighted ? "default" : "outline"}>
                        {pkg.cta} <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </a>
                  ) : (
                    <Link to={pkg.ctaLink}>
                      <Button className="w-full" variant={pkg.highlighted ? "default" : "outline"}>
                        {pkg.cta} <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  )}
                  {pkg.consultationNote && pkg.ctaLink !== CALENDLY && (
                    <a
                      href={CALENDLY}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block text-center text-xs text-muted-foreground/70 underline underline-offset-2 transition-colors hover:text-foreground"
                    >
                      {pkg.consultationNote}
                    </a>
                  )}
                  {pkg.intakeLink && (
                    <Link
                      to={pkg.intakeLink}
                      className="mt-3 block text-center text-xs text-muted-foreground/70 underline underline-offset-2 transition-colors hover:text-foreground"
                    >
                      Need a more detailed project planner? Open Full Project Intake
                    </Link>
                  )}
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Scope note */}
        <AnimatedSection delay={0.3}>
          <p className="mt-8 text-center text-xs text-muted-foreground/60 max-w-xl mx-auto">
            Business and Advanced projects may require a consultation before kickoff to confirm scope, timeline, selected features, and final deliverables.
          </p>
          <p className="mt-3 text-center text-xs text-muted-foreground/70">
            Ready to share full project details?{" "}
            <Link to="/project-intake" className="underline underline-offset-2 transition-colors hover:text-foreground">
              Use the detailed intake form
            </Link>
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* Extras */}
    <section className="section-padding bg-card/20">
      <div className="container-narrow">
        <AnimatedSection>
          <SectionHeading badge="Add-Ons" title="Extras & Enhancements" description="Extend any package with premium add-ons tailored to your needs." />
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

    {/* Pricing FAQ */}
    <section className="section-padding bg-card/20">
      <div className="container-narrow max-w-3xl">
        <AnimatedSection>
          <SectionHeading
            badge="FAQ"
            title="Pricing Questions, Answered"
            description="Everything you need to know about packages, revisions, timelines, and custom scope."
          />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <Accordion type="single" collapsible className="mt-8 space-y-3">
            {pricingFaqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="glass-card border-border/40 px-5"
              >
                <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl font-bold tracking-tight">Need a Custom Quote?</h2>
          <p className="mt-3 text-muted-foreground">Every business is different. Let's talk about what you need.</p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block">
            <Button size="lg" className="gap-2">Book a Consultation <ArrowRight className="h-4 w-4" /></Button>
          </a>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default Pricing;
