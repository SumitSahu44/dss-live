import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Rocket, Target, Globe, Zap, ArrowUpRight, Code, Users, Briefcase, Layers, Cpu, Workflow 
} from 'lucide-react';
import { HashLink } from "react-router-hash-link";

gsap.registerPlugin(ScrollTrigger);

// --- DATA SOURCE ---
const statsData = {
  experience: "5+",
  projects: "1600+",
  clients: "950+",
  adBudget: "10 Cr+",
  websites: "350+",
  team: "30+",
  industries: "40+"
};

const AboutPage = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. General Fade Up for all sections
      gsap.utils.toArray('.fade-up').forEach(el => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" }
          }
        );
      });

      // 2. Counter Animation
      gsap.utils.toArray('.stat-counter').forEach(el => {
        const value = el.innerText.replace(/[^0-9]/g, ''); 
        const suffix = el.innerText.replace(/[0-9]/g, ''); 
        
        gsap.fromTo(el, { innerText: 0 }, {
            innerText: value, duration: 2, snap: { innerText: 1 },
            scrollTrigger: { trigger: el, start: "top 85%" },
            onUpdate: function() { el.innerText = Math.ceil(this.targets()[0].innerText) + suffix; }
        });
      });

      // 3. Parallax Effect on Images
      gsap.utils.toArray('.parallax-img').forEach(img => {
        gsap.to(img, {
            yPercent: 20, ease: "none",
            scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    // Added global noise texture to the main container
    <div ref={containerRef} className="relative bg-[#020205] text-white min-h-screen overflow-hidden selection:bg-[#0078f0]/30 selection:text-white">
      
      {/* Global Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto z-10">
        {/* Blue Glow */}
        <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-[#0078f0]/20 rounded-full blur-[180px] pointer-events-none" />
        
        <div className="relative">
          {/* Minimal Orange Accent */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ff9f20]/20 bg-[#ff9f20]/5 backdrop-blur-md text-sm font-medium text-[#ff9f20] mb-8 fade-up">
            From Indore to the World.
          </div>

          <h1 className="fade-up text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-8">
            We Engineer <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#0078f0] to-white">
                Digital Dominance.
            </span>
          </h1>

          <p className="fade-up text-zinc-400 text-lg md:text-2xl max-w-3xl leading-relaxed">
            DSS is a full-service digital partner. We replace guesswork with <span className="text-[#0078f0] font-medium">data-driven strategy</span> and boring designs with <span className="text-[#0078f0] font-medium">experiences that convert</span>.
          </p>
        </div>
      </section>

      {/* --- STORY SECTION --- */}
      <section className="relative py-24 border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side with Blue Accent */}
          <div className="fade-up relative h-[550px] rounded-3xl overflow-hidden group border border-[#0078f0]/20">
            <div className="absolute inset-0 bg-blue-900/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
            <img 
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop" 
              alt="Our Journey" 
              className="parallax-img w-full h-[140%] object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            {/* Floating Badge - Blue */}
            <div className="absolute bottom-8 left-8 z-20 bg-[#020205]/80 backdrop-blur-xl border border-[#0078f0]/30 p-6 rounded-2xl shadow-[0_0_30px_-10px_rgba(0,120,240,0.3)]">
              <p className="text-3xl font-bold mb-1 text-[#0078f0]">{statsData.experience} Years</p>
              <p className="text-zinc-400 text-sm">Of defining the digital landscape.</p>
            </div>
          </div>

          {/* Text Side */}
          <div className="flex flex-col gap-8">
            <h2 className="fade-up text-4xl md:text-5xl font-bold leading-tight">
              The Relentless Pursuit <br/> of <span className="text-[#0078f0]">Excellence.</span>
            </h2>
            <div className="space-y-6 text-zinc-400 text-lg fade-up leading-relaxed">
              <p>
                It started with a simple belief: businesses deserve better than average agencies. They deserve partners who care about ROI as much as they do.
              </p>
              <p>
                We bootstrapped our way from a small room in Indore to managing crores in ad spend globally. Our growth wasn't accidental; it was engineered through the same strategies we apply to our clients' businesses.
              </p>
              <p>
                Today, our team of {statsData.team} specialists are united by a single mission: <strong className="text-white">To make your brand impossible to ignore.</strong>
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- [NEW SECTION] THE DSS BLUEPRINT (Process) --- */}
      <section className="py-24 bg-black/50 border-t border-white/5 z-10 relative">
        {/* Subtle Blue side glow */}
        <div className="absolute top-0 right-0 w-[300px] h-full bg-[#0078f0]/5 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16 fade-up">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#0078f0] mb-4">How We Work</h2>
                <h3 className="text-3xl md:text-4xl font-bold">The DSS Blueprint for Scale</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connecting Line (Desktop only) */}
                <div className="hidden md:block absolute top-16 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#0078f0]/30 to-transparent z-0"></div>

                {[
                    { icon: Layers, title: "1. Deep Discovery", desc: "We audit everything. Market gaps, competitor weakness, and your untapped potential." },
                    { icon: Workflow, title: "2. Strategic Execution", desc: "Deploying custom-built websites and high-converting ad campaigns engineered for your audience." },
                    { icon: Cpu, title: "3. Optimization & Scale", desc: "We don't set and forget. We analyze data daily to lower CPA and increase ROAS aggressively." }
                ].map((step, i) => (
                    <div key={i} className="fade-up relative z-10 flex flex-col items-center text-center p-6 bg-[#020205] border border-white/5 rounded-2xl group hover:border-[#0078f0]/30 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-[#0078f0]/10 flex items-center justify-center text-[#0078f0] mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_-5px_rgba(0,120,240,0.3)]">
                            <step.icon size={28} />
                        </div>
                        <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                        <p className="text-zinc-400">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- BENTO GRID STATS --- */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <div className="mb-12 fade-up">
           <h2 className="text-center text-sm font-bold uppercase tracking-[0.3em] text-zinc-600">Impact by Numbers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[190px]">
          
          {/* Big Card: Ad Budget (ORANGE Highlight - The only major orange element) */}
          <div className="fade-up md:col-span-2 lg:col-span-2 bg-gradient-to-br from-zinc-900 to-black border border-[#ff9f20]/30 rounded-3xl p-8 flex flex-col justify-between group hover:border-[#ff9f20]/60 transition-all shadow-[0_0_30px_-15px_rgba(255,159,32,0.2)] hover:shadow-[0_0_40px_-10px_rgba(255,159,32,0.4)]">
             <div className="flex justify-between items-start">
                <div className="p-3 bg-[#ff9f20]/10 rounded-xl text-[#ff9f20] group-hover:scale-110 transition-transform">
                   <ArrowUpRight size={28} />
                </div>
                <span className="text-[#ff9f20] text-sm font-mono tracking-wider">AD SPEND MANAGED</span>
             </div>
             <div>
                <h3 className="stat-counter text-5xl md:text-6xl font-black text-white mb-2">₹{statsData.adBudget}</h3>
                <p className="text-zinc-400 text-sm">Driving massive revenue for our partners.</p>
             </div>
          </div>

          {/* Blue Themed Cards */}
          <div className="fade-up bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex flex-col justify-center items-center text-center group hover:border-[#0078f0]/40 transition-colors">
             <Briefcase className="text-[#0078f0] mb-4" size={32} />
             <h3 className="stat-counter text-4xl font-bold text-white mb-1">{statsData.projects}</h3>
             <p className="text-zinc-500 text-xs uppercase tracking-wider">Projects Delivered</p>
          </div>

          <div className="fade-up bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex flex-col justify-center items-center text-center group hover:border-[#0078f0]/40 transition-colors">
             <Users className="text-[#0078f0] mb-4" size={32} />
             <h3 className="stat-counter text-4xl font-bold text-white mb-1">{statsData.clients}</h3>
             <p className="text-zinc-500 text-xs uppercase tracking-wider">Happy Clients</p>
          </div>

          <div className="fade-up bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex flex-col justify-center items-center text-center group hover:border-[#0078f0]/40 transition-colors">
             <Globe className="text-[#0078f0] mb-4 duration-700" size={32} />
             <h3 className="stat-counter text-4xl font-bold text-white mb-1">{statsData.websites}</h3>
             <p className="text-zinc-500 text-xs uppercase tracking-wider">Websites Live</p>
          </div>

          <div className="fade-up md:col-span-2 bg-[#0078f0]/5 border border-[#0078f0]/20 rounded-3xl p-8 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#0078f0]/10 blur-[80px] rounded-full pointer-events-none" />
             <div className="relative z-10 flex flex-col h-full justify-between">
                <Rocket className="text-white mb-4" size={32} />
                <div>
                   <h3 className="text-3xl font-bold mb-2">Powered by {statsData.team} Experts</h3>
                   <p className="text-zinc-400 text-sm max-w-sm">Developers, Designers, and Strategists working in sync.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- [NEW SECTION] CULTURE BANNER --- */}
      <section className="py-20 z-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/30 z-0"></div>
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" alt="Team Culture" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity parallax-img" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center fade-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Built on <span className="text-[#0078f0]">Obsession.</span></h2>
            <p className="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                We are a team of creative rebels and data nerds who refuse to settle for mediocrity. Our culture is defined by speed, transparency, and a relentless hunger for results.
            </p>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="py-24 bg-black/50 border-t border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
              {[
                { title: "Strategic Vision", desc: "We don't guess. We research, plan, and execute with surgical precision.", icon: Target },
                { title: "Creative Rebellion", desc: "We push boundaries. Boring doesn't sell, bold does.", icon: Zap },
                { title: "Technical Mastery", desc: "Clean code, fast servers, and seamless integrations are our standard.", icon: Code },
              ].map((val, i) => (
                <div key={i} className="fade-up p-10 bg-[#020205] hover:bg-[#0a0a0a] transition-colors duration-300 group">
                   <val.icon className="text-[#0078f0] mb-6 group-hover:scale-110 transition-transform" size={36} />
                   <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                   <p className="text-zinc-400 leading-relaxed">{val.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

   
    </div>
  );
};

export default AboutPage;