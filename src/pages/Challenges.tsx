import { useState } from "react";
import { Trophy, Clock, Users } from "lucide-react";
import PlatformLayout from "@/components/studio/PlatformLayout";
import { Button } from "@/components/ui/button";
import { challenges } from "@/data/community";

const statusTabs = ["active", "upcoming", "past"] as const;

const Challenges = () => {
  const [status, setStatus] = useState<(typeof statusTabs)[number]>("active");
  const items = challenges.filter((c) => c.status === status);

  return (
    <PlatformLayout badge="Creator Program · Preview" title={<>Creative <span className="gradient-text">Challenges</span></>} description="Enter themed contests, earn vote rewards, and win credits. Demo content while challenges roll out.">
      <div className="mb-6 inline-flex rounded-full border border-border/60 bg-card/60 p-1">
        {statusTabs.map((s) => (
          <button key={s} onClick={() => setStatus(s)} className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition ${status === s ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>{s}</button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <article key={c.id} className="silver-card-hover overflow-hidden flex flex-col">
            <div className={`aspect-[16/9] bg-gradient-to-br ${c.banner} relative`}>
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/70 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground border border-border/40">
                <Trophy className="h-3 w-3" /> {c.status}
              </span>
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/70 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted-foreground border border-border/40">
                <Clock className="h-3 w-3" /> {c.timeLeft}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-display text-lg font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed flex-1">{c.theme}</p>
              <div className="mt-4 grid grid-cols-3 gap-2 pt-4 border-t border-border/30 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Entries</p>
                  <p className="mt-0.5 text-sm font-semibold">{c.entries}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Votes</p>
                  <p className="mt-0.5 text-sm font-semibold">{c.votes}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">1st Prize</p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground/90">{c.prize}</p>
                </div>
              </div>
              <Button size="sm" className="mt-4 w-full" disabled={c.status !== "active"} variant={c.status === "active" ? "default" : "outline"}>
                {c.status === "active" ? "Enter Challenge · Soon" : c.status === "upcoming" ? "Notify Me" : "View Results"}
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 glass-card p-5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider mb-3">Reward Structure</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          {[
            { p: "Vote reward", v: "130 credits" },
            { p: "1st place", v: "5,000 credits" },
            { p: "2nd place", v: "3,500 credits" },
            { p: "3rd place", v: "2,000 credits" },
            { p: "4th–10th", v: "500 credits" },
          ].map((r) => (
            <div key={r.p} className="rounded-md border border-border/40 bg-card/40 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.p}</p>
              <p className="mt-0.5 font-semibold text-foreground/90">{r.v}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-muted-foreground/70 flex items-center gap-1.5"><Users className="h-3 w-3" /> No prohibited or non-consensual content in submissions. Platform rules apply.</p>
      </div>
    </PlatformLayout>
  );
};

export default Challenges;
