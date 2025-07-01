import React from "react";
// Import your components here when created, e.g.:
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import ServiceCards from "./components/ServiceCards";
// import Footer from "./components/Footer";

function App() {
  return (
    <div
      className="min-h-screen bg-[#FAF9F6] text-[#6B0F1A] font-sans flex flex-col"
      style={{
        fontFamily: "'DM Sans', 'Poppins', sans-serif",
      }}
    >
      {/* <Navbar /> */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        {/* <Hero /> */}
        {/* <ServiceCards /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;