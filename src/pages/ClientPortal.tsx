import { Button } from "@/components/ui/button";
import { Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/shared/AnimatedSection";
import onyxLogo from "@/assets/onyx-logo.png";

const ClientPortal = () => (
  <main className="pt-20">
    <section className="section-padding">
      <div className="container-narrow flex items-center justify-center">
        <AnimatedSection>
          <div className="glass-card p-8 md:p-12 w-full max-w-md text-center">
            <img src={onyxLogo} alt="ONYX AI" className="h-14 mx-auto mb-6" />
            <div className="flex justify-center mb-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border/60 bg-card">
                <Lock className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight">Client Portal</h1>
            <p className="mt-3 text-muted-foreground leading-relaxed text-sm">
              Portal access is provided to active clients during project onboarding. If you're a current client, your login credentials will be sent directly to you.
            </p>
            <div className="mt-6 rounded-lg border border-border/40 bg-card/40 p-4">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground/80">Coming soon:</span> Real-time project tracking, file sharing, invoices, and direct messaging — all in one place.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Link to="/contact">
                <Button className="w-full gap-2">Get Started <ArrowRight className="h-4 w-4" /></Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="w-full">View Packages</Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default ClientPortal;
