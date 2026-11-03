import React, { useState } from 'react';
import { AlertCircle, Search, ShieldAlert, CheckCircle, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import caExpertImg from '../assets/images/ca_expert_meeting_1793717820687.jpg';

interface ProblemSolutionProps {
  onOpenConsultation: () => void;
}

export const ProblemSolution: React.FC<ProblemSolutionProps> = ({ onOpenConsultation }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: '01',
      title: 'Get Found',
      subtitle: 'Google Business Profile, Local SEO & High-Speed Website',
      description:
        'When business owners search "Chartered Accountant near me", "GST consultant in Panvel/Navi Mumbai", or "corporate tax audit", your practice appears in the top 3 Google Map pack with verified citations, correct NAP data, and a fast, mobile-friendly landing page.',
      deliverables: ['Google Business Profile (GBP) Top 3 local ranking', 'Optimized localized landing pages', 'Schema markup & local directory citations'],
      icon: Search,
    },
    {
      num: '02',
      title: 'Build Trust',
      subtitle: 'Authoritative Educational Posts & Reels That Demonstrate Mastery',
      description:
        'We produce strictly informational, high-retention video reels and LinkedIn carousels on timely subjects—Advance Tax rules, Section 54 capital gains, GST audit checklists, Union Budget updates. Zero fluff, 100% compliant with ICAI guidelines.',
      deliverables: ['8 to 20 scripted educational reels/month', 'Written pre-approval workflow on all scripts', 'Clean, modern typography & branded visual assets'],
      icon: Sparkles,
    },
    {
      num: '03',
      title: 'Capture Enquiries',
      subtitle: 'Instant WhatsApp Replies, Intake Forms & Follow-up Tracking',
      description:
        'Over 70% of high-intent clients contact practices outside of traditional 10 AM-6 PM office hours. Our AI-assisted WhatsApp automation greets prospects in under 60 seconds, pre-qualifies their tax or audit needs, and books consultations directly on your calendar.',
      deliverables: ['Automated WhatsApp qualification flow', 'Calendar booking link integration', 'Centralized CRM tracking sheet so no lead is lost'],
      icon: MessageSquare,
    },
  ];

  return (
    <section id="framework" className="py-20 lg:py-28 bg-slate-50/70 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* Section 2A: The Problem */}
        <div className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              The Reality of Accounting Practice Growth
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight text-balance">
              Why relying purely on referrals leaves your firm vulnerable.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Word of mouth built your firm's foundation. But today’s business owners make decisions differently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Problem Card 1 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0A192F]">
                Referral-Only Growth is Slow & Unpredictable
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Referrals come in unpredictable waves, often skewed toward tax season deadlines. You cannot forecast staff capacity, practice revenue, or client lifetime value without a steady inbound pipeline.
              </p>
            </div>

            {/* Problem Card 2 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0A192F]">
                High-Value Clients Search Before They Ever Call
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Even when a friend recommends your firm, modern directors, founders, and NRIs immediately look you up on Google Maps, LinkedIn, and your website. If your digital presence looks neglected or invisible, they pick your competitor.
              </p>
            </div>

            {/* Problem Card 3 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0A192F]">
                Generic Marketing Violates Regulatory Rules
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Generic digital agencies don't understand ICAI Council Guidelines, SEBI RIA regulations, or AMFI norms. Running hype-filled ads or discount promos puts your Certificate of Practice (COP) at severe regulatory risk.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2B: Our Solution - The 3-Step Growth Framework */}
        <div className="space-y-10 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                Our Engineered Solution
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
                The 3-Step Growth Framework for Modern Practices
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                A structured, non-aggressive flywheel that establishes genuine authority while staying 100% within ethical guidelines.
              </p>
            </div>

            {/* Step selector pills */}
            <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-xl border border-slate-200 shadow-xs self-start md:self-auto">
              {steps.map((s, idx) => (
                <button
                  key={s.num}
                  onClick={() => setActiveStep(idx + 1)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    activeStep === idx + 1
                      ? 'bg-[#0A192F] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0A192F]'
                  }`}
                >
                  Step {s.num}
                </button>
              ))}
            </div>
          </div>

          {/* Framework Interactive Visual & Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visual Image / Showcase */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 bg-white relative group shadow-lg">
              <img
                src={caExpertImg}
                alt="Chartered accountant discussing strategic advisory with client"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover min-h-[340px] max-h-[460px] lg:max-h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/20 to-transparent opacity-80" />
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">Predictable Practice Inbound</p>
                <p className="text-sm text-[#0A192F] font-semibold mt-0.5">
                  "Clients choose CAs who clearly educate before they bill."
                </p>
              </div>
            </div>

            {/* Interactive Steps List */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx + 1;
                return (
                  <div
                    key={step.num}
                    onClick={() => setActiveStep(idx + 1)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white border-blue-600 shadow-md ring-1 ring-blue-600/20'
                        : 'bg-white/80 border-slate-200 hover:border-slate-300 opacity-90 hover:opacity-100 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                          isActive
                            ? 'bg-[#0A192F] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {step.num}
                      </div>

                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-[#0A192F]">
                            {step.title}
                          </h3>
                          <span className="text-xs text-blue-700 font-semibold hidden sm:inline">
                            {step.subtitle.split('&')[0]}
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-slate-500">
                          {step.subtitle}
                        </p>

                        <p className="text-sm text-slate-600 leading-relaxed pt-1">
                          {step.description}
                        </p>

                        {isActive && (
                          <div className="pt-3 border-t border-slate-100 space-y-2 animate-in fade-in duration-300">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                              Key Deliverables:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                              {step.deliverables.map((item, dIdx) => (
                                <div key={dIdx} className="flex items-center gap-2 text-xs text-[#0A192F] font-medium">
                                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0A192F] hover:bg-[#132A4B] rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg"
                >
                  <span>Implement the 3-Step Framework for Your Firm</span>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
