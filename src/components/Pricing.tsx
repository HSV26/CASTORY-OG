import React from 'react';
import { Check, Star, ArrowUpRight } from 'lucide-react';
import { PackageDetail } from '../types';

interface PricingProps {
  onSelectPackage: (packageName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPackage }) => {
  const packages: PackageDetail[] = [
    {
      id: 'starter',
      name: 'Starter Package',
      tagline: 'Foundational Digital Authority',
      priceMonthly: 7499,
      minMonths: 3,
      bestFor: 'Best for new or small practices wanting to look professional online.',
      features: [
        '8 educational reels / carousels per month',
        'Google Business Profile (GBP) complete setup & optimization',
        'Local keyword targeting ("CA in [Your Locality]")',
        'Simple inbound inquiry tracking sheet',
        'Written pre-approval on 100% of content',
        'Monthly performance & analytics report',
      ],
    },
    {
      id: 'growth',
      name: 'Growth Package',
      tagline: 'Top Choice for Inbound Client Generation',
      badge: 'TOP CHOICE',
      priceMonthly: 14999,
      minMonths: 3,
      highlight: true,
      bestFor: 'Best for established practices wanting regular clients.',
      features: [
        '16 educational reels / content assets per month',
        '1–3 page mobile-friendly website / landing page optimization',
        'Local SEO ranking engine for "CA near me" & tax keywords',
        'Client review request flow (WhatsApp trigger)',
        'Automatic WhatsApp reply & consultation intake bot',
        'Optional ads management (Google / Meta hyper-local campaigns)',
        'Bi-weekly lead performance tracking & optimization',
      ],
    },
    {
      id: 'premium',
      name: 'Premium Package',
      tagline: 'Total Practice Authority & Full AI Automation',
      priceMonthly: 29999,
      minMonths: 6,
      bestFor: 'Best for larger firms or personal brands building total authority.',
      features: [
        '20 high-retention reels & personal brand assets per month',
        'Personal brand content strategy for Senior Partners',
        'Video shoots & executive webinar production assistance',
        'AI Voice Receptionist + WhatsApp 24/7 client triage',
        'Custom CRM lead tracking & consultation pipeline',
        'Full ads management across Google Search & LinkedIn',
        'Dedicated monthly 45-min strategic review call with Agency Director',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
            Clear, Transparent Investment
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A192F] tracking-tight">
            Tailored Packages for Every Stage of Practice
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            No surprise add-ons. No generic agency retainers. Choose the proven growth tier built specifically for chartered accountants and tax firms.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className={`rounded-3xl flex flex-col justify-between transition-all duration-300 relative bg-white ${
                  pkg.highlight
                    ? 'border-2 border-blue-600 shadow-xl shadow-blue-900/10 lg:-translate-y-2 ring-4 ring-blue-600/10'
                    : 'border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    <span>{pkg.badge}</span>
                  </div>
                )}

                <div className="p-8 sm:p-9 space-y-6">
                  {/* Card Title & Best For */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#0A192F]">
                      {pkg.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-700">
                      {pkg.tagline}
                    </p>
                    <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                      {pkg.bestFor}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-4 pb-2 border-t border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tabular-nums">
                        ₹{pkg.priceMonthly.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/ month</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
                      <span>Min term: {pkg.minMonths} months</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Everything Included:
                    </span>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-[#0A192F]">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.highlight ? 'text-blue-600 font-bold' : 'text-slate-500'}`} />
                          <span className="leading-relaxed font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="p-8 sm:p-9 pt-0">
                  <button
                    onClick={() => onSelectPackage(pkg.name)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      pkg.highlight
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                        : 'bg-[#0A192F] hover:bg-[#132A4B] text-white shadow-xs'
                    }`}
                  >
                    <span>Get Started with {pkg.name}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-slate-500 mt-2.5 font-medium">
                    100% pre-approval on all content before posting
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom requirements banner */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-[#0A192F]">Need a multi-city firm strategy or custom video shoot package?</h4>
            <p className="text-xs text-slate-600">We work directly with senior managing partners across Navi Mumbai, Mumbai, and pan-India.</p>
          </div>
          <button
            onClick={() => onSelectPackage('Custom Multi-City Advisory Solution')}
            className="px-5 py-3 text-xs font-bold text-white bg-[#0A192F] hover:bg-[#132A4B] rounded-xl whitespace-nowrap shadow-xs cursor-pointer"
          >
            Request Custom Firm Proposal
          </button>
        </div>
      </div>
    </section>
  );
};
