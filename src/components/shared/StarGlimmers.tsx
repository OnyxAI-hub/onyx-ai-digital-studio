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

interface StarGlimmersProps {
  count?: number;
  className?: string;
}

const StarGlimmers = ({ count = 10, className = "" }: StarGlimmersProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

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

    const sparkles: Sparkle[] = Array.from({ length: count }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      baseSize: Math.random() * 12 + 6,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.0006 + 0.0003,
      baseOpacity: Math.random() * 0.35 + 0.1,
      bloomRadius: Math.random() * 4 + 2,
    }));

    const drawSparkle = (
      x: number,
      y: number,
      size: number,
      opacity: number,
      bloomR: number
    ) => {
      // Soft bloom center
      const bloom = ctx.createRadialGradient(x, y, 0, x, y, bloomR);
      bloom.addColorStop(0, `rgba(255,255,255,${opacity * 0.6})`);
      bloom.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = bloom;
      ctx.beginPath();
      ctx.arc(x, y, bloomR, 0, Math.PI * 2);
      ctx.fill();

      // 4-point cross flare — very thin tapered lines
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = "rgba(255,255,255,1)";
      ctx.lineWidth = 0.4;

      // Horizontal flare
      const grad1 = ctx.createLinearGradient(x - size, y, x + size, y);
      grad1.addColorStop(0, "rgba(255,255,255,0)");
      grad1.addColorStop(0.35, `rgba(255,255,255,${opacity * 0.3})`);
      grad1.addColorStop(0.5, `rgba(255,255,255,${opacity})`);
      grad1.addColorStop(0.65, `rgba(255,255,255,${opacity * 0.3})`);
      grad1.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = grad1;
      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x + size, y);
      ctx.stroke();

      // Vertical flare
      const grad2 = ctx.createLinearGradient(x, y - size, x, y + size);
      grad2.addColorStop(0, "rgba(255,255,255,0)");
      grad2.addColorStop(0.35, `rgba(255,255,255,${opacity * 0.3})`);
      grad2.addColorStop(0.5, `rgba(255,255,255,${opacity})`);
      grad2.addColorStop(0.65, `rgba(255,255,255,${opacity * 0.3})`);
      grad2.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = grad2;
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y + size);
      ctx.stroke();

      // Bright center dot
      ctx.beginPath();
      ctx.arc(x, y, 0.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${opacity * 0.9})`;
      ctx.fill();

      ctx.restore();
    };

    const draw = (time: number) => {
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);

      sparkles.forEach((s) => {
        const shimmer = Math.sin(time * s.speed + s.phase);
        // Ease the shimmer so sparkles spend more time dim, with sharp bright peaks
        const t = (shimmer + 1) / 2; // 0..1
        const eased = t * t * t; // cubic ease — mostly dim, sharp peaks
        const opacity = s.baseOpacity * (0.05 + eased * 0.95);
        const size = s.baseSize * (0.7 + eased * 0.3);
        const bloom = s.bloomRadius * (0.5 + eased * 0.5);

        if (opacity > 0.01) {
          drawSparkle(s.x, s.y, size, opacity, bloom);
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default StarGlimmers;
