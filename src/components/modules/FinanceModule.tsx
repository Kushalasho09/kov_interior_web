'use client';

import React, { useState } from 'react';
import { MilestonePayment } from '@/types';
import { supabase } from '@/lib/supabase';
import {
  IndianRupee,
  CheckCircle2,
  Clock,
  Send,
  Building,
} from 'lucide-react';

interface FinanceModuleProps {
  milestones: MilestonePayment[];
  onMilestonesUpdated: () => void;
}

export default function FinanceModule({
  milestones,
  onMilestonesUpdated,
}: FinanceModuleProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const totalAmount = milestones.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const paidAmount = milestones
    .filter((m) => m.status === 'paid')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const pendingAmount = totalAmount - paidAmount;

  const handleUpdateStatus = async (id: string, newStatus: MilestonePayment['status']) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from('milestone_payments')
      .update({ status: newStatus })
      .eq('id', id);

    setUpdatingId(null);
    if (!error) {
      onMilestonesUpdated();
    }
  };

  const formatCurrency = (amt: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#151821] border border-[#262C3A] shadow-md">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-luxury text-xl font-bold text-slate-100">
              Financial Milestones & Payment Ledger
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C9A46C]/15 text-[#DFCAA5] border border-[#C9A46C]/30">
              Kov Escrow
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Stage-wise payment schedule tied to physical project handover milestones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Escrow Bank:</span>
          <span className="px-3.5 py-1.5 rounded-xl bg-[#191D27] border border-[#262C3A] text-xs font-bold text-[#F1E5D3]">
            HDFC Bank • Kov Interiors Current A/C
          </span>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#151821] border border-[#262C3A] shadow-md">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">TOTAL CONTRACT VALUE</span>
          <p className="font-luxury text-2xl font-bold text-slate-100 mt-2">{formatCurrency(totalAmount)}</p>
          <p className="text-xs text-slate-500 mt-1">100% Agreed Turnkey Scope</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#151821] border border-emerald-900/40 bg-emerald-950/10 shadow-md">
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">COLLECTED TO DATE</span>
          <p className="font-luxury text-2xl font-bold text-emerald-400 mt-2">{formatCurrency(paidAmount)}</p>
          <p className="text-xs text-slate-400 mt-1">
            {totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0}% Realized via Invoices
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#151821] border border-amber-900/40 bg-amber-950/10 shadow-md">
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">PENDING RECEIVABLES</span>
          <p className="font-luxury text-2xl font-bold text-amber-400 mt-2">{formatCurrency(pendingAmount)}</p>
          <p className="text-xs text-slate-400 mt-1">
            {totalAmount > 0 ? Math.round((pendingAmount / totalAmount) * 100) : 0}% Balance Milestones
          </p>
        </div>
      </div>

      {/* Milestone Stages List */}
      <div className="space-y-3.5">
        {milestones.map((m, index) => {
          const isPaid = m.status === 'paid';
          const isRequested = m.status === 'requested';

          return (
            <div
              key={m.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isPaid
                  ? 'bg-[#151A24] border-emerald-900/40 shadow-sm'
                  : isRequested
                  ? 'bg-[#1A1C24] border-[#C9A46C]/50 shadow-md'
                  : 'bg-[#151821] border-[#262C3A]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 ${
                    isPaid
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                      : isRequested
                      ? 'bg-[#C9A46C]/20 text-[#DFCAA5] border border-[#C9A46C]/50'
                      : 'bg-[#1E2330] text-slate-400 border border-[#283042]'
                  }`}
                >
                  {index + 1}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-bold text-sm text-slate-100">{m.title}</h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#101217] text-[#C9A46C] border border-[#C9A46C]/30">
                      {m.percentage}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-2">
                    <span>Invoice: {m.invoice_number}</span>
                    <span>&bull;</span>
                    <span>Due: {m.due_date || 'Post Sign-off'}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-[#222736]">
                <div className="text-right">
                  <span className="font-luxury text-base font-bold text-slate-100 font-mono">
                    {formatCurrency(Number(m.amount))}
                  </span>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isPaid
                          ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/40'
                          : isRequested
                          ? 'bg-amber-950/70 text-amber-400 border border-amber-800/40'
                          : 'bg-[#1E2330] text-slate-400'
                      }`}
                    >
                      {isPaid ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Paid & Verified
                        </>
                      ) : isRequested ? (
                        <>
                          <Clock className="w-3.5 h-3.5" /> Payment Requested
                        </>
                      ) : (
                        'Upcoming'
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!isPaid && (
                    <>
                      {isRequested ? (
                        <button
                          onClick={() => handleUpdateStatus(m.id, 'paid')}
                          disabled={updatingId === m.id}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Mark as Paid
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateStatus(m.id, 'requested')}
                          disabled={updatingId === m.id}
                          className="px-4 py-2 rounded-xl bg-[#C9A46C] hover:bg-[#B59058] text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Request Payment
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
