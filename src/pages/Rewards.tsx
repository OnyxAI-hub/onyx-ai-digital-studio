import { Flame, Gift, Heart, MessageCircle, PenSquare, Trophy, Clock } from "lucide-react";
import PlatformLayout from "@/components/studio/PlatformLayout";
import { Button } from "@/components/ui/button";
import { dailyStreak, socialRewards } from "@/data/community";

const Rewards = () => {
  const currentStreak = 3;

  return (
    <PlatformLayout badge="Coming Soon · Preview" title={<>Daily <span className="gradient-text">Rewards</span></>} description="Earn credits every day through check-ins, community activity, and creative contributions.">
      <div className="grid gap-5 lg:grid-cols-3 mb-8">
        <div className="silver-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-foreground/70" />
              <h3 className="font-display text-base font-semibold uppercase tracking-wider">Streak — Day {currentStreak}</h3>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground"><Clock className="h-3 w-3" /> Next reset in 14h 22m</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {dailyStreak.map((d) => {
              const claimed = d.day < currentStreak;
              const today = d.day === currentStreak;
              return (
                <div key={d.day} className={`rounded-lg border p-3 text-center transition ${today ? "border-foreground/40 bg-foreground/5 glow-white" : claimed ? "border-border/30 bg-card/40 opacity-60" : "border-border/40 bg-card/30"}`}>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Day {d.day}</p>
                  <p className="mt-2 font-display text-lg font-bold">{d.credits}</p>
                  <p className="text-[10px] text-muted-foreground">credits</p>
                  <p className="mt-2 text-[9px] uppercase tracking-wider font-medium">
                    {claimed ? "Claimed" : today ? "Today" : "Locked"}
                  </p>
                </div>
              );
            })}
          </div>
          <Button className="mt-5 w-full md:w-auto gap-2" disabled><Gift className="h-4 w-4" /> Claim Today · Coming Soon</Button>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-display text-base font-semibold uppercase tracking-wider mb-4">This Month</h3>
          <div className="space-y-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Credits Earned</p>
              <p className="font-display text-2xl font-bold">0</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Longest Streak</p>
              <p className="font-display text-2xl font-bold">—</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Activity Bonus</p>
              <p className="font-display text-2xl font-bold">—</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display text-base font-semibold uppercase tracking-wider mb-4">Social & Activity Rewards</h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {socialRewards.map((r, i) => {
            const Icon = [Heart, MessageCircle, PenSquare, Heart, PenSquare, Trophy][i] ?? Gift;
            return (
              <div key={r.label} className="rounded-lg border border-border/40 bg-card/40 p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-md bg-card border border-border/60 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-foreground/70" />
                  </div>
                  <p className="text-sm truncate">{r.label}</p>
                </div>
                <span className="text-xs font-semibold text-foreground/90 shrink-0">+{r.credits}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-5 text-[11px] text-muted-foreground/70">Rewards activate once community features are live. Bonus credits expire 2 months after earned.</p>
      </div>
    </PlatformLayout>
  );
};

export default Rewards;
