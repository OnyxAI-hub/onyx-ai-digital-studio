import { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  baseSize: number;
  phase: number;
  speed: number;
  baseOpacity: number;
  bloomRadius: number;
}

type LineColor = "white" | "green" | "red" | "purple" | "gray";

interface TermFragment {
  lines: { text: string; color: LineColor }[];
  x: number;
  y: number;
  delay: number;
  speed: number;
  charIndex: number;
  currentLine: number;
  blinkPhase: number;
  opacity: number;
}

const SPARKLE_COUNT = 6;

// Terminal fragment blocks — scattered organically
const FRAGMENTS: { lines: { text: string; color: LineColor }[] }[] = [
  {
    lines: [
      { text: "$ onyx init --project client-portal", color: "white" },
      { text: "> compiling components...", color: "gray" },
      { text: "> authentication enabled", color: "green" },
      { text: "> route /dashboard mapped", color: "green" },
      { text: "> ui compiled successfully ✓", color: "green" },
    ],
  },
  {
    lines: [
      { text: "$ onyx deploy --prod --region=edge", color: "white" },
      { text: "> bundling assets...", color: "gray" },
      { text: "> deploying to edge network...", color: "gray" },
      { text: "> ssl certificates verified", color: "green" },
      { text: "> system ready ✓", color: "green" },
    ],
  },
  {
    lines: [
      { text: "$ onyx scan --security", color: "white" },
      { text: "> scanning dependencies...", color: "gray" },
      { text: "> no vulnerabilities found", color: "green" },
      { text: "> headers configured", color: "green" },
      { text: "> cors policy active", color: "green" },
    ],
  },
  {
    lines: [
      { text: "$ onyx build --optimize", color: "white" },
      { text: "> tree-shaking modules...", color: "gray" },
      { text: "> warn: unused import 'legacy'", color: "red" },
      { text: "> assets optimized (1.2mb → 340kb)", color: "green" },
      { text: "> build complete in 2.4s", color: "green" },
    ],
  },
  {
    lines: [
      { text: "$ onyx monitor --status", color: "white" },
      { text: "> uptime 99.98%", color: "green" },
      { text: "> latency 12ms avg", color: "green" },
      { text: "> err: timeout on /api/legacy", color: "red" },
      { text: "> cache hit ratio 94.2%", color: "green" },
    ],
  },
  {
    lines: [
      { text: "const config = {", color: "purple" },
      { text: "  theme: 'dark',", color: "gray" },
      { text: "  engine: 'turbo',", color: "gray" },
      { text: "  analytics: true,", color: "gray" },
      { text: "};", color: "purple" },
    ],
  },
  {
    lines: [
      { text: "$ onyx test --coverage", color: "white" },
      { text: "> running 247 tests...", color: "gray" },
      { text: "> all tests passing ✓", color: "green" },
      { text: "> coverage 96.1%", color: "green" },
    ],
  },
  {
    lines: [
      { text: "$ onyx analytics --live", color: "white" },
      { text: "> 2.4k sessions today", color: "gray" },
      { text: "> conversion rate 3.8%", color: "green" },
      { text: "> bounce rate 22%", color: "gray" },
      { text: "> chatbot active", color: "green" },
    ],
  },
  {
    lines: [
      { text: "async function deploy() {", color: "purple" },
      { text: "  await build({ minify: true });", color: "gray" },
      { text: "  await push('production');", color: "gray" },
      { text: "  return { status: 'live' };", color: "green" },
      { text: "}", color: "purple" },
    ],
  },
  {
    lines: [
      { text: "$ onyx integrate --payments", color: "white" },
      { text: "> stripe connected", color: "green" },
      { text: "> webhooks configured", color: "green" },
      { text: "> warn: test mode enabled", color: "red" },
    ],
  },
];

// Zones that avoid the center content area (roughly 25-75% x, 30-70% y)
const PLACEMENT_ZONES = [
  // Upper left
  { xMin: 0.02, xMax: 0.30, yMin: 0.04, yMax: 0.30 },
  // Left side
  { xMin: 0.02, xMax: 0.22, yMin: 0.30, yMax: 0.65 },
  // Lower left
  { xMin: 0.02, xMax: 0.28, yMin: 0.65, yMax: 0.88 },
  // Upper right
  { xMin: 0.65, xMax: 0.92, yMin: 0.04, yMax: 0.28 },
  // Right side
  { xMin: 0.72, xMax: 0.94, yMin: 0.28, yMax: 0.60 },
  // Lower right
  { xMin: 0.68, xMax: 0.92, yMin: 0.65, yMax: 0.88 },
  // Top center-left
  { xMin: 0.28, xMax: 0.45, yMin: 0.02, yMax: 0.18 },
  // Top center-right
  { xMin: 0.55, xMax: 0.72, yMin: 0.02, yMax: 0.18 },
  // Bottom center
  { xMin: 0.30, xMax: 0.70, yMin: 0.82, yMax: 0.96 },
  // Far left edge
  { xMin: 0.01, xMax: 0.15, yMin: 0.15, yMax: 0.85 },
];

