import React, { useState, useEffect } from 'react';
import { X, Phone, MessageSquare, Calendar, Building2, MapPin, CheckCircle, Trash2 } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  practiceName: string;
  practiceType: string;
  city: string;
  phone: string;
  email: string;
  selectedPackage: string;
  note: string;
  submittedAt: string;
  status: string;
}

interface LeadsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadsDrawer: React.FC<LeadsDrawerProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<Lead[]>([]);

  const loadLeads = () => {
    try {
      const stored = localStorage.getItem('castory_inbound_leads');
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        // Provide sample initial demonstration lead for the partner desk
        const sample: Lead[] = [
          {
            id: 'LEAD-1741289400',
            name: 'CA Rajesh Mehta',
            practiceName: 'R. Mehta & Co.',
            practiceType: 'Chartered Accountant',
            city: 'Panvel, Navi Mumbai',
            phone: '+91 98200 44521',
            email: 'rajesh@rmehtaco.in',
            selectedPackage: 'Growth Package (Top Choice - ₹14,999/mo)',
            note: 'Needs top 3 Google Maps rank in Panvel commercial zone and automated WhatsApp intake.',
            submittedAt: new Date(Date.now() - 3600000).toISOString(),
            status: 'Pending Partner Outreach',
          },
        ];
        setLeads(sample);
      }
    } catch {
      setLeads([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  const handleClear = () => {
    if (confirm('Clear all stored inquiries?')) {
      localStorage.removeItem('castory_inbound_leads');
      setLeads([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl h-full bg-white border-l border-slate-200 shadow-2xl flex flex-col p-6 sm:p-8 overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              CAstory Partner Desk
            </span>
            <h3 className="text-xl font-bold text-[#0A192F]">
              Inbound Practice Leads ({leads.length})
            </h3>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Target WhatsApp recipient: <strong className="text-[#0A192F]">+91-8104468397</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {leads.length > 0 && (
              <button
                onClick={handleClear}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Clear all leads"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-[#0A192F] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {leads.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-[#0A192F]">No pending leads right now</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                When prospective clients submit their details on the consultation form, their records will instantly appear here.
              </p>
            </div>
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-xs space-y-3 hover:border-blue-400 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-[#0A192F]">{lead.name}</h4>
                    <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>{lead.practiceName}</span>
                      <span className="text-slate-300">·</span>
                      <span>{lead.practiceType}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100/80 px-2.5 py-1 rounded-md">
                    {lead.selectedPackage?.split('(')[0] || 'Inquiry'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{lead.city}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(lead.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {lead.note && (
                  <p className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80 font-normal">
                    "{lead.note}"
                  </p>
                )}

                {/* Direct Action for Agency Partner */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-3">
                  <div className="text-xs font-bold text-[#0A192F]">
                    {lead.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-[#0A192F] text-xs font-semibold flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.name)}%2C%20this%20is%20CAstory%20connecting%20regarding%20your%20practice%20consultation%20request.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 shadow-xs"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp Client</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A192F] text-xs font-bold cursor-pointer"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};
