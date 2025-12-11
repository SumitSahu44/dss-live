import React, { useEffect, useRef, useState } from "react";
import { X, Check, ChevronDown, Phone, Mail, MapPin, Star } from "lucide-react";
import gsap from "gsap";

const ContactModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState("quote"); // quote | call
  const [selectedServices, setSelectedServices] = useState([]);

  // Form Data State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    budget: "",
    message: ""
  });

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

  // --- ANIMATION LOGIC ---
  useEffect(() => {
    const modal = modalRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (isOpen) {
      // OPEN ANIMATION
      gsap.set(modal, { display: "flex" });
      gsap.to(overlay, { opacity: 1, duration: 0.3 });
      gsap.fromTo(content, 
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", delay: 0.1 }
      );
      // Disable background scroll
      document.body.style.overflow = "hidden";
    } else {
      // CLOSE ANIMATION
      gsap.to(overlay, { opacity: 0, duration: 0.3 });
      gsap.to(content, { 
        y: 20, opacity: 0, scale: 0.95, duration: 0.3, ease: "power3.in",
        onComplete: () => {
          gsap.set(modal, { display: "none" });
          document.body.style.overflow = "auto";
        }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[999] hidden items-center justify-center p-4 md:p-6"
    >
      {/* 1. Backdrop Overlay */}
      <div 
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0"
      ></div>

      {/* 2. Modal Content Container */}
      <div 
        ref={contentRef}
        className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row opacity-0"
      >
        
        {/* --- LEFT SIDE: VISUAL & CONTACT INFO (Image 1 Reference) --- */}
        <div className="hidden md:flex w-2/5 relative flex-col justify-between p-10 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" 
               alt="Team Working" 
               className="w-full h-full object-cover grayscale opacity-60"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0078f0]/90 to-black/40 mix-blend-multiply"></div>
             <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Content on top of image */}
          <div className="relative z-10">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-white mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Available Now
             </div>
             <h2 className="text-4xl font-black text-white leading-tight">
               Let's Build <br/> Something <span className="text-[#ff9f20]">Great.</span>
             </h2>
          </div>

          {/* Rating Badge (From Image 1) */}
          <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl w-max">
             <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl font-bold text-white">4.9</span>
                <div className="flex text-[#ff9f20]">
                   {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
             </div>
             <p className="text-xs text-zinc-300 uppercase tracking-wider">Client Rating</p>
          </div>

          {/* Direct Contact Info */}
          <div className="relative z-10 space-y-4 pt-8 border-t border-white/10">
             <div className="flex items-center gap-4 text-sm text-zinc-200">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Phone size={14}/></div>
                <span>+91 62643 98990</span>
             </div>
             <div className="flex items-center gap-4 text-sm text-zinc-200">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Mail size={14}/></div>
                <span>business@dss.in</span>
             </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: FORM (Image 2 Reference) --- */}
        <div className="w-full md:w-3/5 bg-[#050505] p-6 md:p-10 relative overflow-y-auto max-h-[90vh] md:max-h-auto">
           {/* Close Button */}
           <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20">
              <X size={20} className="text-zinc-400 hover:text-white" />
           </button>

           {/* Toggle Tabs */}
           <div className="bg-white/5 p-1 rounded-full flex w-full max-w-sm mb-8 border border-white/5">
              <button 
                onClick={() => setActiveTab("quote")}
                className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === "quote" ? "bg-white text-black shadow-lg" : "text-zinc-500 hover:text-white"}`}
              >
                Request A Quote
              </button>
              <button 
                onClick={() => setActiveTab("call")}
                className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === "call" ? "bg-white text-black shadow-lg" : "text-zinc-500 hover:text-white"}`}
              >
                Book A Call
              </button>
           </div>

           <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-1">Contact Information</h3>
              <p className="text-zinc-500 text-sm">Fill out the form below and we will get back to you.</p>
           </div>

           {/* FORM FIELDS */}
           <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              
              {/* Full Name */}
              <div className="group">
                 <input 
                    type="text" 
                    placeholder="Full Name *" 
                    className="w-full bg-transparent border border-white/10 rounded-full px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-[#0078f0] transition-colors"
                 />
              </div>

              {/* Email */}
              <div className="group">
                 <input 
                    type="email" 
                    placeholder="E-mail Id *" 
                    className="w-full bg-transparent border border-white/10 rounded-full px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-[#0078f0] transition-colors"
                 />
              </div>

              {/* Phone + Country Code */}
              <div className="flex gap-3">
                 <div className="w-[100px] shrink-0 relative">
                    <div className="w-full bg-transparent border border-white/10 rounded-full h-full flex items-center justify-center gap-2 px-4 cursor-pointer hover:border-zinc-500 transition-colors">
                       <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-5 rounded-sm" />
                       <span className="text-zinc-300 text-sm">+91</span>
                       {/* <ChevronDown size={12} className="text-zinc-500" /> */}
                    </div>
                 </div>
                 <input 
                    type="tel" 
                    placeholder="Mobile Number *" 
                    className="w-full bg-transparent border border-white/10 rounded-full px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-[#0078f0] transition-colors"
                 />
              </div>

              {/* Budget Select */}
              <div className="relative group">
                 <select className="w-full bg-[#050505] border border-white/10 rounded-full px-6 py-4 text-white appearance-none focus:outline-none focus:border-[#0078f0] transition-colors cursor-pointer text-sm">
                    <option value="" disabled selected>Select Budget Range *</option>
                    <option value="1">₹50k - ₹1 Lakh</option>
                    <option value="2">₹1 Lakh - ₹5 Lakh</option>
                    <option value="3">₹5 Lakh - ₹10 Lakh</option>
                    <option value="4">₹10 Lakh+</option>
                 </select>
                 <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
              </div>

              {/* Services Tags */}
              <div className="pt-4">
                 <p className="text-sm text-zinc-400 mb-3 block">Let us know how we can assist you? *</p>
                 <div className="flex flex-wrap gap-2">
                    {servicesList.map((service) => (
                       <button
                          key={service}
                          onClick={() => toggleService(service)}
                          className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-300 
                            ${selectedServices.includes(service) 
                               ? "bg-white text-black border-white" 
                               : "bg-transparent text-zinc-500 border-white/10 hover:border-white/30 hover:text-zinc-300"}`}
                       >
                          {service}
                       </button>
                    ))}
                 </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                 <button className="w-full bg-gradient-to-r from-[#0078f0] to-[#0062c4] text-white font-bold uppercase tracking-widest py-4 rounded-full hover:shadow-[0_0_30px_-5px_rgba(0,120,240,0.5)] transition-all duration-300 transform active:scale-95">
                    {activeTab === "quote" ? "Get Free Quote" : "Schedule Call"}
                 </button>
              </div>

           </form>
        </div>

      </div>
    </div>
  );
};

export default ContactModal;