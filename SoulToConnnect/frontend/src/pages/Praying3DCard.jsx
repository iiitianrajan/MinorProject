/**
 * Praying3DCard — Production-Ready Component
 * 
 * Stack: @react-three/fiber · @react-three/drei · framer-motion · Tailwind
 * 
 * Key improvements over original:
 *  - Auto-center + auto-scale via Box3 bounding box
 *  - Mouse-parallax rotation (useRef, no re-renders)
 *  - Environment preset for HDRI-quality reflections
 *  - ContactShadows, Float, Sparkles (drei)
 *  - ErrorBoundary wrapping Canvas
 *  - Custom LoadingFallback with animated ring
 *  - Performance: frameloop="demand" + invalidate on mouse move
 *  - Memoized Model component, stable refs
 *  - Fully responsive (aspect-ratio container)
 *  - Accessible aria-labels
 *  - CSS-only ambient particles (zero JS cost)
 *  - Clean hook separation: useMouseParallax
 */

import React, {
  Suspense,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useState,
  Component,
} from "react";
import { Canvas, useFrame, useThree, invalidate } from "@react-three/fiber";
import {
  OrbitControls,
  useFBX,
  Environment,
  ContactShadows,
  Float,
  Sparkles,
  useProgress,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { PlayCircle, Star, Zap, RotateCcw } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const CAMERA_POSITION = [0, 1.6, 4.2];
const CAMERA_FOV = 42;

// ─────────────────────────────────────────────────────────────────────────────
// HOOK: useMouseParallax
// Returns normalised [-1, 1] mouse coords relative to a container ref.
// Uses refs internally → zero re-renders on mouse move.
// ─────────────────────────────────────────────────────────────────────────────

function useMouseParallax(containerRef) {
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      mouseX.current = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouseY.current = ((e.clientY - r.top) / r.height - 0.5) * 2;
      // Tell R3F to render a new frame (frameloop="demand" mode)
      invalidate();
    };

    const onLeave = () => {
      mouseX.current = 0;
      mouseY.current = 0;
      invalidate();
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef]);

  return { mouseX, mouseY };
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: LoadingFallback — shown via <Html> inside Canvas during Suspense
// ─────────────────────────────────────────────────────────────────────────────

function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 select-none">
        {/* Animated ring */}
        <div
          className="w-14 h-14 rounded-full border-2 border-purple-500/20"
          style={{
            borderTopColor: "#a855f7",
            animation: "spin 0.9s linear infinite",
          }}
        />
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "#c084fc" }}
        >
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: Model — FBX loader with auto-center, auto-scale, mouse rotation
// ─────────────────────────────────────────────────────────────────────────────

