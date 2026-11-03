import {
  Lead,
  PipelineStats,
  LeadNote,
  LeadFollowUp,
  LeadStage,
  PackageTierOption,
  ClientOnboarding,
  OnboardingPhase,
  OnboardingTask,
} from './types';

const CRM_STORAGE_KEY = 'castory_crm_leads_v3';

export const generateOnboardingChecklist = (
  tier: PackageTierOption,
  firmName: string
): ClientOnboarding => {
  const isStarter = tier.includes('Starter');
  const isGrowth = tier.includes('Growth');

  const monthlyValue = isStarter ? 7499 : isGrowth ? 14999 : 29999;
  const now = new Date();
  const launchTarget = new Date(now.getTime() + 30 * 86400000);

  const phases: OnboardingPhase[] = [
    {
      id: 'phase1',
      name: 'Phase 1: Access & Credential Handover',
      timeline: 'Days 1-3',
      description: 'Collect practice assets, setup administrative permissions, and establish secure communication channels.',
      tasks: [
        {
          id: 'task-1-1',
          title: 'Google Business Profile (GBP) Manager Access',
          description: `Send manager invitation for ${firmName}'s existing or fresh Google Maps location to castory.in agency email.`,
          completed: false,
          phaseId: 'phase1',
        },
        {
          id: 'task-1-2',
          title: 'Firm Media & Asset Collection',
          description: 'Receive high-res firm logo (PNG/SVG), Partner professional headshots, office signage, and reception photos.',
          completed: false,
          phaseId: 'phase1',
        },
        {
          id: 'task-1-3',
          title: 'ICAI / Regulatory Compliance Verification',
          description: 'Verify and log ICAI Firm Registration Number (FRN), Partner COP details, and letterhead disclaimer compliance.',
          completed: false,
          phaseId: 'phase1',
          mandatoryCompliance: true,
        },
        {
          id: 'task-1-4',
          title: 'WhatsApp Business API & Routing Setup',
          description: isStarter
            ? 'Configure direct WhatsApp click-to-chat inquiry link with custom greeting.'
            : 'Register dedicated WhatsApp Business number & set up webhook routing for CAstory AI Receptionist.',
          completed: false,
          phaseId: 'phase1',
        },
        {
          id: 'task-1-5',
          title: 'Domain & Intake Portal Configuration',
          description: 'Setup SSL secured client inquiry landing page and integrate CRM webhook endpoint.',
          completed: false,
          phaseId: 'phase1',
        },
      ],
    },
    {
      id: 'phase2',
      name: 'Phase 2: Audit & Setup Checklist',
      timeline: 'Days 4-7',
      description: 'Audit local geographic presence, configure knowledge bases, and calibrate compliance filters.',
      tasks: [
        {
          id: 'task-2-1',
          title: 'Local Micro-Market & Competitor Citation Audit',
          description: 'Benchmark top 3 ranked CA/tax practices in locality and map citation discrepancies across 40+ directories.',
          completed: false,
          phaseId: 'phase2',
        },
        {
          id: 'task-2-2',
          title: 'ICAI Code of Ethics Adherence Verification',
          description: 'Audit all planned positioning points against Clause 6 & 7 (No assured returns, no discounts, purely informative).',
          completed: false,
          phaseId: 'phase2',
          mandatoryCompliance: true,
        },
        {
          id: 'task-2-3',
          title: 'AI Receptionist Knowledge Base Calibration',
          description: isStarter
            ? 'Set up automated business hours reply & FAQ canned responses.'
            : `Ingest ${firmName}'s practice areas, tax filing calendar, partner bios, and fee structure into AI prompt matrix.`,
          completed: false,
          phaseId: 'phase2',
        },
        {
          id: 'task-2-4',
          title: 'Consultation Booking Workflow Integration',
          description: 'Configure automated booking slot sync and instant SMS/WhatsApp alerts to Managing Partner.',
          completed: false,
          phaseId: 'phase2',
        },
      ],
    },
    {
      id: 'phase3',
      name: 'Phase 3: Content Drafting & Written Pre-Approval Status',
      timeline: 'Days 8-10',
      description: 'Script educational topics, produce visual creatives, and secure mandatory written partner sign-off.',
      tasks: [
        {
          id: 'task-3-1',
          title: isStarter
            ? 'Draft 4 Monthly Compliance Infographics'
            : isGrowth
            ? 'Script 8 High-Impact Educational Reels & Tax Carousels'
            : 'Script 16 Custom Partner Reels, Carousel Decks & Thought Leadership Articles',
          description: 'Draft plain-language educational scripts covering GST updates, advance tax deadlines, and MCA compliances.',
          completed: false,
          phaseId: 'phase3',
        },
        {
          id: 'task-3-2',
          title: 'Visual Asset & Video Post-Production',
          description: 'Color-grade videos with professional subtitles, branded slide decks, and clean audio mastering.',
          completed: false,
          phaseId: 'phase3',
        },
        {
          id: 'task-3-3',
          title: 'Partner Written Pre-Approval Sign-off (ICAI Mandate)',
          description: 'Deliver preview deck to Managing Partner via email/WhatsApp and archive written signed approval in file.',
          completed: false,
          phaseId: 'phase3',
          mandatoryCompliance: true,
        },
      ],
    },
    {
      id: 'phase4',
      name: 'Phase 4: Live Engine & Automation Deployment',
      timeline: 'Days 11-30',
      description: 'Activate live syndication, launch 24/7 AI Receptionist, monitor leads, and deliver comprehensive ROI report.',
      tasks: [
        {
          id: 'task-4-1',
          title: 'Deploy Optimized Google Maps Profile & Citations',
          description: 'Publish primary category, secondary practice services, verified geo-tagged photos, and review engine.',
          completed: false,
          phaseId: 'phase4',
        },
        {
          id: 'task-4-2',
          title: 'Launch Scheduled Authority Content Broadcast',
          description: 'Initiate weekly scheduled release of pre-approved educational content across professional channels.',
          completed: false,
          phaseId: 'phase4',
        },
        {
          id: 'task-4-3',
          title: 'Activate Live 24/7 AI Receptionist',
          description: 'Switch AI WhatsApp auto-receptionist live to intercept inquiries, qualify callers, and log intake in CRM.',
          completed: false,
          phaseId: 'phase4',
        },
        {
          id: 'task-4-4',
          title: 'Day 14 Practice Intake Milestone Review',
          description: 'Audit first two weeks of inbound inquiries, WhatsApp transcripts, and Google Maps call actions.',
          completed: false,
          phaseId: 'phase4',
        },
        {
          id: 'task-4-5',
          title: 'Day 30 Authority & Rank Progress Report Delivery',
          description: 'Present monthly local search visibility jump, keyword rankings, consultation tally, and next month roadmap.',
          completed: false,
          phaseId: 'phase4',
        },
      ],
    },
  ];

  return {
    packageTier: tier,
    monthlyValue,
    initiatedAt: now.toISOString(),
    targetLaunchDate: launchTarget.toISOString().split('T')[0],
    status: 'In Progress',
    phases,
  };
};

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'LEAD-101',
    firmName: 'Mehta & Somani Chartered Accountants',
    contactPerson: 'CA Rajesh Mehta',
    profession: 'Chartered Accountant',
    location: 'Panvel, Navi Mumbai',
    phone: '+91 98200 44521',
    email: 'rajesh@mehtasomani.in',
    status: 'Proposal Shared',
    packageTier: 'Growth Package (₹14,999/mo)',
    monthlyValue: 14999,
    assignedAgent: 'Vikram Patil',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    lastContactedAt: new Date(Date.now() - 52 * 3600000).toISOString(),
    proposalSentAt: new Date(Date.now() - 52 * 3600000).toISOString(), // >48h ago (Stale Proposal Alert!)
    notes: [
      {
        id: 'N-1',
        authorName: 'Vikram Patil',
        authorRole: 'Sales Agent',
        content: 'Partner wants local Google Map pack top 3 rank in Panvel CIDCO commercial sector. Sent Growth Package proposal.',
        createdAt: new Date(Date.now() - 52 * 3600000).toISOString(),
        type: 'call',
        callDuration: '14 mins',
      },
      {
        id: 'N-2',
        authorName: 'Vikram Patil',
        authorRole: 'Sales Agent',
        content: 'Shared customized 16 reels/month calendar preview adhering to ICAI Code of Ethics.',
        createdAt: new Date(Date.now() - 50 * 3600000).toISOString(),
        type: 'whatsapp',
      },
    ],
    followUps: [
      {
        id: 'FU-1',
        title: 'Review proposal feedback with Managing Partner',
        dueDate: new Date().toISOString().split('T')[0], // Today!
        priority: 'High',
        completed: false,
        assignedTo: 'Vikram Patil',
        createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
      },
    ],
  },
  {
    id: 'LEAD-102',
    firmName: 'Kulkarni Tax & Legal Advisors',
    contactPerson: 'Adv. Suresh Kulkarni',
    profession: 'Tax Consultant',
    location: 'Vashi, Sector 17',
    phone: '+91 98331 89012',
    email: 'suresh@kulkarnitax.com',
    status: 'Meeting Booked',
    packageTier: 'Premium Package (₹29,999/mo)',
    monthlyValue: 29999,
    assignedAgent: 'Pooja Deshmukh',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    lastContactedAt: new Date(Date.now() - 4 * 3600000).toISOString(),
    notes: [
      {
        id: 'N-3',
        authorName: 'Pooja Deshmukh',
        authorRole: 'Sales Agent',
        content: 'Discovery call completed. Interested in 24/7 AI WhatsApp receptionist and senior partner video shoots.',
        createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
        type: 'call',
        callDuration: '22 mins',
      },
    ],
    followUps: [
      {
        id: 'FU-2',
        title: 'Conduct Zoom demonstration of AI WhatsApp Receptionist',
        dueDate: new Date().toISOString().split('T')[0], // Today!
        priority: 'High',
        completed: false,
        assignedTo: 'Pooja Deshmukh',
        createdAt: new Date(Date.now() - 12 * 3600000).toISOString(),
      },
    ],
  },
  {
    id: 'LEAD-103',
    firmName: 'Apex Wealth & Financial Planners',
    contactPerson: 'Amitabh Sen, CFP',
    profession: 'Financial Advisor',
    location: 'Belapur CBD',
    phone: '+91 97690 12345',
    email: 'sen@apexwealth.co.in',
    status: 'Closed/Won',
    packageTier: 'Growth Package (₹14,999/mo)',
    monthlyValue: 14999,
    assignedAgent: 'Rajesh Sharma (Admin)',
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    lastContactedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    notes: [
      {
        id: 'N-4',
        authorName: 'Rajesh Sharma',
        authorRole: 'Admin',
        content: 'Closed/Won deal confirmed! Growth Package selected. Client Onboarding & Execution SOP Checklist initiated.',
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        type: 'stage_change',
      },
    ],
    followUps: [],
    onboarding: (() => {
      const ob = generateOnboardingChecklist('Growth Package (₹14,999/mo)', 'Apex Wealth & Financial Planners');
      // Pre-complete Phase 1 to demonstrate progress
      ob.phases[0].tasks.forEach((t) => {
        t.completed = true;
        t.completedAt = new Date(Date.now() - 24 * 3600000).toISOString();
        t.completedBy = 'Rajesh Sharma';
      });
      // Pre-complete first two tasks of Phase 2
      ob.phases[1].tasks[0].completed = true;
      ob.phases[1].tasks[0].completedAt = new Date(Date.now() - 12 * 3600000).toISOString();
      ob.phases[1].tasks[0].completedBy = 'Rajesh Sharma';
      ob.phases[1].tasks[1].completed = true;
      ob.phases[1].tasks[1].completedAt = new Date(Date.now() - 8 * 3600000).toISOString();
      ob.phases[1].tasks[1].completedBy = 'Rajesh Sharma';
      return ob;
    })(),
  },
  {
    id: 'LEAD-104',
    firmName: 'Deshmukh & Associates CAs',
    contactPerson: 'CA Sneha Deshmukh',
    profession: 'Chartered Accountant',
    location: 'Nerul West',
    phone: '+91 98192 77650',
    email: 'sneha@deshmukhca.in',
    status: 'Negotiation',
    packageTier: 'Growth (₹14,999)',
    monthlyValue: 14999,
    assignedAgent: 'Vikram Patil',
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    lastContactedAt: new Date(Date.now() - 10 * 3600000).toISOString(),
    notes: [
      {
        id: 'N-5',
        authorName: 'Vikram Patil',
        authorRole: 'Sales Agent',
        content: 'Firm requested adding GST audit checklist landing page into the Growth tier. Approved by Admin.',
        createdAt: new Date(Date.now() - 10 * 3600000).toISOString(),
        type: 'note',
      },
    ],
    followUps: [
      {
        id: 'FU-3',
        title: 'Send modified draft contract for quarterly sign-off',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'Medium',
        completed: false,
        assignedTo: 'Vikram Patil',
        createdAt: new Date(Date.now() - 10 * 3600000).toISOString(),
      },
    ],
  },
  {
    id: 'LEAD-105',
    firmName: 'Bhandari & Goyal GST Practitioners',
    contactPerson: 'Nitin Bhandari',
    profession: 'Tax Consultant',
    location: 'Kharghar, Sector 20',
    phone: '+91 99201 33489',
    email: 'nitin@bgstax.in',
    status: 'New Lead',
    packageTier: 'Starter (₹7,499)',
    monthlyValue: 7499,
    assignedAgent: 'Pooja Deshmukh',
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    notes: [
      {
        id: 'N-6',
        authorName: 'System',
        authorRole: 'Automation',
        content: 'Inbound submission received via website landing page. Practice: Bhandari & Goyal GST Practitioners.',
        createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
        type: 'stage_change',
      },
    ],
    followUps: [
      {
        id: 'FU-4',
        title: 'First call outreach within 2-hour SLA',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'High',
        completed: false,
        assignedTo: 'Pooja Deshmukh',
        createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      },
    ],
  },
  {
    id: 'LEAD-106',
    firmName: 'Rathi Corporate Advisors',
    contactPerson: 'CA Anand Rathi',
    profession: 'Multi-partner CA Firm',
    location: 'Marathon Nexzone, Panvel',
    phone: '+91 98205 66781',
    email: 'anand@rathica.com',
    status: 'WhatsApp Sent',
    packageTier: 'Growth (₹14,999)',
    monthlyValue: 14999,
    assignedAgent: 'Vikram Patil',
    createdAt: new Date(Date.now() - 20 * 3600000).toISOString(),
    lastContactedAt: new Date(Date.now() - 18 * 3600000).toISOString(),
    notes: [
      {
        id: 'N-7',
        authorName: 'Vikram Patil',
        authorRole: 'Sales Agent',
        content: 'Dispatched Introduction & Local SEO Audit Overview template on WhatsApp.',
        createdAt: new Date(Date.now() - 18 * 3600000).toISOString(),
        type: 'whatsapp',
      },
    ],
    followUps: [
      {
        id: 'FU-5',
        title: 'Check WhatsApp read status & call if unanswered by 4 PM',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'Low',
        completed: false,
        assignedTo: 'Vikram Patil',
        createdAt: new Date(Date.now() - 18 * 3600000).toISOString(),
      },
    ],
  },
  {
    id: 'LEAD-107',
    firmName: 'Choudhary & Singhal Associates',
    contactPerson: 'CA Manoj Choudhary',
    profession: 'Chartered Accountant',
    location: 'Seawoods Grand Central',
    phone: '+91 97022 45890',
    email: 'manoj@csassociates.in',
    status: 'Closed/Won',
    packageTier: 'Premium (₹29,999)',
    monthlyValue: 29999,
    assignedAgent: 'Rajesh Sharma (Admin)',
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    lastContactedAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    notes: [
      {
        id: 'N-8',
        authorName: 'Rajesh Sharma',
        authorRole: 'Admin',
        content: 'Closed 6-month term with AI Voice receptionist integration. Client review session scheduled.',
        createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
        type: 'stage_change',
      },
    ],
    followUps: [],
  },
];

