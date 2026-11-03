import React, { useState } from 'react';
import { Lead, LeadStage, LeadPriority } from '../types';
import { useCrmAuth } from '../authContext';
import { ClientOnboardingView } from './ClientOnboardingView';
import {
  X,
  Phone,
  MessageSquare,
  Calendar,
  Building2,
  MapPin,
  Mail,
  Clock,
  Plus,
  Send,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Award,
  Sparkles,
} from 'lucide-react';
import { KANBAN_STAGES } from './CrmKanban';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
  onMoveStage: (leadId: string, newStage: LeadStage) => void;
  onAddNote: (leadId: string, content: string, type: 'note' | 'call' | 'whatsapp', duration?: string) => void;
  onAddFollowUp: (leadId: string, title: string, dueDate: string, priority: LeadPriority) => void;
  onToggleOnboardingTask?: (leadId: string, phaseId: string, taskId: string) => void;
  onAddOnboardingTask?: (leadId: string, phaseId: 'phase1' | 'phase2' | 'phase3' | 'phase4', title: string, description: string) => void;
  onOpenSelectTier?: (lead: Lead) => void;
  activeAction?: 'details' | 'log_call' | 'whatsapp' | 'followup' | 'onboarding';
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  onClose,
  onMoveStage,
  onAddNote,
  onAddFollowUp,
  onToggleOnboardingTask,
  onAddOnboardingTask,
  onOpenSelectTier,
  activeAction = 'details',
}) => {
  const { user } = useCrmAuth();
  const [currentTab, setCurrentTab] = useState<'details' | 'log_call' | 'whatsapp' | 'followup' | 'onboarding'>(activeAction);

  // Note form state
  const [newNoteText, setNewNoteText] = useState('');
  const [callDuration, setCallDuration] = useState('15 mins');
  const [callOutcome, setCallOutcome] = useState('Connected - Discussed Proposal');

  // Follow-up form state
  const [followUpTitle, setFollowUpTitle] = useState('');
  const [followUpDate, setFollowUpDate] = useState(new Date().toISOString().split('T')[0]);
  const [followUpPriority, setFollowUpPriority] = useState<LeadPriority>('High');

  // WhatsApp templates list (ICAI-Compliant)
  const WHATSAPP_TEMPLATES = [
    {
      title: 'First Outreach · Local SEO & Practice Authority',
      content: `Namaste ${lead?.contactPerson || 'Sir/Ma\'am'}, this is ${user?.name || 'Vikram'} from CAstory (castory.in). We noticed your firm (${lead?.firmName || 'Practice'}) is ranking just outside the top 3 on Google Maps for local accounting searches. Would you like a complimentary 2-page visibility audit comparing your profile against local competitors?`,
    },
    {
      title: 'Proposal Follow-up · 48h Safe Check-in',
      content: `Hello ${lead?.contactPerson || 'Partner'}, following up on the ${lead?.packageTier || 'Growth'} proposal we shared. We have mapped out 16 educational tax & GST reels tailored for your firm with full pre-approval before posting. Do you have 10 minutes this afternoon to address any technical questions?`,
    },
    {
      title: 'Meeting Confirmation · Zoom / Panvel Office',
      content: `Confirmed: Consultation scheduled with ${user?.name || 'Our Senior Partner'} regarding ${lead?.firmName || 'your practice'}'s compliance growth plan. We look forward to connecting and reviewing your local micro-market opportunities.`,
    },
  ];

  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);

  if (!lead) return null;

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddNote(lead.id, newNoteText.trim(), 'note');
    setNewNoteText('');
  };

  const handleSaveCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const content = `[Call Log: ${callOutcome}] ${newNoteText.trim()}`;
    onAddNote(lead.id, content, 'call', callDuration);
    setNewNoteText('');
    setCurrentTab('details');
  };

  const handleSaveFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpTitle.trim()) return;
    onAddFollowUp(lead.id, followUpTitle.trim(), followUpDate, followUpPriority);
    setFollowUpTitle('');
    setCurrentTab('details');
  };

  const handleSendTemplate = () => {
    const text = encodeURIComponent(WHATSAPP_TEMPLATES[selectedTemplateIndex].content);
    window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    onAddNote(lead.id, `Dispatched WhatsApp Template: "${WHATSAPP_TEMPLATES[selectedTemplateIndex].title}"`, 'whatsapp');
    setCurrentTab('details');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Practice Profile · {lead.id}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500 font-semibold">{lead.location}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0A192F] mt-0.5">
              {lead.firmName}
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              {lead.contactPerson} · <strong className="text-blue-700">{lead.profession}</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-[#0A192F] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Tabs Toolbar */}
        <div className="flex items-center gap-1.5 pt-4 border-b border-slate-100 pb-3 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setCurrentTab('details')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'details'
                ? 'bg-[#0A192F] text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Profile & History
          </button>
          <button
            onClick={() => setCurrentTab('onboarding')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'onboarding'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Onboarding & SOP</span>
            {lead.onboarding && (
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-bold tabular-nums">
                {lead.onboarding.phases.flatMap((p) => p.tasks).filter((t) => t.completed).length}/
                {lead.onboarding.phases.flatMap((p) => p.tasks).length}
              </span>
            )}
          </button>
          <button
            onClick={() => setCurrentTab('log_call')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'log_call'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            <span>Log Call</span>
          </button>
          <button
            onClick={() => setCurrentTab('whatsapp')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'whatsapp'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Send WhatsApp Template</span>
          </button>
          <button
            onClick={() => setCurrentTab('followup')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'followup'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Schedule Follow-up</span>
          </button>
        </div>

        {/* Body based on currentTab */}
        <div className="py-4">
          {currentTab === 'details' && (
            <div className="space-y-6">
              {/* Key metadata grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Phone Number</span>
                  <span className="font-bold text-[#0A192F] tabular-nums">{lead.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Package Tier</span>
                  <span className="font-bold text-blue-700">{lead.packageTier}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Assigned Agent</span>
                  <span className="font-bold text-[#0A192F]">{lead.assignedAgent}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Current Stage</span>
                  <select
                    value={lead.status}
                    onChange={(e) => {
                      const newStage = e.target.value as LeadStage;
                      if (newStage === 'Closed/Won' && onOpenSelectTier) {
                        onOpenSelectTier(lead);
                      } else {
                        onMoveStage(lead.id, newStage);
                      }
                    }}
                    className="font-bold text-[#0A192F] bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs focus:outline-none cursor-pointer mt-0.5"
                  >
                    {KANBAN_STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add Note Input */}
              <form onSubmit={handleSaveNote} className="space-y-2">
                <label className="text-xs font-bold text-[#0A192F]">Add Conversation Note / Internal Comment</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Type an internal note regarding this CA practice..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0A192F] text-white font-bold text-xs hover:bg-[#132A4B] transition-colors cursor-pointer shadow-xs"
                  >
                    Post Note
                  </button>
                </div>
              </form>

              {/* Interaction & Call Log History */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Interaction History & Audit Trail ({lead.notes.length})
                </span>
                <div className="space-y-2.5 max-h-60 overflow-y-auto">
                  {lead.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#0A192F]">
                          {note.authorName} <span className="font-normal text-slate-400">({note.authorRole})</span>
                        </span>
                        <span className="text-slate-400 tabular-nums">
                          {new Date(note.createdAt).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-slate-700 leading-relaxed font-normal">{note.content}</p>
                      {note.callDuration && (
                        <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          Duration: {note.callDuration}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentTab === 'onboarding' && (
            <ClientOnboardingView
              lead={lead}
              onToggleTask={(phaseId, taskId) => {
                if (onToggleOnboardingTask) {
                  onToggleOnboardingTask(lead.id, phaseId, taskId);
                }
              }}
              onAddTask={(phaseId, title, desc) => {
                if (onAddOnboardingTask) {
                  onAddOnboardingTask(lead.id, phaseId, title, desc);
                }
              }}
              onOpenSelectTier={() => {
                if (onOpenSelectTier) {
                  onOpenSelectTier(lead);
                }
              }}
            />
          )}

          {currentTab === 'log_call' && (
            <form onSubmit={handleSaveCall} className="space-y-4 text-xs font-medium">
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">
                Log a phone call with <strong className="text-[#0A192F]">{lead.contactPerson}</strong> at {lead.firmName}.
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#0A192F] font-semibold">Call Duration</label>
                  <select
                    value={callDuration}
                    onChange={(e) => setCallDuration(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[#0A192F]"
                  >
                    <option value="5 mins">5 mins (Quick touch)</option>
                    <option value="15 mins">15 mins (Discovery)</option>
                    <option value="30 mins">30 mins (Detailed demo)</option>
                    <option value="45 mins">45 mins (Contract review)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#0A192F] font-semibold">Outcome</label>
                  <select
                    value={callOutcome}
                    onChange={(e) => setCallOutcome(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[#0A192F]"
                  >
                    <option value="Connected - Proposal Discussed">Connected - Proposal Discussed</option>
                    <option value="Connected - Scheduled Demo">Connected - Scheduled Demo</option>
                    <option value="Left Voicemail / Callback Requested">Left Voicemail / Callback Requested</option>
                    <option value="Busy - Follow-up Tomorrow">Busy - Follow-up Tomorrow</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#0A192F] font-semibold">Call Summary & Next Actions *</label>
                <textarea
                  required
                  rows={3}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Summarize key takeaways, partner objections, or required deliverables..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentTab('details')}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs"
                >
                  Save Call Log
                </button>
              </div>
            </form>
          )}

          {currentTab === 'whatsapp' && (
            <div className="space-y-4 text-xs font-medium">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                Select an ICAI-compliant communication template to dispatch to <strong className="text-[#0A192F]">{lead.phone}</strong>.
              </div>

              <div className="space-y-2">
                <label className="text-[#0A192F] font-semibold">Pre-approved Templates</label>
                <div className="space-y-2">
                  {WHATSAPP_TEMPLATES.map((tmpl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedTemplateIndex(idx)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1 ${
                        selectedTemplateIndex === idx
                          ? 'bg-emerald-50/70 border-emerald-500 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="font-bold text-[#0A192F] block">{tmpl.title}</span>
                      <p className="text-[11px] text-slate-600 line-clamp-2">{tmpl.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Template Preview */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Live Message Preview
                </span>
                <p className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {WHATSAPP_TEMPLATES[selectedTemplateIndex].content}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentTab('details')}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSendTemplate}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp & Dispatch</span>
                </button>
              </div>
            </div>
          )}

          {currentTab === 'followup' && (
            <form onSubmit={handleSaveFollowUp} className="space-y-4 text-xs font-medium">
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900">
                Schedule a follow-up outreach task for <strong className="text-[#0A192F]">{lead.firmName}</strong>.
              </div>

              <div className="space-y-1">
                <label className="text-[#0A192F] font-semibold">Follow-up Task Title *</label>
                <input
                  type="text"
                  required
                  value={followUpTitle}
                  onChange={(e) => setFollowUpTitle(e.target.value)}
                  placeholder="e.g. Call Partner to review GST reel scripts"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#0A192F] font-semibold">Due Date</label>
                  <input
                    type="date"
                    required
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[#0A192F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#0A192F] font-semibold">Priority Level</label>
                  <select
                    value={followUpPriority}
                    onChange={(e) => setFollowUpPriority(e.target.value as LeadPriority)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[#0A192F]"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentTab('details')}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-xs"
                >
                  Save Task
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
