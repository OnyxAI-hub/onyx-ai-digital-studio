import { useState } from "react";
import { Search, Heart, MessageCircle } from "lucide-react";
import PlatformLayout from "@/components/studio/PlatformLayout";
import { Input } from "@/components/ui/input";
import { galleryItems, galleryTabs } from "@/data/studio";

const GalleryPage = () => {
  const [tab, setTab] = useState<(typeof galleryTabs)[number]>("All");
  const items = galleryItems.filter((i) => tab === "All" || i.category === tab);

  return (
    <PlatformLayout badge="Featured Concepts · Demo Gallery" title={<>Studio <span className="gradient-text">Gallery</span></>} description="Browse AI creative outputs across images, videos, music visuals, brand assets, and websites. Demo content while user-submitted work rolls out.">
      <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
        <div className="inline-flex flex-wrap rounded-full border border-border/60 bg-card/60 p-1">
          {galleryTabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider rounded-full transition ${tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search concepts…" className="pl-9 bg-card/40 border-border/40" />
        </div>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
        {items.map((item, i) => (
          <div key={item.title + i} className="mb-5 break-inside-avoid glass-card overflow-hidden group">
            <div className={`bg-gradient-to-br ${item.gradient} ${item.span === "tall" ? "aspect-[3/4]" : item.span === "wide" ? "aspect-[16/10]" : "aspect-square"} relative`}>
              <span className="absolute top-3 left-3 rounded-md bg-background/70 backdrop-blur px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground border border-border/40">{item.category}</span>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm font-medium truncate">{item.title}</p>
              <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="truncate">{item.model}</span>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" /> {Math.floor(Math.random() * 400 + 50)}</span>
                  <span className="inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {Math.floor(Math.random() * 30 + 2)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PlatformLayout>
  );
};

export default GalleryPage;
