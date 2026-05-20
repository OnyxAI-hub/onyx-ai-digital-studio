import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, RefreshCw, Check, X, Plus, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { packages, extras, CALENDLY } from "@/data/packages";
import { creditPlans, creditPacks, creditCostRows, oneTimeServices } from "@/data/credits";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const pricingFaqs = [
  {
    q: "What's included in each offer?",
    a: "Business Website (starting at $300) covers up to 5 pages, mobile-friendly design, service sections, contact form, click-to-call buttons, basic SEO, and speed optimization — ideal for service businesses that need a credible online presence. Advanced Website / Web App (starting at $500) extends to 8 pages and adds booking, payments, customer intake, e-commerce or product setup, autoresponder/email automation, workflow automation, and hosting setup support. AI Voice Agent Setup (starting at $500) configures an AI phone assistant with a custom call flow, FAQ training, lead capture, call summaries, and missed-call support. Each website offer includes revisions during the active build phase — see the revisions FAQ below for what counts.",
  },
  {
    q: "What counts as a \"revision\" during the build phase?",
    a: "A revision is a refinement to work that's already been built within the agreed scope — text edits, color or font tweaks, image swaps, button styling, spacing adjustments, or small layout changes on existing pages. Revisions are unlimited during the active build phase (before final approval and delivery). What does NOT count: adding new pages, new feature integrations, switching the entire design direction after approval, adding e-commerce or booking systems not in your package, or post-delivery changes. Those are treated as add-ons and quoted separately from the extras menu.",
  },
  {
    q: "How do revision limits actually work during the build?",
    a: "There's no hard cap on the number of revisions while the project is in active build — you can request as many in-scope tweaks as needed until you approve the final version. The build phase ends once you sign off on delivery. After that, any further changes become either (a) a paid add-on from the extras menu, (b) covered under Monthly Maintenance ($30/month), or (c) a new mini-project quote. This keeps timelines tight and protects both sides from endless scope creep.",
  },
  {
    q: "What are the delivery timelines?",
    a: "Business Website delivers in roughly 7 days. Advanced Website / Web App delivers in roughly 14 days. AI Voice Agent Setup timelines depend on call flow complexity and platform setup — confirmed during your consultation. Timelines start once we've received all your content, brand assets, and project details. Need it faster? Add Rush Delivery ($75) to move to the front of the queue.",
  },
  {
    q: "What if my project needs custom scope or features beyond the package?",
    a: "Business and Advanced projects may require a quick consultation before kickoff to confirm scope, selected features, and timeline. Custom features beyond the listed package — extra pages ($20 each), additional plugins ($20), payment integration ($65), AI chatbot ($125), and more — can be added from the extras menu or quoted individually. Anything added mid-build counts as new scope (not a revision) and will be priced and confirmed in writing before work continues.",
  },
  {
    q: "Why are these \"starting at\" prices?",
    a: "The base price covers the standard scope listed on each offer. Final pricing depends on the number of pages, feature integrations, add-ons, and timeline. For AI Voice Agent Setup, pricing also depends on call volume, platform costs, phone number setup, and workflow complexity. Revisions to in-scope work are included; new features added during or after the build are quoted as extras. We confirm the exact total during your consultation — no surprise charges.",
  },
  {
    q: "Do you offer payment plans or deposits?",
    a: "Business and Advanced typically require a 50% deposit to start, with the balance due at delivery. AI Voice Agent Setup follows a similar deposit structure, with platform/usage costs handled separately. Payment terms — including any add-ons or scope changes added mid-build — are confirmed in writing during your consultation.",
  },
  {
    q: "What happens after my project is delivered?",
    a: "You receive full ownership of your site or system, all files, and a handoff walkthrough. Once you've approved final delivery, the build phase officially ends — no more free revisions. Future changes are handled three ways: (1) Monthly Maintenance ($30/month) covers small updates, backups, and security monitoring; (2) one-off changes are billed from the extras menu; (3) larger updates are quoted as a new mini-project. Hosting setup is included in Advanced and available as an add-on for other tiers.",
  },
];


