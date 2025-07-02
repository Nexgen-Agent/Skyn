// App.jsx
import React, { useEffect, useRef } from "react";

// Animated Particle Background
function AuraParticles() {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth, height = window.innerHeight;
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 2.3,
      dx: -0.3 + Math.random() * 0.6,
      dy: -0.3 + Math.random() * 0.6,
      hue: 32 + Math.random() * 90
    }));
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", resize);
    resize();
    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `hsla(${p.hue},96%,65%,0.22)`;
        ctx.shadowColor = `hsla(${p.hue},96%,82%,0.44)`;
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.closePath();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      }
      requestAnimationFrame(animate);
    }
    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);
  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        zIndex: 0,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        opacity: 0.33,
        pointerEvents: "none"
      }}
    />
  );
}

// Animated Aura Gradient Overlay
function AuraGradient() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
        mixBlendMode: "lighten",
        background:
          "radial-gradient(ellipse at 28% 24%, #78ffd6 0%, transparent 62%)," +
          "radial-gradient(ellipse at 78% 70%, #a8ff78 0%, transparent 74%)," +
          "radial-gradient(circle at 90% 12%, #f5576c 0%, transparent 74%)",
        opacity: 0.47,
        animation: "auraGradientMove 14s linear infinite alternate"
      }}
    />
  );
}

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(120deg,#0f2027 0%,#2c5364 65%,#ffecd2 100%)",
        fontFamily: "'Poppins','Segoe UI',Arial,sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <AuraParticles />
      <AuraGradient />
      <style>
        {`
          @keyframes auraGradientMove {
            0%{ background-position: 0% 0%, 100% 100%, 100% 0%; }
            100%{ background-position: 100% 100%, 0% 0%, 0% 100%; }
          }
          .aura-glass {
            background: rgba(255,255,255,0.15);
            border-radius: 2.5rem;
            box-shadow: 0 12px 44px 0 rgba(31,38,135,0.24), 0 0 60px #ffd20044;
            border: 1.8px solid rgba(255,255,255,0.18);
            backdrop-filter: blur(18px) saturate(148%);
            -webkit-backdrop-filter: blur(18px) saturate(148%);
            transition: box-shadow 0.7s, background 0.7s;
            margin-top: 3vh;
          }
          .aura-glass:hover {
            box-shadow: 0 24px 90px #ffd20066, 0 12px 120px #f7971e33;
            background: rgba(255,255,255,0.23);
          }
          .aura-title {
            color: #ffd200;
            font-size: 2.32rem;
            font-weight: 900;
            letter-spacing: 0.04em;
            margin-bottom: 1.1rem;
            text-align: center;
            filter: drop-shadow(0 2px 32px #ffd20055);
          }
          .aura-description {
            color: #fafafc;
            font-size: 1.16rem;
            font-weight: 400;
            letter-spacing: 0.02em;
            text-align: center;
            margin-bottom: 2.2rem;
            background: linear-gradient(90deg,#ffd200 0%,#f7971e 80%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .aura-logo-art {
            width: 88px; height: 88px; margin: 0 auto 1.4rem auto;
            border-radius: 50%;
            background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%);
            box-shadow: 0 0 44px #ffd20055, 0 0 90px #f7971e22;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: auraPulse 3s infinite alternate;
          }
          @keyframes auraPulse {
            0% { box-shadow: 0 0 44px #ffd20055, 0 0 90px #f7971e22; }
            100% { box-shadow: 0 0 72px #ffd200cc, 0 0 140px #f7971e33; }
          }
          .aura-content {
            padding: 2.2rem 2.2rem 2.6rem 2.2rem;
            max-width: 640px;
          }
          .aura-btn {
            margin-top: 1.4rem;
            background: linear-gradient(90deg,#ffd200 0%,#f7971e 100%);
            color: #222;
            font-weight: 700;
            font-size: 1.12rem;
            border: none;
            border-radius: 1.1rem;
            padding: 0.7rem 2.4rem;
            box-shadow: 0 4px 22px #ffd20033;
            cursor: pointer;
            transition: background 0.4s, transform 0.3s, box-shadow 0.5s;
            outline: none;
            letter-spacing: 0.01em;
          }
          .aura-btn:hover {
            background: linear-gradient(90deg,#f7971e 0%,#ffd200 100%);
            transform: translateY(-2px) scale(1.04);
            box-shadow: 0 8px 48px #ffd20077;
          }
        `}
      </style>
      <div className="aura-glass aura-content" style={{zIndex: 2}}>
        <div className="aura-logo-art">
          <svg viewBox="0 0 60 60" fill="none" style={{width: 52, height: 52}}>
            <circle cx="30" cy="30" r="22" fill="#fffbe9" opacity="0.93"/>
            <ellipse cx="30" cy="36" rx="13" ry="7" fill="#ffe3a3" opacity="0.7"/>
            <ellipse cx="25" cy="27" rx="2" ry="2.3" fill="#f7971e" />
            <ellipse cx="35" cy="27" rx="2" ry="2.3" fill="#f7971e" />
            <path d="M24 38 Q30 43 36 38" stroke="#f7971e" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
            <g stroke="#ffd200" strokeWidth="2">
              <line x1="30" y1="7" x2="30" y2="0"/>
              <line x1="30" y1="53" x2="30" y2="60"/>
              <line x1="7" y1="30" x2="0" y2="30"/>
              <line x1="53" y1="30" x2="60" y2="30"/>
              <line x1="14" y1="14" x2="5" y2="5"/>
              <line x1="46" y1="14" x2="55" y2="5"/>
              <line x1="14" y1="46" x2="5" y2="55"/>
              <line x1="46" y1="46" x2="55" y2="55"/>
            </g>
          </svg>
        </div>
        <div className="aura-title">Lonz Flawls Aura™</div>
        <div className="aura-description">
          Welcome to a next-gen interface radiating with glassmorphic elegance, glowing gradients, and futuristic flair.<br/>
          Elevate your workflow with the signature Lonz Flawls aura.
        </div>
        <button className="aura-btn" onClick={() => window.open("https://github.com/Nexgen-Agent/Skyn", "_blank")}>
          View on GitHub
        </button>
        {/* 
          Add your routed components or main content below:
          <Routes>...</Routes>
        */}
      </div>
    </div>
  );
}