'use client';

import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  TrendingUp,
  AlertTriangle,
  Users2,
  Calendar,
  Layers,
  ChevronRight,
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
    <section id="hero" className="relative pt-10 sm:pt-16 pb-20 sm:pb-28 bg-white dark:bg-[#0D0F13] text-slate-900 dark:text-white transition-colors overflow-hidden">
      {/* Subtle radial ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[32rem] h-[32rem] bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle & Action CTAs (Image 1 replica) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Sparkle Icon Tag */}
            <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              AI native software to manage Interior &amp; Infra projects from{' '}
              <span className="text-blue-600 dark:text-blue-400">Design to Delivery</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
              Interior &amp; Infra project management software that unites every workflow from design concept to handover,
              so teams can plan, track and deliver faster with AI driven precision.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenContact}
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                <span>Book a Demo</span>
              </button>

              <button
                onClick={onExploreOs}
                className="py-3 px-5 rounded-xl bg-white hover:bg-slate-50 dark:bg-[#161A24] dark:hover:bg-[#1E2434] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-[#2B3245] font-semibold text-xs flex items-center gap-2 transition-all shadow-sm"
              >
                <div className="w-5 h-5 rounded-full border border-slate-400 dark:border-slate-500 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 text-slate-700 dark:text-slate-300 fill-current ml-0.5" />
                </div>
                <span>Watch Overview</span>
              </button>
            </div>

            {/* Quick Trust Bar */}
            <div className="pt-6 border-t border-slate-100 dark:border-[#1F2535] flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">5,000+</span> Projects Delivered
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
              <div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">99.4%</span> On-Time Rate
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Laptop Mockup with 3 Floating AI Cards (Image 1 replica) */}
          <div className="lg:col-span-7 relative pt-6 sm:pt-0">
            {/* Laptop Outer Frame Container */}
            <div className="relative mx-auto max-w-[620px]">
              {/* Laptop Display Top (Screen Bezel) */}
              <div className="relative rounded-t-2xl bg-[#1C1F26] p-2.5 sm:p-3 pb-0 shadow-2xl border border-slate-700/60">
                {/* Camera Notch Dot */}
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800 mx-auto mb-2 border border-slate-600/50" />

                {/* Laptop Screen Content (SaaS Dashboard matching Image 1) */}
                <div className="rounded-t-lg bg-white dark:bg-[#0F1218] text-slate-800 dark:text-slate-200 p-3.5 sm:p-4 aspect-[16/10] overflow-hidden border border-slate-200 dark:border-[#222838] flex flex-col justify-between select-none">
                  {/* Top Bar inside Laptop */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1C212E]">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                        #
                      </div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">ProjectStudio</span>
                      <span className="text-[10px] text-slate-400 hidden sm:inline">/ All Project Overview</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 dark:bg-[#181D2A] text-[9px] text-slate-500">
                        <span>Search projects...</span>
                      </div>
                      <button className="px-2 py-0.8 rounded bg-blue-600 text-white text-[9px] font-semibold">
                        Add Project +
                      </button>
                    </div>
                  </div>

                  {/* Mid Row: Budget Summary Donut & Project Timeline Gantt */}
                  <div className="grid grid-cols-12 gap-3 py-2 flex-1 items-stretch">
                    {/* Donut Chart: Budget Summary */}
                    <div className="col-span-5 p-2.5 rounded-xl bg-slate-50 dark:bg-[#141822] border border-slate-100 dark:border-[#1F2535] flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">Budget Summary</span>
                        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">+8.4%</span>
                      </div>

                      {/* Donut graphic */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto my-1 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-slate-200 dark:text-slate-800"
                            strokeWidth="3.8"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-blue-600"
                            strokeDasharray="75, 100"
                            strokeWidth="3.8"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute text-center">
                          <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white">₹1.5 Cr</p>
                          <p className="text-[8px] text-slate-400">Total Value</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[8px] text-slate-500 pt-1 border-t border-slate-100 dark:border-[#1E2434]">
                        <span>Spent: ₹72L</span>
                        <span>Surplus: ₹78L</span>
                      </div>
                    </div>

                    {/* Timeline Gantt Chart */}
                    <div className="col-span-7 p-2.5 rounded-xl bg-slate-50 dark:bg-[#141822] border border-slate-100 dark:border-[#1F2535] flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">Project Timeline</span>
                        <span className="text-[9px] text-blue-600 dark:text-blue-400 font-semibold">Stage 3 of 7</span>
                      </div>

                      {/* Gantt Bar Rows */}
                      <div className="space-y-1.5 my-auto">
                        <div>
                          <div className="flex justify-between text-[8px] text-slate-500 mb-0.5">
                            <span>1. Recce &amp; Architectural Design</span>
                            <span className="text-emerald-600 font-bold">100%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full w-full" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[8px] text-slate-500 mb-0.5">
                            <span>2. False Ceiling &amp; MEP</span>
                            <span className="text-blue-600 font-bold">100%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full w-full" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[8px] text-slate-500 mb-0.5">
                            <span>3. Botticino Marble Flooring</span>
                            <span className="text-amber-600 font-bold">65%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full w-[65%]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[8px] text-slate-500 mb-0.5">
                            <span>4. Walnut Paneling &amp; Joinery</span>
                            <span className="text-slate-400">Scheduled</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full w-[20%]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Project Lists Table Preview */}
                  <div className="pt-2 border-t border-slate-100 dark:border-[#1C212E]">
                    <div className="flex items-center justify-between text-[9px] text-slate-500 pb-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Active Project: Sky Villa (4BHK)</span>
                      <span>Client: Dr. Mehta • On-site Labor: 18</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop Keyboard Base & Lip (Aluminum style) */}
              <div className="relative rounded-b-xl bg-gradient-to-b from-[#D1D5DB] to-[#9CA3AF] dark:from-[#2A2E39] dark:to-[#1B1E26] h-3.5 sm:h-4 shadow-lg border-t border-slate-300 dark:border-slate-700 flex items-center justify-center">
                {/* Thumb notch */}
                <div className="w-16 h-1 rounded-full bg-slate-400 dark:bg-slate-800" />
              </div>

              {/* 3 Floating AI Cards (Image 1 replica) */}

              {/* Card 1: Top Right - AI Prediction */}
              <div className="absolute -top-6 -right-4 sm:-right-6 w-60 sm:w-64 p-3 rounded-2xl bg-white dark:bg-[#131722] border border-amber-200 dark:border-amber-500/40 shadow-xl z-20 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>AI Prediction ✦</span>
                  </div>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                  Potential Delay Detected
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                  Brooklyn Warehouse may slip 5 days due to procurement delay.
                </p>
                <button
                  onClick={onOpenContact}
                  className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline mt-1.5 flex items-center gap-1"
                >
                  <span>View recommendation</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Card 2: Middle Left - AI Insight */}
              <div className="absolute top-1/3 -left-4 sm:-left-8 w-60 sm:w-64 p-3 rounded-2xl bg-white dark:bg-[#131722] border border-emerald-200 dark:border-emerald-500/40 shadow-xl z-20 animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>AI Insight ✦</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                  Budget Efficiency
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                  Chelsea project running 8% under budget reallocate savings to accelerate Brooklyn.
                </p>
              </div>

              {/* Card 3: Bottom Center/Right - AI Suggestion */}
              <div className="absolute -bottom-8 right-4 sm:right-12 w-64 sm:w-72 p-3 rounded-2xl bg-white dark:bg-[#131722] border border-blue-200 dark:border-blue-500/40 shadow-2xl z-20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                  <Users2 className="w-3.5 h-3.5" />
                  <span>AI Suggestion ✦</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                  Optimized Team Allocation
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                  Reassign 2 team members to SoHo project for faster completion.
                </p>
                <button
                  onClick={onOpenContact}
                  className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline mt-1.5 flex items-center gap-1"
                >
                  <span>Apply changes</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
