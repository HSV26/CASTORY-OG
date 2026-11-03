import React, { useState, useEffect } from 'react';
import { AuthProvider, useCrmAuth } from './authContext';
import {
  getCrmLeads,
  addCrmLead,
  updateCrmLead,
  deleteCrmLead,
  addNoteToLead,
  addFollowUpToLead,
  toggleFollowUpStatus,
  calculatePipelineStats,
  isProposalStale,
  assignPackageAndGenerateOnboarding,
  toggleOnboardingTask,
  addOnboardingTask,
} from './crmStorage';
import { Lead, LeadStage, LeadPriority, PackageTierOption } from './types';
import { CrmLogin } from './components/CrmLogin';
import { CrmSidebar } from './components/CrmSidebar';
import { CrmHeader } from './components/CrmHeader';
import { CrmOverview } from './components/CrmOverview';
import { CrmExistingClients } from './components/CrmExistingClients';
import { CrmKanban } from './components/CrmKanban';
import { CrmTable } from './components/CrmTable';
import { CrmFollowUps } from './components/CrmFollowUps';
import { LeadDetailModal } from './components/LeadDetailModal';
import { NewLeadModal } from './components/NewLeadModal';
import { DatabaseConfigModal } from './components/DatabaseConfigModal';
import { PackageSelectionModal } from './components/PackageSelectionModal';
import { CrmGoalsView } from './components/CrmGoalsView';

interface CrmAppProps {
  onBackToWebsite: () => void;
}

