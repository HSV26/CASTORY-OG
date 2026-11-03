import React from 'react';
import { Lead, LeadStage } from '../types';
import { isProposalStale } from '../crmStorage';
import {
  Phone,
  MessageSquare,
  Calendar,
  AlertTriangle,
  Building2,
  ChevronRight,
  MoreVertical,
  Plus,
  ArrowRight,
} from 'lucide-react';

interface CrmKanbanProps {
  leads: Lead[];
  onSelectLead: (lead: Lead, action?: 'details' | 'log_call' | 'whatsapp' | 'followup' | 'onboarding') => void;
  onMoveStage: (leadId: string, newStage: LeadStage) => void;
  onPromptClosedWonTier?: (lead: Lead) => void;
  onOpenLogCall: (lead: Lead) => void;
  onOpenWhatsAppTemplate: (lead: Lead) => void;
  onOpenScheduleFollowUp: (lead: Lead) => void;
  onOpenNewLead: () => void;
}

export const KANBAN_STAGES: LeadStage[] = [
  'New Lead',
  'WhatsApp Sent',
  'Proposal Shared',
  'Meeting Booked',
  'Negotiation',
  'Closed/Won',
  'Lost',
];

export const CrmKanban: React.FC<CrmKanbanProps> = ({
  leads,
  onSelectLead,
  onMoveStage,
  onPromptClosedWonTier,
  onOpenLogCall,
  onOpenWhatsAppTemplate,
  onOpenScheduleFollowUp,
  onOpenNewLead,
}) => {
  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0A192F]">
            Interactive Pipeline Kanban
          </h2>
          <p className="text-xs text-slate-500">
            Drag or click stage controls to advance practices across the acquisition funnel.
          </p>
        </div>

        <button
          onClick={onOpenNewLead}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-blue-400" />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Kanban Horizontal Scroll Container */}
      <div className="flex gap-4 overflow-x-auto pb-6 pt-1 select-none">
        {KANBAN_STAGES.map((stage) => {
          const stageLeads = leads.filter((l) => l.status === stage);
          const stageValue = stageLeads.reduce((acc, l) => acc + (l.monthlyValue || 0), 0);

          return (
            <div
              key={stage}
              className="w-80 shrink-0 bg-slate-50/80 rounded-2xl border border-slate-200/90 flex flex-col max-h-[calc(100vh-210px)]"
            >
              {/* Column Header */}
              <div className="p-4 border-b border-slate-200 bg-white rounded-t-2xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-[#0A192F] uppercase tracking-wider">
                      {stage}
                    </h3>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-[#0A192F] tabular-nums">
                      {stageLeads.length}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold tabular-nums">
                    ₹{stageValue.toLocaleString('en-IN')}/mo
                  </span>
                </div>
              </div>

              {/* Cards Container */}
              <div className="p-3 overflow-y-auto space-y-3 flex-1">
                {stageLeads.length === 0 ? (
                  <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-[11px] text-slate-400 font-medium">
                    No practices in this stage
                  </div>
                ) : (
                  stageLeads.map((lead) => {
                    const isStale = isProposalStale(lead);

                    return (
                      <div
                        key={lead.id}
                        onClick={() => onSelectLead(lead)}
                        className={`p-4 rounded-xl bg-white border transition-all cursor-pointer space-y-3 shadow-xs hover:shadow-md ${
                          isStale
                            ? 'border-amber-400 ring-2 ring-amber-400/20'
                            : 'border-slate-200 hover:border-blue-400'
                        }`}
                      >
                        {/* Stale Alert Badge */}
                        {isStale && (
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold">
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            <span>Proposal Follow-up Overdue (&gt;48h)</span>
                          </div>
                        )}

                        {/* Title & Firm */}
                        <div>
                          <h4 className="text-sm font-bold text-[#0A192F] hover:text-blue-700 transition-colors">
                            {lead.firmName}
                          </h4>
                          <p className="text-xs text-slate-600 font-medium mt-0.5">
                            {lead.contactPerson} · <span className="text-blue-700 font-semibold">{lead.profession}</span>
                          </p>
                        </div>

                        {/* Location & Package */}
                        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                          <span className="truncate max-w-[140px]">{lead.location}</span>
                          <span className="font-bold text-[#0A192F] tabular-nums">
                            ₹{lead.monthlyValue.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Assigned Agent & Package */}
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Agent: <strong className="text-slate-600">{lead.assignedAgent.split(' ')[0]}</strong></span>
                          <span className="text-blue-700 font-semibold text-[10px] bg-blue-50 px-1.5 py-0.5 rounded">
                            {lead.packageTier.split('(')[0]}
                          </span>
                        </div>

                        {/* SOP Checklist Indicator */}
                        {lead.onboarding && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectLead(lead, 'onboarding');
                            }}
                            className="p-2 rounded-lg bg-emerald-50/80 hover:bg-emerald-100/90 border border-emerald-200 text-emerald-900 flex items-center justify-between transition-colors cursor-pointer"
                          >
                            <span className="text-[10px] font-bold flex items-center gap-1">
                              📋 SOP Execution
                            </span>
                            <span className="text-[10px] font-extrabold tabular-nums bg-white px-1.5 py-0.5 rounded text-emerald-800 shadow-2xs">
                              {lead.onboarding.phases.flatMap((p) => p.tasks).filter((t) => t.completed).length}/
                              {lead.onboarding.phases.flatMap((p) => p.tasks).length} Done
                            </span>
                          </div>
                        )}

                        {/* Quick Actions Row */}
                        <div
                          className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-slate-600"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onOpenLogCall(lead)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-[#0A192F] transition-colors cursor-pointer"
                              title="Log Call Interaction"
                            >
                              <Phone className="w-3.5 h-3.5 text-blue-600" />
                            </button>
                            <button
                              onClick={() => onOpenWhatsAppTemplate(lead)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-emerald-700 transition-colors cursor-pointer"
                              title="Send WhatsApp Template"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                            </button>
                            <button
                              onClick={() => onOpenScheduleFollowUp(lead)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-blue-700 transition-colors cursor-pointer"
                              title="Schedule Follow-up"
                            >
                              <Calendar className="w-3.5 h-3.5 text-purple-600" />
                            </button>
                          </div>

                          {/* Quick Stage Mover Selector */}
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
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-bold text-[#0A192F] focus:outline-none cursor-pointer"
                          >
                            {KANBAN_STAGES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
