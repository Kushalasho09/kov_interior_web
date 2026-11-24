'use client';

import React, { useState } from 'react';
import { BoqItem } from '@/types';
import { supabase } from '@/lib/supabase';
import {
  FileSpreadsheet,
  IndianRupee,
  Plus,
  Minus,
  CheckCircle2,
  Printer,
  Filter,
} from 'lucide-react';

interface BoqModuleProps {
  items: BoqItem[];
  projectId?: string;
  onItemsUpdated: () => void;
}

export default function BoqModule({ items, projectId, onItemsUpdated }: BoqModuleProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Adjust quantity
  const handleUpdateQuantity = async (item: BoqItem, delta: number) => {
    const newQty = Math.max(1, Number(item.quantity) + delta);
    setUpdatingId(item.id);

    const { error } = await supabase
      .from('boq_items')
      .update({ quantity: newQty })
      .eq('id', item.id);

    setUpdatingId(null);
    if (!error) {
      onItemsUpdated();
    }
  };

  const categories = ['all', ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const subtotal = filteredItems.reduce(
    (acc, curr) => acc + (Number(curr.quantity) * Number(curr.rate) || 0),
    0
  );
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="space-y-6">
      {/* 1. HEADER SUMMARY - STRICT PIXEL-PERFECT ALIGNMENT (HIDDEN IN PRINT) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#262C3A] shadow-sm dark:shadow-md print:hidden transition-colors">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-luxury text-xl font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
              BOQ & Bill of Quantities Scope
            </h2>
            <span className="h-7 px-3 rounded-full text-xs font-bold bg-[#C9A46C]/15 text-[#8F7049] dark:text-[#DFCAA5] border border-[#C9A46C]/30 inline-flex items-center justify-center whitespace-nowrap shrink-0">
              Interactive Estimator
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Turnkey architectural specifications for The Sky Villa. Modify quantities in real time to instantly recompute contract pricing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category filter */}
          <div className="h-9 flex items-center gap-2 bg-slate-100 dark:bg-[#191D27] border border-slate-200 dark:border-[#262C3A] rounded-xl px-3.5 text-xs text-slate-700 dark:text-slate-300">
            <Filter className="w-3.5 h-3.5 text-[#B58E50] dark:text-[#C9A46C] shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-xs text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer whitespace-nowrap"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Scope Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => window.print()}
            className="h-9 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#191D27] dark:hover:bg-[#202636] border border-slate-200 dark:border-[#2B3347] text-xs font-bold text-slate-800 dark:text-slate-200 inline-flex items-center gap-2 transition-colors whitespace-nowrap shadow-sm dark:shadow-none"
          >
            <Printer className="w-4 h-4 text-[#B58E50] dark:text-[#C9A46C]" />
            <span>Export Formal Quotation</span>
          </button>
        </div>
      </div>

      {/* FORMAL PRINT ONLY: KOV INTERIORS ARCHITECTURAL LETTERHEAD */}
      <div className="hidden print:block mb-5 pb-4 border-b-2 border-[#C9A46C]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg border border-[#C9A46C]/60 p-1 flex items-center justify-center">
              <img src="/assets/logo.png" alt="KOV INTERIOR" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-luxury text-2xl font-bold tracking-wider text-slate-900 uppercase">
                KOV INTERIOR
              </h1>
              <p className="text-[10px] text-[#8F7049] font-bold tracking-widest uppercase">
                Architecture & Turnkey Interior Studio
              </p>
              <p className="text-[10px] text-slate-600 mt-0.5">
                Prahlad Nagar, SG Highway, Ahmedabad - 380015 • Gujarat • kovinterior.in
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded bg-[#F1E5D3] text-[#8F7049] font-bold text-xs uppercase tracking-wider mb-1">
              Official BOQ Quotation
            </span>
            <p className="font-mono text-xs text-slate-800 font-bold">REF: #KOV/BOQ/2026-084</p>
            <p className="text-[10px] text-slate-600">Date: 23 Nov 2026</p>
          </div>
        </div>

        {/* Client & Residence Meta Card */}
        <div className="grid grid-cols-2 gap-4 mt-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Client & Project</span>
            <p className="font-bold text-slate-900 mt-0.5">Rajeshbhai Patel & Family</p>
            <p className="text-slate-700">The Sky Villa • 4BHK Luxury Residence</p>
            <p className="text-slate-500 text-[10px]">Shivalik Residences, Prahlad Nagar, Ahmedabad</p>
          </div>
          <div className="text-right">
            <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Supervising Studio</span>
            <p className="font-bold text-slate-900 mt-0.5">Kov Interiors Design Studio</p>
            <p className="text-slate-700">Principal Architect & Turnkey PM Team</p>
            <p className="text-slate-500 text-[10px]">GSTIN: 24AAACK9821M1ZX</p>
          </div>
        </div>
      </div>

      {/* 2. BOQ ITEMS TABLE - PIXEL PERFECT COLUMNS WITH GENEROUS PADDING */}
      <div className="rounded-2xl bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#262C3A] overflow-hidden shadow-sm dark:shadow-xl transition-colors print:border print:border-slate-300 print:bg-white print:shadow-none print:rounded-lg">
        <div className="overflow-x-auto print:overflow-visible">
          <table className="w-full text-left text-xs border-collapse boq-print-table">
            <thead className="bg-slate-100 dark:bg-[#101217] border-b border-slate-200 dark:border-[#232938] text-slate-600 dark:text-slate-400 uppercase tracking-widest text-[10px] font-bold print:bg-slate-100 print:text-slate-900 print:border-b-2 print:border-slate-900">
              <tr>
                <th className="py-4 px-6 text-left min-w-[280px] print:min-w-0 print:w-[40%] print:py-2.5 print:px-3 print:text-slate-900">Specification & Scope</th>
                <th className="py-4 px-4 text-center w-24 print:w-[10%] print:py-2.5 print:px-2 print:text-slate-900">Unit</th>
                <th className="py-4 px-4 text-center w-40 print:w-[14%] print:py-2.5 print:px-2 print:text-slate-900">Quantity</th>
                <th className="py-4 px-5 text-right w-36 print:w-[18%] print:py-2.5 print:px-3 print:text-slate-900">Standard Rate</th>
                <th className="py-4 px-5 text-right w-40 print:w-[18%] print:py-2.5 print:px-3 print:text-slate-900">Calculated Total</th>
                <th className="py-4 px-6 text-center w-48 print:hidden">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-[#202636] print:divide-slate-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-[#1A1F2C] transition-colors print:hover:bg-transparent">
                  <td className="py-4 px-6 space-y-1 print:py-2.5 print:px-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#8F7049] dark:text-[#C9A46C] uppercase tracking-wider bg-slate-100 dark:bg-[#101217] px-2.5 py-0.5 rounded border border-slate-200 dark:border-[#C9A46C]/30 inline-block print:text-slate-800 print:bg-slate-100 print:border-slate-300">
                        {item.category}
                      </span>
                      {item.status === 'approved' && (
                        <span className="hidden print:inline-block text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-300">
                          ✓ Client Approved
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-100 print:text-slate-900 print:text-xs">{item.item_name}</p>
                    {item.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md print:text-[10px] print:text-slate-600 print:max-w-none">{item.description}</p>
                    )}
                  </td>

                  <td className="py-4 px-4 text-slate-600 dark:text-slate-300 font-mono text-xs text-center print:py-2.5 print:px-2 print:text-slate-800">
                    {item.unit}
                  </td>

                  <td className="py-4 px-4 print:py-2.5 print:px-2 text-center">
                    {/* Web Interactive Buttons */}
                    <div className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-[#12151E] p-1 rounded-xl border border-slate-200 dark:border-[#242C3D] w-32 mx-auto print:hidden">
                      <button
                        onClick={() => handleUpdateQuantity(item, -10)}
                        disabled={updatingId === item.id || Number(item.quantity) <= 1}
                        className="p-1.5 rounded-lg bg-white dark:bg-[#1E2330] hover:bg-slate-200 dark:hover:bg-[#283247] text-slate-700 dark:text-slate-300 disabled:opacity-30 inline-flex items-center justify-center border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-xs w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item, 10)}
                        disabled={updatingId === item.id}
                        className="p-1.5 rounded-lg bg-white dark:bg-[#1E2330] hover:bg-slate-200 dark:hover:bg-[#283247] text-[#8F7049] dark:text-[#C9A46C] disabled:opacity-30 inline-flex items-center justify-center border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {/* Print Clean Formatted Quantity */}
                    <span className="hidden print:inline-block font-mono font-bold text-slate-900 text-xs">
                      {item.quantity}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right font-mono text-xs text-slate-600 dark:text-slate-300 print:py-2.5 print:px-3 print:text-slate-800">
                    ₹{Number(item.rate).toLocaleString('en-IN')}
                  </td>

                  <td className="py-4 px-5 text-right font-mono font-bold text-sm text-[#8F7049] dark:text-[#DFCAA5] print:py-2.5 print:px-3 print:text-slate-900 print:text-xs">
                    ₹{(Number(item.quantity) * Number(item.rate)).toLocaleString('en-IN')}
                  </td>

                  <td className="py-4 px-6 text-center print:hidden">
                    <span
                      className={`h-7 px-3.5 rounded-full text-xs font-bold inline-flex items-center justify-center whitespace-nowrap shadow-sm ${
                        item.status === 'approved'
                          ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60'
                          : 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/60'
                      }`}
                    >
                      {item.status === 'approved' ? 'Client Approved' : 'Draft Estimate'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pricing Summary Footer */}
        <div className="p-6 bg-slate-50 dark:bg-[#101217] border-t border-slate-200 dark:border-[#232938] flex flex-col sm:flex-row items-center justify-between gap-6 print:bg-white print:border-t-2 print:border-slate-800 print:p-4 transition-colors">
          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 print:text-slate-600">
            <p className="font-bold text-slate-800 dark:text-slate-200 print:text-slate-900">
              Kov Interiors Turnkey Execution Guarantee • Prahlad Nagar Studio
            </p>
            <p className="text-slate-500 dark:text-slate-500 print:text-slate-600 text-[10px]">
              Showing {filteredItems.length} line items. Rates include architectural supervision, material freight, and artisan joinery.
            </p>
          </div>

          <div className="w-full sm:w-80 space-y-2 text-xs text-slate-600 dark:text-slate-300 p-4 rounded-xl bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#262C3A] shadow-sm dark:shadow-none print:bg-slate-50 print:border print:border-slate-300 print:text-slate-900 transition-colors">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400 print:text-slate-600">Subtotal Scope:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-200 print:text-slate-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400 print:text-slate-600">
              <span>GST (18% Architecture & Civil):</span>
              <span className="font-mono text-slate-900 dark:text-slate-200 print:text-slate-900">{formatCurrency(gst)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-[#232938] print:border-slate-400 text-base font-bold text-slate-900 dark:text-slate-100 print:text-slate-900">
              <span>Grand Total:</span>
              <span className="font-mono text-[#8F7049] dark:text-[#DFCAA5] print:text-slate-900">{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* FORMAL PRINT ONLY: SIGNATURES & VALIDATION BLOCK */}
      <div className="hidden print:block mt-8 pt-6 border-t border-slate-300">
        <div className="grid grid-cols-2 gap-12 text-xs">
          <div>
            <p className="text-slate-500 mb-12">Authorized Architect (Kov Interiors):</p>
            <div className="border-b border-slate-700 w-52 mb-1"></div>
            <p className="font-bold text-slate-900">Lead Architectural Designer</p>
            <p className="text-[10px] text-slate-500">Kov Interiors Studio • Ahmedabad</p>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="text-slate-500 mb-12">Client Sign-off & Acceptance:</p>
            <div className="border-b border-slate-700 w-52 mb-1"></div>
            <p className="font-bold text-slate-900">Rajeshbhai Patel</p>
            <p className="text-[10px] text-slate-500">The Sky Villa • Prahlad Nagar</p>
          </div>
        </div>
        <p className="text-[8.5pt] text-center text-slate-400 mt-6 italic">
          This document is generated by Kov Interiors OS (kovinterior.in). All specifications are valid for 30 days from date of issue.
        </p>
      </div>
    </div>
  );
}
