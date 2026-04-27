import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Stylized, designed map of Atlanta — black & white, ONYX aesthetic.
 * Not a Google Map — a hand-crafted vector composition with subtle
 * interactivity (drag to pan, scroll/buttons to zoom).
 */
const AtlantaMapCard = () => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const clampScale = (s: number) => Math.min(2.5, Math.max(0.7, s));

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => clampScale(s + (e.deltaY < 0 ? 0.1 : -0.1)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  // Reset if user double-clicks
  const onDoubleClick = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();
    return () => document.removeEventListener("gesturestart", prevent);
  }, []);

  return (
    <div className="glass-card overflow-hidden relative">
      {/* Map canvas */}
      <div
        className="relative h-64 bg-[hsl(0,0%,4%)] cursor-grab active:cursor-grabbing select-none touch-none"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={onDoubleClick}
      >
        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(0,0%,0%)_100%)] z-10" />

        {/* Zoom controls */}
        <div className="absolute right-3 top-3 z-20 flex flex-col rounded-md border border-border/40 bg-background/70 backdrop-blur-md overflow-hidden">
          <button
            type="button"
            onClick={() => setScale((s) => clampScale(s + 0.2))}
            className="px-2 py-1 text-foreground/70 hover:text-foreground hover:bg-foreground/5 text-sm leading-none"
            aria-label="Zoom in"
          >
            +
          </button>
          <div className="h-px bg-border/40" />
          <button
            type="button"
            onClick={() => setScale((s) => clampScale(s - 0.2))}
            className="px-2 py-1 text-foreground/70 hover:text-foreground hover:bg-foreground/5 text-sm leading-none"
            aria-label="Zoom out"
          >
            −
          </button>
        </div>

        {/* Hint */}
        <div className="absolute left-3 bottom-3 z-20 rounded-md border border-border/30 bg-background/60 backdrop-blur-md px-2 py-1">
          <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Drag · Scroll to zoom
          </span>
        </div>

        {/* Pannable / zoomable layer */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: dragging.current ? "none" : "transform 0.18s ease-out",
          }}
        >
          <svg
            viewBox="0 0 400 260"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Fine grid */}
              <pattern id="fineGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(0,0%,100%)" strokeOpacity="0.03" strokeWidth="0.5" />
              </pattern>
              {/* Major grid */}
              <pattern id="majorGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="hsl(0,0%,100%)" strokeOpacity="0.06" strokeWidth="0.6" />
              </pattern>
              {/* Center glow */}
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="35%">
                <stop offset="0%" stopColor="hsl(0,0%,100%)" stopOpacity="0.10" />
                <stop offset="100%" stopColor="hsl(0,0%,100%)" stopOpacity="0" />
              </radialGradient>
              {/* Pin pulse */}
              <radialGradient id="pinPulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(0,0%,100%)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="hsl(0,0%,100%)" stopOpacity="0" />
              </radialGradient>
              {/* Park / district fills */}
              <pattern id="hatch" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="4" stroke="hsl(0,0%,100%)" strokeOpacity="0.08" strokeWidth="0.5" />
              </pattern>
            </defs>

            {/* Background layers */}
            <rect width="400" height="260" fill="url(#fineGrid)" />
            <rect width="400" height="260" fill="url(#majorGrid)" />
            <circle cx="200" cy="130" r="170" fill="url(#centerGlow)" />

            {/* Districts (subtle filled blobs) */}
            <g fill="url(#hatch)" stroke="hsl(0,0%,100%)" strokeOpacity="0.08" strokeWidth="0.6">
              <path d="M 110 70 Q 150 50 190 75 Q 200 110 165 130 Q 120 130 100 105 Z" />
              <path d="M 220 60 Q 270 65 285 100 Q 280 135 240 140 Q 210 120 215 85 Z" />
              <path d="M 130 160 Q 180 150 210 170 Q 215 205 175 215 Q 130 210 115 185 Z" />
              <path d="M 245 165 Q 295 160 305 195 Q 295 225 255 225 Q 230 205 235 180 Z" />
            </g>

            {/* I-285 perimeter loop */}
            <ellipse
              cx="200"
              cy="130"
              rx="150"
              ry="95"
              fill="none"
              stroke="hsl(0,0%,100%)"
              strokeOpacity="0.18"
              strokeWidth="1.2"
              strokeDasharray="2 4"
            />

            {/* Major arteries */}
            <g stroke="hsl(0,0%,100%)" fill="none" strokeLinecap="round">
              {/* I-75 / I-85 (the Connector) */}
              <path d="M 200 0 Q 195 60 200 130 Q 205 200 200 260" strokeOpacity="0.32" strokeWidth="1.8" />
              {/* I-20 east-west */}
              <path d="M 0 145 Q 100 138 200 145 Q 300 152 400 145" strokeOpacity="0.28" strokeWidth="1.6" />
              {/* Peachtree diagonal */}
              <path d="M 130 0 Q 180 90 210 130 Q 240 180 280 260" strokeOpacity="0.22" strokeWidth="1.2" />
              {/* GA-400 north */}
              <path d="M 235 0 Q 230 50 220 100" strokeOpacity="0.2" strokeWidth="1.1" />
              {/* I-675 southeast */}
              <path d="M 245 260 Q 260 220 270 180" strokeOpacity="0.18" strokeWidth="1" />
            </g>

            {/* Secondary streets */}
            <g stroke="hsl(0,0%,100%)" strokeOpacity="0.07" strokeWidth="0.5" fill="none">
              <line x1="60" y1="0" x2="60" y2="260" />
              <line x1="120" y1="0" x2="120" y2="260" />
              <line x1="160" y1="0" x2="160" y2="260" />
              <line x1="260" y1="0" x2="260" y2="260" />
              <line x1="320" y1="0" x2="320" y2="260" />
              <line x1="0" y1="40" x2="400" y2="40" />
              <line x1="0" y1="80" x2="400" y2="80" />
              <line x1="0" y1="180" x2="400" y2="180" />
              <line x1="0" y1="220" x2="400" y2="220" />
            </g>

            {/* Chattahoochee River — flowing curve */}
            <path
              d="M 0 50 Q 60 70 90 60 Q 130 45 160 70 Q 190 95 175 130"
              fill="none"
              stroke="hsl(0,0%,100%)"
              strokeOpacity="0.14"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 0 54 Q 60 74 90 64 Q 130 49 160 74 Q 190 99 175 134"
              fill="none"
              stroke="hsl(0,0%,100%)"
              strokeOpacity="0.05"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Neighborhood markers */}
            <g fill="hsl(0,0%,100%)" fillOpacity="0.5">
              <circle cx="155" cy="95" r="1.6" />
              <circle cx="245" cy="100" r="1.6" />
              <circle cx="180" cy="180" r="1.6" />
              <circle cx="265" cy="195" r="1.6" />
              <circle cx="120" cy="155" r="1.6" />
              <circle cx="295" cy="155" r="1.6" />
            </g>
            <g fontFamily="ui-sans-serif, system-ui" fontSize="5.5" fill="hsl(0,0%,100%)" fillOpacity="0.35" letterSpacing="1.2">
              <text x="160" y="92">MIDTOWN</text>
              <text x="250" y="97">BUCKHEAD</text>
              <text x="185" y="177">GRANT PARK</text>
              <text x="270" y="192">DECATUR</text>
              <text x="125" y="152">WEST END</text>
            </g>

            {/* Center pin glow + pin */}
            <circle cx="200" cy="130" r="22" fill="url(#pinPulse)" />
            <circle cx="200" cy="130" r="3" fill="hsl(0,0%,100%)" />
            <circle cx="200" cy="130" r="6" fill="none" stroke="hsl(0,0%,100%)" strokeOpacity="0.5" strokeWidth="0.8" />

            {/* Compass */}
            <g transform="translate(40, 40)" stroke="hsl(0,0%,100%)" strokeOpacity="0.4" fill="none">
              <circle r="10" />
              <path d="M 0 -8 L 2 0 L 0 8 L -2 0 Z" fill="hsl(0,0%,100%)" fillOpacity="0.5" stroke="none" />
              <text x="0" y="-13" textAnchor="middle" fontSize="5" fill="hsl(0,0%,100%)" fillOpacity="0.5" stroke="none" fontFamily="ui-sans-serif">N</text>
            </g>

            {/* Coordinates label */}
            <g fontFamily="ui-monospace, monospace" fontSize="5" fill="hsl(0,0%,100%)" fillOpacity="0.35">
              <text x="335" y="18">33.7490° N</text>
              <text x="335" y="26">84.3880° W</text>
            </g>
          </svg>
        </div>
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
};

export default AtlantaMapCard;
