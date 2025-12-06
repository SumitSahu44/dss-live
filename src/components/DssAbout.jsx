import React, { useEffect, useRef } from 'react';
import gsap from 'https://esm.sh/gsap';
import { ScrollTrigger } from 'https://esm.sh/gsap/ScrollTrigger';
import { MapPin, ArrowUpRight, Users, Monitor, Briefcase, Trophy } from 'lucide-react';
import { HashLink } from "react-router-hash-link";
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Years Experience", value: 5, suffix: "+", icon: Trophy, color: "text-yellow-500" },
  { label: "Projects Completed", value: 1600, suffix: "+", icon: Briefcase, color: "text-blue-500" },
  { label: "Happy Clients", value: 950, suffix: "+", icon: Users, color: "text-green-500" },
  { label: "Ad Budget Managed", value: 10, suffix: " Cr+", icon: ArrowUpRight, color: "text-orange-500" },
  { label: "Websites Built", value: 350, suffix: "+", icon: Monitor, color: "text-purple-500" },
  { label: "Team Experts", value: 30, suffix: "+", icon: Users, color: "text-pink-500" },
  { label: "Active Clients", value: 120, suffix: "+", icon: Users, color: "text-cyan-500" },
  { label: "Industries Served", value: 40, suffix: "+", icon: Briefcase, color: "text-indigo-500" },
];

export default function AboutSection() {
  const containerRef = useRef(null);
  const counterRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Text Animation
      gsap.from(".reveal-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      // 2. Stats Counter Animation
      counterRefs.current.forEach((el, index) => {
        if (!el) return;
        const targetValue = stats[index].value;
        
        gsap.to(el, {
            innerText: targetValue,
            duration: 2,
            snap: { innerText: 1 }, // Integers only
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
            },
            onUpdate: function() {
                el.innerHTML = Math.ceil(this.targets()[0].innerText) + stats[index].suffix;
            }
        });
      });

      // 3. Image Parallax
      gsap.to(".about-image", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="relative py-24 px-4 md:px-8 bg-[#050505] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0078f0]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ff9f20]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- TOP SECTION: CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
            
            {/* Left: Text Content */}
            <div>
                <div className="reveal-text inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-[#ff9f20] mb-6">
                    <MapPin size={14} />
                    Based in Indore, India
                </div>
                
                <h2 className="reveal-text text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                    We Don't Just Build <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
                        We Accelerate Growth.
                    </span>
                </h2>
                
                <p className="reveal-text text-gray-400 text-lg leading-relaxed mb-6">
                    <span className="text-white font-semibold">Digital Success Solutions</span> is a creative powerhouse tailored for bold startups and established brands. We merge data-driven performance with compelling storytelling.
                </p>

                <p className="reveal-text text-gray-500 leading-relaxed mb-8">
                    From crafting your first pixel-perfect website to managing multi-crore ad budgets, we are the engine behind your digital dominance. We turn casual visitors into loyal customers.
                </p>

         <HashLink smooth to="/#work">
  <button className="reveal-text group relative px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-full overflow-hidden hover:scale-105 transition-transform duration-300">
    <span className="relative z-10 group-hover:text-white transition-colors">
      Explore our Works
    </span>
    <div className="absolute inset-0 bg-[#0078f0] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
  </button>
</HashLink>
               
            </div>

            {/* Right: Visual Composition */}
            <div className="relative">
                {/* Main Image Frame */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] group">
                     {/* Overlay Gradient */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10" />
                     
                     <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                        alt="Team Brainstorming" 
                        className="about-image w-full h-[120%] object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0"
                     />

                     {/* Floating Badge */}
                     <div className="absolute bottom-6 left-6 z-20 bg-black/70 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-3">
                                {[1,2,3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-600 flex items-center justify-center text-[8px] text-white">
                                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-full h-full rounded-full" alt="Team" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-white text-xs font-bold">
                                30+ Creative <br/> <span className="text-gray-400 font-normal">Minds</span>
                            </div>
                        </div>
                     </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 border border-white/20 rounded-full animate-spin-slow" />
            </div>
        </div>

        {/* --- BOTTOM SECTION: BENTO GRID STATS --- */}
        <div className="reveal-text">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0078f0]" />
                Impact by the Numbers
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div 
                            key={i} 
                            className="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-[#ff9f20]/30 hover:bg-white/[0.02] transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300">
                                <Icon size={40} />
                            </div>
                            
                            <div className={`mb-2 ${stat.color} opacity-80 group-hover:opacity-100`}>
                                <Icon size={20} />
                            </div>
                            
                            <div 
                                ref={el => counterRefs.current[i] = el}
                                className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tight"
                            >
                                0
                            </div>
                            
                            <div className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wide group-hover:text-gray-400">
                                {stat.label}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

      </div>
    </section>
  );
}