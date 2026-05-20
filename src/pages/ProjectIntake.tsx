import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Send } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

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

const intakeSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().max(40).optional(),
  brandName: z.string().max(120).optional(),
  websiteLink: z.string().max(255).optional(),
  packageInterest: z.string().optional(),
  projectType: z.string().optional(),
  estimatedPages: z.string().optional(),
  services: z.string().optional(),
  addOns: z.array(z.string()).optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  nextStep: z.string().optional(),
  styleVibe: z.string().max(500).optional(),
  references: z.string().max(500).optional(),
  platform: z.string().optional(),
  requestMode: z.string().optional(),
  message: z.string().trim().min(10, "Tell us a bit about your project").max(2000),
});

type IntakeForm = z.infer<typeof intakeSchema>;

const PROJECT_TYPE_GROUPS: { label: string; options: string[] }[] = [
  {
    label: "Creative",
    options: [
      "AI Image Creation",
      "AI Video Generation",
      "AI Promo Video",
      "Music Visualizer",
      "Cover Art / Brand Visual",
      "Branding / Logo Concepts",
      "Social Content Pack",
      "Creative Credit Pack",
    ],
  },
  {
    label: "Business / Website",
    options: [
      "Website / Landing Page",
      "Web App / Business System",
    ],
  },
  {
    label: "Automation",
    options: [
      "AI Agent Setup",
      "Automation System",
    ],
  },
  {
    label: "Plans & Other",
    options: [
      "Monthly Subscription",
      "Monthly Support",
      "Custom AI Request",
      "Not Sure Yet",
      "Other",
    ],
  },
];

const PACKAGE_BUDGET_MAP: Record<string, string> = {
  Business: "300-500",
  Advanced: "500-1000",
  "AI Agent": "500-1000",
  "Business Automation": "500-1000",
};

const VALID_PACKAGES = ["Business", "Advanced", "AI Agent", "Business Automation"];

const ProjectIntake = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prefillPackage = searchParams.get("package") || "";
  const prefillExtra = searchParams.get("extra") || "";
  const prefillType = searchParams.get("type") || "";
  const prefillPrompt = searchParams.get("prompt") || "";
  const prefillPlan = searchParams.get("plan") || "";
  const resolvedPackage = VALID_PACKAGES.includes(prefillPackage) ? prefillPackage : "";
  const resolvedBudget = PACKAGE_BUDGET_MAP[prefillPackage] || "";
  const resolvedAddOns = prefillExtra && (ADDON_OPTIONS as readonly string[]).includes(prefillExtra) ? [prefillExtra] : [];
  const allTypes = PROJECT_TYPE_GROUPS.flatMap((g) => g.options);
  const resolvedType = allTypes.includes(prefillType) ? prefillType : "";

  const form = useForm<IntakeForm>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      brandName: "",
      websiteLink: "",
      packageInterest: resolvedPackage,
      projectType: resolvedType,
      estimatedPages: "",
      services: "",
      addOns: resolvedAddOns,
      budget: resolvedBudget,
      timeline: "",
      nextStep: "",
      styleVibe: "",
      references: "",
      platform: "",
      requestMode: "",
      message: prefillPrompt ? `Prompt: ${prefillPrompt}\n\n` : "",
    },
  });

  useEffect(() => {
    if (resolvedPackage) form.setValue("packageInterest", resolvedPackage);
    if (resolvedBudget) form.setValue("budget", resolvedBudget);
    if (resolvedAddOns.length) form.setValue("addOns", resolvedAddOns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedPackage, resolvedBudget]);

  const onSubmit = async (data: IntakeForm) => {
    setIsSubmitting(true);
    try {
      await fetch("https://hooks.zapier.com/hooks/catch/27176071/u7gsmn1/", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "detailed_project_intake",
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          brand_name: data.brandName || "",
          website_link: data.websiteLink || "",
          package_interest: data.packageInterest || "",
          project_type: data.projectType || "",
          estimated_pages: data.estimatedPages || "",
          service: data.services || "",
          add_ons: (data.addOns || []).join(", "),
          budget: data.budget || "",
          timeline: data.timeline || "",
          next_step: data.nextStep || "",
          style_vibe: data.styleVibe || "",
          references: data.references || "",
          platform: data.platform || "",
          request_mode: data.requestMode || "",
          plan_interest: prefillPlan || "",
          message: data.message,
          source_page: "project_intake_page",
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
            <span className="mb-4 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Project Intake
            </span>
            <h1 className="font-display text-4xl font-bold md:text-5xl tracking-tight">
              Detailed <span className="gradient-text">Project Intake</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Share the full picture of your project — package, scope, add-ons, and timeline — so we can prepare a thoughtful, accurate response.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-xs text-muted-foreground/70">
              Just have a quick question instead?{" "}
              <Link to="/contact" className="underline underline-offset-2 transition-colors hover:text-foreground">
                Use the simple contact form
              </Link>
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="container-narrow max-w-3xl">
          <AnimatedSection delay={0.1}>
            <div className="glass-card p-8">
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
                            <SelectItem value="Business">Business Website — Starting at $300</SelectItem>
                            <SelectItem value="Advanced">Advanced Website / Web App — Starting at $500</SelectItem>
                            <SelectItem value="AI Agent">AI Agent Setup — Starting at $500</SelectItem>
                            <SelectItem value="Business Automation">Business Automation</SelectItem>
                            <SelectItem value="Not sure yet">Not Sure Yet</SelectItem>
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
                            {PROJECT_TYPE_GROUPS.map((group) => (
                              <div key={group.label}>
                                <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">{group.label}</div>
                                {group.options.map((opt) => (
                                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                ))}
                              </div>
                            ))}
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
                    <FormField control={form.control} name="timeline" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Timeline</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select timeline" /></SelectTrigger>
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
                  </div>

                  <FormField control={form.control} name="nextStep" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Next Step</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="What would you like to do next?" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="book-consultation">Book a Consultation</SelectItem>
                          <SelectItem value="project-inquiry">Submit a Detailed Project Request</SelectItem>
                          <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Notes *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe your project, goals, and any specific features you need..." className="min-h-[140px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="space-y-3">
                    <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                      {isSubmitting ? "Sending…" : "Submit Detailed Intake"} <Send className="h-4 w-4" />
                    </Button>
                    <p className="text-center text-xs text-muted-foreground/70">
                      Reviewed personally — typical response within 24–48 hours.
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default ProjectIntake;
