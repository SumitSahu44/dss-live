import React, { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Star, ChevronDown, Send, CheckCircle2 } from "lucide-react";
import gsap from "gsap";

const LetsConnect = () => {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  const [activeTab, setActiveTab] = useState("quote"); // quote | call
  const [selectedServices, setSelectedServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const servicesList = [
    "Website Dev", "App Dev", "Performance Mkt", 
    "Social Media", "SEO", "Branding", "UI/UX Design"
  ];

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
    }, 2000);
  };

  // --- GSAP ANIMATION ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Container Reveal
      gsap.from(containerRef.current, {
        opacity: 0, duration: 1, ease: "power2.out"
      });

      // 2. Left Column Slide In
      gsap.fromTo(leftColRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      // 3. Right Column (Form) Slide Up
      gsap.fromTo(rightColRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
        ref={containerRef} 
        className="min-h-screen w-full bg-[#050505] pt-28 pb-12 px-4 md:px-8 flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#0078f0]/10 to-transparent pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-[#ff9f20]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- MAIN GRID CONTAINER --- */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 relative z-10">
        
        {/* --- LEFT COLUMN: VISUALS & INFO --- */}
        <div 
            ref={leftColRef}
            className="lg:col-span-5 relative h-[500px] lg:h-auto rounded-[2.5rem] overflow-hidden group border border-white/10"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop" 
                    alt="Team Working" 
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-[#0078f0]/20 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                
                {/* Top Badge */}
                <div className="flex justify-between items-start">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-widest text-white">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Accepting New Projects
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="hidden md:block bg-black/40 backdrop-blur-xl border border-white/10 p-3 rounded-2xl text-center">
                        <div className="text-2xl font-black text-white">4.9</div>
                        <div className="flex text-[#ff9f20] text-[10px] gap-0.5 justify-center">
                            {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-6">
                        Let’s Build <br/> The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">Future.</span>
                    </h1>
                    
                    <div className="space-y-4 pt-8 border-t border-white/20">
                        <div className="flex items-center gap-4 group/item cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#0078f0] group-hover/item:bg-[#0078f0] group-hover/item:text-white transition-all">
                                <Phone size={18}/>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-400 uppercase tracking-wider">Call Us</p>
                                <p className="text-white font-mono">+91 62643 98990</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 group/item cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#ff9f20] group-hover/item:bg-[#ff9f20] group-hover/item:text-white transition-all">
                                <Mail size={18}/>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-400 uppercase tracking-wider">Email Us</p>
                                <p className="text-white font-mono">business@digitalsuccesssolutions.in</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- RIGHT COLUMN: FORM --- */}
        <div 
            ref={rightColRef}
            className="lg:col-span-7 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden"
        >
            {/* Success State Overlay */}
            {isSubmitted ? (
                <div className="absolute inset-0 bg-[#0a0a0a] z-20 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 text-green-500">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Message Received!</h2>
                    <p className="text-zinc-400 max-w-md mb-8">
                        Thank you for reaching out. Our team will analyze your requirements and get back to you within 24 hours.
                    </p>
                    <button 
                        onClick={() => setIsSubmitted(false)}
                        className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors"
                    >
                        Send Another Message
                    </button>
                </div>
            ) : null}

           {/* Tab Switcher */}
           <div className="flex w-full max-w-sm bg-white/5 p-1 rounded-full border border-white/5 mb-10">
              <button 
                onClick={() => setActiveTab("quote")}
                className={`flex-1 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === "quote" ? "bg-white text-black shadow-lg" : "text-zinc-500 hover:text-white"}`}
              >
                Request A Quote
              </button>
              {/* <button 
                onClick={() => setActiveTab("call")}
                className={`flex-1 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === "call" ? "bg-white text-black shadow-lg" : "text-zinc-500 hover:text-white"}`}
              >
                Book A Call
              </button> */}
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-4">Full Name *</label>
                        <input 
                            required
                            type="text" 
                            placeholder="John Doe" 
                            className="w-full bg-[#020205] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-[#0078f0] focus:bg-[#0078f0]/5 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-4">Email Address *</label>
                        <input 
                            required
                            type="email" 
                            placeholder="john@company.com" 
                            className="w-full bg-[#020205] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-[#0078f0] focus:bg-[#0078f0]/5 transition-all"
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-4">Phone Number *</label>
                        <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-bold">+91</span>
                            <input 
                                required
                                type="tel" 
                                placeholder="98765 43210" 
                                className="w-full bg-[#020205] border border-white/10 rounded-2xl pl-16 pr-6 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-[#0078f0] focus:bg-[#0078f0]/5 transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-4">Budget Range</label>
                        <div className="relative">
                            <select className="w-full bg-[#020205] border border-white/10 rounded-2xl px-6 py-4 text-white appearance-none focus:outline-none focus:border-[#0078f0] cursor-pointer">
                                <option>₹50k - ₹1 Lakh</option>
                                <option>₹1 Lakh - ₹5 Lakh</option>
                                <option>₹5 Lakh - ₹10 Lakh</option>
                                <option>₹10 Lakh+</option>
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                        </div>
                    </div>
                </div>

                {/* Services Tags */}
                <div className="space-y-3 pt-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-4">I'm interested in...</label>
                    <div className="flex flex-wrap gap-3">
                        {servicesList.map((service) => (
                            <button
                                type="button"
                                key={service}
                                onClick={() => toggleService(service)}
                                className={`px-5 py-2.5 rounded-full text-xs font-bold border transition-all duration-300 
                                ${selectedServices.includes(service) 
                                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                                    : "bg-transparent text-zinc-500 border-white/10 hover:border-white/30 hover:text-zinc-300"}`}
                            >
                                {service}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-4">Project Details</label>
                    <textarea 
                        rows="4"
                        placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                        className="w-full bg-[#020205] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-[#0078f0] focus:bg-[#0078f0]/5 transition-all resize-none"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                    disabled={isSubmitting}
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-[#0078f0] to-[#0062c4] text-white font-bold uppercase tracking-widest py-5 rounded-2xl hover:shadow-[0_0_40px_-10px_rgba(0,120,240,0.6)] transition-all duration-300 transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? "Sending..." : (activeTab === "quote" ? "Get Free Quote" : "Schedule Call")}
                        {!isSubmitting && <Send size={16} className="group-hover:translate-x-1 transition-transform" />}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>

           </form>
        </div>

      </div>
    </div>
  );
};

export default LetsConnect;