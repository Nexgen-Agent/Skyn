import React, { useRef, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import ProductCard from './Components/ProductCard';
import { useLocation } from 'react-router';

// Aura luxury palette
const auraColors = {
  background: "linear-gradient(120deg, #0f2027 0%, #2c5364 65%, #ffecd2 100%)",
  sectionTitle: "#ffd200",
  sectionSub: "#f7971e",
  card: "rgba(255,255,255,0.15)"
};

function AuraParticles() {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
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
    for (let i = 0; i < 46; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1.3 + Math.random() * 2.3,
        dx: -0.4 + Math.random() * 0.8,
        dy: -0.4 + Math.random() * 0.8,
        hue: 40 + Math.random() * 70
      });
    }
    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `hsla(${p.hue}, 98%, 65%, 0.41)`;
        ctx.shadowColor = `hsla(${p.hue}, 98%, 80%, 0.7)`;
        ctx.shadowBlur = 13;
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

const Recommendations = () => {
  const { state } = useLocation();
  const { data } = state || {};
  const { general = {}, makeup = [] } = data || {};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: auraColors.background,
        paddingTop: "2vh",
        fontFamily: "'Poppins','Segoe UI',Arial,sans-serif",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <AuraParticles />
      {/* Animated SVG Glow Accent */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, width: "100vw", height: "100vh",
        pointerEvents: "none", zIndex: 1,
        mixBlendMode: "lighten",
        background: `radial-gradient(ellipse at 30% 30%, #78ffd6 0%, transparent 60%),
                     radial-gradient(ellipse at 70% 60%, #a8ff78 0%, transparent 70%),
                     radial-gradient(circle at 80% 10%, #f5576c 0%, transparent 70%)`,
        opacity: 0.5,
        animation: "auraGradientMove 13s linear infinite alternate"
      }} />
      <style>{`
        @keyframes auraGradientMove {
          0%{ background-position: 0% 0%, 100% 100%, 100% 0%; }
          100%{ background-position: 100% 100%, 0% 0%, 0% 100%; }
        }
        .aura-section-title {
          position: relative;
          display: inline-block;
          letter-spacing: 0.03em;
          padding-bottom: 0.4rem;
        }
        .aura-section-title::after {
          content: "";
          position: absolute;
          left: 50%; transform: translateX(-50%);
          bottom: 0;
          width: 60%;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, #ffd200 0%, #f7971e 100%);
          box-shadow: 0 2px 12px #ffd20066;
        }
        .aura-card-glass {
          background: rgba(255,255,255,0.15) !important;
          border-radius: 32px !important;
          box-shadow: 0 8px 36px 0 rgba(31,38,135,0.28) !important;
          border: 1.5px solid rgba(255,255,255,0.20) !important;
          backdrop-filter: blur(17px) saturate(130%) !important;
          -webkit-backdrop-filter: blur(17px) saturate(130%) !important;
          transition: box-shadow 0.7s, background 0.7s;
        }
        .aura-card-glass:hover {
          box-shadow: 0 20px 64px #ffd20055, 0 4px 60px #f7971e22 !important;
          background: rgba(255,255,255,0.22) !important;
        }
      `}</style>
      <Container
        className="aura-card-glass"
        sx={{
          marginTop: 6,
          padding: { xs: 2, md: 4 },
        }}
        alignitems="center"
        maxWidth="md"
      >
        {/* Skin Care Section */}
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          textAlign="center"
          sx={{
            color: auraColors.sectionTitle,
            fontWeight: 800,
            letterSpacing: "0.04em",
            marginTop: "2vh",
            marginBottom: "0.7em"
          }}
          className="aura-section-title"
        >
          Skin Care
        </Typography>
        {Object.keys(general).map(type => (
          <div key={type}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color={auraColors.sectionSub}
              marginTop="2vh"
              sx={{ fontWeight: 700, letterSpacing: "0.018em" }}
              style={{
                background: "linear-gradient(90deg, #ffd200 0%, #f7971e 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 2px 24px #ffd20045)"
              }}
            >
              {type}
            </Typography>
            <Grid container spacing={2}>
              {(general[type] || []).slice(0, 4).map((prod, idx) => (
                <Grid item xs={12} sm={6} md={3} key={prod.name + idx}>
                  <ProductCard
                    name={prod.name}
                    brand={prod.brand}
                    image={prod.img}
                    price={prod.price}
                    url={prod.url}
                    concern={prod.concern}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ))}

        {/* Make Up Section */}
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          textAlign="center"
          sx={{
            color: auraColors.sectionTitle,
            fontWeight: 800,
            letterSpacing: "0.04em",
            marginTop: "3vh",
            marginBottom: "0.7em"
          }}
          className="aura-section-title"
        >
          Make Up
        </Typography>
        <FormLabel component="legend" sx={{ marginBottom: 2, color: auraColors.sectionSub }}></FormLabel>
        <Grid container spacing={2}>
          {(makeup || []).map((prod, idx) => (
            <Grid item xs={12} sm={6} md={3} key={prod.name + idx}>
              <ProductCard
                name={prod.name}
                brand={prod.brand}
                image={prod.img}
                price={prod.price}
                url={prod.url}
                concern={prod.concern}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Recommendations;