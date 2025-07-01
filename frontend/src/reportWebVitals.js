// reportWebVitals.js
// Performance monitoring for Lonz Flawls Aura | Skyn
// Learn more: https://bit.ly/CRA-vitals

/**
 * Lonz Flawls Aura - Artistic Web Vitals Reporter
 * This version not only collects web vitals, but also
 * animates their display as a floating, luxurious overlay.
 * 
 * To use: import and call reportWebVitals(auraVitalsArt);
 */

const AURA_COLORS = {
  background: "rgba(255, 241, 224, 0.95)",
  accent: "#9b2246",
  text: "#6B0F1A",
  shadow: "0 8px 32px 0 rgba(155,34,70,0.08)"
};

function animateAuraMetric({ name, value }) {
  // Create an animated floating metric element
  const metric = document.createElement("div");
  metric.innerHTML = `<strong>${name}:</strong> ${Math.round(value * 100) / 100}`;
  Object.assign(metric.style, {
    position: "fixed",
    left: "50%",
    bottom: "2vh",
    transform: "translate(-50%, 100px) scale(0.9)",
    background: AURA_COLORS.background,
    color: AURA_COLORS.text,
    borderRadius: "2em",
    boxShadow: AURA_COLORS.shadow,
    border: `2px solid ${AURA_COLORS.accent}50`,
    fontFamily: "'Poppins', 'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: "1.12rem",
    padding: "0.7em 2.4em",
    zIndex: 9999,
    opacity: 0,
    transition:
      "opacity 0.8s cubic-bezier(.61,.1,0,1.01), transform 1.2s cubic-bezier(.23,1.17,.41,.99)"
  });
  document.body.appendChild(metric);

  // Animate in
  setTimeout(() => {
    metric.style.opacity = 1;
    metric.style.transform = "translate(-50%, 0) scale(1)";
  }, 100);

  // Animate subtle shimmer (work of art)
  setTimeout(() => {
    metric.animate(
      [
        { boxShadow: AURA_COLORS.shadow },
        { boxShadow: "0 8px 40px 1px #f9e6f9" },
        { boxShadow: AURA_COLORS.shadow }
      ],
      { duration: 1400, iterations: 2 }
    );
  }, 600);

  // Animate out
  setTimeout(() => {
    metric.style.opacity = 0;
    metric.style.transform = "translate(-50%, -60px) scale(0.93)";
  }, 3800);

  // Remove from DOM
  setTimeout(() => {
    metric.remove();
  }, 4800);
}

// The main export: preserves main structure.
const reportWebVitals = (onPerfEntry = animateAuraMetric) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then(
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
// To experience the animation art, simply call reportWebVitals() with no arguments
// or with your own luxury-themed handler. Each metric will elegantly float in and shimmer out.