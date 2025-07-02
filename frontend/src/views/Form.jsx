import React, { useRef, useEffect, useState } from "react";

// Lonz Flawls Aura™ - Futuristic Form Component
export default function AuraForm() {
  const canvasRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  // Particle background animation
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
        r: 1.3 + Math.random() * 2.2,
        dx: -0.4 + Math.random() * 0.8,
        dy: -0.4 + Math.random() * 0.8,
        hue: 32 + Math.random() * 98
      });
    }
    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `hsla(${p.hue}, 97%, 70%, 0.37)`;
        ctx.shadowColor = `hsla(${p.hue}, 98%, 80%, 0.5)`;
        ctx.shadowBlur = 10;
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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2600);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        fontFamily: "'Poppins','Segoe UI',Arial,sans-serif",
        background:
          "linear-gradient(120deg, #0f2027 0%, #2c5364 60%, #ffecd2 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Particle background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          opacity: 0.28,
          pointerEvents: "none",
        }}
      />

      {/* Animated radiant overlay */}
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
          animation: "gradientMove 14s linear infinite alternate"
        }}
      />
      <style>
        {`
          @keyframes gradientMove {
            0%{ background-position: 0% 0%, 100% 100%, 100% 0%; }
            100%{ background-position: 100% 100%, 0% 0%, 0% 100%; }
          }
          @keyframes pulseAura {
            0% { box-shadow: 0 0 48px #ffd20055, 0 0 92px #f7971e22; }
            100% { box-shadow: 0 0 82px #ffd200aa, 0 0 140px #f7971e33; }
          }
        `}
      </style>

      {/* Glassmorphic Form Panel */}
      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 420,
          width: "95vw",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "2.3rem",
          boxShadow: "0 11px 36px 0 rgba(31,38,135,0.23)",
          border: "1.5px solid rgba(255,255,255,0.22)",
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
          padding: "2.6rem 2.2rem 2.2rem 2.2rem",
          textAlign: "center",
          transition: "transform 0.7s cubic-bezier(0.39,1.26,0.51,1.01), box-shadow 0.5s"
        }}
      >
        {/* Animated SVG Aura Art */}
        <div
          style={{
            width: 72,
            height: 72,
            margin: "0 auto 1.3rem auto",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
            boxShadow: "0 0 48px #ffd20055, 0 0 92px #f7971e22",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "pulseAura 3s infinite alternate"
          }}
        >
          <svg viewBox="0 0 60 60" fill="none" style={{width: 40, height: 40}}>
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
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "#fffbe9",
          letterSpacing: "0.03em",
          marginBottom: "0.7rem",
          textShadow: "0 2px 20px #ffd20022, 0 1px 0 #f7971e77"
        }}>
          Connect with your Aura
        </h2>
        <p style={{
          fontSize: "1.08rem",
          color: "#d7eaff",
          marginBottom: "1.2rem"
        }}>
          Let’s begin your radiant journey.<br />
          Fill out the form and step into the Lonz Flawls Aura™ experience.
        </p>
        <div style={{marginBottom: "1.05rem"}}>
          <input
            required
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.93rem 1.1rem",
              borderRadius: "1.2rem",
              border: "1.2px solid #ffd20066",
              background: "rgba(255,255,255,0.22)",
              fontSize: "1.04rem",
              marginBottom: "1.05rem",
              color: "#2c5364",
              boxShadow: "0 2px 10px #ffd20011",
              outline: "none",
              transition: "border 0.3s, box-shadow 0.3s",
            }}
            onFocus={e => e.target.style.border = "1.7px solid #ffd200"}
            onBlur={e => e.target.style.border = "1.2px solid #ffd20066"}
          />
          <input
            required
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.93rem 1.1rem",
              borderRadius: "1.2rem",
              border: "1.2px solid #ffd20066",
              background: "rgba(255,255,255,0.22)",
              fontSize: "1.04rem",
              marginBottom: "1.05rem",
              color: "#2c5364",
              boxShadow: "0 2px 10px #ffd20011",
              outline: "none",
              transition: "border 0.3s, box-shadow 0.3s",
            }}
            onFocus={e => e.target.style.border = "1.7px solid #ffd200"}
            onBlur={e => e.target.style.border = "1.2px solid #ffd20066"}
          />
          <textarea
            required
            name="message"
            rows={4}
            placeholder="Your message"
            value={form.message}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.93rem 1.1rem",
              borderRadius: "1.2rem",
              border: "1.2px solid #ffd20066",
              background: "rgba(255,255,255,0.22)",
              fontSize: "1.04rem",
              marginBottom: "1.09rem",
              color: "#2c5364",
              boxShadow: "0 2px 10px #ffd20011",
              outline: "none",
              resize: "vertical",
              transition: "border 0.3s, box-shadow 0.3s",
              minHeight: 80,
              maxHeight: 220
            }}
            onFocus={e => e.target.style.border = "1.7px solid #ffd200"}
            onBlur={e => e.target.style.border = "1.2px solid #ffd20066"}
          />
        </div>
        <button
          type="submit"
          style={{
            fontSize: "1.1rem",
            fontWeight: "700",
            color: "#2c3e50",
            border: "none",
            padding: "0.9rem 2.2rem",
            borderRadius: "1.4rem",
            background: "linear-gradient(90deg, #ffd200 0%, #f7971e 100%)",
            boxShadow: "0 3px 16px #ffd20044",
            cursor: "pointer",
            textShadow: "0 1px 0 #fff8",
            transition: "background 0.5s, transform 0.2s"
          }}
          onMouseOver={e => e.currentTarget.style.transform = "scale(1.07)"}
          onMouseOut={e => e.currentTarget.style.transform = "scale(1.0)"}
        >
          {submitted ? "Sent!" : "Send Message"}
        </button>
        {submitted && (
          <div style={{
            marginTop: "1.3rem",
            color: "#ffd200",
            fontWeight: "700",
            fontSize: "1.09rem",
            letterSpacing: "0.01em",
            opacity: 0.95,
            transition: "opacity 0.6s"
          }}>
            Thank you for connecting. Your Aura shines bright!
          </div>
        )}
      </form>
    </div>
  );
}