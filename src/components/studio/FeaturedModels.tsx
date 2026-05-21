import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface ModelRow {
  id: string;
  slug: string;
  name: string;
  model_type: string;
  description: string | null;
  safety_level: string;
  is_premium: boolean;
  cta_label: string | null;
  cta_href: string | null;
  thumbnail_gradient: string | null;
}

interface PricingRow {
  model_id: string;
  credit_cost: number;
  unit_label: string | null;
}

const FeaturedModels = () => {
  const [models, setModels] = useState<ModelRow[]>([]);
  const [pricing, setPricing] = useState<Record<string, PricingRow>>({});

  useEffect(() => {
    (async () => {
      const { data: m } = await supabase
        .from("model_catalog")
        .select("id,slug,name,model_type,description,safety_level,is_premium,cta_label,cta_href,thumbnail_gradient")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .limit(6);
      const rows = (m as ModelRow[]) ?? [];
      setModels(rows);
      if (rows.length) {
        const { data: p } = await supabase
          .from("model_pricing")
          .select("model_id,credit_cost,unit_label")
          .in("model_id", rows.map((r) => r.id));
        const map: Record<string, PricingRow> = {};
        (p as PricingRow[] ?? []).forEach((row) => { map[row.model_id] = row; });
        setPricing(map);
      }
    })();
  }, []);

  if (models.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold tracking-tight">Featured Models</h3>
        <Sparkles className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {models.map((m) => {
          const price = pricing[m.id];
          return (
            <div key={m.id} className="glass-card-hover overflow-hidden flex flex-col">
              <div className={`aspect-[16/9] bg-gradient-to-br ${m.thumbnail_gradient || "from-zinc-700 to-zinc-900"} relative`}>
                <span className="absolute top-3 left-3 rounded-md bg-background/70 backdrop-blur px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground border border-border/40">
                  {m.model_type}
                </span>
                {m.is_premium && (
                  <span className="absolute top-3 right-3 rounded-md bg-foreground/80 backdrop-blur px-2 py-0.5 text-[10px] uppercase tracking-wider text-background">Premium</span>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="font-display text-base font-semibold">{m.name}</p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed flex-1">{m.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">
                    {price ? `${price.credit_cost} credits · ${price.unit_label}` : "Pricing TBA"}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/80 border border-border/40 rounded px-1.5 py-0.5">{m.safety_level}</span>
                </div>
                <Link to={m.cta_href || "/generate"} className="mt-3">
                  <Button size="sm" className="w-full gap-2">{m.cta_label || "Open"} <ArrowRight className="h-3 w-3" /></Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedModels;
