import { useEffect, useMemo, useState } from "react";
import { Search, Heart, MessageCircle } from "lucide-react";
import PlatformLayout from "@/components/studio/PlatformLayout";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface Item {
  id: string;
  title: string;
  category: string;
  model_name: string | null;
  gradient: string | null;
  span: string | null;
}

const GalleryPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [tab, setTab] = useState<string>("All");
  const [q, setQ] = useState("");

  useEffect(() => {
    supabase
      .from("gallery_items")
      .select("id,title,category,model_name,gradient,span")
      .eq("is_featured", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => setItems((data as Item[]) ?? []));
  }, []);

  const tabs = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const filtered = items
    .filter((i) => tab === "All" || i.category === tab)
    .filter((i) => !q || i.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <PlatformLayout badge="Featured Concepts" title={<>Studio <span className="gradient-text">Gallery</span></>} description="Browse AI creative outputs across images, videos, music visuals, brand assets, and websites.">
      <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
        <div className="inline-flex flex-wrap rounded-full border border-border/60 bg-card/60 p-1">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider rounded-full transition ${tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search concepts…" className="pl-9 bg-card/40 border-border/40" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card p-8 text-center text-sm text-muted-foreground">No featured concepts yet.</div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {filtered.map((item) => (
            <div key={item.id} className="mb-5 break-inside-avoid glass-card overflow-hidden group">
              <div className={`bg-gradient-to-br ${item.gradient || "from-zinc-700 to-zinc-900"} ${item.span === "tall" ? "aspect-[3/4]" : item.span === "wide" ? "aspect-[16/10]" : "aspect-square"} relative`}>
                <span className="absolute top-3 left-3 rounded-md bg-background/70 backdrop-blur px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground border border-border/40">{item.category}</span>
              </div>
              <div className="px-4 py-3">
                <p className="text-sm font-medium truncate">{item.title}</p>
                <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="truncate">{item.model_name}</span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" /> —</span>
                    <span className="inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" /> —</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PlatformLayout>
  );
};

export default GalleryPage;
