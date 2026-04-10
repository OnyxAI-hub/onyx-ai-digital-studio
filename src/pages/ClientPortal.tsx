import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, CreditCard, MessageSquare, RefreshCw, FolderOpen, LogIn, UserPlus, KeyRound, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import onyxLogo from "@/assets/onyx-logo.png";

const LoginForm = ({ onLogin }: { onLogin: () => void }) => (
  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
    <div>
      <label className="text-sm font-medium mb-1 block">Email</label>
      <Input type="email" placeholder="you@example.com" />
    </div>
    <div>
      <label className="text-sm font-medium mb-1 block">Password</label>
      <Input type="password" placeholder="••••••••" />
    </div>
    <Button className="w-full">Sign In</Button>
  </form>
);

const SignUpForm = () => (
  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
    <div>
      <label className="text-sm font-medium mb-1 block">Full Name</label>
      <Input placeholder="John Smith" />
    </div>
    <div>
      <label className="text-sm font-medium mb-1 block">Email</label>
      <Input type="email" placeholder="you@example.com" />
    </div>
    <div>
      <label className="text-sm font-medium mb-1 block">Password</label>
      <Input type="password" placeholder="••••••••" />
    </div>
    <Button className="w-full">Create Account</Button>
  </form>
);

const ResetForm = () => (
  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
    <div>
      <label className="text-sm font-medium mb-1 block">Email</label>
      <Input type="email" placeholder="you@example.com" />
    </div>
    <Button className="w-full">Send Reset Link</Button>
  </form>
);

const dashboardWidgets = [
  { icon: FileText, title: "Project Status", status: "In Progress", detail: "Business Website — Phase 2: Design Review", color: "text-yellow-400" },
  { icon: FolderOpen, title: "Files & Uploads", status: "3 Files", detail: "Logo, Brand Guidelines, Content Draft", color: "text-primary" },
  { icon: CreditCard, title: "Invoices", status: "$275 Paid", detail: "Invoice #1042 — 50% deposit received", color: "text-emerald-400" },
  { icon: MessageSquare, title: "Messages", status: "2 New", detail: "Xavier sent design mockups for review", color: "text-primary" },
  { icon: RefreshCw, title: "Revisions", status: "1 Pending", detail: "Round 1 feedback submitted — awaiting update", color: "text-orange-400" },
];

const Dashboard = () => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold">Welcome back, John</h2>
      <p className="text-sm text-muted-foreground">Here's your project overview.</p>
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {dashboardWidgets.map((w) => (
        <div key={w.title} className="glass-card-hover p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <w.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold">{w.title}</h3>
              <span className={`text-xs font-medium ${w.color}`}>{w.status}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{w.detail}</p>
        </div>
      ))}
    </div>
  </div>
);

const ClientPortal = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return (
      <main className="pt-20">
        <section className="section-padding">
          <div className="container-narrow">
            <div className="flex items-center justify-between mb-8">
              <img src={onyxLogo} alt="ONYX AI" className="h-7" />
              <Button variant="outline" size="sm" onClick={() => setLoggedIn(false)}>Sign Out</Button>
            </div>
            <Dashboard />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="container-narrow flex items-center justify-center">
          <AnimatedSection>
            <div className="glass-card p-8 md:p-10 w-full max-w-md">
              <div className="text-center mb-8">
                <img src={onyxLogo} alt="ONYX AI" className="h-8 mx-auto mb-4" />
                <h1 className="font-display text-2xl font-bold">Client Portal</h1>
                <p className="text-sm text-muted-foreground mt-1">Access your project dashboard</p>
              </div>

              <Tabs defaultValue="login">
                <TabsList className="w-full grid grid-cols-3 mb-6">
                  <TabsTrigger value="login" className="gap-1 text-xs"><LogIn className="h-3 w-3" /> Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="gap-1 text-xs"><UserPlus className="h-3 w-3" /> Sign Up</TabsTrigger>
                  <TabsTrigger value="reset" className="gap-1 text-xs"><KeyRound className="h-3 w-3" /> Reset</TabsTrigger>
                </TabsList>
                <TabsContent value="login"><LoginForm onLogin={() => setLoggedIn(true)} /></TabsContent>
                <TabsContent value="signup"><SignUpForm /></TabsContent>
                <TabsContent value="reset"><ResetForm /></TabsContent>
              </Tabs>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default ClientPortal;
