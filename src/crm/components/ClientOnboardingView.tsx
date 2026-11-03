import React, { useState } from 'react';
import { Lead, ClientOnboarding, OnboardingPhase, OnboardingTask, PackageTierOption } from '../types';
import { useCrmAuth } from '../authContext';
import {
  CheckCircle2,
  Circle,
  Clock,
  ShieldCheck,
  Calendar,
  Sparkles,
  Plus,
  FileText,
  Download,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Award,
  Check,
  Zap,
} from 'lucide-react';

interface ClientOnboardingViewProps {
  lead: Lead;
  onToggleTask: (phaseId: string, taskId: string) => void;
  onAddTask: (phaseId: 'phase1' | 'phase2' | 'phase3' | 'phase4', title: string, description: string) => void;
  onOpenSelectTier: () => void;
}

export const ClientOnboardingView: React.FC<ClientOnboardingViewProps> = ({
  lead,
  onToggleTask,
  onAddTask,
  onOpenSelectTier,
}) => {
  const { user } = useCrmAuth();
  const [activePhaseFilter, setActivePhaseFilter] = useState<'all' | 'phase1' | 'phase2' | 'phase3' | 'phase4'>('all');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [targetPhaseForNewTask, setTargetPhaseForNewTask] = useState<'phase1' | 'phase2' | 'phase3' | 'phase4'>('phase1');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [copiedReport, setCopiedReport] = useState(false);

  const onboarding = lead.onboarding;

  if (!onboarding) {
    return (
      <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-3xl space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="max-w-md mx-auto space-y-1">
          <h4 className="text-lg font-bold text-[#0A192F]">
            No Active Onboarding SOP Generated Yet
          </h4>
          <p className="text-xs text-slate-600">
            {lead.status === 'Closed/Won'
              ? 'This practice is marked as Closed/Won, but the package tier SOP has not been initialized.'
              : `This practice is currently in "${lead.status}" stage. Once closed, assign a package tier to automatically instantiate the 30-Day Execution SOP.`}
          </p>
        </div>
        <button
          onClick={onOpenSelectTier}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Select Package Tier & Generate SOP</span>
        </button>
      </div>
    );
  }

  // Calculate statistics
  const allTasks: OnboardingTask[] = onboarding.phases.flatMap((p) => p.tasks);
  const totalCount = allTasks.length;
  const completedCount = allTasks.filter((t) => t.completed).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(targetPhaseForNewTask, newTaskTitle.trim(), newTaskDesc.trim());
    setNewTaskTitle('');
    setNewTaskDesc('');
    setIsAddingTask(false);
  };

  const handleCopyReport = () => {
    const lines = [
      `=======================================================`,
      `CASTORY · CLIENT ONBOARDING & EXECUTION SOP CHECKLIST`,
      `Client: ${lead.firmName} (${lead.contactPerson})`,
      `Package Tier: ${onboarding.packageTier}`,
      `Monthly Investment: ₹${onboarding.monthlyValue.toLocaleString('en-IN')}/mo`,
      `Overall Progress: ${completedCount}/${totalCount} tasks completed (${progressPercent}%)`,
      `Initiated: ${new Date(onboarding.initiatedAt).toLocaleDateString()}`,
      `Target 30-Day Launch: ${onboarding.targetLaunchDate}`,
      `=======================================================`,
      ``,
    ];

    onboarding.phases.forEach((phase) => {
      lines.push(`--- ${phase.name.toUpperCase()} (${phase.timeline}) ---`);
      lines.push(`Description: ${phase.description}`);
      phase.tasks.forEach((task) => {
        lines.push(`  [${task.completed ? 'X' : ' '}] ${task.title}`);
        if (task.completed && task.completedBy) {
          lines.push(`      Completed by: ${task.completedBy} on ${new Date(task.completedAt || '').toLocaleDateString()}`);
        }
        lines.push(`      Details: ${task.description}`);
      });
      lines.push(``);
    });

    lines.push(`Report generated from CAstory Internal CRM · castory.in`);

    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  const filteredPhases = activePhaseFilter === 'all'
    ? onboarding.phases
    : onboarding.phases.filter((p) => p.id === activePhaseFilter);

  return (
    <div className="space-y-6">
      {/* Top Onboarding Header Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0A192F] text-white shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Active Client Retainer
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                Target Launch: <span className="text-white font-bold">{onboarding.targetLaunchDate}</span>
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mt-1">
              Client Onboarding & Execution SOP
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Firm: <strong className="text-white">{lead.firmName}</strong> · Package: <strong className="text-amber-300">{onboarding.packageTier}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleCopyReport}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10 transition-all cursor-pointer"
              title="Copy formatted text report for client WhatsApp/email updates"
            >
              {copiedReport ? <Check className="w-4 h-4 text-emerald-400" /> : <FileText className="w-4 h-4 text-blue-300" />}
              <span>{copiedReport ? 'Report Copied!' : 'Copy SOP Report'}</span>
            </button>
            <button
              onClick={onOpenSelectTier}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Change Tier</span>
            </button>
          </div>
        </div>

        {/* Progress Bar & Phase Stats */}
        <div className="space-y-2 pt-2 border-t border-slate-700/60">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-blue-300 tabular-nums">{progressPercent}%</span>
              <span className="text-slate-300 font-medium">
                Overall 30-Day Deployment Progress ({completedCount}/{totalCount} tasks completed)
              </span>
            </div>
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
              progressPercent === 100
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
            }`}>
              {progressPercent === 100 ? 'Fully Deployed' : 'Execution In Progress'}
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Stepper Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {onboarding.phases.map((ph, idx) => {
              const phTotal = ph.tasks.length;
              const phDone = ph.tasks.filter((t) => t.completed).length;
              const phPct = phTotal > 0 ? Math.round((phDone / phTotal) * 100) : 0;
              const isDone = phPct === 100;

              return (
                <div
                  key={ph.id}
                  onClick={() => setActivePhaseFilter(activePhaseFilter === ph.id ? 'all' : ph.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    activePhaseFilter === ph.id
                      ? 'bg-white/20 border-blue-400 shadow-sm'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      P{idx + 1} · {ph.timeline}
                    </span>
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] font-bold text-slate-300 tabular-nums">
                        {phDone}/{phTotal}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-white block truncate">
                    {ph.name.replace(/^Phase \d+:\s*/, '')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Phase Filter Controls & Add Task Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActivePhaseFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activePhaseFilter === 'all'
                ? 'bg-[#0A192F] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Phases ({totalCount})
          </button>
          {onboarding.phases.map((ph, idx) => (
            <button
              key={ph.id}
              onClick={() => setActivePhaseFilter(ph.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                activePhaseFilter === ph.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Phase {idx + 1} ({ph.timeline})
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsAddingTask(!isAddingTask)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0A192F] font-bold transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-blue-600" />
          <span>Add Custom SOP Item</span>
        </button>
      </div>

      {/* Add Custom Task Form Drawer */}
      {isAddingTask && (
        <form onSubmit={handleCreateTask} className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3 text-xs animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0A192F] uppercase tracking-wider text-[11px]">
              Add Practice-Specific SOP Task
            </span>
            <button
              type="button"
              onClick={() => setIsAddingTask(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-[#0A192F] font-semibold">Task Title *</label>
              <input
                type="text"
                required
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="e.g. Collect Senior Partner GST masterclass presentation slides"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[#0A192F] focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[#0A192F] font-semibold">Target Phase</label>
              <select
                value={targetPhaseForNewTask}
                onChange={(e) => setTargetPhaseForNewTask(e.target.value as any)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[#0A192F]"
              >
                <option value="phase1">Phase 1: Access Handover (Days 1-3)</option>
                <option value="phase2">Phase 2: Audit & Setup (Days 4-7)</option>
                <option value="phase3">Phase 3: Content Drafting (Days 8-10)</option>
                <option value="phase4">Phase 4: Live Engine (Days 11-30)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[#0A192F] font-semibold">Task Description / Instructions</label>
            <input
              type="text"
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
              placeholder="e.g. Ensure all slides adhere to ICAI informative norms and contain firm disclaimer."
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[#0A192F] focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white font-bold shadow-xs cursor-pointer"
            >
              Add Task to Phase
            </button>
          </div>
        </form>
      )}

      {/* Structured Phases Task Sections */}
      <div className="space-y-6">
        {filteredPhases.map((phase, pIdx) => {
          const phDoneCount = phase.tasks.filter((t) => t.completed).length;
          const phTotal = phase.tasks.length;
          const isPhaseComplete = phTotal > 0 && phDoneCount === phTotal;

          return (
            <div
              key={phase.id}
              className={`rounded-2xl border transition-all ${
                isPhaseComplete
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {/* Phase Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/60 rounded-t-2xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#0A192F] tracking-tight">
                      {phase.name}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {phase.timeline}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    {phase.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs font-extrabold text-slate-700 tabular-nums">
                    {phDoneCount} / {phTotal} Done
                  </span>
                  {isPhaseComplete && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Completed
                    </span>
                  )}
                </div>
              </div>

              {/* Task Items */}
              <div className="divide-y divide-slate-100 p-2 sm:p-3">
                {phase.tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => onToggleTask(phase.id, task.id)}
                    className={`p-3 sm:p-3.5 rounded-xl transition-all cursor-pointer flex items-start gap-3.5 group ${
                      task.completed
                        ? 'bg-slate-50/60 hover:bg-slate-100/70'
                        : 'hover:bg-blue-50/40'
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                        task.completed
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                          : 'border-slate-300 bg-white group-hover:border-blue-500'
                      }`}
                    >
                      {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-xs font-bold transition-all ${
                            task.completed
                              ? 'line-through text-slate-400'
                              : 'text-[#0A192F]'
                          }`}
                        >
                          {task.title}
                        </span>

                        {task.mandatoryCompliance && (
                          <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-purple-600" />
                            <span>ICAI Mandatory</span>
                          </span>
                        )}

                        {task.completed && task.completedAt && (
                          <span className="text-[10px] text-slate-400 font-medium">
                            Completed {new Date(task.completedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                            {task.completedBy && ` by ${task.completedBy}`}
                          </span>
                        )}
                      </div>

                      <p
                        className={`text-[11px] leading-relaxed font-normal ${
                          task.completed ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {task.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
