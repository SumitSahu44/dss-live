import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { 
  MessageCircle, Target, Users, Share2, 
  TrendingUp, BarChart3, Zap, ArrowUpRight 
} from "lucide-react";

// --- CUSTOMIZED CONTENT (SMM SPECIFIC) ---
const serviceData = {
  id: "social-media",
  title: "SOCIAL MEDIA MARKETING",
  subtitle: "Engage. Influence. Scale.",
  // Your exact content integrated here
  description:
    "Maximize your lead potential online by leveraging social media more effectively. Bloom's Indore digital marketing professionals have successfully executed several social media campaigns across various industries. Our professionals go beyond small talk; they initiate meaningful conversations that create positive engagement with your target audience.",
  features: [
    {
      title: "Meaningful Conversations",
      icon: <MessageCircle className="text-rose-400" />,
      desc: "We go beyond small talk to initiate real interactions that build trust and long-term loyalty with your followers.",
    },
    {
      title: "Lead Potential",
      icon: <Target className="text-rose-400" />,
      desc: "Effective leveraging of social platforms to maximize your lead generation and conversion rates online.",
    },
    {
      title: "Cross-Industry Expertise",
      icon: <Users className="text-rose-400" />,
      desc: "Success stories across various industries, ensuring your brand benefits from proven, data-backed campaign strategies.",
    },
    {
      title: "Positive Engagement",
      icon: <TrendingUp className="text-rose-400" />,
      desc: "Creating thumb-stopping content that fosters a positive brand image and high-quality audience engagement.",
    },
  ],
  process: [
    { number: "01", step: "Engagement Audit", text: "Analyzing your current social presence and identifying lead potential opportunities." },
    { number: "02", step: "Strategy Mapping", text: "Developing a tailored campaign based on Bloom's cross-industry success patterns." },
    { number: "03", step: "Conversation Starters", text: "Producing content designed to initiate meaningful talk and positive brand vibes." },
    { number: "04", step: "Scale & Optimize", text: "Monitoring engagement metrics to refine strategy and maximize online exposure." },
  ],
  techStack: [
    { name: "Meta Business", color: "#0668E1", icon: <Share2 size={18} /> },
    { name: "LinkedIn Ads", color: "#0A66C2", icon: <BarChart3 size={18} /> },
    { name: "Canva Pro", color: "#00C4CC", icon: <Zap size={18} /> },
    { name: "Hootsuite", color: "#ef4444", icon: <TrendingUp size={18} /> },
    { name: "ManyChat", color: "#0084FF", icon: <MessageCircle size={18} /> },
  ],
};

const SocialMediaMarketing = () => {
  const containerRef = useRef(null);
  const [isGsapReady, setIsGsapReady] = useState(false);

  useEffect(() => {
    const loadGsap = async () => {
      try {
        if (window.gsap && window.ScrollTrigger) {
          setIsGsapReady(true);
          return;
        }
        const loadScript = (src) => {
          return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
            const script = document.createElement("script");
            script.src = src; script.async = true; script.onload = resolve; script.onerror = reject;
            document.body.appendChild(script);
          });
        };
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js");
        setIsGsapReady(true);
      } catch (error) { console.error("GSAP loading failed", error); }
    };
    loadGsap();
  }, []);

  useEffect(() => {
    if (!isGsapReady || !containerRef.current) return;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-title-char", 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 1, ease: "power4.out" }
      );

      gsap.utils.toArray(".feature-card").forEach((card) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: card, start: "top 85%" } }
        );
      });

      gsap.fromTo(".process-line",
        { height: "0%" },
        { height: "100%", ease: "none", scrollTrigger: { trigger: ".process-container", start: "top center", end: "bottom center", scrub: 1 } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isGsapReady]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#020205] text-white overflow-hidden pt-24 pb-20">
      
      {/* Background Ambient Tint */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2e0518] via-[#050505] to-black z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* --- HERO SECTION --- */}
        <div className="mb-24 mt-12 md:mt-20">
            <div className="flex items-center gap-3 mb-6">
                 <div className="h-[1px] w-12 bg-rose-500/50"></div>
                 <span className="text-rose-400 uppercase tracking-[0.2em] text-sm font-semibold">{serviceData.subtitle}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
                SOCIAL MEDIA <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500 tracking-tighter">MARKETING.</span>
            </h1>
            
            <p className="text-zinc-400 text-lg md:text-xl max-w-3xl leading-relaxed border-l-2 border-rose-500/20 pl-6 mb-10">
                {serviceData.description}
            </p>

            <Link to="/LetsConnect">
                <button className="group relative px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.4)]">
                    <div className="absolute inset-0 bg-rose-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10 group-hover:text-white flex items-center gap-2">
                        Build Your Presence <ArrowUpRight size={18} />
                    </span>
                </button>
            </Link>
        </div>

        {/* --- FEATURES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
            {serviceData.features.map((feature, i) => (
                <div key={i} className="feature-card group relative p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm hover:border-rose-500/30 transition-all duration-500">
                    <div className="w-12 h-12 bg-rose-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-black transition-all duration-500">
                        {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-rose-400 transition-colors">{feature.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
                </div>
            ))}
        </div>

        {/* --- PROCESS SECTION --- */}
        <div className="process-container relative grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            <div className="hidden lg:block sticky top-32 h-fit">
                <h2 className="text-7xl font-black text-white/10 mb-6 uppercase">Our <br/> Strategy</h2>
                <p className="text-zinc-500 text-lg max-w-xs">A meaningful approach to building your digital community.</p>
            </div>

            <div className="relative pl-8 border-l border-zinc-800">
                <div className="process-line absolute left-[-1px] top-0 w-[2px] bg-rose-500 shadow-[0_0_15px_#f43f5e]"></div>
                <div className="flex flex-col gap-16">
                    {serviceData.process.map((item, i) => (
                        <div key={i} className="process-item relative">
                            <span className="absolute -left-[45px] top-1 flex items-center justify-center w-8 h-8 rounded-full bg-[#020205] border border-rose-500/50 text-rose-400 text-xs font-bold">
                                {item.number}
                            </span>
                            <h3 className="text-3xl font-bold text-white mb-2">{item.step}</h3>
                            <p className="text-zinc-400">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- TECH STACK WITH LOGO STYLE --- */}
        <div className="mb-32">
            <h3 className="text-center text-xs uppercase tracking-[0.4em] text-zinc-600 font-bold mb-12">Expertise Across Platforms</h3>
            <div className="flex flex-wrap justify-center gap-6">
                {serviceData.techStack.map((tech, i) => (
                    <div key={i} className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 hover:border-rose-500/30 transition-all group">
                        <div style={{ color: tech.color }} className="group-hover:scale-125 transition-transform">
                            {tech.icon}
                        </div>
                        <span className="text-sm font-bold text-zinc-300 tracking-widest">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default SocialMediaMarketing;