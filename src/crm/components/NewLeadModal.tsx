import React, { useState } from 'react';
import { LeadStage } from '../types';
import { X, Plus, Building2, User, Phone, MapPin, Mail, DollarSign } from 'lucide-react';
import { KANBAN_STAGES } from './CrmKanban';

interface NewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (data: {
    firmName: string;
    contactPerson: string;
    profession: string;
    location: string;
    phone: string;
    email: string;
    status: LeadStage;
    packageTier: string;
    monthlyValue: number;
    assignedAgent: string;
  }) => void;
}

export const NewLeadModal: React.FC<NewLeadModalProps> = ({
  isOpen,
  onClose,
  onAddLead,
}) => {
  const [firmName, setFirmName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [profession, setProfession] = useState('Chartered Accountant');
  const [location, setLocation] = useState('Panvel, Navi Mumbai');
  const [phone, setPhone] = useState('+91 ');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<LeadStage>('New Lead');
  const [packageTier, setPackageTier] = useState('Growth (₹14,999)');
  const [assignedAgent, setAssignedAgent] = useState('Vikram Patil');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const monthlyValue = packageTier.includes('7,499')
      ? 7499
      : packageTier.includes('29,999')
      ? 29999
      : 14999;

    onAddLead({
      firmName: firmName.trim(),
      contactPerson: contactPerson.trim(),
      profession,
      location: location.trim(),
      phone: phone.trim(),
      email: email.trim() || 'contact@practice.in',
      status,
      packageTier,
      monthlyValue,
      assignedAgent,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-[#0A192F] hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Inbound Pipeline Intake
            </span>
            <h3 className="text-xl font-bold text-[#0A192F]">
              Add New Practice Lead
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              Enter firm and partner contact details to initiate automated follow-ups.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[#0A192F] font-semibold">Firm / Practice Name *</label>
                <input
                  type="text"
                  required
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  placeholder="e.g. Somani & Co. Chartered Accountants"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#0A192F] font-semibold">Contact Person / Partner *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. CA Ramesh Somani"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[#0A192F] font-semibold">Profession / Specialization</label>
                <select
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F]"
                >
                  <option value="Chartered Accountant">Chartered Accountant (Practicing)</option>
                  <option value="Tax Consultant">Tax & GST Consultant</option>
                  <option value="Financial Advisor">Financial Advisor / Wealth Manager</option>
                  <option value="Multi-partner CA Firm">Multi-partner CA Firm</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#0A192F] font-semibold">Location / Commercial Zone *</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Panvel, Marathon Nexzone"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[#0A192F] font-semibold">WhatsApp / Phone *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98200 XXXXX"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#0A192F] font-semibold">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@firm.in"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[#0A192F] font-semibold">Initial Stage</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as LeadStage)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[#0A192F]"
                >
                  {KANBAN_STAGES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#0A192F] font-semibold">Package Tier</label>
                <select
                  value={packageTier}
                  onChange={(e) => setPackageTier(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[#0A192F]"
                >
                  <option value="Starter (₹7,499)">Starter (₹7,499)</option>
                  <option value="Growth (₹14,999)">Growth (₹14,999)</option>
                  <option value="Premium (₹29,999)">Premium (₹29,999)</option>
                  <option value="Custom Enterprise">Custom Enterprise</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#0A192F] font-semibold">Assigned Agent</label>
                <select
                  value={assignedAgent}
                  onChange={(e) => setAssignedAgent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[#0A192F]"
                >
                  <option value="Vikram Patil">Vikram Patil</option>
                  <option value="Pooja Deshmukh">Pooja Deshmukh</option>
                  <option value="Rajesh Sharma (Admin)">Rajesh Sharma (Admin)</option>
                </select>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4 text-blue-400" />
                <span>Create Lead Record</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
