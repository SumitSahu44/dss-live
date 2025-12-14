import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- 1. DATA ---
const allProjects = [
  { 
    id: 1, 
    title: "Starlight Solar", 
    category: "Development", 
    displayCategory: "Web Design / Dev",
    img: "/images/starlightsolar.webp", 
    accent: "group-hover:shadow-blue-500/30 border-blue-500/50 text-blue-400",
  },
  { 
    id: 2, 
    title: "Sadabahar Handloom", 
    category: "E-Commerce",
    displayCategory: "E-Commerce Store",
    img: "/images/sadabahaar.webp", 
    accent: "group-hover:shadow-orange-500/30 border-orange-500/50 text-orange-400",
  },
  { 
    id: 3, 
    title: "Lithoveda", 
    category: "E-Commerce",
    displayCategory: "E-Commerce Store",
    img: "/images/lithoveda.webp", 
    accent: "group-hover:shadow-green-500/30 border-green-500/50 text-green-400",
  },
  { 
    id: 4, 
    title: "Vanya Resort", 
    category: "Development",
    displayCategory: "Hospitality Website",
    img: "/images/vanya.webp", 
    accent: "group-hover:shadow-purple-500/30 border-purple-500/50 text-purple-400",
  },
  { 
    id: 5, 
    title: "Jeevan Shaadi", 
    category: "Development",
    displayCategory: "Matrimonial Platform",
    img: "/images/jeewanshaadi.webp", 
    accent: "group-hover:shadow-pink-500/30 border-pink-500/50 text-pink-400",
  },
  { 
    id: 6, 
    title: "Edmirai", 
    category: "Development",
    displayCategory: "EdTech Platform",
    img: "/images/edmirai.webp", 
    accent: "group-hover:shadow-cyan-500/30 border-cyan-500/50 text-cyan-400",
  },
  { 
    id: 7, 
    title: "Amla Pharma", 
    category: "Development",
    displayCategory: "Skincare Products",
    img: "/images/amla-pharma.webp", 
    accent: "group-hover:shadow-cyan-500/30 border-cyan-500/50 text-cyan-400",
  }, 
  { 
    id: 8, 
    title: "RudraGroup Indore", 
    category: "Development",
    displayCategory: "Security Provider",
    img: "/images/rudragroupindore.webp", 
    accent: "group-hover:shadow-cyan-500/30 border-cyan-500/50 text-cyan-400",
  },
   { 
    id: 9, 
    title: "Mj Finserv", 
    category: "Development",
    displayCategory: "Finance",
    img: "/images/mjfinserv.webp", 
    accent: "group-hover:shadow-cyan-500/30 border-cyan-500/50 text-cyan-400",
  },
 
];
// "Performance", "Social Media", "Branding"
const categories = ["All", "Development", "E-Commerce"];

