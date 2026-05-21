import { useEffect, useState } from "react";
import { Camera, Link as LinkIcon, Pencil, Trophy } from "lucide-react";
import PlatformLayout from "@/components/studio/PlatformLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const tabs = ["Posts", "Gallery", "Favorites", "Challenges", "About"] as const;

interface PostRow {
  id: string;
  caption: string | null;
  media_gradient: string | null;
  created_at: string;
}
interface AssetRow {
  id: string;
  name: string;
  thumbnail_url: string | null;
}

const Profile = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Posts");
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [assets, setAssets] = useState<AssetRow[]>([]);
  const name = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Creator";

  useEffect(() => {
    if (!user) return;
    supabase.from("posts").select("id,caption,media_gradient,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(12).then(({ data }) => setPosts((data as PostRow[]) ?? []));
    supabase.from("asset_manager").select("id,name,thumbnail_url").eq("user_id", user.id).order("created_at", { ascending: false }).limit(12).then(({ data }) => setAssets((data as AssetRow[]) ?? []));
  }, [user]);

  return (
    <PlatformLayout badge="My Page" title={<>Creator <span className="gradient-text">Profile</span></>} description="Your public creator page inside the ONYX ecosystem.">
      <div className="silver-card overflow-hidden mb-6">
        <div className="aspect-[5/1] bg-gradient-to-br from-slate-900 via-indigo-950 to-cyan-950 relative">
          <button className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/70 backdrop-blur px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-foreground/80 border border-border/40 hover:text-foreground" disabled>
            <Camera className="h-3 w-3" /> Upload Cover · Soon
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
          <Button size="sm" variant="outline" className="gap-2" disabled><Pencil className="h-3.5 w-3.5" /> Edit Profile · Soon</Button>
        </div>
      </div>

      <div className="mb-5 inline-flex flex-wrap rounded-full border border-border/60 bg-card/60 p-1">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition ${tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
        ))}
      </div>

      {tab === "About" ? (
        <div className="glass-card p-6 text-sm text-muted-foreground space-y-3">
          <p><span className="text-foreground/90 font-medium">Bio:</span> Premium AI creator working in chrome, monochrome, and cinematic motion.</p>
          <p><span className="text-foreground/90 font-medium">Email:</span> {user?.email ?? "—"}</p>
          <p><span className="text-foreground/90 font-medium">Member since:</span> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}</p>
        </div>
      ) : tab === "Challenges" ? (
        <div className="glass-card p-8 text-center text-sm text-muted-foreground">
          No challenge entries yet. Enter active challenges from the Challenges page.
        </div>
      ) : tab === "Favorites" ? (
        <div className="glass-card p-8 text-center text-sm text-muted-foreground">
          Favorites · Coming Soon
        </div>
      ) : tab === "Gallery" ? (
        assets.length === 0 ? (
          <div className="glass-card p-8 text-center text-sm text-muted-foreground">No saved assets yet.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {assets.map((a) => (
              <div key={a.id} className="glass-card overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-zinc-700 to-zinc-900">
                  {a.thumbnail_url && <img src={a.thumbnail_url} alt={a.name} className="w-full h-full object-cover" />}
                </div>
                <div className="px-2 py-1.5 text-[11px] truncate">{a.name}</div>
              </div>
            ))}
          </div>
        )
      ) : (
        posts.length === 0 ? (
          <div className="glass-card p-8 text-center text-sm text-muted-foreground">
            No posts yet. Share your first creation from the Feed.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {posts.map((p) => (
              <div key={p.id} className="mb-4 break-inside-avoid glass-card overflow-hidden">
                <div className={`bg-gradient-to-br ${p.media_gradient || "from-zinc-700 to-zinc-900"} aspect-square`} />
                <div className="px-3 py-2 text-xs text-foreground/90 line-clamp-2">{p.caption}</div>
              </div>
            ))}
          </div>
        )
      )}
    </PlatformLayout>
  );
};

export default Profile;