const Pricing = () => {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
  <main className="pt-20">
    <section className="section-padding pb-8">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <span className="mb-4 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Pricing</span>
          <h1 className="font-display text-4xl font-bold md:text-5xl tracking-tight">
            Credits, Subscriptions & <span className="gradient-text">Custom Services</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Subscribe for monthly credits, top up with credit packs, or book ONYX for done-for-you websites, automation, and AI agent builds.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* ─── SaaS Credit Plans ─── */}
    <section className="pb-16 px-4">
      <div className="container-narrow">
        <AnimatedSection>
          <div className="text-center mb-8">
            <span className="mb-3 inline-block rounded-full border border-border/60 bg-card/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Credit Subscriptions
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Monthly Credit Plans</h2>
            <p className="mt-2 text-sm text-muted-foreground">Use credits toward AI creative requests reviewed and fulfilled by ONYX.</p>

            <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/60 p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${billing === "monthly" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${billing === "annual" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                Annual <span className="ml-1 text-[9px] opacity-70">Save ~30%</span>
              </button>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          {creditPlans.map((p, i) => {
            const price = billing === "monthly" ? p.monthly : p.annualMonthly;
            return (
              <AnimatedSection key={p.name} delay={i * 0.05}>
                <div className={`glass-card p-6 h-full flex flex-col relative ${p.popular ? "border-foreground/25 shadow-[0_0_40px_rgba(255,255,255,0.05)]" : ""}`}>
                  {p.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-background">
                      Popular
                    </span>
                  )}
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-card border border-border/60">
                    <p.icon className="h-4 w-4 text-foreground/70" />
                  </div>
                  <h3 className="font-display text-lg font-bold tracking-tight">{p.name}</h3>
                  <div className="mt-2 mb-1">
                    <span className="font-display text-3xl font-bold">${price}</span>
                    <span className="text-xs text-muted-foreground">/mo</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground/80 mb-3">
                    {billing === "annual" ? "billed annually" : "billed monthly"}
                  </p>
                  <p className="text-xs font-medium text-foreground/80 mb-4">{p.credits}</p>
                  <ul className="mb-5 flex-1 space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs">
                        <CheckCircle className="h-3 w-3 shrink-0 text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/project-intake?type=${encodeURIComponent(p.intakeType)}&plan=${encodeURIComponent(p.name)}`}>
                    <Button className="w-full" variant={p.popular ? "default" : "outline"} size="sm">
                      {p.cta}
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={0.2}>
          <p className="mt-6 text-center text-[11px] text-muted-foreground/70 max-w-2xl mx-auto">
            Credits can be used toward AI creative requests reviewed and fulfilled by ONYX AI Studio. Some requests may require review before production. Video, audio, and premium creative requests use more credits because they cost more to process.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* ─── Credit Cost Breakdown ─── */}
    <section className="pb-16 px-4">
      <div className="container-narrow max-w-4xl">
        <AnimatedSection>
          <SectionHeading badge="Transparent" title="Credit Costs" description="Different request types use different credit amounts depending on complexity, model cost, quality, length, and delivery needs." />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div className="mt-8 glass-card overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-border/40 bg-card/40 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="col-span-4">Generation Type</div>
              <div className="col-span-5">Example Use</div>
              <div className="col-span-3 text-right">Starting Credit Cost</div>
            </div>
            {creditCostRows.map((row) => (
              <div key={row.type} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 border-b border-border/20 last:border-0 text-sm">
                <div className="md:col-span-4 font-medium text-foreground">{row.type}</div>
                <div className="md:col-span-5 text-muted-foreground text-xs md:text-sm">{row.use}</div>
                <div className="md:col-span-3 md:text-right text-xs font-semibold text-foreground/80">{row.cost}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[11px] text-muted-foreground/70 max-w-2xl mx-auto">
            Credit usage is reviewed before production for request-based projects.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* ─── One-Time Credit Packs ─── */}
    <section className="pb-16 px-4 section-charcoal py-16">
      <div className="container-narrow">
        <AnimatedSection>
          <SectionHeading badge="Top Up" title="Need Extra Credits?" description="One-time credit packs that never expire on active accounts." />
        </AnimatedSection>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {creditPacks.map((pack, i) => (
            <AnimatedSection key={pack.name} delay={i * 0.05}>
              <div className="glass-card-hover p-6 text-center h-full flex flex-col">
                <Sparkles className="mx-auto h-5 w-5 text-foreground/70" />
                <h3 className="mt-3 font-display text-base font-semibold tracking-tight">{pack.name}</h3>
                <div className="mt-3 font-display text-3xl font-bold">${pack.price}</div>
                <p className="mt-1 text-xs text-muted-foreground">{pack.credits}</p>
                <Link to={`/project-intake?type=Creative%20Credit%20Pack&plan=${encodeURIComponent(pack.name)}`} className="mt-5">
                  <Button variant="outline" size="sm" className="w-full">Buy Pack</Button>
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <p className="mt-6 text-center text-[11px] text-muted-foreground/70 max-w-2xl mx-auto">
          Credit packs can be used toward creative requests, image generations, video concepts, music visuals, brand assets, and more. Pro and Ultra members may receive bonus credits or model discounts when available.
        </p>
      </div>
    </section>

    {/* ─── One-Time Services ─── */}
    <section className="pb-16 px-4 py-16">
      <div className="container-narrow">
        <AnimatedSection>
          <SectionHeading badge="Done For You" title="One-Time Services" description="Prefer a custom build over credits? Book ONYX for the full project." />
        </AnimatedSection>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {oneTimeServices.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.05}>
              <Link to={`/project-intake?type=${encodeURIComponent(s.intakeType)}`} className="block h-full">
                <div className="glass-card-hover p-6 h-full">
                  <h3 className="font-display text-base font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-foreground/60 font-medium">{s.price}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* ─── Legacy package tiers (kept) ─── */}
    <section className="pb-12 px-4">
      <div className="container-narrow">
        <AnimatedSection>
          <SectionHeading badge="Featured" title="Flagship Project Packages" description="Original ONYX packages — fully scoped for websites, web apps, and AI agents." />
        </AnimatedSection>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
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
                    {pkg.priceMax && (
                      <span className="font-display text-2xl font-semibold text-muted-foreground"> – ${pkg.priceMax.toLocaleString()}</span>
                    )}
                    {pkg.priceMax && (
                      <span className="block text-[11px] text-muted-foreground/70 mt-1">Typical project range</span>
                    )}
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

    {/* Revision Policy Callout */}
    <section className="pb-12 px-4">
      <div className="container-narrow">
        <AnimatedSection>
          <div className="glass-card p-8 md:p-10 border-border/60">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-card border border-border/60">
                <RefreshCw className="h-5 w-5 text-foreground/70" />
              </div>
              <div>
                <span className="mb-2 inline-block rounded-full border border-border/60 bg-card/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Revision Policy
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                  How Revisions Work
                </h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                  Clear, fair, and built to keep your project on track. Here's exactly what's included — and what isn't.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {/* Included */}
              <div className="rounded-lg border border-border/60 bg-card/40 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Check className="h-4 w-4 text-foreground" />
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider">Counts as a Revision</h3>
                </div>
                <p className="text-xs text-muted-foreground/80 mb-3">Unlimited during the active build phase.</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-foreground/40">•</span> Text & copy edits</li>
                  <li className="flex gap-2"><span className="text-foreground/40">•</span> Color, font & styling tweaks</li>
                  <li className="flex gap-2"><span className="text-foreground/40">•</span> Image swaps</li>
                  <li className="flex gap-2"><span className="text-foreground/40">•</span> Button & spacing adjustments</li>
                  <li className="flex gap-2"><span className="text-foreground/40">•</span> Small layout changes on existing pages</li>
                </ul>
              </div>

              {/* Build phase ends */}
              <div className="rounded-lg border border-border/60 bg-card/40 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <X className="h-4 w-4 text-foreground" />
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider">Build Phase Ends</h3>
                </div>
                <p className="text-xs text-muted-foreground/80 mb-3">When you sign off on final delivery.</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-foreground/40">•</span> Final approval = handoff complete</li>
                  <li className="flex gap-2"><span className="text-foreground/40">•</span> Files & ownership transferred</li>
                  <li className="flex gap-2"><span className="text-foreground/40">•</span> Free revisions period closes</li>
                  <li className="flex gap-2"><span className="text-foreground/40">•</span> Future updates billed separately</li>
                  <li className="flex gap-2"><span className="text-foreground/40">•</span> Maintenance plan available ($30/mo)</li>
                </ul>
              </div>

              {/* Paid add-ons */}
              <div className="rounded-lg border border-border/60 bg-card/40 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Plus className="h-4 w-4 text-foreground" />
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider">Becomes a Paid Add-On</h3>
                </div>
                <p className="text-xs text-muted-foreground/80 mb-3">Quoted from the extras menu before work continues.</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-foreground/40">•</span> New pages ($20 each)</li>
                  <li className="flex gap-2"><span className="text-foreground/40">•</span> New feature integrations ($20+)</li>
                  <li className="flex gap-2"><span className="text-foreground/40">•</span> Full design direction change after approval</li>
                  <li className="flex gap-2"><span className="text-foreground/40">•</span> E-commerce or booking not in package</li>
                  <li className="flex gap-2"><span className="text-foreground/40">•</span> Any post-delivery changes</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-xs text-muted-foreground/70 text-center">
              Scope changes are always confirmed in writing before any extra work begins — no surprise charges.
            </p>
          </div>
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

    {/* Ongoing Support Teaser */}
    <section className="pb-12 px-4">
      <div className="container-narrow max-w-3xl">
        <AnimatedSection>
          <div className="glass-card p-8 md:p-10 text-center">
            <span className="mb-3 inline-block rounded-full border border-border/60 bg-card/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              After Launch
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Ongoing Support Available</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              After your website, web app, or automation system is launched, ONYX AI Studios can provide ongoing support for updates, maintenance, automations, and improvements.
            </p>
            <p className="mt-4 text-sm font-medium text-foreground/80">
              Monthly support plans start at <span className="text-foreground">$50/month</span>.
            </p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block">
              <Button variant="outline" className="gap-2">Ask About Monthly Support <ArrowRight className="h-4 w-4" /></Button>
            </a>
          </div>
        </AnimatedSection>
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
};

export default Pricing;
