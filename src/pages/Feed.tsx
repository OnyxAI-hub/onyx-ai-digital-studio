import { useState } from "react";
import { Heart, MessageCircle, Eye, Bookmark, Share2, Search, Trophy } from "lucide-react";
import PlatformLayout from "@/components/studio/PlatformLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { feedPosts } from "@/data/community";

const tabs = ["Discover", "Mix", "Following"] as const;

const Feed = () => {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Discover");

  return (
    <PlatformLayout badge="Community · Preview" title={<>Creator <span className="gradient-text">Feed</span></>} description="Share creations, follow creators, and discover trending AI work. Demo content shown while live posts roll out.">
      <div className="glass-card p-4 mb-6">
        <Input placeholder="What's on your mind? Share a creation, idea, or update…" className="bg-background/40 border-border/40" />
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-[11px] text-muted-foreground/70">Posting unlocks +50 credits when live.</p>
          <Button size="sm" disabled>Post · Coming Soon</Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="inline-flex rounded-full border border-border/60 bg-card/60 p-1">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition ${tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search posts, creators…" className="pl-9 bg-card/40 border-border/40" />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {feedPosts.map((p) => (
          <article key={p.id} className="glass-card overflow-hidden flex flex-col">
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border/30">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-border/60 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{p.author}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{p.handle}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-7 text-[11px]">Follow</Button>
            </div>
            <div className={`aspect-[4/3] bg-gradient-to-br ${p.gradient} relative`}>
              {p.challenge && (
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/70 backdrop-blur px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/90 border border-border/40">
                  <Trophy className="h-3 w-3" /> {p.challenge}
                </span>
              )}
              <span className="absolute bottom-3 right-3 rounded-md bg-background/70 backdrop-blur px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground border border-border/40">{p.model}</span>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-foreground/90 leading-snug">{p.caption}</p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {p.likes}</span>
                  <span className="inline-flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {p.comments}</span>
                  <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {p.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="hover:text-foreground transition" aria-label="Save"><Bookmark className="h-3.5 w-3.5" /></button>
                  <button className="hover:text-foreground transition" aria-label="Share"><Share2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-[11px] text-muted-foreground/70">Demo content. Live posts, follows, and interaction rewards activate once community is enabled.</p>
    </PlatformLayout>
  );
};

export default Feed;
