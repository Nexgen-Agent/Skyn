import React, { useEffect, useRef } from "react";

// Lonz Flawls Aura™ — Futuristic Hero Section
export default function AuraLanding() {
  const canvasRef = useRef();

  // Artistic animated particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth, height = window.innerHeight;
    let particles = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);
    resize();

    for (let i = 0; i < 72; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1.1 + Math.random() * 2.6,
        dx: -0.6 + Math.random() * 1.2,
        dy: -0.6 + Math.random() * 1.2,
        hue: 40 + Math.random() * 70
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `hsla(${p.hue}, 98%, 70%, 0.65)`;
        ctx.shadowColor = `hsla(${p.hue}, 98%, 80%, 0.7)`;
        ctx.shadowBlur = 16;
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
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      overflow: 'hidden',
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
      background: 'linear-gradient(120deg, #0f2027 0%, #2c5364 60%, #ffecd2 100%)',
      position: 'relative'
    }}>
      {/* Particle Art Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          opacity: 0.33,
          pointerEvents: 'none'
        }}
      />

      {/* Animated Gradient Overlay */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, width: '100vw', height: '100vh',
        pointerEvents: 'none',
        mixBlendMode: 'lighten',
        background: `radial-gradient(ellipse at 30% 30%, #78ffd6 0%, transparent 60%),
                     radial-gradient(ellipse at 70% 60%, #a8ff78 0%, transparent 70%),
                     radial-gradient(circle at 80% 10%, #f5576c 0%, transparent 70%)`,
        opacity: 0.68,
        zIndex: 1,
        animation: 'gradientMove 12s linear infinite alternate'
      }} />

      <style>
        {`
          @keyframes gradientMove {
            0%{ background-position: 0% 0%, 100% 100%, 100% 0%; }
            100%{ background-position: 100% 100%, 0% 0%, 0% 100%; }
          }
        `}
      </style>

      {/* Glassy Hero Panel */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        margin: '9vh auto 0 auto',
        maxWidth: 700,
        background: 'rgba(255,255,255,0.13)',
        borderRadius: '2.7rem',
        boxShadow: '0 13px 36px 0 rgba(31,38,135,0.35)',
        border: '1.5px solid rgba(255,255,255,0.23)',
        backdropFilter: 'blur(18px) saturate(130%)',
        WebkitBackdropFilter: 'blur(18px) saturate(130%)',
        padding: '3.2rem 2.7rem 2.7rem 2.7rem',
        textAlign: 'center',
        transition: 'transform 0.7s cubic-bezier(0.39,1.26,0.51,1.01), box-shadow 0.5s'
      }}>
        {/* Animated Logo Art */}
        <div className="logo-art" style={{
          width: 120,
          height: 120,
          margin: '0 auto 1.6rem auto',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
          boxShadow: '0 0 42px #ffd20055, 0 0 82px #f7971e22',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulseLogo 3s infinite alternate'
        }}>
          <svg viewBox="0 0 60 60" fill="none" style={{width: 62, height: 62, filter: 'drop-shadow(0 0 12px #fff7)'}}>
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
        <style>
          {`
            @keyframes pulseLogo {
              0% { box-shadow: 0 0 42px #ffd20055, 0 0 82px #f7971e22; }
              100% { box-shadow: 0 0 66px #ffd200aa, 0 0 120px #f7971e33; }
            }
          `}
        </style>

        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: 700,
          color: '#fffbe9',
          letterSpacing: '0.04em',
          marginBottom: '0.6rem',
          textShadow: '0 2px 24px #ffd20030, 0 1px 0 #f7971e99'
        }}>
          Lonz Flawls Aura™
        </h1>

        <p style={{
          fontSize: '1.28rem',
          color: '#d7eaff',
          marginBottom: '2.2rem',
          letterSpacing: '0.02em',
          lineHeight: 1.63
        }}>
          Where <b>AI meets Art</b>.<br />
          Flawless skin, radiant confidence.<br />
          <span style={{ color: '#ffd200' }}>A new era of beauty intelligence.</span>
        </p>

        <button
          style={{
            display: 'inline-block',
            padding: '1.05rem 2.4rem',
            border: 'none',
            borderRadius: '2.1rem',
            background: 'linear-gradient(90deg, #ffd200 0%, #f7971e 100%)',
            color: '#2c3e50',
            fontSize: '1.18rem',
            fontWeight: 'bold',
            boxShadow: '0 3px 16px #ffd20044',
            transition: 'background 0.5s, transform 0.2s',
            cursor: 'pointer',
            textShadow: '0 1px 0 #fff6'
          }}
          onMouseOver={e => e.target.style.transform = "scale(1.07)"}
          onMouseOut={e => e.target.style.transform = "scale(1)"}
          onClick={() => window.location.href = "#explore"}
        >
          Enter the Aura
        </button>
      </div>
    </div>
  );
}