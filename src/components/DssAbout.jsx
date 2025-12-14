import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Trophy,
  Target,
  Rocket,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HEADING ANIMATION (Thoda jaldi trigger hoga)
      gsap.fromTo(".anim-heading", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", // Screen ke 85% pe aate hi chalega
          },
        }
      );

      // 2. IMAGE REVEAL
      gsap.fromTo(".hero-img-container",
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // 3. CARDS ANIMATION (Fixed: Ab visible honge)
      // Hum 'fromTo' use kar rahe hain taaki state guarantee rahe
      gsap.fromTo(".content-card", 
        { y: 40, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 0.6, // Fast animation
          stagger: 0.1, // Jaldi ek ke baad ek aayenge
          ease: "power1.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 95%", // Screen ke bottom touch karte hi start hoga (No Waiting)
            toggleActions: "play none none none", // Sirf ek baar play hoga smooth rehne ke liye
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-32 bg-[#050505] text-white overflow-hidden"
    >
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* --- TOP SECTION: HEADING & IMAGE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          
          {/* Left: Heading */}
          <div className="anim-heading opacity-0"> {/* Initial opacity 0 handle kiya CSS se */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF9F20]/30 bg-[#FF9F20]/10 text-xs font-bold uppercase tracking-widest text-[#FF9F20] mb-6">
              <MapPin size={12} />
              Indore, Madhya Pradesh
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] mb-6 tracking-tight">
              We Are The Best <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                Digital Marketing Company
              </span>
              <span className="block mt-2">in Indore.</span>
            </h1>

            <p className="text-lg text-gray-400 max-w-lg leading-relaxed border-l-2 border-blue-600 pl-6">
              Transforming brands with data-driven strategies and creative innovation for over 7 years.
            </p>
          </div>

          {/* Right: Hero Image */}
          <div className="hero-img-container opacity-0 relative rounded-2xl overflow-hidden aspect-video lg:aspect-auto lg:h-[400px] border border-white/10 shadow-2xl group">
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
             <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
              alt="Digital Marketing Team"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Badge */}
            <div className="absolute bottom-5 right-5 z-20 bg-black/80 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10 shadow-lg">
                <span className="block text-3xl font-bold text-white">7+</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Years Experience</span>
            </div>
          </div>
        </div>

        {/* --- CONTENT CARDS SECTION --- */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Legacy & Expertise */}
          <div className="content-card opacity-0 group relative p-8 bg-[#111] border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2">
           
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                <Trophy size={24} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4">Leading Expertise</h3>
            <p className="text-sm text-gray-400 leading-7">
              Our <span className="text-white font-semibold">7-year-old</span> digital marketing company provides leading services in Indore, where we've delivered real growth to major brands through social media marketing, SEO, and creative marketing. For every service, we have expert professionals who leverage the latest innovations to elevate your brand.
            </p>
          </div>

          {/* Card 2: Strategy & ROI */}
          <div className="content-card opacity-0 group relative p-8 bg-[#111] border border-white/5 rounded-2xl hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-2">
           

            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6">
                <Target size={24} />
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Customized Campaigns</h3>
            <p className="text-sm text-gray-400 leading-7">
              We create customized digital marketing campaigns—from top <span className="text-white font-semibold">Google rankings</span> through SEO, brand awareness through social media, and <span className="text-white font-semibold">measurable ROI</span> through performance campaigns. Our focus isn't just on leads, but on driving sustainable growth for your business.
            </p>
          </div>

          {/* Card 3: Competitive Edge */}
          <div className="content-card opacity-0 group relative p-8 bg-[#111] border border-white/5 rounded-2xl hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-2">
           

            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                <Rocket size={24} />
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Competitive Edge</h3>
            <p className="text-sm text-gray-400 leading-7">
              Choose our digital marketing company in Indore to make your business strong and competitive. <span className="text-white font-semibold">Professional strategies</span>, results-focused approach, and innovation are our signature tools that will give your brand a new identity in the digital world.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}