'use client';

import React from 'react';
import {
  Project,
  Lead,
  SiteUpdate,
  MilestonePayment,
  ProjectPhase,
  SiteManpower,
} from '@/types';
import {
  TrendingUp,
  MapPin,
  IndianRupee,
  Users,
  HardHat,
  ArrowUpRight,
  Clock,
  Sparkles,
  Camera,
  CheckCircle2,
  Building2,
  Compass,
} from 'lucide-react';
import { ActiveTab } from '../Sidebar';

interface OverviewModuleProps {
  project: Project | null;
  leads: Lead[];
  siteUpdates: SiteUpdate[];
  milestones: MilestonePayment[];
  phases: ProjectPhase[];
  manpower: SiteManpower | null;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function OverviewModule({
  project,
  leads,
  siteUpdates,
  milestones,
  phases,
  manpower,
  setActiveTab,
}: OverviewModuleProps) {
  const totalBudget = project?.budget || 4850000;
  const paidAmount = milestones
    .filter((m) => m.status === 'paid')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const formattedBudget = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(totalBudget);

  const formattedPaid = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(paidAmount);

  const roomPortfolios = [
    {
      title: 'Grand Living & Dining Lounge',
      area: '950 sqft',
      spec: 'Italian Bottochino Marble & Saint-Gobain Cove Ceiling',
      status: 'In Execution (65%)',
      img: '/assets/projects/living_room.webp',
    },
    {
      title: 'Master Bedroom & Walk-in Wardrobe',
      area: '480 sqft',
      spec: 'Century Smoked Oak Veneer & Hafele Concealed Joinery',
      status: 'Joinery Started (25%)',
      img: '/assets/projects/bedroom.webp',
    },
    {
      title: 'Modular Gourmet Island Kitchen',
      area: '320 sqft',
      spec: 'Quartz Countertops & Soft-close Blum Tandem Drawers',
      status: '3D Approved (10%)',
      img: '/assets/projects/kitchen.webp',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. HERO ARCHITECTURAL SHOWCASE BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-[#2D3446] shadow-2xl bg-[#0D0F13]">
        {/* Background Project Image with Luxury Dark Gradient */}
        <div className="relative h-80 sm:h-96 w-full overflow-hidden">
          <img
            src="/assets/projects/hero_villa.webp"
            alt="The Sky Villa"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F13] via-[#0D0F13]/70 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0F13] via-[#0D0F13]/50 to-transparent" />
        </div>

        {/* Hero Overlay Content */}
        <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between z-10">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-[#F1E5D3] border border-[#C9A46C]/50 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A46C]" />
              <span>TURNKEY LUXURY RESIDENTIAL EXECUTION</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-400 border border-emerald-800/60 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              On-Schedule &bull; 42 Days to Handover
            </div>
          </div>

          <div className="space-y-3 max-w-2xl">
            <h1 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide leading-tight">
              Crafting Grand Entrances & <br className="hidden sm:block" />
              <span className="gold-text-gradient">Timeless Luxury Interiors</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-2.5 font-medium">
              <span className="flex items-center gap-1 text-[#C9A46C]">
                <Building2 className="w-4 h-4" />
                {project?.title || 'The Sky Villa (4BHK Luxury)'}
              </span>
              <span className="text-slate-500">&bull;</span>
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#C9A46C]" />
                {project?.location || 'Shivalik Residences, Prahlad Nagar, Ahmedabad'}
              </span>
              <span className="text-slate-500">&bull;</span>
              <span className="text-slate-300">Client: {project?.client_name || 'Rajeshbhai Patel'}</span>
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('design')}
                className="px-5 py-2.5 rounded-xl bg-[#C9A46C] hover:bg-[#B59058] text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-[#C9A46C]/20"
              >
                <Compass className="w-4 h-4" />
                Explore 3D Floorplan Pins
              </button>
              <button
                onClick={() => setActiveTab('boq')}
                className="px-5 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-[#C9A46C]/40 text-[#F1E5D3] text-xs font-bold flex items-center gap-2 transition-all"
              >
                <IndianRupee className="w-4 h-4 text-[#C9A46C]" />
                Inspect BOQ Scope ({formattedBudget})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. EXECUTIVE METRIC KPI TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Contract Value */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#262C3A] hover:border-[#B58E50] dark:hover:border-[#C9A46C]/50 transition-all shadow-sm dark:shadow-md group">
          <div className="flex items-center justify-between text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400">
            <span>CONTRACT VALUE</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-[#C9A46C]/15 flex items-center justify-center">
              <IndianRupee className="w-4 h-4 text-[#B58E50] dark:text-[#C9A46C]" />
            </div>
          </div>
          <p className="font-luxury text-2xl font-bold text-slate-900 dark:text-slate-100 mt-3">{formattedBudget}</p>
          <div className="flex items-center justify-between mt-3 text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-[#202534]">
            <span>Realized: {formattedPaid}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {Math.round((paidAmount / totalBudget) * 100)}% Collected
            </span>
          </div>
        </div>

        {/* Site Completion Status */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#262C3A] hover:border-[#B58E50] dark:hover:border-[#C9A46C]/50 transition-all shadow-sm dark:shadow-md">
          <div className="flex items-center justify-between text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400">
            <span>SITE PROGRESS</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <p className="font-luxury text-2xl font-bold text-slate-900 dark:text-slate-100 mt-3">
            {project?.completion_percentage || 48}% Complete
          </p>
          <div className="w-full bg-slate-100 dark:bg-[#202636] h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#B58E50] to-emerald-500 dark:from-[#C9A46C] dark:to-emerald-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${project?.completion_percentage || 48}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2.5 text-[11px] text-slate-500 dark:text-slate-400">
            <span>Phase 3 of 5</span>
            <span className="text-[#B58E50] dark:text-[#C9A46C] font-semibold">Carpentry & Framing</span>
          </div>
        </div>

        {/* CRM Leads Pipeline */}
        <div
          onClick={() => setActiveTab('crm')}
          className="p-5 rounded-2xl bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#262C3A] hover:border-[#B58E50] dark:hover:border-[#C9A46C]/60 cursor-pointer transition-all shadow-sm dark:shadow-md group"
        >
          <div className="flex items-center justify-between text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400">
            <span>PIPELINE LEADS</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-[#C9A46C]/15 flex items-center justify-center">
              <Users className="w-4 h-4 text-[#B58E50] dark:text-[#C9A46C] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <p className="font-luxury text-2xl font-bold text-slate-900 dark:text-slate-100 mt-3">{leads.length} Active HNIs</p>
          <div className="flex items-center justify-between mt-3 text-xs text-[#B58E50] dark:text-[#C9A46C] pt-3 border-t border-slate-100 dark:border-[#202534] font-semibold">
            <span>₹2.5 Cr Ahmedabad Pipeline</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Today's Labor Attendance */}
        <div
          onClick={() => setActiveTab('hrms')}
          className="p-5 rounded-2xl bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#262C3A] hover:border-[#B58E50] dark:hover:border-[#C9A46C]/60 cursor-pointer transition-all shadow-sm dark:shadow-md group"
        >
          <div className="flex items-center justify-between text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400">
            <span>ON-SITE ARTISANS</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center">
              <HardHat className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <p className="font-luxury text-2xl font-bold text-slate-900 dark:text-slate-100 mt-3">
            {(manpower?.carpenters || 4) +
              (manpower?.electricians || 2) +
              (manpower?.painters || 0) +
              (manpower?.helpers || 3)}{' '}
            Craftsmen
          </p>
          <div className="flex items-center justify-between mt-3 text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-[#202534]">
            <span>{manpower?.carpenters || 4} Joinery • {manpower?.electricians || 2} MEP</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">Muster Active</span>
          </div>
        </div>
      </div>

      {/* 3. VISUAL ROOM PORTFOLIO SHOWCASE (Kov Interior Architecture) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-luxury text-xl font-bold text-slate-900 dark:text-slate-100">
              Active Room Perspectives &amp; Joinery
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              High-resolution 3D perspectives and material specifications for The Sky Villa
            </p>
          </div>
          <button
            onClick={() => setActiveTab('design')}
            className="text-xs font-bold text-[#B58E50] dark:text-[#C9A46C] hover:underline flex items-center gap-1"
          >
            Open Design Canvas
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {roomPortfolios.map((room, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#262C3A] overflow-hidden hover:border-[#B58E50] dark:hover:border-[#C9A46C]/60 transition-all shadow-sm dark:shadow-lg flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-black">
                <img
                  src={room.img}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold text-[#F1E5D3] border border-white/10">
                  {room.status}
                </div>
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-white/90 dark:bg-[#101217]/90 text-[10px] font-semibold text-[#B58E50] dark:text-[#C9A46C] border border-slate-200 dark:border-[#C9A46C]/30 shadow-sm">
                  {room.area}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{room.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {room.spec}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-[#202534] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Kov Interiors Ahmedabad</span>
                  <span className="text-[#B58E50] dark:text-[#C9A46C] font-semibold">View Specs &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. EXECUTION TIMELINE & RECENT SITE UPDATES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Timeline & Phases (2 Columns) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#262C3A] shadow-sm dark:shadow-md">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-luxury text-lg font-bold text-slate-900 dark:text-slate-100">
                Critical Path Execution Schedule
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ahmedabad site milestones &amp; dependencies</p>
            </div>
            <button
              onClick={() => setActiveTab('project_mgmt')}
              className="text-xs font-bold text-[#B58E50] dark:text-[#C9A46C] hover:underline flex items-center gap-1"
            >
              Full Schedule
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {phases.map((phase) => (
              <div
                key={phase.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#191D27] border border-slate-200 dark:border-[#262C3A] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  {phase.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : phase.status === 'in_progress' ? (
                    <Clock className="w-5 h-5 text-[#B58E50] dark:text-[#C9A46C] animate-pulse shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 shrink-0" />
                  )}
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{phase.phase_name}</span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {phase.start_date || 'Day 1'} &rarr; {phase.end_date || 'Day 45'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-56">
                  <div className="flex-1 bg-slate-200 dark:bg-[#232838] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        phase.status === 'completed'
                          ? 'bg-emerald-500'
                          : 'bg-gradient-to-r from-[#B58E50] to-amber-500 dark:from-[#C9A46C] dark:to-amber-400'
                      }`}
                      style={{ width: `${phase.progress_percent}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 w-10 text-right">
                    {phase.progress_percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Site Photo Card (1 Column) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#262C3A] shadow-sm dark:shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-luxury text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#B58E50] dark:text-[#C9A46C]" />
                Live Site Snapshot
              </h3>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/60">
                Live Feed
              </span>
            </div>

            {siteUpdates.length > 0 ? (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-[#2C3447] aspect-video">
                  <img
                    src={siteUpdates[0].photo_url || '/assets/projects/living_room.webp'}
                    alt="Site update"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-slate-200">
                    {siteUpdates[0].stage}
                  </div>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-200 line-clamp-2 leading-relaxed">
                  {siteUpdates[0].caption}
                </p>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 pt-2 border-t border-slate-100 dark:border-[#232938]">
                  <p className="flex justify-between">
                    <span>Supervisor:</span>
                    <span className="text-slate-900 dark:text-slate-100 font-semibold">{siteUpdates[0].supervisor_name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Location:</span>
                    <span className="text-[#B58E50] dark:text-[#C9A46C] font-semibold">Prahlad Nagar Site</span>
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No site updates yet.</p>
            )}
          </div>

          <button
            onClick={() => setActiveTab('site_tracking')}
            className="w-full mt-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-[#1E2330] dark:hover:bg-[#272D3E] border border-slate-200 dark:border-[#2D364A] text-xs font-bold dark:text-[#F1E5D3] transition-colors"
          >
            Open All Site Photos ({siteUpdates.length})
          </button>
        </div>
      </div>
    </div>
  );
}
