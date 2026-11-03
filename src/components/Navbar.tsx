import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation?: (pkg?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 group whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <div className="w-9 h-9 rounded-lg bg-[#0A192F] flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:bg-[#132A4B] transition-colors">
            CA
          </div>
          <span className="text-xl font-bold tracking-tight text-[#0A192F]">
            CAstory<span className="text-blue-600 text-sm font-semibold ml-0.5">.in</span>
          </span>
        </a>

        {/* Zone 2: Single-line Text Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#1E293B]">
          <a href="#framework" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
            Growth Framework
          </a>
          <a href="#compliance" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
            Compliance Promise
          </a>
          <a href="#systems" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
            Core Systems
          </a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
            Packages & Pricing
          </a>
          <a href="#roadmap" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
            30-Day Roadmap
          </a>
        </nav>

        {/* Zone 3: Only Keep Number */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:+918104468397"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0A192F] hover:text-blue-700 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/80 hover:bg-white shadow-xs transition-all whitespace-nowrap shrink-0"
          >
            <Phone className="w-4 h-4 text-blue-600 shrink-0" />
            <span>+91-8104468397</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-[#0A192F] rounded-lg hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-6 py-5 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 text-sm font-semibold text-[#0A192F]">
            <a 
              href="#framework" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600 transition-colors"
            >
              Growth Framework
            </a>
            <a 
              href="#compliance" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600 transition-colors"
            >
              Compliance Promise
            </a>
            <a 
              href="#systems" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600 transition-colors"
            >
              Core Systems & AI Receptionist
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600 transition-colors"
            >
              Packages & Pricing
            </a>
            <a 
              href="#roadmap" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600 transition-colors"
            >
              First 30 Days Roadmap
            </a>
          </div>
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            <a
              href="tel:+918104468397"
              className="flex items-center justify-center gap-2 text-xs font-bold text-[#0A192F] py-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Call / WhatsApp: +91-8104468397</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
