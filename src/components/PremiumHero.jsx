import React, { useEffect, useRef, useState, useMemo } from 'react';
import { HashLink } from "react-router-hash-link";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const statsRef = useRef([]);
  const [isGsapReady, setIsGsapReady] = useState(false);

  // --- SAFE GSAP LOADING ---
  useEffect(() => {
    const loadGsap = async () => {
      try {
        if (window.gsap && window.ScrollTrigger) {
          setIsGsapReady(true);
          return;
        }
        const loadScript = (src) =>
          new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) return resolve();
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });

        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        setIsGsapReady(true);
      } catch (err) {
        console.error("GSAP failed", err);
      }
    };
    loadGsap();
  }, []);

  // --- STATS ---
  const stats = useMemo(() => [
    { number: "950+", label: "Happy Clients", x: -300, y: -200 },
    { number: "5+", label: "Years Experience", x: 300, y: -200 },
    { number: "1600+", label: "Projects Delivered", x: -340, y: -20 },
    { number: "40+", label: "Industries Served", x: 340, y: -20 },
    { number: "₹10Cr+", label: "Revenue Generated", x: -260, y: 140 },
    { number: "4.9★", label: "Client Rating", x: 260, y: 140 },
  ], []);

  // --- ANIMATIONS ---
  useEffect(() => {
    if (!isGsapReady || !sectionRef.current) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      statsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          x: stats[i].x,
          y: stats[i].y,
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          scale: 0.7,
          opacity: 0,
          position: "absolute",
        });
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 70%",
        }
      }).to(statsRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.4)",
      });

      statsRef.current.forEach(stat => {
        gsap.to(stat, {
          y: "+=18",
          repeat: -1,
          yoyo: true,
          duration: 3 + Math.random(),
          ease: "sine.inOut",
          delay: Math.random(),
        });
      });

      gsap.fromTo(".char-line", { y: 100, opacity: 0 }, {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1.4,
        ease: "power4.out"
      });

      gsap.fromTo(".hero-tagline", { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
      });

      gsap.fromTo(".hero-cta", { scale: 0.9, opacity: 0 }, {
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 1.2,
        ease: "back.out(1.6)"
      });
    }, sectionRef);

    setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => ctx.revert();
  }, [isGsapReady, stats]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen pt-36 overflow-hidden bg-black flex flex-col items-center px-6"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0078f0]/10 via-black to-[#ff9f20]/10 z-0" />
      <div className="absolute top-[-20%] left-[-20%] w-[700px] h-[700px] bg-[#0078f0]/30 blur-[180px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[700px] h-[700px] bg-[#ff9f20]/25 blur-[180px] rounded-full" />

      {/* HERO CONTENT */}
      <h1 className="hero-title text-center z-10 max-w-6xl mb-20">
        {/* Badge */}
        <div className="flex justify-center mb-6 overflow-hidden">
          <div className="hero-cta inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#0078f0]/40 bg-[#0078f0]/15 backdrop-blur-md text-xs tracking-widest uppercase text-[#0078f0] opacity-0">
            Creative Digital Agency
          </div>
        </div>

        {/* TAGLINE */}
        <div className="overflow-hidden">
          <div className="char-line text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
            Your Satisfaction
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="char-line text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-[#ff9f20] to-[#0078f0] bg-clip-text text-transparent">
              Is Our Success
            </span>
          </div>
        </div>

        {/* SUBTEXT */}
        <p className="hero-tagline mt-6 text-zinc-300 text-base md:text-xl max-w-3xl mx-auto">
          We design, build, and scale high-performing digital solutions that help brands grow with confidence.
        </p>

        <p className="char-line mt-4 text-zinc-500 text-sm md:text-base max-w-2xl mx-auto">
          From strategy to execution, we deliver premium digital experiences powered by innovation, technology, and results.
        </p>
      </h1>

      {/* CTA */}
      <div className="hero-cta z-10 mb-24 opacity-0">
        <HashLink smooth to="/#contact">
          <button className="px-12 py-5 rounded-full bg-[#0078f0] text-white font-bold uppercase tracking-wider transition-all duration-500 hover:scale-105 hover:bg-[#ff9f20] hover:shadow-[0_0_50px_-10px_#ff9f20]">
            Start Your Journey
          </button>
        </HashLink>
      </div>

      {/* IMAGE + STATS */}
      {/* <div ref={imageContainerRef} className="relative w-full max-w-7xl pb-32">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
            alt="Digital Agency"
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
          />
        </div>

        {stats.map((stat, i) => (
          <div
            key={i}
            ref={el => statsRef.current[i] = el}
            className="hidden md:flex flex-col items-center justify-center absolute bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 min-w-[160px] text-center shadow-2xl opacity-0"
            style={{ left: "50%", top: "50%" }}
          >
            <div className="text-4xl font-black text-white">{stat.number}</div>
            <div className="text-xs uppercase tracking-widest text-zinc-300 mt-2">
              {stat.label}
            </div>
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default HeroSection;
