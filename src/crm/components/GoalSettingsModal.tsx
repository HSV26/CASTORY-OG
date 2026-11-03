import React, { useState } from 'react';
import { X, Target, Sparkles, Check, DollarSign, Award, Building } from 'lucide-react';

export interface CrmGoals {
  monthlyRevenueTarget: number;
  monthlyClientTarget: number;
  cohortCap: number;
}

const GOALS_STORAGE_KEY = 'castory_crm_custom_goals';

export const getStoredGoals = (): CrmGoals => {
  try {
    const stored = localStorage.getItem(GOALS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // fallback
  }
  return {
    monthlyRevenueTarget: 150000,
    monthlyClientTarget: 10,
    cohortCap: 10,
  };
};

export const saveStoredGoals = (goals: CrmGoals) => {
  try {
    localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
  } catch {
    // fallback
  }
};

interface GoalSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goals: CrmGoals) => void;
}

export const GoalSettingsModal: React.FC<GoalSettingsModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const current = getStoredGoals();
  const [revenueTarget, setRevenueTarget] = useState<number>(current.monthlyRevenueTarget);
  const [clientTarget, setClientTarget] = useState<number>(current.monthlyClientTarget);
  const [cohortCap, setCohortCap] = useState<number>(current.cohortCap);

  if (!isOpen) return null;

  const handlePreset = (rev: number, client: number, cap: number) => {
    setRevenueTarget(rev);
    setClientTarget(client);
    setCohortCap(cap);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CrmGoals = {
      monthlyRevenueTarget: Number(revenueTarget) || 150000,
      monthlyClientTarget: Number(clientTarget) || 10,
      cohortCap: Number(cohortCap) || 10,
    };
    saveStoredGoals(updated);
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-[#0A192F] p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Strategic Cohort Configuration</span>
          </div>
          <h3 className="text-2xl font-bold text-[#0A192F]">
            Select Your Practice Targets
          </h3>
          <p className="text-xs text-slate-600 font-normal">
            Customize your monthly revenue goals, client closure targets, and micro-market capacity caps.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Quick Preset Modes:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handlePreset(75000, 5, 10)}
              className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-600 text-left transition-all cursor-pointer space-y-1"
            >
              <span className="text-xs font-bold text-[#0A192F] block">Conservative</span>
              <span className="text-[10px] text-slate-500 block">₹75k/mo · 5 practices</span>
            </button>
            <button
              type="button"
              onClick={() => handlePreset(150000, 10, 10)}
              className="p-3 rounded-2xl border-2 border-blue-600 bg-blue-50/50 hover:bg-blue-50 text-left transition-all cursor-pointer space-y-1"
            >
              <span className="text-xs font-bold text-blue-900 block flex items-center gap-1">
                <span>Growth</span>
                <Sparkles className="w-3 h-3 text-amber-500" />
              </span>
              <span className="text-[10px] text-blue-700 block">₹1.5L/mo · 10 practices</span>
            </button>
            <button
              type="button"
              onClick={() => handlePreset(300000, 20, 25)}
              className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-600 text-left transition-all cursor-pointer space-y-1"
            >
              <span className="text-xs font-bold text-[#0A192F] block">Aggressive Scale</span>
              <span className="text-[10px] text-slate-500 block">₹3L/mo · 20 practices</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
          <div className="space-y-1">
            <label className="text-[#0A192F] font-semibold flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-blue-600" />
              <span>Monthly Recurring Revenue Target (₹ / month)</span>
            </label>
            <input
              type="number"
              step="5000"
              required
              value={revenueTarget}
              onChange={(e) => setRevenueTarget(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F] font-bold focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[#0A192F] font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>Monthly Closed Clients Target</span>
              </label>
              <input
                type="number"
                required
                value={clientTarget}
                onChange={(e) => setClientTarget(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F] font-bold focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#0A192F] font-semibold flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>Micro-Market Cohort Cap</span>
              </label>
              <input
                type="number"
                required
                value={cohortCap}
                onChange={(e) => setCohortCap(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0A192F] font-bold focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A192F] font-bold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white font-bold text-xs transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 text-amber-400" />
              <span>Save & Update Targets</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
