'use client';

import React from 'react';
import {
  Compass,
  Building,
  HardHat,
  Briefcase,
  Layers,
  Factory,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface WhoWeServeSectionProps {
  onOpenContact: () => void;
}

export default function WhoWeServeSection({ onOpenContact }: WhoWeServeSectionProps) {
  const personas = [
    {
      title: 'Architects',
      badge: 'Design & Approvals',
      description:
        'Deliver uncompromised design intent. Drop 3D pins directly on renders, eliminate site ambiguities, and secure client approvals effortlessly.',
      icon: Compass,
      points: ['3D Drawing Pin Annotations', 'Client Presentation Mode', 'Revision Versioning'],
    },
    {
      title: 'Interior Studios',
      badge: 'Turnkey Studios',
      description:
        'Manage high-net-worth client pipelines, real-time BOQ estimates, vendor procurement, and project handovers in one unified studio dashboard.',
      icon: Building,
      points: ['HNI CRM & Deal Pipeline', 'Live BOQ Scope Estimator', 'Real-time Escrow Tracking'],
    },
    {
      title: 'Construction Companies',
      badge: 'Site Execution',
      description:
        'Track multi-floor progress, monitor subcontractor daily logs, log GPS-verified attendance, and eliminate site delays.',
      icon: HardHat,
      points: ['Daily Inspection Photo Feed', 'Subcontractor Punch Lists', 'Material Stock Depletion'],
    },
    {
      title: 'Turnkey Contractors',
      badge: 'Milestone Delivery',
      description:
        'Streamline task assignment, track labor deployment, generate instantaneous payment certificates, and verify work order stages.',
      icon: Briefcase,
      points: ['Task & Stage Dependencies', 'Labor Burn Rate Tracking', 'Milestone Payment Invoices'],
    },
    {
      title: 'EPC Companies',
      badge: 'Cost & Procurement',
      description:
        'Execute large-scale architectural infrastructure projects with rigorous cost controls, multi-site RFQs, and predictive schedule analysis.',
      icon: Layers,
      points: ['Multi-site Procurement', 'Vendor Quote Comparison', 'Critical Path Method (CPM)'],
    },
    {
      title: 'Manufacturers & Millwork',
      badge: 'BOM & Production',
      description:
        'Bridge bespoke joinery and modular factory floors directly with site execution, automated BOM cut-lists, and delivery tracking.',
      icon: Factory,
      points: ['Auto-create BOMs from CAD', 'Stock Transfer Dispatch', 'Centralized Warehouse Binning'],
    },
  ];

  return (
    <section id="who-we-serve" className="py-20 bg-slate-50 dark:bg-[#0E1016] border-t border-slate-200 dark:border-[#1C212E] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold text-[#B58E50] dark:text-[#C9A46C] uppercase tracking-widest px-3 py-1 rounded-full bg-amber-50 dark:bg-[#C9A46C]/10 border border-amber-200 dark:border-[#C9A46C]/30">
            Who We Serve
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-luxury mt-3">
            Engineered for Every Stakeholder in Turnkey Interiors
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            From visionary architects to turnkey execution teams and bespoke joinery fabricators,
            Kov OS aligns every discipline to deliver flawless handovers.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona, idx) => {
            const Icon = persona.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-white dark:bg-[#141822] border border-slate-200 dark:border-[#232938] hover:border-slate-300 dark:hover:border-[#C9A46C]/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#1B212E] border border-slate-200 dark:border-[#2B3347] flex items-center justify-center text-[#B58E50] dark:text-[#C9A46C]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#C9A46C]/15 border border-slate-200 dark:border-[#C9A46C]/30 text-slate-700 dark:text-[#DFCAA5] uppercase tracking-wider">
                      {persona.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#B58E50] dark:group-hover:text-[#DFCAA5] transition-colors">
                    {persona.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {persona.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-[#1F2535] space-y-2">
                    {persona.points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#1F2535]">
                  <button
                    onClick={onOpenContact}
                    className="text-xs font-bold text-[#B58E50] dark:text-[#C9A46C] hover:underline flex items-center gap-1.5 transition-all"
                  >
                    <span>Request Custom Workflow</span>
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
