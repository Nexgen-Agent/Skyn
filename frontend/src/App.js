// App.js - Lonz Flawls Aura | Skyn (Elevated)
import React, { useEffect, useRef } from "react";
import Hero from "./components/Hero";

function AuraParticles() {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth, height = window.innerHeight;
    let particles = [];
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", resize);
    resize();
    for (let i = 0; i < 48; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1.2 + Math.random() * 2.2,
        dx: -0.5 + Math.random(),
        dy: -0.5 + Math.random(),
        hue: 32 + Math.random() * 94
      });
    }
    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `hsla(${p.hue}, 97%, 68%, 0.32)`;
        ctx.shadowColor = `hsla(${p.hue}, 98%, 80%, 0.44)`;
        ctx.shadowBlur = 14;
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
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        opacity: 0.2,
        pointerEvents: "none"
      }}
    />
  );
}

function AnimatedAuraGradient() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, width: "100vw", height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
        mixBlendMode: "lighten",
        background: `radial-gradient(ellipse at 30% 30%, #78ffd6 0%, transparent 62%),
                     radial-gradient(ellipse at 70% 65%, #a8ff78 0%, transparent 75%),
                     radial-gradient(circle at 80% 10%, #f5576c 0%, transparent 70%)`,
        opacity: 0.58,
        animation: "auraGradientMove 13s linear infinite alternate"
      }}
    />
  );
}

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "'Poppins', 'DM Sans', 'Segoe UI', Arial, sans-serif",
        background: "linear-gradient(120deg, #0f2027 0%, #2c5364 60%, #ffecd2 100%)",
        color: "#fffbe9",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowX: "hidden",
        transition: "background 1s cubic-bezier(.8,.08,.51,1.01)"
      }}
    >
      <AuraParticles />
      <AnimatedAuraGradient />
      <style>
        {`
          @keyframes auraGradientMove {
            0%{ background-position: 0% 0%, 100% 100%, 100% 0%; }
            100%{ background-position: 100% 100%, 0% 0%, 0% 100%; }
          }
        `}
      </style>
      {/* Optional: Add <Navbar /> and <Footer /> for a complete aura experience */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 3,
          padding: "2.5vh 1rem 2.5vh 1rem",
          minHeight: "100vh"
        }}
      >
        <div style={{
          maxWidth: 1200,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Artistic Aura SVG accent - optional */}
          <div style={{
            width: 100, height: 100, marginBottom: 24,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
            boxShadow: "0 0 44px #ffd20055, 0 0 90px #f7971e22",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "auraPulse 3s infinite alternate"
          }}>
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
          <Hero />
        </div>
      </main>
    </div>
  );
}

export default App;