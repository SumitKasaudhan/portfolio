import React, { useEffect, useRef } from "react";
import "../styles/FooterBigText.css";

/**
 * Premium big brand text for the footer.
 * - Glow SIRF tab aata hai jab cursor text ke upar ho (laptop/desktop)
 *   ya finger se text ko touch kare (mobile / tablet / iPad)
 * - Glow smooth follow karta hai, reflection me bhi mirror hota hai
 * Usage: <FooterBigText />  (footer ke andar, max-w container ke BAHAR)
 */
const VB_X = -10;
const VB_W = 1420;
const TEXT_H = 250;
const BASE_Y = 218; // text baseline
const REFLECT_H = 96;
const VB_H = BASE_Y + REFLECT_H;

// glow tab chalu hoga jab pointer is vertical range me ho (viewBox units)
const HIT_TOP = 20;
const HIT_BOTTOM = BASE_Y + 40;

export default function FooterBigText({ text = "SUMITKASAUDHAN" }) {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const spotRef = useRef(null);
  const floorRef = useRef(null);

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

    // smooth follow (lerp)
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

    // client coords -> viewBox coords, sirf text area ke upar hi glow
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
        // pehli baar: seedha wahi se start, bahar se udke na aaye
        cur.x = x;
        cur.y = y;
        setSpot(x, y);
      }
      target.x = x;
      target.y = y;
      activate();
      kick();
    };

    /* ---------- mouse / pen ---------- */
    const onPointerMove = (e) => {
      if (e.pointerType === "touch") return;
      handlePoint(e.clientX, e.clientY, 200, false);
    };
    const onPointerLeave = (e) => {
      if (e.pointerType === "touch") return;
      deactivate(0);
    };

    /* ---------- touch (mobile / tablet / iPad) ---------- */
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
    textLength: 1400,
    lengthAdjust: "spacingAndGlyphs",
    className: "fbt-text",
  };

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
          {/* base glassy gradient (same look) */}
          <linearGradient id="fbtBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6fbff" stopOpacity="0.36" />
            <stop offset="38%" stopColor="#22d3ee" stopOpacity="0.26" />
            <stop offset="78%" stopColor="#0e7490" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.04" />
          </linearGradient>

          {/* outline (same look) */}
          <linearGradient id="fbtStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.38" />
            <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.45" />
          </linearGradient>

          {/* glow fill: clean white-cyan, over-saturated haze nahi */}
          <linearGradient id="fbtHot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0fdff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#5eead4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0.3" />
          </linearGradient>

          {/* sheen band (same) */}
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

          {/* spotlight mask: smooth multi-stop falloff */}
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

          {/* floor light */}
          <linearGradient id="fbtFloorLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="fbtFloorGlow">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>

          {/* soft, controlled bloom (blob nahi banega) */}
          <filter id="fbtBloom" x="-10%" y="-30%" width="120%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="wide" />
            <feComponentTransfer in="wide" result="wideBoost">
              <feFuncA type="linear" slope="1.15" />
            </feComponentTransfer>
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="tight" />
            <feMerge>
              <feMergeNode in="wideBoost" />
              <feMergeNode in="tight" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="fbtSoft" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>

          {/* reflection fade */}
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

        {/* ===== artwork (reflection me reuse hota hai) ===== */}
        <g id="fbtArt">
          {/* base text */}
          <text {...common} fill="url(#fbtBase)" stroke="url(#fbtStroke)" strokeWidth="1.1">
            {text}
          </text>

          {/* sheen sweep */}
          <text {...common} className="fbt-text fbt-sheen" fill="url(#fbtSheen)">
            {text}
          </text>

          {/* hover / touch glow */}
          <g className="fbt-hot" mask="url(#fbtMask)">
            <text {...common} fill="url(#fbtHot)" stroke="#cffafe" strokeWidth="1.5" filter="url(#fbtBloom)">
              {text}
            </text>
          </g>
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

        {/* ===== mirror reflection ===== */}
        <g mask="url(#fbtReflectMask)">
          <use href="#fbtArt" transform={`translate(0 ${BASE_Y * 2}) scale(1 -1)`} />
        </g>
      </svg>
    </div>
  );
}