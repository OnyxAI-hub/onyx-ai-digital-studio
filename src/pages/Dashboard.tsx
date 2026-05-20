import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, CreditCard, FolderOpen, HardDrive, Clock, ArrowRight, Plus } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

const stats = [
  { label: "Credit Balance", value: "—", hint: "Sign-in required", icon: Sparkles },
  { label: "Active Plan", value: "Guest", hint: "Choose a plan", icon: CreditCard },
  { label: "Storage Used", value: "0 / 10 GB", hint: "Starter limit", icon: HardDrive },
  { label: "Active Requests", value: "0", hint: "Submit one to start", icon: Clock },
];

const Dashboard = () => (
  <main className="pt-20">
    <section className="section-padding">
      <div className="container-narrow">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="mb-3 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Dashboard
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Your <span className="gradient-text">ONYX Studio</span>
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                Manage credits, requests, and subscriptions in one place. Account sign-in is coming soon — for now, requests are tracked by email.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/pricing">
                <Button variant="outline" className="gap-2"><Plus className="h-4 w-4" /> Buy Credits</Button>
              </Link>
              <Link to="/generate">
                <Button className="gap-2">Start Creating <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.05}>
              <div className="glass-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{s.label}</span>
                  <s.icon className="h-4 w-4 text-foreground/60" />
                </div>
                <div className="mt-3 font-display text-2xl font-bold tracking-tight">{s.value}</div>
                <p className="mt-1 text-xs text-muted-foreground/80">{s.hint}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Sections */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <AnimatedSection>
            <div className="glass-card p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold tracking-tight">Recent Requests</h3>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="rounded-lg border border-border/40 bg-card/30 p-8 text-center">
                <p className="text-sm text-muted-foreground">No requests yet.</p>
                <Link to="/generate" className="mt-3 inline-block text-xs text-foreground/80 underline underline-offset-4 hover:text-foreground">
                  Submit your first request
                </Link>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="glass-card p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold tracking-tight">Credit Transactions</h3>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="rounded-lg border border-border/40 bg-card/30 p-8 text-center">
                <p className="text-sm text-muted-foreground">Connect an account to view your credit history.</p>
                <Link to="/pricing" className="mt-3 inline-block text-xs text-foreground/80 underline underline-offset-4 hover:text-foreground">
                  See plans & credit packs
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.2}>
          <div className="mt-10 glass-card p-6 text-center">
            <p className="text-xs text-muted-foreground/80">
              Full account, real-time credit tracking, file delivery, and admin tools are part of the next ONYX release.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default Dashboard;
