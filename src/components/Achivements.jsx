import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Data bahar rakha hai taaki re-render pe recreate na ho
const milestones = [
  {
    year: "2020",
    title: "The Inception",
    desc: "Started with a single laptop and a vision in a small garage in Indore. We secured our first 10 local clients within 3 months.",
    color: "text-[#ff9f20]", 
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"
  },
  {
    year: "2021",
    title: "Scaling Up",
    desc: "Expanded to a team of 10. Delivered 50+ websites and hit the milestone of ₹1 Cr in ad spends managed for clients.",
    color: "text-[#0078f0]", 
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600"
  },
  {
    year: "2023",
    title: "National Recognition",
    desc: "Awarded 'Best Emerging Agency'. Partnered with 50+ Brands across India. Opened our new HQ with a team of 25+ creative minds.",
    color: "text-[#ff9f20]", 
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600"
  },
  {
    year: "2025",
    title: "Global Impact",
    desc: "Crossed 1600+ Projects. Serving clients in 4 countries. Launched our proprietary AI-marketing tools. The sky is just the beginning.",
    color: "text-[#0078f0]", 
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600"
  }
];

export default function AchievementTimeline() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    
    let ctx = gsap.context(() => {
      
      // 1. OPTIMIZED LINE ANIMATION (ScaleY instead of Height)
      // Height animation causes "Layout Thrashing" (Lag). ScaleY is GPU only.
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          force3D: true, // Force GPU
          scrollTrigger: {
            trigger: container,
            start: 'top 60%', 
            end: 'bottom 80%',
            scrub: 0.5, // Thoda smoothing add kiya jerky scroll bachane ke liye
          }
        }
      );

      // 2. Milestone Cards Animation
      const items = gsap.utils.toArray('.milestone-item');
      
      items.forEach((item) => {
        // 'autoAlpha' is better than 'opacity' (sets visibility:hidden automatically)
        gsap.fromTo(item, 
          { autoAlpha: 0, y: 50 }, 
          { 
            autoAlpha: 1, 
            y: 0, 
            duration: 0.8,
            ease: 'power3.out',
            // Will-change hint browser ko pehle se batata hai
            willChange: 'transform, opacity', 
            scrollTrigger: {
              trigger: item,
              start: 'top 85%', // Thoda jaldi dikhana start kiya
              toggleActions: 'play none none reverse' 
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#050505] py-24 px-4 overflow-hidden relative">
      
      {/* Background Glows (Optimized: content-visibility) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#ff9f20]/5 rounded-full blur-[100px] will-change-transform" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[#0078f0]/5 rounded-full blur-[100px] will-change-transform" />
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
        <h2 className="text-[#ff9f20] font-bold tracking-[0.2em] uppercase text-sm mb-4">
          Our Journey
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white">
          From Humble Beginnings to <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9f20] to-[#0078f0]">
            Market Leaders
          </span>
        </h3>
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto relative min-h-[100vh]">
        
        {/* --- CENTRAL LINE (Optimized) --- */}
        {/* Static Background Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 rounded-full" />
        
        {/* Animated Gradient Line */}
        <div 
          ref={lineRef}
          className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#ff9f20] via-[#ff9f20] to-[#0078f0] -translate-x-1/2 rounded-full shadow-[0_0_15px_#ff9f20]"
          style={{ 
            height: '100%', // Height full rakho
            transformOrigin: 'top center', // Scale upar se niche hoga
            transform: 'scaleY(0)', // Initially 0
            willChange: 'transform' // Browser hint
          }} 
        />

        {/* --- MILESTONE CARDS --- */}
        <div className="space-y-16 md:space-y-24 pb-20">
          {milestones.map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <div 
                key={i} 
                className={`milestone-item relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                style={{ opacity: 0 }} 
              >
                
                {/* 1. CONTENT SIDE */}
                <div className="flex-1 w-full pl-12 md:pl-0 md:px-12 mb-6 md:mb-0">
                  <div className={`p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:border-[#ff9f20]/30 transition-all duration-300 group ${!isEven ? 'md:text-right' : 'text-left'}`}>
                    <span className={`text-5xl font-black opacity-10 absolute top-2 ${!isEven ? 'right-4 md:left-4' : 'right-4'} ${item.color} select-none`}>
                      {item.year}
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

                {/* 3. IMAGE SIDE (Optimized) */}
                <div className="flex-1 w-full pl-12 md:pl-0 md:px-12">
                  <div className="relative rounded-2xl overflow-hidden aspect-video group border border-white/10 shadow-2xl transform-gpu">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      loading="lazy" // Lazy Load added
                      width="600"    // Explicit dimensions prevent layout shift
                      height="337"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0 will-change-transform"
                    />
                    {/* Year badge for Mobile */}
                    <div className="md:hidden absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-white font-bold text-sm border border-white/10">
                      {item.year}
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