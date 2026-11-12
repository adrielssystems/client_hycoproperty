'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTenantAuth } from '@/context/TenantAuthContext';
import { Building2, Shield, LogOut } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const { language, setLanguage, t } = useLanguage();
  const { tenant, logout } = useTenantAuth();

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'overview':
        return t('nav.overview');
      case 'surveillance':
        return t('nav.surveillance');
      case 'billing':
        return t('nav.billing');
      case 'maintenance':
        return t('nav.maintenance');
      case 'announcements':
        return t('nav.announcements');
      case 'showcase':
        return t('nav.showcase');
      case 'lease':
        return t('nav.lease');
      default:
        return t('nav.overview');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070D18]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        {/* Left: HYCO Logo & Active Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/hyco_brand_logo.png"
              alt="HYCO Property Management"
              className="h-9 sm:h-11 w-auto object-contain"
            />
          </div>

          <div className="hidden sm:block h-7 w-[1px] bg-white/10" />

          <div className="hidden md:flex flex-col">
            <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
              {t('app.title')}
            </span>
            <h1 className="text-base lg:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              {getSectionTitle()}
              {activeTab === 'surveillance' && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  HIKVISION LIVE
                </span>
              )}
            </h1>
          </div>
        </div>

        {/* Right: Tenant Badge & Controls */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {tenant && (
            <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              <div className="flex flex-col text-right">
                <span className="text-xs font-semibold text-white truncate max-w-[200px]">
                  {tenant.companyName}
                </span>
                <span className="text-[10px] text-slate-400">
                  {tenant.suiteNumber} • {tenant.accountCode}
                </span>
              </div>
            </div>
          )}

          {/* Bilingual Switcher */}
          <div className="flex items-center bg-white/[0.05] border border-white/10 rounded-xl p-0.5">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#070D18] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                language === 'es'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#070D18] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ES
            </button>
          </div>

          {/* Emergency Security Direct Call */}
          <a
            href="tel:3176750041"
            title="(317) 675-0041"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 transition-all text-xs font-semibold"
          >
            <Shield className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">24/7 Security</span>
          </a>

          {/* Logout Button */}
          <button
            onClick={logout}
            title={t('nav.logout')}
            className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
