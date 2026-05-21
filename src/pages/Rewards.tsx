import { useEffect, useState } from "react";
import { Flame, Gift, Heart, MessageCircle, PenSquare, Trophy, Clock, Share2, UserPlus } from "lucide-react";
import PlatformLayout from "@/components/studio/PlatformLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface RewardRow {
  id: string;
  reward_key: string;
  title: string;
  description: string | null;
  reward_type: string;
  credits: number;
}

const iconFor = (key: string) => {
  if (key.includes("share")) return Share2;
  if (key.includes("invite")) return UserPlus;
  if (key.includes("review")) return PenSquare;
  if (key.includes("streak")) return Flame;
  return Gift;
};

const Rewards = () => {
  const [rewards, setRewards] = useState<RewardRow[]>([]);

  useEffect(() => {
    supabase
      .from("daily_rewards")
      .select("id,reward_key,title,description,reward_type,credits")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => setRewards((data as RewardRow[]) ?? []));
  }, []);

  const checkins = rewards.filter((r) => r.reward_type === "checkin");
  const social = rewards.filter((r) => r.reward_type === "social");
  const currentStreak = 0;

  return (
    <PlatformLayout badge="Preview" title={<>Daily <span className="gradient-text">Rewards</span></>} description="Earn credits every day through check-ins, community activity, and creative contributions.">
      <div className="grid gap-5 lg:grid-cols-3 mb-8">
        <div className="silver-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-foreground/70" />
              <h3 className="font-display text-base font-semibold uppercase tracking-wider">Check-in Rewards</h3>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground"><Clock className="h-3 w-3" /> Streak {currentStreak}</span>
          </div>
          {checkins.length === 0 ? (
            <p className="text-sm text-muted-foreground">No check-in rewards configured.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {checkins.map((r) => {
                const Icon = iconFor(r.reward_key);
                return (
                  <div key={r.id} className="rounded-lg border border-border/40 bg-card/40 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-4 w-4 text-foreground/70" />
                      <p className="text-sm font-medium">{r.title}</p>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{r.description}</p>
                    <p className="mt-3 font-display text-xl font-bold">+{r.credits}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">credits</p>
                  </div>
                );
              })}
            </div>
          )}
          <Button className="mt-5 gap-2" disabled><Gift className="h-4 w-4" /> Claim Today · Coming Soon</Button>
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
        {social.length === 0 ? (
          <p className="text-sm text-muted-foreground">No social rewards configured.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {social.map((r) => {
              const Icon = iconFor(r.reward_key);
              return (
                <div key={r.id} className="rounded-lg border border-border/40 bg-card/40 p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-md bg-card border border-border/60 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-foreground/70" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm truncate">{r.title}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{r.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-foreground/90 shrink-0">+{r.credits}</span>
                </div>
              );
            })}
          </div>
        )}
        <p className="mt-5 text-[11px] text-muted-foreground/70">Claim logic activates once community features are live. Bonus credits expire 2 months after earned.</p>
      </div>
    </PlatformLayout>
  );
};

export default Rewards;
