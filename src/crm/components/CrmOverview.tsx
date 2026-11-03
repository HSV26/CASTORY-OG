import React, { useState } from 'react';
import { Lead, PipelineStats } from '../types';
import { isProposalStale } from '../crmStorage';
import { GoalSettingsModal, getStoredGoals, CrmGoals } from './GoalSettingsModal';
import {
  Users,
  Send,
  TrendingUp,
  Award,
  Clock,
  AlertTriangle,
  ArrowRight,
  PhoneCall,
  CalendarCheck,
  Building,
  Target,
  Sparkles,
  Settings,
} from 'lucide-react';

interface CrmOverviewProps {
  leads: Lead[];
  stats: PipelineStats;
  onSelectTab: (tab: string) => void;
  onSelectLead: (lead: Lead) => void;
  onOpenNewLead: () => void;
}

export const CrmOverview: React.FC<CrmOverviewProps> = ({
  leads,
  stats,
  onSelectTab,
  onSelectLead,
  onOpenNewLead,
}) => {
  const staleLeads = leads.filter(isProposalStale);

  // Extract recent activities across all leads
  const recentActivities = leads
    .flatMap((lead) =>
      lead.notes.map((n) => ({
        ...n,
        leadId: lead.id,
        firmName: lead.firmName,
        contactPerson: lead.contactPerson,
      }))
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  // Pipeline stage distribution
  const stages: Array<{ name: string; count: number; color: string }> = [
    { name: 'New Lead', count: leads.filter((l) => l.status === 'New Lead').length, color: 'bg-slate-400' },
    { name: 'WhatsApp Sent', count: leads.filter((l) => l.status === 'WhatsApp Sent').length, color: 'bg-sky-500' },
    { name: 'Proposal Shared', count: leads.filter((l) => l.status === 'Proposal Shared').length, color: 'bg-amber-500' },
    { name: 'Meeting Booked', count: leads.filter((l) => l.status === 'Meeting Booked').length, color: 'bg-indigo-500' },
    { name: 'Negotiation', count: leads.filter((l) => l.status === 'Negotiation').length, color: 'bg-purple-500' },
    { name: 'Closed/Won', count: leads.filter((l) => l.status === 'Closed/Won').length, color: 'bg-emerald-500' },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-50 via-white to-blue-50/40 p-6 rounded-3xl border border-blue-200/80 shadow-xs">
        <div className="space-y-1">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
            Executive Summary
          </span>
          <h2 className="text-2xl font-extrabold text-[#0A192F]">
            Chartered Accountant Acquisition Command
          </h2>
          <p className="text-xs text-slate-600 font-normal">
            Panvel & Navi Mumbai Hub · Real-time pipeline tracking and automated follow-ups.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('kanban')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-[#0A192F] transition-colors cursor-pointer shadow-xs"
          >
            Open Kanban Board
          </button>
          <button
            onClick={onOpenNewLead}
            className="px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            + New Inbound Lead
          </button>
        </div>
      </div>

      {/* 5 Quick Stat Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Stat 1: Total Leads */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Leads</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-[#0A192F] tabular-nums">{stats.totalLeads}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Active Inbound Practice Pool</span>
          </div>
        </div>

        {/* Stat 2: Active Proposals */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Proposals</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-[#0A192F] tabular-nums">{stats.activeProposals}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Growth & Premium Pitches</span>
          </div>
        </div>

        {/* Stat 3: Conversion Rate */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Conversion Rate</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-[#0A192F] tabular-nums">{stats.conversionRate}%</span>
            <span className={`text-[11px] font-semibold block mt-0.5 ${stats.totalLeads > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
              {stats.totalLeads > 0 ? '+4.2% vs Last Month' : 'No prior cohort data'}
            </span>
          </div>
        </div>

        {/* Stat 4: Closed Clients This Month */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Closed This Month</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-[#0A192F] tabular-nums">{stats.closedClientsThisMonth}</span>
              <span className="text-xs text-slate-400 font-bold">/ {stats.targetClientsThisMonth} target</span>
            </div>
            <span className="text-[11px] text-blue-700 font-semibold block mt-0.5">3 more to hit monthly cap</span>
          </div>
        </div>

        {/* Stat 5: Pending Follow-ups Today */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Follow-ups Today</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-rose-600 tabular-nums">{stats.pendingFollowupsToday}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Due for Outreach Before 6 PM</span>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Progress Bar: Local Cohort Goal */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" />
              <span>Q4 Navi Mumbai Local Practice Cohort</span>
            </span>
            <h3 className="text-lg font-bold text-[#0A192F]">
              Cohort Capacity: 7 of 10 Chartered Accountant Practices Onboarded
            </h3>
          </div>
          <div className="text-right sm:text-left">
            <span className="text-2xl font-extrabold text-[#0A192F] tabular-nums">70%</span>
            <span className="text-xs text-slate-500 block">Cap Limit: 10 per micro-market</span>
          </div>
        </div>

        {/* Segmented Pipeline Progress Bar */}
        <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex p-0.5">
          <div className="h-full bg-emerald-500 rounded-l-full w-[70%]" title="Closed / Onboarded (7)" />
          <div className="h-full bg-blue-500 w-[15%]" title="In Negotiation (1-2)" />
          <div className="h-full bg-amber-400 w-[10%]" title="Proposal Shared (1)" />
          <div className="h-full bg-slate-200 rounded-r-full flex-1" title="Remaining slots (3)" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              Closed / Active (7)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              Negotiating (1)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              Proposal Sent (1)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200 inline-block" />
              Available Quota (3)
            </span>
          </div>
          <button
            onClick={() => onSelectTab('followups')}
            className="text-blue-700 font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>Review Cohort Schedule</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stale Proposal Alert Notification (if any) */}
      {staleLeads.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-xl text-amber-700 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold">
                Automated Alert: {staleLeads.length} Proposal(s) Pending Follow-up (&gt;48 Hours)
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                {staleLeads.map((l) => `${l.firmName} (${l.assignedAgent})`).join(' · ')}
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectTab('followups')}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            Review Stale Proposals
          </button>
        </div>
      )}

      {/* 2-Column Split: Pipeline Stages vs Recent Call Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stage Velocity & Value */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-[#0A192F]">Pipeline Velocity by Stage</h3>
              <p className="text-xs text-slate-500">Distribution of practices currently in pipeline</p>
            </div>
            <span className="text-xs font-bold text-[#0A192F] tabular-nums">
              ₹{stats.totalPipelineValue.toLocaleString('en-IN')}/mo Value
            </span>
          </div>

          <div className="space-y-3.5">
            {stages.map((st) => (
              <div key={st.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{st.name}</span>
                  <span className="font-bold text-[#0A192F] tabular-nums">{st.count} practice(s)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full ${st.color} rounded-full transition-all`}
                    style={{
                      width: `${leads.length > 0 ? (st.count / leads.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => onSelectTab('kanban')}
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#0A192F] transition-colors cursor-pointer"
            >
              View Full Interactive Kanban
            </button>
          </div>
        </div>

        {/* Right Column: Recent Activities & Call Log History */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-[#0A192F]">Recent Interactions & Call Logs</h3>
              <p className="text-xs text-slate-500">Live feed of agent calls, WhatsApp notes, and stage movements</p>
            </div>
            <button
              onClick={() => onSelectTab('table')}
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              View Table
            </button>
          </div>

          <div className="space-y-3">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                onClick={() => {
                  const matched = leads.find((l) => l.id === act.leadId);
                  if (matched) onSelectLead(matched);
                }}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-300 hover:bg-white transition-all cursor-pointer space-y-1.5 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0A192F] truncate max-w-[240px]">
                    {act.firmName}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {new Date(act.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 font-normal">
                  "{act.content}"
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-0.5">
                  <span className="font-semibold text-blue-700">{act.authorName}</span>
                  {act.callDuration && (
                    <>
                      <span>·</span>
                      <span className="text-emerald-700 font-semibold">{act.callDuration} call</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
