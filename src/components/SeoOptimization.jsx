import React, { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Search, Globe, MapPin, Zap, Settings, PenTool, 
  Building2, BadgePercent, Flag, BarChart3, 
  ShieldCheck, UserCheck, FileText, ArrowRight, CheckCircle2 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- CONTENT DATA (YOUR EXACT CONTENT) ---
const seoContent = {
  header: {
    title: "TOP SEO COMPANY IN INDORE",
    subtitle: "Growing Multiple Businesses in a Short Time.",
    desc: "At Digital Success Solutions, we don't limit SEO to website ranking; we use it as a comprehensive business growth tool. Our SEO strategies focus on increasing organic traffic, improving brand visibility, and generating valuable leads. We have helped businesses across Real Estate, Hospitals, Fashion, and Cosmetics grow rapidly through research-based, white-hat SEO."
  },
  stats: [
    { label: "Growth in Organic Traffic", value: "150%+" },
    { label: "Growth in Leads", value: "2X" },
    { label: "Visible Growth In", value: "3-4 Months" },
    { label: "Growth Guarantee", value: "90 Days" }
  ],
  // All 8 Services from your list
  services: [
    {
      title: "Enterprise SEO",
      desc: "We help large organizations devise comprehensive SEO strategies that leverage their corporate structure.",
      icon: <Building2 className="text-blue-400" />
    },
    {
      title: "International SEO",
      desc: "We devise strategies that help businesses reach a global audience and maximize their reach.",
      icon: <Globe className="text-purple-400" />
    },
    {
      title: "Local SEO",
      desc: "We help businesses localize their online marketing efforts to attract customers from a specific area.",
      icon: <MapPin className="text-orange-400" />
    },
    {
      title: "National SEO",
      desc: "Our experts help businesses optimize their content for a nationwide audience to reach more potential customers.",
      icon: <Flag className="text-red-400" />
    },
    {
      title: "Ecommerce SEO",
      desc: "We specialize in optimizing content for e-commerce websites to improve visibility and increase sales.",
      icon: <Zap className="text-yellow-400" />
    },
    {
      title: "Technical SEO",
      desc: "We help with technical aspects of SEO, such as sitemaps, indexing, and server configurations.",
      icon: <Settings className="text-gray-400" />
    },
    {
      title: "Pay For Performance",
      desc: "We offer customized pay-for-performance models to help businesses capitalize on the success of their campaigns.",
      icon: <BadgePercent className="text-green-400" />
    },
    {
      title: "SEO Copywriting",
      desc: "Our expert team of writers craft content that is optimized for SEO and intent-focused.",
      icon: <PenTool className="text-pink-400" />
    }
  ],
  // Reporting & Deliverables
  reporting: [
    { title: "Ranking Changes", text: "Changes in keyword rankings since the last report, highlighting improvements or declines." },
    { title: "Historical Data", text: "Trends showing how keyword rankings have evolved over time." },
    { title: "Competitor Rankings", text: "Comparison of keyword rankings with those of key competitors." },
    { title: "Actionable Insights", text: "Recommendations for improving or maintaining rankings based on performance data." }
  ],
  // Why Choose Us Points
  whyChoose: [
    "Years of Experience & Proven Expertise",
    "Transparent Process (No hidden activities)",
    "No Fake Promises (Realistic expectations)",
    "Result-Driven Approach (Focus on Leads)",
    "Dedicated Account Manager (Single point of contact)",
    "Monthly Performance Reports",
    "100% White-Hat SEO (Penalty-free results)"
  ],
  // Q&A
  faqs: [
    { q: "Do you guarantee #1 ranking?", a: "We guarantee measurable growth and a clear roadmap; exact #1 cannot be guaranteed due to competition & Google variables." },
    { q: "Will you work only on our website?", a: "Yes — plus off-site authority building and GMB optimization as required." },
    { q: "Do you provide content?", a: "Haan — SEO-optimized, intent-focused content included per package." },
    { q: "Can you help ecommerce sales?", a: "Bilkul — product & category optimization, schema, collection pages aur technical fixes se organic sales increase karte hain." }
  ]
};

const SeoOptimization = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Header Animation
      gsap.fromTo(".seo-header-item",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
      );

      // Stats Animation
      gsap.from(".seo-stat", {
        scale: 0.8, opacity: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)", delay: 0.5
      });

      // Cards Animation
      gsap.utils.toArray(".seo-card").forEach((card) => {
        gsap.from(card, {
          y: 50, opacity: 0, duration: 0.6,
          scrollTrigger: { trigger: card, start: "top 90%" }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#050505] text-white min-h-screen pt-24 pb-20 font-sans selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1e3a8a_0%,transparent_40%)] opacity-20" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- 1. HERO SECTION --- */}
        <div className="mb-24 mt-10 md:mt-20">
            <div className="seo-header-item flex items-center gap-3 mb-6">
                 <div className="h-[1px] w-12 bg-blue-500"></div>
                 <span className="text-blue-400 uppercase tracking-[0.2em] text-xs font-bold font-mono">
                    {seoContent.header.title}
                 </span>
            </div>
            
            <h1 className="seo-header-item text-4xl md:text-7xl font-black tracking-tighter text-white mb-8 leading-[1.1]">
                Growing Multiple Businesses <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                    In A Short Time.
                </span>
            </h1>
            
            <p className="seo-header-item text-zinc-400 text-lg md:text-xl max-w-4xl leading-relaxed mb-10 border-l-2 border-zinc-800 pl-6">
                {seoContent.header.desc}
            </p>

            {/* CTA */}
            <div className="seo-header-item flex flex-wrap gap-4 items-center">
                <Link to="/LetsConnect">
                    <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-2">
                        Book Free SEO Audit <ArrowRight size={16} />
                    </button>
                </Link>
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider px-6">
                    <ShieldCheck className="text-green-500" size={18} />
                    90 Days Growth Guarantee
                </div>
            </div>
        </div>

        {/* --- 2. STATS GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32 border-y border-white/10 py-10">
            {seoContent.stats.map((stat, i) => (
                <div key={i} className="seo-stat text-center md:text-left md:pl-6 border-l border-white/10 first:border-l-0">
                    <div className="text-3xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
                    <div className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-widest font-bold">{stat.label}</div>
                </div>
            ))}
        </div>

        {/* --- 3. SERVICES GRID --- */}
        <div className="mb-32">
            <div className="flex items-end justify-between mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white">Our SEO Services</h2>
                <div className="hidden md:block text-zinc-500 text-sm max-w-xs text-right">
                    Tailor-made for Real Estate, Education, E-Commerce & more.
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {seoContent.services.map((service, i) => (
                    <div key={i} className="seo-card group p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1">
                        <div className="mb-6 p-3 w-fit rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                            {service.icon}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                            {service.title}
                        </h3>
                        <p className="text-zinc-500 text-xs leading-relaxed">
                            {service.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>

        {/* --- 4. RESULT DRIVEN APPROACH (Philosophy) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
            <div>
                <div className="inline-block px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
                    Our Philosophy
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                    "Efforts nahi,<br/> Results important hote hain."
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                    We don't create random backlinks or unnecessary blogs. We only do what creates a direct impact. Our "Client-First" policy ensures transparency. You get a dedicated SEO Expert and weekly reporting.
                </p>
                
                <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Monthly Deliverables:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {seoContent.reporting.map((item, i) => (
                        <div key={i} className="p-4 bg-zinc-900/50 rounded-xl border border-white/5">
                            <div className="text-blue-400 text-sm font-bold mb-1">{item.title}</div>
                            <div className="text-zinc-500 text-xs">{item.text}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why Choose Us List */}
            <div className="bg-zinc-900/20 p-8 md:p-12 rounded-[2rem] border border-white/5">
                <h3 className="text-2xl font-bold text-white mb-8">Why Choose Us in Indore?</h3>
                <div className="space-y-6">
                    {seoContent.whyChoose.map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="p-1 rounded-full bg-blue-500/20 text-blue-400 mt-1">
                                <CheckCircle2 size={16} />
                            </div>
                            <span className="text-zinc-300 font-medium">{item}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-10 p-6 bg-blue-600/10 rounded-xl border border-blue-500/20">
                    <p className="text-blue-200 text-sm italic">
                        "We custom-build SEO plans for every business — whether you're a local retail store, startup, or IT agency."
                    </p>
                </div>
            </div>
        </div>

        {/* --- 5. FAQs SECTION --- */}
        <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Common Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {seoContent.faqs.map((faq, i) => (
                    <div key={i} className="seo-card p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors">
                        <h4 className="text-lg font-bold text-white mb-3 flex gap-3">
                            <span className="text-blue-500">Q.</span> {faq.q}
                        </h4>
                        <p className="text-zinc-400 text-sm leading-relaxed pl-7 border-l border-zinc-800">
                            {faq.a}
                        </p>
                    </div>
                ))}
            </div>
        </div>

        {/* --- BOTTOM CTA --- */}
        <div className="text-center pt-20 border-t border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2">Ready for Consistent Results?</h3>
            <p className="text-zinc-500 mb-8">Get a custom plan for your Indore business today.</p>
            <Link to="/LetsConnect">
                <button className="px-10 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] will-change-transform hover:scale-105">
                    Start Your Growth Journey
                </button>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default SeoOptimization;