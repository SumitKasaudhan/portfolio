import { useState, useRef, useEffect } from "react";

const certifications = [
  {
    id: 1,
    title: "5-Day AI Agents Intensive Course",
    issuer: "Google (Kaggle)",
    date: "2025",
    icon: "🤖",
    color: "#00d3f3",
    tags: ["AI Agents", "Gemini", "LLMs", "Google"],
    credentialId: "GOOGLE-AI-AGENTS-2025",
    link: "https://drive.google.com/file/d/15yaJV5IZFQ5kZnqlSoS2CMherNu1fpV6/view?usp=drive_link",
  },
  {
    id: 2,
    title: "Frontend Developer Internship",
    issuer: "Graphura India Pvt. Ltd.",
    date: "Oct 2025- Jan 2026",
    icon: "💼",
    color: "#a855f7",
    tags: ["React.js", "TypeScript", "Agile", "UI/UX" , "Tailwind CSS" , "GitHub" , "Figma" , "Responsive Design"],
    credentialId: "GRAPHURA-FE-2025",
    link: "https://drive.google.com/file/d/18EEZzJGWTkFS3msMN9qs9IPJxbSffVQc/view?usp=sharing",
  },
  {
    id: 3,
    title: "Web Developer Internship",
    issuer: "Infosys Springboard Pvt Ltd.",
    date: "Nov 2025- Jan 2026",
    icon: "🎓",
    color: "#f59e0b",
    tags: ["Python", "TensorFlow", "OpenCV", "React.js" , "YOLO" , "Streamlit" , "NumPy" , "API Integration" ],
    credentialId: "INFOSYS-AI-2025",
    link: "https://drive.google.com/file/d/1M4zOcaM7oswWBkrIpyMYmiMJgGpU1D9t/view?usp=sharing",
  },
  {
    id: 4,
    title: "McKinsey Forward Program",
    issuer: "McKinsey.org",
    date: "2025",
    icon: "🏆",
    color: "#22c55e",
    tags: ["Leadership", "Strategy", "Problem Solving", "Business"],
    credentialId: "MCKINSEY-FWD-2024",
    link: "https://drive.google.com/file/d/1azJXrGn4eXJfP72lNtsJJVEzj_WPxEGb/view?usp=drive_link",
  },
  {
    id: 5,
    title: "OCI 2025 AI Foundations Associate",
    issuer: "Oracle Cloud Infrastructure",
    date: "2025",
    icon: "☁️",
    color: "#f97316",
    tags: ["Oracle Cloud", "AI Foundations", "OCI", "Cloud"],
    credentialId: "ORACLE-OCI-AI-2025",
    link: "https://drive.google.com/file/d/1BaSlUSQNrL8Fs7yJYrK7og7yzz8gh5O8/view?usp=sharing",
  },
  {
    id: 6,
    title: "Career Edge — Young Professional",
    issuer: "TCS iON",
    date: "2025",
    icon: "🚀",
    color: "#6366f1",
    tags: ["Soft Skills", "Communication", "Professional", "TCS"],
    credentialId: "TCSION-YP-2025",
    link: "https://drive.google.com/file/d/1IRn72WG3Yi4eSlH6g3cQ_7uXj58F5lD9/view?usp=sharing",
  },
];

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r + "," + g + "," + b;
}

const certCSS = `
  .cert-eyebrow {
    font-size: 12px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #67e8f9;
    margin-bottom: 12px;
    text-align: center;
    font-weight: 600;
  }
  .cert-heading {
    font-size: clamp(32px, 6vw, 52px);
    font-weight: 700;
    background: linear-gradient(to right, #67e8f9, #5eead4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    margin-bottom: 10px;
    line-height: 1.15;
  }
  .cert-sub {
    font-size: 14px;
    color: #475569;
    text-align: center;
    margin-bottom: 60px;
  }
  .cert-stage {
    position: relative;
    width: 100%;
    max-width: 900px;
    height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1200px;
    cursor: grab;
    user-select: none;
  }
  .cert-stage:active { cursor: grabbing; }
  .cert-card {
    position: absolute;
    width: 300px;
    height: 370px;
    border-radius: 22px;
    padding: 28px 26px 22px;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    will-change: transform;
    overflow: hidden;
  }
  .cert-card-bar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    border-radius: 22px 22px 0 0;
  }
  .cert-card-icon {
    width: 58px;
    height: 58px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    border: 1px solid;
    margin-bottom: 16px;
    flex-shrink: 0;
  }
  .cert-card-title {
    font-size: 17px;
    font-weight: 700;
    color: #e2e8f0;
    line-height: 1.3;
    margin-bottom: 5px;
  }
  .cert-card-issuer {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 14px;
  }
  .cert-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    flex: 1;
    align-content: flex-start;
  }
  .cert-card-tag {
    font-size: 10px;
    padding: 3px 10px;
    border-radius: 20px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.09);
    color: #64748b;
  }
  .cert-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .cert-card-date {
    font-size: 11px;
    color: #334155;
  }
  .cert-card-link {
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .cert-card-link:hover { opacity: 0.75; }
  .cert-card-id {
    font-size: 10px;
    color: #1e2535;
    font-family: monospace;
    margin-top: 7px;
  }
  .cert-nav {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 40px;
  }
  .cert-nav-btn {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid #1e2535;
    background: #0d1120;
    color: #64748b;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s, color 0.2s;
    line-height: 1;
  }
  .cert-nav-btn:hover {
    border-color: #67e8f9;
    color: #67e8f9;
  }
  .cert-dots {
    display: flex;
    gap: 7px;
    align-items: center;
  }
  .cert-dot {
    width: 7px;
    height: 7px;
    border-radius: 4px;
    background: #1e2535;
    cursor: pointer;
    transition: width 0.25s, background 0.25s;
  }
  .cert-dot-active {
    width: 22px;
    background: #67e8f9;
  }
  .cert-counter {
    font-size: 13px;
    font-family: monospace;
    margin-top: 14px;
    letter-spacing: 2px;
  }
  @media (max-width: 1024px) {
    .cert-stage { height: 400px; max-width: 700px; }
    .cert-card { width: 280px; height: 350px; }
  }
  @media (max-width: 768px) {
    .cert-stage { height: 380px; max-width: 100%; perspective: 800px; }
    .cert-card { width: 270px; height: 330px; padding: 22px 20px 18px; }
    .cert-card-icon { width: 50px; height: 50px; font-size: 24px; }
    .cert-card-title { font-size: 15px; }
    .cert-sub { margin-bottom: 40px; }
  }
  @media (max-width: 480px) {
    .cert-stage { height: 360px; }
    .cert-card { width: 248px; height: 310px; padding: 20px 18px 16px; }
    .cert-card-icon { width: 44px; height: 44px; font-size: 22px; margin-bottom: 12px; }
    .cert-card-title { font-size: 14px; }
    .cert-nav-btn { width: 36px; height: 36px; font-size: 15px; }
  }
`;