const COLOR_MAP: Record<LineColor, (a: number) => string> = {
  white: (a) => `rgba(210, 210, 220, ${a})`,
  green: (a) => `rgba(120, 180, 120, ${a})`,
  red: (a) => `rgba(190, 110, 100, ${a})`,
  purple: (a) => `rgba(160, 130, 190, ${a})`,
  gray: (a) => `rgba(140, 140, 155, ${a})`,
};

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    // Sparkles
    const sparkles: Sparkle[] = Array.from({ length: SPARKLE_COUNT }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      baseSize: Math.random() * 14 + 8,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.0006 + 0.0003,
      baseOpacity: Math.random() * 0.25 + 0.08,
      bloomRadius: Math.random() * 5 + 2,
    }));

    // Create terminal fragments with organic placement
    const createFragments = (): TermFragment[] => {
      const cw = w();
      const ch = h();
      const shuffled = [...FRAGMENTS].sort(() => Math.random() - 0.5);
      const count = Math.min(shuffled.length, PLACEMENT_ZONES.length);

      return shuffled.slice(0, count).map((frag, i) => {
        const zone = PLACEMENT_ZONES[i % PLACEMENT_ZONES.length];
        return {
          lines: frag.lines,
          x: cw * (zone.xMin + Math.random() * (zone.xMax - zone.xMin)),
          y: ch * (zone.yMin + Math.random() * (zone.yMax - zone.yMin)),
          delay: i * 1800 + Math.random() * 2000,
          speed: 0.022 + Math.random() * 0.01,
          charIndex: 0,
          currentLine: 0,
          blinkPhase: Math.random() * Math.PI * 2,
          opacity: 0,
        };
      });
    };

    let fragments = createFragments();
    let startTime = 0;

    const draw = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const dt = time - timeRef.current;
      timeRef.current = time;
      const cw = w();
      const ch = h();
      const t = time * 0.0001;

      ctx.clearRect(0, 0, cw, ch);

      // --- Slow-moving gradient glow orbs ---
      const g1x = cw * (0.3 + Math.sin(t * 0.7) * 0.15);
      const g1y = ch * (0.35 + Math.cos(t * 0.5) * 0.1);
      const grad1 = ctx.createRadialGradient(g1x, g1y, 0, g1x, g1y, cw * 0.35);
      grad1.addColorStop(0, "rgba(255,255,255,0.015)");
      grad1.addColorStop(1, "transparent");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, cw, ch);

      const g2x = cw * (0.7 + Math.cos(t * 0.6) * 0.12);
      const g2y = ch * (0.6 + Math.sin(t * 0.8) * 0.12);
      const grad2 = ctx.createRadialGradient(g2x, g2y, 0, g2x, g2y, cw * 0.3);
      grad2.addColorStop(0, "rgba(255,255,255,0.01)");
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, cw, ch);

      // --- Silver light sweep ---
      const sweepX = ((time * 0.015) % (cw + 600)) - 300;
      const sweepGrad = ctx.createLinearGradient(sweepX - 200, 0, sweepX + 200, 0);
      sweepGrad.addColorStop(0, "transparent");
      sweepGrad.addColorStop(0.5, "rgba(255,255,255,0.012)");
      sweepGrad.addColorStop(1, "transparent");
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(0, 0, cw, ch);

      // --- Terminal fragments layer ---
      ctx.save();
      ctx.font = "10.5px 'SF Mono', 'Fira Code', 'Consolas', monospace";
      ctx.textBaseline = "top";

      const cycleDuration = FRAGMENTS.length * 2000 + 14000;
      const cycleElapsed = elapsed % cycleDuration;

      if (cycleElapsed < dt + 20) {
        fragments = createFragments();
      }

      const lineHeight = 15;

      fragments.forEach((frag) => {
        if (cycleElapsed < frag.delay) return;

        const fragElapsed = cycleElapsed - frag.delay;

        // Total chars across all lines in this fragment
        const totalChars = frag.lines.reduce((sum, l) => sum + l.text.length, 0);
        const typedChars = Math.min(
          Math.floor(fragElapsed * frag.speed),
          totalChars
        );

        // Fade
        const fadeIn = Math.min(fragElapsed / 1000, 1);
        const fadeOutStart = 10000;
        const fadeOut = fragElapsed > fadeOutStart
          ? Math.max(1 - (fragElapsed - fadeOutStart) / 5000, 0)
          : 1;
        const baseAlpha = 0.13 * fadeIn * fadeOut;

        if (baseAlpha < 0.003) return;

        // Draw each line
        let charsUsed = 0;
        frag.lines.forEach((line, li) => {
          const lineCharsAvailable = Math.max(0, typedChars - charsUsed);
          const displayText = line.text.substring(0, Math.min(lineCharsAvailable, line.text.length));
          charsUsed += line.text.length;

          if (displayText.length === 0) return;

          const colorFn = COLOR_MAP[line.color];
          ctx.fillStyle = colorFn(baseAlpha * (line.color === "white" ? 1.3 : 1));
          ctx.fillText(displayText, frag.x, frag.y + li * lineHeight);
        });

        // Blinking cursor on current typing line
        let cursorCharsUsed = 0;
        for (let li = 0; li < frag.lines.length; li++) {
          const lineLen = frag.lines[li].text.length;
          if (typedChars < cursorCharsUsed + lineLen) {
            // Cursor is on this line
            const charsOnLine = typedChars - cursorCharsUsed;
            const partialText = frag.lines[li].text.substring(0, charsOnLine);
            if (Math.sin(time * 0.004 + frag.blinkPhase) > 0) {
              const cursorX = frag.x + ctx.measureText(partialText).width + 2;
              const cursorY = frag.y + li * lineHeight;
              ctx.fillStyle = `rgba(255,255,255,${baseAlpha * 1.4})`;
              ctx.fillRect(cursorX, cursorY, 5, 11);
            }
            break;
          }
          cursorCharsUsed += lineLen;
        }
      });
      ctx.restore();

      // --- Subtle grid ---
      ctx.strokeStyle = `rgba(255,255,255,${0.015 + Math.sin(t * 2) * 0.004})`;
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      const gridOffset = (time * 0.003) % gridSize;

      ctx.beginPath();
      for (let x = -gridOffset; x < cw; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ch);
      }
      for (let y = -gridOffset; y < ch; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(cw, y);
      }
      ctx.stroke();

      // --- Luxury sparkle flares ---
      sparkles.forEach((s) => {
        const shimmer = Math.sin(time * s.speed + s.phase);
        const tf = (shimmer + 1) / 2;
        const eased = tf * tf * tf;
        const opacity = s.baseOpacity * (0.05 + eased * 0.95);
        const size = s.baseSize * (0.7 + eased * 0.3);
        const bloom = s.bloomRadius * (0.5 + eased * 0.5);

        if (opacity > 0.01) {
          const bg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, bloom);
          bg.addColorStop(0, `rgba(255,255,255,${opacity * 0.6})`);
          bg.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = bg;
          ctx.beginPath();
          ctx.arc(s.x, s.y, bloom, 0, Math.PI * 2);
          ctx.fill();

          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.lineWidth = 0.4;

          const g1 = ctx.createLinearGradient(s.x - size, s.y, s.x + size, s.y);
          g1.addColorStop(0, "rgba(255,255,255,0)");
          g1.addColorStop(0.35, `rgba(255,255,255,${opacity * 0.3})`);
          g1.addColorStop(0.5, `rgba(255,255,255,${opacity})`);
          g1.addColorStop(0.65, `rgba(255,255,255,${opacity * 0.3})`);
          g1.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = g1;
          ctx.beginPath();
          ctx.moveTo(s.x - size, s.y);
          ctx.lineTo(s.x + size, s.y);
          ctx.stroke();

          const g2 = ctx.createLinearGradient(s.x, s.y - size, s.x, s.y + size);
          g2.addColorStop(0, "rgba(255,255,255,0)");
          g2.addColorStop(0.35, `rgba(255,255,255,${opacity * 0.3})`);
          g2.addColorStop(0.5, `rgba(255,255,255,${opacity})`);
          g2.addColorStop(0.65, `rgba(255,255,255,${opacity * 0.3})`);
          g2.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = g2;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y - size);
          ctx.lineTo(s.x, s.y + size);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(s.x, s.y, 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${opacity * 0.9})`;
          ctx.fill();
          ctx.restore();
        }
      });

      // --- Subtle geometric accents ---
      ctx.save();
      ctx.strokeStyle = `rgba(255,255,255,${0.012 + Math.sin(t * 1.5) * 0.004})`;
      ctx.lineWidth = 0.5;

      const hexX = cw * 0.82;
      const hexY = ch * 0.22;
      const hexR = 50;
      const hexRot = t * 0.25;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + hexRot;
        const hx = hexX + Math.cos(angle) * hexR;
        const hy = hexY + Math.sin(angle) * hexR;
        i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();

      const diaX = cw * 0.12;
      const diaY = ch * 0.75;
      const diaR = 35;
      const diaRot = -t * 0.18;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (Math.PI / 2) * i + diaRot;
        const dx = diaX + Math.cos(angle) * diaR;
        const dy = diaY + Math.sin(angle) * diaR;
        i === 0 ? ctx.moveTo(dx, dy) : ctx.lineTo(dx, dy);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default HeroBackground;
