import React, { useRef, useEffect, useState } from "react";

// Lonz Flawls Aura™ — Futuristic WebCam Component
export default function WebCamAura() {
  const videoRef = useRef(null);
  const canvasBgRef = useRef(null);
  const [streaming, setStreaming] = useState(false);

  // Start webcam stream
  useEffect(() => {
    let streamObj;
    async function startStream() {
      try {
        streamObj = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = streamObj;
          setStreaming(true);
        }
      } catch (e) {
        setStreaming(false);
      }
    }
    startStream();
    return () => {
      if (streamObj) {
        streamObj.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Animate radiant particles in background
  useEffect(() => {
    const canvas = canvasBgRef.current;
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

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1.5 + Math.random() * 2.6,
        dx: -0.5 + Math.random(),
        dy: -0.5 + Math.random(),
        hue: 40 + Math.random() * 70
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `hsla(${p.hue}, 98%, 60%, 0.37)`;
        ctx.shadowColor = `hsla(${p.hue}, 98%, 80%, 0.6)`;
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

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
        background: "linear-gradient(120deg, #0f2027 0%, #2c5364 60%, #ffecd2 100%)"
      }}
    >
      {/* Animated Background Particles */}
      <canvas
        ref={canvasBgRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          opacity: 0.29,
          pointerEvents: "none"
        }}
      />

      {/* Radiant Gradient Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, width: "100vw", height: "100vh",
          pointerEvents: "none",
          mixBlendMode: "lighten",
          background: `radial-gradient(ellipse at 30% 30%, #78ffd6 0%, transparent 60%),
                       radial-gradient(ellipse at 70% 65%, #a8ff78 0%, transparent 73%),
                       radial-gradient(circle at 80% 10%, #f5576c 0%, transparent 70%)`,
          opacity: 0.65,
          zIndex: 1,
          animation: "gradientMove 12s linear infinite alternate"
        }}
      />
      <style>
        {`
          @keyframes gradientMove {
            0%{ background-position: 0% 0%, 100% 100%, 100% 0%; }
            100%{ background-position: 100% 100%, 0% 0%, 0% 100%; }
          }
          @keyframes pulseGlow {
            0% { box-shadow: 0 0 40px #ffd20044, 0 0 80px #f7971e22; }
            100% { box-shadow: 0 0 66px #ffd200aa, 0 0 120px #f7971e33; }
          }
        `}
      </style>

      {/* Glassmorphic Webcam Container */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          margin: "8vh auto 0 auto",
          maxWidth: 500,
          background: "rgba(255,255,255,0.14)",
          borderRadius: "2.5rem",
          boxShadow: "0 10px 32px 0 rgba(31,38,135,0.27)",
          border: "1.5px solid rgba(255,255,255,0.17)",
          backdropFilter: "blur(15px) saturate(130%)",
          WebkitBackdropFilter: "blur(15px) saturate(130%)",
          padding: "2.4rem 2rem 2.2rem 2rem",
          textAlign: "center",
          transition: "transform 0.7s cubic-bezier(0.39,1.26,0.51,1.01), box-shadow 0.5s"
        }}
      >
        <div
          style={{
            margin: "0 auto 1.1rem auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* Animated SVG Aura Art */}
          <svg width="54" height="54" viewBox="0 0 60 60" fill="none"
            style={{
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
              animation: "pulseGlow 3s infinite alternate",
              marginRight: 16,
              boxShadow: "0 0 40px #ffd20044, 0 0 80px #f7971e22"
            }}>
            <circle cx="30" cy="30" r="22" fill="#fffbe9" opacity="0.93" />
            <ellipse cx="30" cy="36" rx="13" ry="7" fill="#ffe3a3" opacity="0.7" />
            <ellipse cx="25" cy="27" rx="2" ry="2.3" fill="#f7971e" />
            <ellipse cx="35" cy="27" rx="2" ry="2.3" fill="#f7971e" />
            <path d="M24 38 Q30 43 36 38" stroke="#f7971e" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            {/* Sun rays */}
            <g stroke="#ffd200" strokeWidth="2">
              <line x1="30" y1="7" x2="30" y2="0" />
              <line x1="30" y1="53" x2="30" y2="60" />
              <line x1="7" y1="30" x2="0" y2="30" />
              <line x1="53" y1="30" x2="60" y2="30" />
              <line x1="14" y1="14" x2="5" y2="5" />
              <line x1="46" y1="14" x2="55" y2="5" />
              <line x1="14" y1="46" x2="5" y2="55" />
              <line x1="46" y1="46" x2="55" y2="55" />
            </g>
          </svg>
          <div style={{ textAlign: "left" }}>
            <h2 style={{
              margin: 0,
              fontSize: "1.6rem",
              color: "#fffbe9",
              fontWeight: 700,
              letterSpacing: "0.03em",
              textShadow: "0 2px 16px #ffd20030, 0 1px 0 #f7971e99"
            }}>
              Lonz Flawls Aura™ Cam
            </h2>
            <span style={{
              fontSize: "0.99rem",
              color: "#ffe3a3",
              letterSpacing: "0.01em"
            }}>
              Real-time brilliance, artfully yours.
            </span>
          </div>
        </div>

        <div
          style={{
            borderRadius: "1.7rem",
            overflow: "hidden",
            boxShadow: streaming
              ? "0 0 44px #ffd20055, 0 0 80px #f7971e22"
              : "0 0 0 #fff0",
            border: streaming
              ? "2.5px solid #ffd20044"
              : "2.5px solid #f7971e22",
            margin: "0 auto 1.4rem auto",
            transition: "box-shadow 0.7s, border 0.7s",
            background: "#191919"
          }}
        >
          {streaming ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: 370,
                height: 265,
                objectFit: "cover",
                background: "#191919",
                display: "block"
              }}
            />
          ) : (
            <div style={{
              width: 370,
              height: 265,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffd200",
              fontSize: "1.2rem",
              background: "#191919"
            }}>
              Webcam unavailable
            </div>
          )}
        </div>

        <p style={{
          fontSize: "1.1rem",
          color: "#d7eaff",
          margin: "0 0 1.25rem 0",
          letterSpacing: "0.01em"
        }}>
          {streaming
            ? "Your Aura is live. Discover the new era of beauty intelligence."
            : "Enable your webcam for a radiant, real-time Aura experience."}
        </p>

        <button
          onClick={() => {
            if (videoRef.current && streaming) {
              const track = videoRef.current.srcObject?.getTracks()[0];
              if (track) {
                track.stop();
                videoRef.current.srcObject = null;
                setStreaming(false);
              }
            } else {
              window.location.reload();
            }
          }}
          style={{
            fontSize: "1.05rem",
            fontWeight: "600",
            color: "#2c3e50",
            border: "none",
            padding: "0.75rem 2.1rem",
            borderRadius: "1.5rem",
            background: streaming
              ? "linear-gradient(90deg, #f7971e 0%, #ffd200 100%)"
              : "linear-gradient(90deg, #ffd200 0%, #f7971e 100%)",
            boxShadow: "0 3px 16px #ffd20044",
            cursor: "pointer",
            textShadow: "0 1px 0 #fff8",
            transition: "background 0.5s, transform 0.2s"
          }}
          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.09)")}
          onMouseOut={e => (e.currentTarget.style.transform = "scale(1.0)")}
        >
          {streaming ? "Turn Off Aura Cam" : "Enable Aura Cam"}
        </button>
      </div>
    </div>
  );
}