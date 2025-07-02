import React from "react";

// Lonz Flawls Aura™ - Futuristic Product Card
export default function ProductCard({
  image,
  title,
  description,
  price,
  onClick,
  cta = "Glow Up"
}) {
  return (
    <div className="aura-product-card" onClick={onClick}>
      <div className="aura-card-bg-art">
        <svg viewBox="0 0 200 200" width="100%" height="100%">
          <defs>
            <radialGradient id="aura-grad" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#ffd200" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#f7971e" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#2c5364" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <ellipse
            cx="100"
            cy="110"
            rx="90"
            ry="80"
            fill="url(#aura-grad)"
            opacity="0.18"
          />
        </svg>
      </div>
      <div className="aura-product-img">
        <img src={image} alt={title} />
        <div className="aura-img-glow" />
      </div>
      <div className="aura-product-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="aura-product-meta">
          <span className="aura-price">${price}</span>
          <button className="aura-cta">{cta}</button>
        </div>
      </div>
      <style>{`
        .aura-product-card {
          position: relative;
          background: rgba(255,255,255,0.14);
          border-radius: 2.2rem;
          box-shadow: 0 4px 44px 0 rgba(31,38,135,0.28);
          border: 1.4px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(14px) saturate(135%);
          -webkit-backdrop-filter: blur(14px) saturate(135%);
          overflow: hidden;
          transition: transform 0.55s cubic-bezier(0.39,1.26,0.51,1.01), box-shadow 0.45s;
          max-width: 320px;
          margin: 2.5rem auto;
          cursor: pointer;
          z-index: 1;
        }
        .aura-product-card:hover {
          transform: scale(1.04) rotateY(2deg);
          box-shadow: 0 16px 64px #ffd20055, 0 4px 60px #f7971e13;
        }
        .aura-card-bg-art {
          position: absolute;
          top: -55px; left: -48px; width: 130%; height: 170px;
          pointer-events: none;
          z-index: 0;
          filter: blur(0.5px) brightness(1.16);
        }
        .aura-product-img {
          position: relative;
          width: 100%;
          height: 170px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .aura-product-img img {
          height: 128px;
          width: auto;
          object-fit: contain;
          border-radius: 1.7rem;
          box-shadow: 0 3px 28px #ffd20046, 0 0 0 #fff0;
          transition: box-shadow 0.35s;
          background: linear-gradient(120deg,#fffbe9 70%,#ffe3a3 100%);
        }
        .aura-product-card:hover .aura-product-img img {
          box-shadow: 0 6px 44px #ffd20099, 0 0 0 #fff0;
        }
        .aura-img-glow {
          pointer-events: none;
          position: absolute;
          left: 50%; top: 60%;
          transform: translate(-50%, -50%);
          width: 90px; height: 40px;
          background: radial-gradient(circle, #ffd20055, transparent 80%);
          filter: blur(9px);
          z-index: 1;
        }
        .aura-product-content {
          position: relative;
          z-index: 3;
          padding: 1.3rem 1.4rem 1.5rem 1.4rem;
          text-align: center;
        }
        .aura-product-content h3 {
          font-size: 1.35rem;
          font-weight: 700;
          margin: 0.15rem 0 0.49rem 0;
          color: #fffbe9;
          letter-spacing: 0.03em;
          text-shadow: 0 2px 20px #ffd20022, 0 1px 0 #f7971e77;
          transition: color 0.2s;
        }
        .aura-product-content p {
          font-size: 1rem;
          color: #d7eaff;
          margin: 0 0 1.15rem 0;
          line-height: 1.6;
          min-height: 48px;
        }
        .aura-product-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.2rem;
        }
        .aura-price {
          font-size: 1.13rem;
          font-weight: 700;
          color: #ffd200;
          text-shadow: 0 1px 7px #2c536455, 0 1px 0 #fff7;
        }
        .aura-cta {
          font-size: 1rem;
          font-weight: 600;
          color: #2c3e50;
          border: none;
          padding: 0.65rem 1.5rem;
          border-radius: 1.3rem;
          background: linear-gradient(90deg, #ffd200 0%, #f7971e 100%);
          box-shadow: 0 2px 12px #ffd20044;
          cursor: pointer;
          transition: background 0.4s, transform 0.19s;
          text-shadow: 0 1px 0 #fff9;
        }
        .aura-cta:hover {
          background: linear-gradient(90deg, #f7971e 0%, #ffd200 100%);
          transform: scale(1.07) translateY(-2px);
        }
        @media (max-width: 400px) {
          .aura-product-card { max-width: 96vw; }
        }
      `}</style>
    </div>
  );
}