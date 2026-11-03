import React, { useState } from 'react';
import { ShieldCheck, FileCheck, CheckCircle2, Lock, Eye, AlertOctagon } from 'lucide-react';

export const CompliancePromise: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'icai' | 'sebi' | 'amfi'>('icai');

  return (
    <section id="compliance" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Compliance Hero Box - Tech Agency White Card with Deep Navy & Blue Borders */}
        <div className="relative rounded-3xl border border-slate-200/90 bg-gradient-to-b from-blue-50/40 via-white to-white p-8 sm:p-12 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  The Non-Negotiable Standard
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F]">
                  The Compliance Promise
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold self-start sm:self-auto">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Risk-Free to Certificate of Practice</span>
            </div>
          </div>

          {/* Exact Mandatory Statement */}
          <div className="bg-slate-50/90 rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <blockquote className="text-lg sm:text-xl md:text-2xl font-bold text-[#0A192F] leading-relaxed text-balance">
              “100% Compliance Guaranteed. Only informational and educational content as per ICAI, SEBI, and AMFI norms. No assured returns, fee offers, or client testimonials. You approve every piece of content before it goes live.”
            </blockquote>
            <p className="mt-4 text-xs sm:text-sm font-semibold text-blue-700 flex items-center gap-2">
              <span>— CAstory Ethical Practice Charter</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Panvel, Navi Mumbai</span>
            </p>
          </div>

          {/* 4 Pillars of Regulatory Security */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
            <div className="space-y-2.5 p-4 rounded-xl bg-white border border-slate-100 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700">
                <FileCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0A192F]">Zero Testimonial Rule</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We never publish promotional client endorsements, awards claims, or fee comparisons prohibited under ICAI advertising restrictions.
              </p>
            </div>

            <div className="space-y-2.5 p-4 rounded-xl bg-white border border-slate-100 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0A192F]">No Assured Returns</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For financial advisors & wealth planners, every publication complies strictly with SEBI RIA guidelines. Never any yield or return promises.
              </p>
            </div>

            <div className="space-y-2.5 p-4 rounded-xl bg-white border border-slate-100 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700">
                <Eye className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0A192F]">100% Written Pre-Approval</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nothing is published, posted, or broadcast until your firm reviews and explicitly approves the exact copy, graphics, and video scripts.
              </p>
            </div>

            <div className="space-y-2.5 p-4 rounded-xl bg-white border border-slate-100 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0A192F]">Client Data Privacy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All client interaction records, tax filing intake documents, and phone numbers remain strictly confidential on encrypted Indian servers.
              </p>
            </div>
          </div>

          {/* Interactive Regulatory Code Selector */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Explore Regulatory Safeguards by Body:
              </span>
              <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  onClick={() => setSelectedTab('icai')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedTab === 'icai'
                      ? 'bg-[#0A192F] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0A192F]'
                  }`}
                >
                  ICAI Code of Ethics
                </button>
                <button
                  onClick={() => setSelectedTab('sebi')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedTab === 'sebi'
                      ? 'bg-[#0A192F] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0A192F]'
                  }`}
                >
                  SEBI RIA Regulations
                </button>
                <button
                  onClick={() => setSelectedTab('amfi')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedTab === 'amfi'
                      ? 'bg-[#0A192F] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0A192F]'
                  }`}
                >
                  AMFI Code of Conduct
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed shadow-xs">
              {selectedTab === 'icai' && (
                <div className="space-y-1.5">
                  <span className="font-bold text-[#0A192F]">ICAI Council Guidelines (Clause 6 & 7 of First Schedule):</span>
                  <p>
                    Chartered Accountants are barred from soliciting clients through advertisements or cold outreach. Our agency builds strictly educational, thought-leadership assets (e.g. "Understanding New Corporate Tax Slabs", "GST ITC Mismatch Notices"). Inbound inquiries are initiated voluntarily by the prospective client.
                  </p>
                </div>
              )}
              {selectedTab === 'sebi' && (
                <div className="space-y-1.5">
                  <span className="font-bold text-[#0A192F]">SEBI (Investment Advisers) Regulations, 2013:</span>
                  <p>
                    All content curated for Registered Investment Advisers maintains strict objectivity. No stock tips, speculative trading signals, or assured return projections. Only financial literacy and risk profiling education.
                  </p>
                </div>
              )}
              {selectedTab === 'amfi' && (
                <div className="space-y-1.5">
                  <span className="font-bold text-[#0A192F]">AMFI Guidelines for Mutual Fund Distributors (MFDs):</span>
                  <p>
                    Includes standard regulatory disclaimers, clear distinction between past performance and future risk, and zero unapproved commission incentives. Full adherence to the AMFI Code of Conduct.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
