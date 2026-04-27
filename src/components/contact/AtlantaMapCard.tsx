import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MapPin } from "lucide-react";
import * as THREE from "three";

/**
 * 3D black & white map, ONYX aesthetic.
 * - Dark matte ground plane with subtle grid
 * - Procedurally-placed "city blocks" (extruded boxes) varying in height
 * - Highways as glowing white ribbons
 * - A glowing pin at Atlanta's center
 * - Drag to orbit, scroll to zoom
 */

type Block = {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
};

// Deterministic pseudo-random so the layout is stable across renders
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function CityBlocks() {
  const rand = useMemo(() => mulberry32(42), []);
  const blocks: Block[] = useMemo(() => {
    const out: Block[] = [];
    const range = 9;
    for (let i = 0; i < 180; i++) {
      const x = (rand() - 0.5) * range * 2;
      const z = (rand() - 0.5) * range * 2;
      // Skip blocks too close to highways or center pin
      const distFromCenter = Math.sqrt(x * x + z * z);
      if (Math.abs(x) < 0.35 || Math.abs(z) < 0.35) continue; // highway corridors
      if (distFromCenter < 0.9) continue; // pin clearance
      const w = 0.25 + rand() * 0.45;
      const d = 0.25 + rand() * 0.45;
      // Height drops with distance from center (downtown taller)
      const falloff = Math.max(0, 1 - distFromCenter / range);
      const h = 0.08 + Math.pow(rand(), 2) * 1.4 * falloff + 0.05;
      out.push({ x, z, w, d, h });
    }
    return out;
  }, [rand]);

  return (
    <group>
      {blocks.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]} castShadow receiveShadow>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial
            color={"#0d0d0d"}
            roughness={0.55}
            metalness={0.25}
            emissive={"#1a1a1a"}
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

function Highways() {
  // Two crossing highway ribbons + a perimeter loop
  return (
    <group position={[0, 0.012, 0]}>
      {/* North-south */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.18, 22]} />
        <meshBasicMaterial color={"#ffffff"} transparent opacity={0.45} />
      </mesh>
      {/* East-west */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 0.16]} />
        <meshBasicMaterial color={"#ffffff"} transparent opacity={0.4} />
      </mesh>
      {/* Diagonal Peachtree */}
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
        <planeGeometry args={[0.1, 22]} />
        <meshBasicMaterial color={"#ffffff"} transparent opacity={0.18} />
      </mesh>
      {/* Perimeter loop (I-285) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[6.6, 6.75, 96]} />
        <meshBasicMaterial color={"#ffffff"} transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function Pin() {
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      const s = 1 + Math.sin(t * 1.4) * 0.25;
      ringRef.current.scale.set(s, s, s);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 - Math.sin(t * 1.4) * 0.2;
    }
    if (glowRef.current) {
      glowRef.current.rotation.z = t * 0.4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Pulsing ground ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.45, 0.55, 64]} />
        <meshBasicMaterial color={"#ffffff"} transparent opacity={0.4} />
      </mesh>
      {/* Static base ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 0]}>
        <ringGeometry args={[0.32, 0.36, 64]} />
        <meshBasicMaterial color={"#ffffff"} transparent opacity={0.7} />
      </mesh>
      {/* Vertical pin shaft */}
      <mesh position={[0, 0.55, 0]} ref={glowRef}>
        <cylinderGeometry args={[0.04, 0.04, 1.1, 16]} />
        <meshStandardMaterial
          color={"#ffffff"}
          emissive={"#ffffff"}
          emissiveIntensity={1.2}
        />
      </mesh>
      {/* Pin head */}
      <mesh position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial
          color={"#ffffff"}
          emissive={"#ffffff"}
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

function GroundGrid() {
  return (
    <group>
      {/* Base ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={"#050505"} roughness={1} metalness={0} />
      </mesh>
      {/* Subtle grid overlay */}
      <gridHelper
        args={[40, 40, "#ffffff", "#ffffff"]}
        position={[0, 0.005, 0]}
      >
        <meshBasicMaterial attach="material" transparent opacity={0.07} />
      </gridHelper>
      {/* Larger major grid */}
      <gridHelper
        args={[40, 8, "#ffffff", "#ffffff"]}
        position={[0, 0.006, 0]}
      >
        <meshBasicMaterial attach="material" transparent opacity={0.12} />
      </gridHelper>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[6, 8, 4]}
        intensity={0.9}
        color={"#ffffff"}
        castShadow
      />
      <directionalLight position={[-5, 4, -3]} intensity={0.25} color={"#ffffff"} />
      {/* Soft top fill from the pin */}
      <pointLight position={[0, 2.5, 0]} intensity={0.6} color={"#ffffff"} distance={6} decay={2} />

      <GroundGrid />
      <Highways />
      <CityBlocks />
      <Pin />

      {/* Fog for depth */}
      <fog attach="fog" args={["#000000", 8, 22]} />
    </>
  );
}

const AtlantaMapCard = () => {
  return (
    <div className="glass-card overflow-hidden relative">
      {/* 3D canvas */}
      <div className="relative h-72 bg-[hsl(0,0%,2%)]">
        <Suspense fallback={<div className="absolute inset-0 grid place-items-center text-xs text-muted-foreground">Loading map…</div>}>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [6, 6, 8], fov: 38 }}
            gl={{ antialias: true, alpha: false }}
          >
            <color attach="background" args={["#020202"]} />
            <Scene />
            <OrbitControls
              enablePan={false}
              enableDamping
              dampingFactor={0.08}
              minDistance={5}
              maxDistance={14}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.4}
              autoRotate
              autoRotateSpeed={0.4}
            />
          </Canvas>
        </Suspense>

        {/* Top vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,hsl(0,0%,0%)_100%)]" />

        {/* Hint label */}
        <div className="absolute left-3 bottom-3 rounded-md border border-border/30 bg-background/60 backdrop-blur-md px-2 py-1">
          <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Drag · Scroll to zoom
          </span>
        </div>

        {/* Coordinates label */}
        <div className="absolute right-3 top-3 rounded-md border border-border/30 bg-background/60 backdrop-blur-md px-2 py-1 font-mono">
          <div className="text-[9px] text-foreground/60 leading-tight">33.7490° N</div>
          <div className="text-[9px] text-foreground/60 leading-tight">84.3880° W</div>
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
