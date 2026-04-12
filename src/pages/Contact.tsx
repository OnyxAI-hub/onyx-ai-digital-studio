import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowRight, Mail, MapPin, Send, Clock, Calendar } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import AtlantaMapCard from "@/components/contact/AtlantaMapCard";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  services: z.string().optional(),
  message: z.string().min(10, "Tell us a bit about your project"),
});

type ContactForm = z.infer<typeof contactSchema>;

const SERVICE_MAP: Record<string, string> = {
  "Business Websites": "website",
  "Landing Pages": "landing",
  "Web Applications": "webapp",
  "Dashboards & Admin Panels": "webapp",
  "Payment Integrations": "webapp",
  "Booking & Scheduling Systems": "webapp",
  "Automation & Workflows": "webapp",
  "AI Chatbots": "webapp",
  website: "website",
  landing: "landing",
  webapp: "webapp",
  ecommerce: "ecommerce",
  redesign: "redesign",
  other: "other",
};

const PACKAGE_BUDGET_MAP: Record<string, string> = {
  Starter: "under-500",
  Business: "500-1000",
  Advanced: "1000-2500",
};

const Contact = () => {
  const [searchParams] = useSearchParams();

  const prefillService = searchParams.get("service") || "";
  const prefillPackage = searchParams.get("package") || "";
  const prefillExtra = searchParams.get("extra") || "";

  const resolvedService = SERVICE_MAP[prefillService] || prefillService || "";
  const resolvedBudget = PACKAGE_BUDGET_MAP[prefillPackage] || "";

  const defaultMessage = prefillPackage
    ? `I'm interested in the ${prefillPackage} package.`
    : prefillExtra
      ? `I'm interested in the "${prefillExtra}" add-on.`
      : prefillService
        ? `I'm interested in ${prefillService}.`
        : "";

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      budget: resolvedBudget,
      timeline: "",
      services: resolvedService,
      message: defaultMessage,
    },
  });

  // Update form when search params change
  useEffect(() => {
    if (resolvedService) form.setValue("services", resolvedService);
    if (resolvedBudget) form.setValue("budget", resolvedBudget);
    if (defaultMessage) form.setValue("message", defaultMessage);
  }, [resolvedService, resolvedBudget, defaultMessage]);

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      await fetch("https://hooks.zapier.com/hooks/catch/27176071/u7gsmn1/", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "consultation",
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
              Every inquiry is reviewed personally. Expect a response within 24–48 hours, or book a consultation to connect sooner.
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
                  <p className="text-sm text-muted-foreground mb-4">Book a 30-minute consultation to discuss your project, goals, and the best next step.</p>
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
                  <h3 className="font-display text-xl font-bold mb-6 tracking-tight">Project Intake Form</h3>
                  {(prefillPackage || prefillService || prefillExtra) && (
                    <div className="mb-6 rounded-lg border border-border/40 bg-card/40 px-4 py-3 text-sm text-muted-foreground">
                      {prefillPackage && <>Selected package: <span className="text-foreground font-medium">{prefillPackage}</span></>}
                      {prefillService && <>Interested in: <span className="text-foreground font-medium">{prefillService}</span></>}
                      {prefillExtra && <>Add-on: <span className="text-foreground font-medium">{prefillExtra}</span></>}
                    </div>
                  )}
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid gap-5 md:grid-cols-2">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl><Input placeholder="Your email address" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <div className="grid gap-5 md:grid-cols-2">
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (optional)</FormLabel>
                            <FormControl><Input placeholder="Your phone number" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="budget" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget Range</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="under-500">Under $500</SelectItem>
                                <SelectItem value="500-1000">$500 – $1,000</SelectItem>
                                <SelectItem value="1000-2500">$1,000 – $2,500</SelectItem>
                                <SelectItem value="2500-plus">$2,500+</SelectItem>
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
                                <SelectTrigger><SelectValue placeholder="Select timeline" /></SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="asap">ASAP</SelectItem>
                                <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                                <SelectItem value="1-month">Within 1 month</SelectItem>
                                <SelectItem value="flexible">Flexible</SelectItem>
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
                                <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="website">Business Website</SelectItem>
                                <SelectItem value="landing">Landing Page</SelectItem>
                                <SelectItem value="webapp">Web Application</SelectItem>
                                <SelectItem value="ecommerce">E-Commerce</SelectItem>
                                <SelectItem value="redesign">Website Redesign</SelectItem>
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
                            <Textarea placeholder="Describe your project, goals, and any specific features you need..." className="min-h-[120px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                        {isSubmitting ? "Sending…" : "Send Project Inquiry"} <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </Form>
                </div>
              
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
