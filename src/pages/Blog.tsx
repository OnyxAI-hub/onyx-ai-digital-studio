import { useEffect, useMemo, useState } from "react";
import { Search, Clock, Eye, Heart, PenSquare } from "lucide-react";
import PlatformLayout from "@/components/studio/PlatformLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const tabs = ["Trending", "For You", "Picks"] as const;

interface PostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  author_name: string | null;
  read_time: string | null;
  cover_gradient: string | null;
  views: number;
  published_at: string | null;
}

const Blog = () => {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Trending");
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [claps, setClaps] = useState<Record<string, number>>({});
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id,slug,title,excerpt,category,author_name,read_time,cover_gradient,views,published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      const rows = (data as PostRow[]) ?? [];
      setPosts(rows);
      if (rows.length) {
        const { data: c } = await supabase.from("blog_claps").select("post_id").in("post_id", rows.map((r) => r.id));
        const map: Record<string, number> = {};
        (c ?? []).forEach((row: any) => { map[row.post_id] = (map[row.post_id] ?? 0) + 1; });
        setClaps(map);
      }
    })();
  }, []);

  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map((p) => p.category || "General")))], [posts]);
  const items = posts
    .filter((p) => cat === "All" || p.category === cat)
    .filter((p) => !q || p.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <PlatformLayout
      badge="Blog · Community"
      title={<>ONYX <span className="gradient-text">Editorial</span></>}
      description="Tutorials, prompting tips, platform updates, creator stories, and AI guides."
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
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search posts…" className="pl-9 bg-card/40 border-border/40" />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider border transition ${cat === c ? "border-foreground/60 bg-foreground/10 text-foreground" : "border-border/40 bg-card/40 text-muted-foreground hover:text-foreground"}`}>{c}</button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="glass-card p-8 text-center text-sm text-muted-foreground">No posts yet.</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article key={p.id} className="glass-card-hover overflow-hidden flex flex-col">
              <div className={`aspect-[16/10] bg-gradient-to-br ${p.cover_gradient || "from-zinc-700 to-zinc-900"}`} />
              <div className="p-5 flex-1 flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{p.category}</span>
                <h3 className="mt-2 font-display text-base font-semibold tracking-tight leading-snug">{p.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed flex-1">{p.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/30">
                  <span className="truncate">{p.author_name}</span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.read_time}</span>
                    <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" /> {claps[p.id] ?? 0}</span>
                    <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" /> {p.views}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </PlatformLayout>
  );
};

export default Blog;
