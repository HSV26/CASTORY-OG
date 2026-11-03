import React, { useState } from 'react';
import { Lead } from '../types';
import { 
  Users, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Search, 
  Phone, 
  Mail, 
  FileText, 
  ExternalLink,
  Building,
  CheckSquare,
  ChevronRight
} from 'lucide-react';

interface CrmExistingClientsProps {
  leads: Lead[];
  onSelectLead: (lead: Lead, action?: 'details' | 'log_call' | 'whatsapp' | 'followup' | 'onboarding') => void;
  onOpenNewLead: () => void;
}

export const CrmExistingClients: React.FC<CrmExistingClientsProps> = ({
  leads,
  onSelectLead,
  onOpenNewLead,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTierFilter, setSelectedTierFilter] = useState<string>('all');

  // Filter only Closed/Won clients (or those with onboarding data)
  const existingClients = leads.filter((l) => {
    const isClosedWon = l.status === 'Closed/Won';
    const hasOnboarding = l.onboarding && l.onboarding.phases && l.onboarding.phases.length > 0;
    return isClosedWon || hasOnboarding;
  });

  const filteredClients = existingClients.filter((client) => {
    const matchesSearch = 
      client.firmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.profession.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTier = 
      selectedTierFilter === 'all' || 
      client.packageTier.toLowerCase().includes(selectedTierFilter.toLowerCase());

    return matchesSearch && matchesTier;
  });

  // Calculate stats for active clients
  const totalMonthlyRevenue = existingClients.reduce((sum, c) => sum + (c.monthlyValue || 0), 0);
  
  // Calculate average completion across onboarding tasks
  const calculateOnboardingProgress = (lead: Lead) => {
    if (!lead.onboarding || !lead.onboarding.phases) return 0;
    let totalTasks = 0;
    let completedTasks = 0;
    lead.onboarding.phases.forEach((p) => {
      p.tasks.forEach((t) => {
        totalTasks++;
        if (t.completed) completedTasks++;
      });
    });
    if (totalTasks === 0) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  const avgCompletion = existingClients.length > 0
    ? Math.round(existingClients.reduce((acc, c) => acc + calculateOnboardingProgress(c), 0) / existingClients.length)
    : 0;

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-50 via-white to-blue-50/40 p-6 rounded-3xl border border-emerald-200/80 shadow-xs">
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            Active Client Portfolio
          </span>
          <h2 className="text-2xl font-extrabold text-[#0A192F]">
            Existing Clients Working With Us
          </h2>
          <p className="text-xs text-slate-600 font-normal">
            Manage active retainer accounts, 30-day onboarding execution SOPs, and ongoing practice growth deliverables.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNewLead}
            className="px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            + Onboard New Practice
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Retainers</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-[#0A192F] tabular-nums">{existingClients.length}</span>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">Firms Currently in Partnership</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Retainer ARR</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-[#0A192F] tabular-nums">
              ₹{totalMonthlyRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Recurring Monthly Billing</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Onboarding Progress</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-[#0A192F] tabular-nums">{avgCompletion}%</span>
            <span className="text-[11px] text-indigo-600 font-semibold block mt-0.5">Average SOP Task Completion</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Compliance Standard</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-emerald-700 tabular-nums">100%</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">ICAI / SEBI Pre-Approval Verified</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search active client or firm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-500 shrink-0">Filter Tier:</span>
          {['all', 'Starter', 'Growth', 'Premium'].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTierFilter(tier)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                selectedTierFilter === tier
                  ? 'bg-[#0A192F] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tier === 'all' ? 'All Tiers' : `${tier} Package`}
            </button>
          ))}
        </div>
      </div>

      {/* Clients List / Cards Grid */}
      {filteredClients.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#0A192F]">No active clients found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Mark leads as "Closed/Won" in the Kanban or Table to automatically generate their 30-day onboarding SOP checklist and add them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => {
            const progress = calculateOnboardingProgress(client);
            return (
              <div
                key={client.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  {/* Firm Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                          Active Client
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">
                          {client.profession}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#0A192F] group-hover:text-blue-700 transition-colors">
                        {client.firmName}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Contact: <strong className="text-slate-700">{client.contactPerson}</strong> ({client.location})
                      </p>
                    </div>
                  </div>

                  {/* Retainer & Package Badge */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Package Tier</span>
                      <span className="text-xs font-extrabold text-[#0A192F]">{client.packageTier || 'Growth Package'}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Monthly Retainer</span>
                      <span className="text-sm font-extrabold text-blue-700 tabular-nums">
                        ₹{(client.monthlyValue || 14999).toLocaleString('en-IN')}/mo
                      </span>
                    </div>
                  </div>

                  {/* Onboarding Progress Bar */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5">
                        <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                        <span>30-Day Onboarding SOP</span>
                      </span>
                      <span className="font-extrabold text-[#0A192F] tabular-nums">{progress}% Completed</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          progress === 100 ? 'bg-emerald-500' : progress > 50 ? 'bg-blue-600' : 'bg-amber-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Assigned Agent & Contact */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium">Agent: <strong className="text-slate-700">{client.assignedAgent}</strong></span>
                    <a
                      href={`tel:${client.phone}`}
                      className="inline-flex items-center gap-1 font-bold text-blue-700 hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectLead(client, 'onboarding')}
                    className="w-full py-2.5 px-4 bg-[#0A192F] hover:bg-[#132A4B] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>View SOP & Checklist</span>
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
