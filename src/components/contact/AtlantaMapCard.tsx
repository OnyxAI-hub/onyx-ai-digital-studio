import { MapPin } from "lucide-react";

const AtlantaMapCard = () => (
  <div className="glass-card overflow-hidden relative">
    {/* Dark stylized map background */}
    <div className="relative h-48 bg-[hsl(240,10%,6%)]">
      <svg
        viewBox="0 0 400 200"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Grid lines – city block feel */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(0,0%,100%)" strokeOpacity="0.04" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="glow" cx="50%" cy="50%" r="35%">
            <stop offset="0%" stopColor="hsl(0,0%,100%)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="hsl(0,0%,100%)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="url(#grid)" />
        <circle cx="200" cy="100" r="140" fill="url(#glow)" />

        {/* Stylized road network – Atlanta-inspired */}
        <g stroke="hsl(0,0%,100%)" strokeOpacity="0.08" fill="none" strokeWidth="1">
          {/* Major arteries */}
          <line x1="200" y1="0" x2="200" y2="200" strokeOpacity="0.12" strokeWidth="1.5" />
          <line x1="0" y1="100" x2="400" y2="100" strokeOpacity="0.12" strokeWidth="1.5" />
          {/* Peachtree diagonal */}
          <line x1="140" y1="0" x2="260" y2="200" strokeOpacity="0.1" strokeWidth="1.2" />
          {/* I-285 loop */}
          <ellipse cx="200" cy="100" rx="120" ry="70" strokeOpacity="0.07" strokeWidth="1.5" />
          {/* Inner streets */}
          <line x1="160" y1="0" x2="160" y2="200" />
          <line x1="240" y1="0" x2="240" y2="200" />
          <line x1="0" y1="60" x2="400" y2="60" />
          <line x1="0" y1="140" x2="400" y2="140" />
          <line x1="120" y1="30" x2="280" y2="170" />
          <line x1="280" y1="30" x2="120" y2="170" />
        </g>

        {/* Neighborhood dots */}
        <g fill="hsl(0,0%,100%)" fillOpacity="0.06">
          <circle cx="160" cy="80" r="18" />
          <circle cx="230" cy="120" r="14" />
          <circle cx="180" cy="130" r="10" />
          <circle cx="220" cy="70" r="12" />
        </g>

        {/* Center pin glow */}
        <circle cx="200" cy="100" r="8" fill="hsl(0,0%,100%)" fillOpacity="0.06" />
        <circle cx="200" cy="100" r="4" fill="hsl(0,0%,100%)" fillOpacity="0.12" />
      </svg>

      {/* Pin marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
        <div className="relative flex flex-col items-center">
          <div className="rounded-full border border-foreground/20 bg-foreground/10 p-2 backdrop-blur-sm">
            <MapPin className="h-4 w-4 text-foreground/80" />
          </div>
          <div className="mt-0.5 h-3 w-px bg-foreground/20" />
          <div className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
        </div>
      </div>
    </div>

    {/* Info bar */}
    <div className="px-5 py-4 border-t border-border/30">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-display font-semibold text-sm tracking-tight">Atlanta, GA</h4>
          <p className="text-xs text-muted-foreground mt-0.5">Remote — Serving clients worldwide</p>
        </div>
        <div className="rounded-md border border-border/30 bg-card/40 px-2.5 py-1">
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">HQ</span>
        </div>
      </div>
    </div>
  </div>
);

export default AtlantaMapCard;
