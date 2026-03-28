import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const orb3 = useRef(null);

  useEffect(() => {
    // Title animation - line by line
    gsap.fromTo(titleRef.current.children,
      { y: 150, opacity: 0, rotateX: -60 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.6,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.4
      }
    );

    // Subtitle
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.4, delay: 1.4, ease: "power3.out" }
    );

    // CTA
    gsap.fromTo(ctaRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, delay: 1.8, ease: "back.out(1.7)" }
    );

    // Floating Orbs
    gsap.to(orb1.current, { y: -30, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(orb2.current, { y: 40, x: 30, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(orb3.current, { y: -50, x: -40, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, []);

  return (
    <section className="relative pt-30 min-h-screen bg-black overflow-hidden flex items-center">
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Floating Glow Orbs */}
      <div ref={orb1} className="absolute top-20 left-20 w-80 h-80 bg-[#0078f0] rounded-full blur-3xl opacity-30" />
      <div ref={orb2} className="absolute top-40 right-32 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20" />
      <div ref={orb3} className="absolute bottom-32 left-1/4 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-25" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          {/* Left Content */}
          <div>
            <h1 ref={titleRef} className="text-6xl lg:text-7xl font-black tracking-tight leading-none">
              <div className="overflow-hidden">
                <span className="inline-block text-white">WHERE</span>
              </div>
              <div className="overflow-hidden">
                <span className="inline-block text-white">VISION</span>
              </div>
              <div className="overflow-hidden">
                <span className="inline-block bg-gradient-to-r from-cyan-400 via-[#0078f0] to-purple-400 bg-clip-text text-transparent">
                  MEETS EXPERTISE
                </span>
              </div>
            </h1>

            <p ref={subtitleRef} className="mt-8 text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl">
              We are the <span className="text-[#0078f0] font-bold">Best Digital Marketing Agency</span> in Indore. 
              Our digital experts use the latest tools & technologies ensuring that we deliver 
              <span className="text-[#0078f0] font-bold"> nothing short of excellence</span>.
            </p>

            <div ref={ctaRef} className="mt-12">
              <button className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-[#0078f0] text-black font-bold text-lg rounded-full hover:scale-110 hover:shadow-2xl hover:shadow-[#0078f0]/50 transition-all duration-500 shadow-xl">
                Explore Services
              </button>
            </div>
          </div>

          {/* Right Side - Person Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow behind person */}
              <div className="absolute -inset-10 bg-[#0078f0] rounded-full blur-3xl opacity-40 animate-pulse" />
              
              <img 
                src="/images/ceo-founder.jpg" 
                alt="Digital Expert"
                className="relative z-10 w-full max-w-md rounded-3xl shadow-2xl border-4 border-zinc-800"
              />
              
              {/* Small badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#0078f0] text-black font-bold px-6 py-3 rounded-full text-sm">
                5+ Years Experience
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-10 h-16 border-2 border-zinc-700 rounded-full flex justify-center">
          <div className="w-2 h-6 bg-[#0078f0] rounded-full mt-3 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;