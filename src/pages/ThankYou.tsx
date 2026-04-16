import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Briefcase, CalendarCheck, ClipboardCheck, MessageSquare, Rocket } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

const steps = [
  { icon: ClipboardCheck, title: "Review", desc: "I review your inquiry and project goals" },
  { icon: MessageSquare, title: "Connect", desc: "Book your consultation to discuss the project in more detail" },
  { icon: Rocket, title: "Build", desc: "If we're a fit, I'll guide you into the next step" },
];

const ThankYou = () => (
  <main className="pt-20 min-h-[80vh] flex items-center">
    <div className="container-narrow text-center py-20">
      <AnimatedSection>
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-border/30 bg-card/30">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          Your inquiry was received
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-muted-foreground leading-relaxed">
          Thanks for reaching out to ONYX AI. I've received your project details and will review them shortly.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <div className="mx-auto mt-14 grid max-w-2xl gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={i} className="glass-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-border/30 bg-card/40">
                <s.icon className="h-5 w-5 text-foreground/70" />
              </div>
              <h3 className="font-display text-sm font-semibold tracking-tight mb-1">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.25}>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://calendly.com/onyxai-contact/onyx-consultation" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              <CalendarCheck className="h-4 w-4" /> Book Your Consultation <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
          <Button variant="outline" size="lg" asChild>
            <Link to="/portfolio">
              <Briefcase className="mr-2 h-4 w-4" /> View Portfolio
            </Link>
          </Button>
        </div>
        <p className="mt-10 text-xs text-muted-foreground/60 tracking-wide">
          Typical response time: within 24–48 hours
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.35}>
        <div className="mx-auto mt-16 max-w-md rounded-lg border border-border/30 bg-card/20 p-6 text-center">
          <p className="mb-1 text-sm font-medium text-muted-foreground">Ready to move forward immediately?</p>
          <p className="mb-4 text-xs text-muted-foreground/70">Starter package — $150 flat, direct checkout.</p>
          <a href="https://buy.stripe.com/6oU6oG5PZ2U66lL2qX1RC03" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="w-full gap-2">
              Pay for Starter Package <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </AnimatedSection>
    </div>
  </main>
);

export default ThankYou;
