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

    // Detect screen size
    const isMobile = window.innerWidth < 768;

    // Set initial position of all stats (center hidden)
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
      zIndex: 50,
    });

    // Animate stats outward
    stats.forEach((stat, i) => {
      if (!stat) return;

      const finalX = isMobile ? stat.dataset.mobileX : stat.dataset.finalX;
      const finalY = isMobile ? stat.dataset.mobileY : stat.dataset.finalY;

      gsap.to(stat, {
        x: finalX,
        y: finalY,
        scale: 1,
        opacity: 1,
        duration: 1.8,
        delay: i * 0.12,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Title animation
    gsap.fromTo(
      ".hero-title > div",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, stagger: 0.2, ease: "power4.out" }
    );

    // CTA animation
    gsap.fromTo(
      ".hero-cta",
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1.4, ease: "back.out(2)", delay: 0.8 }
    );
  }, []);

  // Stats with mobile positions
  const stats = [
    { number: "500+", label: "Happy Clients", x: -380, y: -180, mobileX: -140, mobileY: -90 },
    { number: "8+", label: "Years Experience", x: 350, y: -160, mobileX: 120, mobileY: -90 },
    { number: "₹20Cr+", label: "Revenue Generated", x: -320, y: 200, mobileX: -120, mobileY: 80 },
    { number: "320+", label: "Projects Delivered", x: 380, y: 180, mobileX: 120, mobileY: 80 },
    { number: "10+", label: "Countries Served", x: -500, y: 20, mobileX: -150, mobileY: 10 },
    { number: "4.9", label: "Client Rating", x: 500, y: -50, mobileX: 150, mobileY: -10 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen pt-32 bg-black overflow-hidden flex flex-col items-center justify-center px-6"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#0078f0] rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Title */}
      <h1 className="hero-title text-5xl md:text-7xl font-black text-center leading-none z-20 mb-10">
        <div className="overflow-hidden">
          <span className="inline-block text-white">Creative Solutions</span>
        </div>
        <div className="overflow-hidden">
          <span className="inline-block text-white">for</span>
        </div>
        <div className="overflow-hidden">
          <span className="inline-block bg-gradient-to-r from-[#0078f0] via-cyan-400 to-[#0078f0] bg-clip-text text-transparent">
            Modern Brands.
          </span>
        </div>
      </h1>

      {/* CTA */}
      <div className="hero-cta z-20 mb-20">
        <button className="group px-12 py-6 bg-gradient-to-r from-[#0078f0] to-cyan-500 text-black font-bold text-xl rounded-full shadow-2xl hover:scale-110 hover:shadow-[#0078f0]/70 transition-all duration-500 flex items-center gap-4 mx-auto">
          Book a Call
          <svg className="w-8 h-8 group-hover:translate-x-3 transition-transform" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Image + Floating Stats */}
      <div ref={imageContainerRef} className="relative w-full max-w-6xl mx-auto z-10">
        <img
          src="/images/team-full-i.png"
          alt="Creative Team"
          className="w-full rounded-3xl shadow-2xl border-8 border-zinc-900 object-cover relative z-10"
        />

        {/* Stats */}
        {stats.map((stat, i) => (
          <div
            key={i}
            ref={(el) => (statsRef.current[i] = el)}
            data-final-x={stat.x}
            data-final-y={stat.y}
            data-mobile-x={stat.mobileX}
            data-mobile-y={stat.mobileY}
            className="absolute z-[999] bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl 
                       p-6 text-center min-w-[140px] shadow-2xl pointer-events-none"
            style={{ left: "50%", top: "50%" }}
          >
            <div className="text-5xl md:text-6xl font-black text-[#0078f0]">
              {stat.number}
            </div>
            <div className="text-white font-medium mt-2 text-sm md:text-base">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
