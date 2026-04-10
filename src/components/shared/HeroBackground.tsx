import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  phase: number;
  speed: number;
}

const PARTICLE_COUNT = 40;
const STAR_COUNT = 25;

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

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

    // Init particles
    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const createParticle = (): Particle => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.1 - 0.05,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.15 + 0.03,
      life: 0,
      maxLife: Math.random() * 800 + 400,
    });

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, createParticle);

    const draw = (time: number) => {
      const dt = time - timeRef.current;
      timeRef.current = time;
      const cw = w();
      const ch = h();

      ctx.clearRect(0, 0, cw, ch);

      // --- Slow-moving gradient glow orbs ---
      const t = time * 0.0001;

      // Large silver glow 1
      const g1x = cw * (0.3 + Math.sin(t * 0.7) * 0.15);
      const g1y = ch * (0.35 + Math.cos(t * 0.5) * 0.1);
      const grad1 = ctx.createRadialGradient(g1x, g1y, 0, g1x, g1y, cw * 0.35);
      grad1.addColorStop(0, "rgba(255,255,255,0.018)");
      grad1.addColorStop(1, "transparent");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, cw, ch);

      // Large silver glow 2
      const g2x = cw * (0.7 + Math.cos(t * 0.6) * 0.12);
      const g2y = ch * (0.6 + Math.sin(t * 0.8) * 0.12);
      const grad2 = ctx.createRadialGradient(g2x, g2y, 0, g2x, g2y, cw * 0.3);
      grad2.addColorStop(0, "rgba(255,255,255,0.012)");
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, cw, ch);

      // --- Silver light sweep ---
      const sweepX = ((time * 0.02) % (cw + 600)) - 300;
      const sweepGrad = ctx.createLinearGradient(sweepX - 200, 0, sweepX + 200, 0);
      sweepGrad.addColorStop(0, "transparent");
      sweepGrad.addColorStop(0.5, "rgba(255,255,255,0.015)");
      sweepGrad.addColorStop(1, "transparent");
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(0, 0, cw, ch);

      // --- Animated grid lines (subtle) ---
      ctx.strokeStyle = `rgba(255,255,255,${0.02 + Math.sin(t * 2) * 0.005})`;
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      const gridOffset = (time * 0.005) % gridSize;

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

      // --- Particles (dust/motes) ---
      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += dt * 0.06;

        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(lifeRatio * 4, 1);
        const fadeOut = lifeRatio > 0.7 ? 1 - (lifeRatio - 0.7) / 0.3 : 1;
        const alpha = p.opacity * fadeIn * fadeOut;

        if (alpha > 0.001) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,200,210,${alpha})`;
          ctx.fill();
        }

        if (p.life >= p.maxLife || p.x < -20 || p.x > cw + 20 || p.y < -20 || p.y > ch + 20) {
          particlesRef.current[i] = createParticle();
        }
      });

      // --- Chrome geometric shapes (very subtle) ---
      ctx.save();
      ctx.strokeStyle = `rgba(255,255,255,${0.015 + Math.sin(t * 1.5) * 0.005})`;
      ctx.lineWidth = 0.5;

      // Rotating hexagon
      const hexX = cw * 0.8;
      const hexY = ch * 0.25;
      const hexR = 60;
      const hexRot = t * 0.3;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + hexRot;
        const hx = hexX + Math.cos(angle) * hexR;
        const hy = hexY + Math.sin(angle) * hexR;
        i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();

      // Slow rotating diamond
      const diaX = cw * 0.15;
      const diaY = ch * 0.7;
      const diaR = 40;
      const diaRot = -t * 0.2;
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
