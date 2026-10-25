import React, { useEffect, useRef } from "react";
import "../styles/FooterBigText.css";

/**
 * Footer big brand text — CANVAS version (light + smooth, har device pe same).
 *
 * Kyun canvas: pehle SVG filters/masks har frame re-render hote the, isliye
 * iPad/mobile pe lag aata tha. Ab text sirf EK baar draw hota hai (cache),
 * aur glow tab hi redraw hota hai jab cursor/touch text par ho.
 *
 * - Page load pe hi text ready rehta hai (koi delay / reveal animation nahi)
 * - Idle me ZERO CPU/GPU kaam
 * - Glow cursor/touch ke paas ke chhote area me hi redraw hota hai
 * Usage: <FooterBigText />  (footer ke andar, max-w container ke BAHAR)
 */
const DW = 1420; // design width
const TEXT_X = 10;
const TEXT_W = 1400;
const BASE_Y = 218; // baseline
const REFLECT_H = 96;
const DH = BASE_Y + REFLECT_H; // design height
const HIT_TOP = 20;
const HIT_BOTTOM = BASE_Y + 40;
const CAP_TOP = BASE_Y - 192;

const FONT_FAMILY = 'Inter, Montserrat, "Segoe UI", system-ui, sans-serif';
const FONT = `900 262px ${FONT_FAMILY}`;

const setFont = (ctx) => {
  ctx.font = FONT;
  if ("letterSpacing" in ctx) ctx.letterSpacing = "5px";
  ctx.textBaseline = "alphabetic";
  ctx.lineJoin = "round";
};