const WIPE_VERSION_KEY = 'castory_crm_wiped_v6';

export const getCrmLeads = (): Lead[] => {
  try {
    if (!localStorage.getItem(WIPE_VERSION_KEY)) {
      localStorage.removeItem(CRM_STORAGE_KEY);
      localStorage.removeItem('castory_inbound_leads');
      localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify([]));
      localStorage.setItem(WIPE_VERSION_KEY, 'true');
      return [];
    }
    const stored = localStorage.getItem(CRM_STORAGE_KEY);
    if (stored !== null) {
      return JSON.parse(stored);
    }
    return [];
  } catch {
    return [];
  }
};

export const clearAllCrmData = (): Lead[] => {
  try {
    localStorage.removeItem(CRM_STORAGE_KEY);
    localStorage.removeItem('castory_inbound_leads');
    localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify([]));
    localStorage.setItem(WIPE_VERSION_KEY, 'true');
    return [];
  } catch (err) {
    console.error('Failed to clear CRM data', err);
    return [];
  }
};

export const saveCrmLeads = (leads: Lead[]) => {
  try {
    localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(leads));
  } catch (err) {
    console.error('Failed to save CRM leads', err);
  }
};

export const addCrmLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'notes' | 'followUps'>): Lead => {
  const leads = getCrmLeads();
  const newLead: Lead = {
    ...leadData,
    id: 'LEAD-' + Date.now().toString().slice(-4),
    createdAt: new Date().toISOString(),
    notes: [
      {
        id: 'N-' + Date.now(),
        authorName: 'Agent',
        authorRole: 'Operations',
        content: 'Lead created in CRM.',
        createdAt: new Date().toISOString(),
        type: 'stage_change',
      },
    ],
    followUps: [
      {
        id: 'FU-' + Date.now(),
        title: 'Initial introductory outreach',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'High',
        completed: false,
        assignedTo: leadData.assignedAgent || 'Unassigned',
        createdAt: new Date().toISOString(),
      },
    ],
  };

  const updated = [newLead, ...leads];
  saveCrmLeads(updated);
  return newLead;
};

