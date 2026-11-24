'use client';

import React from 'react';
import { Lock, Sparkles, CheckCircle2, X, ArrowRight } from 'lucide-react';

export interface LockedFeatureInfo {
  title: string;
  category: string;
  description: string;
  requiredTier: 'Pro' | 'Enterprise';
  highlights: string[];
}

interface LockedFeatureModalProps {
  feature: LockedFeatureInfo | null;
  onClose: () => void;
  onRequestUpgrade: (featureName: string) => void;
}

export default function LockedFeatureModal({
  feature,
  onClose,
  onRequestUpgrade,
}: LockedFeatureModalProps) {
  if (!feature) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#12151D] border border-slate-200 dark:border-[#C9A46C]/40 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-900 dark:text-white transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-[#191D28] hover:bg-slate-200 dark:hover:bg-[#222736] border border-slate-200 dark:border-[#2A3144] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#C9A46C]/15 border border-slate-200 dark:border-[#C9A46C]/35 text-slate-700 dark:text-[#DFCAA5] text-xs font-semibold uppercase tracking-wider mb-4">
          <Lock className="w-3.5 h-3.5 text-[#B58E50] dark:text-[#C9A46C]" />
          <span>{feature.requiredTier} Plan Feature</span>
        </div>

        {/* Feature Title & Category */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            {feature.category}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold font-luxury mt-1 text-slate-900 dark:text-white">
            {feature.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Highlights */}
        <div className="my-5 p-4 rounded-xl bg-slate-50 dark:bg-[#171B24] border border-slate-200 dark:border-[#252C3D] space-y-2.5">
          <p className="text-[11px] font-bold text-[#B58E50] dark:text-[#C9A46C] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Capabilities Included
          </p>
          {feature.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
          <button
            onClick={() => onRequestUpgrade(feature.title)}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#0F172A] hover:bg-slate-800 dark:bg-gradient-to-r dark:from-[#C9A46C] dark:to-[#B59058] dark:hover:from-[#D4B27C] dark:hover:to-[#C9A46C] text-white dark:text-[#0D0F13] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <span>Talk to Sales &amp; Upgrade</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#171B24] dark:hover:bg-[#202532] text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-[#272E3F] text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-4">
          All 10 Core Execution Modules are active and unlocked in your Kov Studio preview.
        </p>
      </div>
    </div>
  );
}
