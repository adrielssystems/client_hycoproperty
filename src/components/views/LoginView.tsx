'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useTenantAuth } from '@/context/TenantAuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { login } = useTenantAuth();

  const [accountId, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountId.trim()) return;

    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      const success = login(accountId, password);
      if (!success) {
        setErrorMessage(
          language === 'en'
            ? 'Invalid credentials. Please verify your email or account code.'
            : 'Credenciales inválidas. Por favor verifique su correo o código de cuenta.'
        );
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-[#070D18]"
      suppressHydrationWarning
    >
      {/* Top Right Language Switcher Pill */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-full p-1 shadow-inner">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#070D18] shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage('es')}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
              language === 'es'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#070D18] shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            ES
          </button>
        </div>
      </div>

      {/* Dynamic Background Light Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#1A365D]/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[550px] h-[550px] rounded-full bg-[#D4AF37]/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#0F223D]/40 blur-[160px] pointer-events-none" />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[430px]"
      >
        {/* Main Card with V18 Glassmorphism */}
        <div className="glass-card rounded-[2rem] p-8 sm:p-10 border border-white/[0.09] shadow-2xl bg-[#0B1526]/90 backdrop-blur-3xl relative overflow-hidden">
          {/* Top subtle golden sheen line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80" />

          {/* Large prominent logo without extra box */}
          <div className="mb-6 flex flex-col items-center text-center w-full">
            <div className="relative w-full flex items-center justify-center py-2 px-1">
              <div className="absolute inset-0 bg-[#D4AF37]/15 blur-3xl rounded-full scale-110 pointer-events-none" />
              <img
                src="/hyco_brand_logo.png"
                alt="HYCO Property Management"
                className="relative z-10 w-full max-w-[320px] sm:max-w-[360px] h-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] hover:scale-[1.02] transition-all duration-300"
              />
            </div>
          </div>

          {/* Clean Executive Login Form */}
          <div className="w-full" suppressHydrationWarning>
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
              <div>
                <label className="block text-xs font-semibold text-white/70 tracking-wide mb-1.5">
                  {language === 'en' ? 'Email Address' : 'Correo Electrónico'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                    <Mail size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    value={accountId}
                    onChange={(e) => {
                      setAccountId(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder={language === 'en' ? 'tenant@domain.com' : 'inquilino@empresa.com'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#D4AF37] focus:bg-white/[0.07] text-white text-sm outline-none transition-all placeholder:text-white/30"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-white/70 tracking-wide">
                    {language === 'en' ? 'Password' : 'Contraseña'}
                  </label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(
                        language === 'en'
                          ? 'Please contact property management at (317) 675-0041 for password assistance.'
                          : 'Por favor contacte a administración al (317) 675-0041 para asistencia con su contraseña.'
                      );
                    }}
                    className="text-[11px] text-[#F3D270] hover:underline"
                  >
                    {language === 'en' ? 'Forgot password?' : '¿Olvidó su contraseña?'}
                  </a>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#D4AF37] focus:bg-white/[0.07] text-white text-sm outline-none transition-all placeholder:text-white/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#070D18] font-bold text-sm tracking-wide shadow-[0_10px_25px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isLoading ? (language === 'en' ? 'Signing in...' : 'Iniciando sesión...') : (language === 'en' ? 'Sign In' : 'Iniciar Sesión')}</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="text-center mt-6 text-xs text-white/40">
          <p>© 2027 HYCO Property Management</p>
        </div>
      </motion.div>
    </div>
  );
};
