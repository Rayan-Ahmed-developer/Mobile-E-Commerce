import React from "react";

const Footer = () => {
  return (
    <footer className="mx-4 md:mx-6 mt-12 bg-[#121212] rounded-t-2xl border-t border-zinc-850 overflow-hidden font-sans antialiased">
      {/* Main Content Area: Zero Waste Space */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Brand */}
        <div>
          <h2 className="text-lg font-black text-white tracking-tight">
            Sunny <span className="text-yellow-400">Mobile</span>
          </h2>
          <p className="text-zinc-500 text-xs mt-1">
            Pakistan's trusted mobile store. Quality phones, unbeatable prices.
          </p>
        </div>

        {/* Contact & Copyright */}
        <div className="flex flex-col md:items-end gap-1 w-full md:w-auto">
          <span className="text-zinc-500 text-[11px] uppercase tracking-wider font-semibold">Get in touch</span>
          <a
            href="mailto:rayanahmeda55@gmail.com"
            className="text-yellow-400 text-sm hover:text-yellow-300 font-medium transition-colors"
          >
            rayanahmeda55@gmail.com
          </a>
        </div>
      </div>

      {/* Bottom Compact Strip */}
      <div className="border-t border-zinc-900 bg-zinc-950/50 px-6 md:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-600">
        <span>© {new Date().getFullYear()} Sunny Mobile. All Rights Reserved.</span>
        <div className="flex items-center gap-3">
          <span>Terms & Conditions Apply</span>
          <span className="text-zinc-500 bg-zinc-900/80 px-2.5 py-0.5 rounded-md border border-zinc-800">
            Made in Karachi 🇵🇰
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;