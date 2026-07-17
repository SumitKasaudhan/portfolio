// src/components/ParticleCanvas.jsx
//
// USAGE — App.jsx / MainLayout.jsx:
//
//   const heroRef = useRef(null);
//
//   <ParticleCanvas heroRef={heroRef} />
//   <Hero ref={heroRef} />        ← forwardRef wala Hero
//   <About />
//   <Projects />
//   <Contact />
//
// Ya agar Hero me forwardRef nahi lagana to:
//   const heroRef = useRef(null);
//   <ParticleCanvas heroRef={heroRef} />
//   <section ref={heroRef}> ... Hero content ... </section>

import { useEffect, useRef } from "react";

// ── Particle factory ─────────────────────────────────────────────────────────
function makeParticles(W, H) {
  const count = Math.min(1800, Math.floor((W * H) / 520));

  return Array.from({ length: count }, () => {
    const t = Math.random();
    let r = 0, g = 0, b = 0;

    if (t > 0.62) {
      r = 0;   g = 229; b = 255; // Cyan   #00e5ff
    } else if (t > 0.36) {
      r = 123; g = 47;  b = 190; // Violet #7b2fbe
    } else {
      r = 255; g = 45;  b = 120; // Pink   #ff2d78
    }

    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      z:    Math.random(),
      r, g, b,
      vx:   (Math.random() - 0.5) * 0.10,
      vy:   (Math.random() - 0.5) * 0.10,
      size: Math.random() * 1.3 + 0.25,
    };
  });
}

// ── Component ────────────────────────────────────────────────────────────────
// heroRef → ref to your Hero section element
// Agar heroRef nahi diya to full page pe particles chalenge (backward-compat)
export default function ParticleCanvas({ heroRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W         = window.innerWidth;
    let H         = window.innerHeight;
    let mouseX    = W / 2;
    let mouseY    = H / 2;
    let rafId;
    let particles = makeParticles(W, H);

    // ── Canvas size + DPR ──────────────────────────────────────────────────
    function applySize() {
      W = window.innerWidth;
      H = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    applySize();

    // ── Resize ────────────────────────────────────────────────────────────
    let resizeTimer;
    function onResize() {
      applySize();
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        particles = makeParticles(W, H);
      }, 150);
    }

    // ── Mouse ─────────────────────────────────────────────────────────────
    function onMouseMove(e) { mouseX = e.clientX; mouseY = e.clientY; }

    // ── Touch ─────────────────────────────────────────────────────────────
    function onTouchMove(e) {
      const t = e.touches[0];
      if (!t) return;
      mouseX = t.clientX;
      mouseY = t.clientY;
    }
    function onTouchEnd() { mouseX = W / 2; mouseY = H / 2; }

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("touchmove",  onTouchMove,  { passive: true });
    document.addEventListener("touchend",   onTouchEnd,   { passive: true });
    window.addEventListener("resize",       onResize);

    // ── Draw loop ──────────────────────────────────────────────────────────
    function draw() {
      ctx.clearRect(0, 0, W, H);

      // ── Hero clip ──────────────────────────────────────────────────────
      // heroRef.current.getBoundingClientRect().bottom = pixel on screen
      // where hero ends — updates every frame with scroll, no listener needed
      let clipTop = 0;
      if (heroRef?.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        clipTop = Math.max(0, heroBottom);
      }

      ctx.save();
      if (clipTop > 0) {
        ctx.beginPath();
        ctx.rect(0, clipTop, W, H); // draw particles ONLY below hero
        ctx.clip();
      }

      const mx = (mouseX / W - 0.5) * 2;
      const my = (mouseY / H - 0.5) * 2;

      for (const p of particles) {
        p.x += p.vx + mx * p.z * 0.06;
        p.y += p.vy + my * p.z * 0.04;

        if (p.x < -6)     p.x = W + 6;
        if (p.x > W + 6)  p.x = -6;
        if (p.y < -6)     p.y = H + 6;
        if (p.y > H + 6)  p.y = -6;

        const alpha = 0.18 + p.z * 0.52;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
        ctx.fill();
      }

      ctx.restore();
      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove",  onTouchMove);
      document.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("resize",       onResize);
    };
  }, [heroRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        width:         "100%",
        height:        "100%",
        zIndex:        0,
        pointerEvents: "none",
      }}
    />
  );
}