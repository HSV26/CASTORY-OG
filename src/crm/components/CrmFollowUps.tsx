import React, { useState } from 'react';
import { Lead, LeadFollowUp } from '../types';
import { isProposalStale } from '../crmStorage';
import {
  CalendarClock,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  Building2,
  Calendar,
  Check,
  Plus,
} from 'lucide-react';

interface CrmFollowUpsProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onToggleFollowUp: (leadId: string, followUpId: string) => void;
  onOpenLogCall: (lead: Lead) => void;
  onOpenWhatsAppTemplate: (lead: Lead) => void;
  onOpenScheduleFollowUp: (lead: Lead) => void;
}

export const CrmFollowUps: React.FC<CrmFollowUpsProps> = ({
  leads,
  onSelectLead,
  onToggleFollowUp,
  onOpenLogCall,
  onOpenWhatsAppTemplate,
  onOpenScheduleFollowUp,
}) => {
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const todayStr = new Date().toISOString().split('T')[0];

  // Identify all follow-ups across leads
  const allFollowUps = leads.flatMap((lead) =>
    lead.followUps.map((fu) => ({
      ...fu,
      lead,
    }))
  );

  // Stale proposals (>48h)
  const staleLeads = leads.filter(isProposalStale);

  // Due today or overdue
  const dueTodayOrOverdue = allFollowUps.filter((item) => {
    const matchesPriority = priorityFilter === 'All' || item.priority === priorityFilter;
    const isDue = item.dueDate <= todayStr && !item.completed;
    return matchesPriority && isDue;
  });

  const upcomingFollowUps = allFollowUps.filter((item) => {
    const matchesPriority = priorityFilter === 'All' || item.priority === priorityFilter;
    const isUpcoming = item.dueDate > todayStr && !item.completed;
    return matchesPriority && isUpcoming;
  });

  const completedFollowUps = allFollowUps.filter((item) => item.completed);

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0A192F]">
            Automated Follow-up & Reminders Engine
          </h2>
          <p className="text-xs text-slate-500 font-normal">
            Automated outreach queues, 48-hour proposal stale detection, and agent action items.
          </p>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl text-xs font-semibold shadow-xs">
          {(['All', 'High', 'Medium', 'Low'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                priorityFilter === p
                  ? 'bg-[#0A192F] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0A192F]'
              }`}
            >
              {p} Priority
            </button>
          ))}
        </div>
      </div>

      {/* 48-Hour Stale Proposals Alert Section */}
      {staleLeads.length > 0 && (
        <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-amber-900">
                  Stale Proposal Warning Engine ({staleLeads.length} Practices Flagged)
                </h3>
                <p className="text-xs text-amber-800">
                  These Chartered Accountants received custom proposals &gt;48 hours ago without a reply. Immediate follow-up recommended.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-200/80 px-2.5 py-1 rounded-full">
              48h SLA Violation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {staleLeads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => onSelectLead(lead)}
                className="p-4 rounded-2xl bg-white border border-amber-200/90 shadow-xs flex items-center justify-between gap-3 hover:border-amber-400 transition-colors cursor-pointer"
              >
                <div>
                  <h4 className="text-sm font-bold text-[#0A192F]">{lead.firmName}</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {lead.contactPerson} · {lead.location}
                  </p>
                  <p className="text-[11px] text-amber-700 font-semibold mt-1">
                    Proposal sent {lead.proposalSentAt ? new Date(lead.proposalSentAt).toLocaleDateString() : 'recently'} ({lead.packageTier.split('(')[0]})
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onOpenLogCall(lead)}
                    className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors cursor-pointer"
                    title="Call Partner Now"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenWhatsAppTemplate(lead)}
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                    title="Send Proposal Follow-up WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Due Today Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold text-[#0A192F]">
              Follow-ups Due Today & Overdue ({dueTodayOrOverdue.length})
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Target SLA: complete prior to 6:00 PM
          </span>
        </div>

        {dueTodayOrOverdue.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="text-sm font-bold text-[#0A192F]">All caught up for today!</p>
            <p className="text-xs text-slate-500">No overdue tasks remaining in this priority tier.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {dueTodayOrOverdue.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectLead(item.lead)}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-400 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFollowUp(item.lead.id, item.id);
                    }}
                    className="w-6 h-6 rounded-lg border-2 border-slate-300 hover:border-emerald-600 flex items-center justify-center text-transparent hover:text-emerald-600 transition-colors mt-0.5 cursor-pointer shrink-0"
                    title="Mark complete"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          item.priority === 'High'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : item.priority === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.priority} Priority
                      </span>
                      <span className="text-xs font-bold text-[#0A192F]">{item.title}</span>
                    </div>

                    <p className="text-xs text-slate-600 font-medium">
                      {item.lead.firmName} ({item.lead.contactPerson}) · <span className="text-slate-500">{item.lead.location}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right text-xs">
                    <span className="font-bold text-rose-600 block">Due Today</span>
                    <span className="text-[10px] text-slate-400 font-medium">Assigned: {item.assignedTo}</span>
                  </div>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onOpenLogCall(item.lead)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-700 transition-colors cursor-pointer"
                      title="Log Call"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOpenWhatsAppTemplate(item.lead)}
                      className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                      title="Send WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming & Completed Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Upcoming */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Calendar className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-bold text-[#0A192F]">
              Upcoming Follow-ups ({upcomingFollowUps.length})
            </h4>
          </div>

          <div className="space-y-3">
            {upcomingFollowUps.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No upcoming scheduled follow-ups.</p>
            ) : (
              upcomingFollowUps.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectLead(item.lead)}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors cursor-pointer flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#0A192F] block">{item.title}</span>
                    <span className="text-slate-500 font-normal">{item.lead.firmName}</span>
                  </div>
                  <span className="text-[11px] font-bold text-blue-700 tabular-nums">
                    {new Date(item.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recently Completed */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-bold text-[#0A192F]">
              Completed Outreach Tasks ({completedFollowUps.length})
            </h4>
          </div>

          <div className="space-y-3">
            {completedFollowUps.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 opacity-75 flex items-center justify-between text-xs line-through text-slate-400"
              >
                <span>{item.title} ({item.lead.firmName})</span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded not-italic">Done</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
