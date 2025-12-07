import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Updated Data: Working Process Steps
const processSteps = [
  {
    number: "01",
    title: "Requirement Understanding",
    desc: "We begin by diving deep into your vision. We analyze your goals, target audience, and current challenges to ensure we are building the right solution for your business needs.",
    color: "text-[#ff9f20]", 
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600" // Meeting/Discussion
  },
  {
    number: "02",
    title: "Research & Strategy",
    desc: "Data-driven decisions are our forte. We conduct competitor analysis and market research to craft a comprehensive roadmap and strategy that guarantees success.",
    color: "text-[#0078f0]", 
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600" // Planning/Strategy
  },
  {
    number: "03",
    title: "Design & Content",
    desc: "Visual storytelling meets user experience. Our designers create stunning UI/UX wireframes while our copywriters craft compelling content that speaks your brand voice.",
    color: "text-[#ff9f20]", 
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600" // Design/Art
  },
  {
    number: "04",
    title: "Development & Execution",
    desc: "This is where magic happens. We code using scalable, modern technologies (React, Node, etc.) ensuring your platform is fast, secure, and responsive across all devices.",
    color: "text-[#0078f0]", 
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600" // Coding
  },
  {
    number: "05",
    title: "Testing & Optimization",
    desc: "Perfection is in the details. We perform rigorous QA testing, fix bugs, optimize performance, and ensure SEO readiness before the product ever sees the light of day.",
    color: "text-[#ff9f20]", 
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600" // Analytics/Testing
  },
  {
    number: "06",
    title: "Final Delivery & Support",
    desc: "We don't just launch and leave. After successful deployment, we provide training, documentation, and ongoing support to ensure your continued growth.",
    color: "text-[#0078f0]", 
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600" // Handshake/Success
  }
];

export default function WorkingProcess() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    
    let ctx = gsap.context(() => {
      
      // Central Line Animation
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: container,
            start: 'top 60%', 
            end: 'bottom 80%',
            scrub: 0.5,
          }
        }
      );

      // Card Items Animation
      const items = gsap.utils.toArray('.process-item');
      
      items.forEach((item) => {
        gsap.fromTo(item, 
          { autoAlpha: 0, y: 50 }, 
          { 
            autoAlpha: 1, 
            y: 0, 
            duration: 0.8,
            ease: 'power3.out',
            willChange: 'transform, opacity', 
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse' 
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#050505] py-24 px-4 overflow-hidden relative" id="work">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#ff9f20]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[#0078f0]/5 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
        <h2 className="text-[#ff9f20] font-bold tracking-[0.2em] uppercase text-sm mb-4">
          How We Work
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white">
          Our Streamlined <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9f20] to-[#0078f0]">
            Working Process
          </span>
        </h3>
        <p className="mt-4 text-gray-400 text-lg">
          From concept to completion, we follow a structured approach to ensure quality and efficiency.
        </p>
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto relative min-h-[100vh]">
        
        {/* --- CENTRAL LINE --- */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 rounded-full" />
        <div 
          ref={lineRef}
          className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#ff9f20] via-[#ff9f20] to-[#0078f0] -translate-x-1/2 rounded-full shadow-[0_0_15px_#ff9f20]"
          style={{ 
            height: '100%', 
            transformOrigin: 'top center', 
            transform: 'scaleY(0)', 
            willChange: 'transform' 
          }} 
        />

        {/* --- PROCESS STEPS --- */}
        <div className="space-y-16 md:space-y-24 pb-20">
          {processSteps.map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <div 
                key={i} 
                className={`process-item relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                style={{ opacity: 0 }} 
              >
                
                {/* 1. CONTENT SIDE */}
                <div className="flex-1 w-full pl-12 md:pl-0 md:px-12 mb-6 md:mb-0">
                  <div className={`p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:border-[#ff9f20]/30 transition-all duration-300 group ${isEven ? 'md:text-right' : 'text-left'}`}>
                    
                    {/* --- STEP NUMBER --- */}
                    <span className={`text-6xl font-black opacity-[0.07] absolute -top-6 ${isEven ? 'right-4 md:left-4' : 'right-4'} ${item.color} select-none pointer-events-none font-sans`}>
                      {item.number}
                    </span>
                    
                    <h4 className={`text-2xl font-bold text-white mb-2 relative z-10 ${item.color}`}>
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed relative z-10">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* 2. CENTER DOT */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#050505] border-2 border-white/20 z-20 shadow-[0_0_10px_black]">
                  <div className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-[#ff9f20]' : 'bg-[#0078f0]'} animate-pulse`} />
                </div>

                {/* 3. IMAGE SIDE */}
                <div className="flex-1 w-full pl-12 md:pl-0 md:px-12">
                  <div className="relative rounded-2xl overflow-hidden aspect-video group border border-white/10 shadow-2xl transform-gpu">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10" />
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      loading="lazy"
                      width="600"
                      height="337"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0 will-change-transform"
                    />
                    <div className="md:hidden absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-white font-bold text-sm border border-white/10">
                      Step {item.number}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}