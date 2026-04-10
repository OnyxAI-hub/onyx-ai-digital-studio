import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { faqs } from "@/data/faq";

const FAQ = () => (
  <main className="pt-20">
    <section className="section-padding">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <span className="mb-4 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">FAQ</span>
          <h1 className="font-display text-4xl font-bold md:text-5xl tracking-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Everything you need to know about working with ONYX AI.
          </p>
        </AnimatedSection>
      </div>
    </section>

    <section className="pb-20 px-4">
      <div className="container-narrow max-w-3xl mx-auto">
        <AnimatedSection>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6 border-border/60">
                <AccordionTrigger className="text-left font-display text-sm font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>

    <section className="section-padding bg-card/20">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl font-bold tracking-tight">Still Have Questions?</h2>
          <p className="mt-3 text-muted-foreground">We're happy to help. Reach out and we'll get back to you quickly.</p>
          <Link to="/contact" className="mt-6 inline-block">
            <Button size="lg" className="gap-2">Contact Us <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default FAQ;
