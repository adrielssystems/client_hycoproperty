'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTenantAuth } from '@/context/TenantAuthContext';
import {
  FileText,
  Building,
  Calendar,
  ShieldCheck,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Printer,
} from 'lucide-react';

export const LeaseView: React.FC = () => {
  const { t } = useLanguage();
  const { tenant } = useTenantAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t('lease.title')}
          </h2>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-slate-200 transition-all flex items-center gap-2 w-fit"
        >
          <Printer className="w-4 h-4 text-[#D4AF37]" />
          <span>Print Summary</span>
        </button>
      </div>

      {/* Primary Dossier Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        {/* Top Info Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B89222] text-[#070D18]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                Official Commercial Lease Agreement
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {tenant?.companyName}
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Account ID: {tenant?.accountCode} • Lease Term: 36 Months
              </span>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold w-fit flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>ACTIVE & COMPLIANT</span>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <span className="text-[11px] text-slate-400 block mb-1">
              {t('lease.suite')}
            </span>
            <div className="text-base font-bold text-white">
              {tenant?.suiteNumber}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              {tenant?.suiteType}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <span className="text-[11px] text-slate-400 block mb-1">
              {t('lease.sqft')}
            </span>
            <div className="text-base font-bold text-white">
              {tenant?.areaSqft.toLocaleString()} Sq Ft
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Gross Leasable Area
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <span className="text-[11px] text-slate-400 block mb-1">
              {t('lease.monthly_rate')}
            </span>
            <div className="text-base font-bold text-[#D4AF37]">
              ${tenant?.monthlyRent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              + CAM ${tenant?.camFee.toLocaleString('en-US')}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <span className="text-[11px] text-slate-400 block mb-1">
              Security Deposit Held
            </span>
            <div className="text-base font-bold text-white">
              ${tenant?.securityDeposit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Escrow Account (Marion County)
            </span>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                {t('lease.start_date')}
              </span>
              <span className="text-sm font-bold text-white font-mono">
                {tenant?.leaseStart}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                {t('lease.end_date')}
              </span>
              <span className="text-sm font-bold text-white font-mono">
                {tenant?.leaseEnd}
              </span>
            </div>
          </div>
        </div>

        {/* Legal Compliance Box */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed space-y-1">
            <span className="font-bold text-white block">
              Indiana Code Title 32, Article 31 Compliance (Landlord-Tenant Relations)
            </span>
            <p className="text-slate-400">
              Governed under the laws of the State of Indiana. Exclusive venue and jurisdiction lies in the Marion County Superior and Circuit Courts, Indianapolis, IN. Equal Housing and Commercial Opportunity standard enforced.
            </p>
          </div>
        </div>
      </div>

      {/* Property Management Office Contact Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Building className="w-4 h-4 text-[#D4AF37]" />
          <span>{t('lease.management_office')}</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] text-slate-400 block font-semibold">
                Headquarters Address
              </span>
              <span className="text-xs text-white font-medium block mt-0.5">
                {t('lease.address_full')}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
            <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] text-slate-400 block font-semibold">
                Direct Dispatch & Emergency
              </span>
              <a
                href="tel:3176750041"
                className="text-xs text-white hover:text-[#D4AF37] font-bold block mt-0.5 transition-colors"
              >
                {t('lease.phone_full')}
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] text-slate-400 block font-semibold">
                Official Support Email
              </span>
              <a
                href="mailto:info@hycoprop.com"
                className="text-xs text-white hover:text-[#D4AF37] font-medium block mt-0.5 transition-colors"
              >
                {t('lease.email_full')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
