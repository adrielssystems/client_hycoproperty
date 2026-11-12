'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTenantAuth, MaintenanceTicket } from '@/context/TenantAuthContext';
import {
  Wrench,
  Plus,
  Clock,
  CheckCircle2,
  Camera,
  User,
  Flame,
  Zap,
  Droplet,
  Lock,
  DoorOpen,
  ArrowRight,
} from 'lucide-react';

export const MaintenanceView: React.FC = () => {
  const { t } = useLanguage();
  const { tickets, createMaintenanceTicket } = useTenantAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState<MaintenanceTicket['category']>('Electrical');
  const [priority, setPriority] = useState<MaintenanceTicket['priority']>('MEDIUM');
  const [description, setDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      createMaintenanceTicket({
        category,
        priority,
        description,
        photoUrl: photoPreview || undefined,
      });

      setIsSubmitting(false);
      setIsModalOpen(false);
      setDescription('');
      setPhotoPreview(null);
    }, 700);
  };

  const getCategoryIcon = (cat: MaintenanceTicket['category']) => {
    switch (cat) {
      case 'Plumbing':
        return <Droplet className="w-4 h-4 text-blue-400" />;
      case 'Electrical':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'HVAC':
        return <Flame className="w-4 h-4 text-rose-400" />;
      case 'Common':
        return <DoorOpen className="w-4 h-4 text-emerald-400" />;
      case 'Access':
        return <Lock className="w-4 h-4 text-purple-400" />;
    }
  };

  const getPriorityBadge = (prio: MaintenanceTicket['priority']) => {
    switch (prio) {
      case 'EMERGENCY':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'MEDIUM':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'LOW':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t('maintenance.title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t('maintenance.subtitle')}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#070D18] font-bold text-xs tracking-wide shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{t('maintenance.new_ticket')}</span>
        </button>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket) => {
          const isResolved = ticket.status === 'RESOLVED';
          const isAssigned = ticket.status === 'ASSIGNED';
          const isInReview = ticket.status === 'IN_REVIEW';

          return (
            <div
              key={ticket.id}
              className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 hover:border-[#D4AF37]/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10">
                    {getCategoryIcon(ticket.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {ticket.ticketCode}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${getPriorityBadge(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {ticket.category} • {ticket.createdAt.slice(0, 10)}
                    </span>
                  </div>
                </div>

                {/* Technician Badge */}
                {ticket.assignedTechnician && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 w-fit">
                    <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white">
                        {ticket.assignedTechnician}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {ticket.contractorCompany}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/[0.06]">
                {ticket.description}
              </p>

              {/* 4-Step Visual Progress Tracker */}
              <div className="pt-2 border-t border-white/[0.08]">
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs font-bold">
                  {/* Step 1: Received */}
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-emerald-400">{t('maintenance.step_received')}</span>
                  </div>

                  {/* Step 2: In Review */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 border ${
                        isInReview || isAssigned || isResolved
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-white/[0.05] text-slate-500 border-white/10'
                      }`}
                    >
                      {isInReview || isAssigned || isResolved ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <span
                      className={
                        isInReview || isAssigned || isResolved
                          ? 'text-emerald-400'
                          : 'text-slate-500'
                      }
                    >
                      {t('maintenance.step_review')}
                    </span>
                  </div>

                  {/* Step 3: Assigned */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 border ${
                        isAssigned || isResolved
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-white/[0.05] text-slate-500 border-white/10'
                      }`}
                    >
                      {isAssigned || isResolved ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <span
                      className={
                        isAssigned || isResolved ? 'text-emerald-400' : 'text-slate-500'
                      }
                    >
                      {t('maintenance.step_assigned')}
                    </span>
                  </div>

                  {/* Step 4: Resolved */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 border ${
                        isResolved
                          ? 'bg-emerald-500 text-[#070D18] border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                          : 'bg-white/[0.05] text-slate-500 border-white/10'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className={isResolved ? 'text-emerald-400 font-extrabold' : 'text-slate-500'}>
                      {t('maintenance.step_resolved')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-card max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#D4AF37]" />
                <span>{t('maintenance.new_ticket')}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('maintenance.category')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['Plumbing', 'Electrical', 'HVAC', 'Common', 'Access'] as const).map(
                    (cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border text-left flex items-center gap-2 transition-all ${
                          category === cat
                            ? 'bg-[#0F1E36] border-[#D4AF37] text-white shadow-sm'
                            : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        {getCategoryIcon(cat)}
                        <span>{cat}</span>
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('maintenance.priority')}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['LOW', 'MEDIUM', 'HIGH', 'EMERGENCY'] as const).map((prio) => (
                    <button
                      key={prio}
                      type="button"
                      onClick={() => setPriority(prio)}
                      className={`py-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                        priority === prio
                          ? getPriorityBadge(prio) + ' shadow-sm'
                          : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {prio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('maintenance.description')}
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('maintenance.description_placeholder')}
                  className="w-full p-3 rounded-xl glass-input text-xs sm:text-sm resize-none"
                  required
                />
              </div>

              {/* Media Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('maintenance.media_upload')}
                </label>
                <label className="border-2 border-dashed border-white/15 hover:border-[#D4AF37]/50 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all bg-white/[0.02] hover:bg-white/[0.04]">
                  <Camera className="w-6 h-6 text-[#D4AF37] mb-1.5" />
                  <span className="text-xs text-slate-300 font-semibold text-center">
                    {photoPreview ? 'Change Photo / Video' : 'Tap to take photo or choose file'}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    {t('maintenance.media_upload_desc')}
                  </span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />
                </label>

                {photoPreview && (
                  <div className="mt-3 relative w-full h-32 rounded-xl overflow-hidden border border-white/20">
                    <img
                      src={photoPreview}
                      alt="Uploaded Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPhotoPreview(null)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-black/70 text-white text-xs"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-300 transition-all"
                >
                  {t('common.cancel')}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !description.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#070D18] font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Dispatching...</span>
                  ) : (
                    <>
                      <span>{t('maintenance.submit_ticket')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