export default function Certifications() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const total = certifications.length;
  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = (index) => setCurrent(((index % total) + total) % total);

  const getOffset = (i) => {
    let offset = (i - current + total) % total;
    if (offset > total / 2) offset -= total;
    return offset;
  };

  const getCardStyle = (i) => {
    const p = getOffset(i);
    const abs = Math.abs(p);

    if (isMobile) {
      return {
        transform: "translateX(" + p * 260 + "px) scale(" + (abs === 0 ? 1 : 0.82) + ")",
        opacity: abs === 0 ? 1 : abs === 1 ? 0.45 : 0,
        zIndex: abs === 0 ? 10 : 1,
        pointerEvents: abs === 0 ? "auto" : "none",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
      };
    }

    const tx = p * 220;
    const tz = -abs * 100;
    const ry = p * -18;
    const scale = abs === 0 ? 1 : abs === 1 ? 0.85 : abs === 2 ? 0.68 : 0.55;
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.7 : abs === 2 ? 0.4 : 0;
    const zIndex = abs === 0 ? 10 : abs === 1 ? 5 : abs === 2 ? 2 : 0;

    return {
      transform:
        "translateX(" + tx + "px) translateZ(" + tz + "px) rotateY(" + ry + "deg) scale(" + scale + ")",
      opacity,
      zIndex,
      pointerEvents: abs === 0 ? "auto" : "none",
      transition: "transform 0.42s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
    };
  };

  const onMouseDown = (e) => {
    dragStartX.current = e.clientX;
    isDragging.current = true;
  };

  const onMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 40) {
      dx < 0 ? goTo(current + 1) : goTo(current - 1);
    }
  };

  const onTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - dragStartX.current;
    if (Math.abs(dx) > 40) {
      dx < 0 ? goTo(current + 1) : goTo(current - 1);
    }
  };

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, [current]);

  return (
    <section
      id="certifications"
      style={{
        padding: "90px 20px 100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        width: "100%",
        background: "#000",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: certCSS }} />

      <p className="cert-eyebrow">Verified Credentials</p>
      <h2 className="cert-heading">My Certifications</h2>
      <p className="cert-sub">Drag · swipe · or use arrows to explore</p>

      <div
        className="cert-stage"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {certifications.map((cert, i) => (
          <div
            key={cert.id}
            className="cert-card"
            style={{
              background:
                "linear-gradient(145deg, #0d1120 0%, rgba(" +
                hexToRgb(cert.color) +
                ", 0.09) 100%)",
              borderColor: "rgba(" + hexToRgb(cert.color) + ", 0.3)",
              ...getCardStyle(i),
            }}
          >
            <div className="cert-card-bar" style={{ background: cert.color }} />

            <div
              className="cert-card-icon"
              style={{
                background: "rgba(" + hexToRgb(cert.color) + ", 0.12)",
                borderColor: "rgba(" + hexToRgb(cert.color) + ", 0.25)",
              }}
            >
              {cert.icon}
            </div>

            <div className="cert-card-title">{cert.title}</div>
            <div className="cert-card-issuer">{cert.issuer}</div>

            <div className="cert-card-tags">
              {cert.tags.map((t) => (
                <span key={t} className="cert-card-tag">{t}</span>
              ))}
            </div>

            <div className="cert-card-footer">
              <span className="cert-card-date">📅 {cert.date}</span>
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="cert-card-link"
                style={{ color: cert.color }}
                onClick={(e) => e.stopPropagation()}
              >
                View ↗
              </a>
            </div>

            <div className="cert-card-id">ID: {cert.credentialId}</div>
          </div>
        ))}
      </div>

      <div className="cert-nav">
        <button className="cert-nav-btn" onClick={() => goTo(current - 1)} aria-label="Previous">
          ←
        </button>
        <div className="cert-dots">
          {certifications.map((_, i) => (
            <div
              key={i}
              className={"cert-dot" + (i === current ? " cert-dot-active" : "")}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button className="cert-nav-btn" onClick={() => goTo(current + 1)} aria-label="Next">
          →
        </button>
      </div>

      <p className="cert-counter">
        <span style={{ color: "#67e8f9" }}>{String(current + 1).padStart(2, "0")}</span>
        <span style={{ color: "#1e2535" }}>{" / " + String(total).padStart(2, "0")}</span>
      </p>
    </section>
  );
}