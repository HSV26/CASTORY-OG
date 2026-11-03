export type UserRole = 'admin' | 'sales_agent';

export interface CrmUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  token?: string;
}

export type LeadStage =
  | 'New Lead'
  | 'WhatsApp Sent'
  | 'Proposal Shared'
  | 'Meeting Booked'
  | 'Negotiation'
  | 'Closed/Won'
  | 'Lost';

export type LeadPriority = 'High' | 'Medium' | 'Low';

export type PackageTierOption =
  | 'Starter Package (₹7,499/mo)'
  | 'Growth Package (₹14,999/mo)'
  | 'Premium Package (₹29,999/mo)';

export interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: string;
  completedBy?: string;
  phaseId: 'phase1' | 'phase2' | 'phase3' | 'phase4';
  mandatoryCompliance?: boolean;
}

export interface OnboardingPhase {
  id: 'phase1' | 'phase2' | 'phase3' | 'phase4';
  name: string;
  timeline: string;
  description: string;
  tasks: OnboardingTask[];
}

export interface ClientOnboarding {
  packageTier: PackageTierOption;
  monthlyValue: number;
  initiatedAt: string;
  targetLaunchDate: string;
  status: 'In Progress' | 'Fully Deployed' | 'Review Required';
  phases: OnboardingPhase[];
}

export interface LeadNote {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: string;
  type: 'note' | 'call' | 'whatsapp' | 'meeting' | 'stage_change';
  callDuration?: string;
}

export interface LeadFollowUp {
  id: string;
  title: string;
  dueDate: string; // YYYY-MM-DD or ISO
  priority: LeadPriority;
  completed: boolean;
  assignedTo: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  firmName: string;
  contactPerson: string;
  profession: string; // e.g. "Chartered Accountant", "Tax Consultant", "IFA", "Multi-partner CA Firm"
  location: string; // e.g. "Panvel", "Vashi", "Nerul", "Belapur", "Kharghar"
  phone: string;
  email: string;
  status: LeadStage;
  packageTier: string; // "Starter Package (₹7,499/mo)", "Growth Package (₹14,999/mo)", "Premium Package (₹29,999/mo)"
  monthlyValue: number;
  assignedAgent: string;
  createdAt: string;
  lastContactedAt?: string;
  proposalSentAt?: string; // used for 48-hour follow-up alert
  notes: LeadNote[];
  followUps: LeadFollowUp[];
  onboarding?: ClientOnboarding;
}

export interface PipelineStats {
  totalLeads: number;
  activeProposals: number;
  conversionRate: number;
  closedClientsThisMonth: number;
  targetClientsThisMonth: number;
  pendingFollowupsToday: number;
  totalPipelineValue: number;
}

