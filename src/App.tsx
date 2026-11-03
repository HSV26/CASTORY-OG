/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { CompliancePromise } from './components/CompliancePromise';
import { CoreSystems } from './components/CoreSystems';
import { Pricing } from './components/Pricing';
import { Roadmap } from './components/Roadmap';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { PracticeAuditModal } from './components/PracticeAuditModal';
import { CrmApp } from './crm/CrmApp';
import { MessageSquare } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'crm'>(() => {
    return typeof window !== 'undefined' && window.location.hash === '#crm' ? 'crm' : 'landing';
  });
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#crm') {
        setCurrentView('crm');
      } else if (window.location.hash === '' || window.location.hash === '#' || window.location.hash.startsWith('#framework') || window.location.hash.startsWith('#compliance') || window.location.hash.startsWith('#systems') || window.location.hash.startsWith('#pricing') || window.location.hash.startsWith('#roadmap')) {
        setCurrentView('landing');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret internal shortcut for team: Alt + C or Ctrl + Shift + C
      if ((e.altKey && e.key.toLowerCase() === 'c') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c')) {
        e.preventDefault();
        window.location.hash = '#crm';
        setCurrentView('crm');
      }
    };

    window.addEventListener('hashchange', handleHash);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOpenConsultation = (pkg?: string) => {
    setSelectedPackage(pkg);
    setIsConsultationOpen(true);
  };

  const handleBackToWebsite = () => {
    window.location.hash = '';
    setCurrentView('landing');
  };

  if (currentView === 'crm') {
    return <CrmApp onBackToWebsite={handleBackToWebsite} />;
  }

  return (
    <div className="min-h-screen bg-white text-[#0A192F] flex flex-col font-sans selection:bg-blue-600/15 selection:text-[#0A192F]">
      {/* Navigation Top Bar */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenConsultation={() => handleOpenConsultation()}
          onOpenAudit={() => setIsAuditOpen(true)}
        />

        {/* 2. The Problem & Our Solution (3-Step Growth Framework) */}
        <ProblemSolution
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 3. The Compliance Promise (ICAI, SEBI, AMFI Standards) */}
        <CompliancePromise />

        {/* 4. Our Core Systems (Local SEO, Authority Content, Hyper-Local, AI Receptionist) */}
        <CoreSystems
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 5. Packages & Pricing (Starter, Growth, Premium) */}
        <Pricing
          onSelectPackage={(pkgName) => handleOpenConsultation(pkgName)}
        />

        {/* 6. First 30 Days Roadmap */}
        <Roadmap
          onOpenConsultation={() => handleOpenConsultation()}
        />
      </main>

      {/* 7. Footer & Contact Details */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Floating Action (Respects 15% mobile sticky cap) */}
      <button
        onClick={() => handleOpenConsultation()}
        className="fixed bottom-6 right-6 z-40 bg-[#0A192F] hover:bg-[#132A4B] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 border border-slate-700 cursor-pointer"
        aria-label="Book practice consultation"
      >
        <MessageSquare className="w-5 h-5 text-blue-400" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          Book Practice Consultation
        </span>
      </button>

      {/* Consultation Booking Modal (Single Submit, No Redirect) */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialPackage={selectedPackage}
      />

      {/* Interactive 60-Second Practice Audit Modal */}
      <PracticeAuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        onBookCall={() => handleOpenConsultation()}
      />
    </div>
  );
}