// --- 2. OPTIMIZED PROJECT CARD (MEMOIZED) ---
// React.memo prevents unnecessary re-renders of cards that didn't change
const ProjectCard = React.memo(({ project }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const viewportRef = useRef(null);

  const handleMouseEnter = () => {
    if (!imgRef.current || !viewportRef.current) return;
    
    // Performance: Calculate height only when needed
    const moveY = imgRef.current.offsetHeight - viewportRef.current.offsetHeight;
    
    if (moveY > 0) {
      gsap.to(imgRef.current, {
        y: -moveY,
        duration: moveY / 200, // Slightly faster for snappier feel
        ease: "none",
        overwrite: true, // Prevents conflicts
        force3D: true    // Forces GPU acceleration
      });
    }
  };

  const handleMouseLeave = () => {
    if (!imgRef.current) return;
    gsap.to(imgRef.current, {
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
      force3D: true
    });
  };

  return (
    <div
      ref={cardRef}
      className="project-card group relative flex flex-col gap-6 opacity-0 translate-y-[20px] will-change-transform" // CSS Optimization
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative w-full aspect-[4/3] bg-[#111] rounded-xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-opacity-50 group-hover:shadow-2xl hover:-translate-y-1 ${project.accent}`}>
        
        {/* Placeholder - Absolute minimum DOM */}
        {!isLoaded && (
             <div className="absolute inset-0 bg-zinc-900 z-30" />
        )}

        {/* Browser Header */}
        <div className="absolute top-0 left-0 w-full h-8 bg-[#0a0a0a] border-b border-white/5 flex items-center px-4 z-20">
            <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
        </div>

        {/* Viewport */}
        <div ref={viewportRef} className="viewport absolute inset-0 top-8 bg-gray-900 overflow-hidden relative">
            <img 
              ref={imgRef}
              src={project.img} 
              alt={project.title}
              onLoad={() => setIsLoaded(true)}
              loading="eager" 
              decoding="async"
              // Optimized transition class
              className={`w-full h-auto object-cover object-top will-change-transform transition-opacity duration-300 ease-linear ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            
            {/* Hover Overlay - Simplified */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-colors duration-300 group-hover:bg-black/40">
              {isLoaded && (
                  <div className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      View Project
                  </div>
              )}
            </div>
        </div>
      </div>

      <div className="flex justify-between items-start px-2">
          <div>
            <h3 className={`text-xl md:text-2xl font-bold text-white mb-2 transition-colors duration-300 group-hover:${project.accent.split(' ').find(c => c.startsWith('text-'))}`}>
                {project.title}
            </h3>
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${project.accent.split(' ').find(c => c.startsWith('text-')).replace('text', 'bg')}`} />
                <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                  {project.displayCategory}
                </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 transform -rotate-45 group-hover:rotate-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
      </div>
    </div>
  );
});

// --- 3. MAIN PORTFOLIO PAGE ---
export default function PortfolioPage() {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(allProjects);

  // Optimized Filter Handler
  const handleFilterChange = (cat) => {
    if (activeFilter === cat) return;
    
    // Quick fade out
    gsap.to(".project-card", {
        opacity: 0,
        y: 10,
        duration: 0.2, // Faster exit
        ease: "power2.in",
        overwrite: true,
        onComplete: () => {
            setActiveFilter(cat);
            // Using requestAnimationFrame to unblock main thread
            requestAnimationFrame(() => {
                setFilteredProjects(cat === "All" ? allProjects : allProjects.filter(p => p.category === cat));
            });
        }
    });
  };

  // Animation on Data Change (Animate In)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(".pf-header",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power2.out" }
      );

      // Grid Animation (Batching for performance if many items)
      gsap.fromTo(".project-card",
        { y: 30, opacity: 0, scale: 0.98 },
        { 
            y: 0, 
            opacity: 1, 
            scale: 1, 
            duration: 0.5, 
            stagger: 0.03, // Tighter stagger for speed
            ease: "power2.out",
            clearProps: "transform, opacity, scale" // Cleanup prevents issues
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <div ref={containerRef} className="bg-[#050505] text-white min-h-screen pt-32 pb-20 font-sans selection:bg-blue-500/30">
      
      {/* Background - CLEAN #050505 */}
      <div className="fixed inset-0 bg-[#050505] z-[-1]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
            <h1 className="pf-header text-5xl md:text-8xl font-black mb-6 tracking-tighter">
                Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">Works.</span>
            </h1>
            <p className="pf-header text-zinc-400 text-lg max-w-2xl mx-auto">
                A showcase of digital excellence. From pixel-perfect websites to high-converting campaigns.
            </p>
        </div>

        {/* Filters */}
        <div className="pf-header flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold border transition-all duration-200 
                    ${activeFilter === cat 
                        ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                        : "bg-transparent text-zinc-500 border-white/10 hover:border-white/30 hover:text-white"}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[50vh]">
            {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      
      </div>
    </div>
  );
}