export const updateCrmLead = (id: string, updates: Partial<Lead>): Lead[] => {
  const leads = getCrmLeads();
  const updated = leads.map((lead) => {
    if (lead.id === id) {
      const merged = { ...lead, ...updates };
      // If moving to Proposal Shared, record proposalSentAt if not set
      if (updates.status === 'Proposal Shared' && lead.status !== 'Proposal Shared') {
        merged.proposalSentAt = new Date().toISOString();
      }
      return merged;
    }
    return lead;
  });
  saveCrmLeads(updated);
  return updated;
};

export const deleteCrmLead = (id: string): Lead[] => {
  const leads = getCrmLeads();
  const updated = leads.filter((l) => l.id !== id);
  saveCrmLeads(updated);
  return updated;
};

export const addNoteToLead = (leadId: string, note: Omit<LeadNote, 'id' | 'createdAt'>): Lead[] => {
  const leads = getCrmLeads();
  const updated = leads.map((lead) => {
    if (lead.id === leadId) {
      const newNote: LeadNote = {
        ...note,
        id: 'N-' + Date.now(),
        createdAt: new Date().toISOString(),
      };
      return {
        ...lead,
        lastContactedAt: new Date().toISOString(),
        notes: [newNote, ...lead.notes],
      };
    }
    return lead;
  });
  saveCrmLeads(updated);
  return updated;
};

