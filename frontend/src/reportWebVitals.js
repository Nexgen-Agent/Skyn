// reportWebVitals.js
// Lonz Flawls Aura™ | Skyn
// Futuristic, artistic Web Vitals Reporter
// To use: import and call reportWebVitals(auraVitalsArt);

const AURA_COLORS = {
  background: "rgba(255, 241, 224, 0.97)",
  accent: "linear-gradient(90deg,#ffd200 0%,#f7971e 100%)",
  border: "#ffd200",
  text: "#1f1e33",
  shadow: "0 8px 32px 0 rgba(255,210,0,0.13)",
  glow: "0 0 48px 8px #ffd20066"
};

function animateAuraMetric({ name, value }) {
  // Create an animated floating metric element with glowing aura
  const metric = document.createElement("div");
  metric.innerHTML = `
    <div class="aura-vitals-icon">
      <svg width="28" height="28" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="19" fill="#fffbe9" opacity="0.95"/>
        <ellipse cx="30" cy="35" rx="12" ry="6" fill="#ffe3a3" opacity="0.72"/>
        <ellipse cx="25" cy="28" rx="2" ry="2.1" fill="#f7971e"/>
        <ellipse cx="35" cy="28" rx="2" ry="2.1" fill="#f7971e"/>
        <path d="M24 37 Q30 42 36 37" stroke="#f7971e" stroke-width="2" stroke-linecap="round" fill="none"/>
      </svg>
    </div>
    <div class="aura-vitals-text"><strong>${name}:</strong> ${Math.round(value * 100) / 100}</div>
  `;
  Object.assign(metric.style, {
    position: "fixed",
    left: "50%",
    bottom: "2.9vh",
    transform: "translate(-50%, 100px) scale(0.92)",
    background: AURA_COLORS.background,
    borderRadius: "2.2em",
    boxShadow: `${AURA_COLORS.shadow}, ${AURA_COLORS.glow}`,
    border: `2px solid ${AURA_COLORS.border}70`,
    fontFamily: "'Poppins', 'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: "1.12rem",
    padding: "0.58em 2.7em 0.58em 1.8em",
    zIndex: 9999,
    opacity: 0,
    color: AURA_COLORS.text,
    display: "flex",
    alignItems: "center",
    gap: "1.2em",
    letterSpacing: "0.02em",
    backgroundImage: AURA_COLORS.accent,
    backgroundClip: "padding-box",
    transition: "opacity 0.8s cubic-bezier(.61,.1,0,1.01), transform 1.2s cubic-bezier(.23,1.17,.41,.99)",
    filter: "drop-shadow(0 0 20px #ffd20044)"
  });
  metric.className = "aura-vitals-glass";

  // Aura icon styling
  const style = document.createElement("style");
  style.innerHTML = `
    .aura-vitals-glass {
      animation: auraGlassFadeIn 1.2s cubic-bezier(.39,1.26,.51,1.01);
      backdrop-filter: blur(12px) saturate(140%);
      -webkit-backdrop-filter: blur(12px) saturate(140%);
    }
    .aura-vitals-icon {
      display: flex; align-items: center; justify-content: center;
      width: 32px; height: 32px; border-radius: 50%;
      background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%);
      box-shadow: 0 0 22px #ffd20055, 0 0 48px #f7971e22;
      margin-right: 0.5em;
      animation: auraPulse 2.2s infinite alternate;
    }
    @keyframes auraPulse {
      0% { box-shadow: 0 0 22px #ffd20055, 0 0 48px #f7971e22; }
      100% { box-shadow: 0 0 44px #ffd200cc, 0 0 90px #f7971e33; }
    }
    @keyframes auraGlassFadeIn {
      0% { filter: blur(18px) opacity(0); }
      100% { filter: blur(0) opacity(1); }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(metric);

  // Animate in
  setTimeout(() => {
    metric.style.opacity = 1;
    metric.style.transform = "translate(-50%, 0) scale(1)";
  }, 90);

  // Animate shimmer/glow
  setTimeout(() => {
    metric.animate(
      [
        { boxShadow: `${AURA_COLORS.shadow}, ${AURA_COLORS.glow}` },
        { boxShadow: "0 8px 60px 8px #f9e6f9, 0 0 90px #ffd20055" },
        { boxShadow: `${AURA_COLORS.shadow}, ${AURA_COLORS.glow}` }
      ],
      { duration: 1600, iterations: 2 }
    );
  }, 700);

  // Animate out
  setTimeout(() => {
    metric.style.opacity = 0;
    metric.style.transform = "translate(-50%, -60px) scale(0.93)";
  }, 4100);

  // Remove from DOM and style
  setTimeout(() => {
    metric.remove();
    style.remove();
  }, 5200);
}

// Main export: preserves CRA structure, uses aura art handler by default
const reportWebVitals = (onPerfEntry = animateAuraMetric) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    import("web-vitals").then(
      ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      }
    );
  }
};

export default reportWebVitals;

// ---
// Each metric elegantly floats in, glows, and shimmers out—Aura style.
// To experience: simply call reportWebVitals() in your index.js.