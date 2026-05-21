import { useEffect, useState } from "react";
import { Upload, FolderOpen, ImageIcon, Video, Music, FileText } from "lucide-react";
import PlatformLayout from "@/components/studio/PlatformLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
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

const iconFor = (type: string | null) => {
  switch (type) {
    case "video": return Video;
    case "audio": return Music;
    case "document": return FileText;
    default: return ImageIcon;
  }
};

const AssetManager = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [assets, setAssets] = useState<AssetRow[]>([]);

  useEffect(() => { if (!loading && !user) navigate("/auth"); }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("asset_manager")
      .select("id,name,asset_type,file_url,thumbnail_url,size_bytes,source,created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setAssets((data as AssetRow[]) ?? []));
  }, [user]);

  return (
    <PlatformLayout
      badge="Workspace"
      title={<>Asset <span className="gradient-text">Manager</span></>}
      description="Your uploaded references and generated outputs in one place."
      actions={<Button size="sm" disabled className="gap-2"><Upload className="h-3.5 w-3.5" /> Upload · Soon</Button>}
    >
      <div className="glass-card p-8 mb-6 text-center border-dashed">
        <FolderOpen className="h-8 w-8 mx-auto text-muted-foreground/60" />
        <p className="mt-3 text-sm font-medium">Drag & drop files here</p>
        <p className="text-[11px] text-muted-foreground mt-1">File upload activates once storage rolls out. Submit creative requests for now.</p>
        <Button variant="outline" size="sm" className="mt-4" disabled>Browse Files · Soon</Button>
      </div>

      {assets.length === 0 ? (
        <div className="glass-card p-8 text-center text-sm text-muted-foreground">No assets yet.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {assets.map((a) => {
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
      )}
    </PlatformLayout>
  );
};

export default AssetManager;
