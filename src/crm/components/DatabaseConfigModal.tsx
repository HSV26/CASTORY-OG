import React, { useState } from 'react';
import { X, Database, ShieldCheck, Key, Copy, Check, Server, Lock } from 'lucide-react';
import { clearAllCrmData } from '../crmStorage';

interface DatabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabaseConfigModal: React.FC<DatabaseConfigModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedDb, setSelectedDb] = useState<'postgres' | 'supabase' | 'mongodb'>('postgres');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const postgresSql = `
-- PostgreSQL / Supabase Production Schema for CAstory CRM
-- 1. Leads Table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firm_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    profession VARCHAR(100) NOT NULL, -- 'Chartered Accountant', 'Tax Consultant', 'IFA'
    location VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(255),
    status VARCHAR(50) DEFAULT 'New Lead', -- 'New Lead', 'WhatsApp Sent', 'Proposal Shared', 'Meeting Booked', 'Negotiation', 'Closed/Won', 'Lost'
    package_tier VARCHAR(100) NOT NULL, -- 'Starter Package (₹7,499/mo)', 'Growth Package (₹14,999/mo)', 'Premium Package (₹29,999/mo)'
    monthly_value NUMERIC(10, 2) NOT NULL,
    assigned_agent_id UUID,
    proposal_sent_at TIMESTAMP WITH TIME ZONE,
    last_contacted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Client Onboarding Retainers Table
CREATE TABLE client_onboardings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID UNIQUE REFERENCES leads(id) ON DELETE CASCADE,
    package_tier VARCHAR(100) NOT NULL,
    monthly_value NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'In Progress', -- 'In Progress', 'Fully Deployed', 'Review Required'
    target_launch_date DATE NOT NULL,
    initiated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 4-Phase Execution SOP Tasks Table
CREATE TABLE onboarding_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    onboarding_id UUID REFERENCES client_onboardings(id) ON DELETE CASCADE,
    phase_id VARCHAR(20) NOT NULL, -- 'phase1', 'phase2', 'phase3', 'phase4'
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    completed_by VARCHAR(150),
    mandatory_compliance BOOLEAN DEFAULT FALSE, -- ICAI Clause 6 & 7 mandatory review
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Audit Log & Notes Table
CREATE TABLE lead_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    author_name VARCHAR(150) NOT NULL,
    author_role VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    call_duration VARCHAR(50),
    type VARCHAR(50) NOT NULL, -- 'call', 'note', 'whatsapp', 'stage_change'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Follow-ups Table
CREATE TABLE lead_follow_ups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    due_date DATE NOT NULL,
    priority VARCHAR(20) DEFAULT 'High', -- 'High', 'Medium', 'Low'
    completed BOOLEAN DEFAULT FALSE,
    assigned_to VARCHAR(150) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_leads_stale ON leads (status, proposal_sent_at) WHERE status = 'Proposal Shared';
CREATE INDEX idx_tasks_phase ON onboarding_tasks (onboarding_id, phase_id);

-- Row-Level Security (RLS) Policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_onboardings ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_tasks ENABLE ROW LEVEL SECURITY;

-- Admins have unrestricted access; Sales agents access assigned leads
CREATE POLICY admin_full_access ON leads FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY agent_assigned_access ON leads FOR SELECT TO authenticated USING (assigned_agent_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin');
  `.trim();

  const envSample = `
# CAstory Production Environment Configuration (.env)
DATABASE_URL="postgresql://castory_admin:SECURE_PASSWORD@db.region.supabase.co:5432/postgres?sslmode=require"
JWT_SECRET="e3afed0047b08059d0fada10f400c1e592c3d18e87b64"
JWT_EXPIRY="8h"
WHATSAPP_BUSINESS_API_TOKEN="EAAOx..."
WHATSAPP_PHONE_NUMBER_ID="918104468397"
CORS_ORIGIN="https://castory.in"
  `.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-[#0A192F] hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Production Architecture & Security
            </span>
            <h3 className="text-2xl font-bold text-[#0A192F]">
              Connect Backend Database
            </h3>
            <p className="text-xs text-slate-600 font-normal">
              The CRM currently operates with high-speed local persistence. Follow these instructions to migrate to a production-grade relational or document store.
            </p>
          </div>

          {/* Database Selector */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setSelectedDb('postgres')}
              className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                selectedDb === 'postgres'
                  ? 'bg-white text-[#0A192F] shadow-xs'
                  : 'text-slate-600 hover:text-[#0A192F]'
              }`}
            >
              PostgreSQL (Recommended)
            </button>
            <button
              onClick={() => setSelectedDb('supabase')}
              className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                selectedDb === 'supabase'
                  ? 'bg-white text-[#0A192F] shadow-xs'
                  : 'text-slate-600 hover:text-[#0A192F]'
              }`}
            >
              Supabase / Cloud SQL
            </button>
            <button
              onClick={() => setSelectedDb('mongodb')}
              className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                selectedDb === 'mongodb'
                  ? 'bg-white text-[#0A192F] shadow-xs'
                  : 'text-slate-600 hover:text-[#0A192F]'
              }`}
            >
              MongoDB Atlas
            </button>
          </div>

          {/* Architecture details */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-900">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Recommended Security Architecture</span>
            </div>
            <ul className="space-y-1 text-slate-700 font-normal list-disc pl-4">
              <li>Deploy an Express/Fastify API service with Prisma ORM or Drizzle ORM.</li>
              <li>Enforce parameterized SQL queries to eliminate SQL injection vulnerabilities.</li>
              <li>Store user credentials with bcrypt (salt rounds $\ge 12$) or Argon2id.</li>
              <li>Implement JWT token signing with HS256/RS256 and store tokens in HTTP-only, SameSite Secure cookies.</li>
            </ul>
          </div>

          {/* Schema Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#0A192F]">
              <span>Production SQL DDL Migration Schema</span>
              <button
                onClick={() => copyToClipboard(postgresSql, 'sql')}
                className="inline-flex items-center gap-1 text-blue-700 hover:underline cursor-pointer"
              >
                {copiedKey === 'sql' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'sql' ? 'Copied' : 'Copy SQL'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-[#0A192F] text-slate-200 text-[11px] font-mono overflow-x-auto max-h-48 leading-relaxed">
              {postgresSql}
            </pre>
          </div>

          {/* Environment Variables */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#0A192F]">
              <span>Required Environment Configuration (.env)</span>
              <button
                onClick={() => copyToClipboard(envSample, 'env')}
                className="inline-flex items-center gap-1 text-blue-700 hover:underline cursor-pointer"
              >
                {copiedKey === 'env' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'env' ? 'Copied' : 'Copy .env'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-900 text-blue-200 text-[11px] font-mono overflow-x-auto max-h-36 leading-relaxed">
              {envSample}
            </pre>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete all CRM data? This will wipe all leads, notes, and onboarding records so you can start fresh for tomorrow.')) {
                  clearAllCrmData();
                  alert('All CRM data has been wiped successfully. Starting fresh!');
                  window.location.reload();
                }
              }}
              className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
            >
              Wipe All CRM Data & Start Fresh
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white text-xs font-bold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
