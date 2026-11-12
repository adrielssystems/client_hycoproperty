'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTenantAuth, DEMO_TENANTS } from '@/context/TenantAuthContext';
import { Building2, Lock, ArrowRight, PhoneCall } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { login, loginAsDemo } = useTenantAuth();

  const [accountId, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountId.trim()) return;

    const success = login(accountId, password);
    if (!success) {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 relative bg-gradient-to-b from-[#070D18] via-[#0B1526] to-[#070D18] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#152744]/40 rounded-full blur-[128px] pointer-events-none" />

      {/* Top Bar with Language Selector */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        <div className="flex items-center bg-white/[0.06] border border-white/10 rounded-xl p-0.5">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              language === 'en'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#070D18]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('es')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              language === 'es'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#070D18]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ES
          </button>
        </div>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Header Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src="/hyco_brand_logo.png"
            alt="HYCO Property Management"
            className="h-14 sm:h-16 w-auto object-contain mb-4 drop-shadow-[0_4px_20px_rgba(212,175,55,0.2)]"
          />
          <span className="text-[11px] font-bold tracking-widest text-[#D4AF37] uppercase">
            {t('login.title')}
          </span>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            {t('login.subtitle')}
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t('login.account_id')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={accountId}
                  onChange={(e) => {
                    setAccountId(e.target.value);
                    setError(false);
                  }}
                  placeholder={t('login.account_placeholder')}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                />
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t('login.password')}
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder={t('login.password_placeholder')}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
                Invalid account code or email. Use one of the demo buttons below or check with management.
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#070D18] font-bold text-sm tracking-wide shadow-[0_10px_25px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>{t('login.submit')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Section */}
          <div className="mt-6 pt-6 border-t border-white/[0.08]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
                {t('login.quick_demo')}
              </span>
              <span className="text-[10px] text-slate-400">1-Click Test</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              {t('login.quick_demo_desc')}
            </p>

            <div className="grid grid-cols-1 gap-2">
              {DEMO_TENANTS.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => loginAsDemo(demo.accountCode)}
                  className="text-left p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#D4AF37]/50 transition-all group flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                      {demo.companyName}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {demo.suiteNumber} • {demo.propertyName.split(' ')[0]} {demo.propertyName.split(' ')[1]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                      {demo.accountCode}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Support Notice */}
        <div className="text-center mt-6">
          <a
            href="tel:3176750041"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#D4AF37] transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>(317) 675-0041 • info@hycoprop.com</span>
          </a>
          <p className="text-[11px] text-slate-400 mt-2">
            © 2027 HYCO Property Management • 7898 Zionsville Rd, Indianapolis, IN 46268
          </p>
        </div>
      </div>
    </div>
  );
};
