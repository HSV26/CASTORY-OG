import React, { useState } from 'react';
import { useCrmAuth } from '../authContext';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertTriangle, KeyRound, ArrowLeft } from 'lucide-react';

interface CrmLoginProps {
  onBackToWebsite: () => void;
}

export const CrmLogin: React.FC<CrmLoginProps> = ({ onBackToWebsite }) => {
  const { login, rateLimitRemaining, lockoutTimer } = useCrmAuth();
  const [email, setEmail] = useState('admin@castory.in');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const res = login(email, password);
      if (!res.success) {
        setError(res.message || 'Login failed');
      }
      setIsSubmitting(false);
    }, 300);
  };

  const handleQuickFill = (role: 'admin' | 'sales') => {
    if (role === 'admin') {
      setEmail('admin@castory.in');
      setPassword('admin123');
    } else {
      setEmail('sales@castory.in');
      setPassword('sales123');
    }
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 selection:bg-blue-600/15">
      {/* Return Button */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <button
          onClick={onBackToWebsite}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0A192F] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to CAstory.in Public Site</span>
        </button>
        <span className="text-[11px] font-mono text-slate-400">v2.4 Internal Portal</span>
      </div>

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-xl p-8 sm:p-10 space-y-6">
        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#0A192F] text-white flex items-center justify-center font-bold text-lg mx-auto shadow-sm">
            CA
          </div>
          <h2 className="text-2xl font-extrabold text-[#0A192F] tracking-tight">
            CAstory Internal CRM
          </h2>
          <p className="text-xs text-slate-500 font-normal">
            Authorized Personnel Only · Client Acquisition & Pipeline Management
          </p>
        </div>

        {/* Security / Lockout Banner */}
        {lockoutTimer > 0 && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-pulse">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Security Lockout: Wait {lockoutTimer}s before next attempt.</span>
          </div>
        )}

        {error && lockoutTimer === 0 && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
          <div className="space-y-1">
            <label className="text-[#0A192F] font-semibold">Corporate Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                disabled={lockoutTimer > 0}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@castory.in"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[#0A192F] font-semibold">Security Password</label>
              <span className="text-[10px] text-slate-400">Encrypted (bcrypt sim)</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                disabled={lockoutTimer > 0}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || lockoutTimer > 0}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-blue-400" />
                  <span>Authenticate Session</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Demo Credentials Switcher */}
        <div className="pt-4 border-t border-slate-100 space-y-2.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
            Quick Fill Demo Credentials
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                email === 'admin@castory.in'
                  ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="block font-semibold">Admin Account</span>
              <span className="text-[10px] text-slate-400">Full Privileges</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('sales')}
              className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                email === 'sales@castory.in'
                  ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="block font-semibold">Sales Agent</span>
              <span className="text-[10px] text-slate-400">Pipeline & Follow-ups</span>
            </button>
          </div>
        </div>

        {/* Security Indicator */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>JWT Protected Route · Rate-Limit: {rateLimitRemaining} Attempts Left</span>
        </div>
      </div>
    </div>
  );
};
