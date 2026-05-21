import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import AnimatedSection from "@/components/shared/AnimatedSection";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    navigate("/dashboard");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: fullName },
      },
    });
    setLoading(false);
    if (error) return toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    toast({ title: "Check your email", description: "Confirm your email to complete sign up." });
  };

  const handleGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/dashboard" });
    if (result.error) toast({ title: "Google sign-in failed", description: String(result.error), variant: "destructive" });
    if (!result.redirected && !result.error) navigate("/dashboard");
  };

  return (
    <main className="pt-24 min-h-screen">
      <section className="section-padding">
        <div className="container-narrow max-w-md">
          <AnimatedSection>
            <div className="text-center mb-8">
              <span className="mb-3 inline-block rounded-full border border-border/60 bg-card/60 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Account
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Welcome to <span className="gradient-text">ONYX</span>
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">Sign in to manage credits, requests, and your studio.</p>
            </div>

            <div className="silver-card p-6">
              <Tabs defaultValue="signin">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <Label>Email</Label>
                      <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                      <Label>Password</Label>
                      <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in…" : "Sign In"}</Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                      <Label>Full name</Label>
                      <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                      <Label>Password</Label>
                      <Input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating…" : "Create Account"}</Button>
                    <p className="text-[11px] text-muted-foreground text-center">New accounts receive 25 bonus credits.</p>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-border/40" />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">or</span>
                <div className="h-px flex-1 bg-border/40" />
              </div>

              <Button type="button" variant="outline" className="w-full" onClick={handleGoogle}>
                Continue with Google
              </Button>
            </div>

            <p className="mt-5 text-center text-[11px] text-muted-foreground">
              By signing up you agree to ONYX terms. <Link to="/contact" className="underline">Contact us</Link> for help.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default Auth;
