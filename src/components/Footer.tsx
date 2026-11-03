import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 text-xs">
      {/* Top CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-200">
        <div className="rounded-3xl bg-gradient-to-r from-blue-50 via-slate-50 to-blue-50 border border-blue-200/80 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Exclusive Practice Partner
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F]">
              Ready to build a reliable local authority engine?
            </h3>
            <p className="text-sm text-slate-600 max-w-xl font-normal">
              Schedule a 20-minute practice consultation to review your local map presence and discover what a compliant inbound system looks like for your firm.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-[#0A192F] hover:bg-[#132A4B] rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-md hover:shadow-lg"
            >
              <span>Book Practice Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-blue-400" />
            </button>
            <span className="text-xs text-slate-500 font-medium">Direct Partner Desk: +91-8104468397</span>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation & Contacts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0A192F] flex items-center justify-center text-white font-bold text-sm">
                CA
              </div>
              <span className="text-xl font-bold tracking-tight text-[#0A192F]">
                CAstory<span className="text-blue-600 font-semibold text-xs ml-0.5">.in</span>
              </span>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed max-w-sm font-normal">
              The specialized digital marketing and AI automation agency engineered exclusively for Chartered Accountants, tax practitioners, and financial advisors.
            </p>

            <div className="space-y-2.5 pt-2 font-medium">
              <div className="flex items-center gap-2 text-[#0A192F]">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Marathon Nexzone, Panvel, Navi Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2 text-[#0A192F]">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <a href="tel:+918104468397" className="hover:text-blue-600 transition-colors">
                  +91-8104468397
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#0A192F]">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <a href="mailto:contact@castory.in" className="hover:text-blue-600 transition-colors">
                  contact@castory.in
                </a>
              </div>
            </div>
          </div>

          {/* Core Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#0A192F] uppercase tracking-wider">
              Navigation
            </p>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#framework" className="hover:text-blue-600 transition-colors text-slate-600">
                  3-Step Framework
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-blue-600 transition-colors text-slate-600">
                  The Compliance Promise
                </a>
              </li>
              <li>
                <a href="#systems" className="hover:text-blue-600 transition-colors text-slate-600">
                  Core Practice Systems
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-blue-600 transition-colors text-slate-600">
                  Pricing & Packages
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-blue-600 transition-colors text-slate-600">
                  30-Day Launch Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Packages */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#0A192F] uppercase tracking-wider">
              Packages
            </p>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#pricing" className="hover:text-blue-600 transition-colors text-slate-600">
                  Starter (₹7,499/mo)
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-blue-600 transition-colors flex items-center gap-1.5 text-slate-600">
                  <span>Growth (₹14,999/mo)</span>
                  <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-1.5 py-0.5 rounded">TOP CHOICE</span>
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-blue-600 transition-colors text-slate-600">
                  Premium (₹29,999/mo)
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-blue-600 transition-colors text-slate-600">
                  Custom Multi-Partner Firms
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance & Safeguards */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#0A192F] uppercase tracking-wider">
              Regulatory Standards
            </p>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ICAI Code of Ethics Compliant</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>SEBI RIA Norms Aligned</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>AMFI Guidelines Respected</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Written Pre-Approval</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200 space-y-4 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong className="text-[#0A192F] font-semibold">Professional Disclaimer:</strong> CAstory (castory.in) is an independent specialized digital growth consultancy and AI workflow implementation agency. We operate strictly in alignment with the guidelines issued by the Institute of Chartered Accountants of India (ICAI) pursuant to Clause 6 and Clause 7 of Part I of the First Schedule to the Chartered Accountants Act, 1949, as well as relevant circulars issued by SEBI and AMFI. We provide purely educational, informative, and technical infrastructure support. We do not solicit clients, publish comparative fees, guarantee financial returns, or broadcast promotional testimonials.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 text-slate-500 font-medium">
            <p>© 2026 CAstory (castory.in). All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <span className="text-[#0A192F]">Marathon Nexzone, Panvel, Navi Mumbai</span>
              <span>·</span>
              <span className="text-[#0A192F] font-semibold">
                Office: +91-8104468397
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
