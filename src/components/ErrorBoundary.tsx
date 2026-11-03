import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

interface Props {
  children: ReactNode;
  onBackToWebsite?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught CRM Error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      sessionStorage.clear();
      localStorage.clear();
    } catch {
      // ignore
    }
    window.location.hash = '#crm';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 text-slate-800 font-['Poppins',sans-serif]">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-xl p-8 text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-[#0A192F]">
                CRM Session Initialization
              </h2>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                An unexpected state issue occurred while loading the CRM session data. You can reset your session cache to reload cleanly.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-rose-700 text-left overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={this.handleReset}
                className="w-full py-3 px-4 rounded-xl bg-[#0A192F] hover:bg-[#132A4B] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <RefreshCw className="w-4 h-4 text-blue-400" />
                <span>Reset Cache & Reload CRM</span>
              </button>

              {this.props.onBackToWebsite && (
                <button
                  onClick={this.props.onBackToWebsite}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to CAstory Public Site</span>
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
