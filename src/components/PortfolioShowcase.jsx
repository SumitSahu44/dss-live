import React, { useEffect, useRef } from "react";
// Using CDN imports
import gsap from "https://esm.sh/gsap";
import { ScrollTrigger } from "https://esm.sh/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: 1, 
    title: "Starlight Solar", 
    category: "Web Design / Dev",
    img: "/images/starlightsolar.png", 
    accent: "group-hover:shadow-blue-500/30 border-blue-500/50 text-blue-400",
    theme: "from-blue-900/20 to-transparent"
  },
  { 
    id: 2, 
    title: "Sadabahar Handloom", 
    category: "E-Commerce",
    img: "/images/sadabahaar.png", 
    accent: "group-hover:shadow-orange-500/30 border-orange-500/50 text-orange-400",
    theme: "from-orange-900/20 to-transparent"
  },
  { 
    id: 3, 
    title: "Lithoveda", 
    category: "Health & Wellness",
    img: "/images/lithoveda.png", 
    accent: "group-hover:shadow-green-500/30 border-green-500/50 text-green-400",
    theme: "from-green-900/20 to-transparent"
  },
  { 
    id: 4, 
    title: "Vanya Resort", 
    category: "Hospitality",
    img: "/images/vanya.png", 
    accent: "group-hover:shadow-purple-500/30 border-purple-500/50 text-purple-400",
    theme: "from-purple-900/20 to-transparent"
  },
  { 
    id: 5, 
    title: "Jeevan Shaadi", 
    category: "Platform",
    img: "/images/jeevanshaadi.png", 
    accent: "group-hover:shadow-pink-500/30 border-pink-500/50 text-pink-400",
    theme: "from-pink-900/20 to-transparent"
  },
  { 
    id: 6, 
    title: "Edmirai", 
    category: "EdTech",
    img: "/images/edmirai.png", 
    accent: "group-hover:shadow-cyan-500/30 border-cyan-500/50 text-cyan-400",
    theme: "from-cyan-900/20 to-transparent"
  },
];

