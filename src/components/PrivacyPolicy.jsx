import React, { useEffect } from 'react';
import { Shield, Mail, Phone, Globe, Lock, FileText, Layers, Bell } from 'lucide-react';

const PrivacyPolicy = () => {
  
  // Page load hone par top par scroll kare
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-10 bg-[#050505] text-white font-sans relative overflow-hidden selection:bg-[#0078f0] selection:text-white">
      
      {/* --- BACKGROUND ELEMENTS (Same as Footer) --- */}
      <div className="fixed inset-0 pointer-events-none">
         {/* Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
         
         {/* Gradient Mesh (Top Left Blue, Bottom Right Orange) */}
         <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#0078f0]/10 rounded-full blur-[150px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#ff9f20]/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10 max-w-5xl">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <Shield className="w-4 h-4 text-[#0078f0]" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Official Policy</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            PRIVACY <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078f0] to-[#ff9f20]">POLICY</span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            This Privacy Policy explains how <span className="text-white font-medium">DSS Digital Success Solutions LLP</span> collects, uses, protects, and manages information from users of digitalsuccesssolutions.in.
          </p>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="space-y-12">

            {/* Section 1 */}
            <div className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-12 hover:bg-white/[0.04] transition-colors duration-500">
                <div className="flex items-start gap-6">
                    <div className="hidden md:flex h-12 w-12 rounded-full bg-[#0078f0]/10 items-center justify-center shrink-0 border border-[#0078f0]/20">
                        <FileText className="w-6 h-6 text-[#0078f0]" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="md:hidden text-[#0078f0]">01.</span> Information We Collect
                        </h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            You can browse digitalsuccesssolutions.in without sharing personal details.
                            We collect personally identifiable information only when you choose to provide it, such as:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {['Filling out a contact form', 'Emailing us directly', 'Requesting services'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 px-4 py-3 rounded-lg border border-white/5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff9f20]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Section 2 */}
            <div className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-12 hover:bg-white/[0.04] transition-colors duration-500">
                <div className="flex items-start gap-6">
                    <div className="hidden md:flex h-12 w-12 rounded-full bg-[#ff9f20]/10 items-center justify-center shrink-0 border border-[#ff9f20]/20">
                        <Layers className="w-6 h-6 text-[#ff9f20]" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                             <span className="md:hidden text-[#ff9f20]">02.</span> Non-Personal Info & Cookies
                        </h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            We may collect non-personal information when users interact with the website. This can include browser type, device details, operating system, and similar technical data.
                        </p>
                        
                        <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Cookies Usage</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                                {['Improving user experience', 'Tracking website traffic', 'Enhancing performance', 'Basic analytics'].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-1 h-1 bg-white rounded-full opacity-50"></div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3 */}
            <div className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-12 hover:bg-white/[0.04] transition-colors duration-500">
                <div className="flex items-start gap-6">
                    <div className="hidden md:flex h-12 w-12 rounded-full bg-[#0078f0]/10 items-center justify-center shrink-0 border border-[#0078f0]/20">
                        <Lock className="w-6 h-6 text-[#0078f0]" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="md:hidden text-[#0078f0]">03.</span> How We Use Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                             <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                <h4 className="font-bold text-white mb-1">Service Delivery</h4>
                                <p className="text-sm text-gray-400">Responding to queries and fulfilling service requests.</p>
                             </div>
                             <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                <h4 className="font-bold text-white mb-1">Optimization</h4>
                                <p className="text-sm text-gray-400">Improving website performance and customer service.</p>
                             </div>
                        </div>
                        <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
                            We do not sell or share your personal information with third parties.
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4 */}
            <div className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-12 hover:bg-white/[0.04] transition-colors duration-500">
                <div className="flex items-start gap-6">
                    <div className="hidden md:flex h-12 w-12 rounded-full bg-[#ff9f20]/10 items-center justify-center shrink-0 border border-[#ff9f20]/20">
                        <Bell className="w-6 h-6 text-[#ff9f20]" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
                            <span className="md:hidden text-[#ff9f20]">04.</span> Changes to This Policy
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            We may update this Privacy Policy at any time. We encourage users to review this page regularly to stay informed of any changes. Your ongoing use of the website confirms your acceptance of any updates.
                        </p>
                    </div>
                </div>
            </div>

        </div>

        {/* --- CONTACT FOOTER --- */}
        <div className="mt-20 pt-12 border-t border-white/10">
            <h2 className="text-xl font-bold uppercase tracking-widest text-center mb-10">Contact Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Email */}
                <a href="mailto:info@digitalsuccesssolutions.in" className="group flex flex-col items-center p-8 bg-white/5 border border-white/5 rounded-2xl hover:bg-[#0078f0] hover:border-[#0078f0] transition-all duration-300">
                    <Mail className="w-8 h-8 text-[#0078f0] mb-4 group-hover:text-white transition-colors" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white/80 mb-1">Email</span>
                    <span className="text-sm font-medium text-white break-all">info@digitalsuccesssolutions.in</span>
                </a>

                {/* Phone */}
                <a href="tel:6264398990" className="group flex flex-col items-center p-8 bg-white/5 border border-white/5 rounded-2xl hover:bg-[#ff9f20] hover:border-[#ff9f20] transition-all duration-300">
                    <Phone className="w-8 h-8 text-[#ff9f20] mb-4 group-hover:text-white transition-colors" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white/80 mb-1">Phone</span>
                    <span className="text-sm font-medium text-white font-mono">+91 62643 98990</span>
                </a>

                {/* Website */}
                <a href="https://digitalsuccesssolutions.in" className="group flex flex-col items-center p-8 bg-white/5 border border-white/5 rounded-2xl hover:bg-white hover:border-white hover:text-black transition-all duration-300">
                    <Globe className="w-8 h-8 text-white mb-4 group-hover:text-black transition-colors" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black/60 mb-1">Website</span>
                    <span className="text-sm font-medium text-white group-hover:text-black">digitalsuccesssolutions.in</span>
                </a>
            </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-600 font-mono uppercase tracking-widest">
             DSS Digital Success Solutions LLP &copy; {new Date().getFullYear()}
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;