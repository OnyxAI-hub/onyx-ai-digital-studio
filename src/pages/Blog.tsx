import { useState } from "react";
import { Search, Clock, Eye, Heart, PenSquare } from "lucide-react";
import PlatformLayout from "@/components/studio/PlatformLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { blogPosts, blogCategories } from "@/data/community";

const tabs = ["Trending", "For You", "Picks"] as const;

const Blog = () => {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Trending");
  const [cat, setCat] = useState<(typeof blogCategories)[number]>("All");
  const items = blogPosts.filter((p) => cat === "All" || p.category === cat);

  return (
    <PlatformLayout
      badge="Blog · Community"
      title={<>ONYX <span className="gradient-text">Editorial</span></>}
      description="Tutorials, prompting tips, platform updates, creator stories, and AI guides. Demo content while community posts roll out."
      actions={<Button size="sm" disabled className="gap-2"><PenSquare className="h-3.5 w-3.5" /> Write · Soon</Button>}
    >
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="inline-flex rounded-full border border-border/60 bg-card/60 p-1">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition ${tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search posts…" className="pl-9 bg-card/40 border-border/40" />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-1.5">
        {blogCategories.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider border transition ${cat === c ? "border-foreground/60 bg-foreground/10 text-foreground" : "border-border/40 bg-card/40 text-muted-foreground hover:text-foreground"}`}>{c}</button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <article key={p.id} className="glass-card-hover overflow-hidden flex flex-col">
            <div className={`aspect-[16/10] bg-gradient-to-br ${p.gradient}`} />
            <div className="p-5 flex-1 flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{p.category}</span>
              <h3 className="mt-2 font-display text-base font-semibold tracking-tight leading-snug">{p.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed flex-1">{p.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/30">
                <span className="truncate">{p.author}</span>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readTime}</span>
                  <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" /> {p.claps}</span>
                  <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" /> {p.views}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PlatformLayout>
  );
};

export default Blog;
