'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTenantAuth, PaymentReceipt } from '@/context/TenantAuthContext';
import {
  CreditCard,
  Building,
  CheckCircle2,
  Clock,
  Download,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  FileText,
  Printer,
} from 'lucide-react';

export const BillingView: React.FC = () => {
  const { t } = useLanguage();
  const { tenant, invoices, processPayment } = useTenantAuth();

  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'ACH' | 'CARD'>('ACH');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentReceipt | null>(null);

  // Pending invoice
  const pendingInvoice = invoices.find((inv) => inv.status === 'PENDING' || inv.status === 'OVERDUE');

  const handlePay = () => {
    if (!pendingInvoice) return;
    setIsProcessing(true);

    setTimeout(() => {
      const receipt = processPayment(pendingInvoice.invoiceNumber, selectedMethod);
      setIsProcessing(false);
      setIsPayModalOpen(false);
      setSelectedReceipt(receipt);
    }, 1200);
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t('billing.title')}
          </h2>
        </div>
      </div>

      {/* Ledger Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Outstanding Balance */}
        <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {t('billing.total_due')}
            </span>
            <span
              className={`p-2 rounded-xl ${
                tenant && tenant.balance > 0
                  ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                  : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              <DollarSign className="w-4 h-4" />
            </span>
          </div>

          <div className="text-3xl font-extrabold text-white tracking-tight mb-2">
            ${tenant?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>

          {tenant && tenant.balance > 0 ? (
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-rose-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Due: {tenant.nextDueDate}
              </span>
              <button
                onClick={() => setIsPayModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#070D18] font-bold text-xs tracking-wide shadow-md hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <span>{t('overview.pay_now')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('overview.balance_paid')}</span>
            </div>
          )}
        </div>

        {/* Contract Monthly Rent */}
        <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {t('billing.monthly_rent')}
            </span>
            <span className="p-2 rounded-xl bg-white/[0.05] text-[#D4AF37]">
              <Building className="w-4 h-4" />
            </span>
          </div>

          <div className="text-3xl font-extrabold text-white tracking-tight mb-2">
            ${tenant?.monthlyRent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>

          <p className="text-xs text-slate-400 mt-4">
            Includes base lease for {tenant?.suiteNumber} ({tenant?.areaSqft.toLocaleString()} sqft)
          </p>
        </div>

        {/* CAM & Services */}
        <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {t('billing.cam_fees')}
            </span>
            <span className="p-2 rounded-xl bg-white/[0.05] text-blue-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>

          <div className="text-3xl font-extrabold text-white tracking-tight mb-2">
            ${tenant?.camFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>

          <p className="text-xs text-slate-400 mt-4">
            Snow clearing, exterior lighting, parking maintenance & 24/7 security
          </p>
        </div>
      </div>

      {/* Invoice History Table */}
      <div className="glass-card rounded-3xl p-5 sm:p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <span>{t('billing.invoices_history')}</span>
          </h3>
          <span className="text-xs text-slate-400">
            Account: {tenant?.accountCode}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-semibold">Invoice #</th>
                <th className="pb-3 font-semibold">QBO Ref</th>
                <th className="pb-3 font-semibold">Due Date</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 font-bold text-white">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 font-mono text-slate-400">
                    {inv.qboInvoiceId}
                  </td>
                  <td className="py-3.5 text-slate-300">
                    {inv.dueDate}
                  </td>
                  <td className="py-3.5 font-bold text-white">
                    ${inv.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        inv.status === 'PAID'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : inv.status === 'PENDING'
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          inv.status === 'PAID'
                            ? 'bg-emerald-400'
                            : inv.status === 'PENDING'
                            ? 'bg-amber-400'
                            : 'bg-rose-400'
                        }`}
                      />
                      {inv.status === 'PAID'
                        ? t('billing.status_paid')
                        : inv.status === 'PENDING'
                        ? t('billing.status_pending')
                        : t('billing.status_overdue')}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    {inv.status === 'PAID' && inv.receiptNumber ? (
                      <button
                        onClick={() =>
                          setSelectedReceipt({
                            receiptNumber: inv.receiptNumber || 'REC-10492',
                            invoiceNumber: inv.invoiceNumber,
                            tenantName: tenant?.contactName || 'Tenant',
                            companyName: tenant?.companyName || 'HYCO Tenant',
                            suiteReference: `${tenant?.suiteNumber} — ${tenant?.propertyName}`,
                            amount: inv.amount,
                            paymentMethod: inv.paymentMethod || 'ACH Direct Transfer',
                            timestamp: inv.paidAt || new Date().toISOString(),
                            qboSyncStatus: 'SYNCHRONIZED',
                            authorizationCode: 'AUTH-QBO-882194',
                          })
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all text-[11px] font-medium"
                      >
                        <Download className="w-3 h-3 text-[#D4AF37]" />
                        <span>{inv.receiptNumber}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsPayModalOpen(true)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] hover:bg-[#D4AF37]/25 border border-[#D4AF37]/30 transition-all text-[11px] font-bold"
                      >
                        {t('overview.pay_now')}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pay Rent Modal */}
      {isPayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card max-w-md w-full p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                <span>{t('billing.process_payment')}</span>
              </h3>
              <button
                onClick={() => setIsPayModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Amount Summary */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-5 text-center">
              <span className="text-xs text-slate-400 block mb-1">
                {t('billing.total_due')} ({pendingInvoice?.invoiceNumber})
              </span>
              <div className="text-3xl font-extrabold text-[#D4AF37]">
                ${pendingInvoice?.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {tenant?.companyName} • {tenant?.suiteNumber}
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 mb-6">
              <label className="block text-xs font-semibold text-slate-300">
                {t('billing.payment_method')}
              </label>

              <button
                type="button"
                onClick={() => setSelectedMethod('ACH')}
                className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                  selectedMethod === 'ACH'
                    ? 'bg-[#0F1E36] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {t('billing.pay_ach')}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Direct account transfer • Chase / PNC / Fifth Third Bank
                    </span>
                  </div>
                </div>
                {selectedMethod === 'ACH' && (
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('CARD')}
                className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                  selectedMethod === 'CARD'
                    ? 'bg-[#0F1E36] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/15 text-blue-400">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {t('billing.pay_card')}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Corporate Visa, Mastercard or American Express
                    </span>
                  </div>
                </div>
                {selectedMethod === 'CARD' && (
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                )}
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPayModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-300 transition-all"
              >
                {t('common.cancel')}
              </button>

              <button
                onClick={handlePay}
                disabled={isProcessing}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#070D18] text-xs font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Syncing with QBO...</span>
                ) : (
                  <>
                    <span>Confirm & Pay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-card max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/40 shadow-[0_0_50px_rgba(212,175,55,0.2)] relative bg-[#0B1526]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src="/hyco_brand_logo.png"
                  alt="HYCO"
                  className="h-10 w-auto object-contain"
                />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Official Payment Receipt
                  </h4>
                  <span className="text-[10px] text-[#D4AF37] font-mono">
                    {selectedReceipt.receiptNumber}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Receipt Details */}
            <div className="space-y-3 text-xs mb-6 font-mono">
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-slate-400">Date & Timestamp:</span>
                <span className="text-white">{selectedReceipt.timestamp.slice(0, 19).replace('T', ' ')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-slate-400">Tenant Account:</span>
                <span className="text-white font-bold">{selectedReceipt.companyName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-slate-400">Lease Reference:</span>
                <span className="text-white">{selectedReceipt.suiteReference}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-slate-400">Invoice Settled:</span>
                <span className="text-white">{selectedReceipt.invoiceNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-slate-400">Payment Channel:</span>
                <span className="text-white">{selectedReceipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-slate-400">Authorization Code:</span>
                <span className="text-emerald-400 font-bold">{selectedReceipt.authorizationCode}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-white/20 text-sm font-bold">
                <span className="text-white">Amount Paid (USD):</span>
                <span className="text-[#D4AF37]">
                  ${selectedReceipt.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* QuickBooks Online Confirmation Stamp */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 mb-6">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-[11px] text-emerald-300">
                <span className="font-bold block">QuickBooks Online Reconciled</span>
                <span>Payment entity created and balance updated to $0.00.</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={printReceipt}
                className="flex-1 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-300 transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-[#D4AF37]" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={() => setSelectedReceipt(null)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#070D18] font-bold text-xs"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
