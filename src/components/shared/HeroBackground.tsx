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

interface TermLine {
  text: string;
  x: number;
  y: number;
  opacity: number;
  delay: number;
  speed: number;
  charIndex: number;
  blinkPhase: number;
  done: boolean;
}

const SPARKLE_COUNT = 6;

const TERMINAL_LINES_LEFT = [
  "$ onyx init --project client-portal",
  "> compiling components...",
  "> authentication enabled",
  "> route /dashboard mapped",
  "> ui compiled successfully",
  "$ onyx deploy --prod",
  "> deploying to edge network...",
  "> system ready ✓",
  "> chatbot active",
  "> payment integration configured",
  "$ onyx build --optimize",
  "> initializing build pipeline...",
  "> assets optimized",
  "> ssl certificates verified",
  "$ onyx monitor --status",
  "> uptime 99.98%",
  "> latency 12ms avg",
  "> cache hit ratio 94.2%",
  "> memory usage nominal",
];

const TERMINAL_LINES_RIGHT = [
  "$ onyx scan --security",
  "> no vulnerabilities found",
  "> headers configured",
  "> cors policy active",
  "$ onyx analytics --live",
  "> tracking enabled",
  "> 2.4k sessions today",
  "> conversion rate 3.8%",
  "> bounce rate 22%",
  "$ onyx test --coverage",
  "> all tests passing",
  "> coverage 96.1%",
];

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

    // Terminal lines — spread across hero with left-heavy distribution
    const createTermLines = (): TermLine[] => {
      const lines: TermLine[] = [];
      const cw = w();
      const ch = h();
      const lineHeight = 17;

      // Left column — main presence, spans most of the height
      TERMINAL_LINES_LEFT.forEach((text, i) => {
        lines.push({
          text,
          x: cw * 0.04 + (i % 3) * 8, // slight indent variation
          y: ch * 0.08 + i * lineHeight,
          opacity: 0,
          delay: i * 2200 + Math.random() * 800,
          speed: 0.028 + Math.random() * 0.012,
          charIndex: 0,
          blinkPhase: Math.random() * Math.PI * 2,
          done: false,
        });
      });

      // Right column — lighter presence, upper area
      TERMINAL_LINES_RIGHT.forEach((text, i) => {
        lines.push({
          text,
          x: cw * 0.62 + (i % 2) * 6,
          y: ch * 0.1 + i * lineHeight,
          opacity: 0,
          delay: i * 2600 + 3000 + Math.random() * 1200,
          speed: 0.025 + Math.random() * 0.01,
          charIndex: 0,
          blinkPhase: Math.random() * Math.PI * 2,
          done: false,
        });
      });

      return lines;
    };

    let termLines = createTermLines();
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

      // --- Terminal text layer ---
      ctx.save();
      ctx.font = "10.5px 'SF Mono', 'Fira Code', 'Consolas', monospace";
      ctx.textBaseline = "top";

      const totalLines = TERMINAL_LINES_LEFT.length + TERMINAL_LINES_RIGHT.length;
      const cycleDuration = totalLines * 2400 + 10000;
      const cycleElapsed = elapsed % cycleDuration;

      // Reset lines on new cycle
      if (cycleElapsed < dt + 20) {
        termLines = createTermLines();
      }

      termLines.forEach((line) => {
        if (cycleElapsed < line.delay) return;

        const lineElapsed = cycleElapsed - line.delay;

        // Type out characters
        if (!line.done) {
          line.charIndex = Math.min(
            Math.floor(lineElapsed * line.speed),
            line.text.length
          );
          if (line.charIndex >= line.text.length) line.done = true;
        }

        // Fade in then slow fade out
        const fadeIn = Math.min(lineElapsed / 600, 1);
        const fadeOutStart = 6000;
        const fadeOut = lineElapsed > fadeOutStart
          ? Math.max(1 - (lineElapsed - fadeOutStart) / 3000, 0)
          : 1;
        const alpha = 0.06 * fadeIn * fadeOut;

        if (alpha < 0.002) return;

        const displayText = line.text.substring(0, line.charIndex);
        const isCmd = line.text.startsWith("$");

        // Command prompt color vs output color
        ctx.fillStyle = isCmd
          ? `rgba(200, 200, 210, ${alpha * 1.2})`
          : `rgba(160, 160, 170, ${alpha})`;

        ctx.fillText(displayText, line.x, line.y);

        // Blinking cursor at end of typing line
        if (!line.done && Math.sin(time * 0.005 + line.blinkPhase) > 0) {
          const cursorX = line.x + ctx.measureText(displayText).width + 2;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 1.5})`;
          ctx.fillRect(cursorX, line.y, 6, 12);
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
