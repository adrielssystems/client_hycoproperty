'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTenantAuth } from '@/context/TenantAuthContext';
import {
  Sparkles,
  Share2,
  CheckCircle2,
  MessageCircle,
  Send,
  Mail,
} from 'lucide-react';

interface AvailableSuite {
  id: string;
  propertyName: string;
  address: string;
  suiteNumber: string;
  type: string;
  areaSqft: number;
  rentPrice: number;
  image: string;
  highlights: string[];
}

const AVAILABLE_SUITES: AvailableSuite[] = [
  {
    id: 'suite-104-zionsville',
    propertyName: '7898 Zionsville Rd Commercial Center',
    address: '7898 Zionsville Rd, Indianapolis, IN 46268',
    suiteNumber: 'Suite 104',
    type: 'Flex Commercial / Retail Showroom',
    areaSqft: 1250,
    rentPrice: 2100.0,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    highlights: ['Street Frontage', 'Private Restroom', 'High-Speed Fiber Ready'],
  },
  {
    id: 'suite-bay12-morris',
    propertyName: 'Morris Street Flex & Service Hub',
    address: '2400 W Morris St, Indianapolis, IN 46221',
    suiteNumber: 'Flex Bay 12-B',
    type: 'Drive-In Flex / Warehouse',
    areaSqft: 3200,
    rentPrice: 4400.0,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    highlights: ['14ft Overhead Door', 'Direct I-70 Access', 'Fenced Fleet Yard'],
  },
  {
    id: 'suite-320-meridian',
    propertyName: 'Meridian North Executive Suites',
    address: '9245 N Meridian St, Indianapolis, IN 46260',
    suiteNumber: 'Suite 320',
    type: 'Medical & Professional Studio',
    areaSqft: 980,
    rentPrice: 2450.0,
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    highlights: ['Reception & 3 Exam Rooms', 'Plumbing in Each Room', 'Covered Parking'],
  },
];

export const ShowcaseView: React.FC = () => {
  const { language, t } = useLanguage();
  const { tenant } = useTenantAuth();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getShareUrl = (suite: AvailableSuite) => {
    return `https://hycopropertymanagement.com/#for-lease?ref=${tenant?.accountCode || 'TENANT'}&suite=${encodeURIComponent(
      suite.suiteNumber
    )}`;
  };

  const getShareText = (suite: AvailableSuite) => {
    return language === 'en'
      ? `Check out ${suite.suiteNumber} (${suite.areaSqft.toLocaleString()} sqft) at ${suite.propertyName} managed by HYCO Property Management in Indianapolis: ${getShareUrl(
          suite
        )}`
      : `Conoce ${suite.suiteNumber} (${suite.areaSqft.toLocaleString()} pies²) en ${suite.propertyName} administrado por HYCO Property Management en Indianápolis: ${getShareUrl(
          suite
        )}`;
  };

  const handleCopy = (suite: AvailableSuite) => {
    navigator.clipboard.writeText(getShareUrl(suite));
    setCopiedId(suite.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handleWhatsApp = (suite: AvailableSuite) => {
    const url = `https://wa.me/?text=${encodeURIComponent(getShareText(suite))}`;
    window.open(url, '_blank');
  };

  const handleTelegram = (suite: AvailableSuite) => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      getShareUrl(suite)
    )}&text=${encodeURIComponent(getShareText(suite))}`;
    window.open(url, '_blank');
  };

  const handleEmail = (suite: AvailableSuite) => {
    const subject = encodeURIComponent(
      `Commercial Space in Indianapolis: ${suite.suiteNumber} at ${suite.propertyName}`
    );
    const body = encodeURIComponent(getShareText(suite));
    window.open(`mailto:?subject=${subject}&body=${body}`, '_self');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {t('showcase.title')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {t('showcase.subtitle')}
        </p>
      </div>

      {/* Referral Program Banner */}
      <div className="glass-card p-5 sm:p-6 rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#D4AF37]/15 via-[#0B1526] to-[#0B1526] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
              Official Tenant Referral Bonus
            </span>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5 leading-relaxed">
              {t('showcase.referral_bonus')}
            </p>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-slate-300 font-mono shrink-0 text-center">
          Referral Code: <span className="text-[#D4AF37] font-bold">{tenant?.accountCode}</span>
        </div>
      </div>

      {/* Suites Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AVAILABLE_SUITES.map((suite) => (
          <div
            key={suite.id}
            className="glass-card rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-[#D4AF37]/40 transition-all shadow-xl"
          >
            {/* Image & Price Badge */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black">
              <img
                src={suite.image}
                alt={suite.suiteNumber}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-[#070D18] font-black text-[10px] tracking-wider uppercase shadow-md">
                  AVAILABLE NOW
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <div className="text-lg font-black text-[#D4AF37]">
                  ${suite.rentPrice.toLocaleString('en-US')}{' '}
                  <span className="text-xs font-normal text-slate-300">/mo</span>
                </div>
                <span className="text-xs text-slate-300 font-mono">
                  {suite.areaSqft.toLocaleString()} sqft
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block mb-1">
                  {suite.type}
                </span>
                <h3 className="text-base font-bold text-white mb-1">
                  {suite.suiteNumber}
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  {suite.propertyName} • {suite.address}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {suite.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-[10px] text-slate-300 border border-white/[0.08]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share & Deep Link Actions */}
              <div className="pt-3 border-t border-white/[0.08] space-y-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleWhatsApp(suite)}
                    title="Share to WhatsApp"
                    className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleTelegram(suite)}
                    title="Share to Telegram"
                    className="p-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 border border-sky-500/30 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleEmail(suite)}
                    title="Share via Email"
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/10 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleCopy(suite)}
                    className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#070D18] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 transition-all"
                  >
                    {copiedId === suite.id ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{t('showcase.share_suite')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
