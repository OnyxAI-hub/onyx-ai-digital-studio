import { useState } from "react";
import { Camera, Link as LinkIcon, Pencil, Trophy } from "lucide-react";
import PlatformLayout from "@/components/studio/PlatformLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { galleryItems } from "@/data/studio";

const tabs = ["Posts", "Gallery", "Favorites", "Challenges", "About"] as const;

const Profile = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Posts");
  const name = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Creator";

  return (
    <PlatformLayout badge="My Page · Preview" title={<>Creator <span className="gradient-text">Profile</span></>} description="Your public creator page inside the ONYX ecosystem. Live profile editing rolls out with community.">
      <div className="silver-card overflow-hidden mb-6">
        <div className="aspect-[5/1] bg-gradient-to-br from-slate-900 via-indigo-950 to-cyan-950 relative">
          <button className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/70 backdrop-blur px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-foreground/80 border border-border/40 hover:text-foreground" disabled>
            <Camera className="h-3 w-3" /> Upload Cover
          </button>
        </div>
        <div className="px-6 pb-6 -mt-12 flex flex-col md:flex-row md:items-end gap-5">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border-4 border-background shrink-0" />
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-2xl font-bold tracking-tight truncate">{name}</h2>
            <p className="text-xs text-muted-foreground">@{(user?.email?.split("@")[0] || "creator").toLowerCase()}</p>
            <p className="mt-2 text-sm text-foreground/80 max-w-xl">Premium AI creator working in chrome, monochrome, and cinematic motion. Building with ONYX AI Studio.</p>
            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><LinkIcon className="h-3 w-3" /> onyx-ai.studio/@{(user?.email?.split("@")[0] || "creator").toLowerCase()}</span>
            </div>
          </div>
          <Button size="sm" variant="outline" className="gap-2" disabled><Pencil className="h-3.5 w-3.5" /> Edit Profile</Button>
        </div>
      </div>

      <div className="glass-card p-3 mb-6">
        <input className="w-full bg-transparent text-sm placeholder:text-muted-foreground/60 outline-none px-3 py-2" placeholder="Share something with your followers…" disabled />
      </div>

      <div className="mb-5 inline-flex flex-wrap rounded-full border border-border/60 bg-card/60 p-1">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition ${tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
        ))}
      </div>

      {tab === "About" ? (
        <div className="glass-card p-6 text-sm text-muted-foreground space-y-3">
          <p><span className="text-foreground/90 font-medium">Bio:</span> Premium AI creator working in chrome, monochrome, and cinematic motion.</p>
          <p><span className="text-foreground/90 font-medium">Tools:</span> Onyx Vision Pro, Onyx Motion v1, Onyx Canvas.</p>
          <p><span className="text-foreground/90 font-medium">Member since:</span> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}</p>
        </div>
      ) : tab === "Challenges" ? (
        <div className="grid gap-4 md:grid-cols-3">
          {["Cyber City Night", "Luxury Product Shot", "Hotel Lobby Mystery"].map((c) => (
            <div key={c} className="glass-card p-5 flex items-center gap-3">
              <Trophy className="h-5 w-5 text-foreground/70" />
              <div>
                <p className="text-sm font-medium">{c}</p>
                <p className="text-[11px] text-muted-foreground">Participant badge</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {galleryItems.slice(0, 6).map((it, i) => (
            <div key={i} className="mb-4 break-inside-avoid glass-card overflow-hidden">
              <div className={`bg-gradient-to-br ${it.gradient} ${it.span === "tall" ? "aspect-[3/4]" : "aspect-square"}`} />
              <div className="px-3 py-2 text-xs text-muted-foreground truncate">{it.title}</div>
            </div>
          ))}
        </div>
      )}
    </PlatformLayout>
  );
};

export default Profile;
