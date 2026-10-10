// src/components/Cursor.jsx
// Elite HUD Cursor — Iron Heart triangle-core arc reactor
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const CURSOR_Z = 2147483647; // max z-index — always above modals/overlays

export default function Cursor() {
  const wrapRef     = useRef(null);
  const coreRef     = useRef(null);
  const triRef      = useRef(null);
  const ringOuterRef= useRef(null);
  const ringInnerRef= useRef(null);
  const segRef      = useRef(null);
  const bracketRef  = useRef(null);
  const trailRef    = useRef(null);

  useEffect(() => {
    const wrap     = wrapRef.current;
    const core     = coreRef.current;
    const tri      = triRef.current;
    const ringOut  = ringOuterRef.current;
    const ringIn   = ringInnerRef.current;
    const seg      = segRef.current;
    const bracket  = bracketRef.current;
    const trail    = trailRef.current;
    if (!wrap || !core || !tri || !ringOut || !ringIn || !seg || !bracket || !trail) return;

    // Hide native cursor EVERYWHERE (incl. modal buttons with cursor:pointer)
    const hideStyle = document.createElement("style");
    hideStyle.setAttribute("data-custom-cursor", "true");
    hideStyle.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(hideStyle);
    document.body.style.cursor = "none";

    let mouseX = -100, mouseY = -100;
    let lagX = -100, lagY = -100;
    let trailX = -100, trailY = -100;
    let rafId;
    let rot = 0;
    let triRot = 0;

    let isHovering = false;
    let isClicking = false;

    const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label";

    const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onPointerOver = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE)) {
        isHovering = true;
      }
    };
    const onPointerOut = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE)) {
        isHovering = false;
      }
    };
    const onMouseDown = () => { isClicking = true; };
    const onMouseUp   = () => { isClicking = false; };
    const resetState  = () => { isHovering = false; isClicking = false; };

    document.addEventListener("mousemove",   onMove,        { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout",  onPointerOut,  { passive: true });
    document.addEventListener("mousedown",   onMouseDown,   { passive: true });
    document.addEventListener("mouseup",     onMouseUp,     { passive: true });
    document.documentElement.addEventListener("mouseleave", resetState);
    window.addEventListener("blur", resetState);

    const LAG_L = 0.18;
    const TRAIL_L = 0.08;

    const tick = () => {
      // Core snaps instantly
      core.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      // Mid layers lag slightly
      lagX += (mouseX - lagX) * LAG_L;
      lagY += (mouseY - lagY) * LAG_L;
      ringOut.style.transform = `translate(${lagX}px, ${lagY}px) rotate(${rot}deg)`;
      ringIn.style.transform  = `translate(${lagX}px, ${lagY}px) rotate(${-rot * 1.4}deg)`;
      seg.style.transform     = `translate(${lagX}px, ${lagY}px) rotate(${rot * 0.6}deg)`;

      // Triangle core rotates opposite, slow idle / fast hover
      triRot += isHovering ? 2.2 : 0.4;
      tri.style.transform = `translate(${mouseX}px, ${mouseY}px) rotate(${triRot}deg)`;

      // Outer targeting brackets — heaviest lag = "lock-on" feel
      trailX += (mouseX - trailX) * TRAIL_L;
      trailY += (mouseY - trailY) * TRAIL_L;
      bracket.style.transform = `translate(${trailX}px, ${trailY}px) rotate(${-rot * 0.3}deg)`;

      // Ambient energy trail ring — pure fade breathing
      trail.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      rot += isHovering ? 1.3 : 0.5;

      // ── States ──
      if (isClicking) {
        core.style.filter = "drop-shadow(0 0 10px #00e5ff) drop-shadow(0 0 22px rgba(0,229,255,0.9))";
        tri.style.opacity = "1";
        tri.style.transform += " scale(0.85)";
        ringOut.style.borderColor = "rgba(0,229,255,1)";
        ringOut.style.width = "38px";
        ringOut.style.height = "38px";
      } else if (isHovering) {
        core.style.filter = "drop-shadow(0 0 8px #00e5ff) drop-shadow(0 0 18px rgba(0,229,255,0.7))";
        tri.style.opacity = "1";
        ringOut.style.borderColor = "rgba(0,229,255,0.75)";
        ringOut.style.width = "58px";
        ringOut.style.height = "58px";
      } else {
        core.style.filter = "drop-shadow(0 0 6px #00e5ff) drop-shadow(0 0 12px rgba(0,229,255,0.5))";
        tri.style.opacity = "0.9";
        ringOut.style.borderColor = "rgba(0,229,255,0.4)";
        ringOut.style.width = "42px";
        ringOut.style.height = "42px";
      }

      ringIn.style.width  = isHovering ? "44px" : "30px";
      ringIn.style.height = isHovering ? "44px" : "30px";
      ringIn.style.opacity = isHovering ? "0.85" : "0.45";

      seg.style.width  = ringOut.style.width;
      seg.style.height = ringOut.style.height;
      seg.style.opacity = isHovering ? "0.9" : "0.5";

      const bSize = isHovering ? 84 : 0;
      bracket.style.width = bSize + "px";
      bracket.style.height = bSize + "px";
      bracket.style.opacity = isHovering ? "1" : "0";

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.cursor = "";
      if (hideStyle.parentNode) hideStyle.parentNode.removeChild(hideStyle);
      document.removeEventListener("mousemove",   onMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout",  onPointerOut);
      document.removeEventListener("mousedown",   onMouseDown);
      document.removeEventListener("mouseup",     onMouseUp);
      document.documentElement.removeEventListener("mouseleave", resetState);
      window.removeEventListener("blur", resetState);
    };
  }, []);

  const BASE = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: CURSOR_Z,
    willChange: "transform",
  };

  // Portal → renders directly under <body>, outside any parent stacking context
  return createPortal(
    <div
      ref={wrapRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        pointerEvents: "none",
        zIndex: CURSOR_Z,
      }}
    >
      {/* Ambient breathing trail (furthest back) */}
      <div
        ref={trailRef}
        style={{
          ...BASE,
          width: "70px",
          height: "70px",
          marginLeft: "-35px",
          marginTop: "-35px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Targeting brackets */}
      <div
        ref={bracketRef}
        style={{
          ...BASE,
          width: "0px",
          height: "0px",
          opacity: 0,
          transition:
            "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, width: "12px", height: "12px", borderTop: "2px solid rgba(0,229,255,0.95)", borderLeft: "2px solid rgba(0,229,255,0.95)", transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "12px", height: "12px", borderTop: "2px solid rgba(0,229,255,0.95)", borderRight: "2px solid rgba(0,229,255,0.95)", transform: "translate(50%,-50%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "12px", height: "12px", borderBottom: "2px solid rgba(0,229,255,0.95)", borderLeft: "2px solid rgba(0,229,255,0.95)", transform: "translate(-50%,50%)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "12px", height: "12px", borderBottom: "2px solid rgba(0,229,255,0.95)", borderRight: "2px solid rgba(0,229,255,0.95)", transform: "translate(50%,50%)" }} />
      </div>

      {/* Segmented rotating ring — dashed "tech" ring */}
      <div
        ref={segRef}
        style={{
          ...BASE,
          width: "42px",
          height: "42px",
          marginLeft: "-21px",
          marginTop: "-21px",
          borderRadius: "50%",
          border: "1px dashed rgba(0,229,255,0.55)",
        }}
      />

      {/* Inner counter-rotating thin ring */}
      <div
        ref={ringInnerRef}
        style={{
          ...BASE,
          width: "30px",
          height: "30px",
          marginLeft: "-15px",
          marginTop: "-15px",
          borderRadius: "50%",
          border: "1px solid rgba(0,229,255,0.5)",
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
        }}
      />

      {/* Outer solid ring, glowing */}
      <div
        ref={ringOuterRef}
        style={{
          ...BASE,
          width: "42px",
          height: "42px",
          marginLeft: "-21px",
          marginTop: "-21px",
          borderRadius: "50%",
          border: "1.5px solid rgba(0,229,255,0.4)",
          boxShadow: "inset 0 0 10px rgba(0,229,255,0.2), 0 0 14px rgba(0,229,255,0.15)",
          transition:
            "width 0.22s cubic-bezier(0.16,1,0.3,1), height 0.22s cubic-bezier(0.16,1,0.3,1), border-color 0.2s ease",
        }}
      />

      {/* Iron-Heart triangle core (SVG) */}
      <div
        ref={triRef}
        style={{
          ...BASE,
          width: "22px",
          height: "22px",
          marginLeft: "-11px",
          marginTop: "-11px",
          transition: "opacity 0.2s ease",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22">
          <defs>
            <radialGradient id="triGlow" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#7fe9ff" />
              <stop offset="100%" stopColor="#00b8d9" />
            </radialGradient>
          </defs>
          {/* Outer thin triangle ring */}
          <polygon
            points="11,2 20,18 2,18"
            fill="none"
            stroke="rgba(0,229,255,0.9)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* Inner filled triangle core */}
          <polygon
            points="11,6.5 16.5,16 5.5,16"
            fill="url(#triGlow)"
          />
        </svg>
      </div>

      {/* Tiny hard white-cyan center dot for snap-precision */}
      <div
        ref={coreRef}
        style={{
          ...BASE,
          width: "3px",
          height: "3px",
          marginLeft: "-1.5px",
          marginTop: "-1.5px",
          borderRadius: "50%",
          background: "#fff",
        }}
      />
    </div>,
    document.body
  );
}