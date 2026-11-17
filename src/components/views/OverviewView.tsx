'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTenantAuth } from '@/context/TenantAuthContext';
import {
  Building2,
  FileText,
  Calendar,
  Wrench,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  Share2,
  Sparkles,
} from 'lucide-react';

interface OverviewViewProps {
  onNavigate: (tab: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { tenant, tickets, announcements } = useTenantAuth();

  const activeTickets = tickets.filter((tck) => tck.status !== 'RESOLVED');
  const latestAnnouncement = announcements[0];

  const daysRemaining = React.useMemo(() => {
    if (!tenant?.leaseEnd) return null;
    const end = new Date(tenant.leaseEnd);
    const now = new Date();
    return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }, [tenant?.leaseEnd]);

  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-r from-[#0F1E36]/90 via-[#0B1526] to-[#0F1E36]/80">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 tracking-wider uppercase">
                {tenant?.accountCode} • {tenant?.suiteType}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t('overview.welcome')} {tenant?.companyName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>
                {tenant?.suiteNumber} • {tenant?.propertyName} ({tenant?.areaSqft.toLocaleString()} sqft)
              </span>
            </p>
          </div>

          {/* Quick Balance Snapshot */}
          <div className="flex items-center gap-4 bg-white/[0.04] p-4 rounded-2xl border border-white/10">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">
                {t('overview.balance')}
              </span>
              <div className="text-2xl font-black text-white">
                ${tenant?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>

            {tenant && tenant.balance > 0 ? (
              <button
                onClick={() => onNavigate('billing')}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#070D18] text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>{t('overview.pay_now')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span className="hidden sm:inline">{t('overview.balance_paid')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2-Column Grid: Lease & Suite Summary & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lease & Suite Summary Card */}
        <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#F3D270] border border-[#D4AF37]/30">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {language === 'en' ? 'Active Lease & Suite Summary' : 'Resumen de Contrato y Suite'}
                </h3>
                <span className="text-[11px] text-white/60">
                  {tenant?.propertyName} • {tenant?.suiteNumber}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('lease')}
              className="text-xs text-[#F3D270] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'en' ? 'View Lease' : 'Ver Contrato'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50 block mb-1">
                {language === 'en' ? 'Base Rent' : 'Renta Base'}
              </span>
              <span className="text-base font-bold text-white font-mono">
                ${(tenant?.monthlyRent || 0).toLocaleString()}
              </span>
              <span className="text-[10px] text-white/40 ml-1">/mo</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50 block mb-1">
                {language === 'en' ? 'CAM Monthly Fee' : 'Cuota CAM'}
              </span>
              <span className="text-base font-bold text-[#F3D270] font-mono">
                ${(tenant?.camFee || 0).toLocaleString()}
              </span>
              <span className="text-[10px] text-white/40 ml-1">/mo</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#F3D270]" />
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50 block">
                  {language === 'en' ? 'Lease Expiration' : 'Vencimiento del Contrato'}
                </span>
                <span className="text-xs font-bold text-white font-mono">
                  {tenant?.leaseStart} → {tenant?.leaseEnd}
                </span>
              </div>
            </div>
            {daysRemaining !== null && (
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  daysRemaining > 90
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : daysRemaining > 30
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                }`}
              >
                {daysRemaining > 0
                  ? `${daysRemaining} ${language === 'en' ? 'days left' : 'días restantes'}`
                  : language === 'en'
                  ? 'Expired'
                  : 'Vencido'}
              </span>
            )}
          </div>
        </div>

        {/* Maintenance & Building Notice Widget */}
        <div className="space-y-4">
          {/* Active Maintenance Ticket Card */}
          <div className="glass-card p-5 rounded-3xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 block">
                  {t('overview.open_tickets')}
                </span>
                <div className="text-lg font-bold text-white">
                  {activeTickets.length > 0
                    ? `${activeTickets.length} Work Order(s) In Progress`
                    : 'All Systems Operational (0 Open)'}
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('maintenance')}
              className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-slate-200 transition-all flex items-center gap-1.5"
            >
              <span>{t('common.view')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Latest Announcement Card */}
          {latestAnnouncement && (
            <div className="glass-card p-5 rounded-3xl border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1">
                  <Megaphone className="w-3 h-3" />
                  {latestAnnouncement.category}
                </span>
                <span className="text-[10px] text-slate-400">
                  {latestAnnouncement.date}
                </span>
              </div>

              <h4 className="text-xs font-bold text-white mb-1">
                {latestAnnouncement.title[language]}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {latestAnnouncement.body[language]}
              </p>

              <button
                onClick={() => onNavigate('announcements')}
                className="mt-3 text-xs text-[#D4AF37] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Read Full Notice</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Referral Incentive Card */}
          <div className="glass-card p-4 rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">
                  {t('overview.refer_friend')}
                </span>
                <span className="text-[10px] text-slate-400">
                  Earn up to $500 rent credit per executed commercial lease
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('showcase')}
              className="p-2 rounded-xl bg-[#D4AF37] text-[#070D18] hover:brightness-110 transition-all font-bold"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
