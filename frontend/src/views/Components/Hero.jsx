import React from "react";

function Hero() {
  return (
    <section className="w-full min-h-[90vh] flex flex-col items-center justify-center py-20 bg-gradient-to-br from-[#fff1e0] via-[#f9e6f9] to-[#f5eafd] relative overflow-hidden font-poppins">
      {/* Glassmorphism effect with gentle floating animation */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl h-[300px] bg-white bg-opacity-45 rounded-3xl shadow-2xl backdrop-blur-xl z-0 animate-aura-float"
        aria-hidden="true"
      ></div>

      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1
          className="text-5xl md:text-7xl font-extrabold text-[#6B0F1A] drop-shadow-xl mb-6 tracking-tight animate-fade-in"
          aria-label="Lonz Flawless Aura"
        >
          Lonz Flawless Aura
        </h1>
        <p className="text-xl md:text-2xl text-[#7c2d4a] mb-8 font-medium max-w-2xl text-center animate-fade-in delay-150">
          Elevate your beauty experience with our luxurious, flawless touch.<br />
          Discover the art of self-care reimagined for the modern connoisseur.
        </p>
        <a
          href="#services"
          className="px-8 py-3 bg-gradient-to-r from-[#6B0F1A] to-[#9b2246] text-white rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-[#9b2246]/40 animate-fade-in delay-300"
          tabIndex={0}
        >
          Explore Services
        </a>
      </div>

      {/* Aura Animations */}
      <style>
        {`
        @keyframes aura-float {
          0% { transform: translateX(-50%) translateY(0) scale(1);}
          100% { transform: translateX(-50%) translateY(-18px) scale(1.03);}
        }
        .animate-aura-float {
          animation: aura-float 5.6s cubic-bezier(.61,.1,0,1.01) infinite alternate;
        }
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1.1s ease forwards;
        }
        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        `}
      </style>
    </section>
  );
}

export default Hero;