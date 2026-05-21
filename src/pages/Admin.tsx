import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface RequestRow {
  id: string; user_id: string; request_type: string; prompt: string; status: string; created_at: string; estimated_credits: number; admin_notes: string | null; delivery_url: string | null;
}

const Admin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [requests, setRequests] = useState<RequestRow[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    const check = async () => {
      if (!user) return;
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!data);
    };
    check();
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return;
    supabase.from("creative_requests").select("*").order("created_at", { ascending: false }).limit(100)
      .then(({ data }) => setRequests((data as RequestRow[]) ?? []));
  }, [isAdmin]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("creative_requests").update({ status }).eq("id", id);
    if (error) return toast({ title: "Update failed", description: error.message, variant: "destructive" });
    setRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  if (loading || isAdmin === null) return <main className="pt-20 section-padding"><div className="container-narrow text-center text-sm text-muted-foreground">Loading…</div></main>;

  if (!isAdmin) return (
    <main className="pt-20 section-padding">
      <div className="container-narrow max-w-md text-center">
        <h1 className="font-display text-2xl font-bold">Admin access required</h1>
        <p className="mt-3 text-sm text-muted-foreground">Your account does not have admin permissions.</p>
        <Button className="mt-6" onClick={() => navigate("/dashboard")}>Back to dashboard</Button>
      </div>
    </main>
  );

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedSection>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Admin <span className="gradient-text">Requests</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Review and update incoming creative requests.</p>
          </AnimatedSection>

          <div className="mt-10 silver-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-card/40">
                  <tr className="text-left">
                    <th className="p-3 text-[10px] uppercase tracking-wider text-muted-foreground">Date</th>
                    <th className="p-3 text-[10px] uppercase tracking-wider text-muted-foreground">Type</th>
                    <th className="p-3 text-[10px] uppercase tracking-wider text-muted-foreground">Prompt</th>
                    <th className="p-3 text-[10px] uppercase tracking-wider text-muted-foreground">Credits</th>
                    <th className="p-3 text-[10px] uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="p-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {requests.map((r) => (
                    <tr key={r.id}>
                      <td className="p-3 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
                      <td className="p-3 text-xs">{r.request_type}</td>
                      <td className="p-3 text-xs max-w-xs truncate">{r.prompt}</td>
                      <td className="p-3 text-xs">{r.estimated_credits}</td>
                      <td className="p-3 text-xs"><span className="px-2 py-1 rounded border border-border/40">{r.status}</span></td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, "in_progress")}>Start</Button>
                          <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, "completed")}>Done</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {requests.length === 0 && (
                    <tr><td colSpan={6} className="p-8 text-center text-sm text-muted-foreground">No requests yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Admin;
