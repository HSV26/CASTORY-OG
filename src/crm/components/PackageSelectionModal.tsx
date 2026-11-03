import React, { useState } from 'react';
import { Lead, PackageTierOption } from '../types';
import {
  X,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';

interface PackageSelectionModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmTier: (leadId: string, tier: PackageTierOption) => void;
}

export const PACKAGE_TIERS: {
  id: PackageTierOption;
  name: string;
  price: string;
  numericPrice: number;
  badge?: string;
  description: string;
  features: string[];
  recommended?: boolean;
}[] = [
  {
    id: 'Starter Package (₹7,499/mo)',
    name: 'Starter Package',
    price: '₹7,499',
    numericPrice: 7499,
    description: 'Foundational Digital Authority for emerging practices or solo Chartered Accountants.',
    features: [
      'Google Maps & GBP Local Optimization (Top 3 pack target)',
      '4 Monthly Compliance-Safe Educational Infographics',
      'Google Review Acceleration & QR Counter Stand',
      'Standard WhatsApp Click-to-Inquiry Routing',
      '100% ICAI Clause 6 & 7 Compliance Guaranteed',
    ],
  },
  {
    id: 'Growth Package (₹14,999/mo)',
    name: 'Growth Package',
    price: '₹14,999',
    numericPrice: 14999,
    badge: 'MOST POPULAR · TOP CHOICE',
    recommended: true,
    description: 'Specialized client acquisition engine for established firms seeking regular high-intent advisory clients.',
    features: [
      'Complete Hyper-Local SEO across 40+ Verified Directories',
      '8 High-Impact Educational Tax & GST Reels / Scripts',
      '24/7 AI WhatsApp Receptionist & Lead Qualification Intake',
      'Instant SMS & WhatsApp Alerts to Managing Partner',
      'Monthly Practice Authority & Keyword Rank Progress Report',
    ],
  },
  {
    id: 'Premium Package (₹29,999/mo)',
    name: 'Premium Package',
    price: '₹29,999',
    numericPrice: 29999,
    badge: 'TOTAL AUTHORITY',
    description: 'Total digital authority, high-production media, and full multi-partner AI workflow automation.',
    features: [
      'Omni-Channel Local Authority across Multiple Branches/Partners',
      '16 Custom Video Reels & Thought Leadership Carousel Decks',
      'Custom AI Workflow Automation (Document routing & appointment triage)',
      'Dedicated Senior Account Strategist & Priority Creative Desk',
      'Bi-Weekly Inbound Performance Audits & ROI Tracking',
    ],
  },
];

export const PackageSelectionModal: React.FC<PackageSelectionModalProps> = ({
  lead,
  isOpen,
  onClose,
  onConfirmTier,
}) => {
  const [selectedTier, setSelectedTier] = useState<PackageTierOption>('Growth Package (₹14,999/mo)');

  if (!isOpen || !lead) return null;

  const handleConfirm = () => {
    onConfirmTier(lead.id, selectedTier);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Deal Won · Select Retainer Tier</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F]">
              Confirm Closed/Won Package
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Select the service tier chosen by <strong className="text-[#0A192F]">{lead.firmName}</strong> ({lead.contactPerson}). This will automatically generate their 30-Day Client Onboarding & Execution SOP Checklist.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-[#0A192F] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
          {PACKAGE_TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`relative flex flex-col justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 shadow-md ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-wide uppercase bg-blue-600 text-white shadow-xs">
                    {tier.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {tier.name}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="text-2xl font-black text-[#0A192F]">{tier.price}</span>
                    <span className="text-xs text-slate-500 font-medium"> / month</span>
                  </div>

                  <p className="text-[11px] text-slate-600 mb-4 leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
                      Included Deliverables:
                    </span>
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 text-center">
                  <span
                    className={`inline-block w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ Selected Tier' : 'Select Tier'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Automation Notice */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex items-start gap-3 text-xs text-amber-900">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#0A192F] block">
              Automated SOP Checklist Generation
            </span>
            <p className="text-amber-800 font-normal leading-relaxed mt-0.5">
              Confirming this tier will automatically instantiate the <strong>4-Phase Client Onboarding & Execution SOP Checklist</strong> (Phase 1: Access Handover, Phase 2: Audit & Setup, Phase 3: Content Drafting & Pre-Approval, Phase 4: Live Engine Deployment) inside {lead.firmName}'s profile.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-200 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <span>Confirm Deal & Generate SOP Checklist</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
