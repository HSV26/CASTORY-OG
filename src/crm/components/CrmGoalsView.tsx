import React, { useState } from 'react';
import { Lead, PipelineStats } from '../types';
import { getStoredGoals, saveStoredGoals, CrmGoals } from './GoalSettingsModal';
import { Target, Sparkles, DollarSign, Award, Building, Check, TrendingUp } from 'lucide-react';

interface CrmGoalsViewProps {
  leads: Lead[];
  stats: PipelineStats;
}

export const CrmGoalsView: React.FC<CrmGoalsViewProps> = ({ leads, stats }) => {
  const [goals, setGoals] = useState<CrmGoals>(getStoredGoals());
  const [revenueTarget, setRevenueTarget] = useState<number>(goals.monthlyRevenueTarget);
  const [clientTarget, setClientTarget] = useState<number>(goals.monthlyClientTarget);
  const [cohortCap, setCohortCap] = useState<number>(goals.cohortCap);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const closedWonLeads = leads.filter((l) => l.status === 'Closed/Won');
  const currentMRR = closedWonLeads.reduce((acc, curr) => acc + (curr.monthlyValue || 14999), 0);
  const monthlyRevenueTarget = goals.monthlyRevenueTarget;
  const revenuePercentage = monthlyRevenueTarget > 0 ? Math.min(Math.round((currentMRR / monthlyRevenueTarget) * 100), 100) : 0;
  const annualizedRunRate = currentMRR * 12;
  const targetARR = monthlyRevenueTarget * 12;
  const arpu = closedWonLeads.length > 0 ? Math.round(currentMRR / closedWonLeads.length) : 14999;

  const handlePreset = (rev: number, client: number, cap: number) => {
    setRevenueTarget(rev);
    setClientTarget(client);
    setCohortCap(cap);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CrmGoals = {
      monthlyRevenueTarget: Number(revenueTarget) || 150000,
      monthlyClientTarget: Number(clientTarget) || 10,
      cohortCap: Number(cohortCap) || 10,
    };
    saveStoredGoals(updated);
    setGoals(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-50 via-white to-blue-50/40 p-6 rounded-3xl border border-blue-200/80 shadow-xs">
        <div className="space-y-1">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
            Strategic Command
          </span>
          <h2 className="text-2xl font-extrabold text-[#0A192F]">
            Practice Goals & Revenue Targets
          </h2>
          <p className="text-xs text-slate-600 font-normal">
            Configure monthly recurring revenue goals, client acquisition quotas, and micro-market capacity.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Targets Updated Successfully!</span>
          </div>
        )}
      </div>

      {/* Revenue Goal Metre Card */}
      <div className="bg-gradient-to-br from-[#0A192F] via-[#132A4B] to-[#0A192F] text-white border border-amber-500/30 shadow-xl rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Elite Financial Revenue Goal Metre</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Monthly Recurring Revenue (MRR) & Cohort Status
            </h3>
            <p className="text-xs text-slate-300 font-normal">
              Tracking active recurring retainers across Panvel & Navi Mumbai CA practices.
            </p>
          </div>

          <div className="text-left md:text-right bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
            <span className="text-xs text-slate-400 block uppercase tracking-wider">Target Achievement</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 tabular-nums">
              {revenuePercentage}%
            </span>
            <span className="text-[11px] text-slate-300 block">
              ₹{(monthlyRevenueTarget - currentMRR > 0 ? monthlyRevenueTarget - currentMRR : 0).toLocaleString('en-IN')} to target
            </span>
          </div>
        </div>

        {/* Goal Metre Progress Bar */}
        <div className="space-y-2 relative z-10">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-300">
              Current MRR: <strong className="text-white">₹{currentMRR.toLocaleString('en-IN')}/mo</strong>
            </span>
            <span className="text-amber-300">
              Monthly Goal: ₹{monthlyRevenueTarget.toLocaleString('en-IN')}/mo
            </span>
          </div>
          <div className="w-full h-4 bg-slate-900/80 rounded-full overflow-hidden p-0.5 border border-white/10 flex">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 rounded-full transition-all duration-1000 shadow-lg"
              style={{ width: `${revenuePercentage}%` }}
            />
          </div>
        </div>

        {/* Sub-Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 relative z-10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Annualized Run Rate</span>
            <div className="text-xl font-extrabold text-white tabular-nums">
              ₹{annualizedRunRate.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">Target: ₹{targetARR.toLocaleString('en-IN')} ARR</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Closed Practices</span>
            <div className="text-xl font-extrabold text-white tabular-nums">
              {closedWonLeads.length} <span className="text-xs text-slate-400 font-normal">/ {goals.monthlyClientTarget} target</span>
            </div>
            <span className="text-[10px] text-amber-300 font-medium">Monthly Cohort Goal</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg. Revenue / Practice</span>
            <div className="text-xl font-extrabold text-white tabular-nums">
              ₹{arpu.toLocaleString('en-IN')}/mo
            </div>
            <span className="text-[10px] text-blue-300 font-medium">Starter, Growth & Premium Tiers</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pipeline Potential</span>
            <div className="text-xl font-extrabold text-white tabular-nums">
              ₹{stats.totalPipelineValue.toLocaleString('en-IN')}/mo
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">{stats.totalLeads} Active Leads</span>
          </div>
        </div>
      </div>

      {/* Target Configuration Editor Form */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6 max-w-3xl">
        <div className="space-y-1 pb-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-[#0A192F]">Configure Target Parameters</h3>
          <p className="text-xs text-slate-500">
            Set your target thresholds. Changes take effect across all executive summary widgets instantly.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Quick Preset Modes:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handlePreset(75000, 5, 10)}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-600 text-left transition-all cursor-pointer space-y-1"
            >
              <span className="text-xs font-bold text-[#0A192F] block">Conservative Mode</span>
              <span className="text-[11px] text-slate-500 block">₹75,000/mo · 5 practices</span>
            </button>
            <button
              type="button"
              onClick={() => handlePreset(150000, 10, 10)}
              className="p-3.5 rounded-2xl border-2 border-blue-600 bg-blue-50/50 hover:bg-blue-50 text-left transition-all cursor-pointer space-y-1"
            >
              <span className="text-xs font-bold text-blue-900 block flex items-center gap-1">
                <span>Growth Mode (Recommended)</span>
                <Sparkles className="w-3 h-3 text-amber-500" />
              </span>
              <span className="text-[11px] text-blue-700 block">₹1,50,000/mo · 10 practices</span>
            </button>
            <button
              type="button"
              onClick={() => handlePreset(300000, 20, 25)}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-600 text-left transition-all cursor-pointer space-y-1"
            >
              <span className="text-xs font-bold text-[#0A192F] block">Aggressive Scale</span>
              <span className="text-[11px] text-slate-500 block">₹3,00,000/mo · 20 practices</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5 text-xs font-medium pt-2">
          <div className="space-y-1.5">
            <label className="text-[#0A192F] font-bold flex items-center gap-1.5 text-sm">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span>Monthly Recurring Revenue Target (₹ / month)</span>
            </label>
            <input
              type="number"
              step="5000"
              required
              value={revenueTarget}
              onChange={(e) => setRevenueTarget(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[#0A192F] font-bold text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[#0A192F] font-bold flex items-center gap-1.5 text-sm">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Monthly Closed Clients Target</span>
              </label>
              <input
                type="number"
                required
                value={clientTarget}
                onChange={(e) => setClientTarget(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[#0A192F] font-bold text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#0A192F] font-bold flex items-center gap-1.5 text-sm">
                <Building className="w-4 h-4 text-blue-600" />
                <span>Micro-Market Cohort Cap</span>
              </label>
              <input
                type="number"
                required
                value={cohortCap}
                onChange={(e) => setCohortCap(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[#0A192F] font-bold text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="py-3.5 px-6 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white font-bold text-sm transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 text-amber-400" />
              <span>Save & Apply New Practice Targets</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
