import React, { useState } from 'react';
import { MapPin, BookOpen, Target, Bot, Check, Send, PhoneCall, Sparkles, Clock, Calendar } from 'lucide-react';
import aiDashboardImg from '../assets/images/ai_automation_dashboard_1793717821145.jpg';

interface CoreSystemsProps {
  onOpenConsultation: () => void;
}

export const CoreSystems: React.FC<CoreSystemsProps> = ({ onOpenConsultation }) => {
  // Interactive Receptionist Demo State
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Namaste! Welcome to Sharma & Associates, Chartered Accountants. Are you looking for (1) Company Incorporation, (2) GST & Tax Audit, or (3) Personal ITR Filing?',
      time: '10:14 AM',
    },
    {
      sender: 'user',
      text: 'Need help with GST scrutiny notice and annual return filing for my manufacturing firm.',
      time: '10:15 AM',
    },
    {
      sender: 'bot',
      text: 'Understood. We assist SMEs with GST audit and scrutiny notices regularly. May I know your firm’s annual turnover range, and would you prefer an in-person meeting in Navi Mumbai or a video consultation?',
      time: '10:15 AM',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    const newMsg = {
      sender: 'user' as const,
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = 'Thank you! Our senior partner has been notified. I have reserved an exploratory slot for tomorrow at 4:30 PM. Would you like a calendar invite sent to your email?';
      if (userText.toLowerCase().includes('fee') || userText.toLowerCase().includes('price') || userText.toLowerCase().includes('cost')) {
        botResponse = 'Our statutory audit and advisory fees depend on your transaction volume and entity type. We offer a 15-minute diagnostic call to review your scope and provide a formal compliance engagement quote.';
      } else if (userText.toLowerCase().includes('urgent') || userText.toLowerCase().includes('penalty')) {
        botResponse = 'Flagged as priority. Our tax desk is reviewing your notice urgency. Please share the notice section or call us directly on our dedicated office line.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot' as const,
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  const systems = [
    {
      id: '01',
      title: 'Local SEO & Google Maps Visibility',
      category: 'Organic Inbound',
      tagline: 'Dominate "CA near me" and high-intent local searches in your pin code.',
      description:
        'When local business owners, industrialists, or salaried executives search for tax help, 82% choose firms in the top 3 Google Maps pack. We optimize your Google Business Profile (GBP), manage client review workflows, verify local citations, and ensure your office is the unquestioned top choice.',
      deliverables: [
        'Google Business Profile (GBP) complete overhaul & verification',
        'Targeted local keywords (e.g., "Tax Auditor in Panvel", "GST Consultant Navi Mumbai")',
        'High-authority local directory citations & schema markup',
        'Automated ethical review request flow (WhatsApp trigger)',
      ],
      icon: MapPin,
      badge: 'Local Authority',
    },
    {
      id: '02',
      title: 'Authority-Driven Educational Content',
      category: 'Trust Architecture',
      tagline: 'Informative tax, GST, and corporate finance guides that showcase mastery.',
      description:
        'We script, design, and produce high-value educational carousels, infographics, and short-form video reels that answer the exact questions high-net-worth clients ask. Every asset is strictly informative, elevating your personal brand and firm prestige without violating ICAI norms.',
      deliverables: [
        '8 to 20 scripted educational reels/month (vertical 9:16 format)',
        'Timely updates on Union Budget, CBDT notifications & GST Council circulars',
        'LinkedIn & Instagram thought leadership carousels',
        'Pre-approval dashboard: zero posting without your signature',
      ],
      icon: BookOpen,
      badge: 'ICAI-Compliant',
    },
    {
      id: '03',
      title: 'Hyper-Local Targeted Campaigns',
      category: 'Precision Distribution',
      tagline: 'Reach directors, business owners, and NRIs within your exact operating radius.',
      description:
        'Instead of generic broad targeting, we design geo-fenced campaigns focused strictly on decision-makers: SME founders, industrial estate business heads, and startup directors within your city or commercial corridors.',
      deliverables: [
        'Targeted micro-radius campaigns across LinkedIn and Google Search',
        'Educational whitepapers & tax deduction guide landing pages',
        'Strict compliance: No assured returns, no comparative fee promises',
        'Transparent weekly cost-per-qualified-inquiry reporting',
      ],
      icon: Target,
      badge: 'High-Intent Leads',
    },
    {
      id: '04',
      title: 'AI Voice & WhatsApp Receptionists',
      category: '24/7 Qualification Engine',
      tagline: 'Instantly greet, qualify inquiries, and schedule consultations without human delay.',
      description:
        'Never let a valuable corporate client wait hours for a reply. Our customized AI WhatsApp and Voice receptionist responds within seconds, determines whether the prospect needs GST, audit, NRI taxation, or incorporation, collects basic documents, and books a call directly onto your calendar.',
      deliverables: [
        'WhatsApp Business Cloud API setup with interactive instant menus',
        'AI intake triage: distinguishes genuine high-ticket clients from spam',
        'Google Calendar / Cal.com real-time booking integration',
        'Automated appointment reminders that reduce consultation no-shows',
      ],
      icon: Bot,
      badge: 'Instant Inbound',
    },
  ];

  return (
    <section id="systems" className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Systematic Practice Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
              Our Core Systems
            </h2>
            <p className="text-slate-600 text-base">
              Four interconnected modules engineered specifically for Chartered Accountants, tax practitioners, and wealth advisors.
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0A192F] hover:bg-[#132A4B] rounded-xl transition-all whitespace-nowrap self-start md:self-auto cursor-pointer shadow-sm hover:shadow"
          >
            <span>Request System Demo</span>
          </button>
        </div>

        {/* 4 Systems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {systems.map((sys) => {
            const Icon = sys.icon;
            return (
              <div
                key={sys.id}
                className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 hover:border-blue-600/40 hover:shadow-lg transition-all flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          System {sys.id} · {sys.category}
                        </span>
                        <h3 className="text-xl font-bold text-[#0A192F]">
                          {sys.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 hidden sm:inline">
                      {sys.badge}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-blue-700">
                    {sys.tagline}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {sys.description}
                  </p>

                  <div className="space-y-2.5 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Core Capabilities Included:
                    </span>
                    <ul className="grid grid-cols-1 gap-2 pt-1">
                      {sys.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-[#0A192F] font-medium">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Spotlight: Live Interactive WhatsApp AI Receptionist & Dashboard */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8 lg:p-10 space-y-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left explanation & generated dashboard image */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Interactive Experience
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F]">
                  See how the AI WhatsApp Receptionist qualifies high-ticket clients.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Try typing a test response on the right (e.g. asking about audit fees, urgent notice handling, or partnership incorporation). Watch how the system maintains professionalism and guides them to book a consultation.
                </p>
              </div>

              {/* Generated image preview */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src={aiDashboardImg}
                  alt="AI automation and local SEO performance metrics on executive desk"
                  referrerPolicy="no-referrer"
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium pt-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  &lt; 60-Second Reply Speed
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  Syncs with Google Calendar
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                  Voice Bot Optional
                </span>
              </div>
            </div>

            {/* Right: Interactive Chat Simulator */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[460px]">
                {/* Chat Header */}
                <div className="bg-[#0A192F] px-5 py-3.5 border-b border-slate-800 flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                      WA
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Sharma & Associates CA Desk</p>
                      <p className="text-[10px] text-emerald-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                        AI Practice Assistant (Verified)
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-300 font-mono bg-slate-800/80 px-2 py-0.5 rounded">Live Simulator</span>
                </div>

                {/* Chat Messages Body */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F0F2F5]">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs ${
                          m.sender === 'user'
                            ? 'bg-[#0A192F] text-white rounded-tr-none font-medium'
                            : 'bg-white text-[#0A192F] border border-slate-200 rounded-tl-none font-normal'
                        }`}
                      >
                        {m.text}
                      </div>
                      <span className="text-[9px] text-slate-500 mt-1 px-1 font-medium">{m.time}</span>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 italic py-1 px-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                      <span className="ml-1">AI Assistant is replying...</span>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a sample client question..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="p-2.5 bg-[#0A192F] text-white rounded-xl hover:bg-[#132A4B] disabled:opacity-40 transition-colors cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4 text-blue-400" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
