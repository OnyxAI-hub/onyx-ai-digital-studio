import { MapPin } from "lucide-react";

// Atlanta, GA centered Google Maps embed (interactive: zoom + drag)
const ATLANTA_EMBED =
  "https://www.google.com/maps?q=Atlanta,GA&z=11&output=embed";

const AtlantaMapCard = () => (
  <div className="glass-card overflow-hidden relative">
    {/* Interactive grayscale Google Map */}
    <div className="relative h-64 bg-[hsl(240,10%,6%)]">
      <iframe
        title="Atlanta, GA — ONYX AI Studios"
        src={ATLANTA_EMBED}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
        style={{
          filter: "grayscale(100%) contrast(1.05) brightness(0.85) invert(0)",
        }}
        allowFullScreen
      />
      {/* Subtle dark overlay for premium feel — pointer-events-none keeps map interactive */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40" />
    </div>

    {/* Info bar */}
    <div className="px-5 py-4 border-t border-border/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-foreground/70" />
          <div>
            <h4 className="font-display font-semibold text-sm tracking-tight">Atlanta, GA</h4>
            <p className="text-xs text-muted-foreground mt-0.5">Remote — Serving clients worldwide</p>
          </div>
        </div>
        <div className="rounded-md border border-border/30 bg-card/40 px-2.5 py-1">
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">HQ</span>
        </div>
      </div>
    </div>
  </div>
);

export default AtlantaMapCard;
