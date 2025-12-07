import React, { useEffect } from 'react';
import { Scale, AlertTriangle, Copyright, Link, FileText, ShieldCheck, Gavel, Tag, Mail, Globe } from 'lucide-react';

const TermsAndConditions = () => {

  // Page load hone par top par scroll kare
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-10 bg-[#050505] text-white font-sans relative overflow-hidden selection:bg-[#ff9f20] selection:text-white">
      
      {/* --- BACKGROUND ELEMENTS (Consistent with Privacy Policy) --- */}
      <div className="fixed inset-0 pointer-events-none">
         {/* Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
         
         {/* Gradient Mesh (Reverse colors from Privacy Policy for variety) */}
         <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#0078f0]/10 rounded-full blur-[150px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#ff9f20]/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10 max-w-6xl">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <FileText className="w-4 h-4 text-[#ff9f20]" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Legal Agreement</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            TERMS & <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9f20] to-[#0078f0]">CONDITIONS</span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed font-light">
            By using <span className="text-white font-medium">digitalsuccesssolutions.in</span>, you agree to the following terms. Please read them carefully.
          </p>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {/* 1. General Information */}
            <div className="group bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300 hover:border-white/10">
                <div className="w-12 h-12 rounded-full bg-[#0078f0]/10 flex items-center justify-center mb-6 border border-[#0078f0]/20 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-6 h-6 text-[#0078f0]" />
                </div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-white">
                    01. General Information
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    The content on this website is provided for general information. While we aim to keep the information accurate, we do not guarantee completeness, reliability, or suitability. Any action you take based on the information here is at your own risk. DSS Digital Success Solutions LLP will not be responsible for any loss or damage arising from the use of this website.
                </p>
            </div>

            {/* 2. Use of Info */}
            <div className="group bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300 hover:border-white/10">
                <div className="w-12 h-12 rounded-full bg-[#ff9f20]/10 flex items-center justify-center mb-6 border border-[#ff9f20]/20 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-[#ff9f20]" />
                </div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-white">
                    02. Use of Information & Services
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Your use of any information, products, or services displayed on this website is entirely your responsibility. It is your duty to ensure that any service or information meets your specific requirements.
                </p>
            </div>

            {/* 3. Intellectual Property (Spans Full Width on Tablet/Desktop) */}
            <div className="md:col-span-2 group bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300 hover:border-white/10">
                <div className="flex flex-col md:flex-row gap-6 md:items-start">
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20 group-hover:scale-110 transition-transform">
                        <Copyright className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-white">
                            03. Intellectual Property Rights
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            All materials on this website are owned by or licensed to <span className="text-white">DSS Digital Success Solutions LLP</span>. This includes the website design, layout, appearance, graphics, and content.
                        </p>
                        <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs font-mono tracking-wide">
                            UNAUTHORIZED COPYING OR REPRODUCTION IS STRICTLY PROHIBITED.
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Trademarks */}
            <div className="group bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300 hover:border-white/10">
                <div className="w-12 h-12 rounded-full bg-[#ff9f20]/10 flex items-center justify-center mb-6 border border-[#ff9f20]/20 group-hover:scale-110 transition-transform">
                    <Tag className="w-6 h-6 text-[#ff9f20]" />
                </div>
                <h2 className="text-xl font-bold mb-4 text-white">
                    04. Trademarks
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    All trademarks shown on this website that are not owned or licensed to DSS Digital Success Solutions LLP are acknowledged. Unauthorized use of trademarks is prohibited.
                </p>
            </div>

            {/* 5. External Linking */}
            <div className="group bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300 hover:border-white/10">
                <div className="w-12 h-12 rounded-full bg-[#0078f0]/10 flex items-center justify-center mb-6 border border-[#0078f0]/20 group-hover:scale-110 transition-transform">
                    <Link className="w-6 h-6 text-[#0078f0]" />
                </div>
                <h2 className="text-xl font-bold mb-4 text-white">
                    05. External Linking
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    You are not allowed to create a link to this website from another website or document without obtaining prior written consent from DSS Digital Success Solutions LLP.
                </p>
            </div>

            {/* 6. Limitation of Liability */}
            <div className="group bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300 hover:border-white/10">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20 group-hover:scale-110 transition-transform">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <h2 className="text-xl font-bold mb-4 text-white">
                    06. Limitation of Liability
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of this website. Use strictly at your own risk.
                </p>
            </div>

             {/* 7. Governing Law */}
             <div className="md:col-span-2 group bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300 hover:border-white/10">
                <div className="flex flex-col md:flex-row gap-6 md:items-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                        <Gavel className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-2 text-white">
                            07. Governing Law
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Any dispute arising from the use of this website shall be governed by the laws of <span className="text-white font-bold">India</span> and shall fall under the jurisdiction of the appropriate authorities located in India.
                        </p>
                    </div>
                </div>
            </div>

        </div>

        {/* --- CONTACT SECTION (Consistent with Privacy Policy) --- */}
        <div className="mt-20 pt-12 border-t border-white/10">
            <h2 className="text-xl font-bold uppercase tracking-widest text-center mb-10 text-gray-500">Contact for Legal Queries</h2>
            
            <div className="flex flex-col md:flex-row justify-center gap-6">
                
                {/* Email */}
                <a href="mailto:info@digitalsuccesssolutions.in" className="flex items-center gap-4 p-6 bg-white/5 border border-white/5 rounded-xl hover:bg-[#0078f0] hover:border-[#0078f0] transition-all duration-300 group">
                    <Mail className="w-6 h-6 text-[#0078f0] group-hover:text-white transition-colors" />
                    <div>
                        <span className="block text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white/80">Email Us</span>
                        <span className="text-sm font-medium text-white">info@digitalsuccesssolutions.in</span>
                    </div>
                </a>

                {/* Website */}
                <a href="https://digitalsuccesssolutions.in" className="flex items-center gap-4 p-6 bg-white/5 border border-white/5 rounded-xl hover:bg-[#ff9f20] hover:border-[#ff9f20] transition-all duration-300 group">
                    <Globe className="w-6 h-6 text-[#ff9f20] group-hover:text-white transition-colors" />
                    <div>
                        <span className="block text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white/80">Website</span>
                        <span className="text-sm font-medium text-white">digitalsuccesssolutions.in</span>
                    </div>
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

export default TermsAndConditions;