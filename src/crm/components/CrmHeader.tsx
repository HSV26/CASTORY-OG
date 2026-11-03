import React from 'react';
import { useCrmAuth } from '../authContext';
import { Plus, Database, LogOut, ExternalLink, ShieldCheck, Menu } from 'lucide-react';
import { UserRole } from '../types';

interface CrmHeaderProps {
  currentTab: string;
  onOpenNewLead: () => void;
  onOpenDbConfig: () => void;
  onBackToWebsite: () => void;
  onToggleMobileSidebar: () => void;
}

export const CrmHeader: React.FC<CrmHeaderProps> = ({
  currentTab,
  onOpenNewLead,
  onOpenDbConfig,
  onBackToWebsite,
  onToggleMobileSidebar,
}) => {
  const { user, logout, switchRole } = useCrmAuth();

  const getBreadcrumbTitle = () => {
    switch (currentTab) {
      case 'overview':
        return 'Executive Overview & Target Hub';
      case 'existing_clients':
        return 'Existing Clients SOPs';
      case 'goals':
        return 'Practice Goals & Targets';
      case 'kanban':
        return 'Interactive Pipeline Kanban';
      case 'table':
        return 'Comprehensive Contact Table';
      case 'followups':
        return 'Daily Follow-up & Stale Proposal Engine';
      case 'database':
        return 'Production Database Architecture';
      default:
        return 'Pipeline Command Center';
    }
  };

  return (
    <header className="h-18 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between gap-3 sticky top-0 z-30 shadow-2xs">
      {/* Breadcrumb Trail & Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 text-slate-700 hover:text-[#0A192F] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-xs truncate">
          <span className="font-semibold text-slate-400 hidden sm:inline">CAstory CRM</span>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <span className="font-bold text-[#0A192F] text-xs sm:text-sm truncate">
            {getBreadcrumbTitle()}
          </span>
        </div>
      </div>

      {/* Action Zone */}
      <div className="flex items-center gap-3">
        {/* Production DB Config Action */}
        <button
          onClick={onOpenDbConfig}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-[#0A192F] transition-colors cursor-pointer"
          title="Production Database Connection & Setup"
        >
          <Database className="w-3.5 h-3.5 text-blue-600" />
          <span>Database Architecture</span>
        </button>

        {/* New Lead Button */}
        <button
          onClick={onOpenNewLead}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 text-blue-400" />
          <span className="hidden sm:inline">Add Lead</span>
        </button>

        {/* Role Switcher Pill (for RBAC demonstration) */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 text-[11px]">
          <button
            onClick={() => switchRole('admin')}
            className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
              user?.role === 'admin'
                ? 'bg-white text-[#0A192F] shadow-xs'
                : 'text-slate-500 hover:text-[#0A192F]'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => switchRole('sales_agent')}
            className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
              user?.role === 'sales_agent'
                ? 'bg-white text-[#0A192F] shadow-xs'
                : 'text-slate-500 hover:text-[#0A192F]'
            }`}
          >
            Sales Agent
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-800 font-bold text-xs">
            {user?.name ? user.name[0] : 'U'}
          </div>
          <div className="hidden lg:block text-left text-xs">
            <p className="font-bold text-[#0A192F] truncate max-w-[130px]">{user?.name}</p>
            <p className="text-[10px] text-blue-700 font-medium capitalize flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>{user?.role === 'admin' ? 'Super Admin' : 'Sales Agent'}</span>
            </p>
          </div>

          {/* Website Link */}
          <button
            onClick={onBackToWebsite}
            className="p-2 text-slate-400 hover:text-[#0A192F] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Return to Public Website"
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Sign Out of Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
