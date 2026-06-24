import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ── Helper: phone check by UA + width ──
const checkIsMobile = () => {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || "";
  const isIPad =
    /iPad/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (isIPad) return false;
  const isPhoneUA = /Android.*Mobile|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isPhoneSize = window.innerWidth <= 480;
  return isPhoneUA || isPhoneSize;
};

/* ═══════════════════════════════════════════════════
   MOBILE: lightweight 2-D canvas particles
═══════════════════════════════════════════════════ */
const MobileParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const DOTS = Array.from({ length: 60 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.4 + 0.4,
      vx:    (Math.random() - 0.5) * 0.35,
      vy:    (Math.random() - 0.5) * 0.35,
      hue:   180 + Math.random() * 40,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf;
    let t = 0;

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.4, 0,
        canvas.width * 0.5, canvas.height * 0.4, canvas.width * 0.6
      );
      grad.addColorStop(0,   "rgba(34,211,238,0.055)");
      grad.addColorStop(0.5, "rgba(168,85,247,0.025)");
      grad.addColorStop(1,   "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      DOTS.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;

        const alpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * 1.8 + d.phase));

        const glow = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 5);
        glow.addColorStop(0,   `hsla(${d.hue},90%,72%,${alpha})`);
        glow.addColorStop(1,   "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${d.hue},95%,80%,${alpha + 0.15})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
      <div style={{
        position: "absolute", inset: 0,
        background:
          "radial-gradient(ellipse at 50% 35%, rgba(34,211,238,.07) 0%, transparent 60%)," +
          "radial-gradient(ellipse at 15% 80%, rgba(168,85,247,.05) 0%, transparent 50%)",
      }} />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   DESKTOP: original Three.js swarm — untouched
═══════════════════════════════════════════════════ */
const ParticleSwarm = () => {
  const meshRef = useRef();
  const count = 12000;
  const speedMult = 0.1;

  const dummy         = useMemo(() => new THREE.Object3D(), []);
  const target        = useMemo(() => new THREE.Vector3(), []);
  const particleColor = useMemo(() => new THREE.Color(), []);

  const positions = useMemo(() =>
    Array.from({ length: count }, () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
      )
    ), []);

  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.18), []);
  const material = useMemo(() =>
    new THREE.MeshBasicMaterial({ color: "#ffffff", toneMapped: false }), []);

  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);

  const PARAMS = useMemo(() => ({
    scale: 85, gravity: 3.0, pulse: 2.8, spin: 3.5, gold: 0.8,
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;
    const { scale, gravity, pulse: pP, spin: sP, gold: gM } = PARAMS;

    for (let i = 0; i < count; i++) {
      const n      = i / count;
      const golden = 2.399963229728653;
      const layer  = Math.floor(n * 9.0);
      const layerN = layer / 9.0;
      const t      = time * 0.42;
      const p      = i * golden;
      const wave   = Math.sin(n * 92.0 - time * 3.6);
      const pulse  = Math.pow(0.5 + 0.5 * Math.sin(time * 1.85 - n * 24.0), 6.0);
      const burst  = 1.0 + pulse * pP * (0.6 + 0.4 * Math.sin(n * 37.0 + time));
      const corePull = 1.0 - 0.72 * Math.pow(0.5 + 0.5 * Math.sin(time * 0.65 + n * 18.0), 3.0) * gravity;
      const ring   = Math.sqrt(n);
      const orbit  = p + t * sP * (1.0 + layerN * 2.7) + wave * 0.25;
      const spiral = Math.sin(n * 34.0 + time * 1.4) * 0.22;
      const radius = scale * ring * burst * (0.42 + 0.58 * Math.max(corePull, 0.12)) + spiral * scale;
      const vWave  = Math.sin(n * 48.0 + time * 2.1) * Math.cos(time * 0.7 + layerN * 8.0);

      target.set(
        Math.cos(orbit) * radius,
        vWave * scale * 0.38 + Math.sin(orbit * 2.0 + time) * scale * 0.08,
        Math.sin(orbit) * radius,
      );
      positions[i].lerp(target, 0.08);

      const energy = Math.min(1, Math.max(0, pulse * 0.8 + Math.abs(wave) * 0.35 + (1 - ring) * 0.45));
      const spark  = Math.pow(0.5 + 0.5 * Math.sin(i * 0.173 + time * 9.0), 18.0) * gM;
      particleColor.setHSL(
        0.52 - energy * 0.06 + spark * 0.1,
        Math.min(1, 0.78 + energy * 0.22),
        Math.min(0.82, 0.34 + energy * 0.38 + spark * 0.22),
      );

      dummy.position.copy(positions[i]);
      dummy.rotation.set(time + i * 0.001, time + i * 0.001, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, particleColor);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} frustumCulled={false} />
  );
};

const DesktopCanvas = () => (
  <div className="absolute inset-0 z-0" aria-hidden="true">
    <Canvas
      frameloop="always"
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 100], fov: 60 }}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 60, 180]} />
      <ambientLight intensity={0.4} />
      <ParticleSwarm />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      <EffectComposer>
        <Bloom intensity={1.1} luminanceThreshold={0.1} luminanceSmoothing={0.85} />
      </EffectComposer>
    </Canvas>
  </div>
);

/* ═══════════════════════════════════════════════════
   Export — useState + resize listener
   Auto-switches without refresh
═══════════════════════════════════════════════════ */
const HeroParticles = () => {
  const [isMobile, setIsMobile] = useState(checkIsMobile);

  useEffect(() => {
    const handleResize = () => setIsMobile(checkIsMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileParticles /> : <DesktopCanvas />;
};

export default HeroParticles;