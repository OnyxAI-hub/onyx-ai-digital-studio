import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Briefcase, CalendarCheck } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

const ThankYou = () => (
  <main className="pt-20 min-h-[80vh] flex items-center">
    <div className="container-narrow text-center py-20">
      <AnimatedSection>
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-border/40 bg-card/40">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          Your inquiry was received
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted-foreground leading-relaxed">
          Thanks for reaching out to ONYX AI. I'll review your details and follow up soon.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/portfolio">
              <Briefcase className="mr-2 h-4 w-4" /> View Portfolio
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://calendly.com/onyxai-contact/onyx-consultation" target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="mr-2 h-4 w-4" /> Book a Consultation
            </a>
          </Button>
        </div>
      </AnimatedSection>
    </div>
  </main>
);

export default ThankYou;
