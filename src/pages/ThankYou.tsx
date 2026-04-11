import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

const ThankYou = () => (
  <main className="pt-20 min-h-[80vh] flex items-center">
    <div className="container-narrow text-center py-20">
      <AnimatedSection>
        <CheckCircle className="mx-auto h-16 w-16 text-primary mb-6" />
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          Thank You!
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Your project details have been received. We'll review everything and get back to you within 48 hours.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/portfolio">View Our Work</Link>
          </Button>
        </div>
      </AnimatedSection>
    </div>
  </main>
);

export default ThankYou;
