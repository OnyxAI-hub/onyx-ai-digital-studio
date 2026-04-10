import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  phase: number;
  speed: number;
}

interface StarGlimmersProps {
  count?: number;
  className?: string;
}

const StarGlimmers = ({ count = 15, className = "" }: StarGlimmersProps) => {
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
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const stars: Star[] = Array.from({ length: count }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      size: Math.random() * 1.1 + 0.3,
      baseOpacity: Math.random() * 0.2 + 0.06,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.0008 + 0.0004,
    }));

    const draw = (time: number) => {
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);

      stars.forEach((star) => {
        const shimmer = Math.sin(time * star.speed + star.phase);
        const alpha = star.baseOpacity * (0.3 + shimmer * 0.7);
        if (alpha > 0.01) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220,220,230,${alpha})`;
          ctx.fill();

          if (alpha > star.baseOpacity * 0.75) {
            const flareLen = star.size * 2.5;
            const flareAlpha = (alpha - star.baseOpacity * 0.5) * 0.4;
            ctx.strokeStyle = `rgba(255,255,255,${flareAlpha})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(star.x - flareLen, star.y);
            ctx.lineTo(star.x + flareLen, star.y);
            ctx.moveTo(star.x, star.y - flareLen);
            ctx.lineTo(star.x, star.y + flareLen);
            ctx.stroke();
          }
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
