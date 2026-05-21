import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sparkles, CreditCard, FolderOpen, Clock, ArrowRight, Plus, LogOut, Image as ImageIcon, Video, Mic, AppWindow, Palette, Scissors, Globe, Bot } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import StudioSidebar from "@/components/studio/StudioSidebar";
import PlatformTopBar from "@/components/studio/PlatformTopBar";
import FeaturedModels from "@/components/studio/FeaturedModels";
import CreativeRequestForm from "@/components/dashboard/CreativeRequestForm";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Profile { plan_name: string; full_name: string | null; email: string | null; }
interface Balance { balance: number; monthly_credits: number; bonus_credits: number; }
interface RequestRow { id: string; request_type: string; status: string; created_at: string; estimated_credits: number; }
interface GenRow { id: string; model_name: string; generation_type: string; status: string; created_at: string; credits_used: number; }

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [balance, setBalance] = useState<Balance | null>(null);
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [generations, setGenerations] = useState<GenRow[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  const refresh = async () => {
    if (!user) return;
    const [{ data: p }, { data: b }, { data: r }, { data: g }] = await Promise.all([
      supabase.from("profiles").select("plan_name, full_name, email").eq("id", user.id).maybeSingle(),
      supabase.from("credit_balances").select("balance, monthly_credits, bonus_credits").eq("user_id", user.id).maybeSingle(),
      supabase.from("creative_requests").select("id, request_type, status, created_at, estimated_credits").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
      supabase.from("generation_history").select("id, model_name, generation_type, status, created_at, credits_used").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
    ]);
    setProfile(p as Profile | null);
    setBalance(b as Balance | null);
    setRequests((r as RequestRow[]) ?? []);
    setGenerations((g as GenRow[]) ?? []);
  };

  useEffect(() => { refresh(); }, [user]);

  if (loading || !user) return <main className="pt-20 section-padding"><div className="container-narrow text-center text-sm text-muted-foreground">Loading…</div></main>;

  const totalCredits = balance ? balance.balance + balance.monthly_credits + balance.bonus_credits : 0;

  const stats = [
    { label: "Credit Balance", value: totalCredits.toLocaleString(), hint: `${balance?.monthly_credits ?? 0} monthly · ${balance?.bonus_credits ?? 0} bonus`, icon: Sparkles },
    { label: "Active Plan", value: profile?.plan_name ?? "Free", hint: "Upgrade for more credits", icon: CreditCard },
    { label: "Requests", value: String(requests.length), hint: "Last 10 shown", icon: FolderOpen },
    { label: "Generations", value: String(generations.length), hint: "AI generation history", icon: Clock },
  ];

  return (
    <main className="pt-[72px] md:pt-20">
      <PlatformTopBar />
      <section className="section-padding pt-8">
        <div className="container-narrow flex gap-6">
          <StudioSidebar />
          <div className="flex-1 min-w-0">
            <AnimatedSection>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <span className="mb-3 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Dashboard
                  </span>
                  <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                    Welcome, <span className="gradient-text">{profile?.full_name || profile?.email || "Creator"}</span>
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xl">Manage credits, submit creative requests, and track delivery.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to="/pricing"><Button variant="outline" className="gap-2"><Plus className="h-4 w-4" /> Buy Credits</Button></Link>
                  <Link to="/pricing"><Button variant="outline" className="gap-2"><CreditCard className="h-4 w-4" /> Upgrade Plan</Button></Link>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">New Request <ArrowRight className="h-4 w-4" /></Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader><DialogTitle>Submit Creative Request</DialogTitle></DialogHeader>
                      <CreativeRequestForm onSubmitted={() => { setDialogOpen(false); refresh(); }} />
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm" onClick={signOut} className="gap-2"><LogOut className="h-4 w-4" /> Sign out</Button>
                </div>
              </div>
            </AnimatedSection>

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

            {/* Quick studio cards */}
            <AnimatedSection delay={0.05}>
              <div className="mt-10">
                <h3 className="font-display text-lg font-semibold tracking-tight mb-3">Quick Studios</h3>
                <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                  {[
                    { label: "Image", to: "/studio/images", icon: ImageIcon },
                    { label: "Video", to: "/studio/videos", icon: Video },
                    { label: "Audio", to: "/studio/audio", icon: Mic },
                    { label: "Apps", to: "/studio/apps", icon: AppWindow },
                    { label: "Design", to: "/studio/design", icon: Palette },
                    { label: "Clip", to: "/studio/clipping", icon: Scissors },
                    { label: "Website", to: "/project-intake?type=Website+%2F+Landing+Page", icon: Globe },
                    { label: "Automation", to: "/project-intake?type=Automation+System", icon: Bot },
                  ].map((q) => (
                    <Link key={q.label} to={q.to} className="glass-card-hover p-3 flex flex-col items-center justify-center text-center gap-1.5">
                      <q.icon className="h-4 w-4 text-foreground/80" />
                      <span className="text-[11px] font-medium">{q.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <AnimatedSection>
                <div className="glass-card p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-lg font-semibold tracking-tight">Recent Requests</h3>
                    <FolderOpen className="h-4 w-4 text-muted-foreground" />
                  </div>
                  {requests.length === 0 ? (
                    <div className="rounded-lg border border-border/40 bg-card/30 p-8 text-center">
                      <p className="text-sm text-muted-foreground">No requests yet.</p>
                      <button onClick={() => setDialogOpen(true)} className="mt-3 text-xs text-foreground/80 underline underline-offset-4 hover:text-foreground">Submit your first request</button>
                    </div>
                  ) : (
                    <ul className="divide-y divide-border/30">
                      {requests.map((r) => (
                        <li key={r.id} className="py-3 flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{r.request_type}</p>
                            <p className="text-[11px] text-muted-foreground">{new Date(r.created_at).toLocaleDateString()} · {r.estimated_credits} credits</p>
                          </div>
                          <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-border/40 text-muted-foreground">{r.status}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="glass-card p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-lg font-semibold tracking-tight">Recent Generations</h3>
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                  </div>
                  {generations.length === 0 ? (
                    <div className="rounded-lg border border-border/40 bg-card/30 p-8 text-center">
                      <p className="text-sm text-muted-foreground">No generations yet.</p>
                      <p className="mt-2 text-[11px] text-muted-foreground/70">Live AI generation will appear here once enabled.</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-border/30">
                      {generations.map((g) => (
                        <li key={g.id} className="py-3 flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{g.model_name}</p>
                            <p className="text-[11px] text-muted-foreground">{g.generation_type} · {g.credits_used} credits</p>
                          </div>
                          <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-border/40 text-muted-foreground">{g.status}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.15}>
              <FeaturedModels />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="mt-10 glass-card p-6 text-center">
                <p className="text-xs text-muted-foreground/80">
                  Live AI generation, automated credit deduction, and Stripe checkout will be enabled in upcoming releases. Today, requests are fulfilled by the ONYX team.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
