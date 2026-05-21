import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, FolderOpen, ImageIcon, Video, Music, FileText, Clock, CheckCircle2, Plus } from "lucide-react";
import PlatformLayout from "@/components/studio/PlatformLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface AssetRow {
  id: string;
  name: string;
  asset_type: string | null;
  file_url: string | null;
  thumbnail_url: string | null;
  size_bytes: number | null;
  source: string | null;
  created_at: string;
}

interface RequestRow {
  id: string;
  request_type: string;
  status: string;
  estimated_credits: number;
  prompt: string;
  delivery_url: string | null;
  created_at: string;
}

const FILTERS = [
  "All Assets",
  "Images",
  "Videos",
  "Audio",
  "Brand Assets",
  "Website Previews",
  "Pending Requests",
  "Completed Requests",
  "Favorites",
] as const;

type Filter = (typeof FILTERS)[number];

const iconFor = (type: string | null) => {
  switch (type) {
    case "video": return Video;
    case "audio": return Music;
    case "document": return FileText;
    default: return ImageIcon;
  }
};

const requestKindMatches = (rt: string, filter: Filter) => {
  if (filter === "Images") return /Image|Cover|Brand/i.test(rt);
  if (filter === "Videos") return /Video|Promo|Clip/i.test(rt);
  if (filter === "Audio") return /Audio|Music|Speech/i.test(rt);
  if (filter === "Brand Assets") return /Brand|Cover|Design/i.test(rt);
  if (filter === "Website Previews") return /Website|Web App/i.test(rt);
  return true;
};

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    pending: "border-amber-500/30 bg-amber-500/10 text-amber-300/90",
    processing: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300/90",
    completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300/90",
    failed: "border-rose-500/30 bg-rose-500/10 text-rose-300/90",
    cancelled: "border-border/40 bg-card/40 text-muted-foreground",
    refunded: "border-violet-500/30 bg-violet-500/10 text-violet-300/90",
  };
  const c = colors[status] ?? "border-border/40 bg-card/40 text-muted-foreground";
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${c}`}>{status}</span>;
};

const AssetManager = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [assets, setAssets] = useState<AssetRow[]>([]);
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [filter, setFilter] = useState<Filter>("All Assets");

  useEffect(() => { if (!loading && !user) navigate("/auth"); }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("asset_manager")
      .select("id,name,asset_type,file_url,thumbnail_url,size_bytes,source,created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setAssets((data as AssetRow[]) ?? []));
    supabase
      .from("creative_requests")
      .select("id,request_type,status,estimated_credits,prompt,delivery_url,created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setRequests((data as RequestRow[]) ?? []));
  }, [user]);

  const filteredAssets = assets.filter((a) => {
    if (filter === "All Assets") return true;
    if (filter === "Images") return a.asset_type === "image" || !a.asset_type;
    if (filter === "Videos") return a.asset_type === "video";
    if (filter === "Audio") return a.asset_type === "audio";
    return false; // Brand / Website / Requests / Favorites filter via requests
  });

  const showAssets = !["Pending Requests", "Completed Requests"].includes(filter);
  const showRequests = ["All Assets", "Pending Requests", "Completed Requests", "Images", "Videos", "Audio", "Brand Assets", "Website Previews"].includes(filter);
  const filteredRequests = requests.filter((r) => {
    if (filter === "Pending Requests") return ["pending", "processing"].includes(r.status);
    if (filter === "Completed Requests") return r.status === "completed";
    if (filter === "All Assets") return true;
    return requestKindMatches(r.request_type, filter);
  });

  const isEmpty = filteredAssets.length === 0 && filteredRequests.length === 0;

  return (
    <PlatformLayout
      badge="Workspace"
      title={<>Asset <span className="gradient-text">Manager</span></>}
      description="Your library of generated outputs, uploaded references, and creative requests."
      actions={
        <>
          <Button size="sm" disabled className="gap-2"><Upload className="h-3.5 w-3.5" /> Upload · Soon</Button>
          <Link to="/generate"><Button size="sm" className="gap-2"><Plus className="h-3.5 w-3.5" /> Create New Asset</Button></Link>
        </>
      }
    >
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6 -mt-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-wider transition ${
              filter === f
                ? "border-foreground/40 bg-foreground/10 text-foreground"
                : "border-border/50 bg-card/40 text-muted-foreground hover:text-foreground"
            }`}
          >{f}</button>
        ))}
      </div>

      {isEmpty && (
        <div className="glass-card p-12 text-center border-dashed">
          <FolderOpen className="h-8 w-8 mx-auto text-muted-foreground/60" />
          <p className="mt-3 text-sm font-medium">No assets yet.</p>
          <p className="mt-1 text-xs text-muted-foreground">Start by submitting a creation request.</p>
          <Link to="/generate"><Button size="sm" className="mt-4 gap-2"><Plus className="h-3.5 w-3.5" /> Create New Asset</Button></Link>
        </div>
      )}

      {showRequests && filteredRequests.length > 0 && (
        <div className="mb-8">
          <h3 className="font-display text-sm font-semibold tracking-tight mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" /> Creative Requests
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRequests.map((r) => (
              <div key={r.id} className="glass-card p-4 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold truncate">{r.request_type}</p>
                  <StatusBadge status={r.status} />
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">{r.prompt}</p>
                <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground/80">
                  <span>{new Date(r.created_at).toLocaleDateString()}</span>
                  <span>{r.estimated_credits} credits est.</span>
                </div>
                {r.delivery_url && (
                  <a href={r.delivery_url} target="_blank" rel="noreferrer" className="mt-3 text-[10px] uppercase tracking-wider text-cyan-300/90 hover:text-cyan-200 inline-flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> View delivery
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {showAssets && filteredAssets.length > 0 && (
        <div>
          <h3 className="font-display text-sm font-semibold tracking-tight mb-3 flex items-center gap-2">
            <FolderOpen className="h-4 w-4 text-muted-foreground" /> Assets
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredAssets.map((a) => {
              const Icon = iconFor(a.asset_type);
              return (
                <div key={a.id} className="glass-card overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                    {a.thumbnail_url ? (
                      <img src={a.thumbnail_url} alt={a.name} className="w-full h-full object-cover" />
                    ) : (
                      <Icon className="h-8 w-8 text-muted-foreground/60" />
                    )}
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-xs font-medium truncate">{a.name}</p>
                    <p className="text-[10px] text-muted-foreground">{a.asset_type} · {new Date(a.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlatformLayout>
  );
};

export default AssetManager;
