import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../styles/FooterBigText.css";

/**
 * Premium big brand text for the footer.
 * - Scroll karke footer tak pahuchne par text smooth fade-up reveal hota hai
 * - Glow sirf cursor/touch par (heavy filter tab hi chalta hai)
 * - Safari/iPad safe (textLength use nahi karta), performance optimized
 * Usage: <FooterBigText />  (footer ke andar, max-w container ke BAHAR)
 */
const VB_X = -10;
const VB_W = 1420;
const TEXT_H = 250;
const BASE_Y = 218; // text baseline
const REFLECT_H = 96;
const VB_H = BASE_Y + REFLECT_H;

const HIT_TOP = 20;
const HIT_BOTTOM = BASE_Y + 40;

export default function FooterBigText({ text = "SUMITKASAUDHAN" }) {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const spotRef = useRef(null);
  const floorRef = useRef(null);
  const baseTextRef = useRef(null);

  const [sx, setSx] = useState(0.55);
  const [inView, setInView] = useState(false);
  // touch devices (iPad/mobile) par halka filter + no continuous sheen
  const [isCoarse] = useState(
    () =>
      typeof window !== "undefined" &&
      !!window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches
  );

  /* ---------- width fit (Safari-safe, textLength ki jagah) ---------- */
  useLayoutEffect(() => {
    const measure = () => {
      const el = baseTextRef.current;
      if (!el) return;
      let w = 0;
      try {
        w = el.getBBox().width;
      } catch (_) {
        w = 0;
      }
      if (w > 0) {
        const next = 1400 / w;
        setSx((prev) => (Math.abs(prev - next) < 0.0005 ? prev : next));
      }
    };

    measure();
    const t1 = setTimeout(measure, 300);
    const t2 = setTimeout(measure, 1200);
    if (document.fonts) {
      document.fonts.ready.then(measure).catch(() => {});
      document.fonts.addEventListener?.("loadingdone", measure);
    }
    window.addEventListener("load", measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.fonts?.removeEventListener?.("loadingdone", measure);
      window.removeEventListener("load", measure);
    };
  }, [text]);

  /* ---------- smooth scroll reveal (sirf ek baar) ---------- */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    if (!("IntersectionObserver" in window)) {
      wrap.classList.add("is-visible");
      setInView(true);
      return;
    }

    let revealed = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && !revealed) {
          revealed = true;
          // ek frame baad taaki transition smooth chale
          requestAnimationFrame(() => wrap.classList.add("is-visible"));
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  /* ---------- hover / touch glow ---------- */
  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;

    const host = wrap.closest("footer") || wrap;

    const target = { x: -1000, y: -1000 };
    const cur = { x: -1000, y: -1000 };
    let raf = 0;
    let running = false;
    let active = false;
    let hideTimer = 0;

    const setSpot = (x, y) => {
      const spot = spotRef.current;
      const floor = floorRef.current;
      if (spot) {
        spot.setAttribute("cx", x);
        spot.setAttribute("cy", y);
        spot.setAttribute("fx", x);
        spot.setAttribute("fy", y);
      }
      if (floor) floor.setAttribute("cx", x);
    };

    const tick = () => {
      const dx = target.x - cur.x;
      const dy = target.y - cur.y;
      cur.x += dx * 0.2;
      cur.y += dy * 0.2;
      setSpot(cur.x, cur.y);
      if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const activate = () => {
      clearTimeout(hideTimer);
      active = true;
      wrap.classList.add("is-active");
    };
    const deactivate = (delay = 0) => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        active = false;
        wrap.classList.remove("is-active");
      }, delay);
    };

    const handlePoint = (clientX, clientY, radius, touch) => {
      const rect = svg.getBoundingClientRect();
      const scale = VB_W / rect.width;
      const x = VB_X + (clientX - rect.left) * scale;
      const y = (clientY - rect.top) * scale;

      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        y >= HIT_TOP &&
        y <= HIT_BOTTOM;

      if (!inside) {
        if (active) deactivate(touch ? 500 : 0);
        return;
      }

      spotRef.current?.setAttribute("r", radius);
      if (!active) {
        cur.x = x;
        cur.y = y;
        setSpot(x, y);
      }
      target.x = x;
      target.y = y;
      activate();
      kick();
    };

    const onPointerMove = (e) => {
      if (e.pointerType === "touch") return;
      handlePoint(e.clientX, e.clientY, 200, false);
    };
    const onPointerLeave = (e) => {
      if (e.pointerType === "touch") return;
      deactivate(0);
    };
    const onTouch = (e) => {
      const t = e.touches[0];
      if (!t) return;
      handlePoint(t.clientX, t.clientY, 250, true);
    };
    const onTouchEnd = () => deactivate(900);

    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
    host.addEventListener("touchstart", onTouch, { passive: true });
    host.addEventListener("touchmove", onTouch, { passive: true });
    host.addEventListener("touchend", onTouchEnd, { passive: true });
    host.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("touchstart", onTouch);
      host.removeEventListener("touchmove", onTouch);
      host.removeEventListener("touchend", onTouchEnd);
      host.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  const common = {
    x: 0,
    y: BASE_Y,
    transform: `scale(${sx} 1)`,
    className: "fbt-text",
  };

  // sheen sirf desktop pe aur sirf jab footer screen par ho
  const showSheen = !isCoarse && inView;
  const bloomId = isCoarse ? "fbtBloomLite" : "fbtBloom";

  return (
    <div className="fbt-wrap" ref={wrapRef} aria-hidden="true">
      <svg
        ref={svgRef}
        className="fbt-svg"
        viewBox={`${VB_X} 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMin meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fbtBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6fbff" stopOpacity="0.36" />
            <stop offset="38%" stopColor="#22d3ee" stopOpacity="0.26" />
            <stop offset="78%" stopColor="#0e7490" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.04" />
          </linearGradient>

          <linearGradient id="fbtStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.38" />
            <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.45" />
          </linearGradient>

          <linearGradient id="fbtHot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0fdff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#5eead4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0.3" />
          </linearGradient>

          {showSheen && (
            <linearGradient
              id="fbtSheen"
              gradientUnits="userSpaceOnUse"
              x1="-500"
              y1="0"
              x2="-150"
              y2="0"
            >
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="50%" stopColor="#fff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                from="0 0"
                to="2100 0"
                dur="7s"
                repeatCount="indefinite"
              />
            </linearGradient>
          )}

          <radialGradient
            ref={spotRef}
            id="fbtSpot"
            gradientUnits="userSpaceOnUse"
            cx="-1000"
            cy="-1000"
            fx="-1000"
            fy="-1000"
            r="200"
          >
            <stop offset="0%" stopColor="#fff" />
            <stop offset="22%" stopColor="#e8e8e8" />
            <stop offset="48%" stopColor="#8a8a8a" />
            <stop offset="74%" stopColor="#2c2c2c" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
          <mask
            id="fbtMask"
            maskUnits="userSpaceOnUse"
            x={VB_X}
            y="-40"
            width={VB_W}
            height={TEXT_H + 80}
          >
            <rect x={VB_X} y="-40" width={VB_W} height={TEXT_H + 80} fill="url(#fbtSpot)" />
          </mask>

          <linearGradient id="fbtFloorLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="fbtFloorGlow">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>

          {/* desktop bloom */}
          <filter id="fbtBloom" x="-10%" y="-30%" width="120%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="wide" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="tight" />
            <feMerge>
              <feMergeNode in="wide" />
              <feMergeNode in="tight" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* touch devices ke liye halka (kam GPU load) */}
          <filter id="fbtBloomLite" x="-8%" y="-25%" width="116%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="fbtSoft" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>

          <linearGradient
            id="fbtReflectFade"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1={BASE_Y}
            x2="0"
            y2={VB_H}
          >
            <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask
            id="fbtReflectMask"
            maskUnits="userSpaceOnUse"
            x={VB_X}
            y={BASE_Y}
            width={VB_W}
            height={REFLECT_H}
          >
            <rect x={VB_X} y={BASE_Y} width={VB_W} height={REFLECT_H} fill="url(#fbtReflectFade)" />
          </mask>
        </defs>

        {/* ===== static artwork (reflection me reuse) ===== */}
        <g id="fbtArt">
          <text
            ref={baseTextRef}
            {...common}
            fill="url(#fbtBase)"
            stroke="url(#fbtStroke)"
            strokeWidth="1.1"
            strokeLinejoin="round"
          >
            {text}
          </text>

          {showSheen && (
            <text {...common} className="fbt-text fbt-sheen" fill="url(#fbtSheen)">
              {text}
            </text>
          )}
        </g>

        {/* ===== hover / touch glow (heavy filter sirf active hone par render) ===== */}
        <g className="fbt-hot" mask="url(#fbtMask)">
          <text
            {...common}
            fill="url(#fbtHot)"
            stroke="#cffafe"
            strokeWidth="1.5"
            strokeLinejoin="round"
            filter={`url(#${bloomId})`}
          >
            {text}
          </text>
        </g>

        {/* ===== floor light ===== */}
        <rect
          x={VB_X}
          y={BASE_Y - 1}
          width={VB_W}
          height="2"
          fill="url(#fbtFloorLine)"
          filter="url(#fbtSoft)"
          opacity="0.7"
        />
        <g className="fbt-hot">
          <ellipse ref={floorRef} cx="-1000" cy={BASE_Y + 3} rx="260" ry="14" fill="url(#fbtFloorGlow)" />
        </g>

        {/* ===== mirror reflection (glow bina filter ke, taaki light rahe) ===== */}
        <g mask="url(#fbtReflectMask)">
          <g transform={`translate(0 ${BASE_Y * 2}) scale(1 -1)`}>
            <use href="#fbtArt" />
            <g className="fbt-hot" mask="url(#fbtMask)">
              <text
                {...common}
                fill="url(#fbtHot)"
                stroke="#cffafe"
                strokeWidth="1.5"
                strokeLinejoin="round"
              >
                {text}
              </text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}