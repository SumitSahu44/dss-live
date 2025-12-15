import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, Database, MousePointerClick, 
  User, Store, Layers, CheckCircle2, 
  Building2, Stethoscope, Briefcase, Utensils, 
  GraduationCap
} from "lucide-react";

// --- CUSTOM ICON COMPONENTS FOR TECH STACK ---
const TechIcon = ({ name, path, color }) => (
  <div className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 w-24 h-24 justify-center">
    <svg viewBox="0 0 24 24" className={`w-8 h-8 ${color} group-hover:scale-110 transition-transform`} fill="currentColor">
      {path}
    </svg>
    <span className="text-[10px] uppercase tracking-wider text-zinc-500 group-hover:text-zinc-300">{name}</span>
  </div>
);

// --- CUSTOMIZED CONTENT ---
const serviceData = {
  subtitle: "Build a Powerful Online Presence",
  title: "Website Development Company in Indore",
  introHead: "Aaj ke digital time me website sirf ek online brochure nahi hoti.",
  introBody: "Website aapke business ka digital showroom, sales executive aur brand identity hoti hai. Customer impression website se hi banata hai — aur wahi impression decide karta hai ki visitor lead banega ya competitor ke paas chala jayega.",
  description: "Digital Success Solution me hum sirf websites design aur develop nahi karte, balki aise e-commerce platforms build karte hain jo directly sales aur business growth ko support karen. Hamara focus har client ke liye ek aisi website banana hota hai jo user-friendly ho, fast ho aur conversion-optimized ho.",

  types: [
    {
      title: "Business & Corporate",
      desc: "Business aur corporate websites ka use company ki professional image build karne ke liye kiya jata hai. Ye websites brand trust aur client enquiries badhane me madad karti hain.",
      icon: <Building2 />,
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "E-Commerce Stores",
      desc: "Products ko online sell karne ke liye secure payment gateway aur smooth checkout process wali websites. Ye websites direct sales badhane me help karti hain.",
      icon: <ShoppingCart />,
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      title: "Dynamic Websites",
      desc: "Growing businesses ke liye best jahan regular changes ki zarurat hoti hai. Admin panel ke through content control simple aur fast hota hai.",
      icon: <Database />,
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "High-Convert Landing Pages",
      desc: "Ads aur lead generation campaigns ke liye specialized pages. High-converting design aur strong CTA ke sath ye enquiries aur sales badhate hain.",
      icon: <MousePointerClick />,
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      title: "Portfolio Websites",
      desc: "Professionals aur creators ke liye ideal. Ye skills, work experience aur achievements ko showcase karti hain aur personal branding me madad karti hain.",
      icon: <User />,
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      title: "Multi Vendor Marketplaces",
      desc: "Amazon/Flipkart jaisa platform jahan multiple sellers sell kar sakein. Vendor dashboard aur commission system features included.",
      icon: <Store />,
      gradient: "from-violet-500/20 to-fuchsia-500/20"
    }
  ],

  uiUxContent: {
    title: "Boosting Online Sales with High-Converting Design",
    p1: "We have designed e-commerce and brand websites for many fashion and cosmetic brands where users get smooth browsing, attractive product presentation and easy checkout experience.",
    p2: "Our expert website development team puts special focus on UI (User Interface) and UX (User Experience). When the user finds it comfortable to use the website, they spend more time and the chances of conversion automatically increase.",
    features: ["Mobile First", "Visual Storytelling", "Fast Performance"]
  },

  industries: [
    { name: "Real Estate", desc: "Property listings & lead generation.", icon: <Building2 /> },
    { name: "Hospitals", desc: "Patient trust & appointment booking.", icon: <Stethoscope /> },
    { name: "Doctors", desc: "Personal branding & credibility.", icon: <User /> },
    { name: "Fashion", desc: "Visual aesthetics & sales focused.", icon: <User /> },
    { name: "Hospitality", desc: "Booking systems & galleries.", icon: <Utensils /> },
    { name: "Education", desc: "Course details & student enquiries.", icon: <GraduationCap /> },
    { name: "E-Commerce", desc: "High volume sales & inventory.", icon: <ShoppingCart /> },
    { name: "Services", desc: "Local SEO & lead capture.", icon: <Briefcase /> }
  ],

  benefits: [
    { title: "Strong Online Presence", text: "Brand visibility on Google & Social Media." },
    { title: "Higher Trust", text: "Professional design builds instant credibility." },
    { title: "More Leads", text: "Conversion-focused layouts capture more data." },
    { title: "Better UX", text: "Fast loading & mobile-friendly experience." },
    { title: "SEO Ready", text: "Clean code structure for better rankings." },
    { title: "Scalable", text: "Built to grow with your business needs." },
    { title: "High ROI", text: "Long-term asset that reduces ad costs." }
  ],

  // 16 Tech Icons Paths
  techStack: [
    { name: "React", color: "text-cyan-400", path: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/> }, // Abstract Atom
    { name: "Next.js", color: "text-white", path: <path d="M12 2L2 19h3l7-12 5 12h3L12 2zm0 3l5 12H7l5-12z"/> }, // Abstract N
    { name: "Node.js", color: "text-green-500", path: <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.3l8 4v7.4l-8 4-8-4V8.3l8-4z"/> }, // Hexagon
    { name: "MongoDB", color: "text-green-400", path: <path d="M12 2s-6 7-6 13c0 3.31 2.69 6 6 6s6-2.69 6-6c0-6-6-13-6-13z"/> }, // Leaf shape
    { name: "Tailwind", color: "text-cyan-300", path: <path d="M4 12c0-2 1.5-3 3-3s3 1 3 3-1.5 3-3 3-3-1-3-3zm8 0c0-2 1.5-3 3-3s3 1 3 3-1.5 3-3 3-3-1-3-3z"/> }, // Waves abstract
    { name: "TypeScript", color: "text-blue-500", path: <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm3 4h6v2H9v4h-2v-6z"/> }, // T shape box
    { name: "JavaScript", color: "text-yellow-400", path: <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm6 4h4v2h-2v4h2v2h-4v-8z"/> }, // J shape box
    { name: "HTML5", color: "text-orange-500", path: <path d="M3 3l2 16 7 2 7-2 2-16H3zm13 14l-4 1-4-1-1-6h2l.5 4 2.5.5 2.5-.5.5-4H8l-.5-4h9l.5 4z"/> }, // Shield
    { name: "CSS3", color: "text-blue-400", path: <path d="M3 3l2 16 7 2 7-2 2-16H3zm13 14l-4 1-4-1-.5-4h-2l.5 4 2.5.5 2.5-.5 1-6H8l-.5-4h9l.5 4z"/> }, // Shield
    { name: "Git", color: "text-red-500", path: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11l-4 4-4-4 1.41-1.41L11 13.17V7h2v6.17l1.59-1.59L16 13z"/> }, // Branch-ish
    { name: "AWS", color: "text-orange-400", path: <path d="M4 14c2 2 5 3 8 3s6-1 8-3v3c-2 2-5 3-8 3s-6-1-8-3v-3zm0-4c2 2 5 3 8 3s6-1 8-3v3c-2 2-5 3-8 3s-6-1-8-3v-3z"/> }, // Cloud-ish
    { name: "Docker", color: "text-blue-500", path: <path d="M2 12h20v6H2v-6zm2-4h4v3H4V8zm5 0h4v3H9V8zm5 0h4v3h-4V8z"/> }, // Container blocks
    { name: "Figma", color: "text-purple-400", path: <path d="M12 2C9 2 7 4 7 7s2 5 5 5 5-2 5-5-2-5-5-5zm0 10c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z"/> }, // Circle drops
    { name: "Redux", color: "text-purple-600", path: <path d="M12 2L2 12l10 10 10-10L12 2zm0 4l6 6-6 6-6-6 6-6z"/> }, // Diamond atom
    { name: "Firebase", color: "text-yellow-500", path: <path d="M12 2l-2 4-6 12h16l-6-12-2-4zm0 6l3 7H9l3-7z"/> }, // Flame-ish
    { name: "GraphQL", color: "text-pink-500", path: <path d="M12 2l8.66 5v10L12 22 3.34 17V7L12 2zm0 4L6 8l6 6 6-6-6-6z"/> } // Hexagon star
  ]
};

const Webdev = () => {
  const containerRef = useRef(null);
  const [isGsapReady, setIsGsapReady] = useState(false);

  useEffect(() => {
    const loadGsap = async () => {
      try {
        if (window.gsap && window.ScrollTrigger) { setIsGsapReady(true); return; }
        const loadScript = (src) => new Promise((resolve, reject) => {
          if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
          const script = document.createElement("script");
          script.src = src; script.async = true; script.onload = resolve; script.onerror = reject;
          document.body.appendChild(script);
        });
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
      gsap.fromTo(".hero-text", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out" });
      gsap.utils.toArray(".animate-card").forEach((card) => {
        gsap.fromTo(card, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 90%" } });
      });
      gsap.fromTo(".ui-ux-image", { scale: 0.9, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 1, scrollTrigger: { trigger: ".ui-ux-section", start: "top 70%", scrub: 1 } });
    }, containerRef);
    return () => ctx.revert();
  }, [isGsapReady]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#020205] text-white overflow-hidden pt-24 pb-20">
      
      {/* --- AMBIENT GRADIENT ORBS (Randomly placed) --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen" />
          <div className="absolute bottom-20 left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen" />
          <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* --- HERO SECTION --- */}
        <div className="mb-24 mt-12 md:mt-20 relative">
            {/* Subtle Gradient Behind Title */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex items-center gap-3 mb-6 hero-text">
                 <div className="h-[1px] w-12 bg-blue-500/50"></div>
                 <span className="text-blue-400 uppercase tracking-[0.2em] text-sm font-semibold">{serviceData.subtitle}</span>
            </div>
            
            <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[1.1]">
                WEBSITE <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">DEVELOPMENT.</span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-8 mb-10 hero-text">
                <p className="text-zinc-300 text-lg md:text-xl max-w-2xl leading-relaxed border-l-2 border-blue-500/30 pl-6 bg-gradient-to-r from-blue-500/5 to-transparent pr-4 py-2 rounded-r-lg">
                    {serviceData.introHead} {serviceData.introBody}
                </p>
                <p className="text-zinc-400 text-base max-w-xl leading-relaxed">
                    {serviceData.description}
                </p>
            </div>

            <div className="mt-8 hero-text">
                <Link to="/LetsConnect">
                    <button className="group relative px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)]">
                        <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        <span className="relative z-10 group-hover:text-white flex items-center gap-2">
                            Start Your Project
                        </span>
                    </button>
                </Link>
            </div>
        </div>

        {/* --- TYPES OF WEBSITES --- */}
        <div className="mb-32">
            <h2 className="text-3xl font-bold mb-10 text-center"><span className="text-blue-500">Types of Websites</span> We Build</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceData.types.map((type, i) => (
                    <div key={i} className={`animate-card group relative p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm hover:border-white/10 transition-all duration-500 overflow-hidden`}>
                        {/* Subtle Card Gradient on Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                        
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 group-hover:text-white transition-all duration-500 shadow-lg shadow-black/50">
                                {type.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{type.title}</h3>
                            <p className="text-zinc-400 leading-relaxed text-sm group-hover:text-zinc-300 transition-colors">{type.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* --- UI/UX SECTION --- */}
        <div className="ui-ux-section relative mb-32 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#0f172a] via-[#020205] to-black border border-white/10 overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
             
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="animate-card">
                    <div className="flex items-center gap-2 mb-4">
                         <Layers className="text-blue-400" size={20} />
                         <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">UI/UX & Sales</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {serviceData.uiUxContent.title}
                    </h2>
                    <p className="text-zinc-300 mb-6 leading-relaxed">
                        {serviceData.uiUxContent.p1}
                    </p>
                    <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
                        {serviceData.uiUxContent.p2}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {serviceData.uiUxContent.features.map((tag, i) => (
                            <span key={i} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-zinc-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="animate-card ui-ux-image relative h-full min-h-[300px] rounded-2xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center backdrop-blur-md">
                     <div className="relative w-3/4 aspect-video bg-zinc-900 rounded-lg shadow-2xl border border-zinc-700 p-4">
                         <div className="flex gap-2 mb-4">
                             <div className="w-3 h-3 rounded-full bg-red-500/80" />
                             <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                             <div className="w-3 h-3 rounded-full bg-green-500/80" />
                         </div>
                         <div className="w-full h-2 bg-zinc-800 rounded mb-2" />
                         <div className="grid grid-cols-2 gap-4 mt-6">
                             <div className="h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded border border-white/5" />
                             <div className="h-24 bg-zinc-800/50 rounded" />
                         </div>
                     </div>
                </div>
             </div>
        </div>

        {/* --- INDUSTRIES SECTION --- */}
        <div className="mb-32">
            <h2 className="text-3xl font-bold mb-12 text-center">Industries We <span className="text-blue-500">Serve</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {serviceData.industries.map((ind, i) => (
                    <div key={i} className="animate-card p-5 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-blue-500/40 hover:bg-gradient-to-b hover:from-zinc-900 hover:to-blue-900/20 transition-all group cursor-default">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-zinc-500 group-hover:text-blue-400 transition-colors">{ind.icon}</span>
                            <h4 className="text-lg font-bold text-white group-hover:text-blue-100">{ind.name}</h4>
                        </div>
                        <p className="text-zinc-500 text-xs leading-relaxed pl-9 group-hover:text-zinc-400">{ind.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* --- BENEFITS SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 relative">
            <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="col-span-1 lg:col-span-1 animate-card relative z-10">
                 <h2 className="text-4xl font-black text-white mb-6 uppercase">Why <br/><span className="text-blue-500">Choose Us?</span></h2>
                 <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                    Investing in a professional website is investing in the future of your business. Here is why our clients trust us.
                 </p>
                 <Link to="/LetsConnect">
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold text-sm transition-all shadow-lg shadow-blue-900/50">
                        Get Your Free Quote
                    </button>
                 </Link>
            </div>
            <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {serviceData.benefits.map((benefit, i) => (
                    <div key={i} className="animate-card flex gap-4">
                        <CheckCircle2 className="text-blue-500 shrink-0 mt-1" size={24} />
                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                            <p className="text-zinc-400 text-sm leading-relaxed">{benefit.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* --- TECH STACK (ICONS GRID) --- */}
        <div className="mb-20 text-center">
            <h3 className="text-xs uppercase tracking-[0.3em] text-zinc-600 mb-12 font-bold">Powered By Modern Tech</h3>
            <div className="flex flex-wrap justify-center gap-4">
                {serviceData.techStack.map((tech, i) => (
                    <TechIcon key={i} name={tech.name} color={tech.color} path={tech.path} />
                ))}
            </div>
        </div>
      
      </div>
    </div>
  );
};

export default Webdev;