'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTenantAuth } from '@/context/TenantAuthContext';
import {
  LayoutDashboard,
  Video,
  CreditCard,
  Wrench,
  Megaphone,
  Sparkles,
  FileText,
  LogOut,
} from 'lucide-react';

interface NavigationDockProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();
  const { tenant, logout } = useTenantAuth();

  const navItems = [
    {
      id: 'overview',
      label: t('nav.overview'),
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'surveillance',
      label: t('nav.surveillance'),
      icon: Video,
      badge: 'LIVE',
      isLive: true,
    },
    {
      id: 'billing',
      label: t('nav.billing'),
      icon: CreditCard,
      badge: tenant && tenant.balance > 0 ? `$${tenant.balance.toLocaleString()}` : null,
      badgeColor: 'rose',
    },
    {
      id: 'maintenance',
      label: t('nav.maintenance'),
      icon: Wrench,
      badge: null,
    },
    {
      id: 'announcements',
      label: t('nav.announcements'),
      icon: Megaphone,
      badge: null,
    },
    {
      id: 'showcase',
      label: t('nav.showcase'),
      icon: Sparkles,
      badge: 'NEW',
      badgeColor: 'gold',
    },
    {
      id: 'lease',
      label: t('nav.lease'),
      icon: FileText,
      badge: null,
    },
  ];

  return (
    <>
      {/* =========================================
          DESKTOP DOCK: V18 Vertical Floating Pill
          ========================================= */}
      <aside className="hidden md:flex fixed left-5 top-20 bottom-6 z-30 flex-col items-center justify-between w-16 py-4 rounded-3xl bg-[#0B1526]/85 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Navigation Items */}
        <div className="flex flex-col items-center gap-3 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <div key={item.id} className="relative group flex items-center justify-center">
                <button
                  onClick={() => onTabChange(item.id)}
                  aria-label={item.label}
                  className={`relative p-3 rounded-2xl transition-all duration-200 flex items-center justify-center ${
                    isActive
                      ? 'bg-gradient-to-br from-[#D4AF37] to-[#B89222] text-[#070D18] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className="w-5 h-5" />

                  {/* Pulsing indicator for CCTV Live */}
                  {item.isLive && !isActive && (
                    <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  )}

                  {/* Badge */}
                  {item.badge && !item.isLive && (
                    <span
                      className={`absolute -top-1 -right-1 px-1 py-0.2 text-[9px] font-extrabold rounded-full ${
                        item.badgeColor === 'rose'
                          ? 'bg-rose-500 text-white'
                          : 'bg-[#D4AF37] text-[#070D18]'
                      }`}
                    >
                      •
                    </span>
                  )}
                </button>

                {/* Floating Tooltip */}
                <div className="absolute left-18 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#0B1526] border border-white/10 text-white text-xs font-semibold shadow-xl">
                  {item.label}
                  {item.isLive && (
                    <span className="ml-2 text-[10px] text-emerald-400 font-bold">• LIVE</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Logout */}
        <div className="relative group">
          <button
            onClick={logout}
            aria-label={t('nav.logout')}
            className="p-3 rounded-2xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <div className="absolute left-18 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#0B1526] border border-rose-500/30 text-rose-300 text-xs font-semibold shadow-xl">
            {t('nav.logout')}
          </div>
        </div>
      </aside>

      {/* =========================================
          MOBILE DOCK: Floating Bottom Dock
          ========================================= */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#0B1526]/90 backdrop-blur-2xl border border-white/10 rounded-2xl px-2 py-2 shadow-2xl flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive ? 'text-[#D4AF37]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium tracking-tighter truncate max-w-[50px] mt-0.5">
                {item.label.split(' ')[0]}
              </span>

              {item.isLive && !isActive && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};