const CrmAppContent: React.FC<CrmAppProps> = ({ onBackToWebsite }) => {
  const { user, isAuthenticated } = useCrmAuth();
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [leads, setLeads] = useState<Lead[]>(() => getCrmLeads());
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [activeAction, setActiveAction] = useState<'details' | 'log_call' | 'whatsapp' | 'followup' | 'onboarding'>('details');
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [isDbConfigOpen, setIsDbConfigOpen] = useState(false);
  const [leadForTierSelect, setLeadForTierSelect] = useState<Lead | null>(null);
  const [isTierSelectOpen, setIsTierSelectOpen] = useState(false);

  // Sync leads from storage on mount
  useEffect(() => {
    setLeads(getCrmLeads());
  }, []);

  // Recalculate stats
  const stats = calculatePipelineStats(leads);
  const staleCount = leads.filter(isProposalStale).length;

  if (!isAuthenticated) {
    return <CrmLogin onBackToWebsite={onBackToWebsite} />;
  }

  const handleSelectLead = (
    lead: Lead,
    action: 'details' | 'log_call' | 'whatsapp' | 'followup' | 'onboarding' = 'details'
  ) => {
    setSelectedLead(lead);
    setActiveAction(action);
  };

  const handlePromptClosedWonTier = (lead: Lead) => {
    setLeadForTierSelect(lead);
    setIsTierSelectOpen(true);
  };

  const handleConfirmTier = (leadId: string, tier: PackageTierOption) => {
    const updated = assignPackageAndGenerateOnboarding(leadId, tier, user?.name || 'Agent');
    setLeads(updated);
    const found = updated.find((l) => l.id === leadId);
    if (found) {
      setSelectedLead(found);
      setActiveAction('onboarding');
    }
  };

  const handleMoveStage = (leadId: string, newStage: LeadStage) => {
    if (newStage === 'Closed/Won') {
      const targetLead = leads.find((l) => l.id === leadId);
      if (targetLead) {
        handlePromptClosedWonTier(targetLead);
        return;
      }
    }
    const updated = updateCrmLead(leadId, { status: newStage });
    setLeads(updated);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(updated.find((l) => l.id === leadId) || null);
    }
  };

  const handleDeleteLead = (leadId: string) => {
    if (confirm('Are you sure you want to remove this lead record from CRM?')) {
      const updated = deleteCrmLead(leadId);
      setLeads(updated);
      if (selectedLead?.id === leadId) {
        setSelectedLead(null);
      }
    }
  };

  const handleAddLead = (data: {
    firmName: string;
    contactPerson: string;
    profession: string;
    location: string;
    phone: string;
    email: string;
    status: LeadStage;
    packageTier: string;
    monthlyValue: number;
    assignedAgent: string;
  }) => {
    addCrmLead(data);
    setLeads(getCrmLeads());
  };

  const handleAddNote = (
    leadId: string,
    content: string,
    type: 'note' | 'call' | 'whatsapp',
    duration?: string
  ) => {
    const updated = addNoteToLead(leadId, {
      authorName: 'Agent',
      authorRole: 'Team Member',
      content,
      type,
      callDuration: duration,
    });
    setLeads(updated);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(updated.find((l) => l.id === leadId) || null);
    }
  };

  const handleAddFollowUp = (
    leadId: string,
    title: string,
    dueDate: string,
    priority: LeadPriority
  ) => {
    const updated = addFollowUpToLead(leadId, {
      title,
      dueDate,
      priority,
      assignedTo: selectedLead?.assignedAgent || 'Sales Agent',
    });
    setLeads(updated);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(updated.find((l) => l.id === leadId) || null);
    }
  };

  const handleToggleFollowUp = (leadId: string, followUpId: string) => {
    const updated = toggleFollowUpStatus(leadId, followUpId);
    setLeads(updated);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(updated.find((l) => l.id === leadId) || null);
    }
  };

  const handleToggleOnboardingTask = (leadId: string, phaseId: string, taskId: string) => {
    const updated = toggleOnboardingTask(leadId, phaseId, taskId, user?.name || 'Agent');
    setLeads(updated);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(updated.find((l) => l.id === leadId) || null);
    }
  };

  const handleAddOnboardingTask = (
    leadId: string,
    phaseId: 'phase1' | 'phase2' | 'phase3' | 'phase4',
    title: string,
    description: string
  ) => {
    const updated = addOnboardingTask(leadId, phaseId, title, description);
    setLeads(updated);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(updated.find((l) => l.id === leadId) || null);
    }
  };

  const existingClientsCount = leads.filter(
    (l) => l.status === 'Closed/Won' || (l.onboarding && l.onboarding.phases?.length)
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 flex font-['Poppins',sans-serif] text-slate-800 antialiased selection:bg-blue-600/15">
      {/* Sidebar Navigation */}
      <CrmSidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'database') {
            setIsDbConfigOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        pendingFollowupsCount={stats.pendingFollowupsToday}
        staleProposalsCount={staleCount}
        existingClientsCount={existingClientsCount}
        onBackToWebsite={onBackToWebsite}
      />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <CrmHeader
          currentTab={currentTab}
          onOpenNewLead={() => setIsNewLeadOpen(true)}
          onOpenDbConfig={() => setIsDbConfigOpen(true)}
          onBackToWebsite={onBackToWebsite}
        />

        <main className="flex-1 pb-12">
          {currentTab === 'overview' && (
            <CrmOverview
              leads={leads}
              stats={stats}
              onSelectTab={(tab) => setCurrentTab(tab)}
              onSelectLead={(lead) => handleSelectLead(lead, 'details')}
              onOpenNewLead={() => setIsNewLeadOpen(true)}
            />
          )}

          {currentTab === 'existing_clients' && (
            <CrmExistingClients
              leads={leads}
              onSelectLead={handleSelectLead}
              onOpenNewLead={() => setIsNewLeadOpen(true)}
            />
          )}

          {currentTab === 'kanban' && (
            <CrmKanban
              leads={leads}
              onSelectLead={handleSelectLead}
              onMoveStage={handleMoveStage}
              onPromptClosedWonTier={handlePromptClosedWonTier}
              onOpenLogCall={(lead) => handleSelectLead(lead, 'log_call')}
              onOpenWhatsAppTemplate={(lead) => handleSelectLead(lead, 'whatsapp')}
              onOpenScheduleFollowUp={(lead) => handleSelectLead(lead, 'followup')}
              onOpenNewLead={() => setIsNewLeadOpen(true)}
            />
          )}

          {currentTab === 'table' && (
            <CrmTable
              leads={leads}
              onSelectLead={handleSelectLead}
              onMoveStage={handleMoveStage}
              onPromptClosedWonTier={handlePromptClosedWonTier}
              onOpenLogCall={(lead) => handleSelectLead(lead, 'log_call')}
              onOpenWhatsAppTemplate={(lead) => handleSelectLead(lead, 'whatsapp')}
              onOpenScheduleFollowUp={(lead) => handleSelectLead(lead, 'followup')}
              onDeleteLead={handleDeleteLead}
              onOpenNewLead={() => setIsNewLeadOpen(true)}
            />
          )}

          {currentTab === 'followups' && (
            <CrmFollowUps
              leads={leads}
              onSelectLead={(lead) => handleSelectLead(lead, 'details')}
              onToggleFollowUp={handleToggleFollowUp}
              onOpenLogCall={(lead) => handleSelectLead(lead, 'log_call')}
              onOpenWhatsAppTemplate={(lead) => handleSelectLead(lead, 'whatsapp')}
              onOpenScheduleFollowUp={(lead) => handleSelectLead(lead, 'followup')}
            />
          )}

          {currentTab === 'goals' && (
            <CrmGoalsView
              leads={leads}
              stats={stats}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <LeadDetailModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onMoveStage={handleMoveStage}
        onAddNote={handleAddNote}
        onAddFollowUp={handleAddFollowUp}
        onToggleOnboardingTask={handleToggleOnboardingTask}
        onAddOnboardingTask={handleAddOnboardingTask}
        onOpenSelectTier={handlePromptClosedWonTier}
        activeAction={activeAction}
      />

      <PackageSelectionModal
        lead={leadForTierSelect}
        isOpen={isTierSelectOpen}
        onClose={() => {
          setIsTierSelectOpen(false);
          setLeadForTierSelect(null);
        }}
        onConfirmTier={handleConfirmTier}
      />

      <NewLeadModal
        isOpen={isNewLeadOpen}
        onClose={() => setIsNewLeadOpen(false)}
        onAddLead={handleAddLead}
      />

      <DatabaseConfigModal
        isOpen={isDbConfigOpen}
        onClose={() => setIsDbConfigOpen(false)}
      />
    </div>
  );
};

export const CrmApp: React.FC<CrmAppProps> = (props) => {
  return (
    <AuthProvider>
      <CrmAppContent {...props} />
    </AuthProvider>
  );
};

export default CrmApp;
