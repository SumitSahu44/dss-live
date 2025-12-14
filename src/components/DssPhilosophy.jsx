import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Users, Gem, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const philosophyData = [
  {
    id: "01",
    icon: <TrendingUp size={32} />,
    title: "Guaranteed Results",
    highlight: "Maximum ROI",
    desc: "We don't just promise; we deliver measurable success. Our expert strategies are engineered to increase your brand's visibility and drive proven growth, ensuring every penny you invest yields the highest possible return.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50"
  },
  {
    id: "02",
    icon: <Users size={32} />,
    title: "Client-First Strategy",
    highlight: "Your Growth, Our Duty",
    // Adapted your Hinglish content to Professional English
    desc: "A partnership mindset where your challenges are our priority. We focus on personalized service, timely communication, and deep listening to build long-term relationships. Every decision is made with your satisfaction at the core.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "group-hover:border-orange-500/50"
  },
  {
    id: "03",
    icon: <Gem size={32} />,
    title: "Premium Services",
    highlight: "Elite Execution",
    desc: "Top-tier, 360° digital solutions including advanced SEO, targeted PPC, and high-quality content. We provide continuous optimization and expert consulting to ensure your campaigns are always aligned with your business goals.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "group-hover:border-purple-500/50"
  }
];

export default function DssPhilosophy() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Reveal
      gsap.fromTo(".phil-header", 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: { trigger: ".phil-header-container", start: "top 80%" }
        }
      );

      // 2. Cards Stagger Animation
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: ".phil-grid", start: "top 75%" }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 bg-[#050505] text-white overflow-hidden font-sans">
      
      {/* --- BACKGROUND ACCENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent opacity-50" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* --- HEADER --- */}
        <div className="phil-header-container mb-20 md:mb-24">
            <div className="phil-header flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-blue-500"></div>
                <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.3em]">Our Core DNA</span>
            </div>
            
            <h2 className="phil-header text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
                Built for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-500">
                    Maximum Impact.
                </span>
            </h2>
            
            <p className="phil-header text-zinc-400 text-lg max-w-2xl border-l-2 border-white/10 pl-6 leading-relaxed">
                A customer-friendly strategy in every decision. We take full responsibility for your growth, combining premium execution with guaranteed results.
            </p>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="phil-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyData.map((item, i) => (
                <div 
                    key={i}
                    ref={el => cardsRef.current[i] = el}
                    className={`group relative p-8 md:p-10 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:bg-[#111] transition-all duration-500 hover:-translate-y-2 ${item.border}`}
                >
                    {/* Hover Glow */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none bg-gradient-to-b from-${item.color.split('-')[1]}-500/5 to-transparent`} />

                    {/* Number */}
                    <div className="absolute top-8 right-8 text-4xl font-black text-white/5 select-none group-hover:text-white/10 transition-colors">
                        {item.id}
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                        {item.icon}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        <span className={`block text-xs font-bold uppercase tracking-widest mb-2 ${item.color}`}>
                            {item.highlight}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            {item.title}
                        </h3>
                        <p className="text-zinc-500 text-sm leading-7 group-hover:text-zinc-400 transition-colors">
                            {item.desc}
                        </p>
                    </div>

                    {/* Bottom Line */}
                    <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-${item.color.split('-')[1]}-500 to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out`} />
                </div>
            ))}
        </div>

        {/* --- BOTTOM TRUST INDICATORS --- */}
        <div className="phil-header mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center md:justify-start gap-8 md:gap-16">
            {["100% Transparency", "Data-Driven ROI", "24/7 Dedicated Support"].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
                    <CheckCircle2 size={18} className="text-blue-500" />
                    {text}
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}