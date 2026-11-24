'use client';

import React from 'react';
import {
  Users,
  Palette,
  FileSpreadsheet,
  Camera,
  IndianRupee,
  Boxes,
  FileCheck2,
  CalendarRange,
  HardHat,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { ActiveTab } from '../Sidebar';
import { LockedFeatureInfo } from './LockedFeatureModal';

interface FeaturesGridSectionProps {
  onSelectActiveFeature: (tabId: ActiveTab) => void;
  onSelectLockedFeature: (feature: LockedFeatureInfo) => void;
}

export default function FeaturesGridSection({
  onSelectActiveFeature,
  onSelectLockedFeature,
}: FeaturesGridSectionProps) {
  const modules: {
    id: ActiveTab;
    title: string;
    category: string;
    desc: string;
    icon: React.ElementType;
    metrics: string;
    features: string[];
  }[] = [
    {
      id: 'crm',
      title: 'CRM & Deal Pipeline',
      category: 'Client Acquisition',
      desc: 'Visualize HNI inquiries across 5 stages from initial recce to won commission. Instant WhatsApp contact actions.',
      icon: Users,
      metrics: '4 Active Deals • ₹1.85 Cr Pipeline',
      features: ['Stage-by-stage Kanban', 'Direct WhatsApp & Phone CTA', 'Property Type Tagging'],
    },
    {
      id: 'design',
      title: 'Design Management & 3D Pins',
      category: 'Architectural Spec',
      desc: 'Drop precision coordinate pins directly on high-res renders and drawings with material specifications.',
      icon: Palette,
      metrics: '4 Approved Specifications',
      features: ['Sub-millimeter Coordinate Pins', 'Architect Sign-off Workflow', 'Multi-room Selection'],
    },
    {
      id: 'boq',
      title: 'BOQ & Scope Estimator',
      category: 'Cost Engineering',
      desc: 'Category-wise itemized budget breakdowns with live progress percentages, tax calculations, and exportable invoices.',
      icon: FileSpreadsheet,
      metrics: '₹48.5L Scope • 100% Tax Compliant',
      features: ['Granular Unit Rates', 'Live Completion Sliders', 'Print-Ready Architectural Invoicing'],
    },
    {
      id: 'site_tracking',
      title: 'Site Photo Feed & Logs',
      category: 'Field Verification',
      desc: 'Real-time site progress photos synced between field site engineers and studio architects without photo loss.',
      icon: Camera,
      metrics: 'Daily Live Photo Stream',
      features: ['Tagged Room Categories', 'Timestamped Field Reports', 'Zero WhatsApp Loss'],
    },
    {
      id: 'finance',
      title: 'Financial Milestones & Escrow',
      category: 'Treasury & Escrow',
      desc: 'Tie client payments strictly to verified site completion percentages. Complete ledger transparency.',
      icon: IndianRupee,
      metrics: '₹72L Escrow Released',
      features: ['Milestone Completion Gates', 'Digital Payment Receipts', 'Cashflow Projection'],
    },
    {
      id: 'inventory',
      title: 'Warehouse & Materials',
      category: 'Material Logistics',
      desc: 'Track live stock quantities, unit measurements, minimum reorder thresholds, and depletion rates.',
      icon: Boxes,
      metrics: '8 Active Material Batches',
      features: ['Automated Low-Stock Alerts', 'Unit Tracking (Sq.Ft / Bags / Pcs)', 'Batch Reconciliation'],
    },
    {
      id: 'handover',
      title: 'Site Handover & E-Signing',
      category: 'Quality Sign-off',
      desc: 'Formal 10-point turnkey handover checklist with digital client signatures and defect liability periods.',
      icon: FileCheck2,
      metrics: '10 Handover Quality Gates',
      features: ['Digital Signature Capture', 'Defect Punch List Tracking', 'Turnkey Warranty Issuance'],
    },
    {
      id: 'project_mgmt',
      title: 'Project Schedule & Gantt',
      category: 'Timeline Control',
      desc: 'Sequence architectural phases from Demolition & Masonry to Final Joinery and Polishing without slips.',
      icon: CalendarRange,
      metrics: '7 Structured Phases',
      features: ['Critical Path Dependencies', 'Phase Status Verification', 'Contractor Deadlines'],
    },
    {
      id: 'hrms',
      title: 'HRMS & Site Labor Muster Roll',
      category: 'Workforce Ops',
      desc: 'Daily skilled and unskilled labor muster roll, trade allocation (Carpenters, Polishers, Electricians), and daily burn rate.',
      icon: HardHat,
      metrics: '18 On-Site Workers Daily',
      features: ['Daily Burn Rate Ledger', 'Trade Breakdown Allocations', 'Overtime Tracking'],
    },
    {
      id: 'ai',
      title: 'AI WhatsApp Client Brief',
      category: 'Intelligence Suite',
      desc: 'Generates concise, executive WhatsApp-ready project summaries for HNIs with one-click direct dispatch.',
      icon: Sparkles,
      metrics: 'Zero-Effort Client Alignment',
      features: ['Automated Progress Synthesis', 'Milestone Status Alerts', 'One-Click WhatsApp Dispatch'],
    },
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-[#0D0F13] border-t border-slate-200 dark:border-[#1F2536] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold text-[#B58E50] dark:text-[#C9A46C] uppercase tracking-widest px-3 py-1 rounded-full bg-amber-50 dark:bg-[#C9A46C]/10 border border-amber-200 dark:border-[#C9A46C]/30">
            Core Operating System
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-luxury mt-3">
            Every Step of Turnkey Execution, Mastered
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Eliminate fragmented WhatsApp chats, lost spreadsheets, and manual site logs.
            Each module is synchronized live with the Kov Mobile Field App.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className="group p-6 rounded-2xl bg-slate-50 dark:bg-[#13161F] border border-slate-200 dark:border-[#202636] hover:border-slate-300 dark:hover:border-[#C9A46C]/60 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#191E2A] border border-slate-200 dark:border-[#2B3346] flex items-center justify-center text-[#B58E50] dark:text-[#C9A46C]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Live Sync
                    </span>
                  </div>

                  <p className="text-[10px] font-bold text-[#B58E50] dark:text-[#C9A46C] uppercase tracking-wider">
                    {m.category}
                  </p>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#B58E50] dark:group-hover:text-[#DFCAA5] transition-colors mt-0.5">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {m.desc}
                  </p>

                  <div className="mt-4 p-2.5 rounded-xl bg-white dark:bg-[#0D0F14] border border-slate-200 dark:border-[#1E2330] text-[11px] font-mono text-slate-700 dark:text-[#DFCAA5]">
                    {m.metrics}
                  </div>

                  <div className="mt-4 space-y-1.5">
                    {m.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#1C212E]">
                  <button
                    onClick={() => onSelectActiveFeature(m.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-[#0F172A] hover:text-white dark:bg-[#1A202D] dark:hover:bg-[#C9A46C] text-slate-800 dark:text-slate-200 dark:hover:text-[#0D0F13] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Launch in Studio OS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