export default function PortfolioShowcase() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Animation (Optimized with autoAlpha & force3D)
      gsap.fromTo(titleRef.current,
        { y: 50, autoAlpha: 0 }, // autoAlpha handles visibility + opacity
        { 
          y: 0, 
          autoAlpha: 1, 
          duration: 1, 
          ease: "power3.out",
          force3D: true, // Force GPU
          scrollTrigger: { 
            trigger: titleRef.current, 
            start: "top 90%"
          }
        }
      );

      // 2. Cards Stagger Entry (Optimized)
      // 'will-change' CSS class is added in render to help browser prepare
      gsap.fromTo(cardsRef.current,
        { y: 60, autoAlpha: 0, scale: 0.95 },
        {
          y: 0, 
          autoAlpha: 1, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power2.out",
          force3D: true, // Crucial for stutter-free animation
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: "top 75%" // Thoda jaldi start kiya taaki wait na karna pade
          }
        }
      );

      // 3. Progress Bar
      gsap.fromTo(progressBarRef.current, 
        { scaleX: 0, transformOrigin: "left center" },
        { 
          scaleX: 1, 
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // --- HOVER LOGIC FOR SCROLLING ---
  const handleMouseEnter = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector('.project-img');

    if (img) {
      // Calculate only once per hover to avoid layout thrashing during animation
      const scrollHeight = img.offsetHeight - card.querySelector('.viewport').offsetHeight;
      if (scrollHeight > 0) {
        gsap.to(img, {
          y: -scrollHeight,
          duration: scrollHeight / 100, // Thoda fast kiya natural feel ke liye
          ease: "none",
          overwrite: true,
          force3D: true // Smooth text rendering during movement
        });
      }
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector('.project-img');

    if (img) {
      gsap.to(img, {
        y: 0,
        duration: 0.5, // Faster return
        ease: "power2.out",
        overwrite: true,
        force3D: true
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] text-white overflow-hidden py-32 font-sans selection:bg-blue-500/30"
    >
      
      {/* --- TOP PROGRESS BAR --- */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50">
         <div 
           ref={progressBarRef} 
           className="h-full w-full bg-gradient-to-r from-[#0078f0] via-purple-500 to-[#ff9f20] shadow-[0_0_15px_rgba(0,120,240,0.5)]" 
           style={{ transform: 'scaleX(0)' }}
         />
      </div>

      {/* --- BACKGROUND AMBIENCE (Optimized: Content Visibility) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {/* Noise Overlay */}
         <div 
           className="absolute inset-0 opacity-20 mix-blend-overlay"
           style={{ 
             backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
             willChange: 'opacity' 
           }} 
         />
         
         {/* Minimal Grid */}
         <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute w-full h-full bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem]" />
         </div>

         {/* Blue Glow (Top Left) */}
         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#0078f0]/20 rounded-full blur-[120px] animate-pulse" style={{animationDuration: '8s'}} />
         
         {/* Orange Glow (Bottom Right) */}
         <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#ff9f20]/15 rounded-full blur-[120px] animate-pulse" style={{animationDuration: '10s'}} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div ref={titleRef} className="text-center mb-20 will-change-transform">
            <div className="flex items-center justify-center gap-4 text-gray-500 text-xs font-mono uppercase tracking-[0.3em] mb-6">
               <div className="w-12 h-[1px] bg-gray-700" />
               <span>Our Portfolio</span>
               <div className="w-12 h-[1px] bg-gray-700" />
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mix-blend-exclusion">
               Something<br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">Crazy.</span>
            </h2>
        </div>


        {/* --- PROJECTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative flex flex-col gap-6 will-change-transform" // IMPORTANT for performance
              style={{ opacity: 0 }} // Initial state handled by GSAP
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              
              {/* --- BROWSER FRAME CARD --- */}
              <div className={`relative w-full aspect-[4/3] bg-[#111] rounded-xl overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-opacity-50 group-hover:shadow-2xl hover:-translate-y-2 ${project.accent}`}>
                
                {/* Internal Glow Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-b ${project.theme} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Browser Header */}
                <div className="absolute top-0 left-0 w-full h-8 bg-[#0a0a0a] border-b border-white/5 flex items-center px-4 z-20">
                   <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                   </div>
                   <div className="mx-auto w-1/2 h-4 bg-white/5 rounded-full border border-white/5 group-hover:bg-white/10 transition-colors" />
                </div>

                {/* Viewport */}
                <div className="viewport absolute inset-0 top-8 bg-gray-900 overflow-hidden">
                   {/* Placeholder background while loading */}
                   <div className="absolute inset-0 bg-[#151515] -z-10" /> 
                   
                   <img 
                      src={project.img} 
                      alt={project.title}
                      loading="lazy"    // Lazy load
                      decoding="async"  // Async decode
                      width="600"       // Explicit size prevents layout shifts
                      height="800"
                      className="project-img w-full h-auto object-cover object-top will-change-transform"
                   />
                   
                   {/* Hover Overlay */}
                   <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none flex items-center justify-center">
                      <div className="px-5 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/80 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          View Case Study
                      </div>
                   </div>
                </div>

              </div>

              {/* --- PROJECT INFO --- */}
              <div className="flex justify-between items-start px-2">
                 <div>
                    <h3 className={`text-2xl md:text-3xl font-bold text-white mb-2 transition-colors duration-300 group-hover:${project.accent.split(' ').find(c => c.startsWith('text-'))}`}>
                       {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${project.accent.split(' ').find(c => c.startsWith('text-')).replace('text', 'bg')}`} />
                       <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                          {project.category}
                       </p>
                    </div>
                 </div>
                 
                 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 transform -rotate-45 group-hover:rotate-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                       <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                 </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}