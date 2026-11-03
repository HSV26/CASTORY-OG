import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PracticeAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookCall: () => void;
}

export const PracticeAuditModal: React.FC<PracticeAuditModalProps> = ({
  isOpen,
  onClose,
  onBookCall,
}) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<{
    acquisition: string;
    mapRanking: string;
    responseSpeed: string;
  }>({
    acquisition: '',
    mapRanking: '',
    responseSpeed: '',
  });

  if (!isOpen) return null;

  const handleSelect = (field: 'acquisition' | 'mapRanking' | 'responseSpeed', value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4); // Results step
    }
  };

  const calculateScore = () => {
    let score = 30; // base
    if (answers.acquisition.includes('Google') || answers.acquisition.includes('Digital')) score += 25;
    if (answers.mapRanking.includes('Top 3')) score += 30;
    else if (answers.mapRanking.includes('Page 1')) score += 15;
    if (answers.responseSpeed.includes('Automated') || answers.responseSpeed.includes('Instant')) score += 20;
    else if (answers.responseSpeed.includes('Within 1')) score += 10;
    return Math.min(score, 95);
  };

  const finalScore = calculateScore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-[#0A192F] p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step <= 3 ? (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                60-Second Practice Diagnostic · Step {step} of 3
              </span>
              <h3 className="text-xl font-bold text-[#0A192F]">
                {step === 1 && 'How does your firm currently acquire 80%+ of new clients?'}
                {step === 2 && 'When a business searches "CA near me" within 3 km of your office, where are you?'}
                {step === 3 && 'How quickly does your practice respond to a prospect inquiring at 7:30 PM?'}
              </h3>
            </div>

            <div className="space-y-3">
              {step === 1 && (
                <>
                  <button
                    onClick={() => handleSelect('acquisition', 'Referrals Only')}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-600 hover:bg-white transition-all text-xs font-semibold text-[#0A192F] cursor-pointer flex justify-between items-center shadow-xs"
                  >
                    <span>Purely word of mouth and existing client referrals (Slow / Seasonal)</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                  </button>
                  <button
                    onClick={() => handleSelect('acquisition', 'Some Digital')}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-600 hover:bg-white transition-all text-xs font-semibold text-[#0A192F] cursor-pointer flex justify-between items-center shadow-xs"
                  >
                    <span>Mostly referrals + occasional website/LinkedIn inquiries</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                  </button>
                  <button
                    onClick={() => handleSelect('acquisition', 'Google / Active Inbound')}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-600 hover:bg-white transition-all text-xs font-semibold text-[#0A192F] cursor-pointer flex justify-between items-center shadow-xs"
                  >
                    <span>Structured digital pipeline (Google Maps, website, content)</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <button
                    onClick={() => handleSelect('mapRanking', 'Top 3 on Google Maps')}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-600 hover:bg-white transition-all text-xs font-semibold text-[#0A192F] cursor-pointer flex justify-between items-center shadow-xs"
                  >
                    <span>Top 3 in Google Maps local 3-pack with regular reviews</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                  </button>
                  <button
                    onClick={() => handleSelect('mapRanking', 'Somewhere on Page 1 or 2')}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-600 hover:bg-white transition-all text-xs font-semibold text-[#0A192F] cursor-pointer flex justify-between items-center shadow-xs"
                  >
                    <span>Profile exists, but buried on Page 2 or below competitors</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                  </button>
                  <button
                    onClick={() => handleSelect('mapRanking', 'Not Claimed / Unsure')}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-600 hover:bg-white transition-all text-xs font-semibold text-[#0A192F] cursor-pointer flex justify-between items-center shadow-xs"
                  >
                    <span>Not verified, unoptimized, or never checked local ranking</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                  </button>
                </>
              )}

              {step === 3 && (
                <>
                  <button
                    onClick={() => handleSelect('responseSpeed', 'Next Business Day')}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-600 hover:bg-white transition-all text-xs font-semibold text-[#0A192F] cursor-pointer flex justify-between items-center shadow-xs"
                  >
                    <span>Next business morning (Risk: high-ticket leads contact another firm)</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                  </button>
                  <button
                    onClick={() => handleSelect('responseSpeed', 'Within 1 Hour Manually')}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-600 hover:bg-white transition-all text-xs font-semibold text-[#0A192F] cursor-pointer flex justify-between items-center shadow-xs"
                  >
                    <span>I or my partner reply manually if we happen to see the phone</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                  </button>
                  <button
                    onClick={() => handleSelect('responseSpeed', 'Automated Instant WhatsApp')}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-blue-600 hover:bg-white transition-all text-xs font-semibold text-[#0A192F] cursor-pointer flex justify-between items-center shadow-xs"
                  >
                    <span>Instant automated AI receptionist collects query & books call</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          /* Result View */
          <div className="space-y-6 animate-in zoom-in-95 duration-200 text-center">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                Practice Digital Authority Index
              </span>
              <h3 className="text-2xl font-bold text-[#0A192F]">
                Diagnostic Complete
              </h3>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-2">
              <div className="text-4xl sm:text-5xl font-extrabold text-[#0A192F] tabular-nums">
                {finalScore} <span className="text-xl text-slate-500 font-medium">/ 100</span>
              </div>
              <p className="text-xs font-medium text-slate-600">
                {finalScore < 60
                  ? 'High Growth Opportunity: Your practice is leaving significant corporate & tax inquiries on the table to local competitors.'
                  : 'Moderate Authority: You have a starting base, but need systematic compliance-safe content and AI instant reply automation to scale.'}
              </p>
            </div>

            <div className="text-left space-y-2 text-xs">
              <span className="font-bold text-[#0A192F] uppercase tracking-wider block">
                Top 3 Recommended Actions for Your Practice:
              </span>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Execute local Google Business Profile (GBP) ranking optimization to capture high-intent "CA near me" queries.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Deploy 100% compliant educational video reels and LinkedIn posts that build authority without regulatory risk.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Implement 24/7 AI WhatsApp instant qualification so evening and weekend enquiries convert into booked consultations.</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onBookCall();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Discuss Findings with CAstory (+91-8104468397)
              </button>

              <button
                onClick={() => {
                  setStep(1);
                  setAnswers({ acquisition: '', mapRanking: '', responseSpeed: '' });
                }}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A192F] text-xs font-semibold transition-colors cursor-pointer"
              >
                Retake
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
