import React from "react";

function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-20 bg-gradient-to-br from-[#fff1e0] via-[#f9e6f9] to-[#f5eafd] relative overflow-hidden">
      {/* Glassmorphism effect */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[90vw] max-w-4xl h-[300px] bg-white bg-opacity-40 rounded-3xl shadow-2xl backdrop-blur-xl z-0"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-bold text-[#6B0F1A] drop-shadow-lg mb-6 tracking-tight">
          Lonz Flawless Aura
        </h1>
        <p className="text-xl md:text-2xl text-[#7c2d4a] mb-8 font-medium max-w-2xl text-center">
          Elevate your beauty experience with our luxurious, flawless touch. Discover the art of self-care reimagined for the modern connoisseur.
        </p>
        <a
          href="#services"
          className="px-8 py-3 bg-[#6B0F1A] text-white rounded-full shadow-lg hover:bg-[#9b2246] transition-all font-semibold text-lg"
        >
          Explore Services
        </a>
      </div>
    </section>
  );
}

export default Hero;