export default function FooterBigText({ text = "SUMITKASAUDHAN" }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const host = wrap.closest("footer") || wrap;
    const mk = () => document.createElement("canvas");
    const baseC = mk(); // cached: dim text + reflection + floor line
    const hotC = mk(); // cached: bright glowing text
    const tmpC = mk(); // spotlight scratch
    const rflC = mk(); // reflection scratch
    const scratch = mk(); // text measure
    const mainCtx = canvas.getContext("2d");

    let W = 0;
    let H = 0;
    let k = 1; // design unit -> device px
    let sx = 1;
    let tw = 1;
    let ready = false;

    const cur = { x: -1000, y: -1000 };
    const target = { x: -1000, y: -1000 };
    let intensity = 0;
    let active = false;
    let radius = 200;
    let raf = 0;
    let hideTimer = 0;

    /* ---------------- static layers (sirf resize / font load pe) ---------------- */
    const build = () => {
      const cssW = canvas.clientWidth;
      if (!cssW) return;

      const sctx = scratch.getContext("2d");
      setFont(sctx);
      const newTw = sctx.measureText(text).width || 1;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nk = (cssW / DW) * dpr;
      const nW = Math.max(1, Math.round(DW * nk));
      const nH = Math.max(1, Math.round(DH * nk));

      if (ready && nW === W && nH === H && Math.abs(newTw - tw) < 0.01) return;

      k = nk;
      W = nW;
      H = nH;
      tw = newTw;
      sx = TEXT_W / tw;

      [canvas, baseC, hotC, tmpC].forEach((c) => {
        c.width = W;
        c.height = H;
      });
      rflC.width = W;
      rflC.height = Math.max(1, Math.round(REFLECT_H * k));
      const rh = rflC.height;

      /* ----- base: dim glassy text + outline ----- */
      const b = baseC.getContext("2d");
      b.save();
      b.setTransform(k * sx, 0, 0, k, TEXT_X * k, 0);
      setFont(b);
      const fg = b.createLinearGradient(0, CAP_TOP, 0, BASE_Y + 2);
      fg.addColorStop(0, "rgba(230,251,255,0.36)");
      fg.addColorStop(0.38, "rgba(34,211,238,0.26)");
      fg.addColorStop(0.78, "rgba(14,116,144,0.14)");
      fg.addColorStop(1, "rgba(11,18,32,0.04)");
      b.fillStyle = fg;
      b.fillText(text, 0, BASE_Y);
      const sg = b.createLinearGradient(0, 0, tw, 0);
      sg.addColorStop(0, "rgba(148,163,184,0.38)");
      sg.addColorStop(0.55, "rgba(34,211,238,0.55)");
      sg.addColorStop(1, "rgba(167,139,250,0.45)");
      b.strokeStyle = sg;
      b.lineWidth = 1.1;
      b.strokeText(text, 0, BASE_Y);
      b.restore();

      /* ----- base: mirror reflection (faded) ----- */
      const r = rflC.getContext("2d");
      r.setTransform(1, 0, 0, 1, 0, 0);
      r.clearRect(0, 0, W, rh);
      r.save();
      r.translate(0, rh);
      r.scale(1, -1);
      r.drawImage(baseC, 0, (BASE_Y - REFLECT_H) * k, W, rh, 0, 0, W, rh);
      r.restore();
      r.globalCompositeOperation = "destination-in";
      const fade = r.createLinearGradient(0, 0, 0, rh);
      fade.addColorStop(0, "rgba(0,0,0,0.5)");
      fade.addColorStop(1, "rgba(0,0,0,0)");
      r.fillStyle = fade;
      r.fillRect(0, 0, W, rh);
      r.globalCompositeOperation = "source-over";
      b.drawImage(rflC, 0, BASE_Y * k);

      /* ----- hot: bright text with baked glow ----- */
      const h = hotC.getContext("2d");
      h.save();
      h.setTransform(k * sx, 0, 0, k, TEXT_X * k, 0);
      setFont(h);
      const hg = h.createLinearGradient(0, CAP_TOP, 0, BASE_Y + 2);
      hg.addColorStop(0, "rgba(240,253,255,0.95)");
      hg.addColorStop(0.45, "rgba(94,234,212,0.6)");
      hg.addColorStop(1, "rgba(14,116,144,0.3)");
      h.fillStyle = hg;
      h.shadowColor = "rgba(34,211,238,0.9)";
      h.shadowBlur = 30 * k;
      h.fillText(text, 0, BASE_Y);
      h.fillText(text, 0, BASE_Y);
      h.shadowColor = "rgba(103,232,249,0.8)";
      h.shadowBlur = 10 * k;
      h.fillText(text, 0, BASE_Y);
      h.shadowBlur = 0;
      h.shadowColor = "transparent";
      h.strokeStyle = "#cffafe";
      h.lineWidth = 1.5;
      h.strokeText(text, 0, BASE_Y);
      h.fillText(text, 0, BASE_Y);
      h.restore();

      ready = true;
      draw();
    };

    /* ---------------- per-frame draw (sirf active hone par) ---------------- */
    function draw() {
      if (!W) return;
      const m = mainCtx;
      m.setTransform(1, 0, 0, 1, 0, 0);
      m.globalAlpha = 1;
      m.globalCompositeOperation = "source-over";
      m.clearRect(0, 0, W, H);
      m.drawImage(baseC, 0, 0);
      if (intensity < 0.01) return;

      const r = radius;
      const cx = cur.x;
      const cy = cur.y;
      const bx0 = Math.max(0, Math.floor((cx - r) * k));
      const bx1 = Math.min(W, Math.ceil((cx + r) * k));
      const bw = bx1 - bx0;
      if (bw <= 0) return;
      const bh = Math.min(H, Math.ceil((BASE_Y + 24) * k));

      // spotlight: sirf cursor ke aas-paas ka chhota area
      const t = tmpC.getContext("2d");
      t.setTransform(1, 0, 0, 1, 0, 0);
      t.globalCompositeOperation = "source-over";
      t.clearRect(bx0, 0, bw, bh);
      t.drawImage(hotC, bx0, 0, bw, bh, bx0, 0, bw, bh);
      t.globalCompositeOperation = "destination-in";
      const g = t.createRadialGradient(cx * k, cy * k, 0, cx * k, cy * k, r * k);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(0.22, "rgba(0,0,0,0.9)");
      g.addColorStop(0.48, "rgba(0,0,0,0.5)");
      g.addColorStop(0.74, "rgba(0,0,0,0.14)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      t.fillStyle = g;
      t.fillRect(bx0, 0, bw, bh);
      t.globalCompositeOperation = "source-over";

      m.globalAlpha = intensity;
      m.drawImage(tmpC, bx0, 0, bw, bh, bx0, 0, bw, bh);

      // glow reflection
      const rh = rflC.height;
      const rc = rflC.getContext("2d");
      rc.setTransform(1, 0, 0, 1, 0, 0);
      rc.globalCompositeOperation = "source-over";
      rc.clearRect(bx0, 0, bw, rh);
      rc.save();
      rc.translate(0, rh);
      rc.scale(1, -1);
      rc.drawImage(tmpC, bx0, (BASE_Y - REFLECT_H) * k, bw, rh, bx0, 0, bw, rh);
      rc.restore();
      rc.globalCompositeOperation = "destination-in";
      const fd = rc.createLinearGradient(0, 0, 0, rh);
      fd.addColorStop(0, "rgba(0,0,0,0.5)");
      fd.addColorStop(1, "rgba(0,0,0,0)");
      rc.fillStyle = fd;
      rc.fillRect(bx0, 0, bw, rh);
      rc.globalCompositeOperation = "source-over";
      m.drawImage(rflC, bx0, 0, bw, rh, bx0, BASE_Y * k, bw, rh);

      m.globalAlpha = 1;
    }

    const tick = () => {
      raf = 0;
      const dx = target.x - cur.x;
      const dy = target.y - cur.y;
      const di = (active ? 1 : 0) - intensity;
      cur.x += dx * 0.22;
      cur.y += dy * 0.22;
      intensity += di * 0.16;
      const more = Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3 || Math.abs(di) > 0.01;
      if (!more) {
        cur.x = target.x;
        cur.y = target.y;
        intensity = active ? 1 : 0;
      }
      draw();
      if (more) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    /* ---------------- input ---------------- */
    const setActive = (v) => {
      active = v;
      kick();
    };
    const deactivate = (delay = 0) => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setActive(false), delay);
    };

    const handlePoint = (clientX, clientY, r, touch) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      const s = DW / rect.width;
      const x = (clientX - rect.left) * s;
      const y = (clientY - rect.top) * s;
      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        y >= HIT_TOP &&
        y <= HIT_BOTTOM;

      if (!inside) {
        if (active) deactivate(touch ? 500 : 0);
        return;
      }
      clearTimeout(hideTimer);
      radius = r;
      if (!active) {
        cur.x = x;
        cur.y = y;
      }
      target.x = x;
      target.y = y;
      setActive(true);
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

    /* ---------------- init ---------------- */
    build();

    let roRaf = 0;
    const ro =
      "ResizeObserver" in window
        ? new ResizeObserver(() => {
            cancelAnimationFrame(roRaf);
            roRaf = requestAnimationFrame(build);
          })
        : null;
    ro?.observe(canvas);

    if (document.fonts) {
      document.fonts.load("900 100px Inter").then(build).catch(() => {});
      document.fonts.ready.then(build).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(roRaf);
      clearTimeout(hideTimer);
      ro?.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("touchstart", onTouch);
      host.removeEventListener("touchmove", onTouch);
      host.removeEventListener("touchend", onTouchEnd);
      host.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [text]);

  return (
    <div className="fbt-wrap" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} className="fbt-canvas" width={DW} height={DH} />
    </div>
  );
}