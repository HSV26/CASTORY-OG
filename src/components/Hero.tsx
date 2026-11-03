import React from 'react';
import { ArrowUpRight, ShieldCheck, CheckCircle2, MessageSquare, MapPin, Sparkles } from 'lucide-react';
import heroOfficeImg from '../assets/images/hero_ca_office_1793717819760.jpg';

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenAudit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onOpenAudit }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-slate-50/80 via-white to-white">
      {/* Subtle modern tech glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-100/40 via-indigo-50/20 to-transparent pointer-events-none blur-3xl -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tech agency kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-700 uppercase bg-blue-50/80 px-3 py-1.5 rounded-md border border-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Modern AI & Growth Agency</span>
              <span aria-hidden="true" className="text-blue-300">·</span>
              <span>Chartered Accountants & Financial Advisors</span>
            </div>

            {/* Main Headline in Deep Navy */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A192F] tracking-tight leading-[1.18] text-balance">
              Turn your practice into a trusted local authority with compliance-safe performance marketing and AI automation.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl text-balance font-normal">
              Specialized digital growth for Chartered Accountants, tax consultants, and financial advisors. Stop relying only on referrals.
            </p>

            {/* Primary Action Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#0A192F] hover:bg-[#132A4B] active:bg-[#071120] rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-blue-400" />
              </button>

              <button
                onClick={onOpenAudit}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-[#0A192F] bg-white hover:bg-slate-50 border border-slate-300/90 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-xs hover:border-slate-400"
              >
                <span>Check Your Practice Visibility</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 border-t border-slate-200/90">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5 text-[#0A192F]">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  100% ICAI, SEBI & AMFI Norms
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="flex items-center gap-1.5 text-[#0A192F]">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  Zero Assured Return Claims
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="flex items-center gap-1.5 text-[#0A192F]">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  Pre-Approval On Every Post
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  Marathon Nexzone, Panvel
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xl shadow-slate-200/80 group">
              {/* Image */}
              <div className="aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden relative">
                <img
                  src={heroOfficeImg}
                  alt="Executive modern chartered accountant advisory office"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/20 to-transparent opacity-90" />
              </div>

              {/* Overlay Content Card */}
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-3">
                <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 border border-slate-200 shadow-lg space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                      The CA Growth Engine
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">Live Client Architecture</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                    <div>
                      <p className="text-lg font-bold text-[#0A192F] tabular-nums">#1 Rank</p>
                      <p className="text-[11px] text-slate-500 truncate">Google Maps</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#0A192F] tabular-nums">24/7</p>
                      <p className="text-[11px] text-slate-500 truncate">AI Receptionist</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-emerald-600 tabular-nums">100%</p>
                      <p className="text-[11px] text-slate-500 truncate">Compliant</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-200 px-1">
                  <span>Marathon Nexzone, Panvel HQ</span>
                  <button
                    onClick={onOpenConsultation}
                    className="text-white hover:text-blue-300 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Quick Consultation Inquiry</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
