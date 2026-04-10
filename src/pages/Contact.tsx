import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowRight, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";

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

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", budget: "", timeline: "", services: "", message: "" },
  });

  const onSubmit = (data: ContactForm) => {
    console.log("Form submitted:", data);
    setSubmitted(true);
  };

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-medium text-primary">Contact</span>
            <h1 className="font-display text-4xl font-bold md:text-5xl">
              Let's Build Something <span className="gradient-text">Powerful</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Tell us about your project and we'll get back to you within 48 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="container-narrow">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Contact Info */}
            <AnimatedSection>
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 text-primary" />
                      hello@onyxai.dev
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 text-primary" />
                      (555) 123-4567
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      Remote — Serving clients worldwide
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold mb-2">Book a Consultation</h3>
                  <p className="text-sm text-muted-foreground mb-4">Prefer to schedule a call? Pick a time that works for you.</p>
                  <Button variant="outline" className="w-full gap-2">
                    Schedule a Call <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Map Placeholder */}
                <div className="glass-card h-48 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    <p className="text-xs">Map placeholder</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection delay={0.1} className="lg:col-span-2">
              {submitted ? (
                <div className="glass-card p-12 text-center">
                  <CheckCircle className="mx-auto h-16 w-16 text-primary mb-4" />
                  <h2 className="font-display text-2xl font-bold">Message Sent!</h2>
                  <p className="mt-3 text-muted-foreground">Thanks for reaching out. We'll get back to you within 48 hours.</p>
                  <Button className="mt-6" onClick={() => { setSubmitted(false); form.reset(); }}>Send Another Message</Button>
                </div>
              ) : (
                <div className="glass-card p-8">
                  <h3 className="font-display text-xl font-bold mb-6">Project Intake Form</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid gap-5 md:grid-cols-2">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl><Input placeholder="John Smith" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl><Input placeholder="john@example.com" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <div className="grid gap-5 md:grid-cols-2">
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (optional)</FormLabel>
                            <FormControl><Input placeholder="(555) 123-4567" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="budget" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget Range</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      <Button type="submit" size="lg" className="w-full gap-2">
                        Send Message <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
