'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTenantAuth } from '@/context/TenantAuthContext';
import { Megaphone, Pin, Calendar, ShieldAlert, Sparkles, Wrench } from 'lucide-react';

export const AnnouncementsView: React.FC = () => {
  const { language, t } = useLanguage();
  const { announcements } = useTenantAuth();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ADVISORY':
        return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case 'MAINTENANCE':
        return <Wrench className="w-4 h-4 text-blue-400" />;
      case 'COMMERCIAL':
        return <Sparkles className="w-4 h-4 text-[#D4AF37]" />;
      default:
        return <Megaphone className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {t('announcements.title')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {t('announcements.subtitle')}
        </p>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`glass-card p-5 sm:p-6 rounded-3xl border transition-all ${
              ann.isPinned
                ? 'border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37]/10 via-[#0B1526] to-[#0B1526]'
                : 'border-white/10'
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10">
                  {getCategoryIcon(ann.category)}
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/10">
                  {ann.category}
                </span>
                {ann.isPinned && (
                  <span className="flex items-center gap-1 text-[10px] font-extrabold text-[#D4AF37] bg-[#D4AF37]/15 px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                    <Pin className="w-3 h-3" />
                    <span>PRIORITY</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>{ann.date}</span>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
              {ann.title[language]}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/[0.06]">
              {ann.body[language]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