const Model = React.memo(function Model({ mouseX, mouseY }) {
  const groupRef = useRef();
  const fbx = useFBX("/models/Praying.fbx");

  // Auto-center + auto-scale once on mount
  const normalizedFbx = useMemo(() => {
    const box = new THREE.Box3().setFromObject(fbx);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    // Re-center geometry to origin
    fbx.position.sub(center);

    // Scale so the tallest dimension fits in 2 units
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) fbx.scale.setScalar(2 / maxDim);

    return fbx;
  }, [fbx]);

  // Smooth mouse-driven rotation + idle bob — all in one useFrame
  useFrame((state) => {
    if (!groupRef.current) return;

    const targetRotY = mouseX.current * 0.5;
    const targetRotX = -mouseY.current * 0.18;

    // Exponential smoothing (damping)
    groupRef.current.rotation.y +=
      (targetRotY - groupRef.current.rotation.y) * 0.06;
    groupRef.current.rotation.x +=
      (targetRotX - groupRef.current.rotation.x) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <primitive object={normalizedFbx} />
    </group>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: Scene — all R3F scene content (lights, environment, model)
// ─────────────────────────────────────────────────────────────────────────────

function Scene({ mouseX, mouseY }) {
  return (
    <>
      {/* ── Lights ─────────────────────────────────────────────────────────── */}
      <ambientLight intensity={0.2} />
      {/* Key light */}
      <directionalLight
        position={[3, 5, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#ffffff"
      />
      {/* Fill light — cool blue */}
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#818cf8" />
      {/* Rim / backlight — warm gold */}
      <pointLight position={[0, 4, -3]} intensity={0.8} color="#fbbf24" distance={8} />
      {/* Under-fill — purple bounce */}
      <pointLight position={[0, -2, 2]} intensity={0.3} color="#a855f7" distance={5} />

      {/* ── HDRI Environment (reflections + IBL) ───────────────────────────── */}
      <Environment preset="city" />

      {/* ── Atmospheric sparkles ───────────────────────────────────────────── */}
      <Sparkles
        count={55}
        scale={[4, 5, 4]}
        size={1.6}
        speed={0.3}
        opacity={0.5}
        color="#c084fc"
      />

      {/* ── Float wrapper for idle bob ─────────────────────────────────────── */}
      <Float speed={1.2} floatIntensity={0.3} rotationIntensity={0}>
        <Suspense fallback={<CanvasLoader />}>
          <Model mouseX={mouseX} mouseY={mouseY} />
        </Suspense>
      </Float>

      {/* ── Ground contact shadow ─────────────────────────────────────────── */}
      <ContactShadows
        position={[0, -1.3, 0]}
        opacity={0.55}
        scale={5}
        blur={3}
        far={4}
        color="#6d28d9"
      />

      {/* ── Orbit Controls — smooth, damped, no zoom hijack ───────────────── */}
      <OrbitControls
        enableZoom
        enablePan={false}
        enableRotate
        enableDamping
        dampingFactor={0.08}
        minDistance={2.5}
        maxDistance={7}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.6}
        autoRotate
        autoRotateSpeed={0.6}
        makeDefault
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: ErrorBoundary — catches WebGL / model errors gracefully
// ─────────────────────────────────────────────────────────────────────────────

class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60 backdrop-blur-sm z-10">
          <RotateCcw size={32} className="text-purple-400 animate-spin" />
          <p className="text-sm text-purple-300 font-medium tracking-wide">
            Failed to load 3D model
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 text-xs font-semibold rounded-full bg-purple-600 text-white hover:bg-purple-500 transition"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS injected once — keyframes for particles, rings, scan line
// ─────────────────────────────────────────────────────────────────────────────

const INJECTED_STYLES = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes orbitRing {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(360deg); }
  }
  @keyframes orbitRingRev {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(-360deg); }
  }
  @keyframes pulseCore {
    0%,100% { opacity:0.4; transform:translate(-50%,-50%) scale(1); }
    50%      { opacity:0.8; transform:translate(-50%,-50%) scale(1.2); }
  }
  @keyframes floatDot {
    0%,100% { transform:translateY(0); opacity:0.5; }
    50%      { transform:translateY(-16px); opacity:1; }
  }
  @keyframes scanline {
    0%   { top:0%;   opacity:0; }
    5%   { opacity:0.6; }
    95%  { opacity:0.6; }
    100% { top:100%; opacity:0; }
  }
  .model-canvas-cursor { cursor: grab; }
  .model-canvas-cursor:active { cursor: grabbing; }
`;

// Pre-computed stable particle data (outside component → never regenerates)
const DOTS = Array.from({ length: 16 }, (_, i) => ({
  w: 2 + (i % 4),
  hue: 255 + i * 7,
  top: 5 + ((i * 59) % 90),
  left: 3 + ((i * 41) % 94),
  dur: 3.2 + (i % 6) * 0.55,
  del: i * 0.22,
}));

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT: Praying3DCard
// ─────────────────────────────────────────────────────────────────────────────

export default function Praying3DCard() {
  const containerRef = useRef(null);
  const { mouseX, mouseY } = useMouseParallax(containerRef);

  // Inject global keyframes once
  useEffect(() => {
    if (document.getElementById("p3d-styles")) return;
    const tag = document.createElement("style");
    tag.id = "p3d-styles";
    tag.textContent = INJECTED_STYLES;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  return (
    <div
      className="relative w-full rounded-[2.5rem] overflow-hidden flex items-center justify-center
                 bg-gradient-to-br from-white/30 via-white/10 to-transparent
                 backdrop-blur-2xl border border-white/20
                 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
      style={{ minHeight: "clamp(420px, 60vw, 680px)" }}
      role="region"
      aria-label="Interactive 3D praying figure"
    >
      {/* ── Deep space background ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #1a0533 0%, #09001a 55%, #000008 100%)",
        }}
      />

      {/* ── Ambient core glow ─────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 320, height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 70%)",
          animation: "pulseCore 4s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* ── Orbital rings (CSS-only, zero perf cost) ──────────────────────── */}
      {[160, 260, 380, 500].map((size, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: size, height: size,
            borderRadius: "50%",
            border: `1px ${i % 2 ? "dashed" : "solid"} rgba(192,132,252,${0.2 - i * 0.04})`,
            animation: `${i % 2 ? "orbitRingRev" : "orbitRing"} ${12 + i * 5}s linear infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── Floating ambient dots ─────────────────────────────────────────── */}
      {DOTS.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: d.w, height: d.w,
            borderRadius: "50%",
            background: `hsl(${d.hue},80%,70%)`,
            boxShadow: `0 0 8px hsl(${d.hue},80%,70%)`,
            top: `${d.top}%`, left: `${d.left}%`,
            animation: `floatDot ${d.dur}s ease-in-out infinite`,
            animationDelay: `${d.del}s`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── HUD scan line ─────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute", left: 0, right: 0, height: 1.5,
          background:
            "linear-gradient(90deg,transparent,rgba(192,132,252,0.6),transparent)",
          animation: "scanline 6s linear infinite",
          pointerEvents: "none", zIndex: 5,
        }}
      />

      {/* ── Corner bracket accents ────────────────────────────────────────── */}
      {[
        "top-4 left-4 border-t-2 border-l-2 rounded-tl-xl",
        "top-4 right-4 border-t-2 border-r-2 rounded-tr-xl",
        "bottom-4 left-4 border-b-2 border-l-2 rounded-bl-xl",
        "bottom-4 right-4 border-b-2 border-r-2 rounded-br-xl",
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-7 h-7 border-purple-400/50 ${cls}`}
          style={{ pointerEvents: "none", zIndex: 10 }}
        />
      ))}

      {/* ── Ground glow ───────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(109,40,217,0.4) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Mouse hint ────────────────────────────────────────────────────── */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="text-[10px] font-semibold tracking-[0.2em] uppercase"
          style={{
            color: "rgba(192,132,252,0.7)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(192,132,252,0.15)",
            padding: "4px 14px",
            borderRadius: 99,
          }}
        >
          ✦ Drag · Scroll · Explore
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          THE CANVAS
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        ref={containerRef}
        className="model-canvas-cursor absolute inset-0 z-0"
        aria-hidden="true"
      >
        <ModelErrorBoundary>
          <Canvas
            /**
             * frameloop="demand" → renders only when invalidate() is called
             * or OrbitControls triggers a frame. Saves ~60fps of idle GPU work.
             */
            frameloop="demand"
            camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}
            shadows
            dpr={[1, 2]}           // Caps pixel ratio at 2 (performance)
            style={{ width: "100%", height: "100%" }}
            gl={{
              antialias: true,
              alpha: true,          // Transparent canvas bg (our CSS bg shows)
              powerPreference: "high-performance",
            }}
            onCreated={({ gl }) => {
              // Tone-mapping for more realistic look
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.1;
            }}
          >
            <Scene mouseX={mouseX} mouseY={mouseY} />
          </Canvas>
        </ModelErrorBoundary>
      </div>

      {/* ── CTA pill (z above canvas) ─────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <button
          className="flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-white text-sm
                     transition-transform hover:scale-105 active:scale-95 focus-visible:ring-2
                     focus-visible:ring-purple-400 focus-visible:outline-none"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #db2777)",
            boxShadow: "0 8px 40px rgba(124,58,237,0.5)",
          }}
          aria-label="3D Avatar — coming soon"
        >
          <PlayCircle size={22} className="animate-pulse" />
          3D Avatar — Coming Soon
        </button>
      </motion.div>

      {/* ── Rating badge ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        className="absolute top-5 left-5 z-20 flex items-center gap-2 px-4 py-2.5 rounded-2xl
                   text-sm font-bold text-gray-800"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        }}
        aria-label="Rating: 4.9 from over 10,000 reviews"
      >
        <Star className="text-yellow-500 fill-yellow-500" size={16} />
        <span>4.9</span>
        <span className="text-gray-300">|</span>
        <span className="text-gray-500 font-medium">10k+ Reviews</span>
      </motion.div>

      {/* ── Online badge ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        className="absolute bottom-20 right-5 z-20 flex items-center gap-2 px-4 py-2.5
                   rounded-2xl text-sm font-bold text-white"
        style={{
          background: "linear-gradient(135deg, #16a34a, #059669)",
          boxShadow: "0 8px 24px rgba(22,163,74,0.4)",
        }}
        aria-label="5,243 experts currently online"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
        5,243 Experts Online
      </motion.div>

      {/* ── Live badge ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 150 }}
        className="absolute top-1/3 -right-1 z-20 px-4 py-3 rounded-l-2xl rounded-r-sm
                   text-white text-xs font-bold"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #db2777)",
          boxShadow: "-6px 0 24px rgba(124,58,237,0.5)",
        }}
        aria-label="Top rated experts available now"
      >
        <div className="flex items-center gap-1 mb-1">
          <Zap size={13} className="text-yellow-300" />
          <span className="tracking-wide">Live Now</span>
        </div>
        <div className="text-white/80 text-[10px] leading-tight">
          Top Rated<br />Available
        </div>
      </motion.div>
    </div>
  );
}