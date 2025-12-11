import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Globe, Instagram, BarChart, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- DUMMY PROJECT DATA ---
const projects = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    desc: "A high-performance banking dashboard built with Next.js.",
    link: "#"
  },
  {
    id: 2,
    title: "Nike Air Campaign",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    desc: "Viral Instagram reel edits and carousel strategy.",
    link: "#"
  },
  {
    id: 3,
    title: "E-Com Growth",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    desc: "Scaled revenue by 300% using Meta Ads.",
    link: "#"
  },
  {
    id: 4,
    title: "Luxe Estate Web",
    category: "Development",
    image: "https://images.unsplash.com/photo-1600596542815-205db30dcc53?q=80&w=2070&auto=format&fit=crop",
    desc: "Luxury real estate website with 3D walkthroughs.",
    link: "#"
  },
  {
    id: 5,
    title: "Brand Identity: Zen",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
    desc: "Complete visual identity and logo design.",
    link: "#"
  },
  {
    id: 6,
    title: "SaaS SEO Surge",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=2070&auto=format&fit=crop",
    desc: "Ranked #1 for 50+ high-intent keywords.",
    link: "#"
  },
];

const categories = ["All", "Development", "Social Media", "Performance", "Branding"];

const PortfolioPage = () => {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // --- FILTER LOGIC ---
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeFilter));
    }
  }, [activeFilter]);

  // --- ANIMATION ON FILTER CHANGE ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Animate Grid Items Pop-in
      gsap.fromTo(".project-card",
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: "power2.out", overwrite: true }
      );

    }, containerRef);
    return () => ctx.revert();
  }, [filteredProjects]); // Run when projects change

  // --- INITIAL ANIMATION ---
  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".page-header", { y: 50, opacity: 0, duration: 1, ease: "power3.out" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#050505] text-white min-h-screen pt-32 pb-20 relative overflow-hidden">
      
      {/* Background Noise & Glow */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0078f0]/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="page-header text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">Works.</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                A showcase of digital excellence. From pixel-perfect code to high-converting campaigns, see how we transform businesses.
            </p>
        </div>

        {/* --- FILTER TABS --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 page-header">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold border transition-all duration-300 
                    ${activeFilter === cat 
                        ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                        : "bg-transparent text-zinc-500 border-white/10 hover:border-white/30 hover:text-white"}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* --- PROJECTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
                <div key={project.id} className="project-card group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-[#0a0a0a]">
                    
                    {/* Image */}
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />

                    {/* Dark Overlay (Hover) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content (Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full p-8 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <span className="text-[#0078f0] text-xs font-bold uppercase tracking-widest mb-1 block">
                                    {project.category}
                                </span>
                                <h3 className="text-2xl font-bold text-white leading-tight">
                                    {project.title}
                                </h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity delay-100 transform translate-x-4 group-hover:translate-x-0">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                        
                        <p className="text-zinc-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                            {project.desc}
                        </p>
                    </div>

                </div>
            ))}
        </div>

        {/* --- BOTTOM CTA --- */}
      
      </div>
    </div>
  );
};

export default PortfolioPage;