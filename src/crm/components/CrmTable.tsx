import React, { useState } from 'react';
import { Lead, LeadStage } from '../types';
import { isProposalStale } from '../crmStorage';
import {
  Search,
  Filter,
  Download,
  Phone,
  MessageSquare,
  Calendar,
  AlertTriangle,
  Building2,
  Trash2,
  MoreVertical,
  Plus,
} from 'lucide-react';
import { KANBAN_STAGES } from './CrmKanban';

interface CrmTableProps {
  leads: Lead[];
  onSelectLead: (lead: Lead, action?: 'details' | 'log_call' | 'whatsapp' | 'followup' | 'onboarding') => void;
  onMoveStage: (leadId: string, newStage: LeadStage) => void;
  onPromptClosedWonTier?: (lead: Lead) => void;
  onOpenLogCall: (lead: Lead) => void;
  onOpenWhatsAppTemplate: (lead: Lead) => void;
  onOpenScheduleFollowUp: (lead: Lead) => void;
  onDeleteLead: (leadId: string) => void;
  onOpenNewLead: () => void;
}

export const CrmTable: React.FC<CrmTableProps> = ({
  leads,
  onSelectLead,
  onMoveStage,
  onPromptClosedWonTier,
  onOpenLogCall,
  onOpenWhatsAppTemplate,
  onOpenScheduleFollowUp,
  onDeleteLead,
  onOpenNewLead,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedProfession, setSelectedProfession] = useState<string>('all');

  // Filtered leads
  const filtered = leads.filter((l) => {
    const matchesSearch =
      l.firmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm);

    const matchesStage = selectedStage === 'all' || l.status === selectedStage;
    const matchesProf = selectedProfession === 'all' || l.profession === selectedProfession;

    return matchesSearch && matchesStage && matchesProf;
  });

  const exportToCsv = () => {
    const headers = ['Firm Name', 'Contact Person', 'Profession', 'Location', 'Phone', 'Email', 'Stage', 'Package', 'Monthly Value', 'Assigned Agent'];
    const rows = filtered.map((l) => [
      `"${l.firmName}"`,
      `"${l.contactPerson}"`,
      `"${l.profession}"`,
      `"${l.location}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.status}"`,
      `"${l.packageTier}"`,
      l.monthlyValue,
      `"${l.assignedAgent}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `castory_crm_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStageBadgeColor = (stage: LeadStage) => {
    switch (stage) {
      case 'New Lead':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'WhatsApp Sent':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Proposal Shared':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Meeting Booked':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Negotiation':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Closed/Won':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Lost':
        return 'bg-rose-50 text-rose-800 border-rose-200';
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0A192F]">
            All Practice Leads & Contacts ({filtered.length})
          </h2>
          <p className="text-xs text-slate-500 font-normal">
            Complete database of Chartered Accountants, Tax Practitioners, and IFAs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportToCsv}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-[#0A192F] transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenNewLead}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 text-blue-400" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by firm, person, location, phone..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Stage Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Stage:</span>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#0A192F] focus:outline-none"
            >
              <option value="all">All Stages</option>
              {KANBAN_STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Profession Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Role:</span>
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#0A192F] focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="Chartered Accountant">Chartered Accountant</option>
              <option value="Tax Consultant">Tax Consultant</option>
              <option value="Financial Advisor">Financial Advisor</option>
              <option value="Multi-partner CA Firm">Multi-partner CA Firm</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Firm & Contact</th>
                <th className="py-3.5 px-4">Profession</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Phone / WhatsApp</th>
                <th className="py-3.5 px-4">Status & Alerts</th>
                <th className="py-3.5 px-4">Package Tier</th>
                <th className="py-3.5 px-4">Agent</th>
                <th className="py-3.5 px-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No leads match your filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => {
                  const isStale = isProposalStale(lead);
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => onSelectLead(lead)}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                    >
                      {/* Firm & Contact */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#0A192F] block group-hover:text-blue-700 transition-colors">
                          {lead.firmName}
                        </span>
                        <span className="text-slate-500 font-normal">
                          {lead.contactPerson} · {lead.email}
                        </span>
                      </td>

                      {/* Profession */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-700">
                          {lead.profession}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4 text-slate-600">
                        {lead.location}
                      </td>

                      {/* Phone / WhatsApp */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#0A192F] tabular-nums">
                            {lead.phone}
                          </span>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 rounded text-emerald-600 hover:bg-emerald-50"
                            title="Direct WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col gap-1 items-start">
                          <select
                            value={lead.status}
                            onChange={(e) => {
                              const newStage = e.target.value as LeadStage;
                              if (newStage === 'Closed/Won' && onPromptClosedWonTier) {
                                onPromptClosedWonTier(lead);
                              } else {
                                onMoveStage(lead.id, newStage);
                              }
                            }}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border focus:outline-none cursor-pointer ${getStageBadgeColor(
                              lead.status
                            )}`}
                          >
                            {KANBAN_STAGES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          {isStale && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                              <span>Stale (&gt;48h)</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Package Tier */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#0A192F] block">
                          ₹{lead.monthlyValue.toLocaleString('en-IN')}/mo
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] text-slate-500 font-medium">
                            {lead.packageTier.split('(')[0]}
                          </span>
                          {lead.onboarding && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectLead(lead, 'onboarding');
                              }}
                              className="text-[10px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-1.5 py-0.5 rounded border border-blue-200 transition-colors cursor-pointer"
                              title="Open Client Onboarding & SOP Checklist"
                            >
                              SOP ({lead.onboarding.phases.flatMap(p => p.tasks).filter(t => t.completed).length}/{lead.onboarding.phases.flatMap(p => p.tasks).length})
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Agent */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {lead.assignedAgent.split(' ')[0]}
                      </td>

                      {/* Quick Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onOpenLogCall(lead)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-blue-600 transition-colors cursor-pointer"
                            title="Log Call"
                          >
                            <Phone className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onOpenWhatsAppTemplate(lead)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-emerald-600 transition-colors cursor-pointer"
                            title="Send WhatsApp Template"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onOpenScheduleFollowUp(lead)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-purple-600 transition-colors cursor-pointer"
                            title="Schedule Follow-up"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete lead record for ${lead.firmName}?`)) {
                                onDeleteLead(lead.id);
                              }
                            }}
                            className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
