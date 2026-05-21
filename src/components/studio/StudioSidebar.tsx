import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { platformSidebar, safetyOptions } from "@/data/studio";
import { ChevronDown, ChevronLeft, ChevronRight, Coins, Lock, Pin, PinOff, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const StudioSidebar = () => {
  const { pathname, search, hash } = useLocation();
  const current = pathname + search + hash;
  const { user } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [pinned, setPinned] = useState(true);
  const [safety, setSafety] = useState<string>("teen");
  const [safetyOpen, setSafetyOpen] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    if (!user) { setCredits(null); return; }
    supabase
      .from("credit_balances")
      .select("balance, monthly_credits, bonus_credits")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) { setCredits(0); return; }
        setCredits((data.balance ?? 0) + (data.monthly_credits ?? 0) + (data.bonus_credits ?? 0));
      });
  }, [user]);

  const activeSafety = safetyOptions.find((s) => s.value === safety)?.label ?? "Teen+";

  if (collapsed) {
    return (
      <aside className="hidden lg:block w-14 shrink-0">
        <div className="sticky top-[140px] silver-card p-2 flex flex-col items-center gap-2">
          <button
            onClick={() => setCollapsed(false)}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-card/60 transition"
            title="Expand"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          {platformSidebar.flatMap((s) => s.items).filter(it => it.icon && it.href).slice(0, 8).map((it) => {
            const Icon = it.icon!;
            return (
              <Link
                key={it.label}
                to={it.href!}
                title={it.label}
                className={`rounded-md p-2 transition ${it.href === current ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-card/60"}`}
              >
                <Icon className="h-4 w-4" />
              </Link>
            );
          })}
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden lg:block w-60 shrink-0">
      <div className={`silver-card p-3 max-h-[calc(100vh-9rem)] overflow-y-auto [scrollbar-width:thin] ${pinned ? "sticky top-[140px]" : ""}`}>
        {/* Credit + controls header */}
        <div className="mb-3 rounded-lg border border-border/40 bg-card/40 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Credits</span>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setPinned(!pinned)}
                title={pinned ? "Unpin" : "Pin"}
                className="rounded p-1 text-muted-foreground hover:text-foreground hover:bg-card/60 transition"
              >
                {pinned ? <Pin className="h-3 w-3" /> : <PinOff className="h-3 w-3" />}
              </button>
              <button
                onClick={() => setCollapsed(true)}
                title="Collapse"
                className="rounded p-1 text-muted-foreground hover:text-foreground hover:bg-card/60 transition"
              >
                <ChevronLeft className="h-3 w-3" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Coins className="h-3.5 w-3.5 text-cyan-300/90" />
              <span className="font-display text-base font-bold tabular-nums">
                {credits === null ? "—" : credits.toLocaleString()}
              </span>
            </div>
            <Link to="/pricing" className="text-[10px] uppercase tracking-wider text-foreground/80 hover:text-foreground border border-border/40 rounded-md px-2 py-0.5 hover:bg-card/60 transition">
              Top up
            </Link>
          </div>
        </div>

        {/* Safety dropdown */}
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2 px-1">
            <Shield className="h-3 w-3 text-foreground/60" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Safety</span>
          </div>
          <button
            onClick={() => setSafetyOpen(!safetyOpen)}
            className="w-full flex items-center justify-between rounded-md border border-border/40 bg-card/40 px-2.5 py-1.5 text-[11px] text-foreground/90 hover:bg-card/60 transition"
          >
            <span>{activeSafety}</span>
            <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${safetyOpen ? "rotate-180" : ""}`} />
          </button>
          {safetyOpen && (
            <ul className="mt-1 rounded-md border border-border/40 bg-card/30 overflow-hidden">
              {safetyOptions.map((s) => (
                <li key={s.value}>
                  <button
                    onClick={() => { setSafety(s.value); setSafetyOpen(false); }}
                    className={`w-full text-left px-2.5 py-1.5 text-[11px] transition ${safety === s.value ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-card/60"}`}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sections */}
        {platformSidebar.map((section) => (
          <div key={section.label} className="mb-4 last:mb-0">
            <div className="mb-1.5 flex items-center gap-2 px-1">
              <section.icon className="h-3 w-3 text-foreground/60" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {section.label}
              </span>
            </div>
            <ul className="space-y-0.5">
              {section.items.map((it) => {
                const Icon = it.icon;
                if (it.disabled || !it.href) {
                  return (
                    <li key={it.label} className="flex items-center justify-between rounded-md px-2 py-1.5 text-[12px] text-muted-foreground/60 cursor-not-allowed">
                      <span className="flex items-center gap-2">
                        {Icon && <Icon className="h-3.5 w-3.5" />}
                        {it.label}
                      </span>
                      <Lock className="h-2.5 w-2.5" />
                    </li>
                  );
                }
                const active = it.href === current;
                return (
                  <li key={it.label}>
                    <Link
                      to={it.href}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] transition-colors ${
                        active
                          ? "bg-foreground/10 text-foreground border-l-2 border-cyan-400/70 pl-[6px]"
                          : "text-muted-foreground hover:text-foreground hover:bg-card/60"
                      }`}
                    >
                      {Icon && <Icon className="h-3.5 w-3.5" />}
                      <span>{it.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <p className="mt-2 px-1 text-[10px] text-muted-foreground/60 leading-relaxed">
          Some sections are placeholders for upcoming platform features.
        </p>
      </div>
    </aside>
  );
};

export default StudioSidebar;