export const addFollowUpToLead = (
  leadId: string,
  followUp: Omit<LeadFollowUp, 'id' | 'createdAt' | 'completed'>
): Lead[] => {
  const leads = getCrmLeads();
  const updated = leads.map((lead) => {
    if (lead.id === leadId) {
      const newFollowUp: LeadFollowUp = {
        ...followUp,
        id: 'FU-' + Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      return {
        ...lead,
        followUps: [newFollowUp, ...lead.followUps],
      };
    }
    return lead;
  });
  saveCrmLeads(updated);
  return updated;
};

export const toggleFollowUpStatus = (leadId: string, followUpId: string): Lead[] => {
  const leads = getCrmLeads();
  const updated = leads.map((lead) => {
    if (lead.id === leadId) {
      return {
        ...lead,
        followUps: lead.followUps.map((fu) =>
          fu.id === followUpId ? { ...fu, completed: !fu.completed } : fu
        ),
      };
    }
    return lead;
  });
  saveCrmLeads(updated);
  return updated;
};

export const isProposalStale = (lead: Lead): boolean => {
  if (lead.status !== 'Proposal Shared' || !lead.proposalSentAt) return false;
  const sentTime = new Date(lead.proposalSentAt).getTime();
  const now = Date.now();
  const hoursElapsed = (now - sentTime) / (1000 * 60 * 60);
  return hoursElapsed >= 48;
};

export const calculatePipelineStats = (leads: Lead[]): PipelineStats => {
  const todayStr = new Date().toISOString().split('T')[0];
  const activeProposals = leads.filter((l) => l.status === 'Proposal Shared').length;
  const closedWon = leads.filter((l) => l.status === 'Closed/Won').length;
  const closedLost = leads.filter((l) => l.status === 'Lost').length;
  const closedTotal = closedWon + closedLost;
  const conversionRate = closedTotal > 0 && leads.length > 0 ? Math.round((closedWon / leads.length) * 100) : 0;

  let pendingFollowupsToday = 0;
  leads.forEach((l) => {
    l.followUps.forEach((fu) => {
      if (!fu.completed && fu.dueDate <= todayStr) {
        pendingFollowupsToday++;
      }
    });
  });

  const totalPipelineValue = leads
    .filter((l) => l.status !== 'Lost')
    .reduce((acc, curr) => acc + (curr.monthlyValue || 14999), 0);

  return {
    totalLeads: leads.length,
    activeProposals,
    conversionRate,
    closedClientsThisMonth: closedWon,
    targetClientsThisMonth: 10,
    pendingFollowupsToday,
    totalPipelineValue,
  };
};

export const assignPackageAndGenerateOnboarding = (
  leadId: string,
  tier: PackageTierOption,
  authorName: string = 'Agent'
): Lead[] => {
  const leads = getCrmLeads();
  const updated = leads.map((lead) => {
    if (lead.id === leadId) {
      const isStarter = tier.includes('Starter');
      const isGrowth = tier.includes('Growth');
      const monthlyValue = isStarter ? 7499 : isGrowth ? 14999 : 29999;
      const onboarding = generateOnboardingChecklist(tier, lead.firmName);

      const note: LeadNote = {
        id: 'N-' + Date.now(),
        authorName,
        authorRole: 'Team',
        content: `Lead marked Closed/Won! Tier chosen: ${tier} (₹${monthlyValue.toLocaleString('en-IN')}/mo). Automated 4-Phase Client Onboarding & Execution SOP Checklist generated.`,
        createdAt: new Date().toISOString(),
        type: 'stage_change',
      };

      return {
        ...lead,
        status: 'Closed/Won' as LeadStage,
        packageTier: tier,
        monthlyValue,
        onboarding,
        lastContactedAt: new Date().toISOString(),
        notes: [note, ...lead.notes],
      };
    }
    return lead;
  });

  saveCrmLeads(updated);
  return updated;
};

export const toggleOnboardingTask = (
  leadId: string,
  phaseId: string,
  taskId: string,
  completedBy: string = 'Agent'
): Lead[] => {
  const leads = getCrmLeads();
  const updated = leads.map((lead) => {
    if (lead.id === leadId && lead.onboarding) {
      let taskTitle = '';
      let newState = false;

      const phases = lead.onboarding.phases.map((ph) => {
        if (ph.id === phaseId) {
          const tasks = ph.tasks.map((t) => {
            if (t.id === taskId) {
              newState = !t.completed;
              taskTitle = t.title;
              return {
                ...t,
                completed: newState,
                completedAt: newState ? new Date().toISOString() : undefined,
                completedBy: newState ? completedBy : undefined,
              };
            }
            return t;
          });
          return { ...ph, tasks };
        }
        return ph;
      });

      // Calculate if all tasks are done
      const allTasks = phases.flatMap((p) => p.tasks);
      const allDone = allTasks.every((t) => t.completed);
      const status = allDone ? ('Fully Deployed' as const) : ('In Progress' as const);

      const note: LeadNote = {
        id: 'N-' + Date.now(),
        authorName: completedBy,
        authorRole: 'Team',
        content: `SOP Task ${newState ? 'completed' : 're-opened'}: "${taskTitle}" (${phaseId.toUpperCase()})`,
        createdAt: new Date().toISOString(),
        type: 'note',
      };

      return {
        ...lead,
        onboarding: {
          ...lead.onboarding,
          status,
          phases,
        },
        notes: [note, ...lead.notes],
      };
    }
    return lead;
  });

  saveCrmLeads(updated);
  return updated;
};

export const addOnboardingTask = (
  leadId: string,
  phaseId: 'phase1' | 'phase2' | 'phase3' | 'phase4',
  title: string,
  description: string
): Lead[] => {
  const leads = getCrmLeads();
  const updated = leads.map((lead) => {
    if (lead.id === leadId && lead.onboarding) {
      const newTask: OnboardingTask = {
        id: 'task-custom-' + Date.now(),
        title,
        description,
        completed: false,
        phaseId,
      };

      const phases = lead.onboarding.phases.map((ph) => {
        if (ph.id === phaseId) {
          return {
            ...ph,
            tasks: [...ph.tasks, newTask],
          };
        }
        return ph;
      });

      return {
        ...lead,
        onboarding: {
          ...lead.onboarding,
          phases,
        },
      };
    }
    return lead;
  });

  saveCrmLeads(updated);
  return updated;
};

