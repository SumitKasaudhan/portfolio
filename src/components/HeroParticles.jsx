import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const ParticleSwarm = () => {
  const meshRef = useRef();

  // Safer mobile detection
  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth < 768;

  // Optimized particle count
  const count = isMobile ? 6000 : 12000;

  const speedMult = 0.1;

  // Reusable objects
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const particleColor = useMemo(() => new THREE.Color(), []);

  // Initial particle positions
  const positions = useMemo(() => {
    return Array.from({ length: count }, () => {
      return new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
    });
  }, [count]);

  // Geometry
  const geometry = useMemo(
    () => new THREE.TetrahedronGeometry(0.18),
    []
  );

  // Material
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ffffff",
        toneMapped: false,
      }),
    []
  );

  // Cleanup memory
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  // Animation parameters
  const PARAMS = useMemo(
    () => ({
      scale: 85,
      gravity: 3.0,
      pulse: 2.8,
      spin: 3.5,
      gold: 0.8,
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime() * speedMult;

    const scale = PARAMS.scale;
    const gravity = PARAMS.gravity;
    const pulsePower = PARAMS.pulse;
    const spinPower = PARAMS.spin;
    const goldMix = PARAMS.gold;

    for (let i = 0; i < count; i++) {
      const n = i / count;

      const golden = 2.399963229728653;
      const layer = Math.floor(n * 9.0);
      const layerN = layer / 9.0;

      const t = time * 0.42;
      const p = i * golden;

      const wave = Math.sin(n * 92.0 - time * 3.6);

      const pulse = Math.pow(
        0.5 + 0.5 * Math.sin(time * 1.85 - n * 24.0),
        6.0
      );

      const burst =
        1.0 +
        pulse *
          pulsePower *
          (0.6 + 0.4 * Math.sin(n * 37.0 + time));

      const corePull =
        1.0 -
        0.72 *
          Math.pow(
            0.5 + 0.5 * Math.sin(time * 0.65 + n * 18.0),
            3.0
          ) *
          gravity;

      const ring = Math.sqrt(n);

      const orbit =
        p +
        t * spinPower * (1.0 + layerN * 2.7) +
        wave * 0.25;

      const spiral =
        Math.sin(n * 34.0 + time * 1.4) * 0.22;

      const radius =
        scale *
          ring *
          burst *
          (0.42 +
            0.58 * Math.max(corePull, 0.12)) +
        spiral * scale;

      const verticalWave =
        Math.sin(n * 48.0 + time * 2.1) *
        Math.cos(time * 0.7 + layerN * 8.0);

      const x = Math.cos(orbit) * radius;

      const y =
        verticalWave * scale * 0.38 +
        Math.sin(orbit * 2.0 + time) *
          scale *
          0.08;

      const z = Math.sin(orbit) * radius;

      target.set(x, y, z);

      // Smooth movement
      positions[i].lerp(target, 0.08);

      // Dynamic color system
      const energy = Math.min(
        1.0,
        Math.max(
          0.0,
          pulse * 0.8 +
            Math.abs(wave) * 0.35 +
            (1.0 - ring) * 0.45
        )
      );

      const spark =
        Math.pow(
          0.5 +
            0.5 *
              Math.sin(i * 0.173 + time * 9.0),
          18.0
        ) * goldMix;

      const hue =
        0.52 - energy * 0.06 + spark * 0.1;

      const sat = 0.78 + energy * 0.22;

      const light =
        0.34 +
        energy * 0.38 +
        spark * 0.22;

      particleColor.setHSL(
        hue,
        Math.min(1.0, sat),
        Math.min(0.82, light)
      );

      // Position
      dummy.position.copy(positions[i]);

      // Stable rotation
      dummy.rotation.set(
        time + i * 0.001,
        time + i * 0.001,
        0
      );

      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Color updates
      meshRef.current.setColorAt(i, particleColor);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={false}
    />
  );
};

const HeroParticles = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      aria-hidden="true"
    >
      <Canvas
        frameloop="always"
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 100], fov: 60 }}
      >
        {/* Background */}
        <color attach="background" args={["#000000"]} />

        {/* Fog */}
        <fog attach="fog" args={["#000000", 60, 180]} />

        {/* Ambient Light */}
        <ambientLight intensity={0.4} />

        {/* Particle System */}
        <ParticleSwarm />

        {/* Camera Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
        />

        {/* Bloom */}
        <EffectComposer>
          <Bloom
            intensity={1.1}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.85}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default HeroParticles;