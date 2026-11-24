'use client';

import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  TrendingUp,
  AlertTriangle,
  Users2,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
  onExploreOs: () => void;
  onOpenLogin: () => void;
}

export default function HeroSection({
  onOpenContact,
  onExploreOs,
  onOpenLogin,
}: HeroSectionProps) {
  return (
    <section id="hero" className="relative pt-12 pb-20 bg-white dark:bg-[#0D0F13] text-slate-900 dark:text-white transition-colors overflow-hidden">
      {/* Calm ambient background wash */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-50 dark:bg-[#C9A46C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Clear Text on Calm Space */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Quiet Category Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#181D29] border border-slate-200 dark:border-[#C9A46C]/30 text-slate-800 dark:text-[#DFCAA5] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#B58E50] dark:text-[#C9A46C]" />
              <span>Studio OS for Interior &amp; Turnkey Execution</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white font-luxury leading-[1.15]">
              AI Native Software to Manage Luxury Interiors from{' '}
              <span className="text-[#B58E50] dark:text-[#DFCAA5]">Concept to Handover</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              The unified studio operating system engineered for elite architecture and turnkey execution teams.
              Plan schedules, verify 3D drawing pins, track site progress, and manage BOQ escrow with precision.
            </p>

            {/* Action CTAs: One primary, one secondary */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenContact}
                className="py-3 px-6 rounded-xl bg-[#0F172A] hover:bg-slate-800 dark:bg-gradient-to-r dark:from-[#C9A46C] dark:to-[#B59058] dark:hover:from-[#D4B27C] dark:hover:to-[#C9A46C] text-white dark:text-[#0D0F13] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreOs}
                className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#161A24] dark:hover:bg-[#1E2434] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#2B3245] font-semibold text-xs flex items-center gap-2 transition-all"
              >
                <Play className="w-3.5 h-3.5 text-[#B58E50] dark:text-[#C9A46C] fill-current" />
                <span>Explore Studio OS</span>
              </button>
            </div>

            {/* Credibility Figures */}
            <div className="pt-6 border-t border-slate-100 dark:border-[#1F2535] grid grid-cols-3 gap-4">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-luxury">
                  5,000+
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Projects Managed</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#B58E50] dark:text-[#C9A46C] font-luxury">
                  ₹18.4L
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Avg Waste Saved</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-luxury">
                  99.4%
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">On-time Handover</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Craft Real Architectural Product Preview */}
          <div className="lg:col-span-6 relative">
            {/* Desktop Browser Frame */}
            <div className="relative rounded-2xl bg-white dark:bg-[#11141C] border border-slate-200 dark:border-[#2B3347] shadow-xl overflow-hidden">
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-[#161922] border-b border-slate-200 dark:border-[#202534] text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                  <span className="ml-2 font-mono text-[10px]">kov-studio-os.cloud</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Supabase Live Sync</span>
                </div>
              </div>

              {/* Inside Studio Workspace View */}
              <div className="p-4 space-y-3.5 bg-white dark:bg-[#0C0E13]">
                {/* Active Project Title Bar */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#B58E50] dark:text-[#C9A46C] uppercase tracking-wider">
                      Turnkey Residence
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      The Sky Villa (4BHK Luxury)
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#B58E50] dark:text-[#C9A46C]" />
                      <span>Prahlad Nagar, Ahmedabad</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400">
                      48% Done
                    </span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Budget: ₹1.5 Cr</p>
                  </div>
                </div>

                {/* Real High-Resolution Architectural Perspective with Coordinate Pins */}
                <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-[#202534] aspect-[16/9] bg-slate-100 dark:bg-[#151924]">
                  <img
                    src="/assets/projects/living_room.webp"
                    alt="Living Room Architectural Perspective"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Clean Architectural Specification Pins */}
                  <div className="absolute top-4 left-6 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 border border-[#C9A46C] text-[10px] text-white font-medium shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A46C]"></span>
                    <span>Pin 01: Botticino Marble 18mm</span>
                  </div>

                  <div className="absolute bottom-4 right-6 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 border border-emerald-400 text-[10px] text-white font-medium shadow-md">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Pin 02: Fluted Walnut Paneling</span>
                  </div>
                </div>

                {/* Quiet Metrics Summary Bar */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#141822] border border-slate-200 dark:border-[#222837]">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Escrow Released</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white font-mono mt-0.5">₹72,00,000</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#141822] border border-slate-200 dark:border-[#222837]">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">On-Site Labor</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white font-mono mt-0.5">18 Workers</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#141822] border border-slate-200 dark:border-[#222837]">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Gantt Milestone</p>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">Phase 3 of 7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiet Floating AI Card 1: Top Right */}
            <div className="absolute -top-4 -right-4 w-56 p-3 rounded-xl bg-white dark:bg-[#141822] border border-amber-300 dark:border-amber-500/40 shadow-xl hidden md:block">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                <AlertTriangle className="w-3 h-3" />
                <span>AI Delay Prediction</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-900 dark:text-white mt-1 leading-snug">
                Botticino marble transit delayed 4 days. Reallocating polishing team.
              </p>
            </div>

            {/* Quiet Floating AI Card 2: Bottom Left */}
            <div className="absolute -bottom-4 -left-4 w-56 p-3 rounded-xl bg-white dark:bg-[#141822] border border-emerald-300 dark:border-emerald-500/40 shadow-xl hidden md:block">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                <TrendingUp className="w-3 h-3" />
                <span>AI Budget Insight</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-900 dark:text-white mt-1 leading-snug">
                Joinery running 8.4% under budget. Surplus auto-reallocated to lighting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
