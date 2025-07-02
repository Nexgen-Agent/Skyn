// frontend/src/index.js
// Lonz Flawls Aura™ Entry — Futurism meets beauty

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

// Aura: Animated background layer injected at root
function AuraBackground() {
  React.useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "aura-particles";
    Object.assign(canvas.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0,
      opacity: 0.23,
      pointerEvents: "none",
    });
    document.body.appendChild(canvas);

    let width = window.innerWidth, height = window.innerHeight;
    let particles = [];
    const ctx = canvas.getContext("2d");

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", resize);
    resize();
    for (let i = 0; i < 42; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1.2 + Math.random() * 2.1,
        dx: -0.4 + Math.random() * 0.8,
        dy: -0.4 + Math.random() * 0.8,
        hue: 32 + Math.random() * 94,
      });
    }
    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `hsla(${p.hue}, 97%, 70%, 0.29)`;
        ctx.shadowColor = `hsla(${p.hue}, 97%, 80%, 0.47)`;
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

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      document.body.removeChild(canvas);
    };
  }, []);
  return null;
}

// Aura: Glowing animated gradient overlay
function AuraGradientOverlay() {
  React.useEffect(() => {
    const overlay = document.createElement("div");
    overlay.className = "aura-gradient-overlay";
    Object.assign(overlay.style, {
      pointerEvents: "none",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 1,
      background:
        "radial-gradient(ellipse at 30% 30%, #78ffd6 0%, transparent 60%)," +
        "radial-gradient(ellipse at 70% 60%, #a8ff78 0%, transparent 70%)," +
        "radial-gradient(circle at 80% 10%, #f5576c 0%, transparent 70%)",
      mixBlendMode: "lighten",
      opacity: 0.60,
      animation: "auraGradientMove 14s linear infinite alternate",
    });
    document.body.appendChild(overlay);

    // Add keyframes to document head if not present
    if (!document.getElementById("aura-gradient-keyframes")) {
      const style = document.createElement("style");
      style.id = "aura-gradient-keyframes";
      style.innerHTML = `
        @keyframes auraGradientMove {
          0%   { background-position: 0% 0%, 100% 100%, 100% 0%; }
          100% { background-position: 100% 100%, 0% 0%, 0% 100%; }
        }
      `;
      document.head.appendChild(style);
    }

    // Cleanup
    return () => document.body.removeChild(overlay);
  }, []);
  return null;
}

// Entrypoint render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuraBackground />
    <AuraGradientOverlay />
    <App />
  </React.StrictMode>
);

// (Optional) For performance analytics
// import reportWebVitals from './reportWebVitals';
// reportWebVitals(console.log);