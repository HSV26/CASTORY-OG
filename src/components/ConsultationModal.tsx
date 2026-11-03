import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { PracticeType, ConsultationFormData } from '../types';
import { addCrmLead } from '../crm/crmStorage';
import { sanitizeObject } from '../utils/sanitize';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialPackage,
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    practiceName: '',
    practiceType: 'Chartered Accountant',
    city: '',
    phone: '',
    email: '',
    selectedPackage: initialPackage || 'Growth Package (₹14,999/mo)',
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cleanData = sanitizeObject(formData);

    // Save lead to localStorage and push directly into CRM
    try {
      const existingLeads = JSON.parse(localStorage.getItem('castory_inbound_leads') || '[]');
      const inboundRecord = {
        id: 'LEAD-' + Date.now(),
        ...cleanData,
        submittedAt: new Date().toISOString(),
        forwardedToWhatsAppNumber: '+91-8104468397',
        status: 'Pending Partner Outreach',
      };
      localStorage.setItem('castory_inbound_leads', JSON.stringify([inboundRecord, ...existingLeads]));

      // Also add directly to CRM pipeline so it shows up in CRM immediately
      const pkg = cleanData.selectedPackage || 'Growth Package (₹14,999/mo)';
      const isStarter = pkg.includes('Starter');
      const isPremium = pkg.includes('Premium');
      const monthlyValue = isStarter ? 7499 : isPremium ? 29999 : 14999;

      addCrmLead({
        firmName: cleanData.practiceName || 'Inbound Practice',
        contactPerson: cleanData.name || 'Practice Partner',
        profession: cleanData.practiceType,
        location: cleanData.city || 'Navi Mumbai',
        phone: cleanData.phone,
        email: cleanData.email || 'inbound@castory.in',
        status: 'New Lead',
        packageTier: pkg,
        monthlyValue,
        assignedAgent: 'Vikram Patil',
      });
    } catch (err) {
      console.error('Failed to save inbound lead to CRM', err);
    }

    // Process submission and show immediate on-page confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-9 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-400 hover:text-[#0A192F] p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                Discovery Session
              </span>
              <h3 className="text-2xl font-bold text-[#0A192F]">
                Book a Practice Consultation
              </h3>
              <p className="text-xs text-slate-600 font-normal">
                Submit your practice details below. Our team will review your practice and reach out directly to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#0A192F] font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. CA Rajesh Mehta"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#0A192F] font-semibold">Firm / Practice Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.practiceName}
                    onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
                    placeholder="e.g. R. Mehta & Co."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#0A192F] font-semibold">Practice Specialization</label>
                  <select
                    value={formData.practiceType}
                    onChange={(e) => setFormData({ ...formData, practiceType: e.target.value as PracticeType })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F] focus:outline-none focus:border-blue-600 focus:bg-white"
                  >
                    <option value="Chartered Accountant">Chartered Accountant (Practicing)</option>
                    <option value="Tax Consultant">Tax & GST Consultant</option>
                    <option value="Financial Advisor">Financial Advisor / Wealth Manager</option>
                    <option value="CA Firm (Multi-partner)">Multi-Partner CA Firm</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#0A192F] font-semibold">City / Locality *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Panvel, Navi Mumbai"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#0A192F] font-semibold">WhatsApp / Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98200 XXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#0A192F] font-semibold">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="office@yourfirm.in"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#0A192F] font-semibold">Package of Interest</label>
                <select
                  value={formData.selectedPackage}
                  onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F] focus:outline-none focus:border-blue-600 focus:bg-white"
                >
                  <option value="Growth Package (Top Choice - ₹14,999/mo)">Growth Package (Top Choice - ₹14,999/mo)</option>
                  <option value="Starter Package (₹7,499/mo)">Starter Package (₹7,499/mo)</option>
                  <option value="Premium Package (₹29,999/mo)">Premium Package (₹29,999/mo)</option>
                  <option value="Custom Multi-City Advisory Solution">Custom Multi-City Advisory Solution</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#0A192F] font-semibold">Specific Questions or Focus Area (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="e.g. Want to rank #1 on Google Maps for Navi Mumbai corporate clients, need WhatsApp receptionist."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              {/* SINGLE SUBMIT BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting Your Practice Details...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-blue-400" />
                      <span>Submit Consultation Request</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>100% Confidential. Once submitted, our team will connect directly with you.</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation state - NO WHATSAPP REDIRECTION */
          <div className="text-center py-6 sm:py-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                Details Transmitted Successfully
              </span>
              <h3 className="text-2xl font-bold text-[#0A192F]">
                Thank You, {formData.name || 'Partner'}!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your practice inquiry has been automatically dispatched to our partner desk at <strong className="text-[#0A192F]">+91-8104468397</strong>.
              </p>
            </div>

            {/* Clear Next Steps Box */}
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-left max-w-md mx-auto space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
                <UserCheck className="w-4 h-4 text-blue-700" />
                <span>What Happens Next?</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                <strong>You do not need to do anything further.</strong> Our senior growth consultant will review your practice requirements and connect directly with you on your WhatsApp / Phone (<span className="text-[#0A192F] font-bold">{formData.phone}</span>) within 2 business hours.
              </p>
            </div>

            {/* Summary Details */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2 text-left max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Practice:</span>
                <span className="font-bold text-[#0A192F]">{formData.practiceName || 'Your Practice'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Specialization:</span>
                <span className="font-semibold text-[#0A192F]">{formData.practiceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">City:</span>
                <span className="font-bold text-[#0A192F]">{formData.city || 'Panvel / Navi Mumbai'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Package:</span>
                <span className="font-bold text-blue-700">{formData.selectedPackage}</span>
              </div>
            </div>

            {/* Single Close Button */}
            <div className="pt-2 max-w-md mx-auto">
              <button
                onClick={handleReset}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
              >
                Done · Return to Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
