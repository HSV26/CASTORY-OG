import React from 'react';
import {
  LayoutDashboard,
  Kanban,
  Table as TableIcon,
  CalendarClock,
  Database,
  ArrowLeft,
  Users,
  Target,
  Sparkles,
} from 'lucide-react';

interface CrmSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  pendingFollowupsCount: number;
  staleProposalsCount: number;
  existingClientsCount: number;
  onBackToWebsite: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const CrmSidebar: React.FC<CrmSidebarProps> = ({
  currentTab,
  onSelectTab,
  pendingFollowupsCount,
  staleProposalsCount,
  existingClientsCount,
  onBackToWebsite,
  isOpen,
  onClose,
}) => {
  const menuItems = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'existing_clients',
      label: 'Existing Clients',
      icon: Users,
      badge: existingClientsCount > 0 ? existingClientsCount : null,
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'goals',
      label: 'Goals & Targets',
      icon: Target,
      badge: null,
    },
    {
      id: 'kanban',
      label: 'Pipeline Kanban',
      icon: Kanban,
      badge: null,
    },
    {
      id: 'table',
      label: 'All Leads & Table',
      icon: TableIcon,
      badge: null,
    },
    {
      id: 'followups',
      label: 'Follow-ups & Alerts',
      icon: CalendarClock,
      badge: pendingFollowupsCount + staleProposalsCount > 0 ? pendingFollowupsCount + staleProposalsCount : null,
      badgeColor: staleProposalsCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800',
    },
    {
      id: 'database',
      label: 'Database Schema',
      icon: Database,
      badge: 'SQL / NoSQL',
      badgeColor: 'bg-emerald-50 text-emerald-800',
    },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden" 
        />
      )}

      <aside className={`w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen fixed md:sticky top-0 z-50 shadow-2xl md:shadow-2xs transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
      <div className="p-5 space-y-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#0A192F] text-white flex items-center justify-center font-bold text-base shadow-xs">
            CA
          </div>
          <div>
            <span className="text-lg font-bold text-[#0A192F] tracking-tight block leading-none">
              CAstory <span className="text-blue-600 text-xs font-semibold">CRM</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Panvel & Navi Mumbai Desk</span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0A192F] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0A192F] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-blue-100 text-blue-800'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Month Target Cohort Widget */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#0A192F] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-blue-600" />
              <span>Cohort Target</span>
            </span>
            <span className="font-extrabold text-[#0A192F] tabular-nums">7 / 10</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full w-[70%] transition-all" />
          </div>
          <p className="text-[10px] text-slate-500 font-normal">
            70% goal achieved for Navi Mumbai CA practice onboarding.
          </p>
        </div>
      </div>

      {/* Footer controls */}
      <div className="p-5 border-t border-slate-100 space-y-3">
        <button
          onClick={onBackToWebsite}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-[#0A192F] hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Public Website</span>
        </button>
        <div className="text-[10px] text-center text-slate-400 font-mono">
          castory.in · Internal Secure Console
        </div>
      </div>
    </aside>
    </>
  );
};
