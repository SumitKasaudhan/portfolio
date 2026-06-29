import { useRef, useEffect } from "react";

/* ── device profile ──────────────────────────────────────── */
const getProfile = () => {
  if (typeof window === "undefined") return { mobile: false, tablet: false, low: false };
  const ua = navigator.userAgent || "";
  const isIPad =
    /iPad/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isMobile =
    !isIPad &&
    (/Android.*Mobile|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
      window.innerWidth <= 480);
  const isTablet =
    isIPad || (!isMobile && window.innerWidth <= 1024 && navigator.maxTouchPoints > 0);
  const low =
    (navigator.hardwareConcurrency || 4) <= 2 ||
    (navigator.deviceMemory || 4) <= 2;
  return { mobile: isMobile, tablet: isTablet, low };
};

const getCfg = ({ mobile, tablet, low }) => {
  if (mobile) return { count: 32, dist: 120, dpr: 1 };
  if (tablet) return { count: 50, dist: 145, dpr: 1 };
  if (low)    return { count: 55, dist: 155, dpr: 1 };
  return              { count: 80, dist: 180, dpr: Math.min(window.devicePixelRatio || 1, 2) };
};

const HeroParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prof = getProfile();
    const cfg  = getCfg(prof);
    const dpr  = cfg.dpr;
    const ctx  = canvas.getContext("2d", { alpha: true, desynchronized: true });

    let W = 0, H = 0, raf, rt;
    let isVisible = true;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();

    const visObs = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0.01 }
    );
    visObs.observe(canvas);

    const mouse = { x: -9999, y: -9999, active: false };
    const getPos = (clientX, clientY) => {
      const r = canvas.getBoundingClientRect();
      return { x: clientX - r.left, y: clientY - r.top };
    };

    const onMove     = (e) => { const p = getPos(e.clientX, e.clientY); mouse.x = p.x; mouse.y = p.y; mouse.active = true; };
    const onLeave    = () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999; };
    const onTouch    = (e) => { const p = getPos(e.touches[0].clientX, e.touches[0].clientY); mouse.x = p.x; mouse.y = p.y; mouse.active = true; };

    const ripples = [];
    const spawnRipple = (cx, cy) => {
      ripples.push({ x: cx, y: cy, r: 0, maxR: 130, born: performance.now(), dur: 650, alpha0: 0.6 });
    };
    const onClick      = (e) => { const p = getPos(e.clientX, e.clientY); spawnRipple(p.x, p.y); };
    const onTouchStart = (e) => {
      const p = getPos(e.touches[0].clientX, e.touches[0].clientY);
      mouse.x = p.x; mouse.y = p.y; mouse.active = true;
      spawnRipple(p.x, p.y);
    };

    window.addEventListener("mousemove",  onMove,       { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("click",      onClick);
    canvas.addEventListener("touchmove",  onTouch,      { passive: true });
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchend",   onLeave);

    const mkP = () => {
      const angle = Math.random() * Math.PI * 2;
      const spd   = 0.06 + Math.random() * 0.11;
      const tint  = Math.random();
      let cr, cg, cb;
      if (tint < 0.55) {
        // purple / violet — dominant like Aether Flow
        cr = 160 + Math.floor(Math.random() * 50);
        cg = 60  + Math.floor(Math.random() * 50);
        cb = 230 + Math.floor(Math.random() * 25);
      } else if (tint < 0.78) {
        // blue-violet
        cr = 100 + Math.floor(Math.random() * 50);
        cg = 100 + Math.floor(Math.random() * 60);
        cb = 230 + Math.floor(Math.random() * 25);
      } else {
        // cyan accent — rare highlight
        cr = 60  + Math.floor(Math.random() * 40);
        cg = 200 + Math.floor(Math.random() * 55);
        cb = 230 + Math.floor(Math.random() * 25);
      }
      return {
        x:         Math.random() * W,
        y:         Math.random() * H,
        vx:        Math.cos(angle) * spd,
        vy:        Math.sin(angle) * spd,
        r:         1.5 + Math.random() * 1.8,   // bigger, more visible nodes
        cr, cg, cb,
        baseAlpha: 0.78 + Math.random() * 0.22, // high visibility
      };
    };

    const particles = Array.from({ length: cfg.count }, mkP);

    const D2  = cfg.dist * cfg.dist;
    const MD  = 140;
    const MD2 = MD * MD;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!isVisible) return;

      ctx.clearRect(0, 0, W, H);

      /* 1. ambient glow */
      if (!prof.mobile) {
        const bg = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, W * 0.6);
        bg.addColorStop(0,   "rgba(140,60,230,0.06)");
        bg.addColorStop(0.5, "rgba(100,40,200,0.03)");
        bg.addColorStop(1,   "transparent");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);
      }

      /* 2. cursor aura */
      if (mouse.active) {
        const aura = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 130);
        aura.addColorStop(0,   "rgba(168,85,247,0.14)");
        aura.addColorStop(0.4, "rgba(168,85,247,0.06)");
        aura.addColorStop(1,   "transparent");
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 130, 0, Math.PI * 2);
        ctx.fill();
      }

      /* 3. ripples */
      const now = performance.now();
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp  = ripples[i];
        const age = now - rp.born;
        if (age < 0) continue;
        const p = Math.min(1, age / rp.dur);
        if (p >= 1) { ripples.splice(i, 1); continue; }
        rp.r = rp.maxR * Math.pow(p, 0.4);
        const a = rp.alpha0 * (1 - p) * (1 - p);
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(168,85,247,${a})`;
        ctx.lineWidth   = 1.5 * (1 - p * 0.5);
        ctx.stroke();
      }

      /* 4. adjacency */
      const adjList = Array.from({ length: particles.length }, () => []);
      const edges   = [];
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b  = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= D2) continue;
          adjList[i].push(j);
          adjList[j].push(i);
          edges.push({ i, j, dist: Math.sqrt(d2) });
        }
      }

      /* 5. triangle fills */
      const drawn = new Set();
      for (let i = 0; i < particles.length; i++) {
        const nb = adjList[i];
        for (let ai = 0; ai < nb.length; ai++) {
          const j = nb[ai];
          for (let bi = ai + 1; bi < nb.length; bi++) {
            const k   = nb[bi];
            const key = [i, j, k].sort((a, b) => a - b).join("-");
            if (drawn.has(key)) continue;
            const dx = particles[j].x - particles[k].x;
            const dy = particles[j].y - particles[k].y;
            if (dx * dx + dy * dy >= D2) continue;
            drawn.add(key);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.lineTo(particles[k].x, particles[k].y);
            ctx.closePath();
            ctx.fillStyle = prof.mobile
              ? "rgba(140,60,230,0.030)"
              : "rgba(140,60,230,0.045)";
            ctx.fill();
          }
        }
      }

      /* 6. GLOWING edges — premium purple lines */
      edges.forEach(({ i, j, dist }) => {
        const a  = particles[i], b = particles[j];
        const t  = 1 - dist / cfg.dist;
        const op = Math.pow(t, 1.6) * 0.80;

        ctx.save();
        ctx.shadowColor = `rgba(168,85,247,${op * 0.9})`;
        ctx.shadowBlur  = prof.mobile ? 0 : 5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(168,85,247,${op})`;
        ctx.lineWidth   = 0.5 + t * 0.6;
        ctx.stroke();
        ctx.restore();
      });

      /* 7. GLOWING nodes */
      particles.forEach((p) => {
        let boost = 0;
        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MD2 && d2 > 0) {
            const dist  = Math.sqrt(d2);
            const force = (MD - dist) / MD;
            p.vx += (dx / dist) * force * 0.52;
            p.vy += (dy / dist) * force * 0.52;
            boost = force;
          }
        }

        p.vx *= 0.989;
        p.vy *= 0.989;

        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd < 0.045) {
          const a = Math.random() * Math.PI * 2;
          p.vx += Math.cos(a) * 0.035;
          p.vy += Math.sin(a) * 0.035;
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        const alpha  = Math.min(1, p.baseAlpha + boost * 0.3);
        const radius = p.r * (1 + boost * 1.0);

        /* OUTER soft halo */
        const haloR = radius * (6 + boost * 4);
        const g1 = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR);
        g1.addColorStop(0,    `rgba(${p.cr},${p.cg},${p.cb},${alpha * 0.55})`);
        g1.addColorStop(0.35, `rgba(${p.cr},${p.cg},${p.cb},${alpha * 0.15})`);
        g1.addColorStop(0.7,  `rgba(${p.cr},${p.cg},${p.cb},${alpha * 0.03})`);
        g1.addColorStop(1,    "transparent");
        ctx.fillStyle = g1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
        ctx.fill();

        /* MID glow */
        const midR = radius * 2.8;
        const g2 = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, midR);
        g2.addColorStop(0,   `rgba(${p.cr},${p.cg},${p.cb},${alpha * 0.90})`);
        g2.addColorStop(0.5, `rgba(${p.cr},${p.cg},${p.cb},${alpha * 0.28})`);
        g2.addColorStop(1,   "transparent");
        ctx.fillStyle = g2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, midR, 0, Math.PI * 2);
        ctx.fill();

        /* Core with glow shadow */
        ctx.save();
        ctx.shadowColor = `rgba(${p.cr},${p.cg},${p.cb},${alpha * 0.95})`;
        ctx.shadowBlur  = prof.mobile ? 4 : 10;
        ctx.fillStyle   = `rgba(${p.cr},${p.cg},${p.cb},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        /* White specular */
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.95})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 0.38, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    frame();

    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        resize();
        particles.forEach((p) => {
          if (p.x > W) p.x = Math.random() * W;
          if (p.y > H) p.y = Math.random() * H;
        });
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      visObs.disconnect();
      window.removeEventListener("resize",     onResize);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click",      onClick);
      canvas.removeEventListener("touchmove",  onTouch);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchend",   onLeave);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ background: "#06040f" }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 0%,   rgba(130,50,230,0.12) 0%, transparent 60%)," +
            "radial-gradient(ellipse at 100% 100%, rgba(100,40,200,0.08) 0%, transparent 50%)," +
            "radial-gradient(ellipse at 0%   80%,  rgba(130,50,230,0.09) 0%, transparent 45%)",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          display: "block",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default HeroParticles;