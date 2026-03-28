import React from "react";

const HeroBg = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      
      {/* Desktop / Laptop Video */}
      <video
        className="hidden md:block w-full h-full object-cover"
        src="/videos/hero-desktop.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Mobile Video */}
      <video
        className="block md:hidden w-full h-full object-cover"
        src="/videos/hero-phone.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

    </section>
  );
};

export default HeroBg;
