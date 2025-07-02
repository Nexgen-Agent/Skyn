import React, { useRef, useEffect, useState } from "react";

// Lonz Flawls Aura™ - Futuristic Image Input Component
export default function ImageInputAura({ onImage }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef();
  const bgCanvasRef = useRef();

  // Animate glowing particle background
  useEffect(() => {
    const canvas = bgCanvasRef.current;
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
    for (let i = 0; i < 36; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1.2 + Math.random() * 2.4,
        dx: -0.4 + Math.random() * 0.8,
        dy: -0.4 + Math.random() * 0.8,
        hue: 32 + Math.random() * 94
      });
    }
    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `hsla(${p.hue}, 97%, 68%, 0.25)`;
        ctx.shadowColor = `hsla(${p.hue}, 98%, 80%, 0.60)`;
        ctx.shadowBlur = 12;
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

  function handleInputChange(e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onImage && onImage(file);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        fontFamily: "'Poppins','Segoe UI',Arial,sans-serif",
        background: "linear-gradient(120deg, #0f2027 0%, #2c5364 65%, #ffecd2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Animated Particle Background */}
      <canvas
        ref={bgCanvasRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          opacity: 0.28,
          pointerEvents: "none"
        }}
      />
      {/* Animated gradient overlay */}
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, width: "100vw", height: "100vh",
          pointerEvents: "none",
          mixBlendMode: "lighten",
          background: `radial-gradient(ellipse at 30% 30%, #78ffd6 0%, transparent 60%),
                       radial-gradient(ellipse at 70% 60%, #a8ff78 0%, transparent 70%),
                       radial-gradient(circle at 80% 10%, #f5576c 0%, transparent 70%)`,
          opacity: 0.62,
          zIndex: 1,
          animation: "gradientMove 13s linear infinite alternate"
        }}
      />
      <style>
        {`
          @keyframes gradientMove {
            0%{ background-position: 0% 0%, 100% 100%, 100% 0%; }
            100%{ background-position: 100% 100%, 0% 0%, 0% 100%; }
          }
          @keyframes auraPulse {
            0% { box-shadow: 0 0 44px #ffd20055, 0 0 90px #f7971e22; }
            100% { box-shadow: 0 0 72px #ffd200cc, 0 0 140px #f7971e33; }
          }
        `}
      </style>

      {/* Glassmorphic Upload Panel */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 390,
          width: "95vw",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "2.4rem",
          boxShadow: "0 11px 38px 0 rgba(31,38,135,0.23)",
          border: "1.5px solid rgba(255,255,255,0.22)",
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
          padding: "2.3rem 2rem 2.1rem 2rem",
          textAlign: "center",
          transition: "transform 0.7s cubic-bezier(0.39,1.26,0.51,1.01), box-shadow 0.5s"
        }}
      >
        {/* Radiant SVG Art */}
        <div
          style={{
            width: 72,
            height: 72,
            margin: "0 auto 1.2rem auto",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
            boxShadow: "0 0 44px #ffd20055, 0 0 90px #f7971e22",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "auraPulse 3s infinite alternate"
          }}
        >
          <svg viewBox="0 0 60 60" fill="none" style={{width: 36, height: 36}}>
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

        <h2 style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#fffbe9",
          letterSpacing: "0.03em",
          marginBottom: "0.6rem",
          textShadow: "0 2px 20px #ffd20022, 0 1px 0 #f7971e77"
        }}>
          Upload Your Aura
        </h2>
        <p style={{
          fontSize: "1.05rem",
          color: "#d7eaff",
          marginBottom: "1.1rem"
        }}>
          Step into the light. Upload your image to unveil your radiant confidence.
        </p>

        <label
          htmlFor="aura-image-upload"
          style={{
            display: "inline-block",
            padding: "1.05rem 2.1rem",
            borderRadius: "1.5rem",
            background: "linear-gradient(90deg, #ffd200 0%, #f7971e 100%)",
            color: "#2c3e50",
            fontWeight: "bold",
            fontSize: "1.07rem",
            cursor: "pointer",
            boxShadow: "0 3px 16px #ffd20044",
            marginBottom: "1.1rem",
            textShadow: "0 1px 0 #fff8",
            transition: "background 0.5s, transform 0.2s"
          }}
          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.07)")}
          onMouseOut={e => (e.currentTarget.style.transform = "scale(1.0)")}
        >
          {preview ? "Change Image" : "Select Image"}
          <input
            ref={inputRef}
            id="aura-image-upload"
            type="file"
            accept="image/*"
            style={{display: "none"}}
            onChange={handleInputChange}
          />
        </label>

        {/* Image Preview */}
        {preview && (
          <div style={{
            margin: "1.2rem 0 0 0",
            borderRadius: "1.3rem",
            overflow: "hidden",
            boxShadow: "0 2px 20px #ffd20033, 0 0 0 #fff0",
            border: "1.5px solid #ffd20033",
            transition: "box-shadow 0.5s, border 0.5s"
          }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: "330px",
                maxHeight: "320px",
                display: "block",
                width: "100%",
                objectFit: "cover",
                borderRadius: "1.3rem",
                background: "#fffbe9"
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}