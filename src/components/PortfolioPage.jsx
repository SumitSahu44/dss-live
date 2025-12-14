import React, { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- DUMMY DATA ---
const projects = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop", // Reduced Res for speed
    desc: "A high-performance banking dashboard built with Next.js.",
    link: "#"
  },
  {
    id: 2,
    title: "Nike Air Campaign",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    desc: "Viral Instagram reel edits and carousel strategy.",
    link: "#"
  },
  {
    id: 3,
    title: "E-Com Growth",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    desc: "Scaled revenue by 300% using Meta Ads.",
    link: "#"
  },
  {
    id: 4,
    title: "Luxe Estate Web",
    category: "Development",
    image: "https://images.unsplash.com/photo-1600596542815-205db30dcc53?q=80&w=1200&auto=format&fit=crop",
    desc: "Luxury real estate website with 3D walkthroughs.",
    link: "#"
  },
  {
    id: 5,
    title: "Brand Identity: Zen",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop",
    desc: "Complete visual identity and logo design.",
    link: "#"
  },
  {
    id: 6,
    title: "SaaS SEO Surge",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=1200&auto=format&fit=crop",
    desc: "Ranked #1 for 50+ high-intent keywords.",
    link: "#"
  },
];

const categories = ["All", "Development", "Social Media", "Performance", "Branding"];

const PortfolioPage = () => {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // --- OPTIMIZED FILTER LOGIC ---
  const handleFilterChange = (cat) => {
    if (activeFilter === cat) return;
    
    // 1. Fade out current items smoothly
    gsap.to(".project-card", {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            // 2. Update State
            setActiveFilter(cat);
            setFilteredProjects(cat === "All" ? projects : projects.filter(p => p.category === cat));
        }
    });
  };

  // --- ANIMATE IN NEW ITEMS (Layout Effect prevents flicker) ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Kill old animations to prevent conflict
      gsap.killTweensOf(".project-card");

      gsap.fromTo(".project-card",
        { y: 30, opacity: 0, scale: 0.98 },
        { 
            y: 0, 
            opacity: 1, 
            scale: 1, 
            stagger: 0.05, // Fast stagger for snappy feel
            duration: 0.6, 
            ease: "power3.out",
            clearProps: "transform" // Clean up after animation to let CSS hover work
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [filteredProjects]); // Runs AFTER state update

  // --- INITIAL HEADER ANIMATION ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.from(".page-header-item", { 
            y: 40, 
            opacity: 0, 
            duration: 1, 
            stagger: 0.1,
            ease: "power3.out" 
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#050505] text-white min-h-screen pt-32 pb-20 relative overflow-hidden font-sans">
      
      {/* --- OPTIMIZED BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
          {/* Static noise image is faster than generating noise via CSS */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
          
          {/* Replaced Heavy Blur with Radial Gradient (Much Faster) */}
          <div 
            className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-20 pointer-events-none"
            style={{ 
                background: 'radial-gradient(circle, #0078f0 0%, rgba(0,0,0,0) 70%)',
                filter: 'blur(60px)', // Lower blur is okay with gradient
                willChange: 'transform' 
            }} 
          />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
            <h1 className="page-header-item text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">Works.</span>
            </h1>
            <p className="page-header-item text-zinc-400 text-lg max-w-2xl mx-auto">
                A showcase of digital excellence. From pixel-perfect code to high-converting campaigns, see how we transform businesses.
            </p>
        </div>

        {/* --- FILTER TABS --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 page-header-item">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold border transition-all duration-300 
                    ${activeFilter === cat 
                        ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                        : "bg-transparent text-zinc-500 border-white/10 hover:border-white/30 hover:text-white"}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* --- PROJECTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[50vh]">
            {filteredProjects.map((project) => (
                <div 
                    key={project.id} 
                    className="project-card group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer bg-[#0a0a0a] border border-white/5"
                    style={{ willChange: 'transform, opacity' }} // GPU Hint
                >
                    
                    {/* Image Layer - Optimized */}
                    <div className="absolute inset-0 overflow-hidden">
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            loading="lazy" // Lazy load
                            decoding="async" // Don't block main thread
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Content Layer */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        
                        {/* Top Right Icon */}
                        <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <ArrowUpRight size={18} />
                        </div>

                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            <span className="text-[#0078f0] text-xs font-bold uppercase tracking-widest mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                {project.category}
                            </span>
                            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                {project.title}
                            </h3>
                            <p className="text-zinc-400 text-sm line-clamp-2 opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 delay-100">
                                {project.desc}
                            </p>
                        </div>
                    </div>

                </div>
            ))}
        </div>
      
      </div>
    </div>
  );
};

export default PortfolioPage;