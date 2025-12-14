import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Rocket, Target, Globe, Zap, ArrowUpRight, Code, Users, Briefcase, Layers, Cpu, Workflow, TrendingUp, Search, Share2 
} from 'lucide-react';
import { HashLink } from "react-router-hash-link";

gsap.registerPlugin(ScrollTrigger);

// --- DATA SOURCE ---
const statsData = {
  experience: "7+", // Updated to 7 as per your content
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
    <div ref={containerRef} className="relative bg-[#020205] text-white min-h-screen overflow-hidden selection:bg-[#0078f0]/30 selection:text-white">
      
      {/* Global Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      {/* --- HERO SECTION (SEO H1) --- */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-[#0078f0]/20 rounded-full blur-[180px] pointer-events-none" />
        
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0078f0]/20 bg-[#0078f0]/5 backdrop-blur-md text-sm font-medium text-[#0078f0] mb-8 fade-up">
            #1 Digital Growth Partner in MP
          </div>

          <h1 className="fade-up text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] mb-8">
            We Are The Best <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#0078f0] to-white">
               Digital Marketing Company in Indore
            </span>
          </h1>

          <p className="fade-up text-zinc-400 text-lg md:text-2xl max-w-4xl leading-relaxed">
            Our <span className="text-white font-semibold">7-year-old digital marketing company</span> provides leading services in Indore, delivering real growth to major brands through <span className="text-[#0078f0]">social media marketing, SEO, and creative strategy.</span>
          </p>
        </div>
      </section>

      {/* --- CORE EXPERTISE (SEO Content Integration) --- */}
      <section className="relative py-24 border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="fade-up relative h-[500px] rounded-3xl overflow-hidden group border border-[#0078f0]/20">
            <div className="absolute inset-0 bg-blue-900/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
              alt="Digital Marketing Strategy Indore" 
              className="parallax-img w-full h-[140%] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-8 left-8 z-20 bg-[#020205]/80 backdrop-blur-xl border border-[#0078f0]/30 p-6 rounded-2xl">
              <p className="text-3xl font-bold mb-1 text-[#0078f0]">{statsData.experience} Years</p>
              <p className="text-zinc-400 text-sm">Of Digital Excellence in Indore.</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="fade-up text-3xl md:text-4xl font-bold leading-tight">
              Elevate Your Brand to the Top of <span className="text-[#0078f0]">Indore's Competitive Market</span>
            </h2>
            <div className="space-y-6 text-zinc-400 text-lg fade-up leading-relaxed text-justify">
              <p>
                For every digital marketing service, we have <strong className="text-white">expert professionals</strong> who leverage the latest innovations, creative strategies, and data-driven planning. As a leading digital marketing company in Indore, we create customized campaigns for your business.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <Search className="text-[#0078f0]" size={24} />
                    <span className="text-sm font-medium text-zinc-200">Top Google Rankings (SEO)</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <Share2 className="text-[#0078f0]" size={24} />
                    <span className="text-sm font-medium text-zinc-200">Social Media Awareness</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <TrendingUp className="text-[#0078f0]" size={24} />
                    <span className="text-sm font-medium text-zinc-200">Measurable ROI (Performance)</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <Zap className="text-[#0078f0]" size={24} />
                    <span className="text-sm font-medium text-zinc-200">Lead Generation Techniques</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: SUSTAINABLE GROWTH (SEO Content) --- */}
      <section className="py-24 bg-[#05050a] border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <div className="fade-up mb-12">
                <h2 className="text-3xl md:text-5xl font-black mb-6">
                    Your Digital Growth With <br/>
                    <span className="text-[#0078f0]">Top Digital Marketing Agency in Indore</span>
                </h2>
                <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
                    Our focus isn't just on driving leads, but on driving <span className="text-white underline decoration-[#0078f0] underline-offset-4">sustainable growth</span> for your business.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        title: "Professional Strategies",
                        desc: "Custom strategies tailored to your specific business goals and market demands.",
                        icon: Briefcase
                    },
                    {
                        title: "Results-Focused",
                        desc: "We drive direct sales and grow online presence through optimized websites.",
                        icon: Target
                    },
                    {
                        title: "Innovation & Identity",
                        desc: "Giving your brand a new identity in the digital world through creative tools.",
                        icon: Zap
                    }
                ].map((item, idx) => (
                    <div key={idx} className="fade-up p-8 bg-[#020205] border border-white/5 rounded-3xl hover:border-[#0078f0]/40 transition-all">
                        <div className="w-14 h-14 bg-[#0078f0]/10 rounded-2xl flex items-center justify-center text-[#0078f0] mb-6 mx-auto">
                            <item.icon size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- BENTO GRID STATS --- */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <div className="mb-12 fade-up text-center">
           <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#0078f0]">Our Track Record</h2>
           <p className="text-zinc-500 mt-2">Many brands have scaled through our expert interventions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[190px]">
          <div className="fade-up md:col-span-2 lg:col-span-2 bg-gradient-to-br from-zinc-900 to-black border border-[#ff9f20]/30 rounded-3xl p-8 flex flex-col justify-between group">
             <div className="flex justify-between items-start">
                <div className="p-3 bg-[#ff9f20]/10 rounded-xl text-[#ff9f20]">
                   <ArrowUpRight size={28} />
                </div>
                <span className="text-[#ff9f20] text-sm font-mono tracking-wider">AD SPEND MANAGED</span>
             </div>
             <div>
                <h3 className="stat-counter text-5xl md:text-6xl font-black text-white mb-2">₹{statsData.adBudget}</h3>
                <p className="text-zinc-400 text-sm">Fueling measurable ROI through performance campaigns.</p>
             </div>
          </div>

          <div className="fade-up bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex flex-col justify-center items-center text-center">
             <Briefcase className="text-[#0078f0] mb-4" size={32} />
             <h3 className="stat-counter text-4xl font-bold text-white mb-1">{statsData.projects}</h3>
             <p className="text-zinc-500 text-xs uppercase tracking-wider">Projects Delivered</p>
          </div>

          <div className="fade-up bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex flex-col justify-center items-center text-center">
             <Users className="text-[#0078f0] mb-4" size={32} />
             <h3 className="stat-counter text-4xl font-bold text-white mb-1">{statsData.clients}</h3>
             <p className="text-zinc-500 text-xs uppercase tracking-wider">Satisfied Clients</p>
          </div>

          <div className="fade-up bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex flex-col justify-center items-center text-center">
             <Globe className="text-[#0078f0] mb-4" size={32} />
             <h3 className="stat-counter text-4xl font-bold text-white mb-1">{statsData.websites}</h3>
             <p className="text-zinc-500 text-xs uppercase tracking-wider">Websites Scaled</p>
          </div>

          <div className="fade-up md:col-span-2 bg-[#0078f0]/5 border border-[#0078f0]/20 rounded-3xl p-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#0078f0]/10 blur-[80px] rounded-full" />
             <div className="relative z-10 flex flex-col h-full justify-between">
                <Rocket className="text-white mb-4" size={32} />
                <div>
                   <h3 className="text-3xl font-bold mb-2">Driven by Experts</h3>
                   <p className="text-zinc-400 text-sm max-w-sm">Experienced professionals in SEO, Social Media, and Performance Marketing.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      {/* <section className="py-24 z-10 relative">
        <div className="max-w-5xl mx-auto px-6 text-center fade-up bg-gradient-to-b from-white/5 to-transparent p-16 rounded-[4rem] border border-white/5">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Ready to dominate the <span className="text-[#0078f0]">Digital World?</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
                Choose our digital marketing company in Indore to make your business strong and competitive. Let's build your new identity together.
            </p>
            <HashLink 
                to="/contact#top"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0078f0] text-white font-bold rounded-full hover:bg-[#0062c4] transition-all hover:scale-105 active:scale-95"
            >
                Start Your Growth Journey <ArrowUpRight size={20} />
            </HashLink>
        </div>
      </section> */}

    </div>
  );
};

export default AboutPage;