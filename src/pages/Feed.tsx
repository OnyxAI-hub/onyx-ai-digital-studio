import { useEffect, useState } from "react";
import { Heart, MessageCircle, Eye, Bookmark, Share2, Search, Trophy } from "lucide-react";
import PlatformLayout from "@/components/studio/PlatformLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { feedPosts } from "@/data/community";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const tabs = ["Discover", "Mix", "Following"] as const;

interface PostRow {
  id: string;
  user_id: string;
  caption: string | null;
  media_gradient: string | null;
  model_name: string | null;
  views: number;
  created_at: string;
}

const Feed = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Discover");
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [caption, setCaption] = useState("");
  const [posting, setPosting] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("posts")
      .select("id,user_id,caption,media_gradient,model_name,views,created_at")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(40);
    setPosts((data as PostRow[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (!user) { toast({ title: "Sign in to post" }); return; }
    if (!caption.trim()) return;
    setPosting(true);
    const { error } = await supabase.from("posts").insert({
      user_id: user.id,
      caption: caption.trim(),
      media_gradient: "from-zinc-700 to-zinc-900",
      model_name: "Onyx Image · Pro",
    });
    setPosting(false);
    if (error) { toast({ title: "Could not post", description: error.message, variant: "destructive" }); return; }
    setCaption("");
    toast({ title: "Posted" });
    load();
  };

  const showDemo = posts.length === 0;

  return (
    <PlatformLayout badge="Community" title={<>Creator <span className="gradient-text">Feed</span></>} description="Share creations, follow creators, and discover trending AI work.">
      <div className="glass-card p-4 mb-6">
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder={user ? "What's on your mind? Share a creation, idea, or update…" : "Sign in to share with the community."}
          className="bg-background/40 border-border/40 min-h-[70px]"
          disabled={!user}
        />
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-[11px] text-muted-foreground/70">Likes & comments enable as the community rolls out.</p>
          <Button size="sm" onClick={submit} disabled={!user || posting || !caption.trim()}>
            {posting ? "Posting…" : "Post"}
          </Button>
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

      {showDemo ? (
        <>
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
          <p className="mt-8 text-center text-[11px] text-muted-foreground/70">Featured demo content. Be the first creator to post a live entry.</p>
        </>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((p) => (
            <article key={p.id} className="glass-card overflow-hidden flex flex-col">
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border/30">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-border/60 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">Creator</p>
                    <p className="text-[10px] text-muted-foreground truncate">{new Date(p.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-7 text-[11px]" disabled>Follow · Soon</Button>
              </div>
              <div className={`aspect-[4/3] bg-gradient-to-br ${p.media_gradient || "from-zinc-700 to-zinc-900"} relative`}>
                {p.model_name && (
                  <span className="absolute bottom-3 right-3 rounded-md bg-background/70 backdrop-blur px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground border border-border/40">{p.model_name}</span>
                )}
              </div>
              <div className="px-4 py-3">
                <p className="text-sm text-foreground/90 leading-snug">{p.caption}</p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> —</span>
                    <span className="inline-flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> —</span>
                    <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {p.views}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Preview</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </PlatformLayout>
  );
};

export default Feed;
