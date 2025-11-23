import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const stats = statsRef.current;

    gsap.set(stats, {
      x: 0,
      y: 0,
      scale: 0,
      opacity: 0,
      xPercent: -50,
      yPercent: -50,
      position: "absolute",
      left: "50%",
      top: "50%",
    });

    stats.forEach((stat, i) => {
      if (!stat) return;

      const finalX = stat.dataset.finalX;
      const finalY = stat.dataset.finalY;

      gsap.to(stat, {
        x: finalX,
        y: finalY,
        scale: 1,
        opacity: 1,
        duration: 1.6,
        delay: i * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Title & CTA
    gsap.fromTo(".hero-title > div", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, stagger: 0.2, ease: "power4.out" });
    gsap.fromTo(".hero-cta", { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 1.4, ease: "back.out(2)", delay: 0.8 });
  }, []);

  const stats = [
    { number: "500+", label: "Happy Clients", x: -380, y: -180 },
    { number: "8+", label: "Years Experience", x: 360, y: -160 },
    { number: "₹20Cr+", label: "Revenue Generated", x: -340, y: 200 },
    { number: "320+", label: "Projects Delivered", x: 380, y: 180 },
    { number: "10+", label: "Countries Served", x: -500, y: 20 },
    { number: "4.9", label: "Client Rating", x: 500, y: -50 },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen pt-24 md:pt-32 bg-black overflow-hidden flex flex-col items-center justify-center px-6"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 md:top-20 left-10 md:left-20 w-80 md:w-96 h-80 md:h-96 bg-[#0078f0] rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-72 md:w-80 h-72 md:h-80 bg-orange-600 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Title */}
      <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-black text-center leading-none z-20 mb-10 max-w-5xl">
        <div className="overflow-hidden"><span className="inline-block text-white">Creative Solutions</span></div>
        <div className="overflow-hidden"><span className="inline-block text-white">for</span></div>
        <div className="overflow-hidden">
          <span className="inline-block bg-gradient-to-r from-[#0078f0] via-cyan-400 to-[#0078f0] bg-clip-text text-transparent">
            Modern Brands.
          </span>
        </div>
      </h1>

      {/* CTA */}
      <div className="hero-cta z-20 mb-16 md:mb-20">
        <button className="group px-10 md:px-12 py-5 md:py-6 bg-gradient-to-r from-[#0078f0] to-cyan-500 text-black font-bold text-lg md:text-xl rounded-full shadow-2xl hover:scale-110 hover:shadow-[#0078f0]/70 transition-all duration-500 flex items-center gap-4 mx-auto">
          Book a Call
          <svg className="w-7 h-7 md:w-8 md:h-8 group-hover:translate-x-3 transition-transform" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Image + Floating Stats */}
      <div ref={imageContainerRef} className="relative w-full max-w-6xl mx-auto z-10">
        <img
          src="/images/3d.png"
          alt="Creative Team"
          className="w-full rounded-3xl shadow-2xl border-8 border-zinc-900 object-cover relative z-10"
        />

        {/* Floating Stats - Fully Responsive */}
        {stats.map((stat, i) => (
          <div
            key={i}
            ref={(el) => (statsRef.current[i] = el)}
            data-final-x={stat.x}
            data-final-y={stat.y}
            className="absolute z-[999] bg-white/10 backdrop-blur-xl border border-white/20 
                       rounded-2xl p-4 md:p-6 text-center shadow-2xl pointer-events-none
                       min-w-[110px] md:min-w-[140px] 
                       hidden md:block" // Mobile pe hide (optional)
            style={{ left: "50%", top: "50%" }}
          >
            <div className="text-3xl md:text-5xl font-black text-[#0078f0] leading-tight">
              {stat.number}
            </div>
            <div className="text-white font-medium text-xs md:text-sm mt-1 leading-tight">
              {stat.label}
            </div>
          </div>
        ))}

        {/* Mobile Stats - Neat Bottom Row (Only on Mobile) */}
        <div className="md:hidden grid grid-cols-3 gap-3 mt-8 px-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center shadow-xl"
            >
              <div className="text-2xl font-black text-[#0078f0]">{stat.number}</div>
              <div className="text-white text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;