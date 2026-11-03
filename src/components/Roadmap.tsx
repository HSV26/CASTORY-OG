import React, { useState } from 'react';
import { CalendarCheck, FileText, CheckCircle2, Sliders, PlayCircle, BarChart3, Clock, ArrowRight } from 'lucide-react';

interface RoadmapProps {
  onOpenConsultation: () => void;
}

export const Roadmap: React.FC<RoadmapProps> = ({ onOpenConsultation }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  const roadmapItems = [
    {
      days: 'Days 1–3',
      title: 'Formal Onboarding & Account Handshake',
      subtitle: 'Zero friction kickoff',
      description:
        'Signed mutual agreement detailing compliance protocols. You complete a simple 10-minute practice intake form outlining your core advisory specializations (e.g. Corporate Tax, GST, NRI estate planning, Statutory Audit). Access securely established for your Google Business Profile and social pages.',
      deliverables: [
        'Mutual compliance agreement signed',
        '10-minute practice intake form submitted',
        'Secure delegate access to GBP and social accounts',
      ],
      icon: FileText,
    },
    {
      days: 'Days 4–7',
      title: 'Practice Audit & Profile Clean-Up',
      subtitle: 'Deep forensic baseline',
      description:
        'We perform a comprehensive audit of your local presence: existing Google Map pin, NAP consistency (Name, Address, Phone), competitor keyword gaps in your micro-market, and website conversion speed. We fix outdated address records and duplicate citations.',
      deliverables: [
        'Local SEO & Google Maps forensic audit report',
        'NAP data standardization across local business directories',
        'Initial website mobile optimization checklist',
      ],
      icon: Sliders,
    },
    {
      days: 'Days 8–10',
      title: '30-Day Content Calendar & Pre-Approval',
      subtitle: 'Written sign-off before publishing',
      description:
        'Our editorial tax team submits your customized 30-day editorial calendar with fully written scripts, graphics previews, and caption copies for your written approval. You have full editorial authority to tweak, approve, or reject any post.',
      deliverables: [
        'Full 30-day content calendar delivered in PDF/Notion',
        'Word-for-word scripts adhering to ICAI & SEBI norms',
        'Client written sign-off protocol executed',
      ],
      icon: CalendarCheck,
    },
    {
      days: 'Days 11–30',
      title: 'Engine Live: Posting, Local SEO & WhatsApp Triage',
      subtitle: 'System execution phase',
      description:
        'Publishing officially commences. Your Google Business Profile is actively optimized for local ranking ("CA near me"). WhatsApp instant reply bot is deployed to capture and qualify incoming inquiries. Lead forms begin routing qualified prospects directly to your team.',
      deliverables: [
        'Educational reels & posts go live systematically',
        'GBP local authority posting & review flow active',
        'AI WhatsApp instant responsebot operational 24/7',
        'Lead intake forms connected to centralized CRM sheet',
      ],
      icon: PlayCircle,
    },
    {
      days: 'Day 30',
      title: 'First Month Performance Review & Strategy Calibration',
      subtitle: 'Data-driven accountability',
      description:
        'We deliver your comprehensive first-month performance scorecard detailing profile searches, discovery interactions, inquiries captured, and cost-per-consultation metrics. We conduct a 45-minute video review call to plan the next 60 days.',
      deliverables: [
        'Complete monthly inbound analytics dashboard',
        'Inquiry-to-consultation conversion breakdown',
        '45-minute strategic review call with senior growth partner',
      ],
      icon: BarChart3,
    },
  ];

  return (
    <section id="roadmap" className="py-20 lg:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Systematic Execution Timeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
              Your First 30 Days Roadmap
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We eliminate guesswork with a battle-tested rollout sequence designed to get your practice ranked, compliant, and capturing high-intent enquiries in 30 days.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#0A192F] font-semibold bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-100 self-start md:self-auto">
            <Clock className="w-4 h-4 text-blue-700" />
            <span>Smooth 10-Minute Partner Onboarding</span>
          </div>
        </div>

        {/* Desktop & Mobile Interactive Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Timeline Milestones Navigation (Left Column) */}
          <div className="lg:col-span-5 space-y-3">
            {roadmapItems.map((item, index) => {
              const isCurrent = selectedMilestone === index;
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedMilestone(index)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isCurrent
                      ? 'bg-blue-50/70 border-blue-600 shadow-sm ring-1 ring-blue-600/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isCurrent
                          ? 'bg-[#0A192F] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                          {item.days}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0A192F]">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold ${isCurrent ? 'text-blue-700' : 'text-slate-400'}`}
                  >
                    →
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Milestone Detail View (Right Column) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 space-y-6 shadow-md">
            <div className="space-y-2 border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                  {roadmapItems[selectedMilestone].days}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Phase {selectedMilestone + 1} of 5
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#0A192F]">
                {roadmapItems[selectedMilestone].title}
              </h3>
              <p className="text-xs font-semibold text-blue-700">
                {roadmapItems[selectedMilestone].subtitle}
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {roadmapItems[selectedMilestone].description}
            </p>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Milestone Deliverables:
              </span>
              <div className="space-y-2.5">
                {roadmapItems[selectedMilestone].deliverables.map((d, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[#0A192F] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-600 font-medium text-center sm:text-left">
                Ready to initiate Day 1 this week?
              </span>
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#0A192F] hover:bg-[#132A4B] rounded-xl transition-all cursor-pointer shadow-xs"
              >
                <span>Book Practice Onboarding Discovery Call</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
