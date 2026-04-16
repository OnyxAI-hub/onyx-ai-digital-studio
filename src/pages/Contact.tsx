import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowRight, Mail, Send, Clock, Calendar } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import AtlantaMapCard from "@/components/contact/AtlantaMapCard";

const ADDON_OPTIONS = [
  "Payment Integration",
  "E-commerce Functionality",
  "Booking / Calendly Setup",
  "Autoresponder / Email Automation",
  "Hosting Setup",
  "Logo Design",
  "Brand Kit",
  "Copywriting",
  "Custom Animations",
  "AI Chatbot Integration",
  "Monthly Maintenance",
  "Rush Delivery",
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().max(40).optional(),
  packageInterest: z.string().optional(),
  brandName: z.string().max(120).optional(),
  websiteLink: z.string().max(255).optional(),
  projectType: z.string().optional(),
  estimatedPages: z.string().optional(),
  addOns: z.array(z.string()).optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  services: z.string().optional(),
  nextStep: z.string().optional(),
  message: z.string().trim().min(10, "Tell us a bit about your project").max(2000),
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
  const resolvedPackage = ["Starter", "Business", "Advanced"].includes(prefillPackage) ? prefillPackage : "";
  const resolvedAddOns = prefillExtra && (ADDON_OPTIONS as readonly string[]).includes(prefillExtra) ? [prefillExtra] : [];

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
      packageInterest: resolvedPackage,
      brandName: "",
      websiteLink: "",
      projectType: "",
      estimatedPages: "",
      addOns: resolvedAddOns,
      budget: resolvedBudget,
      timeline: "",
      services: resolvedService,
      nextStep: "",
      message: defaultMessage,
    },
  });

  // Update form when search params change
  useEffect(() => {
    if (resolvedService) form.setValue("services", resolvedService);
    if (resolvedBudget) form.setValue("budget", resolvedBudget);
    if (resolvedPackage) form.setValue("packageInterest", resolvedPackage);
    if (resolvedAddOns.length) form.setValue("addOns", resolvedAddOns);
    if (defaultMessage) form.setValue("message", defaultMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedService, resolvedBudget, resolvedPackage, defaultMessage]);

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
          package_interest: data.packageInterest || "",
          brand_name: data.brandName || "",
          website_link: data.websiteLink || "",
          project_type: data.projectType || "",
          estimated_pages: data.estimatedPages || "",
          add_ons: (data.addOns || []).join(", "),
          budget: data.budget || "",
          timeline: data.timeline || "",
          service: data.services || "",
          next_step: data.nextStep || "",
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
              Every inquiry is reviewed personally. Larger or more custom builds are best handled through a consultation first — Starter is the easiest direct entry option. Expect a response within 24–48 hours.
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
                <h3 className="font-display text-xl font-bold mb-2 tracking-tight">Project Intake Form</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Share a few project details so we can prepare a thoughtful response. The more context you provide, the sharper our recommendation.
                </p>
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
                      <FormField control={form.control} name="brandName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business / Brand Name</FormLabel>
                          <FormControl><Input placeholder="Your business or brand" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="websiteLink" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website or Social Link</FormLabel>
                        <FormControl><Input placeholder="https://your-site.com or @handle" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <div className="grid gap-5 md:grid-cols-2">
                      <FormField control={form.control} name="packageInterest" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Package Interested In</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Select package" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Starter">Starter — $150</SelectItem>
                              <SelectItem value="Business">Business — Starting at $300</SelectItem>
                              <SelectItem value="Advanced">Advanced — Starting at $500</SelectItem>
                              <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="projectType" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of Project</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="new-website">New Website</SelectItem>
                              <SelectItem value="redesign">Redesign</SelectItem>
                              <SelectItem value="landing-page">Landing Page</SelectItem>
                              <SelectItem value="web-app">Web App / Dashboard</SelectItem>
                              <SelectItem value="ecommerce">E-commerce Store</SelectItem>
                              <SelectItem value="booking">Booking System</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <FormField control={form.control} name="estimatedPages" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Number of Pages</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Select page count" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-3">1–3 pages</SelectItem>
                              <SelectItem value="4-7">4–7 pages</SelectItem>
                              <SelectItem value="8-15">8–15 pages</SelectItem>
                              <SelectItem value="15-plus">15+ pages</SelectItem>
                              <SelectItem value="not-sure">Not sure yet</SelectItem>
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

                    <FormField control={form.control} name="addOns" render={() => (
                      <FormItem>
                        <FormLabel>Add-ons Interested In</FormLabel>
                        <div className="grid gap-2.5 sm:grid-cols-2 rounded-lg border border-border/40 bg-card/30 p-4">
                          {ADDON_OPTIONS.map((addon) => (
                            <FormField
                              key={addon}
                              control={form.control}
                              name="addOns"
                              render={({ field }) => {
                                const checked = field.value?.includes(addon) ?? false;
                                return (
                                  <FormItem className="flex items-center gap-2.5 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={checked}
                                        onCheckedChange={(c) => {
                                          const current = field.value || [];
                                          field.onChange(c ? [...current, addon] : current.filter((v) => v !== addon));
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-xs font-normal text-muted-foreground cursor-pointer">
                                      {addon}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <div className="grid gap-5 md:grid-cols-2">
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
                      <FormField control={form.control} name="timeline" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Timeline</FormLabel>
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
                    </div>

                    <FormField control={form.control} name="nextStep" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Next Step</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="What would you like to do next?" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="book-consultation">Book a consultation</SelectItem>
                            <SelectItem value="project-inquiry">Start with a project inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Notes *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your project, goals, and any specific features you need..." className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <div className="space-y-3">
                      <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                        {isSubmitting ? "Sending…" : "Send Project Inquiry"} <Send className="h-4 w-4" />
                      </Button>
                      <p className="text-center text-xs text-muted-foreground/70">
                        Prefer to talk first?{" "}
                        <a href="https://calendly.com/onyxai-contact/onyx-consultation" target="_blank" rel="noopener noreferrer" className="text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground">
                          Book a consultation instead
                        </a>
                      </p>
                    </div>
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
