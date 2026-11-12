'use client';

import React, { useState } from 'react';
import { useTenantAuth } from '@/context/TenantAuthContext';
import { Header } from '@/components/Header';
import { NavigationDock } from '@/components/NavigationDock';
import { LoginView } from '@/components/views/LoginView';
import { OverviewView } from '@/components/views/OverviewView';
import { SurveillanceView } from '@/components/views/SurveillanceView';
import { BillingView } from '@/components/views/BillingView';
import { MaintenanceView } from '@/components/views/MaintenanceView';
import { AnnouncementsView } from '@/components/views/AnnouncementsView';
import { ShowcaseView } from '@/components/views/ShowcaseView';
import { LeaseView } from '@/components/views/LeaseView';
import { motion, AnimatePresence } from 'framer-motion';

export default function TenantPortalHome() {
  const { tenant } = useTenantAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');

  // If not authenticated, show sleek login view
  if (!tenant) {
    return <LoginView />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView onNavigate={setActiveTab} />;
      case 'surveillance':
        return <SurveillanceView />;
      case 'billing':
        return <BillingView />;
      case 'maintenance':
        return <MaintenanceView />;
      case 'announcements':
        return <AnnouncementsView />;
      case 'showcase':
        return <ShowcaseView />;
      case 'lease':
        return <LeaseView />;
      default:
        return <OverviewView onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070D18] flex flex-col relative selection:bg-[#D4AF37]/30 selection:text-white pb-24 md:pb-12">
      {/* Top Header */}
      <Header activeTab={activeTab} />

      <div className="w-full flex-1 relative">
        {/* Navigation Dock (Vertical on desktop, bottom on mobile) */}
        <NavigationDock activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content View with V18 Desktop Margin Offset */}
        <main className="max-w-[1440px] mx-auto px-4 sm:px-6 md:pl-28 md:pr-8 py-6 sm:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

