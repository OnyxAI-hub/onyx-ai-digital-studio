import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowRight, Mail, Send, Clock, Calendar } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import AtlantaMapCard from "@/components/contact/AtlantaMapCard";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().max(40).optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  services: z.string().optional(),
  message: z.string().trim().min(10, "Tell us a bit about your project").max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      budget: "",
      timeline: "",
      services: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      await fetch("https://hooks.zapier.com/hooks/catch/27176071/u7gsmn1/", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "contact_inquiry",
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          budget: data.budget || "",
          timeline: data.timeline || "",
          service: data.services || "",
          message: data.message,
          source_page: "contact_page",
        }),
      });
      navigate("/thank-you");
    } catch (error) {
      console.error("Webhook error:", error);
      const { toast } = await import("sonner");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <span className="mb-4 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Contact</span>
            <h1 className="font-display text-4xl font-bold md:text-5xl tracking-tight">
              Let's Build Something <span className="gradient-text">Powerful</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Every inquiry is reviewed personally. Larger or more custom builds are best handled through a consultation first. Typical response within 24–48 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="container-narrow">
          <div className="grid gap-10 lg:grid-cols-3">
            <AnimatedSection>
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold mb-5 tracking-tight">Get in Touch</h3>
                  <div className="space-y-5">
                    <a href="mailto:onyxai.contact@gmail.com" className="flex items-center gap-3.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border/30 bg-card/40">
                        <Mail className="h-3.5 w-3.5 text-foreground/60" />
                      </div>
                      onyxai.contact@gmail.com
                    </a>
                    <div className="flex items-center gap-3.5 text-sm text-muted-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border/30 bg-card/40">
                        <Calendar className="h-3.5 w-3.5 text-foreground/60" />
                      </div>
                      Consultation by booking only
                    </div>
                    <div className="flex items-center gap-3.5 text-sm text-muted-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border/30 bg-card/40">
                        <Clock className="h-3.5 w-3.5 text-foreground/60" />
                      </div>
                      Response within 24–48 hours
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold mb-2 tracking-tight">Book a Consultation</h3>
                  <p className="text-sm text-muted-foreground mb-4">A 30-minute consultation is the best path for Business and Advanced projects — we'll align on scope, timeline, and the right next step.</p>
                  <a href="https://calendly.com/onyxai-contact/onyx-consultation" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full gap-2">
                      Book 30-Min Consultation <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>

                <AtlantaMapCard />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="lg:col-span-2">
              <div className="glass-card p-8">
                <h3 id="contact-form-heading" className="font-display text-xl font-bold mb-6 tracking-tight">Send a Message</h3>
                <Form {...form}>
                  <form
                    id="main-contact-form"
                    data-testid="main-contact-form"
                    aria-labelledby="contact-form-heading"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 md:grid-cols-2">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl><Input placeholder="Your full name" autoComplete="name" data-testid="contact-name-input" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl><Input type="email" placeholder="Your email address" autoComplete="email" data-testid="contact-email-input" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (optional)</FormLabel>
                          <FormControl><Input placeholder="Your phone number" autoComplete="tel" data-testid="contact-phone-input" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="budget" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget Range</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="contact-budget-select"><SelectValue placeholder="Select budget" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under-300">Under $300</SelectItem>
                              <SelectItem value="300-500">$300 – $500</SelectItem>
                              <SelectItem value="500-1000">$500 – $1,000</SelectItem>
                              <SelectItem value="1000-2000">$1,000 – $2,000</SelectItem>
                              <SelectItem value="over-2000">Over $2,000 / Custom Scope</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                      <FormField control={form.control} name="timeline" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timeline</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="contact-timeline-select"><SelectValue placeholder="Select timeline" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="asap">ASAP / Rush</SelectItem>
                              <SelectItem value="1-week">Within 1 week</SelectItem>
                              <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                              <SelectItem value="1-month">Within 1 month</SelectItem>
                              <SelectItem value="flexible">Flexible / Not sure yet</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="services" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Needed</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="contact-service-select"><SelectValue placeholder="Select service" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="website">Business Website</SelectItem>
                              <SelectItem value="webapp">Web Application</SelectItem>
                              <SelectItem value="ecommerce">E-Commerce</SelectItem>
                              <SelectItem value="redesign">Website Redesign</SelectItem>
                              <SelectItem value="ai-agent">AI Agent Setup</SelectItem>
                              <SelectItem value="automation">Automation / Workflow Setup</SelectItem>
                              <SelectItem value="booking-payment">Booking / Payment Flow</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tell Us About Your Project *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your project, goals, and any specific features you need..." className="min-h-[120px]" data-testid="contact-message-textarea" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full gap-2"
                        disabled={isSubmitting}
                        id="contact-form-submit"
                        data-testid="contact-form-submit"
                        aria-label="Send contact message"
                      >
                        {isSubmitting ? "Sending…" : "Send Message"} <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>

              <AnimatedSection delay={0.15}>
                <div className="glass-card mt-8 p-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-md">
                    <h3 className="font-display text-lg font-semibold tracking-tight">Need a more detailed project planner?</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      If you already know the package, features, and add-ons you want, use the full intake form.
                    </p>
                  </div>
                  <Link to="/project-intake" className="shrink-0">
                    <Button variant="outline" size="lg" className="gap-2 whitespace-nowrap">
                      Open Full Project Intake <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
